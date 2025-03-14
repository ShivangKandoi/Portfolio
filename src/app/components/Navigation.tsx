'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { navigationLinks } from '../lib/constants';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'light' : 'dark');
  };

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/10 dark:border-gray-800/10"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/#home" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              SK
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-1"
              >
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white
                    ${link.href.includes(activeSection)
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600/80 dark:text-gray-400/80'
                    }`}
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="switch">
                <input
                  type="checkbox"
                  checked={theme === 'light'}
                  onChange={handleThemeToggle}
                />
                <span className="slider">
                  <div className="star star_1"></div>
                  <div className="star star_2"></div>
                  <div className="star star_3"></div>
                  <svg viewBox="0 0 16 16" className="cloud">
                    <path
                      transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                      fill="#fff"
                      d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                    />
                  </svg>
                </span>
              </label>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="switch">
                <input
                  type="checkbox"
                  checked={theme === 'light'}
                  onChange={handleThemeToggle}
                />
                <span className="slider">
                  <div className="star star_1"></div>
                  <div className="star star_2"></div>
                  <div className="star star_3"></div>
                  <svg viewBox="0 0 16 16" className="cloud">
                    <path
                      transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                      fill="#fff"
                      d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                    />
                  </svg>
                </span>
              </label>
            </motion.div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4 py-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                      ${link.href.includes(activeSection)
                        ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                        : 'text-gray-600 dark:text-gray-400'
                      }`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
} 