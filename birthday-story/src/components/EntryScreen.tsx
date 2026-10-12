import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './EntryScreen.css';

interface Props {
  onEnter: () => void;
  date: string;
}

export default function EntryScreen({ onEnter, date }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const particles: { x: number; y: number; r: number; vy: number; o: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        vy: -Math.random() * 0.3 - 0.1,
        o: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${p.o})`;
        ctx.fill();
        p.y += p.vy;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="entry-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2 } }}
        transition={{ duration: 1.5 }}
      >
        <canvas ref={canvasRef} className="entry-canvas" aria-hidden="true" />

        <div className="entry-content">
          <motion.p
            className="entry-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            A little story
          </motion.p>

          <motion.p
            className="entry-label entry-label--for"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
          >
            for you
          </motion.p>

          <motion.div
            className="entry-date"
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 2.0, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="entry-date-line" />
            <span>{date}</span>
            <span className="entry-date-line" />
          </motion.div>

          <motion.button
            className="entry-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1 }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(201,169,110,0.25)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            aria-label="Enter the story"
          >
            Enter
          </motion.button>

          <motion.p
            className="entry-sound"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3.4, duration: 1 }}
          >
            🎵 Turn your sound on
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
