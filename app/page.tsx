'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InsightSection from './components/InsightSection';
import MiniBoardSection from './components/MiniBoardSection';
import GameplaySection from './components/GameplaySection';
import FeaturesSection from './components/FeaturesSection';
import CardDeckSection from './components/CardDeckSection';
import FaqSection from './components/FaqSection';
import TestimonialSection from './components/TestimonialSection';
import OfferSection from './components/OfferSection';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import CheckoutModal from './components/CheckoutModal';
import { boardTiles, challengeDecks } from './data/gameData';
import { ModalStep, PaymentMethod } from './types';

export default function Home() {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<ModalStep>('selection');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [copiedLicense, setCopiedLicense] = useState<boolean>(false);
  const [downloadStarted, setDownloadStarted] = useState<boolean>(false);

  // Mini-Board & Dice State
  const [activeTileIndex, setActiveTileIndex] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number>(3);
  const [isDiceRolling, setIsDiceRolling] = useState<boolean>(false);

  // Deck State
  const [activeDeckTab, setActiveDeckTab] = useState<number>(0);
  const [cardIndexWithinTab, setCardIndexWithinTab] = useState<number>(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to safely get an AudioContext
  const getAudioContext = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      return AudioCtx ? new AudioCtx() : null;
    } catch {
      return null;
    }
  };

  // 1. Crisp tactile button click
  const playClickSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio prevented
    }
  };

  // 2. Gentle wooden/resin tumble click for dice roll
  const playDiceRollSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const randomFreq = 220 + Math.random() * 120;
      osc.frequency.setValueAtTime(randomFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Audio prevented
    }
  };

  // 3. Warm chime when dice finishes and lands on petak
  const playDiceLandSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const freqs = [523.25, 659.25]; // C5 & E5 intimate harmony
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.028, ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0008, ctx.currentTime + i * 0.04 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + i * 0.04 + 0.3);
      });
    } catch {
      // Audio prevented
    }
  };

  // 4. Smooth card flick / shuffle swoosh
  const playCardShuffleSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio prevented
    }
  };

  // 5. Success melodic chime for activation
  const playSuccessChime = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const chord = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
      chord.forEach((note, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const start = ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(note, start);
        gain.gain.setValueAtTime(0.035, start);
        gain.gain.exponentialRampToValueAtTime(0.0005, start + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.48);
      });
    } catch {
      // Audio prevented
    }
  };

  const handleOpenModal = () => {
    playClickSound();
    setModalStep('selection');
    setTimeLeft(15 * 60);
    setCopiedLicense(false);
    setDownloadStarted(false);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleContinuePayment = () => {
    playClickSound();
    setModalStep('qris');
  };

  const handleSimulateSuccess = () => {
    playSuccessChime();
    if (timerRef.current) clearInterval(timerRef.current);
    setModalStep('success');
  };

  const handleCopyLicense = () => {
    playClickSound();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('LCG-PASUTRI-88K-VIP');
      setCopiedLicense(true);
      setTimeout(() => setCopiedLicense(false), 3000);
    }
  };

  const handleDownloadApk = () => {
    playClickSound();
    setDownloadStarted(true);
    
    // Simulate real download trigger
    const element = document.createElement('a');
    const file = new Blob([
      'Love Couple Games v1.4.2 - Installer Paket Pasutri\nLicense Key: LCG-PASUTRI-88K-VIP\n\nTerima kasih telah bergabung. Pasang APK ini di perangkat Android Anda atau buka portal web melalui link aktivasi email.'
    ], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'LoveCoupleGames-v1.4.2-Setup.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const scrollToSection = (id: string) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dice Roll Simulation with tumble clicks and landing chime
  const handleRollDice = () => {
    if (isDiceRolling) return;
    playDiceRollSound();
    setIsDiceRolling(true);

    let rollCount = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      playDiceRollSound();
      rollCount += 1;
      if (rollCount >= 8) {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalRoll);
        setActiveTileIndex((prev) => (prev + finalRoll) % boardTiles.length);
        setIsDiceRolling(false);
        playDiceLandSound();
      }
    }, 70);
  };

  // Switch card within category with card flick sound
  const handleShuffleCard = () => {
    playCardShuffleSound();
    const currentTabCards = challengeDecks[activeDeckTab].cards;
    setCardIndexWithinTab((prev) => (prev + 1) % currentTabCards.length);
  };

  const handleSelectTab = (idx: number) => {
    playCardShuffleSound();
    setActiveDeckTab(idx);
    setCardIndexWithinTab(0);
  };

  const handleToggleFaq = (idx: number) => {
    playClickSound();
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  // Keyboard accessibility: Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Timer countdown effect for QRIS
  useEffect(() => {
    if (isModalOpen && modalStep === 'qris') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isModalOpen, modalStep]);

  // Scroll Reveal Observer for hardware-accelerated fluid section reveals
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -25px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Format timer mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <Header 
        onOpenModal={handleOpenModal} 
        onScrollToSection={scrollToSection} 
      />

      <main>
        <HeroSection 
          onOpenModal={handleOpenModal} 
          onScrollToSection={scrollToSection} 
        />

        <InsightSection />

        <div className="reveal-on-scroll">
          <MiniBoardSection 
            activeTileIndex={activeTileIndex}
            diceValue={diceValue}
            isDiceRolling={isDiceRolling}
            onRollDice={handleRollDice}
            onSelectTile={(idx) => {
              playClickSound();
              setActiveTileIndex(idx);
            }}
          />
        </div>

        <div className="reveal-on-scroll">
          <GameplaySection />
        </div>

        <div className="reveal-on-scroll">
          <FeaturesSection />
        </div>

        <div className="reveal-on-scroll">
          <CardDeckSection 
            activeDeckTab={activeDeckTab}
            cardIndexWithinTab={cardIndexWithinTab}
            onSelectTab={handleSelectTab}
            onShuffleCard={handleShuffleCard}
          />
        </div>

        <div className="reveal-on-scroll">
          <TestimonialSection onOpenModal={handleOpenModal} />
        </div>

        <div className="reveal-on-scroll">
          <FaqSection 
            openFaqIndex={openFaqIndex}
            onToggleFaq={handleToggleFaq}
            onOpenModal={handleOpenModal}
          />
        </div>

        <div className="reveal-on-scroll">
          <OfferSection onOpenModal={handleOpenModal} />
        </div>
      </main>

      <Footer />

      <MobileStickyBar onOpenModal={handleOpenModal} />

      <CheckoutModal 
        isOpen={isModalOpen}
        step={modalStep}
        paymentMethod={paymentMethod}
        onSelectPaymentMethod={setPaymentMethod}
        timeLeft={timeLeft}
        formatTime={formatTime}
        copiedLicense={copiedLicense}
        downloadStarted={downloadStarted}
        onClose={handleCloseModal}
        onContinue={handleContinuePayment}
        onSimulateSuccess={handleSimulateSuccess}
        onCopyLicense={handleCopyLicense}
        onDownloadApk={handleDownloadApk}
      />
    </>
  );
}
