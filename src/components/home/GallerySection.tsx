import { Link } from 'react-router-dom';
import { Eye, Images, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type GalleryCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  category: GalleryCategory;
};

type GalleryResponse = {
  success: boolean;
  data: GalleryItem[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
    has_more: boolean;
  };
};

// Fallback images in case API fails or returns no data
const fallbackImages = [
  {
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=225&fit=crop',
    alt: 'Chambre spacieuse',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=225&fit=crop',
    alt: 'Restaurant Professionnel',
  },
  {
    src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=225&fit=crop',
    alt: 'Jardins Magnifiques',
  },
  {
    src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=300&h=225&fit=crop',
    alt: 'Chambre de luxe',
  },
  {
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=225&fit=crop',
    alt: 'Expérience Culturelle',
  },
];

export function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      // Fetch gallery images from your API
      const response = await fetch('https://ruvubu-hotel.com/api/v1/gallery');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: GalleryResponse = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        // Sort by order field, then by creation date if order is the same
        const sortedItems = [...data.data].sort((a, b) => {
          if (a.order !== b.order) {
            return a.order - b.order;
          }
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        
        setGalleryItems(sortedItems);
      } else {
        // If API returns no data, use fallback
        console.warn('No gallery data from API');
        setGalleryItems([]);
      }
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setError(err instanceof Error ? err.message : 'Failed to load gallery');
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Use either API images or fallback images
  const imagesToDisplay = galleryItems.length > 0 
    ? galleryItems 
    : fallbackImages.map((img, index) => ({
        id: index,
        image_url: img.src,
        title: img.alt,
        category: { name: 'Default' }
      } as GalleryItem));

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : error ? (
          <div className="text-center text-muted-foreground py-4">
            <p>Chargement de la galerie...</p>
            <Button 
              onClick={() => fetchGalleryImages()} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              Réessayer
            </Button>
          </div>
        ) : (
          <>
            {/* Gallery grid */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {imagesToDisplay.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-64 md:w-72 aspect-[4/3] rounded-xl overflow-hidden relative group snap-center"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to thumbnail if main image fails
                      if (item.thumbnail_url && item.thumbnail_url !== item.image_url) {
                        e.currentTarget.src = item.thumbnail_url;
                      } else {
                        // Fallback to generic image
                        e.currentTarget.src = fallbackImages[Math.min(index, fallbackImages.length - 1)].src;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      {item.category && (
                        <span className="text-sm text-white/80">{item.category.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View all button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button asChild variant="outline" size="lg">
                <Link to="/galerie" className="inline-flex items-center gap-2">
                  <Images className="w-5 h-5" />
                  Découvrir Plus de Photos
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}