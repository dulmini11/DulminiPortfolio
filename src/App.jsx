import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser";
import { FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaDatabase, FaMapSigns, FaPhoneAlt, FaPaperPlane, FaLinkedin } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs } from 'react-icons/si'; // Import Tailwind and Next.js icons from 'si'
import v4 from './assets/v4.mp4';
import v1 from './assets/v1.mp4';
import v2 from './assets/v2.mp4';
import v3 from './assets/v3.mp4';
import v5 from './assets/v5.mp4';
import v6 from './assets/v6.mp4';
import v7 from './assets/v7.mp4';
import v8 from './assets/v8.mp4';
import v9 from './assets/v9.mp4';
import java from './images/java.png';
import sd1 from './images/sd1.png';
import pic from './images/bg_1.png';
import Malaysia from './images/karate.jpeg';
import football from './images/foodball.jpeg';
import school from './images/school.jpg';
import karatee from './images/karate2.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showName, setShowName] = useState(true);
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  // Add the auto-switching effect for intro sections every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowName(prev => !prev);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
      }, []);


    useEffect(() => {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, []);

useEffect(() => {
  const handleScroll = () => {
    const sections = ['home', 'about', 'projects', 'skills', 'blog', 'contact'];    
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // Check if section is in view for active navigation
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(sectionId);
        }

        // Check if section is in viewport for animations
        const sectionRect = section.getBoundingClientRect();
        const isInViewport = sectionRect.top < windowHeight * 0.8 && sectionRect.bottom > 0;
        
        if (isInViewport && !animatedSections.has(sectionId)) {
          // Add animation
          setAnimatedSections(prev => new Set([...prev, sectionId]));
          section.classList.add('animate-in');
        } else if (!isInViewport && animatedSections.has(sectionId)) {
          // Remove animation when section leaves viewport
          setAnimatedSections(prev => {
            const newSet = new Set(prev);
            newSet.delete(sectionId);
            return newSet;
          });
          section.classList.remove('animate-in');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  // Trigger on initial load
  handleScroll();
  
  return () => window.removeEventListener('scroll', handleScroll);
}, [animatedSections]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
    setShowMenu(false); 
  };

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_0oycc1y',
      'template_hjjfjc1',
      form.current,
      'userdhww'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch((err) => {
      console.error('FAILED...', err);
      alert("Message failed to send.");
    });
  };

  const skills = [
    { name: 'HTML', icon: <FaHtml5 color="#ffbd39" size={50} /> },
    { name: 'CSS', icon: <FaCss3Alt color="#ffbd39" size={50} /> },
    { name: 'JavaScript', icon: <FaJs color="#ffbd39" size={50} /> },
    { name: 'React', icon: <FaReact color="#ffbd39" size={50} /> },
    { name: 'Python', icon: <FaPython color="#ffbd39" size={50} /> },
    { name: 'Java', icon: <FaJava color="#ffbd39" size={50} /> },
    { name: 'Next.js', icon: <SiNextdotjs color="#ffbd39" size={50} /> },
    { name: 'Tailwind', icon: <SiTailwindcss color="#ffbd39" size={50} /> },
    { name: 'Node.js', icon: <FaNodeJs color="#ffbd39" size={50} /> },
    { name: 'SQL', icon: <FaDatabase color="#ffbd39" size={50} /> },

  ];

  const contactDetails = [
    {
      label: 'ADDRESS',
      icon: <FaMapSigns size={30} color="#ffbd39" />,
      info: 'Maharagama Colombo',
    },
    {
      label: 'CONTACT NUMBER',
      icon: <FaPhoneAlt size={30} color="#ffbd39" />,
      info: '+94 76 912 1952',
    },
    {
      label: 'EMAIL ADDRESS',
      icon: <FaPaperPlane size={30} color="#ffbd39" />,
      info: 'dulminihw@gmail.com',
    },
    {
      label: 'LINKEDIN',
      icon: <FaLinkedin size={30} color="#ffbd39" />,
      info: (
        <a
          href="https://www.linkedin.com/in/dulmini-wanigasekara-756740333/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-info"
        >
          Dulmini Wanigasekara
        </a>
      ),
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Story Sound HUB",
      description:
        "A collaborative full-stack group project that combines property listings with a second-hand book marketplace. Includes advanced property filtering, secure authentication, book trading features, AI-powered chatbot assistance, user reviews, purchasing options, and a fully responsive design.",
      image: null,
      github: "https://github.com/Visnumaynan/Storysoundhub",
      video: v4,
    },
    {
      id: 2,
      title: "Zoom to Space",
      description:
        "An interactive astronomy web app featuring a solar system carousel, animated visuals, and detailed information about planets, astronauts, and space objects. Designed to make learning space concepts intuitive and engaging.",
      image: null,
      github: "https://github.com/dulmini11/ZoomToSpace2",
      deploy: "https://zoom-to-space.vercel.app",
      video: v5,
    },
    {
      id: 3,
      title: "CoinWish",
      description:
        "A modern expense tracking application with category filtering, search, sorting, interactive charts, custom categories, an integrated calculator, CRUD with modal forms, dark/light mode, and local storage persistence for offline usage.",
      image: null,
      github: "https://github.com/dulmini11/coinwise",
      deploy: "https://coinwise-v7eg.vercel.app",
      video: v9,
    },
    {
      id: 4,
      title: "Scientific Research Data Management System",
      description:
        "A structured and scalable Python-based system for managing scientific research data, featuring OOP design, advanced serialization, statistical analysis, robust validation, and a fully integrated graphical user interface for efficient data exploration and management.",
      image: sd1,
      github: "https://github.com/dulmini11/Scientific-Research-Data-Management-System",
      video: null,
    },
    {
      id: 5,
      title: "WorkshopX",
      description:
        "A modern, responsive workshop management platform built with React.js that enables users to explore, search, filter, and sort upcoming workshops with ease. Users can view detailed workshop information, register or unregister for events, submit ratings and feedback, and track their activity through a personal dashboard. The application emphasizes clean UI/UX, smooth interactions, and efficient state management using mock data and client-side logic.",
      image: null,
      github: "https://github.com/dulmini11/workshop-app",
      deploy: "https://workshop-app-qzum.vercel.app",
      video: v8,
    },
    {
      id: 6,
      title: "Java Student Management System",
      description:
        "A comprehensive Java application designed for managing student academic data, featuring validated student registration, efficient search and sorting mechanisms, persistent file-based storage, module-level mark handling, grade computation, and automated report generation. The system applies object-oriented programming principles, custom sorting algorithms, and structured file I/O to ensure data accuracy and reliability.",
      image: java,
      github: "https://github.com/dulmini11/Java-Student-Management-System",
      video: null,
    },
    {
      id: 7,
      title: "Real Estate Listings Platform",
      description:
        "A property search platform featuring filters for type, price, bedrooms, date, and location. Includes dynamic listings, favorites via local storage, responsive UI, tab-based detail views, and Google Maps integration.",
      image: null,
      github: "https://github.com/dulmini11/Real-estate-website",
      video: v1,
    },
    {
      id: 8,
      title: "Climatrix (Weather Website)",
      description:
        "A real-time weather forecasting application providing current conditions, 7-day forecasts, temperature trends, humidity, wind speed, and sunrise/sunset details in a clean and responsive layout.",
      image: null,
      github: "https://github.com/dulmini11/climatrix",
      deploy: "https://your-deploy-link.com",
      video: v6,
    },
    {
      id: 9,
      title: "FocusZone",
      description:
        "A productivity web app featuring a Pomodoro study timer, relaxing video backgrounds, and an interactive Tic Tac Toe game, designed to promote focused work sessions and mindful breaks.",
      image: null,
      github: "https://github.com/dulmini11/Tic-Tac-Toe",
      deploy: "https://tictacteokd.netlify.app",
      video: v7,
    },
    {
      id: 10,
      title: "QuickRoute E01",
      description:
        "Developed the frontend of QuickRoute E01, a web-based bus booking platform for the Southern Expressway. Implemented user-friendly interfaces using React.js, enabling seamless bus booking, real-time bus search and ticket visibility.",
      image: null,
      github: "https://github.com/dulmini11/BusTicketBooking",
      video: v2,
    },
    {
      id: 11,
      title: "Wellness & Well-Being Website",
      description:
        "A group project promoting healthy living through recipe pages, wellness product carts, and exercise guides, designed with an interactive and user-friendly interface.",
      image: null,
      video: v3,
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showMenu, setShowMenu] = useState(false); // For mobile menu toggle

  return (
    <div className="portfolio">
      <header className="header">
        <div className="logo">WWDH</div>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          {['home', 'about', 'projects', 'skills', 'blog', 'contact'].map(section => (
            <button
              key={section}
              className={activeSection === section ? 'nav-link active' : 'nav-link'}
              onClick={() => scrollToSection(section)}
            >
              {section === 'blog'
                ? 'My Blog'
                : section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>

        {/* Hamburger Menu (Mobile only) */}
        <button
          className="hamburger"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Mobile Navigation Popup */}
        <div className={`nav-popup ${showMenu ? 'active' : ''}`}>
          <nav className="nav mobile-nav">
            {['home', 'about', 'projects', 'skills', 'blog', 'contact'].map(section => (
              <button
                key={section}
                className={activeSection === section ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  scrollToSection(section);
                  setShowMenu(false);
                }}
              >
                {section === 'blog'
                  ? 'My Blog'
                  : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="mouse-cursor-style1">
          <div
            className={`cursor-dot ${isClicking ? 'clicking' : ''}`}
            style={{
              left: mousePosition.x - 4,
              top: mousePosition.y - 4,
            }}
          />
          <div
            className="cursor-ring"
            style={{
              left: mousePosition.x - 20,
              top: mousePosition.y - 20,
            }}
          />
        </div>
        <div className="floating-orbs">
          <div class="code-snippet code-1" data-text="const DulminiPortfolio = () => { return <Portfolio />; };">const DulminiPortfolio = () =&gt; &#123; return &lt;Portfolio /&gt;; &#125;;</div>
          <div class="code-snippet code-2" data-text="useEffect(() => { fetchDulminiProjects(); }, []);">useEffect(() =&gt; &#123; fetchDulminiProjects(); &#125;, []);</div>
          <div class="code-snippet code-3" data-text="public class DulminiProject { private String title; }">public class DulminiProject &#123; private String title; &#125;</div>
          <div class="code-snippet code-4" data-text="def dulmini_portfolio(): return render_template('portfolio.html')">def dulmini_portfolio(): return render_template(&apos;portfolio.html&apos;)</div>
          <div class="code-snippet code-5" data-text="SELECT * FROM dulmini_projects WHERE featured = true;">SELECT * FROM dulmini_projects WHERE featured = true;</div>
          <div class="code-snippet code-6" data-text="@Entity public class Portfolio { @Id private Long id; }">@Entity public class Portfolio &#123; @Id private Long id; &#125;</div>
          <div class="code-snippet code-7" data-text="class DulminiAPI(APIView): def get(self, request):">class DulminiAPI(APIView): def get(self, request):</div>
          <div class="code-snippet code-8" data-text="CREATE TABLE dulmini_skills (id INT, skill_name VARCHAR(100));">CREATE TABLE dulmini_skills (id INT, skill_name VARCHAR(100));</div>
          <div class="code-snippet code-9" data-text="document.querySelector('.dulmini-nav').addEventListener('click', handler);">document.querySelector(&apos;.dulmini-nav&apos;).addEventListener(&apos;click&apos;, handler);</div>
          <div class="code-snippet code-10" data-text="@RestController @RequestMapping('/api/dulmini')">@RestController @RequestMapping(&apos;/api/dulmini&apos;)</div>
        </div>

        {/* Home Section with Complete Page Swapping */}
        {showName ? (
          // PAGE 1 - Name Version
          <section id="home" className={`section home-section ${showName ? 'visible' : ''}`}>
            <div className="intro-section">
              <div className="intro-text">
                <span className="hello">HELLO!</span>
                <h1 className="name">I'm <span className="highlight">Dulmini Wanigasekara</span></h1>
                <p className="location">based in Sri Lanka</p>
                <a 
                  href="https://github.com/dulmini11" 
                  className="github-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/dulmini-wanigasekara-756740333/" 
                  className="linkedin-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="/CV2.pdf"
                  className="download-cv btn btn-primary py-3 px-3"
                  download="DulminiWanigasekaraCV.pdf"
                >
                  Download CV
                </a>
              </div>
              <div className="profile-image">
                <img src={pic} alt="Dulmini Wanigasekara" />
              </div>
            </div>
          </section>
        ) : (
          <section id="home" className="section home-section">
            <div className="intro-section">
              <div className="intro-text">
                <span className="hello">HELLO!</span>
                <h1 className="name">I'm <span className="highlight">Software <br/>Developer</span></h1>
                <p className="location">based in Sri Lanka</p>
                <a 
                  href="https://github.com/dulmini11" 
                  className="github-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/dulmini-wanigasekara-756740333/" 
                  className="linkedin-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="/CV2.pdf"
                  className="download-cv2 btn btn-primary py-3 px-3"
                  download="DulminiWanigasekaraCV.pdf"
                >
                  Download CV
                </a>
              </div>
              <div className="profile-image">
                <img src={pic} alt="Dulmini Wanigasekara" />
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        <section id="about" className="skills-section section-about">
          <div className="floating-orbs-2">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
            <div className="orb orb-4"></div>
          </div>

          <div className="profile-section two-columns">
            <div className="left-column">
              <div className="skills-header">
                <h2 className="skills-title">About Me</h2>
                <h1 className="skills-background">About</h1>
              </div>
            </div>
            <div className="right-column">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">Dulmini Wanigasekara</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date of birth:</span>
                <span className="info-value">March 11, 2005</span>
              </div>
              <div className="info-item">
                <span className="info-label">School:</span>
                <span className="info-value">St. Thomas Girls' High School Matara</span>
              </div>
              <div className="info-item">
                <span className="info-label">University:</span>
                <span className="info-value">IIT Campus, Sri Lanka (Affiliated with University of Westminster)</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">Maharagama Colombo</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">dulminihw@gmail.com</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">+94 76 912 1952</span>
              </div>
              <div className="profile-image2">
                <div className="project-count">
                  <span className="count">7+</span> Project complete
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id='projects' className='skills-section section-projects'>
          <div className="skills-header">
            <h2 className="skills-title">My Project</h2>
            <h1 className="skills-background">Project</h1>
          </div>
          <div className="project-grid"> 
            {projects.slice(0, showAllProjects ? projects.length : 9).map((project) => (
              <div key={project.id} className="project-card">
                {project.image && (
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                )}
                {project.video && (
                  <div className="project-video">
                    <video controls width="100%" style={{ borderRadius: '10px'}}>
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-description">
                      <p>{project.description}</p>
                  </div>

                      <div
                        className="social-links project-links"
                        style={{ marginTop: "15px", gap: "0.2px", justifyContent: "flex-end" }}
                      >
                        {/* Show GitHub only if github link exists */}
                        {project.github && (
                          <a
                            href={project.github}
                            className="github-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ width: "32px", height: "32px", fontSize: "14px" }}
                          >
                            <i className="fab fa-github" style={{ fontSize: "23px" }}></i>
                          </a>
                        )}

                        {/* Show Deploy only if deploy link exists */}
                        {project.deploy && (
                          <a
                            href={project.deploy}
                            className="linkedin-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ width: "32px", height: "32px", fontSize: "14px" }}
                          >
                            <i className="fas fa-external-link-alt" style={{ fontSize: "15px" }}></i>
                          </a>
                        )}
                    </div>
                </div>
              </div>
            ))}
          </div>
          {projects.length > 9 && (
            <div className="view-more-container">
              <button 
                className="view-more-btn"
                onClick={() => setShowAllProjects(!showAllProjects)}
              >
                {showAllProjects ? 'View Less' : 'View More'}
              </button>
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section id='skills' className="skills-section section-skills">
          <div className="skills-header"> 
            <h2 className="skills-title">My Skills</h2>
            <h1 className="skills-background">Skills</h1>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                {skill.icon}
                <p className="skill-name">{skill.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="section-blog">
          <div className="achievements-header">
            <h2 className="achievements-title">My blog</h2>
            <h1 className="achievements-background">blog</h1>
          </div>
          <div className="timeline-container">
            <div className="achievement-grid">
              <div className="achievement-item">
                <div className="achievement-card">
                  <div className="achievement-year">2018</div>
                  <div className="achievement-title">Represented the SriLankan junior karate team</div>
                  <div className="achievement-meta">Malaysia</div>
                  <img src={Malaysia} alt="Karate" className="achievement-img" />
                  <p className="mt-4">
                    1st Runner up Award 13-14 Female Kumite +40kg 8th International Karate-Do Open Championship 2018(Malaysia)
                  </p>
                </div>
              </div>
              <div className="achievement-item">
                <div className="achievement-card">
                  <div className="achievement-year">2018</div>
                  <div className="achievement-title">National Black belt player</div>
                  <div className="achievement-meta">Sri Lanka</div>
                  <img src={karatee} alt="Karate" className="achievement-img" />
                  <p className="mt-4">National Black belt player - 2018</p>
                </div>
              </div>
              <div className="achievement-item">
                <div className="achievement-card">
                  <div className="achievement-year">2016 - 2022</div>
                  <div className="achievement-title">St. Thomas Girls' High School</div>
                  <div className="achievement-meta">Matara</div>
                  <img src={school} alt="School" className="achievement-img" />
                  <p className="mt-4">Junior Prefect - 2020</p>
                  <p className="mt-4">Senior Prefect - 2021</p>
                  <p className="mt-4">Member of dancing, drama team & Eastern Band in school</p>
                  <p className="mt-4">Empowerment Organization/ Science Society 2017-2019</p>
                </div>
              </div>
              <div className="achievement-item">
                <div className="achievement-card">
                  <div className="achievement-year">2016-2022 & 2023-present</div>
                  <div className="achievement-title">School & University</div>
                  <div className="achievement-meta">Informatics Institute of Technology / St. Thomas Girls' High School</div>
                  <img src={football} alt="University" className="achievement-img" />
                  <p className="mt-4">Athletic - 100m / 400m Hurdles and relay team</p>
                  <p className="mt-4">Rugby player (Wing)</p>
                  <p className="mt-4">Football player </p>
                  <p className="mt-4">Netball player (WA)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className="skills-section section-contact">
          <div className="skills-header">
            <h2 className="skills-title">Contact Me</h2>
            <h1 className="skills-background">Contact</h1>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-content">
            <div className="contact-grid">
              {contactDetails.map((item, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-icon">{item.icon}</div>
                  <p className="contact-label">{item.label}</p>
                  <p className="contact-info">{item.info}</p>
                </div>
              ))}
            </div>
            <div className="contact-form">
              <form
                action="https://formsubmit.co/dulminihw@gmail.com"
                method="POST"
              >
                <div className="form-group">
                  <input type="text" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" name="subject" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="6"
                    required
                  ></textarea>
                </div>
                <input type="hidden" name="_captcha" value="false" />
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Dulmini Wanigasekara. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;