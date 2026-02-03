import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser";
import { FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaDatabase, FaMapSigns, FaPhoneAlt, FaPaperPlane, FaLinkedin, FaGithub, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiExpress, SiReact, SiJira, SiPostman, SiMysql, SiTypescript } from 'react-icons/si';
import pic from './images/bg_1.png';
import Malaysia from './images/karate.jpeg';
import football from './images/foodball.jpeg';
import school from './images/school.jpg';
import karatee from './images/karate2.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProjectsPage from './ProjectsPage';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showName, setShowName] = useState(true);
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const [limit, setLimit] = useState(9);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setLimit(5);
      } else if (width <= 1024) {
        setLimit(6);
      } else {
        setLimit(6);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  // Updated skills array with all technologies
  const skills = [
    { name: 'HTML', icon: <FaHtml5 color="#ffbd39" size={50} /> },
    { name: 'CSS', icon: <FaCss3Alt color="#ffbd39" size={50} /> },
    { name: 'JavaScript', icon: <FaJs color="#ffbd39" size={50} /> },
    { name: 'TypeScript', icon: <SiTypescript color="#ffbd39" size={50} /> },
    { name: 'React', icon: <FaReact color="#ffbd39" size={50} /> },
    { name: 'Python', icon: <FaPython color="#ffbd39" size={50} /> },
    { name: 'Java', icon: <FaJava color="#ffbd39" size={50} /> },
    { name: 'Next.js', icon: <SiNextdotjs color="#ffbd39" size={50} /> },
    { name: 'Tailwind', icon: <SiTailwindcss color="#ffbd39" size={50} /> },
    { name: 'Node.js', icon: <FaNodeJs color="#ffbd39" size={50} /> },
    { name: 'Express.js', icon: <SiExpress color="#ffbd39" size={50} /> },
    { name: 'React Native', icon: <SiReact color="#ffbd39" size={50} /> },
    { name: 'MySQL', icon: <SiMysql color="#ffbd39" size={50} /> },
    { name: 'Git/GitHub', icon: <FaGithub color="#ffbd39" size={50} /> },
    { name: 'Postman', icon: <SiPostman color="#ffbd39" size={50} /> },
    { name: 'Jira', icon: <SiJira color="#ffbd39" size={50} /> },
    { name: 'Figma', icon: <FaFigma color="#ffbd39" size={50} /> },
  ];

  // Calculate how many skills to show based on screen size
  const getSkillsToShow = () => {
    if (!isMobile || showAllSkills) {
      return skills;
    }
    return skills.slice(0, 8); // Show 8 skills on mobile initially
  };

  const skillsToShow = getSkillsToShow();

  const contactDetails = [
    {
      label: 'ADDRESS',
      icon: <FaMapSigns size={30} color="#ffbd39" />,
      info: 'Maharagama Colombo',
      link: 'https://www.google.com/maps/search/Maharagama+Colombo'
    },
    {
      label: 'CONTACT NUMBER',
      icon: <FaPhoneAlt size={30} color="#ffbd39" />,
      info: '+94 76 912 1952',
      link: 'tel:+94769121952'
    },
    {
      label: 'EMAIL ADDRESS',
      icon: <FaPaperPlane size={30} color="#ffbd39" />,
      info: 'dulminihw@gmail.com',
      link: 'mailto:dulminihw@gmail.com'
    },
    {
      label: 'LINKEDIN',
      icon: <FaLinkedin size={30} color="#ffbd39" />,
      info: 'Dulmini Wanigasekara',
      link: 'https://www.linkedin.com/in/dulmini-wanigasekara-756740333/'
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showMenu, setShowMenu] = useState(false);

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
              <div className="about-header">
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

        {/* Projects Section - Now imported from separate file */}
        <ProjectsPage />

        {/* Skills Section - UPDATED WITH VIEW MORE */}
        <section id='skills' className="skills-section section-skills">
          <div className="skills-header"> 
            <h2 className="skills-title">My Skills</h2>
            <h1 className="skills-background">Skills</h1>
          </div>
          <div className="skills-grid">
            {skillsToShow.map((skill, index) => (
              <div key={index} className="skill-card">
                {skill.icon}
                <p className="skill-name">{skill.name}</p>
              </div>
            ))}
          </div>
          
          {/* Show More Button for Mobile */}
          {isMobile && skills.length > 6 && (
            <div className="skills-more-container">
              <button 
                className="skills-more-btn"
                onClick={() => setShowAllSkills(!showAllSkills)}
              >
                {showAllSkills ? 'Show Less' : `Show More`}
                <i className={`fas fa-chevron-${showAllSkills ? 'up' : 'down'}`}></i>
              </button>
              <p className="projects-count">
                Showing {showAllSkills ? skills.length : 6} of {skills.length} skills
              </p>
            </div>
          )}
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
                <div
                  key={index}
                  className="contact-card"
                  onClick={() => window.open(item.link, '_blank')}
                  role="button"
                  tabIndex={0}
                >
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