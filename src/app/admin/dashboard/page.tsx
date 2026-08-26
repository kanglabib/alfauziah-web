'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // State Form Berita
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Berita');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      let imageUrl = '';

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        const filePath = `berita/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('berita-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('berita-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const slug =
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '') + `-${Date.now()}`;

      const { error: insertError } = await supabase.from('posts').insert([
        {
          title,
          slug,
          category,
          excerpt,
          content,
          image_url: imageUrl,
          author: user?.email || 'Admin Pesantren',
        },
      ]);

      if (insertError) throw insertError;

      setMessage({ type: 'success', text: 'Berita berhasil diterbitkan!' });
      setTitle('');
      setExcerpt('');
      setContent('');
      setImageFile(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menerbitkan berita.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memeriksa sesi login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-emerald-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Dashboard Admin Pesantren</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-emerald-200">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tambah Berita Baru</h2>

          {message && (
            <div
              className={`p-4 rounded-lg mb-6 text-sm ${
                message.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleCreatePost} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Berita / Pengumuman
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Misal: Penerimaan Santri Baru Tahun Ajaran 2025/2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              >
                <option value="Berita">Berita</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Kegiatan">Kegiatan Santri</option>
                <option value="Prestasi">Prestasi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto Sampul / Gambar Berita
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ringkasan Singkat (Excerpt)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Ringkasan 1-2 kalimat untuk tampil di kartu halaman depan..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Isi Berita Lengkap
              </label>
              <textarea
                rows={8}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Tuliskan isi artikel berita lengkap di sini..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg transition disabled:opacity-50"
            >
              {isSubmitting ? 'Menerbitkan...' : 'Terbitkan Berita'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}