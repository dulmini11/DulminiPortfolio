import React from 'react';
import { FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaGithub, FaFigma, FaDatabase, FaServer, FaTools, FaLaptopCode } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiExpress, SiReact, SiJira, SiPostman, SiMysql, SiTypescript, SiMongodb, SiThreedotjs } from 'react-icons/si';
import './SkillPage.css'; // kept: the Projects section's filter buttons reuse some of these styles
import './SkillsShowcase.css';

// `color` is the brand colour shown on hover
const categories = [
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Responsive, interactive interfaces that feel great to use.',
    icon: <FaLaptopCode />,
    skills: [
      { name: 'HTML', icon: <FaHtml5 />, color: '#E34F26' },
      { name: 'CSS', icon: <FaCss3Alt />, color: '#1572B6' },
      { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'React', icon: <FaReact />, color: '#61DAFB' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#FFFFFF' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#38BDF8' },
      { name: 'React Native', icon: <SiReact />, color: '#61DAFB' },
      { name: 'Three.js', icon: <SiThreedotjs />, color: '#FFFFFF' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'APIs and server logic that keep everything running.',
    icon: <FaServer />,
    skills: [
      { name: 'Node.js', icon: <FaNodeJs />, color: '#5FA04E' },
      { name: 'Express.js', icon: <SiExpress />, color: '#FFFFFF' },
      { name: 'Python', icon: <FaPython />, color: '#4B8BBE' },
      { name: 'Java', icon: <FaJava />, color: '#ED8B00' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    blurb: 'Designing and querying data, relational or document.',
    icon: <FaDatabase />,
    skills: [
      { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    blurb: 'Collaboration, testing and design in my daily workflow.',
    icon: <FaTools />,
    skills: [
      { name: 'Git/GitHub', icon: <FaGithub />, color: '#F05032' },
      { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
      { name: 'Jira', icon: <SiJira />, color: '#2684FF' },
      { name: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
    ],
  },
];

const allSkills = categories.flatMap(c => c.skills);

// Moves the glow inside a card to follow the mouse
const trackGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

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

      <div className="sk-grid">
        {categories.map((cat, index) => (
          <article
            key={cat.id}
            className={`sk-card sk-card-${cat.id}`}
            onMouseMove={trackGlow}
            style={{ '--delay': `${index * 0.12}s` }}
          >
            <div className="sk-card-head">
              <span className="sk-card-icon">{cat.icon}</span>
              <div>
                <h3 className="sk-card-title">{cat.title}</h3>
                <p className="sk-card-blurb">{cat.blurb}</p>
              </div>
              <span className="sk-card-num">{String(cat.skills.length).padStart(2, '0')}</span>
            </div>

            <ul className="sk-chips">
              {cat.skills.map(({ name, icon, color }) => (
                <li key={name} className="sk-chip" style={{ '--brand': color }}>
                  <span className="sk-chip-icon">{icon}</span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SkillsPage;
