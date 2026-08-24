export default function FAQSection() {
  const faqs = [
    { q: "Kapan pendaftaran PPDB dibuka?", a: "PPDB dibuka dalam 2 gelombang mulai bulan Oktober hingga Maret." },
    { q: "Apakah ada program beasiswa?", a: "Ya, kami menyediakan beasiswa khusus bagi santri berprestasi dan hafidz 30 juz." },
  ];
  return (
    <section className="py-20 bg-[#F8F5EF]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-center text-[#0F5E4A] mb-12">Pertanyaan Umum (FAQ)</h2>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg text-[#111111] mb-2">{f.q}</h3>
              <p className="text-gray-600 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}