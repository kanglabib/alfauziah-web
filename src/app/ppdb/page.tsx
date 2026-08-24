'use client';

import React, { useState } from 'react';
import { CheckCircle2, FileText, Send, Calendar, HelpCircle, DollarSign } from 'lucide-react';

export default function PPDBPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    nisn: '',
    gender: 'L',
    program: 'MTs',
    parentName: '',
    whatsapp: '',
    address: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini nantinya bisa disambungkan ke API backend / Database
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0F5E4A] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#D4AF37] text-[#0F5E4A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Tahun Ajaran 2026/2027
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-4 mb-2">
            Penerimaan Santri Baru (PPDB)
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Bergabunglah menjadi bagian dari keluarga besar Pondok Pesantren Al Fauziah. Wujudkan generasi pencinta Al-Qur'an dan berprestasi.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Pendaftaran */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0F5E4A] dark:text-emerald-400" />
            Formulir Pendaftaran Online
          </h2>

          {submitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 p-6 rounded-xl text-center">
              <CheckCircle2 className="w-12 h-12 text-[#0F5E4A] dark:text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pendaftaran Berhasil Dikirim!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Tim panitia PPDB akan menghubungi Anda via WhatsApp untuk verifikasi berkas dan jadwal tes seleksi.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-[#0F5E4A] text-white rounded-lg hover:bg-[#0F5E4A]/90 transition-all"
              >
                Isi Form Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap Santri</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                    placeholder="Sesuai ijazah/akta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">NISN</label>
                  <input
                    type="text"
                    required
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                    placeholder="10 digit NISN"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                  >
                    <option value="L">Laki-laki (Santriwan)</option>
                    <option value="P">Perempuan (Santriwati)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Pilihan Program</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                  >
                    <option value="MTs">Madrasah Tsanawiyah (MTs)</option>
                    <option value="MA">Madrasah Aliyah (MA)</option>
                    <option value="Tahfizh">Takhasus Tahfizh Al-Qur'an</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Orang Tua / Wali</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                    placeholder="Nama Ayah/Ibu/Wali"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">No. WhatsApp Aktif</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Lengkap</label>
                <textarea
                  rows={3}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                  placeholder="Jalan, RT/RW, Kecamatan, Kabupaten/Kota"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#0F5E4A] text-white font-semibold text-sm rounded-xl hover:bg-[#0F5E4A]/90 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                Kirim Formulir Pendaftaran
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info PPDB */}
        <div className="space-y-6">
          {/* Timeline / Gelombang */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              Jadwal Pendaftaran
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                <span className="font-bold text-[#0F5E4A] dark:text-emerald-400 block">Gelombang 1 (Inden)</span>
                <span className="text-gray-600 dark:text-gray-300">1 Oktober - 31 Desember</span>
              </li>
              <li className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <span className="font-bold text-gray-700 dark:text-gray-300 block">Gelombang 2</span>
                <span className="text-gray-500 dark:text-gray-400">1 Januari - 31 Maret</span>
              </li>
            </ul>
          </div>

          {/* Biaya */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#D4AF37]" />
              Estimasi Biaya Masuk
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Infaq Pangkal</span>
                <span className="font-bold text-gray-900 dark:text-white">Rp 4.500.000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Seragam & Pustaka</span>
                <span className="font-bold text-gray-900 dark:text-white">Rp 1.200.000</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600 dark:text-gray-400">SPP / Syahriah Bulanan</span>
                <span className="font-bold text-[#0F5E4A] dark:text-emerald-400">Rp 850.000 / bln</span>
              </div>
            </div>
          </div>

          {/* Kontak Bantuan */}
          <div className="bg-[#0F5E4A] text-white p-6 rounded-2xl">
            <h3 className="text-base font-bold mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
              Butuh Bantuan?
            </h3>
            <p className="text-xs text-white/80 mb-4">
              Hubungi Sekretariat Panitia PPDB jika mengalami kesulitan dalam pendaftaran.
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center py-2 px-4 bg-[#D4AF37] text-[#0F5E4A] font-bold text-xs rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Chat CS via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}