import React from 'react';
import { FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaGithub, FaFigma, FaLayerGroup, FaCube, FaRobot, FaShieldAlt } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiExpress, SiReact, SiJira, SiPostman, SiMysql, SiTypescript, SiMongodb, SiThreedotjs, SiBlender } from 'react-icons/si';

// `color` is the brand colour (used on hover and for the 3D icons)
export const categories = [
  {
    id: 'frontend',
    title: 'Frontend',
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
    skills: [
      { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Git/GitHub', icon: <FaGithub />, color: '#F05032' },
      { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
      { name: 'Jira', icon: <SiJira />, color: '#2684FF' },
      { name: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
    ],
  },
  {
    id: '3d',
    title: '3D',
    skills: [
      { name: 'Three.js', icon: <SiThreedotjs />, color: '#FFFFFF' },
      { name: 'Blender', icon: <SiBlender />, color: '#F5792A' },
    ],
  },
];

// Unique list for the scrolling strips (Three.js appears in two stacks)
export const allSkills = categories
  .flatMap((c) => c.skills)
  .filter((s, i, arr) => arr.findIndex((o) => o.name === s.name) === i);

export const knowledgeAreas = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    icon: <FaLayerGroup />,
    blurb: 'Building complete products end to end, from the interface to the API and the database behind it.',
    tags: ['React + Node.js', 'REST APIs', 'Auth', 'Deployment'],
  },
  {
    id: '3d',
    title: '3D & Interactive Web',
    icon: <FaCube />,
    blurb: 'Immersive, real-time 3D experiences in the browser, modelled in Blender and brought to life with Three.js.',
    tags: ['Three.js', 'Blender', 'WebGL', 'Animation'],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    icon: <FaRobot />,
    blurb: 'Adding intelligence to applications with machine learning concepts and modern AI models.',
    tags: ['Python', 'LLM integration', 'Prompt engineering', 'ML basics'],
  },
  {
    id: 'cyber',
    title: 'Cyber Security',
    icon: <FaShieldAlt />,
    blurb: 'Writing secure code and understanding how systems are attacked, so they can be defended.',
    tags: ['Secure coding', 'Encryption', 'Networking', 'Vulnerability testing'],
  },
];
