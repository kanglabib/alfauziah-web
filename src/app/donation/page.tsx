'use client';

import React, { useState } from 'react';
import { Heart, Copy, Check, Building2, Calculator, ShieldCheck } from 'lucide-react';

export default function DonationPage() {
  const [selectedNominal, setSelectedNominal] = useState<number | null>(100000);
  const [customNominal, setCustomNominal] = useState<string>('');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // Kalkulator Zakat Mal
  const [assetValue, setAssetValue] = useState<string>('');
  const calculateZakat = () => {
    const val = parseFloat(assetValue) || 0;
    return val >= 85000000 ? val * 0.025 : 0; // Nisab estimasi 85jt (595 gram perak/emas)
  };

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const nominalOptions = [50000, 100000, 250000, 500000, 1000000];

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0F5E4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#D4AF37] text-[#0F5E4A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Infaq & Waqaf
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-4 mb-3">
            Investasi Akhirat Bersama Al Fauziah
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Mari salurkan infaq, waqaf pembangunan, dan zakat Anda untuk mendukung operasional serta beasiswa santri penghafal Al-Qur'an.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Donasi & Rekening */}
        <div className="lg:col-span-2 space-y-8">
          {/* Form Nominal */}
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              Pilih Nominal Infaq / Waqaf
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {nominalOptions.map((nom) => (
                <button
                  key={nom}
                  onClick={() => {
                    setSelectedNominal(nom);
                    setCustomNominal('');
                  }}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    selectedNominal === nom && !customNominal
                      ? 'bg-[#0F5E4A] text-white border-[#0F5E4A]'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-[#0F5E4A]'
                  }`}
                >
                  Rp {nom.toLocaleString('id-ID')}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Atau Masukkan Nominal Lain (Rp)
              </label>
              <input
                type="number"
                placeholder="Contoh: 150000"
                value={customNominal}
                onChange={(e) => {
                  setCustomNominal(e.target.value);
                  setSelectedNominal(null);
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
              />
            </div>

            {/* Rekening Tujuan */}
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              Transfer Bank Resmi Pesantren
            </h3>

            <div className="space-y-3">
              {[
                { bank: 'Bank Syariah Indonesia (BSI)', no: '7123456789', name: 'Yayasan Al Fauziah' },
                { bank: 'Bank Muamalat', no: '3010098765', name: 'Yayasan Al Fauziah' },
              ].map((b) => (
                <div key={b.bank} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#0F5E4A] dark:text-emerald-400 block">{b.bank}</span>
                    <span className="text-base font-mono font-bold text-gray-900 dark:text-white">{b.no}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 block">a.n {b.name}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(b.no, b.bank)}
                    className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {copiedBank === b.bank ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    {copiedBank === b.bank ? 'Tersalin' : 'Salin'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Kalkulator Zakat */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#D4AF37]" />
              Kalkulator Zakat Mal
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Hitung kewajiban Zakat Mal (2.5%) dari total aset simpanan yang sudah berjalan 1 tahun (haul & nishab).
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Harta / Simpanan (Rp)
                </label>
                <input
                  type="number"
                  placeholder="Masukkan total tabungan"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                />
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
                <span className="text-[10px] font-bold uppercase text-[#0F5E4A] dark:text-emerald-400 block">
                  Kewajiban Zakat (2.5%)
                </span>
                <span className="text-xl font-bold text-[#0F5E4A] dark:text-emerald-400">
                  Rp {calculateZakat().toLocaleString('id-ID')}
                </span>
                {parseFloat(assetValue) < 85000000 && parseFloat(assetValue) > 0 && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
                    *Belum mencapai nisab (Estimasi min. Rp 85.000.000)
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#0F5E4A] text-white p-6 rounded-3xl space-y-3">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
            <h4 className="text-base font-bold">Transparansi & Amanah</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Setiap donasi dan infaq dilaporkan secara berkala dan diaudit untuk memastikan penyaluran tepat sasaran bagi pembangunan fasilitas & beasiswa santri.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}