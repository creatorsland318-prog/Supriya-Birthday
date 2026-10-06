import { motion } from 'framer-motion';
import './FinalChapter.css';

interface Props {
  name: string;
  openingDate: string;
  officialDate: string;
  message: string;
  finalLine: string;
  onReplay?: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: EASE_OUT },
  },
});

export default function FinalChapter({
  name,
  openingDate,
  officialDate,
  message,
  finalLine,
  onReplay,
}: Props) {
  const finalLines = finalLine.split('\n').filter(Boolean);

  return (
    <section className="final-section" aria-label="Final chapter">
      <div className="final-section__glow" aria-hidden="true" />

      <div className="final-content">
        {/* Cinematic message */}
        <motion.p
          className="final-big-msg"
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {message}
        </motion.p>

        {/* Timeline trace */}
        <motion.div
          className="final-trace"
          variants={fadeUp(0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[openingDate, officialDate, 'Today', 'Whatever comes next'].map((item, i) => (
            <div key={i} className="final-trace__item">
              <p className={`final-trace__text ${i === 2 ? 'final-trace__text--today' : ''}`}>
                {item}
              </p>
              {i < 3 && <span className="final-trace__arrow" aria-hidden="true">↓</span>}
            </div>
          ))}
        </motion.div>

        {/* Birthday message */}
        <motion.h2
          className="final-birthday"
          variants={fadeUp(1.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          Happy Birthday, <em>{name || 'HER_NAME'}</em>
        </motion.h2>

        {/* Rose */}
        <motion.div
          className="final-rose"
          initial={{ opacity: 0, scale: 0.6, rotate: -15, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <img src="/assets/rose.jpg" alt="rose" className="final-rose__img" />
        </motion.div>

        {/* Final lines */}
        {finalLines.map((line, i) => (
          <motion.p
            key={i}
            className={`final-line ${i === finalLines.length - 1 ? 'final-line--last' : ''}`}
            variants={fadeUp(2.2 + i * 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {line}
          </motion.p>
        ))}

        {/* Heart glow */}
        <motion.div
          className="final-heart"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
        >
          ♡
        </motion.div>

        {/* Optional replay */}
        {onReplay && (
          <motion.button
            className="replay-btn"
            onClick={onReplay}
            variants={fadeUp(3.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Replay our story from the beginning"
          >
            ↺ Replay Our Story
          </motion.button>
        )}
      </div>
    </section>
  );
}
