import { motion } from 'framer-motion';
import './StoryIntro.css';

interface Props {
  date: string;
  title: string;
  description?: string;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const line = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.5, duration: 1.2, ease: EASE },
  }),
};

export default function StoryIntro({ date, title, description }: Props) {
  return (
    <section className="story-intro" aria-label="Story introduction">
      <div className="story-intro__glow" aria-hidden="true" />

      <div className="story-intro__content">
        <motion.p
          className="story-intro__chapter"
          variants={line}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
        >
          Chapter One
        </motion.p>

        <motion.h2
          className="story-intro__title"
          variants={line}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
        >
          {title}
        </motion.h2>

        <motion.div
          className="story-intro__date"
          variants={line}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
        >
          <span className="story-intro__line" />
          <span>{date}</span>
          <span className="story-intro__line" />
        </motion.div>

        {description && (
          <motion.p
            className="story-intro__desc"
            variants={line}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={3}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
