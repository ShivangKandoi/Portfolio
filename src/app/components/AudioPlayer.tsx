'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [autoplayAllowed, setAutoplayAllowed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check if autoplay is allowed
  useEffect(() => {
    const checkAutoplayPermission = async () => {
      try {
        // Create a temporary audio element to test autoplay
        const audio = new Audio();
        audio.volume = 0;
        audio.muted = true;
        
        // Try to play - if it fails, autoplay is not allowed
        await audio.play();
        setAutoplayAllowed(true);
        audio.pause();
      } catch (error) {
        console.log('Autoplay not allowed without user interaction');
        setAutoplayAllowed(false);
      }
    };

    checkAutoplayPermission();
  }, []);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/audio/background-music.mp3');
    audio.loop = true;
    audio.volume = 0;
    audio.muted = true;
    audioRef.current = audio;

    // Load the audio
    const loadAudio = async () => {
      try {
        await audio.load();
        setIsLoading(false);
        
        // Only attempt initial (muted) autoplay if allowed
        if (autoplayAllowed) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error('Playback failed:', error);
            });
          }
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
  }, [autoplayAllowed]); // Add autoplayAllowed as dependency

  const handleToggleAudio = async () => {
    if (!audioRef.current || isLoading) return;

    const audio = audioRef.current;
    
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    try {
      if (isMuted) {
        // Unmuting
        audio.muted = false;
        audio.volume = 0.5;
        await audio.play();
      } else {
        // Muting
        audio.muted = true;
        audio.volume = 0;
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Audio playback error:', error);
      // Reset to muted state if playback fails
      audio.muted = true;
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <motion.button
      onClick={handleToggleAudio}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: isLoading ? 1 : 1.1 }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
      aria-label={
        isLoading 
          ? 'Loading music...' 
          : (!hasInteracted 
              ? 'Click to enable background music' 
              : (isMuted ? 'Unmute background music' : 'Mute background music'))
      }
      disabled={isLoading}
      title={!hasInteracted ? "Click to enable background music" : undefined}
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