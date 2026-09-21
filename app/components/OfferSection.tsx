'use client';

import React from 'react';
import Button from './Button';

export interface OfferSectionProps {
  onOpenModal: () => void;
}

export default function OfferSection({ onOpenModal }: OfferSectionProps) {
  return (
    <section className="offer-section" id="penawaran">
      <div className="container offer-container">
        <div className="offer-grand-card">
          <span className="offer-corner tl" aria-hidden="true" />
          <span className="offer-corner tr" aria-hidden="true" />
          <span className="offer-corner bl" aria-hidden="true" />
          <span className="offer-corner br" aria-hidden="true" />

          <div className="offer-header">
            <span className="faq-kicker">Momen Berdua Menanti</span>
            <h2 className="section-title">
              Siap membuat malam ini lebih istimewa?
            </h2>
            <p className="offer-subtitle">
              Tinggalkan kejenuhan rutinitas harian. Hadirkan kehangatan, tawa berdua, dan momen intim tak terlupakan malam ini.
            </p>
          </div>

          <div className="offer-price-showcase">
            <div className="offer-price-box">
              <span className="offer-price-struck">Rp 250.000</span>
              <div className="offer-price-main">
                <span className="offer-currency">Rp</span>
                <span className="offer-amount">88.000</span>
              </div>
              <span className="offer-badge-license">Akses Penuh Selamanya</span>
            </div>

            <div className="offer-perks-list">
              <div className="offer-perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>100% Privat & Tanpa Registrasi Akun</span>
              </div>
              <div className="offer-perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span>Kompatibel untuk Android & iOS</span>
              </div>
              <div className="offer-perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Aktivasi Instan & Otomatis via QRIS</span>
              </div>
            </div>
          </div>

          <div className="offer-action-box">
            <Button 
              onClick={onOpenModal}
              id="btnMainSekarang"
            >
              Buka Akses Game Sekarang
            </Button>
            <p className="offer-reassurance">
              Format APK Android dan Web App Player untuk iPhone atau iPad. Sekali pembayaran untuk digunakan berdua selamanya tanpa biaya langganan tambahan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
