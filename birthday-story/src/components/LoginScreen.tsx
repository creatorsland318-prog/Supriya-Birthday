import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoginScreen.css';

interface Props {
  onLoginSuccess: () => void;
  title?: string;
  subtitle?: string;
}

export default function LoginScreen({
  onLoginSuccess,
  title = 'A Story For You',
  subtitle = 'Enter your secret credentials to unlock this chapter',
}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  // Background floating golden embers & stardust particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create particles
    const particleCount = 70;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      vy: -Math.random() * 0.45 - 0.15,
      vx: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      fadeSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      isSparkle: Math.random() > 0.65,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.7 || p.opacity < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isSparkle) {
          // Warm gold sparkles
          ctx.fillStyle = `rgba(225, 195, 138, ${Math.max(0, p.opacity)})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(201, 169, 110, 0.6)';
        } else {
          // Subtle warm rose-gold dust
          ctx.fillStyle = `rgba(201, 169, 110, ${Math.max(0, p.opacity * 0.6)})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();

        p.y += p.vy;
        p.x += p.vx;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Autofocus username field on load
  useEffect(() => {
    const timer = setTimeout(() => {
      usernameInputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    // Check credentials:
    // Username: SupriyaGoswami (accept case-insensitive match for convenience)
    // Password: SupriyaBday@13082005
    const isUserCorrect = trimmedUser.toLowerCase() === 'supriyagoswami';
    const isPassCorrect = trimmedPass === 'SupriyaBday@13082005';

    if (isUserCorrect && isPassCorrect) {
      setIsSubmitting(true);
      setIsUnlocked(true);

      if (rememberMe) {
        try {
          localStorage.setItem('birthday_story_auth', 'true');
        } catch {
          // ignore localStorage restrictions
        }
      }
      try {
        sessionStorage.setItem('birthday_story_auth', 'true');
      } catch {
        // ignore sessionStorage restrictions
      }

      // Smooth delay for unlock celebration animation
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    } else {
      setIsSubmitting(false);
      if (!trimmedUser || !trimmedPass) {
        setError('Please enter both your username and password.');
      } else {
        setError('The key doesn’t fit. Please check your username and password ✨');
      }
    }
  };

  return (
    <div className="login-screen">
      <canvas ref={canvasRef} className="login-canvas" aria-hidden="true" />

      {/* Ambient background glows */}
      <div className="login-glow login-glow--top" aria-hidden="true" />
      <div className="login-glow login-glow--bottom" aria-hidden="true" />

      <motion.div
        className="login-card-wrapper"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8 } }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className={`login-card ${error ? 'login-card--shake' : ''} ${isUnlocked ? 'login-card--unlocked' : ''}`}
          animate={error ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Card top badge & emblem */}
          <div className="login-badge-container">
            <motion.div
              className={`login-emblem ${isUnlocked ? 'login-emblem--unlocked' : ''}`}
              animate={isUnlocked ? { scale: [1, 1.2, 1.1], rotate: [0, -10, 0] } : {}}
              transition={{ duration: 0.8 }}
            >
              {isUnlocked ? (
                // Unlocked Icon
                <svg
                  className="login-lock-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v1" />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                  <path d="M12 17.5v2" />
                </svg>
              ) : (
                // Locked Icon
                <svg
                  className="login-lock-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                  <path d="M12 17.5v2" />
                </svg>
              )}
            </motion.div>
          </div>

          <div className="login-header">
            <span className="login-tag">Private Invitation</span>
            <h1 className="login-title">{title}</h1>
            <p className="login-subtitle">{subtitle}</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Username Input */}
            <div className="login-field">
              <label htmlFor="login-username" className="login-label">
                <span className="login-label-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <span>Username</span>
              </label>
              <div className="login-input-wrapper">
                <input
                  id="login-username"
                  ref={usernameInputRef}
                  type="text"
                  className="login-input"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck="false"
                  disabled={isSubmitting || isUnlocked}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="login-field">
              <div className="login-label-row">
                <label htmlFor="login-password" className="login-label">
                  <span className="login-label-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <span>Secret Key / Password</span>
                </label>
              </div>
              <div className="login-input-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input login-input--password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  autoComplete="current-password"
                  disabled={isSubmitting || isUnlocked}
                  required
                />
                <button
                  type="button"
                  className="login-toggle-pw"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Hint Row */}
            <div className="login-options-row">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-checkbox"
                />
                <span className="login-remember-text">Remember me</span>
              </label>

              <button
                type="button"
                className="login-hint-btn"
                onClick={() => setShowHint((prev) => !prev)}
              >
                {showHint ? 'Hide hint' : 'Need a hint? 🗝️'}
              </button>
            </div>

            {/* Hint Box */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  className="login-hint-box"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>
                    <strong>Username:</strong> <code>Someone's Special Name</code>
                    <br />
                    <strong>Password:</strong> <code>Some code related to us.</code>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="login-error"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  role="alert"
                >
                  <span className="login-error-icon" aria-hidden="true">✦</span>
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`login-submit-btn ${isUnlocked ? 'login-submit-btn--unlocked' : ''}`}
              whileHover={{ scale: isUnlocked ? 1 : 1.02, boxShadow: '0 0 25px rgba(201,169,110,0.35)' }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || isUnlocked}
            >
              {isUnlocked ? (
                <span className="login-btn-content">
                  <span className="login-btn-sparkle">✨</span>
                  <span>Unlocking Story...</span>
                </span>
              ) : (
                <span className="login-btn-content">
                  <span>Enter Secret Story</span>
                  <svg
                    className="login-btn-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              )}
            </motion.button>
          </form>

          {/* Card footer note */}
          <div className="login-card-footer">
            <span className="login-heart" aria-hidden="true">❦</span>
            <p className="login-made-for">Crafted with love for Someone Special</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
