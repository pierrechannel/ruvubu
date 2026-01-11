import { useMemo, useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  UtensilsCrossed, 
  Wine, 
  Loader2, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Clock,
  Sparkles,
  Filter,
  X,
  ChevronDown,
  Search
} from "lucide-react";

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
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

const itemAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});

  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (selectedItem && menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedItem]);

  const filterLabels = useMemo(() => {
    const labels = [{ value: "all" as MenuCategory, label: "Tout", icon: <Sparkles className="w-4 h-4" /> }];
    
    categories.forEach(category => {
      const icon = category === "burundian" ? <UtensilsCrossed className="w-4 h-4" /> : <Wine className="w-4 h-4" />;
      labels.push({
        value: category as MenuCategory,
        label: categoryTranslations[category] || category,
        icon
      });
    });
    
    return labels;
  }, [categories]);

  const filteredItems = useMemo(() => {
    let items = filter === "all" ? menuItems : menuItems.filter((item) => item.category === filter);
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    return items;
  }, [menuItems, filter, searchQuery]);

  const specialItems = useMemo(() => 
    menuItems.filter(item => item.is_special).slice(0, 3), 
    [menuItems]
  );

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
      window.scrollTo({ top: menuRef.current?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handleImageLoad = (id: number) => {
    setImageLoading(prev => ({ ...prev, [id]: false }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, id: number) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop";
    setImageLoading(prev => ({ ...prev, [id]: false }));
  };

  if (error) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Erreur de chargement</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => fetchMenuItems()} className="gap-2">
              <Loader2 className="w-4 h-4" />
              Réessayer
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent" />
        <div className="container relative mx-auto px-4 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Restaurant & Bar Premium
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Une Expérience <span className="text-accent">Culinaire</span> Unique
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Savourez une cuisine raffinée mêlant traditions burundaises et créations internationales, 
              dans un cadre élégant avec une vue imprenable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="#menu">
                  <UtensilsCrossed className="w-5 h-5" />
                  Explorer le Menu
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/contact">
                  <Clock className="w-5 h-5" />
                  Horaires & Réservation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Restaurant Info */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div 
              {...fadeUp}
              className="lg:col-span-2 space-y-8"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  L'Art de Recevoir à l'Hôtel Ruvubu
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Notre restaurant vous invite à un voyage sensoriel où chaque plat raconte une histoire. 
                  Des produits locaux soigneusement sélectionnés, une équipe passionnée, et une atmosphère 
                  chaleureuse vous attendent.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <UtensilsCrossed />, title: "Cuisine Locale", desc: "Saveurs authentiques du Burundi" },
                  { icon: <Wine />, title: "Bar Signature", desc: "Cocktails créatifs et vins sélectionnés" },
                  { icon: <Clock />, title: "Service Continu", desc: "Petit-déjeuner, déjeuner & dîner" },
                  { icon: <Star />, title: "Chef Expérimenté", desc: "Créations gastronomiques uniques" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    {...itemAnimation}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50"
                  >
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              {...fadeUp}
              className="relative"
            >
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border shadow-hotel-lg">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-4">Horaires d'Ouverture</h3>
                  <div className="space-y-3">
                    {[
                      { day: "Lundi - Vendredi", time: "7:00 - 22:00" },
                      { day: "Samedi", time: "8:00 - 23:00" },
                      { day: "Dimanche", time: "8:00 - 21:00" }
                    ].map((schedule, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                        <span className="text-foreground">{schedule.day}</span>
                        <span className="font-semibold text-accent">{schedule.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-4">Spécialités du Chef</h3>
                  {specialItems.length > 0 ? (
                    <div className="space-y-3">
                      {specialItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img 
                              src={getImageUrl(item.image)} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Chargement des spécialités...</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" ref={menuRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <UtensilsCrossed className="w-4 h-4" />
              Notre Carte
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Découvrez Nos Saveurs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une sélection de plats préparés avec des ingrédients frais et de saison, 
              pour une expérience culinaire mémorable.
            </p>
          </motion.div>

          {/* Filters & Search */}
          <motion.div {...fadeUp} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un plat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="md:hidden gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtres
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
                </Button>
                
                <div className="hidden md:flex flex-wrap gap-2">
                  {loadingCategories ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Chargement...
                    </div>
                  ) : (
                    filterLabels.map((f) => {
                      const active = f.value === filter;
                      return (
                        <button
                          key={f.value}
                          onClick={() => setFilter(f.value)}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                            active
                              ? "bg-accent text-accent-foreground shadow-hotel-sm"
                              : "bg-card text-foreground border border-border hover:border-accent/60"
                          }`}
                        >
                          {f.icon}
                          {f.label}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            
            {/* Mobile Filters */}
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-4">
                    {filterLabels.map((f) => {
                      const active = f.value === filter;
                      return (
                        <button
                          key={f.value}
                          onClick={() => {
                            setFilter(f.value);
                            setShowMobileFilters(false);
                          }}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                            active
                              ? "bg-accent text-accent-foreground"
                              : "bg-card text-foreground border border-border"
                          }`}
                        >
                          {f.icon}
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Menu Items Grid */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">Chargement du menu...</p>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <UtensilsCrossed className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Aucun plat trouvé</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? "Aucun résultat pour votre recherche. Essayez d'autres termes."
                  : "Aucun élément disponible dans cette catégorie pour le moment."
                }
              </p>
              {(searchQuery || filter !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilter('all');
                    setShowMobileFilters(false);
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemAnimation}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {imageLoading[item.id] !== false && (
                          <div className="absolute inset-0 bg-secondary animate-pulse" />
                        )}
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onLoad={() => handleImageLoad(item.id)}
                          onError={(e) => handleImageError(e, item.id)}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-white">
                              {formatPrice(item.price)}
                            </span>
                            {item.is_special && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold">
                                <Star className="w-3 h-3 fill-yellow-300" />
                                Spécialité
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {item.tag && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                              {item.tag}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h4 className="font-serif text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground whitespace-nowrap">
                            {categoryTranslations[item.category] || item.category}
                          </span>
                        </div>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                          {item.description === "undefined" 
                            ? "Une délicieuse création de notre chef, préparée avec des ingrédients frais et locaux." 
                            : item.description
                          }
                        </p>
                        
                        <button className="w-full py-2.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center justify-center gap-2">
                          Voir les détails
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div {...fadeUp} className="flex justify-center items-center gap-4 pt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                            currentPage === pageNum
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-secondary"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Expérience Unique
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Prêt pour une Expérience Culinaire Inoubliable ?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Réservez votre table pour savourer nos créations du chef dans une ambiance élégante et chaleureuse. 
              Événements privés et menus dégustation disponibles sur demande.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/contact">
                  <UtensilsCrossed className="w-5 h-5" />
                  Réserver une Table
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/contact?subject=catering">
                  <Wine className="w-5 h-5" />
                  Événements Privés
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="gap-2">
                <Link to="/galerie">
                  Voir la Galerie
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <div className="aspect-[16/9] relative">
                  <img
                    src={getImageUrl(selectedItem.image)}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                        {selectedItem.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold text-xl">
                          {formatPrice(selectedItem.price)}
                        </span>
                        <span className="text-sm px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {categoryTranslations[selectedItem.category] || selectedItem.category}
                        </span>
                        {selectedItem.is_special && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-700 text-xs font-semibold">
                            <Star className="w-3 h-3 fill-yellow-500" />
                            Spécial
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm text-muted-foreground mb-6">
                    {selectedItem.description === "undefined" 
                      ? "Cette spécialité maison est préparée avec soin par notre chef, utilisant des ingrédients frais et locaux pour une expérience gustative exceptionnelle." 
                      : selectedItem.description
                    }
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <Button asChild>
                      <Link to="/contact">
                        Commander ce plat
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedItem(null)}>
                      Fermer
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}