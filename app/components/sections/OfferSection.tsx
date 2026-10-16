'use client';

import React from 'react';
import Button from '../ui/Button';

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
            <span className="faq-kicker">BAYAR SEKALI AJA!</span>
            <h2 className="section-title">
              DOWNLOAD LOVE COUPLE GAMES SEKARANG
            </h2>
            <p className="offer-subtitle">
              MURAH BANGET, TAPI BISA KAMU MAINKAN SETIAP SAAT
            </p>
          </div>

          <div className="offer-price-showcase">
            <div className="offer-price-box">
              <span className="offer-price-struck">Rp 250.000</span>
              <div className="offer-price-main">
                <span className="offer-currency">Rp</span>
                <span className="offer-amount">88.000</span>
                <span className="offer-suffix-aja">AJA!</span>
              </div>
              <span className="offer-badge-license">BAYAR SEKALI AJA! AKSES SELAMANYA</span>
            </div>

            <div className="offer-perks-list">
              <div className="offer-perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Privat 100% Khusus Pasutri (Aman & Tanpa Ribet)</span>
              </div>
              <div className="offer-perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span>Tersedia di Apple Store (iOS) & APK Android (100% Privat & Tanpa Sensor)</span>
              </div>
              <div className="offer-perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Pembayaran Resmi via Xendit / QRIS Otomatis</span>
              </div>
            </div>
          </div>
          <div className="offer-action-box">
            <div className="offer-buttons-group">
              <Button 
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                id="btnOfferIos"
                ariaLabel="Download Game di App Store untuk iOS"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '6px' }}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.17.65-2.84 1.43-.58.67-1.1 1.74-.96 2.78 1.07.08 2.18-.59 2.79-1.34z"/>
                </svg>
                Download Game (iOS)
              </Button>

              <Button 
                onClick={onOpenModal}
                id="btnOfferAndroid"
                ariaLabel="Download Game APK untuk Android"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '6px' }}>
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0003s.4482-1.0003.9993-1.0003c.5516 0 .9993.4486.9993 1.0003 0 .5517-.4477 1.0003-.9993 1.0003m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0003s.4482-1.0003.9993-1.0003c.5516 0 .9993.4486.9993 1.0003 0 .5517-.4477 1.0003-.9993 1.0003m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5898 8.411 13.8504 8.125 12 8.125c-1.8504 0-3.5898.286-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
                </svg>
                Download Game (Android)
              </Button>
            </div>
            
            <div className="offer-checkout-flow">
              <div className="flow-step">
                <span className="flow-num">1</span>
                <span>Pilih Platform</span>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <span className="flow-num">2</span>
                <span>Bayar Rp 88.000</span>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <span className="flow-num">3</span>
                <span>Bikin Akun / Lisensi</span>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <span className="flow-num">4</span>
                <span>Akses Apple Store / APK</span>
              </div>
            </div>

            <p className="offer-reassurance">
              Pilih platform Anda: resmi di Apple Store (iOS) atau unduh langsung paket APK Android tanpa sensor. 100% aman dan privat berdua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
