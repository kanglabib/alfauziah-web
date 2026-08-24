import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F5E4A] text-white pt-16 pb-8 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <div>
          <h3 className="font-serif font-bold text-2xl mb-4 text-[#D4AF37]">AL FAUZIAH</h3>
          <p className="text-sm text-gray-200 leading-relaxed">
            Membentuk generasi unggul berlandaskan al-Qur'an dan as-Sunnah serta siap menghadapi tantangan dunia global.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[#D4AF37]">Navigasi</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/about" className="hover:underline">Tentang Kami</Link></li>
            <li><Link href="/program" className="hover:underline">Program Pendidikan</Link></li>
            <li><Link href="/ppdb" className="hover:underline">Pendaftaran PPDB</Link></li>
            <li><Link href="/news" className="hover:underline">Warta & Berita</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[#D4AF37]">Layanan</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/login" className="hover:underline">Portal Santri & Wali</Link></li>
            <li><Link href="/donation" className="hover:underline">Infaq & Sedekah</Link></li>
            <li><Link href="/gallery" className="hover:underline">Galeri Kegiatan</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[#D4AF37]">Kontak</h4>
          <p className="text-sm text-gray-200 leading-relaxed">
            Jl. Pesantren No. 1, Bogor, Jawa Barat<br />
            Email: info@alfauziah.sch.id<br />
            Telp: +62 812-3456-7890
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 text-center text-xs text-gray-300">
        © 2026 Pondok Pesantren Al Fauziah. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}