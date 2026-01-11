import { Link } from 'react-router-dom';
import { Eye, Images, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  sort_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

type GalleryResponse = {
  success: boolean;
  data: GalleryImage[];
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
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      // Try to fetch from API - adjust the endpoint as needed
      const response = await fetch('https://ruvubu-hotel.com/api/gallery-items');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: GalleryResponse = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        // Transform API data to match our component's needs
        const transformedImages = data.data.map(item => ({
          id: item.id,
          src: getImageUrl(item.src || item.image || ''),
          alt: item.alt || item.title || item.description || 'Image Hôtel Ruvubu',
          title: item.title,
          description: item.description,
          category: item.category,
          sort_order: item.sort_order || 0,
        })).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        
        setGalleryImages(transformedImages);
      } else {
        // If API returns no data or different structure, use fallback
        console.warn('No gallery data from API, using fallback images');
        setGalleryImages(fallbackImages.map((img, index) => ({
          id: index,
          ...img
        })));
      }
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setError(err instanceof Error ? err.message : 'Failed to load gallery');
      // Use fallback images on error
      setGalleryImages(fallbackImages.map((img, index) => ({
        id: index,
        ...img
      })));
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    // Handle different possible image path formats
    if (!imagePath) {
      return fallbackImages[0].src; // Return first fallback image if no path
    }
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Check for common storage prefixes
    if (imagePath.startsWith('storage/') || imagePath.startsWith('/storage/')) {
      const cleanPath = imagePath.replace(/^\/?storage\//, '');
      return `https://ruvubu-hotel.com/storage/${cleanPath}`;
    }
    
    // Assume it's a relative path from your storage
    return `https://ruvubu-hotel.com/storage/${imagePath}`;
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Use either API images or fallback images
  const imagesToDisplay = galleryImages.length > 0 ? galleryImages : fallbackImages;

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
          </div>
        ) : (
          <>
            {/* Gallery grid */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {imagesToDisplay.map((image, index) => (
                <motion.div
                  key={image.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-64 md:w-72 aspect-[4/3] rounded-xl overflow-hidden relative group snap-center"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
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