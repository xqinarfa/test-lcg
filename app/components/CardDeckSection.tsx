'use client';

import React from 'react';
import { challengeDecks } from '../data/gameData';

export interface CardDeckSectionProps {
  activeDeckTab: number;
  cardIndexWithinTab: number;
  onSelectTab: (idx: number) => void;
  onShuffleCard: () => void;
}

export default function CardDeckSection({
  activeDeckTab,
  cardIndexWithinTab,
  onSelectTab,
  onShuffleCard,
}: CardDeckSectionProps) {
  const currentCard = challengeDecks[activeDeckTab].cards[cardIndexWithinTab];

  return (
    <section className="deck-section" id="bocoran-kartu">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
          <span className="faq-kicker">Koleksi 120+ Kartu</span>
          <h2 className="section-title">
            Contoh kartu tantangan yang akan kalian mainkan
          </h2>
          <p className="section-subtitle">
            Setiap kartu dirancang dengan sensitivitas tinggi untuk membangun koneksi mendalam, memicu tawa, dan menghangatkan keintiman ranjang.
          </p>
        </div>

        <div className="deck-tabs" role="tablist" aria-label="Kategori Kartu Tantangan">
          {challengeDecks.map((deck, idx) => (
            <button
              key={deck.category}
              type="button"
              role="tab"
              aria-selected={activeDeckTab === idx}
              className={`deck-tab ${activeDeckTab === idx ? 'active' : ''}`}
              onClick={() => onSelectTab(idx)}
            >
              {deck.title}
            </button>
          ))}
        </div>

        <div className="card-showcase">
          <div 
            key={`${activeDeckTab}-${cardIndexWithinTab}`} 
            className="challenge-card dealing"
          >
            <span className="card-corner tl" aria-hidden="true" />
            <span className="card-corner tr" aria-hidden="true" />
            <span className="card-corner bl" aria-hidden="true" />
            <span className="card-corner br" aria-hidden="true" />

            <div className="card-meta-top">
              <span className="card-category">
                {challengeDecks[activeDeckTab].category}
              </span>
              <div className="card-intensity" title={`Level Intensitas ${currentCard.intensity}/3`}>
                {[1, 2, 3].map((star) => (
                  <span
                    key={star}
                    className={`intensity-gem ${star <= currentCard.intensity ? 'active' : ''}`}
                    aria-hidden="true"
                  >
                    ◆
                  </span>
                ))}
              </div>
            </div>

            <p className="card-prompt">
              &ldquo;{currentCard.prompt}&rdquo;
            </p>

            <div className="card-bottom-row">
              <span className="card-rule">
                <strong>Aturan:</strong> {currentCard.rule.replace(/^Aturan:\s*/i, '')}
              </span>
              <div className="card-duration">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{currentCard.duration}</span>
              </div>
            </div>

            <div className="card-actions-row">
              <button
                type="button"
                className="btn-shuffle"
                onClick={onShuffleCard}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 3 21 3 21 8"></polyline>
                  <line x1="4" y1="20" x2="21" y2="3"></line>
                  <polyline points="21 16 21 21 16 21"></polyline>
                  <line x1="15" y1="15" x2="21" y2="21"></line>
                  <line x1="4" y1="4" x2="9" y2="9"></line>
                </svg>
                Buka Contoh Kartu Lain
              </button>
              <span className="card-instruction">
                Kartu {cardIndexWithinTab + 1} dari {challengeDecks[activeDeckTab].cards.length} contoh
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
