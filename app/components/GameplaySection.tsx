'use client';

import React from 'react';
import { gameplaySteps } from '../data/gameData';

export default function GameplaySection() {
  const [tilt, setTilt] = React.useState<{ x: number; y: number; activeIndex: number | null }>({ x: 0, y: 0, activeIndex: null });

  const handlePhoneMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y, activeIndex: index });
  };

  const handlePhoneMouseLeave = () => {
    setTilt({ x: 0, y: 0, activeIndex: null });
  };

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
            Alur permainan yang dirancang bertahap, mulai dari obrolan santai hingga momen intim yang berkesan.
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
              <div className="phone-screen">
                <img 
                  src="/assets/images/custom-female.jpg" 
                  alt="Kustomisasi Karakter Istri" 
                  width={260} 
                  height={500} 
                />
              </div>
              <div className="dual-phone-caption">
                <span className="phone-avatar-tag">Karakter Istri</span>
                <span className="phone-avatar-sub">Gaya & Ekspresi</span>
              </div>
            </div>

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
              <div className="phone-screen">
                <img 
                  src="/assets/images/custom-male.jpg" 
                  alt="Kustomisasi Karakter Suami" 
                  width={260} 
                  height={500} 
                />
              </div>
              <div className="dual-phone-caption">
                <span className="phone-avatar-tag">Karakter Suami</span>
                <span className="phone-avatar-sub">Outfit & Tampilan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
