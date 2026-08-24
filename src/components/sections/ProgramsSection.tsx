import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProgramsSection() {
  const programs = [
    { title: "Tahfizh Al-Qur'an", tag: "Unggulan", desc: "Program intensif target 30 juz mutqin berstandar sanad.", img: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=600&auto=format&fit=crop" },
    { title: "Madrasah Tsanawiyah", tag: "MTs", desc: "Pendidikan menengah pertama terpadu kurikulum Kemenag dan Pesantren.", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop" },
    { title: "Madrasah Aliyah", tag: "MA", desc: "Peminatan IPA, IPS, dan Keagamaan dengan persiapan kampus luar negeri.", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" },
    { title: "Kajian Kitab Kuning", tag: "Turats", desc: "Pendalaman fikih, nahwu sharaf, dan tafsir klasik terstruktur.", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop" },
    { title: "Bahasa Asing Intensif", tag: "Language", desc: "Program dwibahasa harian Arab & Inggris aktif.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" },
    { title: "Sains & Robotik", tag: "Teknologi", desc: "Pengembangan bakat pemrograman, matematika, dan sains modern.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0F5E4A]">Program Jenjang</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0F5E4A] mt-2 mb-4">
            Pilih Jalur Terbaik <span className="italic font-normal text-[#D4AF37]">Masa Depanmu</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Dirancang khusus untuk menyeimbangkan potensi akademik, karakter, dan hafalan Al-Qur'an.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((p, idx) => (
            <div key={idx} className="bg-[#F8F5EF] rounded-3xl overflow-hidden border border-gray-200/60 group hover:shadow-xl transition-all duration-300">
              <div className="h-48 relative overflow-hidden bg-gray-200">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-[#0F5E4A] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-xl text-[#0F5E4A] mb-2">{p.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">{p.desc}</p>
                <Link href="/program" className="inline-flex items-center text-xs font-bold text-[#0F5E4A] group-hover:text-[#D4AF37] transition-colors">
                  Lihat Kurikulum <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}