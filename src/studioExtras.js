// Helpers for the 3D skills studio: a showcase of glossy extruded brand icons,
// and a small "Play" island with a ball and a punching bag.
// THREE and the example modules are passed in so they stay lazy-loaded.

const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Text label rendered to a canvas sprite */
export function makeLabel(THREE, text, { color = '#ffffff', bg = 'rgba(12,12,12,0.78)', width = 0.7, font = 600 } = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontCss = `${font} 54px Poppins, "Segoe UI", sans-serif`;
  ctx.font = fontCss;
  const w = Math.ceil(ctx.measureText(text).width + 70);
  canvas.width = Math.max(512, w + 12);
  canvas.height = 128;
  ctx.font = fontCss; // resizing the canvas resets the context
  if (bg) {
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect((canvas.width - w) / 2, 14, w, 100, 50);
    ctx.fill();
  } else {
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 14;
  }
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, 66);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, toneMapped: false, depthWrite: false }));
  const aspect = canvas.width / canvas.height;
  sprite.scale.set(width * (canvas.width / 512), (width * (canvas.width / 512)) / aspect, 1);
  sprite.userData.aspect = aspect;
  return sprite;
}

const hexToCss = (THREE, color, alpha) => {
  const c = new THREE.Color(color);
  return `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${alpha})`;
};

/** Soft radial glow sprite (additive) */
function makeGlow(THREE, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, hexToCss(THREE, color, 0.85));
  g.addColorStop(0.35, hexToCss(THREE, color, 0.28));
  g.addColorStop(1, hexToCss(THREE, color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
}

/**
 * One showcase item: a glossy extruded brand logo floating over a glowing
 * pedestal, with its name underneath.
 */
export function createShowcaseItem(THREE, { SVGLoader }, { name, svg, color }) {
  // White logos glow gold so they still have some colour
  const hsl = new THREE.Color(color).getHSL({ h: 0, s: 0, l: 0 });
  const glowColor = hsl.s < 0.1 ? '#ffbd39' : color;

  const root = new THREE.Group();
  root.userData.skillName = name;

  // Pedestal
  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.52, 0.16, 48),
    new THREE.MeshPhysicalMaterial({ color: 0x111111, metalness: 0.6, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1 })
  );
  pedestal.position.y = -0.08;
  root.add(pedestal);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.47, 0.018, 12, 64),
    new THREE.MeshBasicMaterial({ color: glowColor, toneMapped: false })
  );
  ring.rotation.x = Math.PI / 2;
  root.add(ring);
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.44, 0.44, 1.1, 48, 1, true),
    new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    })
  );
  beam.position.y = 0.55;
  root.add(beam);

  // Floating part (logo + glow) that bobs and spins
  const float = new THREE.Group();
  float.position.y = 0.68;
  root.add(float);

  const glow = makeGlow(THREE, glowColor);
  glow.scale.setScalar(1.5);
  glow.position.z = -0.15;
  float.add(glow);

  const data = new SVGLoader().parse(svg);
  const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
  if (shapes.length) {
    // Icon sets use different viewBox sizes (24 vs 512): scale extrusion to the icon
    const bounds = new THREE.Box2();
    shapes.forEach((sh) => sh.getPoints().forEach((pt) => bounds.expandByPoint(pt)));
    const unit = Math.max(bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y) || 1;
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: unit * 0.14,
      bevelEnabled: true,
      bevelThickness: unit * 0.025,
      bevelSize: unit * 0.008,
      bevelSegments: 4,
      curveSegments: 14,
    });
    geo.center();
    const icon = new THREE.Mesh(
      geo,
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.15,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        emissive: color,
        emissiveIntensity: 0.18,
      })
    );
    icon.scale.setScalar(0.72 / unit);
    icon.rotation.x = Math.PI; // SVG y points down: rotate (not mirror) to keep winding
    float.add(icon);
  }

  const label = makeLabel(THREE, name, { bg: null, width: 1.45, font: 700 });
  label.position.y = -0.5;
  root.add(label);

  root.userData.parts = { float, glow, ring, beam };
  return root;
}

