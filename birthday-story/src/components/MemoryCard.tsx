import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Memory } from '../config/story';
import './MemoryCard.css';

interface Props {
  memory: Memory;
  isActive: boolean;
  onClick: () => void;
}

export default function MemoryCard({ memory, isActive, onClick }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className={`memory-card ${isActive ? 'memory-card--active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open memory: ${memory.year} — ${memory.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201,169,110,0.12)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Cover image */}
      <div className="memory-card__img-wrap">
        {memory.coverImage && !imgError ? (
          <img
            className="memory-card__img"
            src={memory.coverImage}
            alt={`${memory.year} memory`}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="memory-card__img-placeholder" aria-hidden="true">
            <span>📷</span>
            <p>Add photo in config</p>
          </div>
        )}
        <div className="memory-card__img-overlay" aria-hidden="true" />
      </div>

      {/* Info */}
      <div className="memory-card__info">
        <p className="memory-card__year">{memory.year}</p>
        <h3 className="memory-card__title">{memory.title}</h3>
        {memory.description && (
          <p className="memory-card__desc">{memory.description}</p>
        )}
        <div className="memory-card__cta" aria-hidden="true">
          <span>Open Memory</span>
          <span className="memory-card__arrow">→</span>
        </div>
      </div>
    </motion.div>
  );
}
