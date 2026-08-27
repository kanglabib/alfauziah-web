'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, X, Filter } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'kegiatan' | 'fasilitas' | 'prestasi';
  imageUrl: string;
  caption: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    title: "Setoran Hafalan Subuh",
    category: "kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80",
    caption: "Santri takhasus melaksanakan talaqqi dan setoran hafalan rutin di Masjid Utama."
  },
  {
    id: 2,
    title: "Gedung Asrama Modern",
    category: "fasilitas",
    imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80",
    caption: "Fasilitas kamar asrama yang bersih, nyaman, dan kondusif untuk istirahat santri."
  },
  {
    id: 3,
    title: "Juara 1 Musabaqah Hifzhil Qur'an",
    category: "prestasi",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    caption: "Penyerahan piala dan sertifikat penghargaan tingkat nasional."
  },
  {
    id: 4,
    title: "Laboratorium Komputer & Sains",
    category: "fasilitas",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    caption: "Praktikum IT dan Sains terpadu untuk menunjang kompetensi teknologi santri."
  },
  {
    id: 5,
    title: "Kajian Kitab Turats (Kuning)",
    category: "kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    caption: "Pengajian kitab kuning bersama Pengasuh Pesantren ba'da Maghrib."
  },
  {
    id: 6,
    title: "Latihan Tapak Suci & Beladiri",
    category: "kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80",
    caption: "Kegiatan ekstrakurikuler pembentukan karakter dan olah fisik santri."
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'semua'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === activeCategory);

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0F5E4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#D4AF37] text-[#0F5E4A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Dokumentasi & Album
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-4 mb-3">
            Galeri Pesantren Al Fauziah
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Merekam momen kebersamaan, ragam kegiatan, fasilitas unggulan, dan deretan prestasi santri.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs text-gray-400 font-medium flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { id: 'semua', label: 'Semua Foto' },
            { id: 'kegiatan', label: 'Kegiatan Santri' },
            { id: 'fasilitas', label: 'Fasilitas' },
            { id: 'prestasi', label: 'Prestasi' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveCategory(btn.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === btn.id
                  ? 'bg-[#0F5E4A] text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                    <ImageIcon className="w-4 h-4 text-[#D4AF37]" /> Liha Detail
                  </span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] overflow-hidden">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase text-[#D4AF37]">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {selectedImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}