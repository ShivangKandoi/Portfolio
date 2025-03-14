import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, stagger } from '../lib/utils';
import { siteConfig } from '../lib/constants';
import { Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import '../lib/fontawesome';
import { useState } from 'react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const Toast = ({ message, type }: ToastProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className={`fixed bottom-4 right-4 z-50 flex items-center space-x-2 rounded-lg px-4 py-3 shadow-lg ${
      type === 'success'
        ? 'bg-emerald-500/90 text-white backdrop-blur-sm'
        : 'bg-red-500/90 text-white backdrop-blur-sm'
    }`}
  >
    {type === 'success' ? (
      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
    ) : (
      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
    )}
    <p className="text-xs sm:text-sm font-medium">{message}</p>
  </motion.div>
);

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label?: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="p-2.5 rounded-full bg-white/80 hover:bg-white dark:bg-gray-900/50 dark:hover:bg-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
    aria-label={label}
  >
    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
  </motion.a>
);

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto URL with form data
      const subject = `Portfolio Contact: Message from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoUrl;
      
      // Show success message
      setToast({
        message: 'Opening your email client...',
        type: 'success',
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setToast({
        message: 'Failed to open email client. Please try again or use the email link above.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black py-16 sm:py-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-gray-500/10 blur-[120px] dark:bg-gray-400/20" />
      <div className="pointer-events-none absolute right-1/4 top-3/4 h-96 w-96 translate-x-1/2 -translate-y-1/2 bg-gray-600/10 blur-[120px] dark:bg-gray-500/20" />

      <div className="container px-4 mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          >
            Get in Touch
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto px-4"
          >
            Have a question or want to work together? Send me a message and I'll respond as soon as possible.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl"
            >
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={stagger}
              >
                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm text-sm sm:text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-all border-0 shadow-inner"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm text-sm sm:text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-all border-0 shadow-inner"
                    placeholder="your@email.com"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm text-sm sm:text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-all border-0 shadow-inner resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r from-gray-800 to-black dark:from-white dark:to-gray-300 text-white dark:text-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                </motion.button>
              </motion.form>
            </motion.div>

            {/* Contact Info & Illustration */}
            <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  Connect with me
                </h3>
                <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                  <SocialLink
                    href={`mailto:${siteConfig.email}`}
                    icon={Mail}
                    label="Email"
                  />
                  <SocialLink
                    href={siteConfig.links.github}
                    icon={Github}
                    label="GitHub"
                  />
                  <SocialLink
                    href={siteConfig.links.linkedin}
                    icon={Linkedin}
                    label="LinkedIn"
                  />
                  <motion.a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-full bg-white/80 hover:bg-white dark:bg-gray-900/50 dark:hover:bg-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="X (formerly Twitter)"
                  >
                    <FontAwesomeIcon 
                      icon={faXTwitter}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                  </motion.a>
                </div>
              </div>
              
              {/* Illustration */}
              <motion.div
                variants={fadeInUp}
                className="relative w-full h-[200px] sm:h-[280px] lg:h-[320px]"
              >
                <Image
                  src="/images/hand-drawn-people-talking-phone-illustration.png"
                  alt="People talking illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </section>
  );
} 