export default function NewsSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111111] mb-12 text-center">Berita & Artikel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <article key={n} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400">[ Gambar Berita ]</div>
            <div className="p-6">
              <span className="text-xs text-[#0F5E4A] font-semibold">18 Agustus 2026</span>
              <h3 className="font-serif font-bold text-lg mt-2 mb-2">Kegiatan Wisuda Tahfizh Al-Qur'an Angkatan VII</h3>
              <p className="text-xs text-gray-600">Pelaksanaan wisuda berjalan khidmat dihadiri para ulama dan wali santri...</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}