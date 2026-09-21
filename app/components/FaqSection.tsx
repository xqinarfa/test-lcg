'use client';

import React from 'react';
import { faqItems } from '../data/gameData';
import Button from './Button';

export interface FaqSectionProps {
  openFaqIndex: number | null;
  onToggleFaq: (idx: number) => void;
  onOpenModal?: () => void;
}

export default function FaqSection({ openFaqIndex, onToggleFaq, onOpenModal }: FaqSectionProps) {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="faq-container">
          <header className="faq-header">
            <span className="faq-kicker">Tanya Jawab</span>
            <h2 id="faq-title" className="section-title">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Hal-hal penting seputar privasi data, mutasi rekening, dan kenyamanan bermain yang paling sering ditanyakan pasangan.
            </p>
          </header>

          <div className="faq-list">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div 
                  className={`faq-item ${isOpen ? 'active' : ''}`} 
                  key={item.question}
                >
                  <button
                    type="button"
                    className="faq-trigger"
                    onClick={() => onToggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <span className="faq-icon-bubble" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-content">
                      <div className="faq-divider" />
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="faq-support-box">
            <h3 className="faq-support-title">Ada hal lain yang ingin ditanyakan berdua?</h3>
            <p className="faq-support-desc">
              Kami paham privasi rumah tangga adalah hal yang sangat personal. Jika ada pertanyaan seputar cara main atau instalasi sebelum membeli, hubungi kami via WhatsApp. Diskusi bersifat rahasia dan langsung dijawab oleh tim kami.
            </p>
            <div className="faq-support-actions">
              <a 
                href="https://wa.me/6281234567890?text=Halo%20Admin%20Love%20Couple%20Games,%20saya%20ingin%20bertanya%20seputar%20game%20ini"
                target="_blank"
                rel="noopener noreferrer"
                className="faq-wa-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Tanya via WhatsApp
              </a>
              {onOpenModal && (
                <Button onClick={onOpenModal}>
                  Buka Akses Permainan
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
