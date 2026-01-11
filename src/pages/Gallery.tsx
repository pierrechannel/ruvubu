import { useMemo, useState } from "react";
import { Images, Eye, Loader2, AlertCircle, RefreshCw, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "all" | "rooms" | "amenities" | "dining" | "exterior";

const galleryItems = [
  {
    title: "Suite Familiale",
    subtitle: "Confort et lumière naturelle",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    category: "rooms" as Category,
  },
  {
    title: "Chambre Supérieure",
    subtitle: "Vue panoramique sur Buhumuza",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
    category: "rooms" as Category,
  },
  {
    title: "Jardins & Détente",
    subtitle: "Moments paisibles en plein air",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
    category: "amenities" as Category,
  },
  {
    title: "Restaurant Professionnel",
    subtitle: "Saveurs burundaises et internationales",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    category: "dining" as Category,
  },
  {
    title: "Bar & Ambiance",
    subtitle: "Limonades artisanales et cocktails",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop",
    category: "dining" as Category,
  },
  {
    title: "Hall & Accueil",
    subtitle: "Hospitalité chaleureuse",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    category: "amenities" as Category,
  },
  {
    title: "Parc National de la Ruvubu",
    subtitle: "Faune et nature protégée",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
    category: "exterior" as Category,
  },
  {
    title: "Eaux Chaudes de Mishiha",
    subtitle: "Bien-être géothermal",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&h=600&fit=crop",
    category: "exterior" as Category,
  },
  {
    title: "Première Église de Muyaga",
    subtitle: "Patrimoine historique",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
    category: "exterior" as Category,
  },
];

const filterLabels: { value: Category; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "rooms", label: "Chambres" },
  { value: "amenities", label: "Installations" },
  { value: "dining", label: "Restauration" },
  { value: "exterior", label: "Extérieur" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Gallery() {
  const [filter, setFilter] = useState<Category>("all");
  const [items, setItems] = useState(galleryItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; subtitle?: string } | null>(null);

  const visibleItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.category === filter);
  }, [items, filter]);

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasMore(false);
    }, 1000);
  };

  const handleFilterChange = (newFilter: Category) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white py-10 border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">Galerie</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Gallery</h1>
          </div>
          <nav className="text-sm text-gray-600 flex items-center gap-2">
            <a href="/" className="hover:text-amber-600 transition-colors">Home</a>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">Gallery</span>
          </nav>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-10">
          {/* Filters */}
          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3">
            {filterLabels.map((f) => {
              const active = f.value === filter;
              return (
                <button
                  key={f.value}
                  onClick={() => handleFilterChange(f.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                    active
                      ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </motion.div>

          {/* Grid */}
          {loading && items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Loader2 className="w-12 h-12 text-amber-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-gray-900 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Page
              </button>
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Images className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No gallery items found.</p>
            </div>
          ) : (
            <motion.div
              {...fadeUp}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleItems.map((item, idx) => (
                <motion.div
                  key={item.title + idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedImage({ src: item.image, title: item.title, subtitle: item.subtitle })}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 text-amber-600 rounded-full flex items-center justify-center shadow-lg">
                        <Eye className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h5 className="font-semibold text-base">{item.title}</h5>
                    {item.subtitle && <p className="text-sm text-white/80">{item.subtitle}</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Load More Button */}
          {hasMore && !loading && (
            <motion.div {...fadeUp} className="text-center">
              <button 
                onClick={loadMoreItems} 
                disabled={loading}
                className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    Load More Photos
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Contact Button */}
          <motion.div {...fadeUp} className="text-center">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Images className="w-5 h-5" />
              Besoin d'autres photos ? Contactez-nous
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors z-10"
            >
              ×
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                {selectedImage.subtitle && (
                  <p className="text-sm text-white/80 mt-1">{selectedImage.subtitle}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </Layout>
    </div>
    
  );
}