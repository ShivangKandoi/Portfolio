import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../lib/utils';
import { useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Code2, Rocket, Brain, Wallet } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  category: string;
  tech: string[];
  features: string[];
  isHighlighted?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Zemon 2.0",
    description: "A revolutionary team collaboration platform combining productivity tools with music integration. Features real-time collaboration, task management, and SoundCloud integration.",
    link: "https://github.com/Zemon-tech/Zemon-2.0.git",
    icon: <Rocket className="w-6 h-6 text-purple-500 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" />,
    category: "Team Collaboration",
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind", "SoundCloud API"],
    features: ["Music-Powered Productivity", "Real-time Collaboration", "Smart Task Management"],
    isHighlighted: true
  },
  {
    id: 2,
    name: "ZEMON",
    description: "Modern open-source community platform for developers to discover projects, share news, and participate in events.",
    link: "https://github.com/Zemon-tech/ZEMON.git",
    icon: <Code2 className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />,
    category: "Community Platform",
    tech: ["Next.js 14", "TypeScript", "MongoDB", "Shadcn/UI"],
    features: ["Project Discovery", "Tech News", "Event Management"]
  },
  {
    id: 3,
    name: "SphereX",
    description: "Advanced social platform with AI-powered features and modern community engagement tools.",
    link: "https://github.com/Zemon-tech/SphereX.git",
    icon: <Brain className="w-6 h-6 text-cyan-500 dark:text-cyan-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors" />,
    category: "Social Platform",
    tech: ["React", "Node.js", "AI Integration", "Real-time Features"],
    features: ["AI-Powered Feed", "Community Tools", "Real-time Chat"]
  },
  {
    id: 4,
    name: "Expense Tracker",
    description: "Smart financial management tool with intuitive tracking and visualization features.",
    link: "https://github.com/ShivangKandoi/expenseTracker.git",
    icon: <Wallet className="w-6 h-6 text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors" />,
    category: "Finance",
    tech: ["React", "Charts.js", "Local Storage", "PWA"],
    features: ["Expense Analytics", "Budget Planning", "Visual Reports"]
  },
  {
    id: 5,
    name: "RJ Project",
    description: "Revolutionary JavaScript framework for building modern web applications.",
    link: "https://github.com/ShivangKandoi/RJ.0.0.0.1.git",
    icon: <Code2 className="w-6 h-6 text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />,
    category: "Framework",
    tech: ["JavaScript", "TypeScript", "Bundler", "CLI"],
    features: ["Component System", "State Management", "Build Tools"]
  },
  {
    id: 6,
    name: "AI Chron",
    description: "AI-powered time management and productivity enhancement platform.",
    link: "https://github.com/ShivangKandoi/ai-chron.git",
    icon: <Brain className="w-6 h-6 text-rose-500 dark:text-rose-400 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors" />,
    category: "Productivity",
    tech: ["AI/ML", "React", "Node.js", "MongoDB"],
    features: ["Smart Scheduling", "AI Assistant", "Time Analytics"]
  }
];

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.01,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="projects" className="relative min-h-screen flex items-center bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 sm:py-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 blur-[120px] dark:bg-blue-500/20" />
      <div className="pointer-events-none absolute right-1/4 top-3/4 h-96 w-96 translate-x-1/2 -translate-y-1/2 bg-purple-500/10 blur-[120px] dark:bg-purple-500/20" />
      
      <div className="container px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={cardVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          >
            Featured Projects
          </motion.h2>

          <motion.div
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className={`group relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-500 ${
                  project.isHighlighted
                    ? 'bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:via-blue-500/20 dark:to-cyan-500/20'
                    : 'bg-white/80 dark:bg-gray-900/50'
                } border border-gray-200/50 dark:border-gray-800/50 hover:border-purple-200/50 dark:hover:border-purple-800/50`}
              >
                {/* Animated gradient overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${
                    project.isHighlighted
                      ? 'from-purple-500/10 via-blue-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:via-blue-500/20 dark:to-cyan-500/20'
                      : 'from-purple-500/5 via-blue-500/5 to-cyan-500/5 dark:from-purple-500/10 dark:via-blue-500/10 dark:to-cyan-500/10'
                  }`}
                />
                
                {/* Card content with glass effect */}
                <div className="relative p-4 sm:p-5 backdrop-blur-[2px]">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        variants={iconVariants}
                        className={`p-2 sm:p-2.5 rounded-xl transition-colors duration-300 ${
                          project.isHighlighted
                            ? 'bg-purple-500/10 dark:bg-purple-500/20'
                            : 'bg-gray-100/80 dark:bg-gray-800/80'
                        }`}
                      >
                        {project.icon}
                      </motion.div>
                      <motion.h3 
                        variants={contentVariants}
                        className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white"
                      >
                        {project.name}
                      </motion.h3>
                    </div>
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={iconVariants}
                      whileHover="hover"
                      className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors"
                    >
                      <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" />
                    </motion.a>
                  </div>

                  <motion.p 
                    variants={contentVariants}
                    className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2"
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <motion.ul 
                    variants={contentVariants}
                    className="space-y-1.5"
                  >
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        custom={i}
                        variants={featureVariants}
                        className="flex items-center space-x-1.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400/50 dark:bg-gray-600/50" />
                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 