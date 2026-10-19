'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import FigmaWaveDivider from '../ui/FigmaWaveDivider';

export interface HeroSectionProps {
  onOpenModal: () => void;
  onScrollToSection: (id: string) => void;
}

export default function HeroSection({ onOpenModal, onScrollToSection }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY <= 1000) {
          setScrollY(currentY);
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Parallax offsets (disabled if prefersReducedMotion)
  const bgOffsetY = prefersReducedMotion ? 0 : scrollY * 0.35;
  const bgOffsetX = prefersReducedMotion ? 0 : mousePos.x * 20;
  const phoneScrollOffsetY = prefersReducedMotion ? 0 : scrollY * 0.16;
  const phoneTiltX = prefersReducedMotion ? 0 : -mousePos.y * 12;
  const phoneTiltY = prefersReducedMotion ? 0 : mousePos.x * 14;
  const copyScrollOffsetY = prefersReducedMotion ? 0 : scrollY * 0.08;
  const copyOpacity = prefersReducedMotion ? 1 : Math.max(0.15, 1 - scrollY / 750);

  return (
    <section 
      ref={heroRef}
      className="hero-section" 
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="hero-figma-bg" 
        aria-hidden="true"
        style={{
          transform: `translate3d(${bgOffsetX}px, ${bgOffsetY}px, 0)`,
          willChange: 'transform',
        }}
      >
        <div className="hero-figma-wave-layer" />
        <div className="hero-ambient-glow" />
      </div>

      <div className="container hero-grid">
        <div 
          className="hero-copy"
          style={{
            transform: `translate3d(0, ${copyScrollOffsetY}px, 0)`,
            opacity: copyOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <h1 className="hero-headline">
            <span className="hero-eyebrow-question">
              Pernikahan Kamu Hambar? Bosen Rutinitas Gitu-Gitu Aja?
            </span>
            <span className="hero-main-title">
              Mau Gak Malam Berdua yang <em>Bikin Nagih?</em>
            </span>
          </h1>

          <p className="hero-subtext">
            Main <strong>LOVE COUPLE GAMES!</strong> Game papan digital khusus pasutri untuk menghidupkan kembali kemesraan, tawa, dan kedekatan berdua tanpa rasa canggung.
          </p>

          <div className="price-block">
            <div className="price-tag-group">
              <span className="price-original">Rp 250.000</span>
              <span className="price-current">Rp 88.000</span>
            </div>
            <span className="price-save-badge">HEMAT 65%</span>
            <span className="price-note">MURAH BANGET! BAYAR SEKALI AJA</span>
          </div>

          <div className="hero-actions">
            <Button 
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              id="btnHeroIos"
              ariaLabel="Download Game di App Store untuk iOS"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '6px' }}>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.17.65-2.84 1.43-.58.67-1.1 1.74-.96 2.78 1.07.08 2.18-.59 2.79-1.34z"/>
              </svg>
              Download Game (iOS)
            </Button>

            <Button 
              onClick={onOpenModal}
              id="btnHeroAndroid"
              ariaLabel="Download Game APK untuk Android"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '6px' }}>
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0003s.4482-1.0003.9993-1.0003c.5516 0 .9993.4486.9993 1.0003 0 .5517-.4477 1.0003-.9993 1.0003m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0003s.4482-1.0003.9993-1.0003c.5516 0 .9993.4486.9993 1.0003 0 .5517-.4477 1.0003-.9993 1.0003m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5898 8.411 13.8504 8.125 12 8.125c-1.8504 0-3.5898.286-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
              </svg>
              Download Game (Android)
            </Button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => onScrollToSection('cara-main')}
            >
              Lihat Cara Main
            </button>
          </div>
        </div>

        <div 
          className="phone-mockup-wrapper"
          style={{
            transform: `translate3d(0, ${phoneScrollOffsetY}px, 0)`,
            perspective: '1200px',
            willChange: 'transform',
          }}
        >
          <div className="hero-phone-aura" aria-hidden="true" />

          <div 
            className="phone-mockup"
            style={{
              transform: `rotateX(${phoneTiltX}deg) rotateY(${phoneTiltY}deg)`,
              transition: mousePos.x === 0 && mousePos.y === 0 ? 'transform 0.6s ease-out' : 'transform 0.08s ease-out',
            }}
          >
            <div className="phone-notch"></div>
            <div 
              className="phone-glare" 
              aria-hidden="true" 
              style={{
                opacity: mousePos.x !== 0 || mousePos.y !== 0 ? 0.35 : 0.15,
                transform: `translate3d(${-mousePos.x * 30}px, ${-mousePos.y * 30}px, 0)`,
              }} 
            />
            <div className="phone-screen">
              <img 
                src="/assets/images/hero-phone-app.jpg" 
                alt="Tampilan Antarmuka Game Papan Love Couple Games" 
                width={340}
                height={698}
              />
            </div>
          </div>
        </div>
      </div>

      <FigmaWaveDivider
        position="bottom"
        fillColor="#0c080b"
        secondaryFillColor="rgba(195, 60, 115, 0.42)"
        strokeColor="rgba(230, 185, 128, 0.48)"
        height={110}
      />
    </section>
  );
}
