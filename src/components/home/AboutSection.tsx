import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-3 block">
              À Propos
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Bienvenue à l'Hôtel Ruvubu
            </h2>
            <p className="text-xl text-accent font-semibold mb-6">
              Votre havre de paix à Cankuzo.
            </p>
            <div className="space-y-5 text-muted-foreground mb-10 text-lg leading-relaxed">
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
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Authenticité', sublabel: 'Hospitalité Locale' },
                { label: '24/7', sublabel: 'Service Client' },
                { label: '6+', sublabel: 'Services Premium' },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="text-center p-5 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
                >
                  <span className="block font-serif text-xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-1">
                    {stat.label}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">{stat.sublabel}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/a-propos">En Savoir Plus</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-secondary/50 transition-all duration-300">
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
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-muted shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=450&fit=crop"
                alt="Hôtel Ruvubu"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 w-48 h-36 rounded-2xl overflow-hidden shadow-2xl hidden lg:block border-4 border-background"
            >
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=225&fit=crop"
                alt="Chambre spacieuse"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-6 -left-6 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground p-5 rounded-2xl shadow-2xl border-2 border-accent/20"
            >
              <span className="block font-serif text-3xl font-bold">N°1</span>
              <span className="text-xs font-medium">Hôtel à<br />Cankuzo</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}