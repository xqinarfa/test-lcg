'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import InsightSection from './components/sections/InsightSection';
import GameplaySection from './components/sections/GameplaySection';
import FeaturesSection from './components/sections/FeaturesSection';
import CardDeckSection from './components/sections/CardDeckSection';
import TestimonialSection from './components/sections/TestimonialSection';
import FaqSection from './components/sections/FaqSection';
import OfferSection from './components/sections/OfferSection';
import MobileStickyBar from './components/ui/MobileStickyBar';
import CheckoutModal from './components/ui/CheckoutModal';
import { challengeDecks } from './data/gameData';
import { ModalStep, PaymentMethod } from './types';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<ModalStep>('selection');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [copiedLicense, setCopiedLicense] = useState<boolean>(false);
  const [downloadStarted, setDownloadStarted] = useState<boolean>(false);

  const [activeDeckTab, setActiveDeckTab] = useState<number>(0);
  const [cardIndexWithinTab, setCardIndexWithinTab] = useState<number>(0);
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
    } catch {}
  };


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
    } catch {}
  };

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
    } catch {}
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
    
    const element = document.createElement('a');
    const file = new Blob([
      'Love Couple Games v1.4.2 - Paket Pasutri Resmi\n' +
      'License Key: LCG-PASUTRI-88K-VIP\n\n' +
      '1. PENGGUNA APPLE iOS (iPhone / iPad):\n' +
      '   Aplikasi ini resmi tersedia di Apple Store. Buka tautan instan Apple Store / Web App privat Anda untuk langsung bermain layar penuh.\n\n' +
      '2. PENGGUNA ANDROID:\n' +
      '   Pasang paket installer APK resmi tanpa sensor ini langsung di ponsel Android Anda (aktifkan izin pasang dari sumber ini).\n\n' +
      'Terima kasih telah bergabung. Selamat menikmati malam penuh gairah & tawa berdua!'
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

  const handleSelectTier = (tierIdx: number) => {
    playClickSound();
    setCardIndexWithinTab(tierIdx);
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

  // Scroll reveal observer
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
            onSelectTier={handleSelectTier}
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
