import { siteConfig } from '../lib/constants';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 border-t border-gray-200/10 dark:border-gray-800/10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <a
              href="#"
              className="text-sm text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 