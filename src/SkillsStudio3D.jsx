import React, { useEffect, useRef, useState } from 'react';
import { categories } from './skillsData';

const MODEL_URL = '/models/dev-studio-skills.glb';
const DRACO_PATH = '/draco/';

// Where the extra "Play" island floats (world units of the studio model):
// off to the right of the main studio, kept small
const PLAY_POS = [11.5, 0.6, -4.5];
const PLAY_SCALE = 0.75;

// Each tab flies the camera to a spot in the studio, then opens a clean
// showcase of that stack. Clicking one of the `nodes` in the studio selects
// that tab too. When `view` is missing the camera looks at the nodes from the
// middle of the studio.
const stacks = [
  {
    id: 'frontend',
    nodes: ['skill_0', 'skill_1', 'skill_2', 'skill_3', 'skill_4', 'skill_5', 'skill_6', 'skill_7'],
    distance: 4.6,
  },
  {
    id: 'backend',
    nodes: ['screen_terminal', 'screen_code', 'screen_site'],
    view: { target: [3.7, 2.0, 4.4], position: [3.4, 2.9, 6.9] },
  },
  { id: 'database', nodes: ['skill_9'], distance: 4.6 },
  { id: 'tools', nodes: ['skill_8', 'skill_10'], distance: 4.6, focusNode: 'skill_8' },
  { id: '3d', nodes: ['skill_11'], distance: 4.6 },
].map((s) => ({ ...s, ...categories.find((c) => c.id === s.id) }));

const PLAY = { id: 'play', title: 'Play' };
const tabs = [...stacks, PLAY];

