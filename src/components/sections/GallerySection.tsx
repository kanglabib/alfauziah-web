export default function GallerySection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6 text-center">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111111] mb-12">Galeri Kegiatan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-gray-200 rounded-2xl h-48 flex items-center justify-center text-gray-500 font-serif">
            [ Foto {item} ]
          </div>
        ))}
      </div>
    </section>
  );
}