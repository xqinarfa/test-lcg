'use client';

import React from 'react';
import Button from './Button';
import { ModalStep, PaymentMethod } from '../types';

export interface CheckoutModalProps {
  isOpen: boolean;
  step: ModalStep;
  paymentMethod: PaymentMethod;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  copiedLicense: boolean;
  downloadStarted: boolean;
  onClose: () => void;
  onContinue: () => void;
  onSimulateSuccess: () => void;
  onCopyLicense: () => void;
  onDownloadApk: () => void;
}

export default function CheckoutModal({
  isOpen,
  step,
  paymentMethod,
  onSelectPaymentMethod,
  timeLeft,
  formatTime,
  copiedLicense,
  downloadStarted,
  onClose,
  onContinue,
  onSimulateSuccess,
  onCopyLicense,
  onDownloadApk,
}: CheckoutModalProps) {
  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <button 
          type="button" 
          className="modal-close" 
          onClick={onClose} 
          aria-label="Tutup jendela pembayaran"
        >
          &times;
        </button>

        {/* Step 1: Selection */}
        {step === 'selection' && (
          <div>
            <div className="modal-header">
              <h2 id="modalTitle">Akses Penuh Love Couple Games</h2>
              <p>Lisensi permanen untuk digunakan berdua bersama pasangan</p>
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Paket Lengkap Pasutri (Android & iOS)</span>
                <span>Rp 250.000</span>
              </div>
              <div className="summary-row discount">
                <span>Potongan Penawaran Hari Ini</span>
                <span>- Rp 162.000</span>
              </div>
              <div className="summary-row total">
                <span>Total Pembayaran</span>
                <span>Rp 88.000</span>
              </div>
            </div>

            <p className="payment-label">Metode Pembayaran</p>

            <div className="payment-methods">
              <label 
                className={`payment-method-card ${paymentMethod === 'qris' ? 'selected' : ''}`}
                onClick={() => onSelectPaymentMethod('qris')}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="qris" 
                  checked={paymentMethod === 'qris'} 
                  onChange={() => onSelectPaymentMethod('qris')} 
                />
                <span>QRIS (Semua Bank & E-Wallet)</span>
              </label>

              <label 
                className={`payment-method-card ${paymentMethod === 'gopay' ? 'selected' : ''}`}
                onClick={() => onSelectPaymentMethod('gopay')}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="gopay" 
                  checked={paymentMethod === 'gopay'} 
                  onChange={() => onSelectPaymentMethod('gopay')} 
                />
                <span>GoPay Instan</span>
              </label>

              <label 
                className={`payment-method-card ${paymentMethod === 'bca' ? 'selected' : ''}`}
                onClick={() => onSelectPaymentMethod('bca')}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bca" 
                  checked={paymentMethod === 'bca'} 
                  onChange={() => onSelectPaymentMethod('bca')} 
                />
                <span>BCA Virtual Account</span>
              </label>

              <label 
                className={`payment-method-card ${paymentMethod === 'mandiri' ? 'selected' : ''}`}
                onClick={() => onSelectPaymentMethod('mandiri')}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="mandiri" 
                  checked={paymentMethod === 'mandiri'} 
                  onChange={() => onSelectPaymentMethod('mandiri')} 
                />
                <span>Mandiri Virtual Account</span>
              </label>
            </div>

            <Button 
              onClick={onContinue}
              style={{ width: '100%' }}
            >
              Lanjutkan Pembayaran (Rp 88.000)
            </Button>
          </div>
        )}

        {/* Step 2: QRIS Simulation */}
        {step === 'qris' && (
          <div className="qris-view">
            <div className="modal-header">
              <h2>Pindai Kode QRIS</h2>
              <p>Buka aplikasi BCA, GoPay, OVO, ShopeePay, atau DANA untuk membayar</p>
            </div>

            <div className="qris-frame">
              <div className="qris-laser-scanner" aria-hidden="true" />
              <svg width="170" height="170" viewBox="0 0 24 24" fill="#130c10" aria-label="QR Code Pembayaran">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm0-4h2v2h-2v-2zm-4-2h4v2h-4v-2zm-2-2h2v2h-2v-2zm6 0h2v2h-2v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z"/>
              </svg>
            </div>

            <div className="countdown-timer">
              Sisa waktu pembayaran: <span>{formatTime(timeLeft)}</span>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '12px 0 20px' }}>
              Verifikasi pembayaran berjalan otomatis setelah transfer diterima.
            </p>

            <Button 
              onClick={onSimulateSuccess}
              style={{ width: '100%' }}
            >
              Konfirmasi Pembayaran Selesai
            </Button>
          </div>
        )}

        {/* Step 3: Success & Download Access */}
        {step === 'success' && (
          <div className="success-view">
            <div className="modal-header">
              <h2>Akses Game Anda Telah Aktif</h2>
              <p>Simpan kode lisensi unik Anda untuk membuka fitur di aplikasi</p>
            </div>

            {copiedLicense && (
              <div className="toast-feedback">
                Kode lisensi berhasil disalin ke clipboard!
              </div>
            )}

            <div className="license-box">
              <span>LCG-PASUTRI-88K-VIP</span>
              <button
                type="button"
                onClick={onCopyLicense}
                aria-label="Salin kode lisensi"
                style={{ 
                  color: copiedLicense ? 'var(--status-success)' : 'var(--text-secondary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  transform: copiedLicense ? 'scale(1.15)' : 'scale(1)'
                }}
              >
                {copiedLicense ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>

            {downloadStarted ? (
              <div className="toast-feedback" style={{ marginBottom: '20px' }}>
                Paket instalasi berhasil diunduh ke perangkat Anda.
              </div>
            ) : null}

            <Button 
              onClick={onDownloadApk}
              style={{ width: '100%', marginBottom: '14px' }}
            >
              Unduh Paket Game (APK)
            </Button>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Untuk pengguna iPhone atau iPad, gunakan link aktivasi portal web yang telah disinkronkan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