// Showcase camera
const SHOW_DIST = 7.5;

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function SkillsStudio3D() {
  const mountRef = useRef(null);
  const fadeRef = useRef(null);
  const apiRef = useRef(null);
  const [active, setActive] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      setStatus('loading');
      const [
        THREE,
        { GLTFLoader },
        { DRACOLoader },
        { OrbitControls },
        { SVGLoader },
        { RoomEnvironment },
        { renderToStaticMarkup },
        extras,
      ] = await Promise.all([
        import('three'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/loaders/DRACOLoader.js'),
        import('three/examples/jsm/controls/OrbitControls.js'),
        import('three/examples/jsm/loaders/SVGLoader.js'),
        import('three/examples/jsm/environments/RoomEnvironment.js'),
        import('react-dom/server'),
        import('./studioExtras.js'),
      ]);
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      mount.appendChild(renderer.domElement);

      // ---------- Studio scene ----------
      const scene = new THREE.Scene();
      scene.add(new THREE.HemisphereLight(0xfff1dc, 0x1a1208, 1.4));
      const sun = new THREE.DirectionalLight(0xffe2b8, 1.4);
      sun.position.set(6, 12, 8);
      scene.add(sun);

      // ---------- Showcase scene (only icons + names) ----------
      const show = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      show.environment = envTex;
      show.add(new THREE.HemisphereLight(0xfff1dc, 0x140c04, 0.7));
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(3, 5, 6);
      show.add(key);
      const rimLight = new THREE.PointLight(0xffbd39, 30, 20);
      rimLight.position.set(0, 2, -4);
      show.add(rimLight);
      const particles = extras.createParticles(THREE);
      show.add(particles.points);

      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;

      const setLimits = (mode) => {
        if (mode === 'studio') {
          controls.minAzimuthAngle = -Infinity;
          controls.maxAzimuthAngle = Infinity;
          controls.minPolarAngle = 0;
          controls.maxPolarAngle = Math.PI * 0.49;
          controls.minDistance = 1;
          controls.maxDistance = 32;
        } else {
          controls.minAzimuthAngle = -0.55;
          controls.maxAzimuthAngle = 0.55;
          controls.minPolarAngle = Math.PI * 0.3;
          controls.maxPolarAngle = Math.PI * 0.56;
          controls.minDistance = 4;
          controls.maxDistance = 10;
        }
      };
      setLimits('studio');

      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      const draco = new DRACOLoader().setDecoderPath(DRACO_PATH);
      const loader = new GLTFLoader().setDRACOLoader(draco);

      let gltf;
      try {
        gltf = await loader.loadAsync(MODEL_URL);
      } catch (err) {
        console.error(err);
        if (!disposed) setStatus('error');
        return;
      }
      if (disposed) return;

      const model = gltf.scene;
      scene.add(model);
      model.updateMatrixWorld(true);

      // Frame the overview on the studio itself; the small Play island sits at the side
      const roomBox = new THREE.Box3().setFromObject(model);
      const roomCenter = roomBox.getCenter(new THREE.Vector3());
      const roomSize = roomBox.getSize(new THREE.Vector3());

      // Play island
      const playPos = new THREE.Vector3(...PLAY_POS);
      const play = extras.createPlayArea(THREE, playPos, roomCenter.clone().sub(playPos).setY(0).normalize());
      play.group.scale.setScalar(PLAY_SCALE);
      scene.add(play.group);
      const playHome = { position: play.group.position.clone(), rotationY: play.group.rotation.y };

      const overview = {
        target: roomCenter.clone().setY(roomBox.min.y + roomSize.y * 0.3),
        position: roomCenter
          .clone()
          .add(new THREE.Vector3(roomSize.x * 0.58, roomSize.y * 0.75, roomSize.z * 0.78)),
      };
      camera.position.copy(overview.position);
      controls.target.copy(overview.target);
      controls.update();

      // Camera spot in the studio for each tab
      const views = {};
      const nodeToStack = new Map();
      stacks.forEach((stack) => {
        stack.nodes.forEach((name) => {
          model.getObjectByName(name)?.traverse((o) => {
            if (o.isMesh && !nodeToStack.has(o)) nodeToStack.set(o, stack.id);
          });
        });
        if (stack.view) {
          views[stack.id] = {
            target: new THREE.Vector3(...stack.view.target),
            position: new THREE.Vector3(...stack.view.position),
          };
          return;
        }
        const box = new THREE.Box3();
        (stack.focusNode ? [stack.focusNode] : stack.nodes).forEach((name) => {
          const obj = model.getObjectByName(name);
          if (obj) box.expandByObject(obj);
        });
        if (box.isEmpty()) return;
        const target = box.getCenter(new THREE.Vector3());
        const dir = roomCenter.clone().sub(target).setY(0);
        if (dir.lengthSq() < 1e-4) dir.set(0, 0, 1);
        dir.normalize();
        const position = target
          .clone()
          .addScaledVector(dir, stack.distance)
          .add(new THREE.Vector3(0, stack.distance * 0.22, 0));
        views[stack.id] = { target, position };
      });
      {
        const target = play.focus.clone();
        const dir = roomCenter.clone().sub(target).setY(0).normalize();
        views.play = {
          target,
          position: target.clone().addScaledVector(dir, 6 * PLAY_SCALE).add(new THREE.Vector3(0, 2.1 * PLAY_SCALE, 0)),
        };
      }

      // Showcase items, built on first use and cached
      const itemCache = new Map();
      const getItems = (stack) => {
        if (!itemCache.has(stack.id)) {
          itemCache.set(
            stack.id,
            stack.skills.map((skill) => {
              const svg = renderToStaticMarkup(skill.icon).replace(/\s(width|height)="[^"]*"/g, '');
              return extras.createShowcaseItem(THREE, { SVGLoader }, { ...skill, svg });
            })
          );
        }
        return itemCache.get(stack.id);
      };

      // ---------- Modes ----------
      let mode = 'studio';
      let showcase = null;
      let studioPose = null;
      let token = 0;

      const fade = (on) =>
        new Promise((resolve) => {
          fadeRef.current?.classList.toggle('is-on', on);
          setTimeout(resolve, on ? 380 : 10);
        });

      const enterShowcase = (id) => {
        if (showcase) show.remove(showcase.group);
        showcase = null;
        if (mode === 'studio') studioPose = { position: camera.position.clone(), target: controls.target.clone() };
        mode = 'showcase';
        setLimits('showcase');

        if (id === 'play') {
          show.add(play.group);
          play.group.position.set(0, -0.75, 0);
          play.group.rotation.y = 0;
          play.group.scale.setScalar(1);
          camera.position.set(0, 1.9, 6.6);
          controls.target.set(0, 0.55, 0);
        } else {
          if (play.group.parent === show) {
            scene.add(play.group);
            play.group.position.copy(playHome.position);
            play.group.rotation.y = playHome.rotationY;
            play.group.scale.setScalar(PLAY_SCALE);
          }
          const stack = stacks.find((s) => s.id === id);
          const viewHeight = 2 * SHOW_DIST * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
          showcase = extras.createShowcase(THREE, getItems(stack), { aspect: camera.aspect, viewHeight });
          show.add(showcase.group);
          camera.position.set(0, 0.6, SHOW_DIST);
          controls.target.set(0, 0, 0);
        }
        controls.update();
      };

      const exitShowcase = () => {
        if (showcase) show.remove(showcase.group);
        showcase = null;
        scene.add(play.group);
        play.group.position.copy(playHome.position);
        play.group.rotation.y = playHome.rotationY;
        play.group.scale.setScalar(PLAY_SCALE);
        mode = 'studio';
        setLimits('studio');
        if (studioPose) {
          camera.position.copy(studioPose.position);
          controls.target.copy(studioPose.target);
        }
        controls.update();
      };

      // Camera tween (studio)
      let tween = null;
      const flyTo = (view, onDone) => {
        tween = {
          fromPos: camera.position.clone(),
          fromTarget: controls.target.clone(),
          toPos: view.position.clone(),
          toTarget: view.target.clone(),
          t: 0,
          onDone,
        };
      };

      const focus = async (id) => {
        token += 1;
        const my = token;
        if (!id) {
          if (mode === 'showcase') {
            await fade(true);
            if (my !== token) return;
            exitShowcase();
            await fade(false);
          }
          if (my === token) flyTo(overview);
          return;
        }
        if (mode === 'studio' && views[id]) {
          // fly to the spot in the studio first, then open the showcase
          await new Promise((resolve) => flyTo(views[id], resolve));
          if (my !== token) return;
        }
        await fade(true);
        if (my !== token) return;
        enterShowcase(id);
        await fade(false);
      };

      // ---------- Pointer ----------
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const setPointer = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
        raycaster.setFromCamera(pointer, camera);
      };
      const itemUnder = () => {
        if (!showcase) return null;
        const hit = raycaster.intersectObjects(showcase.objects, true)[0];
        let o = hit?.object;
        while (o && !o.userData.skillName) o = o.parent;
        return o || null;
      };

      let downAt = null;
      const onDown = (e) => { downAt = { x: e.clientX, y: e.clientY }; };
      const onMove = (e) => {
        if (mode !== 'showcase' || !showcase) return;
        setPointer(e);
        const o = itemUnder();
        showcase.setHover(o);
        renderer.domElement.style.cursor = o ? 'pointer' : '';
      };
      const onUp = (e) => {
        if (!downAt || Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 5) return;
        setPointer(e);

        if (mode === 'showcase') {
          const o = itemUnder();
          if (o) showcase.hop(o);
          const playHit = raycaster.intersectObjects(play.clickables, false)[0];
          if (playHit) play.hit(playHit.object, playHit.point, camera);
          return;
        }
        const hit = raycaster.intersectObjects([model, play.group], true)[0];
        if (!hit) return;
        if (nodeToStack.has(hit.object)) setActive(nodeToStack.get(hit.object));
        else if (play.group.getObjectById(hit.object.id)) setActive('play');
      };
      renderer.domElement.addEventListener('pointerdown', onDown);
      renderer.domElement.addEventListener('pointermove', onMove);
      renderer.domElement.addEventListener('pointerup', onUp);

      apiRef.current = { focus };
      if (import.meta.env.DEV) window.__sk3d = { THREE, scene, show, camera, controls, flyTo };

      // Only render while the canvas is on screen
      let visible = true;
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      io.observe(mount);

      const clock = new THREE.Clock();
      renderer.setAnimationLoop(() => {
        const dt = Math.min(clock.getDelta(), 0.1);
        if (!visible) return;
        if (tween && mode === 'studio') {
          tween.t = Math.min(1, tween.t + dt / 1.4);
          const k = easeInOut(tween.t);
          camera.position.lerpVectors(tween.fromPos, tween.toPos, k);
          controls.target.lerpVectors(tween.fromTarget, tween.toTarget, k);
          if (tween.t >= 1) {
            const done = tween.onDone;
            tween = null;
            done?.();
          }
        }
        controls.update();
        play.update(dt);
        if (mode === 'showcase') {
          showcase?.update(dt);
          particles.update(dt);
        }
        renderer.render(mode === 'studio' ? scene : show, camera);
      });

      setStatus('ready');

      cleanup = () => {
        renderer.setAnimationLoop(null);
        io.disconnect();
        ro.disconnect();
        renderer.domElement.removeEventListener('pointerdown', onDown);
        renderer.domElement.removeEventListener('pointermove', onMove);
        renderer.domElement.removeEventListener('pointerup', onUp);
        controls.dispose();
        draco.dispose();
        const disposeTree = (root) =>
          root.traverse((o) => {
            if (o.geometry) o.geometry.dispose();
            if (o.material) {
              (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
                Object.values(m).forEach((v) => v && v.isTexture && v.dispose());
                m.dispose();
              });
            }
          });
        disposeTree(scene);
        disposeTree(show);
        itemCache.forEach((items) => items.forEach(disposeTree));
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        apiRef.current = null;
        if (import.meta.env.DEV) delete window.__sk3d;
      };
    };

    // Lazy-load three.js only once the section comes near the viewport
    const lazy = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lazy.disconnect();
          start();
        }
      },
      { rootMargin: '300px' }
    );
    lazy.observe(mount);

    return () => {
      disposed = true;
      lazy.disconnect();
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (status === 'ready') apiRef.current?.focus(active);
  }, [active, status]);

  const hint =
    active === 'play'
      ? 'Click the ball · punch the bag'
      : active
        ? 'Click an icon to make it jump · drag to tilt'
        : 'Drag to look around · pick a tab to fly there';

  return (
    <div className="sk3d">
      <div className="sk3d-tabs" role="tablist" aria-label="Skill stacks">
        <button
          type="button"
          role="tab"
          aria-selected={active === null}
          className={`sk3d-tab ${active === null ? 'is-active' : ''}`}
          onClick={() => setActive(null)}
        >
          Overview
        </button>
        {tabs.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={active === s.id}
            className={`sk3d-tab ${s.id === 'play' ? 'sk3d-tab-play' : ''} ${active === s.id ? 'is-active' : ''}`}
            onClick={() => setActive(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="sk3d-stage">
        <div ref={mountRef} className="sk3d-canvas" />
        <div ref={fadeRef} className="sk3d-fade" aria-hidden="true" />

        {status !== 'ready' && (
          <div className="sk3d-status">
            {status === 'error' ? 'Could not load the 3D studio.' : 'Loading 3D studio…'}
          </div>
        )}

        {active && (
          <button type="button" className="sk3d-back" onClick={() => setActive(null)}>
            <span aria-hidden="true">←</span> Back to studio
          </button>
        )}

        <p className="sk3d-hint">{hint}</p>
      </div>
    </div>
  );
}

export default SkillsStudio3D;
