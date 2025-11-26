import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Twitter, ExternalLink, Code2, Terminal, Cpu, Sun, Moon } from 'lucide-react';
import D3Background from './components/D3Background';
import ChatWidget from './components/ChatWidget';
import SkillsChart from './components/SkillsChart';
import ResumeModal from './components/ResumeModal';
import { PORTFOLIO_OWNER, PORTFOLIO_ROLE, ABOUT_TEXT, PROJECTS, EXPERIENCE } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    // Check system preference or default to dark
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // Optional: Auto-detect. For now, we default to 'dark' in state, but let's respect the HTML class
      if (document.documentElement.classList.contains('dark')) {
        setTheme('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Simple scroll spy to update active nav link and track scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll spy logic
      const sections = ['home', 'about', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      <D3Background />

      {/* Theme Toggle Button (Fixed Position with Scroll Effect) */}
      <button
        onClick={toggleTheme}
        className={`fixed right-6 z-[60] h-16 w-16 flex items-center justify-center rounded-2xl transition-all duration-300 ease-in-out
          ${isScrolled ? 'top-4' : 'top-0'}
          bg-transparent border-transparent shadow-none
          text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400
          lg:bg-transparent lg:border-transparent lg:shadow-none
          ${isScrolled 
            ? 'lg:bg-white/80 lg:dark:bg-slate-900/80 lg:backdrop-blur-md lg:border-slate-200 lg:dark:border-slate-700 lg:shadow-lg' 
            : 'lg:hover:bg-slate-200/50 lg:dark:hover:bg-slate-800/50' 
          }`}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <Sun size={28} /> : <Moon size={28} />}
      </button>

      {/* Navigation */}
      <nav 
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out flex justify-center max-w-7xl
          ${isScrolled 
            ? 'top-4 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg' 
            : 'top-0 w-full max-w-7xl rounded-none border border-transparent bg-transparent shadow-none'
          }
        `}
      >
        <div className="pl-6 pr-24 md:pr-28 h-16 flex items-center justify-between w-full">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 cursor-pointer" onClick={() => scrollTo('home')}>
            Hemanth Eswaran
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                    activeSection === item.toLowerCase() 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center px-6">
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-500">{PORTFOLIO_OWNER}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            {PORTFOLIO_ROLE} building next-generation digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowResume(true)}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
            >
              Resume
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-8 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-all"
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="relative py-20 px-6 bg-slate-100 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
              <Terminal className="text-purple-600 dark:text-purple-500" />
              About Me
            </h2>
            <div className="prose prose-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              {ABOUT_TEXT.split('\n').map((paragraph, i) => (
                 <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">5+</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Years of Experience</p>
               </div>
               <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">50+</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Projects Completed</p>
               </div>
            </div>
          </div>
          
          <div className="relative">
             <SkillsChart />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-900 dark:text-white">
            <Code2 className="text-indigo-600 dark:text-indigo-500" />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                    <a href={project.link} className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white bg-slate-100 dark:bg-slate-700 rounded-full transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-20 px-6 bg-slate-100 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-900 dark:text-white">
            <Cpu className="text-purple-600 dark:text-purple-500" />
            Work Experience
          </h2>
          <div className="space-y-8">
            {EXPERIENCE.map((job, index) => (
              <div key={job.id} className="relative pl-8 md:pl-0">
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-700 -translate-x-1/2"></div>
                
                <div className={`md:flex items-center justify-between gap-10 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-1"></div>
                  
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-500 border-4 border-white dark:border-slate-900 -translate-x-1/2 mt-1.5 md:mt-0 shadow-sm"></div>
                  
                  <div className="flex-1 mb-8 md:mb-0">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{job.role}</h3>
                        <span className="text-sm text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-500/10 px-2 py-1 rounded">{job.period}</span>
                      </div>
                      <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">{job.company}</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{job.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Let's Work Together</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-4 bg-white dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-600 transition-all duration-300 hover:-translate-y-1 shadow-md border border-slate-200 dark:border-slate-700"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
             <form className="space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Name</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Email</label>
                    <input type="email" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Message</label>
                  <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Your message..."></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
                  Send Message
                </button>
             </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 dark:text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
        <p>© {new Date().getFullYear()} {PORTFOLIO_OWNER}. Built with React, Tailwind & Gemini AI.</p>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget />
      
      {/* Resume Modal */}
      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
    </div>
  );
};

export default App;