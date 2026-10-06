import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VideoPlayer.css';

interface Props {
  src?: string;
  poster?: string;
  onPlay?: () => void;
  onPause?: () => void;
  /** Called when the video finishes playing — use to restore background music */
  onEnded?: () => void;
}

export default function VideoPlayer({ src, poster, onPlay, onPause, onEnded }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!src) {
    return (
      <div className="video-placeholder" role="img" aria-label="Video not yet available">
        <p className="video-placeholder__text">
          🎞 Video coming soon
          <br />
          <span>Replace the video path in src/config/story.ts</span>
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="video-wrapper"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          ref={videoRef}
          className="video-el"
          src={src}
          poster={poster}
          controls
          preload="metadata"
          playsInline
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          aria-label="Memory video"
        />
      </motion.div>
    </AnimatePresence>
  );
}
