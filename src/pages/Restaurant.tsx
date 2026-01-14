import { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, UtensilsCrossed, Wine, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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

export default function Restaurant() {
  const [filter, setFilter] = useState<MenuCategory>("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { language, t } = useLanguage();

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
      setError(err instanceof Error ? err.message : t('error'));
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
    const labels = [{ value: "all" as MenuCategory, label: t('all') }];
    
    categories.forEach(category => {
      labels.push({
        value: category as MenuCategory,
        label: t(category) || category
      });
    });
    
    return labels;
  }, [categories, language]);

  const visibleItems = useMemo(() => {
    if (filter === "all") return menuItems;
    return menuItems.filter((item) => item.category === filter);
  }, [menuItems, filter]);

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return price;
    
    const locale = language === 'fr' ? 'fr-FR' : 'en-US';
    return `${numericPrice.toLocaleString(locale)} FBu`;
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
          <h2 className="text-2xl font-bold text-red-600 mb-4">{t('error')}</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => fetchMenuItems()} className="mt-4">
            {t('retry')}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Page title / breadcrumb */}
      <section className="bg-secondary/30 py-10 px-6 md:px-8 lg:px-12 border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">
              {t('restaurant_bar')}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t('restaurant_bar')}
            </h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground">{t('dining')}</span>
          </nav>
        </div>
      </section>

      {/* Intro + images */}
      <section className="py-16 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="space-y-5">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t('dining_at_buhumuza')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('dining_description')}
            </p>
            <div className="space-y-2 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>{t('local_international_cuisine')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>{t('lounge_bar_lemonades')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>{t('picnic_baskets')}</span>
              </div>
            </div>
            <div className="p-4 bg-secondary/40 border border-border rounded-xl">
              <small className="text-muted-foreground italic">
                "{t('cuisine_quote')}"
              </small>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
              <img
                src="assets/images/restaurant/board.jpg"
                alt="Ruvubu Hotel Restaurant"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
              <img
                src="assets/images/restaurant/bottles.jpg"
                alt="Ruvubu Hotel Bar"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden bg-muted aspect-[5/2]">
              <img
                src="assets/images/restaurant/tables.jpg"
                alt="Ruvubu Hotel Dining Room"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu section */}
      <section className="py-16 px-6 md:px-8 lg:px-12 bg-secondary/30">
        <div className="container mx-auto px-4 space-y-10">
          <motion.div {...fadeUp} className="text-center space-y-2">
            <h3 className="font-serif text-3xl font-bold text-foreground">
              {t('our_menu')}
            </h3>
            <p className="text-muted-foreground">{t('select_category')}</p>
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
              <span className="ml-2">{t('loading')}</span>
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">{t('no_items')}</p>
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
                    className="bg-card border border-border rounded-xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                        {/* {formatPrice(item.price)} */}
                      </div>
                      {item.tag && (
                        <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                          {item.tag}
                        </div>
                      )}
                    </div>
                    <div className="p-3.5 space-y-1.5">
                      <h4 className="font-serif text-lg font-semibold text-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {item.description === "undefined" ? t('cuisine_quote') : item.description}
                      </p>
                      <div className="flex items-center justify-between pt-1.5">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          {t(item.category) || item.category}
                        </span>
                        {item.is_special && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                            {t('special')}
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
                    {t('previous')}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {t('page_of', { current: currentPage, total: totalPages })}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    {t('next')}
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
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {t('thirsty_after_visits')}
              </h3>
              <p className="text-muted-foreground">
                {t('bar_description')}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button asChild>
                <Link to="/contact" className="inline-flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4" />
                  {t('book_table')}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/galerie" className="inline-flex items-center gap-2">
                  <Wine className="w-4 h-4" />
                  {t('view_bar')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}