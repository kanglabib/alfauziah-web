'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, Award, GraduationCap, CheckCircle2, ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';

// Data Detail Masing-Masing Program + Galeri Foto
const PROGRAM_DATA: Record<string, {
  title: string;
  badge: string;
  desc: string;
  icon: React.ReactNode;
  overview: string;
  features: string[];
  gallery: { title: string; image: string }[];
}> = {
  tahfizh: {
    title: "Takhasus Tahfizh Al-Qur'an",
    badge: "Program Unggulan",
    desc: "Program intensif penghafalan Al-Qur'an 30 Juz dengan standar tajwid sanad, bimbingan muroja'ah ketat, dan pemahaman makna.",
    icon: <BookOpen className="w-10 h-10 text-[#D4AF37]" />,
    overview: "Program Takhasus Tahfizh dirancang khusus bagi santri yang ingin berfokus penuh menghafal Al-Qur'an. Metode pembelajaran menggunakan sistem Talaqqi dan Muroja'ah bertingkat, didampingi oleh para Asatidzah Al-Hafizh ber-sanad.",
    features: [
      "Target Hafalan 30 Juz Mutqin dalam 3 Tahun",
      "Setoran Rutin 2 Kali Sehari (Ba'da Subuh & Ba'da Ashar)",
      "Ujian Marhalah / Kenaikan Juz Setiap Kelipatan 5 Juz",
      "Kajian Tafsir Jalalain & Matan Tajwid (Jazariyyah)",
      "Wisuda Khotmil Qur'an & Ijazah Sanad bagi yang Memenuhi Syarat"
    ],
    gallery: [
      { title: "Setoran Talaqqi Bersama Ustadz", image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80" },
      { title: "Muroja me Bersama di Masjid", image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80" },
      { title: "Ujian Tasmi' 30 Juz Sima'an", image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80" },
    ]
  },
  mts: {
    title: "Madrasah Tsanawiyah (MTs)",
    badge: "Akreditasi A",
    desc: "Pendidikan formal tingkat pertama yang memadukan Kurikulum Merdeka Kemenag dengan penguatan Bahasa Asing & Dasar Kitab Kuning.",
    icon: <GraduationCap className="w-10 h-10 text-[#D4AF37]" />,
    overview: "Jenjang MTs Al Fauziah menyiapkan santri agar seimbang antara ilmu pengetahuan umum (Sains/Matematika) dan dasar-dasar keislaman. Santri dibiasakan berkomunikasi dalam Bahasa Arab dan Inggris dalam aktivitas harian.",
    features: [
      "Kurikulum Terpadu Kemenag & Kepesantrenan",
      "Program Bilingual Daily Life (Arab & Inggris)",
      "Laboratorium Komputer & Praktikum IPA Terpadu",
      "Ekstrakurikuler Wajib: Pramuka, Tapak Suci, & Kaligrafi",
      "Bimbingan Kompetensi Sains Madrasah (KSM)"
    ],
    gallery: [
      { title: "KBM Interaktif di Kelas Modern", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" },
      { title: "Praktikum Sains di Laboratorium", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80" },
      { title: "Kegiatan Ekstrakurikuler Santri", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" },
    ]
  },
  ma: {
    title: "Madrasah Aliyah (MA)",
    badge: "Persiapan PTN & Luar Negeri",
    desc: "Pendidikan tingkat atas dengan pendalaman Kitab Turats, Riset Sains, serta Persiapan Kelanjutan Studi ke PTN & Perguruan Tinggi Timur Tengah.",
    icon: <Award className="w-10 h-10 text-[#D4AF37]" />,
    overview: "Jenjang MA Al Fauziah mencetak lulusan berskala global. Selain penguasaan kitab-kitab lanjutan (Fiqh, Nahwu, Sorof, Balaghoh), santri dibimbing secara intensif untuk menembus seleksi Universitas Negeri maupun Beasiswa Luar Negeri.",
    features: [
      "Peminatan Matematika & IPA (MIPA) serta Keagamaan (IIK)",
      "Pendalaman Kitab Turats Standar Universitas Al-Azhar",
      "Bimbingan Khusus UTBK-SNBT & Tryout Perguruan Tinggi",
      "Pelatihan Kepemimpinan & Entrepreneurship Santri",
      "Program Matrikulasi Bahasa Arab & TOEFL/IELTS"
    ],
    gallery: [
      { title: "Kajian Kitab Kuning / Bandongan", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80" },
      { title: "Diskusi & Forum Debat Bahasa Arab", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" },
      { title: "Wisuda & Pelepasan Kelulusan MA", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" },
    ]
  }
};

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const data = PROGRAM_DATA[slug];

  if (!data) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Program Tidak Ditemukan</h1>
        <Link href="/program" className="mt-4 inline-block text-[#0F5E4A] font-bold">
          ← Kembali ke Semua Program
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Top Banner */}
      <section className="bg-[#0F5E4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/program"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Program
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="bg-[#D4AF37] text-[#0F5E4A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {data.badge}
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-3">
                {data.title}
              </h1>
              <p className="text-white/80 max-w-2xl mt-2 text-sm sm:text-base">
                {data.desc}
              </p>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
              {data.icon}
            </div>
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Gambaran Umum & Kurikulum */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              Gambaran Program
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {data.overview}
            </p>
            <Link
              href="/ppdb"
              className="mt-6 block text-center py-3 px-4 bg-[#0F5E4A] text-white font-semibold text-xs rounded-xl hover:bg-[#0F5E4A]/90 transition-all shadow-sm"
            >
              Daftar Program Ini di PPDB
            </Link>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Keunggulan & Kurikulum Utama
            </h2>
            <div className="space-y-3">
              {data.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                  <CheckCircle2 className="w-5 h-5 text-[#0F5E4A] dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Galeri Foto Kegiatan Program */}
        <section className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="w-5 h-5 text-[#0F5E4A] dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Galeri Dokumentasi Kegiatan {data.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.gallery.map((item, idx) => (
              <div key={idx} className="group overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 text-center">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}