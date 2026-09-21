'use client';

import React, { useState, useEffect, useRef } from 'react';
import { painPoints } from '../data/gameData';

export default function InsightSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      setScrollProgress(progress);

      if (progress < 0.35) {
        setActiveCardIndex(0);
      } else if (progress < 0.70) {
        setActiveCardIndex(1);
      } else {
        setActiveCardIndex(2);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const progressTargets = [0.06, 0.48, 0.88];
    const targetY = containerTop + totalScrollable * progressTargets[index];
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const cardThemes = ['card-theme-rose', 'card-theme-gold', 'card-theme-purple'];
  const cardTags = [
    '✦ Realita #01 • Beban & Kelelahan',
    '♥ Realita #02 • Komunikasi & Canggung',
    '★ Realita #03 • Kejenuhan & Monoton'
  ];

  const getCardStyle = (index: number): React.CSSProperties => {
    // Card 0 (First card):
    // Resting position: slightly tilted to the left (-2.8deg, -10px)
    // Slides up & left between 0.18 and 0.38 to reveal Card 1 underneath
    if (index === 0) {
      if (scrollProgress < 0.18) {
        return {
          transform: 'translate3d(-10px, 0px, 0) rotate(-2.8deg) scale(1)',
          opacity: 1,
          zIndex: 3,
          pointerEvents: 'auto',
        };
      }
      if (scrollProgress <= 0.38) {
        const exit = (scrollProgress - 0.18) / 0.20;
        const translateY = -exit * 135;
        const translateX = -10 - exit * 45;
        const rotate = -2.8 - exit * 15;
        const opacity = exit > 0.75 ? Math.max((1 - exit) / 0.25, 0) : 1;
        return {
          transform: `translate3d(${translateX}%, ${translateY}%, 0) rotate(${rotate}deg) scale(1)`,
          opacity,
          zIndex: 3,
          pointerEvents: exit > 0.5 ? 'none' : 'auto',
        };
      }
      return {
        transform: 'translate3d(-55%, -135%, 0) rotate(-18deg) scale(1)',
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none',
      };
    }

    // Card 1 (Second card):
    // Resting position: tilted noticeably to the right (+5.8deg, +24px, +14px)
    // Rises to top between 0.18 and 0.38 as Card 0 slides away
    // Stays active on top between 0.38 and 0.55 with a natural subtle tilt (+1.8deg)
    // Slides up & right between 0.55 and 0.75 to reveal Card 2 underneath
    if (index === 1) {
      if (scrollProgress < 0.18) {
        return {
          transform: 'translate3d(24px, 14px, 0) rotate(5.8deg) scale(0.98)',
          opacity: 1,
          zIndex: 2,
          pointerEvents: 'none',
        };
      }
      if (scrollProgress < 0.38) {
        const enter = (scrollProgress - 0.18) / 0.20;
        const translateX = 24 * (1 - enter) + 6 * enter;
        const translateY = 14 * (1 - enter);
        const rotate = 5.8 * (1 - enter) + 1.8 * enter;
        const scale = 0.98 + 0.02 * enter;
        return {
          transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
          opacity: 1,
          zIndex: 2,
          pointerEvents: enter > 0.8 ? 'auto' : 'none',
        };
      }
      if (scrollProgress <= 0.55) {
        return {
          transform: 'translate3d(6px, 0px, 0) rotate(1.8deg) scale(1)',
          opacity: 1,
          zIndex: 3,
          pointerEvents: 'auto',
        };
      }
      if (scrollProgress <= 0.75) {
        const exit = (scrollProgress - 0.55) / 0.20;
        const translateY = -exit * 135;
        const translateX = 6 + exit * 45;
        const rotate = 1.8 + exit * 16;
        const opacity = exit > 0.75 ? Math.max((1 - exit) / 0.25, 0) : 1;
        return {
          transform: `translate3d(${translateX}%, ${translateY}%, 0) rotate(${rotate}deg) scale(1)`,
          opacity,
          zIndex: 3,
          pointerEvents: exit > 0.5 ? 'none' : 'auto',
        };
      }
      return {
        transform: 'translate3d(55%, -135%, 0) rotate(18deg) scale(1)',
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none',
      };
    }

    // Card 2 (Third card):
    // Resting position: tilted noticeably to the left (-6.8deg, -24px, +28px)
    // Steps up to secondary spot between 0.18 and 0.38 (-4.3deg, -14px, +14px)
    // Rises to top between 0.55 and 0.75 as Card 1 slides away
    // Stays fully revealed from 0.75 onwards with subtle organic angle (-0.8deg)
    if (index === 2) {
      if (scrollProgress < 0.18) {
        return {
          transform: 'translate3d(-24px, 28px, 0) rotate(-6.8deg) scale(0.96)',
          opacity: 1,
          zIndex: 1,
          pointerEvents: 'none',
        };
      }
      if (scrollProgress < 0.38) {
        const step1 = (scrollProgress - 0.18) / 0.20;
        const translateX = -24 + 10 * step1;
        const translateY = 28 - 14 * step1;
        const rotate = -6.8 + 2.5 * step1;
        const scale = 0.96 + 0.02 * step1;
        return {
          transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
          opacity: 1,
          zIndex: 1,
          pointerEvents: 'none',
        };
      }
      if (scrollProgress < 0.55) {
        return {
          transform: 'translate3d(-14px, 14px, 0) rotate(-4.3deg) scale(0.98)',
          opacity: 1,
          zIndex: 2,
          pointerEvents: 'none',
        };
      }
      if (scrollProgress < 0.75) {
        const enter = (scrollProgress - 0.55) / 0.20;
        const translateX = -14 * (1 - enter);
        const translateY = 14 * (1 - enter);
        const rotate = -4.3 * (1 - enter) - 0.8 * enter;
        const scale = 0.98 + 0.02 * enter;
        return {
          transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
          opacity: 1,
          zIndex: 2,
          pointerEvents: enter > 0.8 ? 'auto' : 'none',
        };
      }
      return {
        transform: 'translate3d(0, 0px, 0) rotate(-0.8deg) scale(1)',
        opacity: 1,
        zIndex: 3,
        pointerEvents: 'auto',
      };
    }

    return {};
  };

  return (
    <section className="insight-section" id="realita" ref={containerRef}>
      <div className="insight-sticky-wrapper">
        <div className="container insight-sticky-inner">
          <div className="insight-header text-center">
            <span className="insight-eyebrow">REFLEKSI HUBUNGAN PASUTRI</span>
            <h2 className="section-title">
              Tiga hal yang sering meredupkan keintiman pasutri
            </h2>
            <p className="section-subtitle mx-auto">
              Bukan karena rasa cinta berkurang, tetapi karena rutinitas yang membuat momen berdua kehilangan rasa penasaran.
            </p>
          </div>

          <div className="stacked-deck-container" aria-live="polite">
            {painPoints.map((point, index) => (
              <div
                className={`stacked-card ${cardThemes[index]} ${activeCardIndex === index ? 'is-active' : ''}`}
                key={index}
                style={getCardStyle(index)}
                role="article"
                aria-label={`Kartu realita ke-${index + 1}: ${point.title}`}
              >
                <div className="stacked-card-inner">
                  <div className="stacked-card-header">
                    <div className="stacked-card-badge">
                      <span className="badge-dot" />
                      <span>{cardTags[index]}</span>
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
