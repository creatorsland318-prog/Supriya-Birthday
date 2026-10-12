import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BirthdayCake.css';

interface Props {
  name: string;
  onWishMade: () => void;
}

export default function BirthdayCake({ name, onWishMade }: Props) {
  const [wished, setWished] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const handleWish = () => {
    if (wished) return;
    setWished(true);
    setShowSmoke(true);
    setTimeout(() => {
      setShowSmoke(false);
    }, 2000);
    setTimeout(onWishMade, 2800);
  };

  return (
    <section className="cake-section" aria-label="Birthday cake">
      <div className="cake-section__glow" aria-hidden="true" />

      <motion.div
        className="cake-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="cake-label">Happy Birthday,</p>
        <h1 className="cake-name">{name || 'HER_NAME'}</h1>

        {/* Cake SVG */}
        <div className="cake-wrapper" aria-label="Birthday cake with candles">
          <svg
            className="cake-svg"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Plate */}
            <ellipse cx="100" cy="178" rx="80" ry="8" fill="rgba(201,169,110,0.12)" />

            {/* Bottom tier */}
            <rect x="28" y="140" width="144" height="38" rx="4" fill="#1e1a14" stroke="#c9a96e" strokeWidth="0.8" />
            <rect x="28" y="140" width="144" height="10" rx="4" fill="#2a2318" />
            {/* Bottom frosting drips */}
            {[40,60,80,100,120,140,160].map((x, i) => (
              <rect key={i} x={x} y={140} width="6" height={8 + (i % 3) * 3} rx="3" fill="#c9a96e" opacity="0.7" />
            ))}

            {/* Middle tier */}
            <rect x="44" y="102" width="112" height="40" rx="4" fill="#211d16" stroke="#c9a96e" strokeWidth="0.8" />
            <rect x="44" y="102" width="112" height="10" rx="4" fill="#2a2318" />
            {[56,76,96,116,136].map((x, i) => (
              <rect key={i} x={x} y={102} width="6" height={7 + (i % 2) * 4} rx="3" fill="#c9a96e" opacity="0.65" />
            ))}

            {/* Top tier */}
            <rect x="62" y="70" width="76" height="34" rx="4" fill="#1a1710" stroke="#c9a96e" strokeWidth="0.8" />
            <rect x="62" y="70" width="76" height="8" rx="4" fill="#2a2318" />
            {[72,90,110,128].map((x, i) => (
              <rect key={i} x={x} y={70} width="5" height={6 + (i % 2) * 3} rx="2.5" fill="#c9a96e" opacity="0.6" />
            ))}

            {/* Candles */}
            {/* Left */}
            <rect x="76" y="50" width="8" height="22" rx="2" fill="#d4a0a0" />
            {/* Center */}
            <rect x="96" y="44" width="8" height="28" rx="2" fill="#a0c4d4" />
            {/* Right */}
            <rect x="116" y="50" width="8" height="22" rx="2" fill="#a0d4a8" />

            {/* Flames (animated, hidden when wished) */}
            <AnimatePresence>
              {!wished && (
                <>
                  {/* Left flame */}
                  <motion.g
                    key="fl1"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.ellipse
                      cx="80" cy="45"
                      rx="4" ry="6"
                      fill="#f9c84a"
                      animate={{ scaleY: [1, 1.15, 0.9, 1.1, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.ellipse
                      cx="80" cy="47"
                      rx="2" ry="3"
                      fill="#ff9f43"
                      animate={{ scaleY: [1, 1.2, 0.85, 1.1, 1] }}
                      transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                    />
                  </motion.g>

                  {/* Center flame */}
                  <motion.g
                    key="fl2"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <motion.ellipse
                      cx="100" cy="38"
                      rx="5" ry="8"
                      fill="#f9c84a"
                      animate={{ scaleY: [1, 1.18, 0.88, 1.12, 1], scaleX: [1, 0.88, 1.12, 0.92, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                    />
                    <motion.ellipse
                      cx="100" cy="41"
                      rx="2.5" ry="4"
                      fill="#ff9f43"
                      animate={{ scaleY: [1, 1.25, 0.8, 1.15, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                    />
                  </motion.g>

                  {/* Right flame */}
                  <motion.g
                    key="fl3"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                  >
                    <motion.ellipse
                      cx="120" cy="45"
                      rx="4" ry="6"
                      fill="#f9c84a"
                      animate={{ scaleY: [1, 1.12, 0.92, 1.08, 1], scaleX: [1, 0.92, 1.08, 0.96, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
                    />
                    <motion.ellipse
                      cx="120" cy="47"
                      rx="2" ry="3"
                      fill="#ff9f43"
                      animate={{ scaleY: [1, 1.18, 0.88, 1.12, 1] }}
                      transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut', delay: 0.08 }}
                    />
                  </motion.g>
                </>
              )}
            </AnimatePresence>

            {/* Smoke (shown after wishing) */}
            <AnimatePresence>
              {showSmoke && (
                <>
                  {[80, 100, 120].map((cx, i) => (
                    <motion.ellipse
                      key={`smoke-${i}`}
                      cx={cx}
                      cy={wished ? (i === 1 ? 36 : 43) : 0}
                      rx="3"
                      ry="5"
                      fill="rgba(255,255,255,0.18)"
                      initial={{ opacity: 0.7, y: 0, scaleX: 1 }}
                      animate={{ opacity: 0, y: -22, scaleX: 2.5 }}
                      transition={{ duration: 1.8, delay: i * 0.12, ease: 'easeOut' }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Glow under cake */}
            <ellipse cx="100" cy="178" rx="60" ry="5" fill="rgba(201,169,110,0.07)" />
          </svg>
        </div>

        {/* Make a Wish button */}
        <AnimatePresence>
          {!wished && (
            <motion.button
              className="wish-btn"
              onClick={handleWish}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(201,169,110,0.2)' }}
              whileTap={{ scale: 0.97 }}
              aria-label="Make a wish — blow out the candles"
            >
              ✨ Make a Wish
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {wished && (
            <motion.p
              className="wish-made"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Wish made 🌙
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
