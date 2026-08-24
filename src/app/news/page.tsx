'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

export interface NewsItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
}

export const NEWS_DATA: NewsItem[] = [
  {
    slug: "penerimaan-santri-baru-gelombang-1-resmi-dibuka",
    title: "Penerimaan Santri Baru (PPDB) Tahun Ajaran 2026/2027 Resmi Dibuka",
    category: "PPDB",
    date: "1 Oktober 2025",
    author: "Panitia PPDB",
    excerpt: "Pondok Pesantren Al Fauziah kembali membuka pendaftaran santri baru gelombang 1 (inden) untuk jenjang MTs, MA, dan Takhasus Tahfizh.",
    content: "Pondok Pesantren Al Fauziah dengan bangga mengumumkan pembukaan pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027. Pada gelombang pertama ini, tersedia kuota terbatas untuk calon santriwan dan santriwati.\n\nKeunggulan mendaftar di Gelombang 1 meliputi keringanan infaq pangkal, prioritas pemilihan asrama, serta keikutsertaan dalam kegiatan matrikulasi awal. Pendaftaran dapat dilakukan secara online melalui halaman PPDB atau langsung datang ke sekretariat pesantren di Bogor.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "wisuda-tahfizh-30-juz-hantar-puluhan-hafidz",
    title: "Wisuda Tahfizh 30 Juz: Lahirkan Puluhan Hafizh & Hafidzah Ber-Sanad",
    category: "Prestasi",
    date: "15 Desember 2025",
    author: "Divisi Tahfizh",
    excerpt: "Suasana haru dan bangga menyelimuti aula pesantren saat puluhan santri dikukuhkan sebagai hafizh Al-Qur'an 30 juz.",
    content: "Sebanyak 45 santri program Takhasus Tahfizh sukses menyelesaikan setoran mutqin 30 juz dan diuji di hadapan para dewan masayikh. Acara wisuda akbar ini dihadiri oleh wali santri serta tokoh ulama setempat.\n\nPengasuh Pesantren, KH. Ahmad Fauzi, M.Ag, berpesan agar para wisudawan senantiasa menjaga hafalan dan mengamalkan nilai-nilai Al-Qur'an dalam kehidupan sehari-hari.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "studi-banding-teknologi-dan-sains-santri-ma",
    title: "Kembangkan Kompetensi IT, Santri MA Ikuti Pelatihan Coding & AI Dasar",
    category: "Akademik",
    date: "10 Januari 2026",
    author: "Tim Kurikulum",
    excerpt: "Bekali santri menghadapi era digital, pondok pesantren menyelenggarakan workshop pengembangan web dan pengenalan kecerdasan buatan.",
    content: "Sebagai bentuk komitmen memadukan ilmu agama dan teknologi modern, santri tingkat Madrasah Aliyah (MA) mengikuti pelatihan intensif pemrograman dasar.\n\nKegiatan ini bertujuan agar lulusan Al Fauziah tidak hanya menguasai kitab turats, tetapi juga adaptif terhadap perkembangan teknologi global masa kini.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
  }
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = NEWS_DATA.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0F5E4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#D4AF37] text-[#0F5E4A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Informasi & Artikel
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-4 mb-3">
            Berita & Kegiatan Pesantren
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Ikuti perkembangan terbaru, agenda kegiatan, pengumuman resmi, dan artikel inspiratif dari Pondok Pesantren Al Fauziah.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berita atau kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#0F5E4A] shadow-sm"
          />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <article
              key={news.slug}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#D4AF37] text-[#0F5E4A] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {news.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {news.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {news.author}</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                    {news.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/news/${news.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0F5E4A] dark:text-emerald-400 hover:underline"
                >
                  Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}