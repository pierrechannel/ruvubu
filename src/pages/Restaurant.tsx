import { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, UtensilsCrossed, Wine, Loader2 } from "lucide-react";

type MenuCategory = "all" | "burundian" | "international";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  tag: string | null;
  is_special: boolean;
  is_active: boolean;
  sort_order: number;
};

type MenuItemsResponse = {
  success: boolean;
  data: {
    current_page: number;
    data: MenuItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
};

type CategoriesResponse = {
  success: boolean;
  data: string[];
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const categoryTranslations: Record<string, string> = {
  burundian: "Burundais",
  international: "International",
};

export default function Restaurant() {
  const [filter, setFilter] = useState<MenuCategory>("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMenuItems = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`https://ruvubu-hotel.com/api/v1/menu-items?page=${page}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MenuItemsResponse = await response.json();
      
      if (data.success) {
        setMenuItems(data.data.data);
        setTotalPages(data.data.last_page);
        setCurrentPage(data.data.current_page);
      } else {
        throw new Error("Failed to fetch menu items");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load menu");
      console.error("Error fetching menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch("https://ruvubu-hotel.com/api/v1/categories");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CategoriesResponse = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const filterLabels = useMemo(() => {
    const labels = [{ value: "all" as MenuCategory, label: "Tout" }];
    
    categories.forEach(category => {
      labels.push({
        value: category as MenuCategory,
        label: categoryTranslations[category] || category
      });
    });
    
    return labels;
  }, [categories]);

  const visibleItems = useMemo(() => {
    if (filter === "all") return menuItems;
    return menuItems.filter((item) => item.category === filter);
  }, [menuItems, filter]);

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return price;
    
    return `${numericPrice.toLocaleString('fr-FR')} FBu`;
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const cleanPath = imagePath.replace('storage/', '');
    return `https://ruvubu-hotel.com/storage/${cleanPath}`;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchMenuItems(page);
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => fetchMenuItems()} className="mt-4">
            Retry
          </Button>
        </div>
      </Layout>
    );
  }

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
            {loadingCategories ? (
              <div className="py-2 px-4">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              filterLabels.map((f) => {
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
              })
            )}
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Aucun élément de menu disponible pour cette catégorie.</p>
            </div>
          ) : (
            <>
              <motion.div
                {...fadeUp}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {visibleItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback image if the original fails to load
                          e.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                        {formatPrice(item.price)}
                      </div>
                      {item.tag && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                          {item.tag}
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="font-serif text-xl font-semibold text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {item.description === "undefined" ? "Délicieuse spécialité maison" : item.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {categoryTranslations[item.category] || item.category}
                        </span>
                        {item.is_special && (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            Spécial
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div {...fadeUp} className="flex justify-center items-center gap-2 pt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} sur {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </Button>
                </motion.div>
              )}
            </>
          )}
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