import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaUserTie, FaMedal, FaTrophy, FaRunning, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import Malaysia from './images/karate.jpeg';
import karatee from './images/karate2.jpg';
import school from './images/school.jpg';
import football from './images/foodball.jpeg';
import './BlogPage.css';

const milestones = [
  {
    id: 'school',
    year: '2016 – 2022',
    tag: 'Leadership',
    icon: <FaUserTie />,
    title: "St. Thomas Girls' High School",
    location: 'Matara',
    image: school,
    highlights: [
      'Junior Prefect – 2020',
      'Senior Prefect – 2021',
      'Dancing, drama team & Eastern Band',
      'Empowerment Organization / Science Society 2017–2019',
    ],
  },
  {
    id: 'blackbelt',
    year: '2018',
    tag: 'National',
    icon: <FaMedal />,
    title: 'National Black Belt Player',
    location: 'Sri Lanka',
    image: karatee,
    highlights: ['National Black Belt player – 2018'],
  },
  {
    id: 'malaysia',
    year: '2018',
    tag: 'International',
    icon: <FaTrophy />,
    title: 'Represented the Sri Lankan Junior Karate Team',
    location: 'Malaysia',
    image: Malaysia,
    featured: true,
    highlights: [
      '🥈 1st Runner-up · 13–14 Female Kumite +40kg',
      '8th International Karate-Do Open Championship 2018',
    ],
  },
  {
    id: 'sports',
    year: '2016 – Present',
    tag: 'Multi-sport',
    icon: <FaRunning />,
    title: 'School & University Sports',
    location: "IIT / St. Thomas Girls' High School",
    image: football,
    highlights: [
      'Athletics: 100m / 400m Hurdles & relay',
      'Rugby player (Wing)',
      'Football player',
      'Netball player (WA)',
    ],
  },
];

// Position of an element relative to `root`, using layout offsets so CSS
// transforms (like the section's flip-in animation) don't skew the result
const offsetWithin = (el, root) => {
  let x = 0, y = 0;
  while (el && el !== root) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent;
  }
  return { x, y };
};

// Builds a snaking path through the dot centres, bulging left/right alternately
const buildPath = (points, height, amplitude) => {
  if (!points.length) return '';
  const first = points[0];
  let d = `M ${first.x} 0 L ${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const dy = b.y - a.y;
    const side = i % 2 === 0 ? -1 : 1;
    d += ` C ${a.x + amplitude * side} ${a.y + dy * 0.3}, ${b.x + amplitude * side} ${b.y - dy * 0.3}, ${b.x} ${b.y}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${height}`;
  return d;
};

function BlogPage() {
  const wrapRef = useRef(null);
  const dotRefs = useRef([]);
  const pathRef = useRef(null);
  const [geo, setGeo] = useState({ d: '', w: 0, h: 0, stops: [] });
  const [progress, setProgress] = useState(0);
  const [head, setHead] = useState(null);
  const lengthRef = useRef(0);

  // Measure dot positions and build the path (re-run on resize)
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = { width: wrap.offsetWidth, height: wrap.offsetHeight };
    const points = dotRefs.current.filter(Boolean).map(el => {
      const o = offsetWithin(el, wrap);
      return { x: o.x + el.offsetWidth / 2, y: o.y + el.offsetHeight / 2 };
    });
    const amplitude = window.innerWidth <= 768 ? 18 : 110;
    setGeo({
      d: buildPath(points, box.height, amplitude),
      w: box.width,
      h: box.height,
      stops: points.map(p => p.y / box.height),
    });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  // Draw the path as the viewport's centre moves through the section
  useEffect(() => {
    let frame;
    const update = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (anchor - r.top) / r.height));
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Keep path length + glowing "spark" position in sync
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !geo.d) return;
    lengthRef.current = path.getTotalLength();
    // Find the point on the path whose y matches the current progress
    const targetY = progress * geo.h;
    let lo = 0, hi = lengthRef.current;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      if (path.getPointAtLength(mid).y < targetY) lo = mid; else hi = mid;
    }
    const pt = path.getPointAtLength(lo);
    setHead({ x: pt.x, y: pt.y, len: lo });
  }, [progress, geo]);

  const total = lengthRef.current || 1;
  const drawn = head ? head.len : 0;

  return (
    <section id="blog" className="section-blog jp-section">
      <div className="achievements-header">
        <h2 className="achievements-title">My blog</h2>
        <h1 className="achievements-background">blog</h1>
      </div>

      <p className="jp-subtitle">
        My journey <span>beyond code</span>
      </p>
      <p className="jp-hint">Scroll to follow the path ↓</p>

      <div className="jp-wrap" ref={wrapRef}>
        {/* The path */}
        {geo.d && (
          <svg className="jp-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
            <defs>
              <linearGradient id="jpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffbd39" />
                <stop offset="100%" stopColor="#ff8c00" />
              </linearGradient>
            </defs>
            <path d={geo.d} className="jp-path-base" />
            {/* Wide soft stroke underneath = glow; thin bright stroke on top = line */}
            <path
              d={geo.d}
              className="jp-path-halo"
              stroke="url(#jpGrad)"
              style={{ strokeDasharray: total, strokeDashoffset: total - drawn }}
            />
            <path
              ref={pathRef}
              d={geo.d}
              className="jp-path-glow"
              stroke="url(#jpGrad)"
              style={{ strokeDasharray: total, strokeDashoffset: total - drawn }}
            />
            {head && progress > 0 && progress < 1 && (
              <g transform={`translate(${head.x} ${head.y})`}>
                <circle r="16" className="jp-spark-halo" />
                <circle r="6" className="jp-spark" />
              </g>
            )}
          </svg>
        )}

        {/* Milestones */}
        {milestones.map((m, i) => {
          const reached = geo.stops[i] !== undefined && progress >= geo.stops[i] - 0.02;
          return (
            <div
              key={m.id}
              className={`jp-row ${i % 2 ? 'jp-right' : 'jp-left'} ${reached ? 'reached' : ''} ${m.featured ? 'jp-featured' : ''}`}
            >
              <div className="jp-card">
                <div className="jp-photo">
                  <img src={m.image} alt={m.title} loading="lazy" />
                </div>
                <div className="jp-body">
                  <div className="jp-top">
                    <span className="jp-year">{m.year}</span>
                    <span className="jp-tag">{m.tag}</span>
                  </div>
                  <h3 className="jp-title">{m.title}</h3>
                  <p className="jp-loc"><FaMapMarkerAlt /> {m.location}</p>
                  <ul className="jp-list">
                    {m.highlights.map(h => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              </div>

              <div className="jp-node" ref={el => (dotRefs.current[i] = el)}>
                <span className="jp-node-icon">{m.icon}</span>
              </div>

              <div className="jp-spacer" />
            </div>
          );
        })}

        {/* End of the road (for now) */}
        <div className={`jp-row jp-end ${progress >= 0.97 ? 'reached' : ''}`}>
          <div className="jp-spacer" />
          <div className="jp-node jp-node-end" ref={el => (dotRefs.current[milestones.length] = el)}>
            <span className="jp-node-icon"><FaRocket /></span>
          </div>
          <div className="jp-spacer" />
          <p className="jp-end-text">
            <span>Next chapter</span>
            Building my future as a Software Engineer
          </p>
        </div>
      </div>
    </section>
  );
}

export default BlogPage;
