'use client';

import React from 'react';
import { faqItems } from '../../data/gameData';

export interface FaqSectionProps {
  openFaqIndex: number | null;
  onToggleFaq: (idx: number) => void;
  onOpenModal?: () => void;
}

export default function FaqSection({ openFaqIndex, onToggleFaq }: FaqSectionProps) {
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
        </div>
      </div>
    </section>
  );
}
