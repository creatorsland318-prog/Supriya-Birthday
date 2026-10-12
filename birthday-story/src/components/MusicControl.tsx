import { motion } from 'framer-motion';
import './MusicControl.css';

interface Props {
  isPlaying: boolean;
  isMuted: boolean;
  isAvailable: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  title?: string;
}

export default function MusicControl({
  isPlaying,
  isMuted,
  isAvailable,
  onTogglePlay,
  onToggleMute,
  title,
}: Props) {
  if (!isAvailable && !isPlaying) return null;

  return (
    <motion.div
      className="music-control"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      aria-label="Music controls"
    >
      {/* Equalizer bars animation */}
      <div className="music-bars" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`music-bar music-bar--${i}`}
            style={{ animationPlayState: isPlaying && !isMuted ? 'running' : 'paused' }}
          />
        ))}
      </div>

      {title && (
        <span className="music-title" title={title}>
          {title.length > 22 ? title.slice(0, 22) + '…' : title}
        </span>
      )}

      <button
        className="music-btn"
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      <button
        className="music-btn"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
    </motion.div>
  );
}
