import { motion } from 'framer-motion';
import './BirthdayWish.css';

interface Props {
  name: string;
  wish: string;
  onContinue: () => void;
}

export default function BirthdayWish({ name, wish, onContinue }: Props) {
  const lines = wish.split('\n').filter(Boolean);

  return (
    <section className="wish-section" aria-label="Birthday wish">
      <div className="wish-section__glow" aria-hidden="true" />

      <div className="wish-content">
        <motion.h2
          className="wish-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Happy Birthday, <em>{name || 'HER_NAME'}</em>
        </motion.h2>

        <div className="wish-lines" role="presentation">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className="wish-line"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.0,
                delay: 0.4 + i * 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="wish-continue"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 + lines.length * 0.35 + 0.4 }}
        >
          <p className="wish-teaser">But there's something I want you to hear first...</p>

          <motion.button
            className="special-btn"
            onClick={onContinue}
            whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(201,169,110,0.3)' }}
            whileTap={{ scale: 0.97 }}
            aria-label="Read your special message"
          >
            Your Special Message
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
