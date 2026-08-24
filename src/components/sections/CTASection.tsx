import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-[#0F5E4A] text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Bergabunglah Bersama Keluarga Besar Al Fauziah</h2>
        <p className="text-gray-200 mb-8 max-w-xl mx-auto">Daftarkan putra-putri Anda sekarang dan jadilah bagian dari generasi penerus pencerah umat.</p>
        <Link href="/ppdb" className="bg-[#D4AF37] text-gray-900 font-semibold px-8 py-4 rounded-full hover:bg-yellow-400 transition-all inline-block">
          Daftar PPDB Online
        </Link>
      </div>
    </section>
  );
}