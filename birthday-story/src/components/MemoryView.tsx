import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Memory } from '../config/story';
import VideoPlayer from './VideoPlayer';
import './MemoryView.css';

interface Props {
  memory: Memory;
  onBack: () => void;
  onVideoPlay?: () => void;
  onVideoEnd?: () => void;
}

export default function MemoryView({ memory, onBack, onVideoPlay, onVideoEnd }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="memory-view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        key={memory.id}
      >
        {/* Background photo blur */}
        {memory.coverImage && !imgError && (
          <div
            className="memory-view__bg"
            style={{ backgroundImage: `url(${memory.coverImage})` }}
            aria-hidden="true"
          />
        )}
        <div className="memory-view__bg-overlay" aria-hidden="true" />

        {/* Back button */}
        <motion.button
          className="memory-back-btn"
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          aria-label="Back to Our Story"
        >
          ← Back to Our Story
        </motion.button>

        {/* Content */}
        <div className="memory-view__content">
          <motion.p
            className="memory-year"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {memory.year}
          </motion.p>

          <motion.h2
            className="memory-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            {memory.title}
          </motion.h2>

          {memory.date && (
            <motion.p
              className="memory-date"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {memory.date}
            </motion.p>
          )}

          <motion.div
            className="memory-video-area"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <VideoPlayer
              src={memory.video}
              poster={!imgError ? memory.coverImage : undefined}
              onPlay={onVideoPlay}
              onPause={onVideoEnd}
              onEnded={onVideoEnd}
            />
          </motion.div>

          {memory.message && (
            <motion.p
              className="memory-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.9 }}
            >
              {memory.message}
            </motion.p>
          )}

          {/* Hidden img for error detection */}
          {memory.coverImage && (
            <img
              src={memory.coverImage}
              alt=""
              aria-hidden="true"
              style={{ display: 'none' }}
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
