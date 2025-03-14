'use client';

import { motion } from 'framer-motion';
import { RetroGrid } from './RetroGrid';

export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
      <div className="absolute inset-0 z-0">
        <RetroGrid
          angle={65}
          cellSize={60}
          lineWidth={1.5}
          speed={1}
        />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-b from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent whitespace-normal sm:whitespace-pre-wrap leading-tight sm:leading-none tracking-tight"
        >
          Building the Future,
          <br className="hidden sm:block" />
          One Project at a Time
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
        >
          Tech enthusiast exploring AI/ML, agents, cybersecurity,
          <br className="hidden sm:block" />
          networking, and web development
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <a
            href="#projects"
            className="inline-block bg-gradient-to-r from-gray-800 to-black dark:from-white dark:to-gray-300 text-white dark:text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition-all transform hover:scale-105 active:scale-95"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-block bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-700"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
} 