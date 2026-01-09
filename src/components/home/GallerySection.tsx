import { Link } from 'react-router-dom';
import { Eye, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const galleryImages = [
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
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Gallery grid */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
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
      </div>
    </section>
  );
}