/**
 * Lays items out on a gentle arc facing the camera. They spring up onto their
 * pedestals one by one, bob and turn while idle, hop when clicked and grow
 * when hovered.
 */
export function createShowcase(THREE, items, { aspect, viewHeight }) {
  const group = new THREE.Group();
  const visH = viewHeight;
  const visW = visH * aspect;
  const gapX = 1.75;
  const gapY = 2.15;
  const cols = Math.max(2, Math.min(items.length, Math.floor((visW * 0.92) / gapX)));
  const rows = Math.ceil(items.length / cols);
  const scale = Math.min(1.5, (visH * 0.8) / (rows * gapY), (visW * 0.95) / (cols * gapX));

  const state = items.map((obj, i) => {
    const row = Math.floor(i / cols);
    const inRow = Math.min(cols, items.length - row * cols);
    const x = (i - row * cols - (inRow - 1) / 2) * gapX * scale;
    obj.position.set(x, ((rows - 1) / 2 - row) * gapY * scale - 0.35 * scale, -x * x * 0.06);
    obj.rotation.set(0, -x * 0.08, 0);
    obj.scale.setScalar(scale);
    obj.userData.parts.float.scale.setScalar(0.0001);
    group.add(obj);
    return { obj, delay: 0.15 + i * 0.08, hop: -1, hover: 0, hoverTarget: 0 };
  });

  let time = 0;
  return {
    group,
    objects: items,
    hop(obj) {
      const it = state.find((x) => x.obj === obj);
      if (it && it.hop < 0) it.hop = 0;
    },
    setHover(obj) {
      state.forEach((it) => {
        it.hoverTarget = it.obj === obj ? 1 : 0;
      });
    },
    update(dt) {
      time += dt;
      state.forEach((it, i) => {
        const { float, glow, ring, beam } = it.obj.userData.parts;
        const p = THREE.MathUtils.clamp((time - it.delay) / 0.8, 0, 1);
        it.hover += (it.hoverTarget - it.hover) * Math.min(1, dt * 10);

        // Entry: spring up out of the pedestal with an overshoot and a spin
        let y = 0.68 + Math.sin(p * Math.PI) * 0.7 - (1 - p) * 0.5;
        let spin = (1 - p) * Math.PI * 2;
        if (p >= 1) {
          y += Math.sin(time * 1.8 + i) * 0.06;
          spin = Math.sin(time * 0.9 + i * 0.8) * 0.45;
        }
        if (it.hop >= 0) {
          it.hop += dt / 0.8;
          const h = Math.min(1, it.hop);
          y += Math.sin(h * Math.PI) * 0.6;
          spin += h * Math.PI * 2;
          if (it.hop >= 1) it.hop = -1;
        }
        float.position.y = y;
        float.rotation.y = spin;
        float.scale.setScalar(Math.max(0.0001, easeOutBack(p) * (1 + it.hover * 0.18)));

        const pulse = 0.85 + Math.sin(time * 2.4 + i) * 0.15;
        glow.material.opacity = p * (0.75 + it.hover * 0.25) * pulse;
        ring.scale.setScalar(1 + it.hover * 0.08);
        beam.material.opacity = p * (0.06 + it.hover * 0.08);
      });
    },
  };
}

/** Slowly rising gold dust for the showcase background */
export function createParticles(THREE, count = 260) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    pos[i * 3] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 2] = -2 - Math.random() * 8;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: 0xffbd39, size: 0.05, transparent: true, opacity: 0.7, depthWrite: false, toneMapped: false })
  );
  return {
    points,
    update(dt) {
      const a = geo.attributes.position;
      for (let i = 0; i < count; i += 1) {
        let yv = a.getY(i) + dt * (0.15 + (i % 7) * 0.03);
        if (yv > 6) yv = -6;
        a.setY(i, yv);
      }
      a.needsUpdate = true;
    },
  };
}

