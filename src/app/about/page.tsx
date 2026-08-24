'use client';

import React from 'react';
import { Target, Compass, Award, Users, BookOpen, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <BookOpen className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Kemurnian Turats',
      desc: 'Mendalami kitab-kitab kuning klasik karya ulama mu’tabar sebagai fondasi keilmuan Islam.',
    },
    {
      icon: <Target className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Keunggulan Sains',
      desc: 'Mengintegrasikan kurikulum sains dan teknologi modern untuk mencetak santri yang adaptif.',
    },
    {
      icon: <Heart className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Akhlakul Karimah',
      desc: 'Menanamkan adab, kesederhanaan, dan karakter kedisiplinan dalam kehidupan sehari-hari.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Kepemimpinan Global',
      desc: 'Membekali penguasaan bahasa Arab dan Inggris untuk menyiapkan calon pemimpin masa depan.',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0F5E4A] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#D4AF37] text-[#0F5E4A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Profil Pesantren
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-4 mb-3">
            Mengenal Lebih Dekat Al Fauziah
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Lembaga pendidikan Islam modern yang berkomitmen mencetak generasi qur'ani, berakhlaqul karimah, dan berdaya saing global.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Sejarah / About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Sejarah Singkat & Dedikasi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              Pondok Pesantren Al Fauziah didirikan sebagai ikhtiar melahirkan generasi mukmin yang kokoh secara spiritual dan cemerlang secara intelektual. Berawal dari majelis ilmu sederhana, kini Al Fauziah berkembang menjadi pusat pendidikan terpadu.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              Kami memadukan sistem pesantren tradisional (*salaf*) yang kaya akan pendalaman kitab turats dengan kurikulum nasional dan pengembangan kompetensi digital abad 21.
            </p>
          </div>
          <div className="bg-[#0F5E4A]/5 dark:bg-gray-800 p-8 rounded-3xl border border-[#0F5E4A]/10 text-center">
            <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0F5E4A] font-serif font-bold text-2xl shadow-md">
              AF
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pondok Pesantren Al Fauziah</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Bogor, Jawa Barat</p>
          </div>
        </div>

        {/* Visi & Misi */}
        <section id="vision" className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 text-[#0F5E4A] dark:text-emerald-400 font-bold mb-2">
                <Compass className="w-5 h-5" />
                <span>Arah Langkah</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Visi & Misi Kami</h2>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase text-[#D4AF37] tracking-wider mb-1">Visi</h3>
                <p className="text-gray-700 dark:text-gray-200 text-base font-medium">
                  "Menjadi lembaga pendidikan Islam unggulan dalam melahirkan huffazh Al-Qur'an yang berjiwa pemimpin dan berwawasan teknologi."
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase text-[#D4AF37] tracking-wider mb-2">Misi</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Menyelenggarakan tahfizh Al-Qur'an dengan target sanad dan pemahaman makna.</li>
                  <li>Mengintegrasikan pendidikan karakter berbasis adab Islamiyyah.</li>
                  <li>Menerapkan kurikulum sains, matematika, dan teknologi terintegrasi.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Nilai Utama */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Pilar Utama Pendidikan</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Prinsip yang menjiwai setiap pembelajaran di Al Fauziah</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="mb-4">{v.icon}</div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pimpinan / Pengasuh */}
        <section id="founder" className="bg-[#0F5E4A] text-white p-8 sm:p-12 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <Users className="w-16 h-16 text-[#D4AF37]" />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Pengasuh Pesantren</span>
              <h3 className="text-2xl font-serif font-bold">KH. Khadziq Sahal, Lc.</h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                "Pendidikan pesantren bukan hanya tentang mentransfer pengetahuan, tetapi menanamkan nilai-nilai keimanan, keteladanan, dan tanggung jawab sosial agar santri mampu menjadi penerang di mana pun berada."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}