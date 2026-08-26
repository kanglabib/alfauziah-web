'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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

export default function AdminPPDBPage() {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const router = useRouter();

  const fetchRegistrations = useCallback(async () => {
    const { data, error } = await supabase
      .from('ppdb_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRegistrations(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        await fetchRegistrations();
      }
    };

    checkAuth();
  }, [router, fetchRegistrations]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await supabase.from('ppdb_registrations').update({ status: newStatus }).eq('id', id);
    fetchRegistrations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus data pendaftar ini?')) return;
    await supabase.from('ppdb_registrations').delete().eq('id', id);
    fetchRegistrations();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat data pendaftar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-emerald-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Data Pendaftar PPDB Online</h1>
        <div className="flex gap-4">
          <Link href="/admin/dashboard" className="text-sm bg-emerald-800 hover:bg-emerald-700 px-3 py-1.5 rounded transition">
            Kelola Berita
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Total Pendaftar: {registrations.length} Santri
            </h2>
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
                        onClick={() => handleDelete(reg.id)}
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
      </main>
    </div>
  );
}