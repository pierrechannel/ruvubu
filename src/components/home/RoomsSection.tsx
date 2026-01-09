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
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-2 block">
            Hébergement
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
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
              className="group bg-card rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {room.price.toLocaleString()} BIF/nuit
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Users className="w-4 h-4" />
                  <span>{room.capacity} personnes</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {room.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-md"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link to="/contact">
                    Réserver
                    <ArrowRight className="w-4 h-4 ml-2" />
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
          className="text-center mt-12"
        >
          <Link
            to="/chambres"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            <span>Découvrir Toutes Nos Chambres</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}