import { Project, Experience, Skill } from './types';

export const PORTFOLIO_OWNER = "Hemanth Eswaran";
export const PORTFOLIO_ROLE = "Senior Full Stack Engineer";

export const ABOUT_TEXT = `I am a passionate Full Stack Engineer with over 6 years of experience building scalable web applications. 
I specialize in the React ecosystem, Node.js, and cloud architecture. I love solving complex problems and creating intuitive, 
performant user experiences. Recently, I've been exploring Generative AI integration to build smarter interfaces.`;

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Python', level: 80, category: 'Backend' },
  { name: 'Tailwind', level: 95, category: 'Design' },
  { name: 'AWS', level: 75, category: 'Tools' },
  { name: 'Docker', level: 70, category: 'Tools' },
  { name: 'UI/UX', level: 65, category: 'Design' },
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'TechFlow Solutions',
    period: '2021 - Present',
    description: 'Leading a team of 5 developers migrating legacy apps to React 18. Improved site performance by 40%.'
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'Creative Agencify',
    period: '2018 - 2021',
    description: 'Developed 20+ client websites using Next.js and Headless CMS solutions. Implemented CI/CD pipelines.'
  },
  {
    id: '3',
    role: 'Junior Web Developer',
    company: 'StartUp Inc',
    period: '2016 - 2018',
    description: 'Assisted in building the MVP for a fintech product. Focused on responsive UI implementation.'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    description: 'A real-time analytics dashboard for online retailers featuring data visualization and inventory management.',
    tags: ['React', 'D3.js', 'Firebase'],
    imageUrl: 'https://picsum.photos/600/400?random=1',
    link: '#'
  },
  {
    id: '2',
    title: 'AI Task Manager',
    description: 'Smart to-do list app that uses NLP to automatically categorize and prioritize tasks.',
    tags: ['TypeScript', 'Gemini API', 'Node.js'],
    imageUrl: 'https://picsum.photos/600/400?random=2',
    link: '#'
  },
  {
    id: '3',
    title: 'Health Tracker',
    description: 'Mobile-first progressive web app for tracking workouts and nutrition plans.',
    tags: ['PWA', 'React', 'Tailwind'],
    imageUrl: 'https://picsum.photos/600/400?random=3',
    link: '#'
  },
  {
    id: '4',
    title: 'Crypto Portfolio',
    description: 'Real-time cryptocurrency tracker using WebSocket connections for live price updates.',
    tags: ['WebSocket', 'Chart.js', 'Redux'],
    imageUrl: 'https://picsum.photos/600/400?random=4',
    link: '#'
  }
];
