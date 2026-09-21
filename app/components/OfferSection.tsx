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
                <span>Download Langsung APK Android & Web App iOS</span>
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
            <Button 
              onClick={onOpenModal}
              id="btnMainSekarang"
              style={{ fontSize: '1.12rem', padding: '16px 36px' }}
            >
              MAIN SEKARANG
            </Button>
            
            {/* Step flow explanation: ke Xendit, bayar, bikin akun, download apk */}
            <div className="offer-checkout-flow">
              <div className="flow-step">
                <span className="flow-num">1</span>
                <span>Pilih Metode (Xendit)</span>
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
                <span>Download APK & Main</span>
              </div>
            </div>

            <p className="offer-reassurance">
              [ Klik &quot;MAIN SEKARANG&quot; untuk ke sistem Xendit, selesaikan bayar Rp 88.000, aktivasi akun, dan langsung download APK ke HP kamu ]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
