import React, { useState, useEffect, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaNodeJs, FaDatabase, FaLaravel } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiTypescript } from 'react-icons/si';
import './ProjectsPage.css';
import v4 from './assets/v4.mp4';
import v1 from './assets/v1.mp4';
import v2 from './assets/v2.mp4';
import v3 from './assets/v3.mp4';
import v5 from './assets/v5.mp4';
import v6 from './assets/v6.mp4';
import v7 from './assets/v7.mp4';
import v8 from './assets/v8.mp4';
import v9 from './assets/v9.mp4';
import v10 from './assets/v10.mp4';
import v11 from './assets/v11.mp4';
import java from './images/java.png';
import sd1 from './images/sd1.png';

function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  
  // Check if mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTechDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Tech icons mapping
  const getTechIcon = (tech) => {
    const iconMap = {
      'HTML': <FaHtml5 color="#ffbd39" size={16} />,
      'CSS': <FaCss3Alt color="#ffbd39" size={16} />,
      'JavaScript': <FaJs color="#ffbd39" size={16} />,
      'React': <FaReact color="#ffbd39" size={16} />,
      'Python': <FaPython color="#ffbd39" size={16} />,
      'Node.js': <FaNodeJs color="#ffbd39" size={16} />,
      'Express.js': <FaNodeJs color="#ffbd39" size={16} />,
      'Java': <FaJava color="#ffbd39" size={16} />,
      'Next.js': <SiNextdotjs color="#ffbd39" size={16} />,
      'TypeScript': <SiTypescript color="#ffbd39" size={16} />,
      'Tailwind': <SiTailwindcss color="#ffbd39" size={16} />,
      'SQL': <FaDatabase color="#ffbd39" size={16} />,
      'MySQL': <FaDatabase color="#ffbd39" size={16} />,
      'Laravel': <FaLaravel color="#ffbd39" size={16} />,
      'JSON': <span style={{color: '#ffbd39', fontWeight: 'bold'}}>JSON</span>,
      'API': <span style={{color: '#ffbd39'}}>🔗</span>,
      'OpenWeather API': <span style={{color: '#ffbd39'}}>🌤️</span>,
    };
    return iconMap[tech] || <span style={{color: '#ffbd39'}}>💻</span>;
  };

  const projects = [
    {
      id: 1,
      title: "Story Sound HUB",
      description: "A collaborative full-stack group project that combines property listings with a second-hand book marketplace. Includes advanced property filtering, secure authentication, book trading features, AI-powered chatbot assistance, user reviews, purchasing options, and a fully responsive design.",
      image: null,
      github: "https://github.com/Visnumaynan/Storysoundhub",
      video: v4,
      category: "fullstack",
      date: "Feb 2025",
      type: "Group Project",
      techStack: ["React", "Laravel", "MySQL", "JavaScript", "CSS"],
    },
    {
      id: 2,
      title: "Zoom to Space",
      description: "An interactive astronomy web app featuring a solar system carousel, animated visuals, and detailed information about planets, astronauts, and space objects. Designed to make learning space concepts intuitive and engaging.",
      image: null,
      github: "https://github.com/dulmini11/ZoomToSpace2",
      deploy: "https://zoom-to-space.vercel.app",
      video: v5,
      category: "fullstack",
      date: "Jun 2025",
      type: "Individual Project",
      techStack: ["React", "JavaScript", "Express.js", "Node.js", "MySQL"],
    },
    {
      id: 3,
      title: "Secure Advanced Note Management System",
      description: "A full-stack web application for note management, featuring CRUD operations, categorization with tags, archive/trash functionality, checklists, password-protected notes, voice-to-text conversion, and a built-in calendar view. Offers a responsive, user-friendly interface with filtering, sorting, and advanced organizational capabilities.",
      image: null,
      github: "https://github.com/dulmini11/NotesApp",
      video: v10,
      category: "fullstack",
      date: "Jan 2026",
      type: "Individual Project",
      techStack: ["React", "JavaScript", "Express.js", "Node.js", "MySQL"],
    },
    {
      id: 4,
      title: "CoinWish",
      description: "A modern expense tracking application with category filtering, search, sorting, interactive charts, custom categories, an integrated calculator, CRUD with modal forms, dark/light mode, and local storage persistence for offline usage.",
      image: null,
      github: "https://github.com/dulmini11/coinwise",
      deploy: "https://coinwise-v7eg.vercel.app",
      video: v9,
      category: "frontend",
      date: "Oct 2025",
      type: "Individual Project",
      techStack: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      id: 5,
      title: "WorkshopX",
      description: "A modern, responsive workshop management platform built with React.js that enables users to explore, search, filter, and sort upcoming workshops with ease. Users can view detailed workshop information, register or unregister for events, submit ratings and feedback, and track their activity through a personal dashboard.",
      image: null,
      github: "https://github.com/dulmini11/workshop-app",
      deploy: "https://workshop-app-qzum.vercel.app",
      video: v8,
      category: "frontend",
      date: "Jul 2025",
      type: "Individual Project",
      techStack: ["React", "JavaScript", "CSS"],
    },
    {
      id: 6,
      title: "Scientific Research Data Management System",
      description: "A structured and scalable Python-based system for managing scientific research data, featuring OOP design, advanced serialization, statistical analysis, robust validation, and a fully integrated graphical user interface for efficient data exploration and management.",
      image: sd1,
      github: "https://github.com/dulmini11/Scientific-Research-Data-Management-System",
      video: null,
      category: "backend",
      date: "Apr 2024",
      type: "University Individual Project",
      techStack: ["Python", "JSON"],
    },
    {
      id: 7,
      title: "Java Student Management System",
      description: "A comprehensive Java application designed for managing student academic data, featuring validated student registration, efficient search and sorting mechanisms, persistent file-based storage, module-level mark handling, grade computation, and automated report generation.",
      image: java,
      github: "https://github.com/dulmini11/Java-Student-Management-System",
      video: null,
      category: "backend",
      date: "Nov 2024",
      type: "University Individual Project",
      techStack: ["Java", "JSON"],
    },
    {
      id: 9,
      title: "3D Rubik’s Cube Game",
      description: "A fully interactive 3D Rubik’s Cube web application built with React and Three.js, allowing users to rotate, scramble, and solve the cube in real time. Designed to enhance problem-solving skills through engaging 3D interactions and smooth animations.",
      image: null,
      github: "https://github.com/dulmini11/rubiks-cube-3b",
      deploy: "https://rubik-cube-3d-three.vercel.app",
      video: v11,
      category: "frontend",
      date: "Mar 2026",
      type: "Individual Project",
      techStack: ["React", "JavaScript", "Three.js"],
    },
    {
      id: 9,
      title: "Real Estate Listings Platform",
      description: "A property search platform featuring filters for type, price, bedrooms, date, and location. Includes dynamic listings, favorites via local storage, responsive UI, tab-based detail views, and Google Maps integration.",
      image: null,
      github: "https://github.com/dulmini11/Real-estate-website",
      video: v1,
      category: "frontend",
      date: "Jan 2025",
      type: "Individual Project",
      techStack: ["React", "JavaScript", "CSS"],
    },
    {
      id: 10,
      title: "Climatrix (Weather Website)",
      description: "A real-time weather forecasting application providing current conditions, 7-day forecasts, temperature trends, humidity, wind speed, and sunrise/sunset details in a clean and responsive layout.",
      image: null,
      github: "https://github.com/dulmini11/climatrix",
      deploy: "https://your-deploy-link.com",
      video: v6,
      category: "frontend",
      date: "May 2025",
      type: "Individual Project",
      techStack: ["Next.js", "TypeScript", "OpenWeather API", "Tailwind"],
    },
    {
      id: 11,
      title: "FocusZone",
      description: "A productivity web app featuring a Pomodoro study timer, relaxing video backgrounds, and an interactive Tic Tac Toe game, designed to promote focused work sessions and mindful breaks.",
      image: null,
      github: "https://github.com/dulmini11/Tic-Tac-Toe",
      deploy: "https://tictacteokd.netlify.app",
      video: v7,
      category: "frontend",
      date: "May 2025",
      type: "Individual Project",
      techStack: ["React", "JavaScript", "CSS"],
    },
    {
      id: 12,
      title: "QuickRoute E01",
      description: "Developed the frontend of QuickRoute E01, a web-based bus booking platform for the Southern Expressway. Implemented user-friendly interfaces using React.js, enabling seamless bus booking, real-time bus search and ticket visibility.",
      image: null,
      github: "https://github.com/dulmini11/BusTicketBooking",
      video: v2,
      category: "frontend",
      date: "Mar 2025",
      type: "Individual Project",
      techStack: ["React", "JavaScript", "CSS"],
    },
    {
      id: 13,
      title: "Wellness & Well-Being Website",
      description: "A group project promoting healthy living through recipe pages, wellness product carts, and exercise guides, designed with an interactive and user-friendly interface.",
      image: null,
      video: v3,
      category: "frontend",
      date: "Dec 2024",
      type: "Group Project",
      techStack: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/dulmini11"
    },
  ];

  // Extract all unique tech from projects
  const allTech = Array.from(new Set(projects.flatMap(project => project.techStack))).sort();
  
  // Categorize tech
  const programmingLanguages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'HTML', 'CSS'];
  const frameworksLibraries = ['React', 'Next.js', 'Node.js', 'Express.js', 'Laravel', 'Tailwind'];
  const databases = ['MySQL', 'SQL'];
  const otherTech = allTech.filter(tech => 
    !programmingLanguages.includes(tech) && 
    !frameworksLibraries.includes(tech) && 
    !databases.includes(tech)
  );

  // Filter projects based on category OR selected techs
  const filteredProjects = projects.filter(project => {
    // Category filter
    const categoryMatch = activeTab === 'all' || project.category === activeTab;
    
    // Tech filter (if any techs are selected)
    const techMatch = selectedTechs.length === 0 || 
      selectedTechs.some(tech => project.techStack.includes(tech));
    
    return categoryMatch && techMatch;
  });

  // Calculate initial projects to show based on screen size
  const getInitialProjectsCount = () => {
    return isMobile ? 4 : 6;
  };

  const initialProjectsCount = getInitialProjectsCount();
  const projectsToShow = showAllProjects ? filteredProjects.length : initialProjectsCount;

  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Fullstack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
  ];

  // Function to handle video errors
  const handleVideoError = (e) => {
    console.log('Video error:', e.target.src);
    e.target.style.display = 'none';
    e.target.parentElement.innerHTML = `
      <div class="project-placeholder">
        <div class="placeholder-icon">
          <i class="fas fa-video-slash"></i>
          <p style="font-size: 12px; margin-top: 10px;">Video not available</p>
        </div>
      </div>
    `;
  };

  // Handle tech selection
  const handleTechToggle = (tech) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter(t => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
      // Switch to 'all' tab when selecting a tech filter
      if (activeTab !== 'all') {
        setActiveTab('all');
      }
    }
  };

  // Clear all tech filters
  const clearTechFilters = () => {
    setSelectedTechs([]);
  };

  return (
    <section id='projects' className='projects-section'>
      <div className="projects-header">
        <div className="skills-header">
          <h2 className="skills-title">My Project</h2>
          <h1 className="skills-background">Project</h1>
        </div>
        
        {/* Main Navigation Tabs */}
        <div className="projects-tabs-container">
          <div className="projects-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Clear tech filters when switching to a category tab
                  if (tab.id !== 'all') {
                    setSelectedTechs([]);
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
            
            {/* Tech Filter Dropdown */}
            <div className="tech-filter-dropdown-container" ref={dropdownRef}>
              <button
                className={`tab-button ${selectedTechs.length > 0 ? 'active' : ''}`}
                onClick={() => setShowTechDropdown(!showTechDropdown)}
              >
                <i className="fas fa-code"></i>
                Filter by Tech
                {selectedTechs.length > 0 && (
                  <span className="tech-badge">{selectedTechs.length}</span>
                )}
                <i className={`fas fa-chevron-${showTechDropdown ? 'up' : 'down'}`}></i>
              </button>
              
              {showTechDropdown && (
                <div className="tech-dropdown-menu">
                  <div className="dropdown-header">
                    <h4>Select Technologies</h4>
                    <div className="dropdown-actions">
                      {selectedTechs.length > 0 && (
                        <button 
                          className="clear-selection-btn"
                          onClick={clearTechFilters}
                        >
                          Clear
                        </button>
                      )}
                      <button 
                        className="close-dropdown"
                        onClick={() => setShowTechDropdown(false)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="dropdown-categories">
                    {/* Programming Languages */}
                    <div className="dropdown-category">
                      <h5>
                        <i className="fas fa-laptop-code"></i>
                        Programming Languages
                      </h5>
                      <div className="dropdown-options">
                        {programmingLanguages
                          .filter(tech => allTech.includes(tech))
                          .map(tech => (
                            <label key={tech} className="tech-option">
                              <input
                                type="checkbox"
                                checked={selectedTechs.includes(tech)}
                                onChange={() => handleTechToggle(tech)}
                              />
                              <span className="tech-option-icon">{getTechIcon(tech)}</span>
                              <span className="tech-option-name">{tech}</span>
                              <span className="tech-option-count">
                                ({projects.filter(p => p.techStack.includes(tech)).length})
                              </span>
                            </label>
                          ))}
                      </div>
                    </div>
                    
                    {/* Frameworks & Libraries */}
                    <div className="dropdown-category">
                      <h5>
                        <i className="fas fa-cubes"></i>
                        Frameworks & Libraries
                      </h5>
                      <div className="dropdown-options">
                        {frameworksLibraries
                          .filter(tech => allTech.includes(tech))
                          .map(tech => (
                            <label key={tech} className="tech-option">
                              <input
                                type="checkbox"
                                checked={selectedTechs.includes(tech)}
                                onChange={() => handleTechToggle(tech)}
                              />
                              <span className="tech-option-icon">{getTechIcon(tech)}</span>
                              <span className="tech-option-name">{tech}</span>
                              <span className="tech-option-count">
                                ({projects.filter(p => p.techStack.includes(tech)).length})
                              </span>
                            </label>
                          ))}
                      </div>
                    </div>
                    
                    {/* Databases */}
                    {databases.filter(tech => allTech.includes(tech)).length > 0 && (
                      <div className="dropdown-category">
                        <h5>
                          <i className="fas fa-database"></i>
                          Databases
                        </h5>
                        <div className="dropdown-options">
                          {databases
                            .filter(tech => allTech.includes(tech))
                            .map(tech => (
                              <label key={tech} className="tech-option">
                                <input
                                  type="checkbox"
                                  checked={selectedTechs.includes(tech)}
                                  onChange={() => handleTechToggle(tech)}
                                />
                                <span className="tech-option-icon">{getTechIcon(tech)}</span>
                                <span className="tech-option-name">{tech}</span>
                                <span className="tech-option-count">
                                  ({projects.filter(p => p.techStack.includes(tech)).length})
                                </span>
                              </label>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Other Technologies */}
                    {otherTech.length > 0 && (
                      <div className="dropdown-category">
                        <h5>
                          <i className="fas fa-tools"></i>
                          Other Technologies
                        </h5>
                        <div className="dropdown-options">
                          {otherTech.map(tech => (
                            <label key={tech} className="tech-option">
                              <input
                                type="checkbox"
                                checked={selectedTechs.includes(tech)}
                                onChange={() => handleTechToggle(tech)}
                              />
                              <span className="tech-option-icon">{getTechIcon(tech)}</span>
                              <span className="tech-option-name">{tech}</span>
                              <span className="tech-option-count">
                                ({projects.filter(p => p.techStack.includes(tech)).length})
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Apply Button */}
                    <div className="dropdown-footer">
                      <button 
                        className="apply-filter-btn"
                        onClick={() => setShowTechDropdown(false)}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(activeTab !== 'all' || selectedTechs.length > 0) && (
        <div className="active-filters">
          {activeTab !== 'all' && (
            <span className="active-filter-tag">
              <i className="fas fa-folder"></i>
              {tabs.find(t => t.id === activeTab)?.label}
              <button onClick={() => setActiveTab('all')}>×</button>
            </span>
          )}
          
          {selectedTechs.map(tech => (
            <span key={tech} className="active-filter-tag">
              <i className="fas fa-code"></i>
              {tech}
              <button onClick={() => handleTechToggle(tech)}>×</button>
            </span>
          ))}
          
          {(activeTab !== 'all' || selectedTechs.length > 0) && (
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setActiveTab('all');
                clearTechFilters();
              }}
            >
              <i className="fas fa-times-circle"></i>
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.slice(0, projectsToShow).map((project) => (
          <div key={project.id} className="project-card">
            {/* Project Header with Date and Type */}
            <div className="project-header">
              <span className="project-type">{project.type}</span>
              <span className="project-date">{project.date}</span>
            </div>

            {/* Project Title */}
            <h3 className="project-title">{project.title}</h3>

            {/* Video or Image */}
            <div className="project-media">
              {project.video ? (
                <div className="project-video-wrapper">
                  <video 
                    controls 
                    width="100%" 
                    style={{ borderRadius: '8px' }}
                    onError={handleVideoError}
                  >
                    <source src={project.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : project.image ? (
                <div className="project-image-wrapper">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="project-placeholder">
                          <div class="placeholder-icon">
                            <i class="fas fa-image"></i>
                            <p style="font-size: 12px; margin-top: 10px;">Image not available</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
              ) : (
                <div className="project-placeholder">
                  <div className="placeholder-icon">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                </div>
              )}
            </div>

            {/* Description with Scroll */}
            <div className="project-description">
              <p>{project.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="project-tech-stack">
              {project.techStack.map((tech, index) => (
                <div key={index} className="tech-item">
                  <span className="tech-icon">{getTechIcon(tech)}</span>
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
            </div>

            {/* Project Links */}
            <div className="project-links">
              {project.github && (
                <a
                  href={project.github}
                  className="project-link pgithub-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                  <span>Code</span>
                </a>
              )}
              
              {project.deploy && (
                <a
                  href={project.deploy}
                  className="project-link deploy-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt"></i>
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View More Button - Show only if there are more projects than initial count */}
      {filteredProjects.length > initialProjectsCount && (
        <div className="view-more-container">
          <button 
            className="view-more-btn"
            onClick={() => setShowAllProjects(!showAllProjects)}
          >
            {showAllProjects ? 'View Less' : `View More`}
            <i className={`fas fa-chevron-${showAllProjects ? 'up' : 'down'}`}></i>
          </button>
          <p className="projects-count">
            Showing {projectsToShow} of {filteredProjects.length} projects
          </p>
        </div>
      )}
    </section>
  );
}

export default ProjectsPage;