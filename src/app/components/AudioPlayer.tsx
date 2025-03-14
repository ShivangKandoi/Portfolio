'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/audio/background-music.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Load the audio
    const loadAudio = async () => {
      try {
        await audio.load();
        setIsLoading(false);
        if (!isMuted) {
          audio.play();
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        setIsLoading(false);
      }
    };

    loadAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [isMuted]);

  return (
    <motion.button
      onClick={() => !isLoading && setIsMuted(!isMuted)}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: isLoading ? 1 : 1.1 }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
      aria-label={isLoading ? 'Loading music...' : (isMuted ? 'Unmute background music' : 'Mute background music')}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 text-gray-900 dark:text-gray-400 animate-spin" />
      ) : isMuted ? (
        <VolumeX className="w-5 h-5 text-gray-900 dark:text-gray-400" />
      ) : (
        <Volume2 className="w-5 h-5 text-gray-900 dark:text-gray-400" />
      )}
    </motion.button>
  );
}