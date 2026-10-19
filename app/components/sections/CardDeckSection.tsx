'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  animate,
} from 'framer-motion';
import { challengeDecks } from '../../data/gameData';

export interface CardDeckSectionProps {
  activeDeckTab: number;
  cardIndexWithinTab: number;
  onSelectTab: (idx: number) => void;
  onShuffleCard: () => void;
  onSelectTier?: (tierIdx: number) => void;
}

const CATEGORY_AURAS: Record<string, string> = {
  Reward: 'radial-gradient(circle, rgba(234, 179, 8, 0.35) 0%, rgba(202, 138, 4, 0.12) 50%, transparent 70%)',
  Punishment: 'radial-gradient(circle, rgba(239, 68, 68, 0.35) 0%, rgba(220, 38, 38, 0.14) 50%, transparent 70%)',
  Truth: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(2, 132, 199, 0.14) 50%, transparent 70%)',
  Dare: 'radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(234, 88, 12, 0.14) 50%, transparent 70%)',
};

// Slot map: circular slot offset (-2, -1, 0, 1, 2) per active index
const STACK_SLOTS = [
  [0, 1, 2, -1],
  [-1, 0, 1, 2],
  [-2, -1, 0, 1],
  [1, -2, -1, 0],
];

// Breakpoint configurations for stacked deck: [mobile <600, smallTablet <768, tablet <1024, desktop >=1024]
const BREAKPOINT_STEPS = [
  { stepX: 24, stepY: 6, stepRot: 2.5, scaleDelta: 0.04, opDelta: 0.12 },
  { stepX: 55, stepY: 8, stepRot: 3.5, scaleDelta: 0.055, opDelta: 0.08 },
  { stepX: 95, stepY: 10, stepRot: 4.2, scaleDelta: 0.055, opDelta: 0.08 },
  { stepX: 165, stepY: 13, stepRot: 5.4, scaleDelta: 0.055, opDelta: 0.08 },
];

const parseDurationSeconds = (durStr?: string) =>
  durStr ? parseInt(durStr, 10) * (durStr.includes('Menit') ? 60 : 1) || 30 : 0;

let sharedAudioCtx: AudioContext | null = null;
const playTimerFinishSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    if (!sharedAudioCtx) sharedAudioCtx = new AudioCtx();
    const ctx = sharedAudioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.65);
  } catch {}
};

