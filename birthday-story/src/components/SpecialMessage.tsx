import { motion, AnimatePresence } from 'framer-motion';
import './SpecialMessage.css';

interface Props {
  message: string;
  name: string;
  onContinue: () => void;
  isOpen: boolean;
}

export default function SpecialMessage({ message, name, onContinue, isOpen }: Props) {
  const lines = message
    .replace(/\[HER_NAME\]/g, name || 'HER_NAME')
    .split('\n')
    .filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="special-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          aria-modal="true"
          role="dialog"
          aria-label="Special birthday message"
        >
          <div className="special-overlay__bg" aria-hidden="true" />

          <div className="special-message-content">
            {lines.map((line, i) => {
              const isEnding = line.toLowerCase().includes('only the beginning');
              return (
                <motion.p
                  key={i}
                  className={`special-line ${isEnding ? 'special-line--ending' : ''}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.8 + i * 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.p>
              );
            })}

            <motion.button
              className="special-continue-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + lines.length * 0.5 + 0.6, duration: 0.8 }}
              onClick={onContinue}
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(201,169,110,0.2)' }}
              whileTap={{ scale: 0.97 }}
              aria-label="Continue to our story"
            >
              Continue to our story →
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
