import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const features = [
  'Chambres spacieuses et confortables',
  'Cuisine burundaise et internationale',
  'Bar et jardins paysagers',
  'Espaces pour événements et conférences',
  'Excursions vers le Parc de la Ruvubu',
];

export function CTASection() {
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
              Vivez l'Hospitalité de Buhumuza
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Vivez l'esprit burundais à l'Hôtel Ruvubu : confort, gastronomie et accès 
              privilégié aux trésors naturels de la région.
            </p>

            {/* Features list */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact">Réserver Maintenant</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Nous Contacter</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop"
                alt="Parc de la Ruvubu"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute bottom-6 right-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-hotel-lg">
              <span className="block text-xs uppercase tracking-wider">Nature & Culture</span>
              <span className="block font-serif text-lg font-bold">À Découvrir</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}