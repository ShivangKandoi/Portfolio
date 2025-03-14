'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [audio, setAudio] = useState<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Create hidden SoundCloud iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.allow = 'autoplay';
    
    // Add origin parameter to the URL
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    iframe.src = `https://w.soundcloud.com/player/?url=https://soundcloud.com/xlovesexmagicx/cassie-long-way-2-go&auto_play=true&show_artwork=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&origin=${origin}`;
    
    document.body.appendChild(iframe);
    setAudio(iframe);

    return () => {
      if (iframe) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

  useEffect(() => {
    if (audio) {
      try {
        const widget = (window as any).SC.Widget(audio);
        widget.setVolume(isMuted ? 0 : 50);
      } catch (error) {
        console.warn('SoundCloud widget not ready yet');
      }
    }
  }, [isMuted, audio]);

  return (
    <motion.button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-gray-900 dark:text-gray-400" />
      ) : (
        <Volume2 className="w-5 h-5 text-gray-900 dark:text-gray-400" />
      )}
    </motion.button>
  );
}