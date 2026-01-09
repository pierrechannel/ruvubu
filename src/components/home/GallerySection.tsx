import { Link } from 'react-router-dom';
import { Eye, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-3 block">
            Galerie
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Découvrez Notre Hôtel
          </h2>
        </motion.div>

        {/* Gallery grid - improved layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={cn(
                "relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer",
                index === 0 && "md:col-span-2 md:row-span-2",
                index === 1 && "md:col-span-2"
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <Eye className="w-7 h-7 text-white" />
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
          className="text-center"
        >
          <Button asChild variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
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