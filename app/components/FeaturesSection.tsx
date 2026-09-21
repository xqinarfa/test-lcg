'use client';

import React from 'react';
import { featurePillars } from '../data/gameData';

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <span className="faq-kicker">Kelebihan Utama</span>
          <h2 className="section-title">
            Semua yang dibutuhkan untuk malam romantis
          </h2>
          <p className="section-subtitle">
            Dirancang dengan cermat untuk kenyamanan, privasi, dan kepuasan kedua belah pihak.
          </p>
        </div>

        <div className="features-grid">
          {featurePillars.map((feature, idx) => {
            const tags = [
              '4 Kategori Intim',
              'Foreplay Tenang',
              'Koin & Kostum',
              'Keamanan Kamar',
            ];

            return (
              <div className="feature-card" key={idx}>
                <div className="feature-icon-wrapper">
                  {idx === 0 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="16" rx="3"></rect>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  )}
                  {idx === 3 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  )}
                </div>
                <div className="feature-card-content">
                  <div className="feature-tag-row">
                    <span className="feature-pill-tag">{tags[idx]}</span>
                    <span className="feature-index">0{idx + 1}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
