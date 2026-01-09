import { Link } from 'react-router-dom';
import { ArrowRight, Users, Wifi, Bath, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const rooms = [
  {
    id: 1,
    name: 'Chambre Standard',
    description: 'Chambre confortable avec vue sur les jardins, idéale pour un séjour reposant.',
    price: 45000,
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    amenities: ['WiFi', 'TV', 'Salle de bain privée'],
  },
  {
    id: 2,
    name: 'Chambre Supérieure',
    description: 'Chambre spacieuse avec balcon privé et vue panoramique sur Buhumuza.',
    price: 65000,
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop',
    amenities: ['WiFi', 'TV', 'Balcon', 'Minibar'],
  },
  {
    id: 3,
    name: 'Suite Familiale',
    description: 'Grande suite parfaite pour les familles, avec espace salon et deux chambres.',
    price: 95000,
    capacity: 4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
    amenities: ['WiFi', 'TV', 'Salon', 'Cuisine'],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  WiFi: Wifi,
  TV: Tv,
  'Salle de bain privée': Bath,
};

export function RoomsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-3 block">
            Hébergement
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nos Chambres Spacieuses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hébergement de qualité et confort au cœur de Buhumuza
          </p>
        </motion.div>

        {/* Room cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border hover:border-accent/50"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur-sm">
                  {room.price.toLocaleString()} BIF/nuit
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">{room.capacity} personnes</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {room.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1.5 text-xs bg-secondary/80 px-3 py-1.5 rounded-lg font-medium border border-border/50"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 font-medium">
                  <Link to="/contact" className="flex items-center justify-center gap-2">
                    Réserver
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/chambres"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group"
          >
            <span>Découvrir Toutes Nos Chambres</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}