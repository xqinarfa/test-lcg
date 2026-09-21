'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import FigmaWaveDivider from './FigmaWaveDivider';

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
      {/* Figma Organic Waves Background with Parallax Depth & Continuous Framer Motion Loop */}
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
        {/* Left: Headline & Copy with Gentle Scroll Parallax */}
        <div 
          className="hero-copy"
          style={{
            transform: `translate3d(0, ${copyScrollOffsetY}px, 0)`,
            opacity: copyOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <div className="status-pill">
            <span className="status-dot"></span>
            Khusus Pasangan Suami Istri
          </div>

          <h1 className="hero-headline">
            Hangatkan kembali ritme keintiman di balik pintu kamar <em>bersama pasangan.</em>
          </h1>

          <p className="hero-subtext">
            Sebuah game papan digital interaktif untuk pasutri. Hadirkan suasana santai, obrolan mendalam, sentuhan foreplay, hingga tantangan ranjang yang mengalir alami tanpa rasa canggung.
          </p>

          {/* Transparent Pricing */}
          <div className="price-block">
            <span className="price-original">Rp 250.000</span>
            <span className="price-current">Rp 88.000</span>
            <span className="price-note">Sekali bayar, akses selamanya</span>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions">
            <Button 
              onClick={onOpenModal}
              id="btnHeroCta"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '6px' }}>
                <path d="M12 2a1 1 0 0 1 1 1v10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L11 13.586V3a1 1 0 0 1 1-1zm-7 16a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"/>
              </svg>
              Buka Akses Game Sekarang
            </Button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => onScrollToSection('simulasi-papan')}
            >
              Coba Lempar Dadu
            </button>
          </div>
        </div>

        {/* Right: Interactive 3D Phone Preview Mockup with Gyro Parallax */}
        <div 
          className="phone-mockup-wrapper"
          style={{
            transform: `translate3d(0, ${phoneScrollOffsetY}px, 0)`,
            perspective: '1200px',
            willChange: 'transform',
          }}
        >
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
                src="/assets/images/hero-phone.jpg" 
                alt="Tampilan Antarmuka Game Papan Love Couple Games" 
                width={340}
                height={698}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Multi-Layer Wave Divider from Figma separating Hero and Insight */}
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
