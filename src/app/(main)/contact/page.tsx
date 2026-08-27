'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0F5E4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#D4AF37] text-[#0F5E4A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Hubungi Kami
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-4 mb-3">
            Kontak & Lokasi Pesantren
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Silakan hubungi kami untuk informasi seputar PPDB, kunjungan silaturahmi, program pendidikan, atau pertanyaan umum lainnya.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informasi Kontak & Detail */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Informasi Sekretariat
            </h2>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#0F5E4A]/10 text-[#0F5E4A] dark:text-emerald-400 rounded-2xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alamat</h3>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1 leading-relaxed">
                  Jl. Raya Ciampea No. 45, Kecamatan Ciampea, Kabupaten Bogor, Jawa Barat 16620
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#0F5E4A]/10 text-[#0F5E4A] dark:text-emerald-400 rounded-2xl shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Telepon / WhatsApp</h3>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                  +62 812-3456-7890 (Sekretariat)<br />
                  +62 857-1122-3344 (Humas & PPDB)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#0F5E4A]/10 text-[#0F5E4A] dark:text-emerald-400 rounded-2xl shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Resmi</h3>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                  info@alfauziah.sch.id<br />
                  ppdb@alfauziah.sch.id
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#0F5E4A]/10 text-[#0F5E4A] dark:text-emerald-400 rounded-2xl shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jam Operasional Kantor</h3>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                  Senin - Sabtu: 07.30 - 16.00 WIB<br />
                  Minggu / Libur Nasional: Tutup
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Pesan Cepat */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Kirim Pesan Cepat
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Isi formulir di bawah ini dan tim sekretariat kami akan merespons pertanyaan Anda sesegera mungkin.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-500" />
                <div>
                  <h4 className="font-bold text-sm">Pesan Berhasil Terkirim!</h4>
                  <p className="text-xs mt-0.5">Terima kasih telah menghubungi kami. Tim kami akan segera merespons via Email/WhatsApp.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="contoh@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Subjek Pertanyaan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Pertanyaan Syarat PPDB"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Pesan Anda *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pertanyaan atau informasi yang ingin Anda tanyakan..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#0F5E4A] hover:bg-[#0c4a3a] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Embed Google Maps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden h-80 sm:h-96">
          <iframe
            title="Lokasi Pondok Pesantren Al Fauziah Bogor"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.486227289569!2d106.69752941537233!3d-6.58634899523675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c54e7d9435b7%3A0x6b4ef84a8bb8863c!2sCiampea%2C%20Bogor%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1680000000000!5m2!1sen!2sid"
            className="w-full h-full rounded-2xl border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}