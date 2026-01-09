import { Link } from 'react-router-dom';
import { Wifi, UtensilsCrossed, Flower2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
              Hôtel Ruvubu, Votre Havre de Paix à Buhumuza
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Découvrez l'hospitalité burundaise à l'Hôtel Ruvubu : chambres spacieuses, 
              cuisine raffinée et service exceptionnel au cœur de Buhumuza.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">WiFi Gratuit</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">Restaurant</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Flower2 className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">Jardins</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact">Réserver Maintenant</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/chambres">Découvrir Nos Chambres</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
                alt="Hôtel Ruvubu - Vue extérieure"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-hotel-lg max-w-xs"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <h6 className="font-semibold text-sm mb-2">Service Exceptionnel</h6>
              <p className="text-xs text-muted-foreground mb-3">
                "Un accueil chaleureux et un service impeccable. L'Hôtel Ruvubu incarne véritablement l'esprit de Buhumuza."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
                    alt="Marie K."
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium">Marie K.</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <span className="block font-serif text-4xl lg:text-5xl font-bold text-primary">20</span>
            <span className="text-sm text-muted-foreground">Chambres Confortables</span>
          </div>
          <div>
            <span className="block font-serif text-4xl lg:text-5xl font-bold text-primary">25</span>
            <span className="text-sm text-muted-foreground">Km du Parc National</span>
          </div>
          <div className="col-span-2 md:col-span-1">
            <span className="block font-serif text-4xl lg:text-5xl font-bold text-primary">4</span>
            <span className="text-sm text-muted-foreground">Sites Touristiques</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}