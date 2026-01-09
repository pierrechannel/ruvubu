import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, UtensilsCrossed, Wine, Coffee, Flame, Leaf } from "lucide-react";

type MenuCategory = "all" | "entree" | "plat" | "dessert" | "boisson";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    name: "Brochettes Burundaises",
    description: "Viandes grillées, marinade aux épices locales, servies avec bananes plantain.",
    price: "18 000 FBu",
    category: "plat",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
  },
  {
    name: "Sambaza du Ruvubu",
    description: "Poisson du lac frit, sauce citronnée et légumes croquants.",
    price: "15 000 FBu",
    category: "plat",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
  },
  {
    name: "Salade Verte des Jardins",
    description: "Légumes frais du potager, vinaigrette au citron et herbes de Buhumuza.",
    price: "10 000 FBu",
    category: "entree",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
  },
  {
    name: "Mukeke Grillé",
    description: "Spécialité du Burundi, cuisson au feu de bois et citrons verts.",
    price: "22 000 FBu",
    category: "plat",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
  },
  {
    name: "Gâteau Ananas & Vanille",
    description: "Dessert léger, caramel doux et fruits de saison.",
    price: "9 000 FBu",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&h=400&fit=crop",
  },
  {
    name: "Limonade du Jardin",
    description: "Citron vert, menthe fraîche du jardin, miel local.",
    price: "6 000 FBu",
    category: "boisson",
    image: "https://images.unsplash.com/photo-1481391300593-2c9e0526eb02?w=600&h=400&fit=crop",
  },
  {
    name: "Cold Brew & Café Local",
    description: "Sélection arabica burundais, extraction douce, notes florales.",
    price: "7 000 FBu",
    category: "boisson",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
  },
  {
    name: "Tarte Maracuja",
    description: "Passion fruit, pâte croustillante, crème légère.",
    price: "9 500 FBu",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b84bec71?w=600&h=400&fit=crop",
  },
];

const filterLabels: { value: MenuCategory; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "entree", label: "Entrées" },
  { value: "plat", label: "Plats" },
  { value: "dessert", label: "Desserts" },
  { value: "boisson", label: "Boissons" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Restaurant() {
  const [filter, setFilter] = useState<MenuCategory>("all");

  const visibleItems = useMemo(() => {
    if (filter === "all") return menuItems;
    return menuItems.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <Layout>
      {/* Page title / breadcrumb */}
      <section className="bg-secondary/30 py-10 border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">Restaurant & Bar</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Restaurant & Bar</h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Restaurant</span>
          </nav>
        </div>
      </section>

      {/* Intro + images */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="space-y-5">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Restauration à Buhumuza</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cuisine burundaise authentique et spécialités internationales, préparées avec des produits sélectionnés. Bar lounge moderne, boissons maison et paniers-repas sur demande.
            </p>
            <div className="space-y-2 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Cuisine locale et internationale</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Bar lounge & limonades artisanales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Paniers-repas pour vos excursions</span>
              </div>
            </div>
            <div className="p-4 bg-secondary/40 border border-border rounded-xl">
              <small className="text-muted-foreground italic">
                « Une cuisine adaptée à tous les goûts. »
              </small>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
                alt="Restaurant Hôtel Ruvubu"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop"
                alt="Bar Hôtel Ruvubu"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden bg-muted aspect-[5/2]">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=400&fit=crop"
                alt="Salle Restaurant Hôtel Ruvubu"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 space-y-10">
          <motion.div {...fadeUp} className="text-center space-y-2">
            <h3 className="font-serif text-3xl font-bold text-foreground">Notre Carte</h3>
            <p className="text-muted-foreground">Sélectionnez une catégorie pour explorer nos saveurs</p>
          </motion.div>

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

          <motion.div
            {...fadeUp}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visibleItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                    {item.price}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-serif text-xl font-semibold text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-border bg-card shadow-hotel-md p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-foreground">Envie de fraîcheur après vos visites ?</h3>
              <p className="text-muted-foreground">
                Découvrez notre bar moderne et nos limonades artisanales après Muyaga, Mishiha ou le Parc Ruvubu.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button asChild>
                <Link to="/contact" className="inline-flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4" />
                  Réserver une Table
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/galerie" className="inline-flex items-center gap-2">
                  <Wine className="w-4 h-4" />
                  Voir le Bar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
