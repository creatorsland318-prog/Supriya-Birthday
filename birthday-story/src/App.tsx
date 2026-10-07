import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { storyConfig } from './config/story';
import { useAudio } from './hooks/useAudio';

import LoginScreen from './components/LoginScreen';
import EntryScreen from './components/EntryScreen';
import MusicControl from './components/MusicControl';
import StoryIntro from './components/StoryIntro';
import BirthdayCake from './components/BirthdayCake';
import BirthdayWish from './components/BirthdayWish';
import SpecialMessage from './components/SpecialMessage';
import StoryTimeline from './components/StoryTimeline';
import FinalChapter from './components/FinalChapter';

import './styles/global.css';
import './App.css';

type Stage =
  | 'login'
  | 'entry'
  | 'intro'
  | 'cake'
  | 'wish'
  | 'story';

export default function App() {
  const [stage, setStage] = useState<Stage>(() => {
    try {
      const isAuthed =
        sessionStorage.getItem('birthday_story_auth') === 'true' ||
        localStorage.getItem('birthday_story_auth') === 'true';
      return isAuthed ? 'entry' : 'login';
    } catch {
      return 'login';
    }
  });
  const [specialOpen, setSpecialOpen] = useState(false);

  const audio = useAudio(storyConfig.music?.src);

  // ── Login ─────────────────────────────────────────────
  const handleLoginSuccess = useCallback(() => {
    setStage('entry');
  }, []);

  const handleLock = useCallback(() => {
    try {
      sessionStorage.removeItem('birthday_story_auth');
      localStorage.removeItem('birthday_story_auth');
    } catch {
      // ignore
    }
    audio.pause();
    setStage('login');
  }, [audio]);

  // ── Entry ─────────────────────────────────────────────
  const handleEnter = useCallback(() => {
    audio.play();
    setStage('intro');
  }, [audio]);

  // ── Cake ──────────────────────────────────────────────
  const handleWishMade = useCallback(() => {
    setStage('wish');
  }, []);

  // ── Wish → Special message ─────────────────────────────
  const handleOpenSpecial = useCallback(() => {
    setSpecialOpen(true);
  }, []);

  // ── Special message → Timeline ─────────────────────────
  const handleSpecialContinue = useCallback(() => {
    setSpecialOpen(false);
    setStage('story');
  }, []);

  // ── Video audio management ─────────────────────────────
  const handleVideoPlay = useCallback(() => {
    audio.lowerVolume(0.02); // near-silent while video plays
  }, [audio]);

  const handleVideoEnd = useCallback(() => {
    audio.restoreVolume();
  }, [audio]);

  // ── Replay ─────────────────────────────────────────────
  const handleReplay = useCallback(() => {
    setStage('entry');
    setSpecialOpen(false);
    audio.pause();
  }, [audio]);

  return (
    <div className="app">
      {/* Subtle film grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Lock button when unlocked */}
      {stage !== 'login' && (
        <button
          className="story-lock-btn"
          onClick={handleLock}
          aria-label="Lock story"
          title="Lock story and return to login"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="lock-icon-svg"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Lock</span>
        </button>
      )}

      {/* Persistent music control */}
      {stage !== 'entry' && stage !== 'login' && (
        <MusicControl
          isPlaying={audio.isPlaying}
          isMuted={audio.isMuted}
          isAvailable={audio.isAvailable}
          onTogglePlay={audio.togglePlay}
          onToggleMute={audio.toggleMute}
          title={storyConfig.music?.title}
        />
      )}

      {/* ── Login screen ── */}
      <AnimatePresence>
        {stage === 'login' && (
          <LoginScreen
            key="login"
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>

      {/* ── Entry screen ── */}
      <AnimatePresence>
        {stage === 'entry' && (
          <EntryScreen
            key="entry"
            date={storyConfig.opening.date}
            onEnter={handleEnter}
          />
        )}
      </AnimatePresence>

      {/* ── Main story (after entry) ── */}
      {stage !== 'entry' && stage !== 'login' && (
        <motion.main
          className="story-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* 1. Story intro */}
          <StoryIntro
            date={storyConfig.opening.date}
            title={storyConfig.opening.title}
            description={storyConfig.opening.description}
          />

          {/* 2. Birthday cake */}
          <BirthdayCake
            name={storyConfig.girlfriendName}
            onWishMade={handleWishMade}
          />

          {/* 3. Birthday wish + special message trigger */}
          {(stage === 'wish' || stage === 'story') && (
            <BirthdayWish
              name={storyConfig.girlfriendName}
              wish={storyConfig.birthday.wish}
              onContinue={handleOpenSpecial}
            />
          )}

          {/* 4. Story timeline */}
          {stage === 'story' && (
            <>
              <StoryTimeline
                opening={storyConfig.opening}
                officialRelationship={storyConfig.officialRelationship}
                memories={storyConfig.memories}
                onVideoPlay={handleVideoPlay}
                onVideoEnd={handleVideoEnd}
              />

              <FinalChapter
                name={storyConfig.girlfriendName}
                openingDate={storyConfig.opening.date}
                officialDate={storyConfig.officialRelationship.date}
                message={storyConfig.ending.message}
                finalLine={storyConfig.ending.finalLine}
                onReplay={handleReplay}
              />

              {/* Footer */}
              <footer className="site-footer" aria-label="Footer">
                <p>Made with ❤️, by Subhash</p>
                <button
                  type="button"
                  className="footer-lock-link"
                  onClick={handleLock}
                >
                  🔒 Lock Story
                </button>
              </footer>
            </>
          )}
        </motion.main>
      )}

      {/* ── Special message overlay ── */}
      <SpecialMessage
        isOpen={specialOpen}
        message={storyConfig.birthday.specialMessage}
        name={storyConfig.girlfriendName}
        onContinue={handleSpecialContinue}
      />
    </div>
  );
}

