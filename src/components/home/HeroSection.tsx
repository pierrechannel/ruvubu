import { Link } from 'react-router-dom';
import { Wifi, UtensilsCrossed, Flower2, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Bienvenue à Buhumuza</span>
            </motion.div>

            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              Hôtel Ruvubu, Votre Havre de Paix à Buhumuza
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Découvrez l'hospitalité burundaise à l'Hôtel Ruvubu : chambres spacieuses, 
              cuisine raffinée et service exceptionnel au cœur de Buhumuza.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { icon: Wifi, label: 'WiFi Gratuit' },
                { icon: UtensilsCrossed, label: 'Restaurant' },
                { icon: Flower2, label: 'Jardins' },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{feature.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8 py-6">
                <Link to="/contact">Réserver Maintenant</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-secondary/50 transition-all duration-300 text-base px-8 py-6">
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
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-secondary shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
                alt="Hôtel Ruvubu - Vue extérieure"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-card p-6 rounded-2xl shadow-2xl max-w-xs border border-border backdrop-blur-sm"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <h6 className="font-semibold text-sm mb-2">Service Exceptionnel</h6>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                "Un accueil chaleureux et un service impeccable. L'Hôtel Ruvubu incarne véritablement l'esprit de Buhumuza."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full overflow-hidden ring-2 ring-accent/20">
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
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          {[
            { number: '20', label: 'Chambres Confortables' },
            { number: '25', label: 'Km du Parc National' },
            { number: '4', label: 'Sites Touristiques' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
              className="text-center p-6 bg-card rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              <span className="block font-serif text-5xl lg:text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.number}
              </span>
              <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}