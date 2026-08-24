'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { NEWS_DATA } from '../page';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = NEWS_DATA.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Artikel Tidak Ditemukan</h1>
        <Link href="/news" className="mt-4 inline-block text-[#0F5E4A] font-bold">
          ← Kembali ke Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F5E4A] dark:text-emerald-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Berita
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#D4AF37] text-[#0F5E4A] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pb-6 border-b border-gray-100 dark:border-gray-700 mb-6">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#D4AF37]" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#D4AF37]" /> {article.author}</span>
          </div>

          <div className="rounded-2xl overflow-hidden mb-8 h-72 sm:h-96">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span className="text-xs text-gray-400">Bagikan informasi ini ke kerabat</span>
            <button
              onClick={() => alert('Tautan berhasil disalin!')}
              className="px-4 py-2 bg-[#0F5E4A]/10 text-[#0F5E4A] dark:text-emerald-400 font-semibold text-xs rounded-xl hover:bg-[#0F5E4A]/20 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" /> Salin Tautan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}