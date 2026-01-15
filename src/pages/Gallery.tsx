import { useMemo, useState, useEffect } from "react";
import { Images, Eye, Loader2, AlertCircle, RefreshCw, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from '@/components/layout/Layout';
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  order: number;
  is_active: boolean;
};

type GalleryItem = {
  id: number;
  category_id: number;
  title: string;
  subtitle: string | null;
  description: string;
  image_path: string;
  thumbnail_path: string | null;
  order: number;
  is_featured: boolean;
  is_active: boolean;
  views: number;
  metadata: any;
  created_at: string;
  updated_at: string;
  image_url: string;
  thumbnail_url: string;
  category: Category;
};

type Pagination = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
  has_more: boolean;
};

type ApiResponse = {
  success: boolean;
  data: GalleryItem[];
  pagination: Pagination;
};

type CategoriesResponse = {
  success: boolean;
  data: Category[];
  pagination: Pagination;
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Gallery() {
  const [filter, setFilter] = useState<string>("all");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; subtitle?: string } | null>(null);
  
  const { t } = useLanguage();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await fetch('https://ruvubu-hotel.com/api/api/gallery-categories');
        const data: CategoriesResponse = await response.json();
        
        if (data.success) {
          setCategories(data.data);
        } else {
          setError(t('categories_fetch_error'));
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(t('categories_fetch_error'));
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch gallery items
  const fetchGalleryItems = async (page: number = 1, categoryFilter: string = filter) => {
    setLoading(true);
    try {
      let url = `https://ruvubu-hotel.com/api/api/gallery-items?page=${page}`;
      
      // Add category filter if not "all"
      if (categoryFilter !== "all") {
        const category = categories.find(c => c.slug === categoryFilter);
        if (category) {
          url += `&category_id=${category.id}`;
        }
      }

      const response = await fetch(url);
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        if (page === 1) {
          setItems(data.data);
        } else {
          setItems(prev => [...prev, ...data.data]);
        }
        setPagination(data.pagination);
        setHasMore(data.pagination.current_page < data.pagination.last_page);
        setError(null);
      } else {
        setError(t('gallery_fetch_error'));
      }
    } catch (err) {
      console.error('Error fetching gallery items:', err);
      setError(t('gallery_fetch_error'));
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and when filter changes
  useEffect(() => {
    if (categories.length > 0) {
      setCurrentPage(1);
      fetchGalleryItems(1, filter);
    }
  }, [filter, categories]);

  const visibleItems = useMemo(() => {
    if (filter === "all") return items;
    
    // If filter is not "all", we should already have filtered items from API
    // but we can also filter client-side as a fallback
    if (filter !== "all") {
      const category = categories.find(c => c.slug === filter);
      if (category) {
        return items.filter((item) => item.category_id === category.id);
      }
    }
    return items;
  }, [items, filter, categories]);

  const loadMoreItems = () => {
    if (hasMore && pagination) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchGalleryItems(nextPage, filter);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Get filter labels from categories
  const filterLabels = [
    { value: "all", label: t('all_categories') },
    ...categories
      .filter(cat => cat.is_active)
      .sort((a, b) => a.order - b.order)
      .map(cat => ({
        value: cat.slug,
        label: cat.name
      }))
  ];

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Page Header */}
          <section className="bg-white px-6 md:px-8 lg:px-12 py-10 border-b border-gray-200">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">
                  {t('gallery')}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                  {t('gallery')}
                </h1>
              </div>
              <nav className="text-sm text-gray-600 flex items-center gap-2">
                <Link to="/" className="hover:text-amber-600 transition-colors">
                  {t('home')}
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900">{t('gallery')}</span>
              </nav>
            </div>
          </section>

          {/* Gallery Content */}
          <section className="py-16 px-6 md:px-8 lg:px-12">
            <div className="container mx-auto px-4 space-y-10">
              {/* Filters */}
              {categoriesLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
                </div>
              ) : (
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
              )}

              {/* Grid */}
              {loading && items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Loader2 className="w-12 h-12 text-amber-600 animate-spin mb-4" />
                  <p className="text-gray-600">{t('loading_gallery')}</p>
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
                    {t('refresh_page')}
                  </button>
                </div>
              ) : visibleItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Images className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">{t('no_gallery_items')}</p>
                </div>
              ) : (
                <motion.div
                  {...fadeUp}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {visibleItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      onClick={() => setSelectedImage({ 
                        src: item.image_url, 
                        title: item.title, 
                        subtitle: item.subtitle 
                      })}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={item.thumbnail_url || item.image_url}
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
                        {item.category && (
                          <p className="text-sm text-white/80">{item.category.name}</p>
                        )}
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
                        {t('loading')}
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-5 h-5" />
                        {t('load_more_photos')}
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* Contact Button */}
              <motion.div {...fadeUp} className="text-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <Images className="w-5 h-5" />
                  {t('need_more_photos')}
                </Link>
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
        </div>
      </Layout>
    </>
  );
}