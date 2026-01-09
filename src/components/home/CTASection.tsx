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
    <section className="py-24 bg-gradient-to-b from-secondary/30 via-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Vivez l'Hospitalité de Buhumuza
            </h2>
            <p className="text-muted-foreground text-xl mb-10 leading-relaxed">
              Vivez l'esprit burundais à l'Hôtel Ruvubu : confort, gastronomie et accès 
              privilégié aux trésors naturels de la région.
            </p>

            {/* Features list */}
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 text-lg"
                >
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8 py-6">
                <Link to="/contact">Réserver Maintenant</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-secondary/50 transition-all duration-300 text-base px-8 py-6">
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
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop"
                alt="Parc de la Ruvubu"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Overlay badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-6 right-6 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground p-5 rounded-2xl shadow-2xl border-2 border-accent/20"
            >
              <span className="block text-xs uppercase tracking-wider font-semibold mb-1">Nature & Culture</span>
              <span className="block font-serif text-xl font-bold">À Découvrir</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}