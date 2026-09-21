'use client';

import React from 'react';
import Button from './Button';
import { boardTiles } from '../data/gameData';

export interface MiniBoardSectionProps {
  activeTileIndex: number;
  diceValue: number;
  isDiceRolling: boolean;
  onRollDice: () => void;
  onSelectTile?: (idx: number) => void;
}

// Bespoke vector iconography for each board game space
function TileVectorIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      // Candle & Intimate Warmth
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2c.6 1.8 1.8 3.2 1.8 4.6a2.6 2.6 0 0 1-5.2 0c0-1.4 1.2-2.8 1.8-4.6z" />
          <path d="M7 10h10v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V10z" />
          <line x1="5" y1="22" x2="19" y2="22" />
        </svg>
      );
    case 1:
      // Whispered Conversation & Heart
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 14a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M12 7.2c-.9-1-2.4-.6-2.4.9 0 1.1 1.7 2.1 2.4 2.7.7-.6 2.4-1.6 2.4-2.7 0-1.5-1.5-1.9-2.4-.9z" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );
    case 2:
      // Gentle Caress & Soft Touch
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 11V6a2 2 0 0 0-4 0v4" />
          <path d="M14 10V4a2 2 0 0 0-4 0v7" />
          <path d="M10 10.5V6a2 2 0 0 0-4 0v8c0 4.4 3.6 8 8 8h1a8 8 0 0 0 8-8v-3a2 2 0 0 0-4 0v1.5" />
        </svg>
      );
    case 3:
      // Massage & Relaxation Lotus
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3c-4.5 4-4.5 9 0 13 4.5-4 4.5-9 0-13z" fill="currentColor" fillOpacity="0.2" />
          <path d="M6 10c2 4 6 6 6 6s4-2 6-6" />
          <path d="M3 17c4 2 9 2 9 2s5 0 9-2" />
        </svg>
      );
    case 4:
      // Sensual Ember Flame
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case 5:
    default:
      // Peak Sanctuary Crown
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 5l3 13h14l3-13-6 6-4-6-4 6-6-6z" />
          <circle cx="12" cy="19" r="1.5" fill="currentColor" />
        </svg>
      );
  }
}

// 3D Pip Dice component with standard die pips layout
function DiceCube({
  value,
  isRolling,
  onClick,
}: {
  value: number;
  isRolling: boolean;
  onClick: () => void;
}) {
  const pipMap: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };

  const activePips = pipMap[value] || [4];

  return (
    <div
      role="button"
      tabIndex={0}
      className={`dice-cube ${isRolling ? 'rolling' : ''}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Dadu bernilai ${value}. Ketuk untuk mengocok.`}
      title="Ketuk dadu untuk mengocok langkah"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pipIdx) => (
        <span
          key={pipIdx}
          className={`dice-pip ${activePips.includes(pipIdx) ? 'visible' : ''}`}
        />
      ))}
    </div>
  );
}

export default function MiniBoardSection({
  activeTileIndex,
  diceValue,
  isDiceRolling,
  onRollDice,
  onSelectTile,
}: MiniBoardSectionProps) {
  const currentTile = boardTiles[activeTileIndex] || boardTiles[0];

  return (
    <section className="mini-board-section" id="simulasi-papan">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
          <span className="faq-kicker">Simulasi Interaktif</span>
          <h2 className="section-title">
            Langkah di Atas Papan Permainan
          </h2>
          <p className="section-subtitle">
            Kocok dadu atau pilih petak secara langsung untuk melihat bagaimana alur permainan memandu keintiman kalian berdua secara alami.
          </p>
        </div>

        <div className="board-stage">
          {/* Header Bar Papan */}
          <div className="board-top-status">
            <div className="board-status-badge">
              <span className="board-ornament-diamond" aria-hidden="true">◆</span>
              <span>PAPAN PERJALANAN INTIM PASUTRI</span>
            </div>
            <div className="board-status-step">
              <span>Posisi Bidak:</span>
              <strong> Petak 0{activeTileIndex + 1} / 06</strong>
              <div className="board-step-track-dots" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5].map((dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`track-dot ${dotIdx === activeTileIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Lintasan Petak Papan */}
          <div className="board-track-wrapper">
            <div className="board-track-connector" aria-hidden="true" />
            <div className="board-track">
              {boardTiles.map((tile, idx) => {
                const isActive = activeTileIndex === idx;

                return (
                  <div
                    key={tile.name}
                    role="button"
                    tabIndex={0}
                    className={`board-tile ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectTile?.(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectTile?.(idx);
                      }
                    }}
                    aria-label={`Petak 0${idx + 1}: ${tile.name}`}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <div 
                        key={`pawn-hop-${idx}-${activeTileIndex}`}
                        className="tile-pawn-indicator pawn-hopping" 
                        aria-label="Bidak Pasangan"
                      >
                        <div className="pawn-medallion">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="9" cy="12" r="5" />
                            <circle cx="15" cy="12" r="5" />
                          </svg>
                        </div>
                        <span className="pawn-label">Bidak Berdua</span>
                      </div>
                    )}
                    <span className="tile-num">0{idx + 1}</span>
                    <div className="tile-icon-svg" aria-hidden="true">
                      <TileVectorIcon index={idx} />
                    </div>
                    <span className="tile-name">{tile.name}</span>
                    <span className="tile-tag">{tile.tag}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Konsol Dadu & Kartu Misi Fisik */}
          <div className="board-console">
            <div className="dice-interactive-box">
              <div className="dice-wrap">
                <DiceCube
                  value={diceValue}
                  isRolling={isDiceRolling}
                  onClick={onRollDice}
                />
                <span className="dice-hint">Ketuk dadu</span>
              </div>
              <Button
                onClick={onRollDice}
                disabled={isDiceRolling}
              >
                {isDiceRolling ? 'Mengocok...' : 'Kocok Dadu'}
              </Button>
            </div>

            <div 
              key={`mission-card-${activeTileIndex}`}
              className="board-mission-card changing"
            >
              <div className="mission-card-inner">
                <div className="mission-card-meta">
                  <div className="mission-card-pill">
                    <span className="mission-card-category">KARTU PETAK 0{activeTileIndex + 1}</span>
                    <span className="mission-card-sep">·</span>
                    <span className="mission-card-title-text">{currentTile.name}</span>
                  </div>

                  <div className="mission-card-badges">
                    {currentTile.duration && (
                      <span className="mission-badge-time">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {currentTile.duration}
                      </span>
                    )}
                    {currentTile.intensity && (
                      <span className="mission-badge-intensity" title={`Tingkat Kedalaman: Level ${currentTile.intensity}/3`}>
                        {[1, 2, 3].map((star) => (
                          <span
                            key={star}
                            className={`intensity-dot ${star <= (currentTile.intensity || 1) ? 'filled' : ''}`}
                            aria-hidden="true"
                          >
                            ◆
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mission-card-body">
                  <p className="mission-prompt">
                    {currentTile.mission}
                  </p>
                </div>

                {currentTile.rule && (
                  <div className="mission-card-footer">
                    <div className="mission-rule-box">
                      <span className="rule-badge">Aturan Main</span>
                      <p className="rule-text">{currentTile.rule.replace(/^Aturan:\s*/i, '')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
