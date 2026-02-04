import React, { useState, useEffect } from 'react';
import { FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaGithub, FaFigma, FaDatabase, FaServer, FaCode } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiExpress, SiReact, SiJira, SiPostman, SiMysql, SiTypescript, SiMongodb} from 'react-icons/si';

function SkillsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animateLines, setAnimateLines] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Trigger line animation after component mounts
    setTimeout(() => setAnimateLines(true), 500);
  }, [activeTab]);

  
  const skillCategories = {
    all: [
      { name: 'HTML', icon: <FaHtml5 color="#ffbd39" size={50} />, category: 'frontend' },
      { name: 'CSS', icon: <FaCss3Alt color="#ffbd39" size={50} />, category: 'frontend' },
      { name: 'JavaScript', icon: <FaJs color="#ffbd39" size={50} />, category: 'frontend' },
      { name: 'TypeScript', icon: <SiTypescript color="#ffbd39" size={50} />, category: 'frontend' },
      { name: 'React', icon: <FaReact color="#ffbd39" size={50} />, category: 'frontend' },
      { name: 'Next.js', icon: <SiNextdotjs color="#ffbd39" size={50} />, category: 'frontend' },
      { name: 'Tailwind', icon: <SiTailwindcss color="#ffbd39" size={50} />, category: 'frontend' },
      { name: 'React Native', icon: <SiReact color="#ffbd39" size={50} />, category: 'frontend' },
      { name: 'Node.js', icon: <FaNodeJs color="#ffbd39" size={50} />, category: 'backend' },
      { name: 'Express.js', icon: <SiExpress color="#ffbd39" size={50} />, category: 'backend' },
      { name: 'Python', icon: <FaPython color="#ffbd39" size={50} />, category: 'backend' },
      { name: 'Java', icon: <FaJava color="#ffbd39" size={50} />, category: 'backend' },
      { name: 'MySQL', icon: <SiMysql color="#ffbd39" size={50} />, category: 'database' },
      { name: 'MongoDB', icon: <SiMongodb color="#ffbd39" size={50} />, category: 'database' },
      { name: 'Git/GitHub', icon: <FaGithub color="#ffbd39" size={50} />, category: 'tools' },
      { name: 'Postman', icon: <SiPostman color="#ffbd39" size={50} />, category: 'tools' },
      { name: 'Jira', icon: <SiJira color="#ffbd39" size={50} />, category: 'tools' },
      { name: 'Figma', icon: <FaFigma color="#ffbd39" size={50} />, category: 'tools' },
    ],
    frontend: [],
    backend: [],
    database: [],
    tools: []
  };

  // Populate category arrays
  skillCategories.frontend = skillCategories.all.filter(s => s.category === 'frontend');
  skillCategories.backend = skillCategories.all.filter(s => s.category === 'backend');
  skillCategories.database = skillCategories.all.filter(s => s.category === 'database');
  skillCategories.tools = skillCategories.all.filter(s => s.category === 'tools');

  const tabs = [
    { id: 'all', label: 'All Skills', icon: <FaCode /> },
    { id: 'frontend', label: 'Frontend', icon: <FaReact /> },
    { id: 'backend', label: 'Backend', icon: <FaServer /> },
    { id: 'database', label: 'Database', icon: <FaDatabase /> },
    { id: 'tools', label: 'Tools', icon: <FaGithub /> }
  ];

  const getSkillsToShow = () => {
    const skills = skillCategories[activeTab];
    if (!isMobile || showAllSkills) {
      return skills;
    }
    return skills.slice(0, 8);
  };

  const skillsToShow = getSkillsToShow();
  const totalSkills = skillCategories[activeTab].length;

  return (
    <section id='skills' className="skills-section-network section-skills">
      <div className="skill-header"> 
        <h2 className="skill-title">My Skills</h2>
        <h1 className="skill-background">Skills</h1>
      </div>

      {/* Network Lines Container */}
      <div className="network-lines-container">
        <svg className="network-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 189, 57, 0)" />
              <stop offset="50%" stopColor="rgba(255, 189, 57, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 189, 57, 0)" />
            </linearGradient>
          </defs>
          {/* Animated connection lines */}
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              className={`network-line ${animateLines ? 'animate' : ''}`}
              x1={`${(i * 12.5) + 6}%`}
              y1="0"
              x2={`${(i * 12.5) + 6}%`}
              y2="100"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Tabs Navigation */}
      <div className="skills-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id);
              setAnimateLines(false);
              setTimeout(() => setAnimateLines(true), 50);
            }}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {activeTab === tab.id && <div className="tab-indicator" />}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="skills-grid-network">
        {skillsToShow.map((skill, index) => (
          <div key={index} className="skill-card-network">
            <div className="skill-connector-line" />
            <div className="skill-content">
              {skill.icon}
              <p className="skill-name">{skill.name}</p>
            </div>
            <div className="skill-glow" />
          </div>
        ))}
      </div>
      
      {/* Show More Button for Mobile */}
      {isMobile && totalSkills > 8 && (
        <div className="skills-more-container">
          <button 
            className="skills-more-btn"
            onClick={() => setShowAllSkills(!showAllSkills)}
          >
            {showAllSkills ? 'Show Less' : `Show More`}
            <i className={`fas fa-chevron-${showAllSkills ? 'up' : 'down'}`}></i>
          </button>
          <p className="projects-count">
            Showing {showAllSkills ? totalSkills : Math.min(8, totalSkills)} of {totalSkills} skills
          </p>
        </div>
      )}
    </section>
  );
}

export default SkillsPage;