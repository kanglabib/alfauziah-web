'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // State Form Berita
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Berita');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();

  // Fetch daftar berita
  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setUser(session.user);
        await fetchPosts();
      }
      setLoading(false);
    };

    checkAuth();
  }, [router, fetchPosts]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Berita');
    setExcerpt('');
    setContent('');
    setImageFile(null);
    setCurrentImageUrl(null);
    setEditingId(null);
  };

  // Mulai Edit
  const handleEditClick = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setExcerpt(post.excerpt || '');
    setContent(post.content);
    setCurrentImageUrl(post.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hapus Berita
  const handleDeletePost = async (id: string) => {
    if (!confirm('Apakah kamu yakin ingin menghapus berita ini?')) return;

    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;

      setMessage({ type: 'success', text: 'Berita berhasil dihapus.' });
      if (editingId === id) resetForm();
      fetchPosts();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus berita.';
      setMessage({ type: 'error', text: errorMessage });
    }
  };

  // Submit Form (Tambah / Update)
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      let finalImageUrl = currentImageUrl || '';

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

        finalImageUrl = publicUrlData.publicUrl;
      }

      if (editingId) {
        // UPDATE BERITA
        const { error } = await supabase
          .from('posts')
          .update({
            title,
            category,
            excerpt,
            content,
            image_url: finalImageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
        setMessage({ type: 'success', text: 'Berita berhasil diperbarui!' });
      } else {
        // TAMBAH BERITA BARU
        const slug =
          title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '') + `-${Date.now()}`;

        const { error } = await supabase.from('posts').insert([
          {
            title,
            slug,
            category,
            excerpt,
            content,
            image_url: finalImageUrl,
            author: user?.email || 'Admin Pesantren',
          },
        ]);

        if (error) throw error;
        setMessage({ type: 'success', text: 'Berita berhasil diterbitkan!' });
      }

      resetForm();
      fetchPosts();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menyimpan berita.';
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

      <main className="max-w-5xl mx-auto py-8 px-4 space-y-8">
        {/* FORM INPUT / EDIT */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition"
              >
                Batal Edit
              </button>
            )}
          </div>

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

          <form onSubmit={handleSavePost} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Foto Sampul (Opsional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Isi Berita</label>
              <textarea
                rows={6}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg transition disabled:opacity-50"
            >
              {isSubmitting
                ? 'Menyimpan...'
                : editingId
                ? 'Update Berita'
                : 'Terbitkan Berita'}
            </button>
          </form>
        </div>

        {/* DAFTAR BERITA SAYA */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Daftar Berita Diterbitkan</h3>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-sm">Belum ada berita yang diterbitkan.</p>
          ) : (
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                      {post.category}
                    </span>
                    <h4 className="font-semibold text-gray-900 mt-1">{post.title}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(post)}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}