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

const categoryMetadata: Record<
  string,
  {
    tagline: string;
    auraColor: string;
    tierLabels: [string, string, string];
  }
> = {
  Reward: {
    tagline: 'Hadiah manis dan apresiasi sentuhan hangat untuk memanjakan pasangan setelah berhasil menyelesaikan misi.',
    auraColor: 'radial-gradient(circle, rgba(234, 179, 8, 0.35) 0%, rgba(202, 138, 4, 0.12) 50%, transparent 70%)',
    tierLabels: ['Pemanasan Manis', 'Sentuhan Lembut', 'Kedekatan Hangat'],
  },
  Punishment: {
    tagline: 'Hukuman manis dan seru yang menyenangkan—membuat suasana semakin hangat dan bikin nagih.',
    auraColor: 'radial-gradient(circle, rgba(239, 68, 68, 0.35) 0%, rgba(220, 38, 38, 0.14) 50%, transparent 70%)',
    tierLabels: ['Tantangan Lembut', 'Godaan Seru', 'Aksi Berdua'],
  },
  Truth: {
    tagline: 'Membongkar rahasia romantis, kenangan nostalgia masa pacaran, dan isi hati terdalam tanpa rasa canggung.',
    auraColor: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(2, 132, 199, 0.14) 50%, transparent 70%)',
    tierLabels: ['Nostalgia Manis', 'Kejujuran Hati', 'Rahasia Terdalam'],
  },
  Dare: {
    tagline: 'Aksi berani yang memecah kekakuan suasana dan langsung menyulut percikan chemistry berdua.',
    auraColor: 'radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(234, 88, 12, 0.14) 50%, transparent 70%)',
    tierLabels: ['Bisikan Menggoda', 'Ciuman Spontan', 'Pose Ceria Berdua'],
  },
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
  const currentMeta = categoryMetadata[currentDeck.category] || categoryMetadata.Reward;

  const isDeckTimerEnabled =
    currentDeck.hasTimer ?? (currentDeck.category === 'Reward' || currentDeck.category === 'Punishment');
  const hasTimer = Boolean(isDeckTimerEnabled && currentCard.duration);

  // Helper to parse duration string to seconds
  const parseDurationSeconds = (durStr?: string): number => {
    if (!durStr) return 0;
    const numMatch = durStr.match(/\d+/);
    if (!numMatch) return 30;
    const num = parseInt(numMatch[0], 10);
    if (durStr.toLowerCase().includes('menit')) return num * 60;
    return num;
  };

  const initialDuration = parseDurationSeconds(currentCard.duration);
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Horizontal drag-scroll and tab references
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isTabsPointerDown = useRef<boolean>(false);
  const tabsStartX = useRef<number>(0);
  const tabsScrollLeft = useRef<number>(0);

  // Fallback touch swipe detection for legacy mobile touchscreens
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalDecks = challengeDecks.length;

  const handleNextTab = () => {
    const nextIdx = (activeDeckTab + 1) % totalDecks;
    onSelectTab(nextIdx);
  };

  const handlePrevTab = () => {
    const prevIdx = (activeDeckTab - 1 + totalDecks) % totalDecks;
    onSelectTab(prevIdx);
  };

  // Tabs mouse drag scroll
  const handleTabsMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tabsContainerRef.current) return;
    isTabsPointerDown.current = true;
    tabsStartX.current = e.pageX - tabsContainerRef.current.offsetLeft;
    tabsScrollLeft.current = tabsContainerRef.current.scrollLeft;
  };

  const handleTabsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTabsPointerDown.current || !tabsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsContainerRef.current.offsetLeft;
    const walk = (x - tabsStartX.current) * 1.5;
    tabsContainerRef.current.scrollLeft = tabsScrollLeft.current - walk;
  };

  const handleTabsMouseUp = () => {
    isTabsPointerDown.current = false;
  };

  // Stage touch swipe fallback
  const handleStageTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleStageTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY) * 1.1) {
      if (diffX < 0) {
        handleNextTab();
      } else {
        handlePrevTab();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Smoothly center active tab in horizontal scroll container
  useEffect(() => {
    const tabEl = tabRefs.current[activeDeckTab];
    if (tabEl && tabsContainerRef.current) {
      tabEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeDeckTab]);

  // Framer Motion Dynamic Drag Physics & Tilting
  const dragX = useMotionValue(0);
  const dragRotateZ = useTransform(
    dragX,
    [-220, 220],
    shouldReduceMotion ? [0, 0] : [-10, 10]
  );

  // 3D Card Hover Motion Values
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const springCfg = { stiffness: 220, damping: 24, mass: 0.8 };
  const rotateX = useSpring(
    useTransform(cardY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [6.5, -6.5]),
    springCfg
  );
  const rotateY = useSpring(
    useTransform(cardX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-6.5, 6.5]),
    springCfg
  );

  // Specular sheen highlight opacity tied to tilt
  const sheenOpacity = useTransform(cardX, [-0.5, 0, 0.5], [0.26, 0.12, 0.26]);

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardX.set(x);
    cardY.set(y);
  };

  const handleMouseLeaveCard = () => {
    cardX.set(0);
    cardY.set(0);
  };

  // Reset timer whenever tab or card index changes
  useEffect(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    const newDur = parseDurationSeconds(currentCard.duration);
    setTimeLeft(newDur);
    setTimerActive(false);
  }, [activeDeckTab, cardIndexWithinTab, currentCard.duration]);

  // Gentle audio finish chime using Web Audio API
  const playTimerFinishSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
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
    } catch { }
  };

  const handleToggleTimer = () => {
    if (timerActive) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setTimerActive(false);
    } else {
      if (timeLeft <= 0) {
        setTimeLeft(initialDuration);
      }
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

  const totalCards = currentDeck.cards.length;

  // Trigger shuffle with authentic card deal pop animation
  const handleTriggerShuffle = () => {
    setIsShuffling(true);
    onShuffleCard();
    setTimeout(() => setIsShuffling(false), 460);
  };

  // Responsive screen width for accurate stacked card fanning
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Compute balanced circular slot (-2, -1, 0, 1, 2)
  const getSlot = (i: number, active: number): number => {
    if (i === active) return 0;
    if (active === 0) {
      if (i === 1) return 1;
      if (i === 2) return 2;
      if (i === 3) return -1;
    }
    if (active === 1) {
      if (i === 0) return -1;
      if (i === 2) return 1;
      if (i === 3) return 2;
    }
    if (active === 2) {
      if (i === 0) return -2;
      if (i === 1) return -1;
      if (i === 3) return 1;
    }
    if (active === 3) {
      if (i === 0) return 1;
      if (i === 1) return -2;
      if (i === 2) return -1;
    }
    return 0;
  };

  // Stack transform configuration per slot
  const getStackTransform = (slot: number, width: number) => {
    if (slot === 0) {
      return {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
      };
    }

    const isMobile = width < 600;
    const isSmallTablet = width >= 600 && width < 768;
    const isTablet = width >= 768 && width < 1024;

    const stepX = isMobile ? 24 : isSmallTablet ? 55 : isTablet ? 95 : 165;
    const stepY = isMobile ? 6 : isSmallTablet ? 8 : isTablet ? 10 : 13;
    const stepRot = isMobile ? 2.5 : isSmallTablet ? 3.5 : isTablet ? 4.2 : 5.4;
    const absSlot = Math.abs(slot);

    const x = slot * stepX;
    const y = absSlot * stepY;
    const rotate = slot * stepRot;
    const scale = 1 - absSlot * (isMobile ? 0.04 : 0.055);
    const zIndex = 25 - absSlot * 6;
    const opacity = 1 - absSlot * (isMobile ? 0.12 : 0.08);
    const brightness = 1 - absSlot * 0.14;

    return {
      x,
      y,
      rotate,
      scale,
      zIndex,
      opacity,
      filter: `brightness(${brightness})`,
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
            onMouseDown={handleTabsMouseDown}
            onMouseMove={handleTabsMouseMove}
            onMouseUp={handleTabsMouseUp}
            onMouseLeave={handleTabsMouseUp}
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
            animate={{
              background: currentMeta.auraColor,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          <div
            className="card-deck-stack-stage"
            onTouchStart={handleStageTouchStart}
            onTouchEnd={handleStageTouchEnd}
          >
            {challengeDecks.map((deck, idx) => {
              const isActive = idx === activeDeckTab;
              const slot = getSlot(idx, activeDeckTab);
              const card = isActive ? currentCard : deck.cards[0] || currentCard;
              const transform = getStackTransform(slot, windowWidth);
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
                  dragTransition={{
                    bounceStiffness: 580,
                    bounceDamping: 26,
                    power: 0.15,
                  }}
                  whileDrag={{
                    scale: 1.035,
                    cursor: 'grabbing',
                  }}
                  onDragStart={() => setIsDragging(true)}
                  onDrag={(_e, info) => {
                    dragX.set(info.offset.x);
                  }}
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
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 27,
                    mass: 0.85,
                  }}
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
                      loading="eager"
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
                  Kartu {cardIndexWithinTab + 1} dari {totalCards} • Kategori {currentDeck.title}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
