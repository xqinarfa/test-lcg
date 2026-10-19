'use client';

import React, { useState, useEffect, useRef } from 'react';
import { painPoints } from '../../data/gameData';

const CARD_THEMES = ['card-theme-rose', 'card-theme-gold', 'card-theme-purple'];
const CARD_TAGS = [
  '✦ Masalah #01 • Beda Ritme',
  '♥ Masalah #02 • Canggung',
  '★ Masalah #03 • Rutinitas Monoton',
];
const PROGRESS_TARGETS = [0.06, 0.48, 0.88];

// Direct DOM transform updates: 0 React re-renders during scroll
function applyCardTransforms(cards: (HTMLDivElement | null)[], p: number) {
  const c0 = cards[0];
  if (c0) {
    if (p < 0.18) {
      c0.style.transform = 'translate3d(-10px, 0px, 0) rotate(-2.8deg)';
      c0.style.opacity = '1';
      c0.style.zIndex = '3';
      c0.style.pointerEvents = 'auto';
    } else if (p <= 0.38) {
      const exit = (p - 0.18) / 0.2;
      c0.style.transform = `translate3d(${-10 - exit * 45}%, ${-exit * 135}%, 0) rotate(${-2.8 - exit * 15}deg)`;
      c0.style.opacity = `${exit > 0.75 ? Math.max((1 - exit) / 0.25, 0) : 1}`;
      c0.style.zIndex = '3';
      c0.style.pointerEvents = exit > 0.5 ? 'none' : 'auto';
    } else {
      c0.style.transform = 'translate3d(-55%, -135%, 0) rotate(-18deg)';
      c0.style.opacity = '0';
      c0.style.zIndex = '1';
      c0.style.pointerEvents = 'none';
    }
  }

  const c1 = cards[1];
  if (c1) {
    if (p < 0.18) {
      c1.style.transform = 'translate3d(24px, 14px, 0) rotate(5.8deg) scale(0.98)';
      c1.style.opacity = '1';
      c1.style.zIndex = '2';
      c1.style.pointerEvents = 'none';
    } else if (p < 0.38) {
      const enter = (p - 0.18) / 0.2;
      c1.style.transform = `translate3d(${24 - 18 * enter}px, ${14 * (1 - enter)}px, 0) rotate(${5.8 - 4 * enter}deg) scale(${0.98 + 0.02 * enter})`;
      c1.style.opacity = '1';
      c1.style.zIndex = '2';
      c1.style.pointerEvents = enter > 0.8 ? 'auto' : 'none';
    } else if (p <= 0.55) {
      c1.style.transform = 'translate3d(6px, 0px, 0) rotate(1.8deg) scale(1)';
      c1.style.opacity = '1';
      c1.style.zIndex = '3';
      c1.style.pointerEvents = 'auto';
    } else if (p <= 0.75) {
      const exit = (p - 0.55) / 0.2;
      c1.style.transform = `translate3d(${6 + exit * 45}%, ${-exit * 135}%, 0) rotate(${1.8 + exit * 16}deg)`;
      c1.style.opacity = `${exit > 0.75 ? Math.max((1 - exit) / 0.25, 0) : 1}`;
      c1.style.zIndex = '3';
      c1.style.pointerEvents = exit > 0.5 ? 'none' : 'auto';
    } else {
      c1.style.transform = 'translate3d(55%, -135%, 0) rotate(18deg)';
      c1.style.opacity = '0';
      c1.style.zIndex = '1';
      c1.style.pointerEvents = 'none';
    }
  }

  const c2 = cards[2];
  if (c2) {
    if (p < 0.18) {
      c2.style.transform = 'translate3d(-24px, 28px, 0) rotate(-6.8deg) scale(0.96)';
      c2.style.opacity = '1';
      c2.style.zIndex = '1';
      c2.style.pointerEvents = 'none';
    } else if (p < 0.38) {
      const s1 = (p - 0.18) / 0.2;
      c2.style.transform = `translate3d(${-24 + 10 * s1}px, ${28 - 14 * s1}px, 0) rotate(${-6.8 + 2.5 * s1}deg) scale(${0.96 + 0.02 * s1})`;
      c2.style.opacity = '1';
      c2.style.zIndex = '1';
      c2.style.pointerEvents = 'none';
    } else if (p < 0.55) {
      c2.style.transform = 'translate3d(-14px, 14px, 0) rotate(-4.3deg) scale(0.98)';
      c2.style.opacity = '1';
      c2.style.zIndex = '2';
      c2.style.pointerEvents = 'none';
    } else if (p < 0.75) {
      const enter = (p - 0.55) / 0.2;
      c2.style.transform = `translate3d(${-14 * (1 - enter)}px, ${14 * (1 - enter)}px, 0) rotate(${-4.3 + 3.5 * enter}deg) scale(${0.98 + 0.02 * enter})`;
      c2.style.opacity = '1';
      c2.style.zIndex = '2';
      c2.style.pointerEvents = enter > 0.8 ? 'auto' : 'none';
    } else {
      c2.style.transform = 'translate3d(0, 0px, 0) rotate(-0.8deg) scale(1)';
      c2.style.opacity = '1';
      c2.style.zIndex = '3';
      c2.style.pointerEvents = 'auto';
    }
  }
}

