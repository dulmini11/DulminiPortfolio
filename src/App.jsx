
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser";
import { FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaDatabase } from 'react-icons/fa';
import { FaMapSigns, FaPhoneAlt, FaPaperPlane, FaLinkedin } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si'; // Import Next.js icon from simple-icons
import v4 from './assets/v4.mp4';
import v1 from './assets/v1.mp4';
import v2 from './assets/v2.mp4';
import v3 from './assets/v3.mp4';
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

  // Effect for swapping between name and role every 2 seconds
  useEffect(() => {
    const swapInterval = setInterval(() => {
      setShowName((prev) => !prev);
    }, 2000);

    return () => clearInterval(swapInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'blog', 'contact'];    
      const scrollPosition = window.scrollY;

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop - 100;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
  };

  const form = useRef();

const handleSubmit = (e) => {
  e.preventDefault();

  emailjs.sendForm(
    'service_0oycc1y',       // Your EmailJS service ID
    'template_hjjfjc1',      // Your EmailJS template ID
    form.current,            // Reference to the form element
    'userdhww'               // Your EmailJS public key (user ID or public key)
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
      description: "Collaborated on a group project, developing the frontend of an AI-powered book-sharing platform using React.js. Implemented features like book addition, swapping, interactive search filters, and an AI chatbot for user assistance, ensuring a seamless and engaging experience.",
      image: null,
      video:v4
    },
    {
      id: 2,
      title: "Real Estate Listings Platform",
      description: "Developed a React.js web app for property search and filtering by type, price, bedrooms, date, and location. Built an interactive UI with dynamic listings, favorites management (local storage), responsive design, and React tabs for detailed views. Integrated Google Maps .",
      image: null,
      video:v1
    },
    {
      id: 3,
      title: "QuickRoute E01",
      description: "Developed the frontend of QuickRoute E01, a web-based bus booking platform for the Southern Expressway. Implemented user-friendly interfaces using React.js, enabling seamless bus booking, real-time bus search, and ticket visibility.",
      image: null,
      video:v2
      
    },
    {
      id: 4,
      title: "Scientific Research Data Management System",
      description: "Developed a sophisticated system for managing and analyzing scientific research data in Python. including structured programming, object-oriented programming (OOP), advanced serialization techniques, and graphical user interface (GUI) development.",
      image: sd1,
      video:null
    },
    {
      id: 5,
      title: "Java Student Management System",
      description: "Created a Java-based system to manage student records with features like registration, deletion, search, file storage, and report generation. Implemented input validation, file handling, and sorting. All functionalities were successfully tested and passed.",
      image: java,
      video:null
    },
    {
      id: 6,
      title: "Wellness & Well-Being Website",
      description: "Developed a website featuring a cart for wellness products, healthy recipes, and exercise guides, promoting a healthier lifestyle with an interactive and user-friendly design.",
      image: null,
      video:v3
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and how to create your first component.",
      date: "April 10, 2025",
      image: null
    },
    {
      id: 2,
      title: "My Journey in Software Development",
      excerpt: "Reflecting on my experiences as an undergraduate in computer science.",
      date: "March 25, 2025",
      image: null
    },
    {
      id: 3,
      title: "Understanding JavaScript Promises",
      excerpt: "A deep dive into asynchronous JavaScript and how to use Promises effectively.",
      date: "March 15, 2025",
      image: null
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="portfolio">
      {/* Header */}
      <header className="header">
        <div className="logo">WWDH</div>
        <nav className="nav">
          <button 
            className={activeSection === 'home' ? 'nav-link active' : 'nav-link'} 
            onClick={() => scrollToSection('home')}
          >
            Home
          </button>
          <button 
            className={activeSection === 'about' ? 'nav-link active' : 'nav-link'} 
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
          <button 
            className={activeSection === 'projects' ? 'nav-link active' : 'nav-link'} 
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </button>
          <button 
            className={activeSection === 'skills' ? 'nav-link active' : 'nav-link'} 
            onClick={() => scrollToSection('skills')}
          >
            Skills
          </button>
          <button 
            className={activeSection === 'blog' ? 'nav-link active' : 'nav-link'} 
            onClick={() => scrollToSection('blog')}
          >
            My Blog
          </button>
          <button 
            className={activeSection === 'contact' ? 'nav-link active' : 'nav-link'} 
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </nav>
      </header>

      <main className="main-content">
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
                  href="./assets/cv.pdf" 
                  className="download-cv btn btn-primary py-3 px-3" 
                  download="DulminiWanigasekaraCV.pdf"
                >
                  Download CV
                </a>

              </div>
              <div className="profile-image">
                <div className="profile-image">
                  <img src={pic} alt="Dulmini Wanigasekara" />
                </div>
              </div>
            </div>
          </section>
        ) : (
          // PAGE 2 - Software Developer Version
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
                  href="./assets/cv.pdf" 
                  className="download-cv2 btn btn-primary py-3 px-3" 
                  download="DulminiWanigasekaraCV.pdf"
                >
                  Download CV
                </a>
              </div>
              <div className="profile-image">
                <div className="profile-image">
                  <img src={pic} alt="Dulmini Wanigasekara" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        <section id="about" className="skills-section">
          <div className="profile-section">
            <div className="profile-image">
              <img src={pic} alt="Dulmini Wanigasekara" />
            </div>
            <div className="title-container">
            <div className="skills-header">
        <h2 className="skills-title">About Me</h2>
        <h1 className="skills-background">About</h1>
      </div>
             
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">Dulmini Wanigasekara</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Date of birth:</span>
                <span className="info-value">march 11, 2005</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">School:</span>
                <span className="info-value">St. Thomas Girls 'High school Matara</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">University:</span>
                <span className="info-value">IIT Campus, Sri Lanka (Affiliated with the University of Westminster)</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">Maharagama Colombo</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">dulminihw@gamil.com</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">+94 76 912 1952</span>
              </div>
              
              <div className="project-count">
                <span className="count">7</span> Project complete
              </div>
              
             <a 
              href="./assets/cv.pdf" 
              className="download-cv btn btn-primary py-3 px-3" 
              download="DulminiWanigasekaraCV.pdf"
            >
              Download CV
            </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id='projects' className='skills-section'>
      <div className="skills-header">
        <h2 className="skills-title">My Project</h2>
        <h1 className="skills-background">Project</h1>
      </div>

        <div className="project-grid"> 
          {projects.map((project) => (
            <div key={project.id} className="project-card">

              {/* Image Block */}
              {project.image && (
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
              )}

              {/* Video Block - Only shows if video exists */}
              {project.video && (
                <div className="project-video">
                  <video controls width="100%" style={{ borderRadius: '10px'}}>
                    <source src={project.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Project Content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        </section>


        <section className="skills-section">
      <div section id='skills' className="skills-header"> 
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

{/* Achievements Section with Timeline */}
      <section id="blog">
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
                  11st Runner up Award 13-14 Female Kumite +40kg 8th International Karate-Do Open Championship 2018(Malaysia)
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
                <p className="mt-4">Rugby player</p>
                <p className="mt-4">Forward pass football player</p>
                <p className="mt-4">Athletic - 100m / 400m Hurdles and relay team</p>
                <p className="mt-4">Netball player (WA)</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>



      <section className="skills-section">
         <div section id='contact' className="skills-header">
        <h2 className="skills-title">Contact Me</h2>
        <h1 className="skills-background">Contact</h1>
      </div>
          
        </section>

        {/* Contact Section */}
        <section className="contact-section">
  <div className="contact-content">
    
    {/* Contact Grid */}
    <div className="contact-grid">
      {contactDetails.map((item, index) => (
        <div key={index} className="contact-card">
          <div className="contact-icon">{item.icon}</div>
          <p className="contact-label">{item.label}</p>
          <p className="contact-info">{item.info}</p>
        </div>
      ))}
    </div>

    {/* Contact Form */}
    <div className="contact-form">
      <form ref={form} onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
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