import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Bienvenue à l'Hôtel Ruvubu
            </h2>
            <p className="text-lg text-accent font-medium mb-4">
              Votre havre de paix à Cankuzo.
            </p>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Niché à Buhumuza, l'Hôtel Ruvubu est votre refuge au cœur des trésors 
                culturels et naturels du Burundi.
              </p>
              <p>
                Chambres spacieuses, restaurant aux saveurs burundaises et internationales, 
                bar convivial, jardins avec limonades artisanales, espaces événementiels : 
                tout pour votre confort.
              </p>
              <p>
                Découvrez l'hospitalité légendaire de Buhumuza à chaque instant de votre séjour.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-card rounded-lg">
                <span className="block font-serif text-lg font-bold text-primary">Authenticité</span>
                <span className="text-xs text-muted-foreground">Hospitalité Locale</span>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <span className="block font-serif text-lg font-bold text-primary">24/7</span>
                <span className="text-xs text-muted-foreground">Service Client</span>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <span className="block font-serif text-lg font-bold text-primary">6+</span>
                <span className="text-xs text-muted-foreground">Services Premium</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/a-propos">En Savoir Plus</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/chambres">Voir les Chambres</Link>
              </Button>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=450&fit=crop"
                alt="Hôtel Ruvubu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-36 rounded-xl overflow-hidden shadow-hotel-lg hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=225&fit=crop"
                alt="Chambre spacieuse"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-6 -left-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-hotel-lg">
              <span className="block font-serif text-2xl font-bold">N°1</span>
              <span className="text-xs">Hôtel à<br />Cankuzo</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}