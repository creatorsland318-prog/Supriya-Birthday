import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { storyConfig } from './config/story';
import { useAudio } from './hooks/useAudio';

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
  | 'entry'
  | 'intro'
  | 'cake'
  | 'wish'
  | 'story';

export default function App() {
  const [stage, setStage] = useState<Stage>('entry');
  const [specialOpen, setSpecialOpen] = useState(false);

  const audio = useAudio(storyConfig.music?.src);

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

      {/* Persistent music control */}
      {stage !== 'entry' && (
        <MusicControl
          isPlaying={audio.isPlaying}
          isMuted={audio.isMuted}
          isAvailable={audio.isAvailable}
          onTogglePlay={audio.togglePlay}
          onToggleMute={audio.toggleMute}
          title={storyConfig.music?.title}
        />
      )}

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
      {stage !== 'entry' && (
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