export default function CardDeckSection({
  activeDeckTab,
  cardIndexWithinTab,
  onSelectTab,
  onShuffleCard,
}: CardDeckSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const currentDeck = challengeDecks[activeDeckTab] || challengeDecks[0];
  const currentCard = currentDeck.cards[cardIndexWithinTab] || currentDeck.cards[0];
  const currentAura = CATEGORY_AURAS[currentDeck.category] || CATEGORY_AURAS.Reward;

  const isDeckTimerEnabled =
    currentDeck.hasTimer ?? (currentDeck.category === 'Reward' || currentDeck.category === 'Punishment');
  const hasTimer = Boolean(isDeckTimerEnabled && currentCard.duration);

  const initialDuration = parseDurationSeconds(currentCard.duration);
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive breakpoint index (0: mobile, 1: smallTablet, 2: tablet, 3: desktop)
  // Only updates when crossing breakpoints — zero re-renders on arbitrary resize
  const [bpIdx, setBpIdx] = useState<number>(() => {
    if (typeof window === 'undefined') return 3;
    const w = window.innerWidth;
    return w < 600 ? 0 : w < 768 ? 1 : w < 1024 ? 2 : 3;
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const nextBp = w < 600 ? 0 : w < 768 ? 1 : w < 1024 ? 2 : 3;
      setBpIdx((prev) => (prev !== nextBp ? nextBp : prev));
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Tabs scroll reference
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const totalDecks = challengeDecks.length;
  const handleNextTab = () => onSelectTab((activeDeckTab + 1) % totalDecks);
  const handlePrevTab = () => onSelectTab((activeDeckTab - 1 + totalDecks) % totalDecks);

  // Smoothly center active tab in scroll container
  useEffect(() => {
    const tabEl = tabRefs.current[activeDeckTab];
    if (tabEl && tabsContainerRef.current) {
      tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeDeckTab]);

  // Framer Motion Dynamic Drag Physics & Tilt
  const dragX = useMotionValue(0);
  const dragRotateZ = useTransform(dragX, [-220, 220], shouldReduceMotion ? [0, 0] : [-10, 10]);

  // 3D Card Hover Motion Values
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const springCfg = { stiffness: 220, damping: 24, mass: 0.8 };
  const rotateX = useSpring(useTransform(cardY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [6.5, -6.5]), springCfg);
  const rotateY = useSpring(useTransform(cardX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-6.5, 6.5]), springCfg);
  const sheenOpacity = useTransform(cardX, [-0.5, 0, 0.5], [0.26, 0.12, 0.26]);

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || shouldReduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    cardX.set((e.clientX - r.left) / r.width - 0.5);
    cardY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleMouseLeaveCard = () => {
    cardX.set(0);
    cardY.set(0);
  };

  // Timer reset & cleanup
  useEffect(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimeLeft(parseDurationSeconds(currentCard.duration));
    setTimerActive(false);
  }, [activeDeckTab, cardIndexWithinTab, currentCard.duration]);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handleToggleTimer = () => {
    if (timerActive) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setTimerActive(false);
    } else {
      if (timeLeft <= 0) setTimeLeft(initialDuration);
      setTimerActive(true);
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            setTimerActive(false);
            playTimerFinishSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m > 0 ? `${m}m ` : ''}${s < 10 && m > 0 ? `0${s}` : s}s`;
  };

  const handleTriggerShuffle = () => {
    setIsShuffling(true);
    onShuffleCard();
    setTimeout(() => setIsShuffling(false), 460);
  };

  // Stack transform generator
  const getStackTransform = (slot: number) => {
    if (slot === 0) {
      return { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 30, opacity: 1, filter: 'brightness(1)' };
    }
    const { stepX, stepY, stepRot, scaleDelta, opDelta } = BREAKPOINT_STEPS[bpIdx];
    const absSlot = Math.abs(slot);
    return {
      x: slot * stepX,
      y: absSlot * stepY,
      rotate: slot * stepRot,
      scale: 1 - absSlot * scaleDelta,
      zIndex: 25 - absSlot * 6,
      opacity: 1 - absSlot * opDelta,
      filter: `brightness(${1 - absSlot * 0.14})`,
    };
  };

  return (
    <section className="deck-section" id="bocoran-kartu">
      <div className="container">
        <div className="deck-header">
          <motion.div
            className="deck-katalog-badge"
            role="note"
            aria-label="Katalog 120+ kartu tantangan"
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <svg
              className="deck-katalog-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="13" height="16" rx="2" />
              <path d="M8 2h10a2 2 0 0 1 2 2v15" opacity="0.6" />
              <path d="M7 11h5" opacity="0.6" />
            </svg>
            <span className="deck-katalog-label">Katalog Kartu Pasutri</span>
            <span className="deck-katalog-separator" aria-hidden="true" />
            <span className="deck-katalog-count">120+ Kartu Tantangan</span>
          </motion.div>

          <h2 className="section-title">
            Contoh Kartu Tantangan yang Akan Kalian Mainkan
          </h2>
          <p className="section-subtitle">
            Tersedia 4 kategori kartu unik untuk membangun koneksi mendalam, memicu tawa hangat, hingga menghidupkan kemesraan berdua.
          </p>
        </div>

        <div className="deck-tabs-wrapper">
          <div
            className="deck-tabs"
            role="tablist"
            aria-label="Kategori Kartu Tantangan"
            ref={tabsContainerRef}
          >
            {challengeDecks.map((deck, idx) => {
              const isActive = activeDeckTab === idx;
              return (
                <motion.button
                  key={deck.category}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`deck-tab tab-${deck.category.toLowerCase()} ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectTab(idx)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDeckTabGlow"
                      className={`deck-tab-active-bg tab-bg-${deck.category.toLowerCase()}`}
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="deck-tab-text">{deck.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="card-showcase-wrapper">
          <motion.div
            className="deck-card-ambient-aura"
            animate={{ background: currentAura }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          <div className="card-deck-stack-stage">
            {challengeDecks.map((deck, idx) => {
              const isActive = idx === activeDeckTab;
              const slot = STACK_SLOTS[activeDeckTab]?.[idx] ?? 0;
              const card = isActive ? currentCard : deck.cards[0] || currentCard;
              const transform = getStackTransform(slot);
              const isDeckHasTimer =
                deck.hasTimer ?? (deck.category === 'Reward' || deck.category === 'Punishment');
              const cardHasTimer = Boolean(isActive && isDeckHasTimer && currentCard.duration);

              return (
                <motion.div
                  key={deck.category}
                  className={`stacked-card-item card-${deck.category.toLowerCase()} ${isActive ? 'active' : 'inactive'} ${isDragging && isActive ? 'is-dragging' : ''}`}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.28}
                  dragTransition={{ bounceStiffness: 580, bounceDamping: 26, power: 0.15 }}
                  whileDrag={{ scale: 1.035, cursor: 'grabbing' }}
                  onDragStart={() => setIsDragging(true)}
                  onDrag={(_e, info) => dragX.set(info.offset.x)}
                  onDragEnd={(_e, info) => {
                    setIsDragging(false);
                    animate(dragX, 0, { type: 'spring', stiffness: 580, damping: 28 });
                    const swipeThreshold = 35;
                    const velocityThreshold = 180;
                    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                      handleNextTab();
                    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                      handlePrevTab();
                    }
                  }}
                  animate={
                    isShuffling && isActive
                      ? {
                        y: [0, -22, 2, 0],
                        rotate: [0, -2.5, 1, 0],
                        scale: [1, 1.035, 0.99, 1],
                        transition: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
                      }
                      : {
                        x: transform.x,
                        y: transform.y,
                        rotate: transform.rotate,
                        scale: transform.scale,
                        zIndex: transform.zIndex,
                        opacity: transform.opacity,
                        filter: transform.filter,
                      }
                  }
                  transition={{ type: 'spring', stiffness: 300, damping: 27, mass: 0.85 }}
                  whileHover={
                    !isActive
                      ? {
                        y: transform.y - 12,
                        scale: transform.scale * 1.035,
                        transition: { type: 'spring', stiffness: 400, damping: 25 },
                      }
                      : undefined
                  }
                  whileTap={!isActive ? { scale: transform.scale * 0.98 } : undefined}
                  onClick={!isActive ? () => onSelectTab(idx) : undefined}
                  role={!isActive ? 'button' : undefined}
                  tabIndex={!isActive ? 0 : undefined}
                  onKeyDown={
                    !isActive
                      ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') onSelectTab(idx);
                      }
                      : undefined
                  }
                  aria-label={!isActive ? `Buka kategori ${deck.title}` : undefined}
                >
                  <motion.div
                    className="game-card-frame-inner"
                    style={
                      isActive
                        ? {
                          rotateX: shouldReduceMotion ? 0 : rotateX,
                          rotateY: shouldReduceMotion ? 0 : rotateY,
                          rotateZ: shouldReduceMotion ? 0 : dragRotateZ,
                        }
                        : undefined
                    }
                    onMouseMove={isActive ? handleMouseMoveCard : undefined}
                    onMouseLeave={isActive ? handleMouseLeaveCard : undefined}
                  >
                    <img
                      src={deck.frameImage || '/assets/images/card-reward-frame.jpg'}
                      alt={`${deck.title} - ${card.rule}`}
                      className="game-card-bg-img"
                      width={935}
                      height={1024}
                      loading={isActive ? 'eager' : 'lazy'}
                      decoding="async"
                    />

                    <motion.div
                      className="game-card-sheen"
                      aria-hidden="true"
                      style={isActive && !shouldReduceMotion ? { opacity: sheenOpacity } : undefined}
                    />

                    <div className="game-card-blank-area">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`stars-${deck.category}-${card.intensity}`}
                          className="game-card-tier-indicator"
                          initial={isActive ? { opacity: 0.6, scale: 0.9 } : false}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={isActive ? { opacity: 0, scale: 0.9 } : undefined}
                          transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                        >
                          <span className="tier-star-text" aria-hidden="true">
                            {'★'.repeat(card.intensity)}
                          </span>
                        </motion.div>
                      </AnimatePresence>

                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`${deck.category}-${card.prompt}`}
                          className="game-card-text-prompt"
                          initial={isActive ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 } : false}
                          animate={{ opacity: 1, y: 0 }}
                          exit={isActive ? { opacity: 0, y: shouldReduceMotion ? 0 : -8 } : undefined}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                        >
                          &ldquo;{card.prompt}&rdquo;
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    {!isActive && (
                      <>
                        <div className="stacked-card-scrim" aria-hidden="true" />
                        <div className="stacked-card-badge">
                          <span
                            className={`badge-dot dot-${deck.category.toLowerCase()}`}
                            aria-hidden="true"
                          />
                          <span>{deck.title}</span>
                        </div>
                        <div className="stacked-card-hover-cue">
                          <span>{deck.title} • Klik untuk Buka</span>
                        </div>
                      </>
                    )}

                    {cardHasTimer && (
                      <motion.button
                        type="button"
                        className={`game-card-timer-hitbox ${timerActive ? 'active' : ''} ${timeLeft === 0 ? 'finished' : ''}`}
                        onClick={handleToggleTimer}
                        title={timerActive ? 'Klik untuk Jeda Timer' : 'Klik untuk Mulai Timer'}
                        aria-label={timerActive ? 'Jeda Timer' : 'Mulai Timer'}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                      >
                        <span
                          className={`timer-hitbox-label ${timerActive || timeLeft !== initialDuration ? 'timer-visible' : 'timer-idle'}`}
                        >
                          {timerActive ? (
                            <>
                              <motion.span
                                className="timer-pulse-dot"
                                aria-hidden="true"
                                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                              />
                              <span className="timer-countdown-digits">{formatTime(timeLeft)}</span>
                            </>
                          ) : timeLeft === 0 ? (
                            '🎉 Selesai! Ulangi'
                          ) : timeLeft < initialDuration ? (
                            `▶ Lanjut (${formatTime(timeLeft)})`
                          ) : null}
                        </span>
                      </motion.button>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <div className="game-card-details-panel">
            <div className="game-card-rule-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeDeckTab}-${currentCard.rule}`}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="rule-card-inner-flow"
                >
                  <div className="rule-card-header">
                    <div className="rule-badge">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                      <span>ATURAN MAIN</span>
                    </div>

                    {hasTimer && currentCard.duration && (
                      <motion.div
                        className="rule-duration-tag"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Durasi: {currentCard.duration}</span>
                      </motion.div>
                    )}
                  </div>

                  <p className="rule-card-text">
                    {currentCard.rule.replace(/^Aturan:\s*/i, '')}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="game-card-action-center">
              <motion.button
                type="button"
                className="btn-shuffle-card"
                onClick={handleTriggerShuffle}
                whileHover={{ scale: 1.035, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 450, damping: 22 }}
              >
                <motion.svg
                  animate={{ rotate: isShuffling ? 360 : 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="16 3 21 3 21 8"></polyline>
                  <line x1="4" y1="20" x2="21" y2="3"></line>
                  <polyline points="21 16 21 21 16 21"></polyline>
                  <line x1="15" y1="15" x2="21" y2="21"></line>
                  <line x1="4" y1="4" x2="9" y2="9"></line>
                </motion.svg>
                <span>Acak Contoh Kartu Lain</span>
              </motion.button>

              <AnimatePresence mode="wait">
                <motion.span
                  key={`${activeDeckTab}-${cardIndexWithinTab}`}
                  className="card-count-indicator"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  Kartu {cardIndexWithinTab + 1} dari {challengeDecks[activeDeckTab]?.cards?.length || 3} • Kategori {currentDeck.title}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
