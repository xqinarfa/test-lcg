'use client';

import React, { useState } from 'react';
import { gameplaySteps } from '../../data/gameData';

const femaleOutfits = [
  {
    id: 'queen-bee',
    name: 'Queen Bee',
    tag: 'Queen Bee (Include Hair)',
    src: '/assets/images/girl-001.jpeg',
    style: 'Gaya & Ekspresi',
  },
  {
    id: 'mrs-elf',
    name: 'Mrs Elf',
    tag: 'Mrs Elf (Include Hair)',
    src: '/assets/images/girl-002.jpeg',
    style: 'Gaya & Ekspresi',
  },
];

const maleOutfits = [
  {
    id: 'angel-may-cry',
    name: 'Angel May Cry',
    tag: 'Angel May Cry',
    src: '/assets/images/man-001.jpeg',
    style: 'Outfit & Tampilan',
  },
  {
    id: 'city-boy',
    name: 'City Boy',
    tag: 'City Boy - Navy',
    src: '/assets/images/man-002.jpeg',
    style: 'Outfit & Tampilan',
  },
  {
    id: 'two-reds',
    name: '2 Reds',
    tag: '2 Reds',
    src: '/assets/images/man-003.jpeg',
    style: 'Outfit & Tampilan',
  },
  {
    id: 'fire-serpent',
    name: 'Fire Serpent',
    tag: 'Fire Serpent (Include Hair)',
    src: '/assets/images/man-004.jpeg',
    style: 'Outfit & Tampilan',
  },
];

export default function GameplaySection() {
  const [tilt, setTilt] = useState<{ x: number; y: number; activeIndex: number | null }>({ x: 0, y: 0, activeIndex: null });
  const [femaleIndex, setFemaleIndex] = useState<number>(0);
  const [maleIndex, setMaleIndex] = useState<number>(0);

  const handlePhoneMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y, activeIndex: index });
  };

  const handlePhoneMouseLeave = () => {
    setTilt({ x: 0, y: 0, activeIndex: null });
  };

  const handleCycleFemale = () => {
    setFemaleIndex((prev) => (prev + 1) % femaleOutfits.length);
  };

  const handleSelectFemale = (index: number) => {
    setFemaleIndex(index);
  };

  const handleCycleMale = () => {
    setMaleIndex((prev) => (prev + 1) % maleOutfits.length);
  };

  const handleSelectMale = (index: number) => {
    setMaleIndex(index);
  };

  const currentFemale = femaleOutfits[femaleIndex];
  const currentMale = maleOutfits[maleIndex];

  return (
    <section className="gameplay-section" id="cara-main">
      <div className="container gameplay-grid">
        {/* Steps Guide */}
        <div>
          <span className="faq-kicker">Alur Permainan</span>
          <h2 className="section-title">
            Satu papan permainan, ratusan momen berdua
          </h2>
          <p className="section-subtitle">
            Alur permainan yang dirancang bertahap, mulai dari obrolan santai hingga momen mesra yang berkesan.
          </p>

          <div className="gameplay-stepper">
            {gameplaySteps.map((step) => (
              <div className="step-item" key={step.num}>
                <div className="step-indicator">
                  <span>0{step.num}</span>
                </div>
                <div className="step-content">
                  <div className="step-tag-row">
                    <span className="step-tag">Fase 0{step.num}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Character Customization Dual Phones with 3D Depth Tilt */}
        <div className="dual-phones-container">
          <div className="dual-phones">
            {/* Phone 1: Karakter Istri */}
            <div 
              className="dual-phone-item"
              onMouseMove={(e) => handlePhoneMouseMove(e, 0)}
              onMouseLeave={handlePhoneMouseLeave}
              style={{
                transform: tilt.activeIndex === 0 
                  ? `perspective(700px) rotateX(${-tilt.y * 14}deg) rotateY(${tilt.x * 16}deg) translateY(-8px) scale(1.03)` 
                  : 'perspective(700px) rotateX(0deg) rotateY(0deg)',
                transition: tilt.activeIndex === 0 ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="phone-notch" />
              <div 
                className="phone-screen phone-screen-interactive"
                onClick={handleCycleFemale}
                title="Klik untuk ganti kostum istri"
              >
                <img 
                  key={currentFemale.id}
                  src={currentFemale.src} 
                  alt={`Kustomisasi Karakter Istri - ${currentFemale.name}`} 
                  width={260} 
                  height={500}
                  className="phone-screen-img"
                />
                <div className="phone-screen-overlay-btn" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                  <span>Ganti Kostum ({femaleIndex + 1}/{femaleOutfits.length})</span>
                </div>
              </div>
              <div className="dual-phone-caption">
                <span className="phone-avatar-tag">Karakter Istri</span>
                <span className="phone-avatar-sub">{currentFemale.tag}</span>

                <div className="phone-outfit-pills">
                  {femaleOutfits.map((outfit, idx) => (
                    <button
                      key={outfit.id}
                      type="button"
                      className={`phone-outfit-pill ${idx === femaleIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectFemale(idx);
                      }}
                      aria-label={`Pilih kostum ${outfit.name}`}
                    >
                      {outfit.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone 2: Karakter Suami */}
            <div 
              className="dual-phone-item"
              onMouseMove={(e) => handlePhoneMouseMove(e, 1)}
              onMouseLeave={handlePhoneMouseLeave}
              style={{
                transform: tilt.activeIndex === 1 
                  ? `perspective(700px) rotateX(${-tilt.y * 14}deg) rotateY(${tilt.x * 16}deg) translateY(-8px) scale(1.03)` 
                  : 'perspective(700px) rotateX(0deg) rotateY(0deg)',
                transition: tilt.activeIndex === 1 ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="phone-notch" />
              <div 
                className="phone-screen phone-screen-interactive"
                onClick={handleCycleMale}
                title="Klik untuk ganti kostum suami"
              >
                <img 
                  key={currentMale.id}
                  src={currentMale.src} 
                  alt={`Kustomisasi Karakter Suami - ${currentMale.name}`} 
                  width={260} 
                  height={500}
                  className="phone-screen-img"
                />
                <div className="phone-screen-overlay-btn" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                  <span>Ganti Kostum ({maleIndex + 1}/{maleOutfits.length})</span>
                </div>
              </div>
              <div className="dual-phone-caption">
                <span className="phone-avatar-tag">Karakter Suami</span>
                <span className="phone-avatar-sub">{currentMale.tag}</span>

                <div className="phone-outfit-pills">
                  {maleOutfits.map((outfit, idx) => (
                    <button
                      key={outfit.id}
                      type="button"
                      className={`phone-outfit-pill ${idx === maleIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMale(idx);
                      }}
                      aria-label={`Pilih kostum ${outfit.name}`}
                    >
                      {outfit.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