export default function InsightSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      applyCardTransforms(cardsRef.current, progress);

      const nextIdx = progress < 0.35 ? 0 : progress < 0.7 ? 1 : 2;
      setActiveCardIndex((prev) => (prev !== nextIdx ? nextIdx : prev));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable = el.offsetHeight - window.innerHeight;
    const targetY = containerTop + totalScrollable * PROGRESS_TARGETS[index];
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section className="insight-section" id="realita" ref={containerRef}>
      <div className="insight-sticky-wrapper">
        <div className="container insight-sticky-inner">
          <div className="insight-header text-center">
            <span className="insight-eyebrow">JUJUR-JUJURAN KHUSUS PASUTRI</span>
            <h2 className="section-title">
              KAMU NGERASAIN INI GA SIH?
            </h2>
            <p className="section-subtitle mx-auto">
              Bukan karena rasa cinta berkurang, tapi rutinitas yang gitu-gitu aja bikin kemesraan perlahan redup...
            </p>
          </div>

          <div className="stacked-deck-container" aria-live="polite">
            {painPoints.map((point, index) => (
              <div
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`stacked-card ${CARD_THEMES[index]} ${activeCardIndex === index ? 'is-active' : ''}`}
                key={index}
                role="article"
                aria-label={`Kartu realita ke-${index + 1}: ${point.title}`}
              >
                <div className="stacked-card-inner">
                  <div className="stacked-card-header">
                    <div className="stacked-card-badge">
                      <span className="badge-dot" />
                      <span>{CARD_TAGS[index]}</span>
                    </div>

                    <div className="stacked-card-icon">
                      {index === 0 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="stacked-card-body">
                    <span className="stacked-card-number">0{index + 1}</span>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>

                  <div className="stacked-card-footer">
                    <span className="footer-index">0{index + 1} / 03</span>
                    <span className="footer-hint">
                      {index < 2 ? 'Scroll ke bawah untuk mengungkap kartu berikutnya ↓' : 'Semua realita pasutri telah terbuka ✓'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="stacked-nav">
            {painPoints.map((point, i) => (
              <button
                key={i}
                type="button"
                className={`stack-nav-pill ${activeCardIndex === i ? 'active' : ''}`}
                onClick={() => scrollToCard(i)}
                aria-label={`Lihat kartu 0${i + 1}: ${point.title}`}
              >
                <span className="pill-dot" />
                <span className="pill-label">Kartu 0{i + 1}</span>
              </button>
            ))}
          </div>

          <div className="stacked-scroll-hint" aria-hidden="true">
            <span className="hint-mouse">
              <span className="hint-wheel" />
            </span>
            <span>Gulir layar ke bawah untuk membuka tumpukan kartu</span>
          </div>
        </div>
      </div>
    </section>
  );
}
