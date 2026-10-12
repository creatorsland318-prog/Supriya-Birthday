import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Memory } from '../config/story';
import MemoryCard from './MemoryCard';
import MemoryView from './MemoryView';
import './StoryTimeline.css';

// Normalise WheelEvent delta to pixels regardless of deltaMode
function normaliseDelta(e: WheelEvent): number {
  if (e.deltaMode === 1) return e.deltaY * 32;   // line mode
  if (e.deltaMode === 2) return e.deltaY * 300;  // page mode
  return e.deltaY;                                // pixel mode (default)
}

interface Milestone {
  date: string;
  title: string;
  description?: string;
}

interface Props {
  opening: Milestone;
  officialRelationship: Milestone;
  memories: Memory[];
  onVideoPlay: () => void;
  onVideoEnd: () => void;
}

export default function StoryTimeline({
  opening,
  officialRelationship,
  memories,
  onVideoPlay,
  onVideoEnd,
}: Props) {
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);

  // ── Drag state ───────────────────────────────────────────────
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const openMemory = (memory: Memory) => {
    setActiveMemory(memory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeMemory = () => {
    setActiveMemory(null);
    onVideoEnd();
    // Scroll back to the carousel, not the top of the page
    requestAnimationFrame(() => {
      carouselWrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  // ── Infinite loop: triplicate cards, start at middle copy ────
  // Render [copy A] [real cards] [copy B] — silently jump when user
  // nears either cloned edge so it appears to loop endlessly.
  const copyCount = memories.length;
  const looped = copyCount > 0
    ? [...memories, ...memories, ...memories]
    : memories;

  // Initialise scroll to the middle copy
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || copyCount === 0) return;
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 3;
    });
  }, [copyCount]);

  // ── Seamless wrap on scroll ──────────────────────────────────
  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el || copyCount === 0) return;
    const oneWidth = el.scrollWidth / 3;
    if (el.scrollLeft < oneWidth * 0.25) {
      // Entered left clone — jump to equivalent position in middle
      el.scrollLeft += oneWidth;
    } else if (el.scrollLeft > oneWidth * 1.75) {
      // Entered right clone — jump back to middle
      el.scrollLeft -= oneWidth;
    }
  }, [copyCount]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ── Wheel → horizontal scroll ────────────────────────────────
  const handleWheel = useCallback((e: WheelEvent) => {
    const el = carouselRef.current;
    if (!el) return;
    // Let native horizontal trackpad swipes pass through
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    el.scrollBy({ left: normaliseDelta(e) * 1.5, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // ── Pointer drag via document listeners (no pointer capture = clicks work) ──
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = carouselRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragRef.current.startX;
      if (Math.abs(dx) >= 5) {
        dragRef.current.moved = true;
        el.scrollLeft = dragRef.current.scrollLeft - dx;
      }
    };

    const onUp = () => {
      dragRef.current.active = false;
      // Reset moved flag AFTER the click event fires (click fires before mouseup resolves)
      setTimeout(() => { dragRef.current.moved = false; }, 0);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  // Click guard: only open if pointer didn't travel (wasn't a drag)
  const handleCardClick = useCallback((memory: Memory) => {
    if (dragRef.current.moved) return;
    openMemory(memory);
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeMemory && (
          <MemoryView
            key={activeMemory.id}
            memory={activeMemory}
            onBack={closeMemory}
            onVideoPlay={onVideoPlay}
            onVideoEnd={onVideoEnd}
          />
        )}
      </AnimatePresence>

      <section className="timeline-section" aria-label="Our Story timeline">
        {/* Header */}
        <motion.div
          className="timeline-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
        >
          <p className="timeline-eyebrow">Our Story</p>
          <h2 className="timeline-heading">
            Some moments become memories.<br />
            <em>Some memories become a story.</em>
          </h2>
        </motion.div>

        {/* Milestones */}
        <div className="timeline-milestones">
          {[opening, officialRelationship].map((m, i) => (
            <motion.div
              key={m.date}
              className="milestone"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.2 }}
            >
              <div className="milestone__dot" aria-hidden="true" />
              <div className="milestone__body">
                <p className="milestone__date">{m.date}</p>
                <h3 className="milestone__title">{m.title}</h3>
                {m.description && (
                  <p className="milestone__desc">{m.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Memory carousel */}
        {memories.length > 0 && (
          <motion.div
            className="timeline-carousel-wrap"
            ref={carouselWrapRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            <p className="carousel-label">Yearly Memories</p>
            <p className="carousel-hint">Scroll or drag to explore ↔</p>
            <div
              className="memory-carousel"
              ref={carouselRef}
              role="list"
              aria-label="Yearly memory cards"
              onMouseDown={onMouseDown}
            >
              {looped.map((memory, idx) => {
                // Only the middle copy are real/interactive cards
                const isReal = idx >= copyCount && idx < copyCount * 2;
                return (
                  <div
                    key={`${memory.id}-${idx}`}
                    role={isReal ? 'listitem' : 'presentation'}
                    aria-hidden={!isReal || undefined}
                  >
                    <MemoryCard
                      memory={memory}
                      isActive={isReal && activeMemory?.id === memory.id}
                      onClick={() => isReal && handleCardClick(memory)}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </section>
    </>
  );
}

