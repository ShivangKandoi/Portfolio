'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, stagger } from '../lib/utils';
import Image from 'next/image';
import { ArrowRight, Code, Brain, Shield, Blocks, Rocket, X, ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  link?: string;
}

interface ExpertiseCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  projects: Project[];
  onClick: () => void;
}

const ProjectModal = ({ 
  expertise, 
  onClose 
}: { 
  expertise: typeof expertiseAreas[0] | null;
  onClose: () => void;
}) => {
  if (!expertise) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white/90 p-4 sm:p-6 shadow-xl backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/90"
        >
          <button
            onClick={onClose}
            className="absolute right-2 sm:right-4 top-2 sm:top-4 rounded-full p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="rounded-lg bg-gradient-to-b from-gray-500/10 to-gray-600/10 dark:from-gray-400/10 dark:to-gray-300/10 p-2">
              {expertise.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              {expertise.title}
            </h3>
          </div>

          <p className="mb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {expertise.description}
          </p>

          {expertise.projects && expertise.projects.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Related Projects
              </h4>
              {expertise.projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 sm:p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </h5>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ExpertiseCard = ({ 
  title, 
  icon,
  description,
  onClick
}: ExpertiseCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-gray-400 hover:bg-white dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-600 dark:hover:bg-gray-800/50 cursor-pointer"
    >
      <div className="flex items-start space-x-3">
        <div className="rounded-lg bg-gradient-to-b from-gray-500/10 to-gray-600/10 dark:from-gray-400/10 dark:to-gray-300/10 p-2">
          {icon}
        </div>
        <div>
          <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
        <ArrowRight className="ml-auto h-4 w-4 transform text-gray-400 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
};

const expertiseAreas = [
  {
    title: "Full-Stack Development",
    icon: <Code className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
    description: "Expert in MERN stack, Next.js, and modern UI frameworks. Building scalable and beautiful web applications with the latest technologies.",
    projects: [
      { 
        name: "Zemon", 
        description: "Open-source community platform built with Next.js, Tailwind, and AI integrations. A modern social platform for developers.",
        link: "https://github.com/yourusername/zemon"
      },
      { 
        name: "Zemon 2.0", 
        description: "Enhanced version with real-time collaboration, AI-powered content moderation, and advanced community features.",
        link: "https://github.com/yourusername/zemon-2"
      }
    ]
  },
  {
    title: "AI & ML Integration",
    icon: <Brain className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
    description: "Extensive experience with various AI APIs including OpenAI, Anthropic, Google AI, Cohere, and Stability AI. Currently building an advanced AI studio interface.",
    projects: [
      { 
        name: "AI Studio Interface", 
        description: "Building a ChatGPT-like interface for multiple AI models including Gemini, integrating various AI capabilities in a unified platform.",
        link: "https://github.com/yourusername/ai-studio"
      },
      { 
        name: "Multi-Model AI Integration", 
        description: "Working with GPT-4, Claude, Gemini, PaLM, DALL-E, Stable Diffusion, and other AI models for various applications.",
        link: "https://github.com/yourusername/ai-integrations"
      }
    ]
  },
  {
    title: "Cybersecurity",
    icon: <Shield className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
    description: "Learning cybersecurity as a passion project. Exploring network security and ethical hacking to understand system vulnerabilities and protection mechanisms.",
    projects: [
      { 
        name: "Security Learning Path", 
        description: "Personal learning journey through network security, penetration testing, and system hardening - purely for knowledge and understanding.",
        link: "https://github.com/yourusername/security-learning"
      },
      { 
        name: "Security Research", 
        description: "Documenting my exploration of various security concepts and best practices as a knowledge-building exercise.",
        link: "https://github.com/yourusername/security-notes"
      }
    ]
  },
  {
    title: "Emerging Tech",
    icon: <Blocks className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
    description: "Exploring cutting-edge technologies including quantum computing, AI advancements, and innovative hardware solutions. Learning about revolutionary developments in tech.",
    projects: [
      { 
        name: "Tech Research Collection", 
        description: "Studying breakthroughs like Google's Willow chip, DeepMind's innovations, AlphaGo, and autonomous AI agents.",
        link: "https://github.com/yourusername/tech-research"
      },
      { 
        name: "Quant & Future Tech", 
        description: "Exploring quantitative finance, quantum computing applications, and emerging technological paradigms.",
        link: "https://github.com/yourusername/future-tech"
      }
    ]
  }
];

export function About() {
  const [selectedExpertise, setSelectedExpertise] = useState<number | null>(null);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 sm:py-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-gray-500/10 blur-[120px] dark:bg-gray-400/20" />
      <div className="pointer-events-none absolute right-1/4 top-3/4 h-96 w-96 translate-x-1/2 -translate-y-1/2 bg-gray-600/10 blur-[120px] dark:bg-gray-500/20" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-4xl"
        >
          {/* Header & Introduction */}
          <motion.div variants={fadeInUp} className="mb-8 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-2xl sm:text-3xl font-bold text-transparent">
              About Me
            </h2>
            <div className="mx-auto max-w-3xl">
              <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                I am a highly driven and multidisciplinary developer, AI enthusiast, and cybersecurity explorer, constantly pushing the boundaries of technology.
              </p>
            </div>
          </motion.div>

          {/* Education Quick Info */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center">
              <div className="rounded-xl border border-gray-200 bg-white/80 px-4 sm:px-6 py-3 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                <span className="text-xs text-gray-600 dark:text-gray-400">Degree</span>
                <p className="font-medium text-sm text-gray-900 dark:text-gray-200">B.Tech in IT</p>
                <span className="text-xs text-gray-500 dark:text-gray-500">USICT Delhi</span>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white/80 px-4 sm:px-6 py-3 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                <span className="text-xs text-gray-600 dark:text-gray-400">Timeline</span>
                <p className="font-medium text-sm text-gray-900 dark:text-gray-200">2024 - 2028</p>
                <span className="text-xs text-gray-500 dark:text-gray-500">Freshman Year</span>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white/80 px-4 sm:px-6 py-3 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                <span className="text-xs text-gray-600 dark:text-gray-400">Focus Areas</span>
                <p className="font-medium text-sm text-gray-900 dark:text-gray-200">Full Stack & AI</p>
                <span className="text-xs text-gray-500 dark:text-gray-500">Web3 & Security</span>
              </div>
            </div>
          </motion.div>

          {/* Expertise Section */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h3 className="mb-4 text-center text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              My Expertise <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">(Click to explore)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertiseAreas.map((area, index) => (
                <motion.div 
                  key={area.title} 
                  variants={fadeInUp}
                  className="cursor-pointer"
                  onClick={() => setSelectedExpertise(index)}
                >
                  <div className="rounded-xl border border-gray-200 bg-white/80 p-4 sm:p-5 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50 hover:border-purple-200/50 dark:hover:border-purple-800/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="rounded-lg bg-gradient-to-b from-gray-500/10 to-gray-600/10 dark:from-gray-400/10 dark:to-gray-300/10 p-2">
                        {area.icon}
                      </div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {area.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Current Focus */}
          <motion.div variants={fadeInUp}>
            <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
              <div className="flex items-center space-x-2 mb-2">
                <Rocket className="h-4 sm:h-5 w-4 sm:w-5 text-gray-700 dark:text-gray-300" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Current Focus</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Actively working on AI-powered development tools and exploring the intersection of web technologies and artificial intelligence.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        expertise={selectedExpertise !== null ? expertiseAreas[selectedExpertise] : null}
        onClose={() => setSelectedExpertise(null)}
      />
    </section>
  );
} 