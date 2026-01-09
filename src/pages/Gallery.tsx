import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Images, Eye } from "lucide-react";
import { motion } from "framer-motion";

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
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
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

  const visibleItems = useMemo(() => {
    if (filter === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <Layout>
      {/* Page title / breadcrumb */}
      <section className="bg-secondary/30 py-10 border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">Galerie</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Gallery</h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Gallery</span>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 space-y-10">
          {/* Filters */}
          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3">
            {filterLabels.map((f) => {
              const active = f.value === filter;
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    active
                      ? "bg-accent text-accent-foreground border-accent shadow-hotel-sm"
                      : "bg-card text-foreground border-border hover:border-accent/60"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </motion.div>

          {/* Grid */}
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
                className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300 group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 text-accent rounded-full flex items-center justify-center shadow-hotel-md">
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

          <motion.div {...fadeUp} className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/contact" className="inline-flex items-center gap-2">
                <Images className="w-5 h-5" />
                Besoin d'autres photos ? Contactez-nous
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
