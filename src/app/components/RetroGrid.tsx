'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface RetroGridProps {
  angle?: number;
  cellSize?: number;
  lineWidth?: number;
  speed?: number;
  opacity?: number;
  lineColor?: string;
}

export function RetroGrid({
  angle = 65,
  cellSize = 60,
  lineWidth = 1.5,
  speed = 1,
  opacity: defaultOpacity = 0.5,
  lineColor: defaultLineColor = 'rgba(0, 0, 0, 0.1)'
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollPos = useRef(0);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only access theme after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = mounted && currentTheme === 'dark';
  const lineColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
  const opacity = isDark ? 0.15 : 0.25;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    let animationFrameId: number;

    const drawGrid = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // Update scroll position
      scrollPos.current += speed;
      if (scrollPos.current >= cellSize) {
        scrollPos.current = 0;
      }

      // Save the current context state
      ctx.save();

      // Translate and rotate for perspective
      ctx.translate(width / 2, 0);
      ctx.rotate((angle * Math.PI) / 180);

      // Set line style
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = opacity;

      const w = width * 2;
      const h = height * 2;

      // Calculate grid dimensions
      const numCellsX = Math.ceil(w / cellSize);
      const numCellsY = Math.ceil(h / cellSize);

      // Draw vertical lines
      for (let x = -numCellsX; x < numCellsX; x++) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, -h);
        ctx.lineTo(x * cellSize, h);
        ctx.stroke();
      }

      // Draw horizontal lines with scroll offset
      for (let y = -numCellsY; y < numCellsY; y++) {
        ctx.beginPath();
        ctx.moveTo(-w, y * cellSize + scrollPos.current);
        ctx.lineTo(w, y * cellSize + scrollPos.current);
        ctx.stroke();
      }

      // Restore the context state
      ctx.restore();

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [angle, cellSize, lineWidth, speed, opacity, lineColor, currentTheme]);

  // Base classes that don't depend on theme
  const baseClasses = "absolute inset-0 h-full w-full bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950";

  return (
    <canvas
      ref={canvasRef}
      className={baseClasses}
      style={{ mixBlendMode: isDark ? 'soft-light' : 'normal' }}
    />
  );
} 