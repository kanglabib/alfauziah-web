'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

// --- Interfaces ---
interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

interface Registration {
  id: string;
  full_name: string;
  gender: string;
  nisn: string;
  birth_place: string;
  birth_date: string;
  previous_school: string;
  parent_name: string;
  whatsapp_number: string;
  address: string;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'ppdb'>('posts');

  // --- State Kelola Berita ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Berita');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // --- State PPDB ---
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const router = useRouter();

  // --- Data Fetching ---
  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  }, []);

  const fetchRegistrations = useCallback(async () => {
    const { data, error } = await supabase
      .from('ppdb_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRegistrations(data);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setUser(session.user);
        await Promise.all([fetchPosts(), fetchRegistrations()]);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router, fetchPosts, fetchRegistrations]);

  // --- Auth Handlers ---
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // --- Berita Handlers ---
  const resetForm = () => {
    setTitle('');
    setCategory('Berita');
    setExcerpt('');
    setContent('');
    setImageFile(null);
    setCurrentImageUrl(null);
    setEditingId(null);
  };

  const handleEditClick = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setExcerpt(post.excerpt || '');
    setContent(post.content);
    setCurrentImageUrl(post.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // --- PPDB Handlers ---
  const handleStatusChange = async (id: string, newStatus: string) => {
    await supabase.from('ppdb_registrations').update({ status: newStatus }).eq('id', id);
    fetchRegistrations();
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!confirm('Hapus data pendaftar ini?')) return;
    await supabase.from('ppdb_registrations').delete().eq('id', id);
    fetchRegistrations();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memeriksa sesi login & memuat data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* SIDEBAR / NAVIGATION */}
      <aside className="w-full md:w-64 bg-emerald-900 text-white flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-emerald-800">
            <h1 className="text-xl font-bold">Admin Pesantren</h1>
            <p className="text-xs text-emerald-300 mt-1 truncate">{user?.email}</p>
          </div>

          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('posts')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'posts'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-100 hover:bg-emerald-800'
              }`}
            >
              <span>Kelola Berita</span>
              <span className="bg-emerald-950 px-2 py-0.5 rounded-full text-xs">
                {posts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ppdb')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'ppdb'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-100 hover:bg-emerald-800'
              }`}
            >
              <span>Pendaftaran PPDB</span>
              <span className="bg-emerald-950 px-2 py-0.5 rounded-full text-xs">
                {registrations.length}
              </span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-emerald-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto p-4 md:p-8 space-y-8 w-full">
        {/* --- TAB KELOLA BERITA --- */}
        {activeTab === 'posts' && (
          <div className="space-y-8">
            {/* FORM INPUT / EDIT BERITA */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Berita
                  </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
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

            {/* DAFTAR BERITA */}
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
          </div>
        )}

        {/* --- TAB PPDB --- */}
        {activeTab === 'ppdb' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Data Pendaftar PPDB Online
              </h2>
              <span className="text-sm bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
                Total: {registrations.length} Santri
              </span>
            </div>

            {registrations.length === 0 ? (
              <p className="text-gray-500 text-sm">Belum ada pendaftaran masuk.</p>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-700">
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Nama Santri</th>
                    <th className="p-3">JK</th>
                    <th className="p-3">Asal Sekolah</th>
                    <th className="p-3">Orang Tua / Wali</th>
                    <th className="p-3">WhatsApp</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="p-3 text-xs text-gray-500">
                        {new Date(reg.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="p-3 font-semibold text-gray-900">{reg.full_name}</td>
                      <td className="p-3">{reg.gender}</td>
                      <td className="p-3">{reg.previous_school}</td>
                      <td className="p-3">{reg.parent_name}</td>
                      <td className="p-3">
                        <a
                          href={`https://wa.me/${reg.whatsapp_number.replace(/^0/, '62')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:underline font-medium"
                        >
                          {reg.whatsapp_number}
                        </a>
                      </td>
                      <td className="p-3">
                        <select
                          value={reg.status}
                          onChange={(e) => handleStatusChange(reg.id, e.target.value)}
                          className="px-2 py-1 text-xs rounded border border-gray-300 outline-none bg-white"
                        >
                          <option value="Menunggu Verifikasi">Menunggu</option>
                          <option value="Lolos Seleksi">Lolos</option>
                          <option value="Ditolak">Ditolak</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteRegistration(reg.id)}
                          className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
}