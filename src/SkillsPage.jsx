import React from 'react';
import './SkillPage.css'; // kept: the Projects section's filter buttons reuse some of these styles
import './SkillsShowcase.css';
import SkillsStudio3D from './SkillsStudio3D';
import { allSkills, knowledgeAreas } from './skillsData';

function Marquee({ reverse }) {
  // Items are duplicated so the strip can loop seamlessly
  const items = [...allSkills, ...allSkills];
  return (
    <div className={`sk-marquee ${reverse ? 'sk-marquee-reverse' : ''}`} aria-hidden="true">
      <div className="sk-marquee-track">
        {items.map(({ name, icon, color }, i) => (
          <span key={i} className="sk-marquee-item" style={{ '--brand': color }}>
            {icon} {name}
          </span>
        ))}
      </div>
    </div>
  );
}

// Moves the glow inside a card to follow the mouse
const trackGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

function SkillsPage() {
  return (
    <section id="skills" className="skills-section-network section-skills sk-section">
      <div className="skill-header">
        <h2 className="skill-title">My Skills</h2>
        <h1 className="skill-background">Skills</h1>
      </div>

      <p className="sk-intro">
        <span className="sk-count">{allSkills.length}</span> technologies I use to design, build and ship
        full-stack applications.
      </p>

      <Marquee />
      <Marquee reverse />

      <SkillsStudio3D />

      <div className="ak">
        <h3 className="ak-title">
          Areas of <span>Knowledge</span>
        </h3>
        <div className="ak-grid">
          {knowledgeAreas.map((area, index) => (
            <article
              key={area.id}
              className="ak-card"
              onMouseMove={trackGlow}
              style={{ '--delay': `${index * 0.12}s` }}
            >
              <span className="ak-icon">{area.icon}</span>
              <h4>{area.title}</h4>
              <p>{area.blurb}</p>
              <ul>
                {area.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsPage;
