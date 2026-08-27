'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { 
  FileText, 
  Users, 
  LogOut, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  XCircle, 
  ExternalLink,
  Search,
  LayoutDashboard
} from 'lucide-react';

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

  // Berita State
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

  // PPDB State
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setPosts(data);
  }, []);

  const fetchRegistrations = useCallback(async () => {
    const { data, error } = await supabase
      .from('ppdb_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setRegistrations(data);
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    await supabase.from('ppdb_registrations').update({ status: newStatus }).eq('id', id);
    fetchRegistrations();
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!confirm('Hapus data pendaftar ini?')) return;
    await supabase.from('ppdb_registrations').delete().eq('id', id);
    fetchRegistrations();
  };

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.previous_school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm tracking-wide text-emerald-200">Memuat Portal Administrasi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* SIDEBAR PANEL */}
      <aside className="w-full md:w-72 bg-[#0F5E4A] text-white flex flex-col justify-between shrink-0 shadow-xl border-r border-emerald-900/50">
        <div>
          {/* Header Dashboard */}
          <div className="p-6 border-b border-emerald-800/60 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <LayoutDashboard className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide leading-tight">Admin Portal</h1>
              <p className="text-xs text-emerald-200/80 font-mono mt-0.5 truncate max-w-[160px]">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab('posts')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'posts'
                  ? 'bg-emerald-800/90 text-white shadow-md border border-emerald-700/50'
                  : 'text-emerald-100/70 hover:bg-emerald-800/40 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>Kelola Berita</span>
              </div>
              <span className="bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                {posts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ppdb')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'ppdb'
                  ? 'bg-emerald-800/90 text-white shadow-md border border-emerald-700/50'
                  : 'text-emerald-100/70 hover:bg-emerald-800/40 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>Pendaftaran PPDB</span>
              </div>
              <span className="bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                {registrations.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-emerald-800/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-200 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold border border-red-500/20 hover:border-transparent transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-h-screen">
        
        {/* TAB 1: KELOLA BERITA */}
        {activeTab === 'posts' && (
          <div className="max-w-6xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Manajemen Berita & Informasi</h2>
                <p className="text-sm text-slate-500 mt-1">Publikasikan kabar terbaru kegiatan santri dan pesantren.</p>
              </div>
            </div>

            {/* FORM INPUT / EDIT */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#0F5E4A]" />
                  {editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                </h3>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    Batal Edit
                  </button>
                )}
              </div>

              {message && (
                <div
                  className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-3 ${
                    message.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border border-rose-200 text-rose-800'
                  }`}
                >
                  {message.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> : <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSavePost} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Judul Artikel
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan judul artikel yang informatif..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0F5E4A] outline-none text-sm transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Kategori
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0F5E4A] outline-none text-sm transition"
                    >
                      <option value="Berita">Berita Utama</option>
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Kegiatan">Kegiatan Santri</option>
                      <option value="Prestasi">Prestasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Gambar Sampul (Opsional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-[#0F5E4A] hover:file:bg-emerald-100 border border-slate-200 rounded-xl cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Ringkasan Singkat (Excerpt)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tulis ringkasan singkat 1-2 kalimat..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0F5E4A] outline-none text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Isi Lengkap Artikel
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tulis konten lengkap artikel di sini..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0F5E4A] outline-none text-sm transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#0F5E4A] hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-sm transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Proses Menyimpan...' : editingId ? 'Perbarui Berita' : 'Terbitkan Berita'}
                </button>
              </form>
            </div>

            {/* TABLE LIST BERITA */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Daftar Berita Diterbitkan</h3>

              {posts.length === 0 ? (
                <p className="text-slate-400 text-sm italic">Belum ada berita yang tersimpan.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {posts.map((post) => (
                    <div key={post.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {post.image_url && (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                            <Image src={post.image_url} alt="" fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-[#0F5E4A] rounded-full uppercase tracking-wide">
                            {post.category}
                          </span>
                          <h4 className="font-semibold text-slate-800 text-sm mt-1">{post.title}</h4>
                          <p className="text-xs text-slate-400 mt-1">
                            {new Date(post.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleEditClick(post)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold rounded-lg transition border border-amber-200 flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg transition border border-rose-200 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DATA PPDB */}
        {activeTab === 'ppdb' && (
          <div className="max-w-6xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Data Pendaftar PPDB Online</h2>
                <p className="text-sm text-slate-500 mt-1">Kelola data calon santri baru Pondok Pesantren Al Fauziah.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama / asal sekolah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0F5E4A] outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
                      <th className="p-4">Tanggal</th>
                      <th className="p-4">Nama Santri</th>
                      <th className="p-4">JK</th>
                      <th className="p-4">Asal Sekolah</th>
                      <th className="p-4">Orang Tua / Wali</th>
                      <th className="p-4">WhatsApp</th>
                      <th className="p-4">Status Seleksi</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          Data pendaftaran tidak ditemukan.
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-4 text-slate-400 font-mono">
                            {new Date(reg.created_at).toLocaleDateString('id-ID')}
                          </td>
                          <td className="p-4 font-bold text-slate-800">{reg.full_name}</td>
                          <td className="p-4 text-slate-600">{reg.gender}</td>
                          <td className="p-4 text-slate-600">{reg.previous_school}</td>
                          <td className="p-4 text-slate-600">{reg.parent_name}</td>
                          <td className="p-4">
                            <a
                              href={`https://wa.me/${reg.whatsapp_number.replace(/^0/, '62')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[#0F5E4A] hover:underline font-semibold"
                            >
                              <span>{reg.whatsapp_number}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                          <td className="p-4">
                            <select
                              value={reg.status}
                              onChange={(e) => handleStatusChange(reg.id, e.target.value)}
                              className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-[#0F5E4A]"
                            >
                              <option value="Menunggu Verifikasi">Menunggu</option>
                              <option value="Lolos Seleksi">Lolos</option>
                              <option value="Ditolak">Ditolak</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteRegistration(reg.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Hapus Data"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}