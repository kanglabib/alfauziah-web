import Link from "next";
import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0F5E4A]">Tentang Kami</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0F5E4A] mt-2 mb-4">
            Warisan Ilmu, <span className="italic font-normal text-[#D4AF37]">Masa Depan Cemerlang</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Pondok Pesantren Al Fauziah berkomitmen melahirkan santri berpikiran terbuka tanpa kehilangan jati diri keislaman.
          </p>
        </div>

        {/* Two Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#0F5E4A] text-white p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Visi Utama</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mt-4 mb-4">
                Mencetak Generasi Berprestasi Yang Berakhlak Qur’ani.
              </h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Sebuah komitmen untuk membentuk peserta didik yang unggul dalam prestasi, berkarakter mulia, serta menjadikan nilai-nilai Al-Qur’an sebagai pedoman dalam berpikir, bersikap, dan bertindak.
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 p-10 rounded-3xl flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#0F5E4A] font-semibold">Misi Kami</span>
              <ul className="space-y-4 mt-6">
                {[
                  "Membentuk siswa yang berakhlakul karimah, berdisiplin dan mandiri.",
                  "Menerapkan tutur kata yang santun di setiap proses pembelajaran.",
                  "Mengintegrasikan sikap religius ke dalam materi pembelajaran.",
                  "Mendidik siswa untuk sabar dan istiqomah dalam berbuat kebaikan.",
                ].map((misi, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#0F5E4A] shrink-0 mt-0.5" />
                    <span>{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Founder / Leader Highlight */}
        <div className="bg-white border border-gray-200/60 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-28 h-28 rounded-full bg-[#0F5E4A]/10 border-2 border-[#D4AF37] shrink-0 overflow-hidden flex items-center justify-center font-serif text-2xl font-bold text-[#0F5E4A]">
            KH
          </div>
          <div>
            <p className="italic text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              "Pendidikan pesantren bukan hanya tentang mentransfer ilmu pengetahuan, melainkan menanamkan nilai-nilai hidup yang akan menuntun santri sepanjang hayat mereka."
            </p>
            <h4 className="font-serif font-bold text-[#0F5E4A] text-lg">KH. Khadziq Sahal, Lc.</h4>
            <p className="text-xs text-gray-500">Pengasuh Pondok Pesantren Al Fauziah</p>
          </div>
        </div>
      </div>
    </section>
  );
}