function basketballTexture(THREE) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f07a1a';
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = '#2a1405';
  ctx.lineWidth = 7;
  [[0, 128, 512, 128], [128, 0, 128, 256], [384, 0, 384, 256]].forEach(([a, b, c2, d]) => {
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(c2, d);
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.ellipse(0, 128, 90, 128, 0, -Math.PI / 2, Math.PI / 2);
  ctx.ellipse(512, 128, 90, 128, 0, Math.PI / 2, Math.PI * 1.5);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Floating "Play" island: click the ball to kick it, click the bag to punch it.
 */
export function createPlayArea(THREE, position, facing) {
  const group = new THREE.Group();
  group.position.copy(position);
  // turn the island so its front (+z) faces `facing` (a world direction)
  if (facing) group.rotation.y = Math.atan2(facing.x, facing.z);

  const cream = new THREE.MeshStandardMaterial({ color: 0xefe6d6, roughness: 0.8 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xffb21e, roughness: 0.5, metalness: 0.1 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1d1d1d, roughness: 0.5, metalness: 0.4 });

  // Island
  const R = 2.1;
  const top = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.92, 0.35, 64), cream);
  top.position.y = -0.175;
  group.add(top);
  const under = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.92, R * 0.5, 0.5, 64), gold);
  under.position.y = -0.6;
  group.add(under);
  const mat = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.03, 48), new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.9 }));
  mat.position.set(0.55, 0.015, 0.2);
  group.add(mat);

  // Punching bag on a stand
  const standX = -1.35;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.7, 16), dark);
  pole.position.set(standX, 1.35, -0.4);
  group.add(pole);
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.08, 24), dark);
  foot.position.set(standX, 0.04, -0.4);
  group.add(foot);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 0.08), dark);
  arm.position.set(standX + 0.5, 2.62, -0.4);
  group.add(arm);

  const pivot = new THREE.Group();
  pivot.position.set(standX + 0.92, 2.58, -0.4);
  group.add(pivot);
  const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 8), dark);
  chain.position.y = -0.2;
  pivot.add(chain);
  const bagMat = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.55, metalness: 0.05 });
  const bag = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.85, 8, 24), bagMat);
  bag.position.y = -0.4 - 0.72;
  pivot.add(bag);
  [-0.25, 0.25].forEach((dy) => {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.305, 0.025, 8, 32), gold);
    band.rotation.x = Math.PI / 2;
    band.position.y = bag.position.y + dy;
    pivot.add(band);
  });

  // Ball
  const r = 0.24;
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(r, 32, 24),
    new THREE.MeshStandardMaterial({ map: basketballTexture(THREE), roughness: 0.65 })
  );
  ball.position.set(0.7, r, 0.5);
  group.add(ball);

  // Dumbbell for decoration
  const db = new THREE.Group();
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 12), dark);
  bar.rotation.z = Math.PI / 2;
  db.add(bar);
  [-0.22, 0.22].forEach((x) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 20), gold);
    w.rotation.z = Math.PI / 2;
    w.position.x = x;
    db.add(w);
  });
  db.position.set(0.3, 0.09, -1.2);
  db.rotation.y = 0.6;
  group.add(db);

  const sign = makeLabel(THREE, 'PLAY ZONE', { color: '#111', bg: '#ffbd39', width: 1.3, font: 800 });
  sign.position.set(0.4, 3.0, -0.4);
  group.add(sign);

  const hint = makeLabel(THREE, 'click the ball · punch the bag', { width: 1.1, font: 500 });
  hint.position.set(0.4, 2.65, -0.4);
  group.add(hint);

  const light = new THREE.PointLight(0xffa64d, 4, 6);
  light.position.set(0.3, 2.4, 1.2);
  group.add(light);

  // "POW!" pop-up
  const pow = makeLabel(THREE, 'POW!', { color: '#111', bg: '#ffbd39', width: 0.8, font: 900 });
  pow.visible = false;
  group.add(pow);
  let powT = -1;

  // Simple physics state
  const vel = new THREE.Vector3();
  const swing = new THREE.Vector2(); // angle around x, z
  const swingV = new THREE.Vector2();
  const tmp = new THREE.Vector3();
  const UP = new THREE.Vector3(0, 1, 0);

  const localDir = (camera) => {
    // camera forward, flattened, in island-local space
    camera.getWorldDirection(tmp);
    tmp.y = 0;
    if (tmp.lengthSq() < 1e-4) tmp.set(0, 0, -1);
    return tmp.applyAxisAngle(UP, -group.rotation.y).normalize();
  };

  const showPow = (worldPoint) => {
    pow.position.copy(group.worldToLocal(worldPoint.clone())).add(new THREE.Vector3(0, 0.35, 0));
    pow.visible = true;
    powT = 0;
  };

  return {
    group,
    clickables: [ball, bag],
    get focus() {
      return new THREE.Vector3(0, 1.2 * group.scale.y, 0).add(position);
    },
    hit(object, point, camera) {
      const dir = localDir(camera);
      if (object === ball) {
        vel.set(dir.x * 3 + (Math.random() - 0.5), 4.6 + Math.random(), dir.z * 3 + (Math.random() - 0.5));
        return true;
      }
      if (object === bag) {
        // rotate about the axis perpendicular to the punch direction
        swingV.x += dir.z * 3.2;
        swingV.y -= dir.x * 3.2;
        showPow(point);
        return true;
      }
      return false;
    },
    update(dt) {
      dt = Math.min(dt, 1 / 30);

      // Ball: gravity, bounce on the island, stay on it
      vel.y -= 9.8 * dt;
      ball.position.addScaledVector(vel, dt);
      if (ball.position.y < r) {
        ball.position.y = r;
        vel.y = Math.abs(vel.y) > 0.6 ? -vel.y * 0.62 : 0;
        vel.x *= 0.9;
        vel.z *= 0.9;
      }
      const flat = Math.hypot(ball.position.x, ball.position.z);
      const maxR = R - r - 0.1;
      if (flat > maxR) {
        const nx = ball.position.x / flat;
        const nz = ball.position.z / flat;
        ball.position.x = nx * maxR;
        ball.position.z = nz * maxR;
        const dot = vel.x * nx + vel.z * nz;
        if (dot > 0) {
          vel.x -= 1.8 * dot * nx;
          vel.z -= 1.8 * dot * nz;
        }
      }
      if (ball.position.y <= r + 1e-3) {
        vel.x *= 1 - 1.2 * dt;
        vel.z *= 1 - 1.2 * dt;
      }
      const speed = Math.hypot(vel.x, vel.z);
      if (speed > 1e-3) {
        tmp.set(vel.z, 0, -vel.x).normalize().applyAxisAngle(UP, group.rotation.y);
        ball.rotateOnWorldAxis(tmp, (speed * dt) / r);
      }

      // Bag: damped spring swing
      swingV.x += (-14 * swing.x - 1.6 * swingV.x) * dt;
      swingV.y += (-14 * swing.y - 1.6 * swingV.y) * dt;
      swing.addScaledVector(swingV, dt);
      pivot.rotation.x = swing.x;
      pivot.rotation.z = swing.y;

      if (powT >= 0) {
        powT += dt / 0.7;
        const s = 0.8 * easeOutBack(Math.min(1, powT * 2.5));
        pow.scale.set(s, s / pow.userData.aspect, 1);
        pow.material.opacity = 1 - Math.max(0, powT - 0.5) * 2;
        pow.position.y += dt * 0.5;
        if (powT >= 1) {
          powT = -1;
          pow.visible = false;
        }
      }
    },
  };
}
