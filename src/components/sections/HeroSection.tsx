import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0F5E4A] text-white pt-28 pb-16 px-6 flex flex-col justify-between overflow-hidden">
      {/* Background Overlay Masjid */}
      <div 
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop')` }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10 pt-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest mb-6">
          Pondok Pesantren Al Fauziah
        </span>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Membentuk Generasi <span className="text-[#D4AF37] italic font-normal">Berilmu</span>, <br />
          Berakhlak, dan <span className="text-[#D4AF37]">Berdaya Saing Global</span>
        </h1>
        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Memadukan kemurnian turats Islam klasik dengan keunggulan kurikulum sains, teknologi modern, dan kepemimpinan global.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link href="/about" className="bg-white text-[#0F5E4A] px-8 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-all">
            Tentang Kami
          </Link>
          <Link href="/ppdb" className="bg-[#D4AF37] text-[#0F5E4A] px-8 py-3.5 rounded-full font-semibold hover:bg-yellow-400 transition-all shadow-lg">
            Daftar PPDB
          </Link>
        </div>
      </div>

      {/* Glassmorphism Statistics Cards */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {[
          { num: "30+", label: "Tahun Pengabdian" },
          { num: "500+", label: "Santri Aktif" },
          { num: "50+", label: "Ustadz & Pengajar" },
          { num: "1000+", label: "Alumni Tersebar" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#D4AF37]">{stat.num}</h3>
            <p className="text-xs md:text-sm text-white/80 mt-1 font-light">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}