export default function FacilitiesSection() {
  const facilities = [
    { title: "Masjid Jami'", subtitle: "Pusat Ibadah & Kajian", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop" },
    { title: "Asrama Modern", subtitle: "Fasilitas Kamar Nyaman", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop" },
    { title: "Perpustakaan Digital", subtitle: "Ribuan Koleksi Kitab & Buku", img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop" },
    { title: "Lab Komputer", subtitle: "Teknologi & Multimedia", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop" },
    { title: "Lapangan Olahraga", subtitle: "Futsal, Basket, & Memanah", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop" },
    { title: "Klinik Kesehatan", subtitle: "Layanan Medis 24 Jam", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <section className="py-24 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0F5E4A]">Sarana & Prasarana</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0F5E4A] mt-2 mb-4">
            Fasilitas Terbaik <span className="italic font-normal text-[#D4AF37]">Untuk Santri</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map((f, i) => (
            <div key={i} className="relative h-64 rounded-3xl overflow-hidden group shadow-md">
              <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                <h3 className="font-serif font-bold text-xl">{f.title}</h3>
                <p className="text-xs text-white/80 font-light mt-1">{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}