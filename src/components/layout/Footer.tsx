import Link from "next/link";
import { Instagram, Youtube, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F5E4A] text-white pt-16 pb-8 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        
        {/* Kolom 1: Profil & Sosial Media */}
        <div>
          <h3 className="font-serif font-bold text-2xl mb-4 text-[#D4AF37]">AL FAUZIAH</h3>
          <p className="text-sm text-gray-200 leading-relaxed mb-6">
            Membentuk generasi unggul berlandaskan al-Qur'an dan as-Sunnah serta siap menghadapi tantangan dunia global.
          </p>

          {/* Tombol Media Sosial */}
          <div className="flex items-center space-x-3">
            <a
              href="https://instagram.com/alfauziahofficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F5E4A] rounded-full text-white transition-all duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@alfauziah" // Ganti sesuai channel YouTube pondok
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2 bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F5E4A] rounded-full text-white transition-all duration-200"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/alfauziah" // Ganti sesuai akun Facebook pondok
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F5E4A] rounded-full text-white transition-all duration-200"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/6285849468473"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F5E4A] rounded-full text-white transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Kolom 2: Navigasi */}
        <div>
          <h4 className="font-semibold mb-4 text-[#D4AF37]">Navigasi</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/about" className="hover:underline hover:text-[#D4AF37] transition-colors">Tentang Kami</Link></li>
            <li><Link href="/program" className="hover:underline hover:text-[#D4AF37] transition-colors">Program Pendidikan</Link></li>
            <li><Link href="/ppdb" className="hover:underline hover:text-[#D4AF37] transition-colors">Pendaftaran PPDB</Link></li>
            <li><Link href="/news" className="hover:underline hover:text-[#D4AF37] transition-colors">Warta & Berita</Link></li>
          </ul>
        </div>

        {/* Kolom 3: Layanan */}
        <div>
          <h4 className="font-semibold mb-4 text-[#D4AF37]">Layanan</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/login" className="hover:underline hover:text-[#D4AF37] transition-colors">Portal Santri & Wali</Link></li>
            <li><Link href="/donation" className="hover:underline hover:text-[#D4AF37] transition-colors">Infaq & Sedekah</Link></li>
            <li><Link href="/gallery" className="hover:underline hover:text-[#D4AF37] transition-colors">Galeri Kegiatan</Link></li>
          </ul>
        </div>

        {/* Kolom 4: Kontak */}
        <div>
          <h4 className="font-semibold mb-4 text-[#D4AF37]">Kontak</h4>
          <p className="text-sm text-gray-200 leading-relaxed">
            Jl. H. Miing, RT.003/RW.003, Mekarsari, Kec. Ranca Bungur, Kabupaten Bogor, Jawa Barat 16310<br />
            Email: info@alfauziah.sch.id<br />
            Telp: +62 858-4946-8473
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} Pondok Pesantren Al Fauziah. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}