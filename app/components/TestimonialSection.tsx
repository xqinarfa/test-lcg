'use client';

import React from 'react';
import { testimonials } from '../data/gameData';
import Button from './Button';

export interface TestimonialSectionProps {
  onOpenModal: () => void;
}

export default function TestimonialSection({ onOpenModal }: TestimonialSectionProps) {
  return (
    <section className="testimonial-section" id="testimoni">
      <div className="container">
        <div className="section-header text-center">
          <span className="faq-kicker">BUKTI NYATA PASUTRI</span>
          <h2 className="section-title">
            Apa Kata Mereka Yang Sudah Coba?
          </h2>
          <p className="section-subtitle mx-auto">
            Cerita jujur dari pasutri yang hubungannya kembali <strong>MEMBARA</strong> dan gak lagi hambar setelah main Love Couple Games.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.id}>
              {/* Top rating & verified tag */}
              <div className="testimonial-card-header">
                <div className="testimonial-stars" aria-label="Rating 5 dari 5 bintang">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star-icon">★</span>
                  ))}
                </div>
                <div className="testimonial-verified">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Verified Pasutri</span>
                </div>
              </div>

              {/* Boss highlight badge */}
              <div className="testimonial-highlight">
                &ldquo;{item.highlight}&rdquo;
              </div>

              {/* Quote text */}
              <blockquote className="testimonial-quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Author info */}
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {item.avatarText}
                </div>
                <div className="testimonial-info">
                  <div className="author-name">{item.couple}</div>
                  <div className="author-meta">
                    <span>{item.duration}</span>
                    <span className="meta-sep">•</span>
                    <span>{item.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA hook */}
        <div className="testimonial-cta-banner">
          <div className="testimonial-cta-text">
            <h4>Mau Pernikahan Kamu Ikutan MEMBARA?</h4>
            <p>Bayar sekali Rp 88.000, bikin hubungan intim kamu dan pasangan nagih tiap malam.</p>
          </div>
          <Button 
            onClick={onOpenModal}
            id="btnTestimonialCta"
            style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}
          >
            MAIN SEKARANG
          </Button>
        </div>
      </div>
    </section>
  );
}
