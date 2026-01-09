import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const offers = [
  {
    badge: 'CIRCUIT CULTUREL',
    title: 'Circuit Héritage Buhumuza',
    description: 'Inclut hébergement, visites guidées à Muyaga, Musugi Cendajuru, eaux thermales de Mishiha, et déjeuner avec cuisine locale.',
    validity: 'Valable toute l\'année',
    priceInfo: 'Contacter pour les prix',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=300&fit=crop',
    featured: false,
  },
  {
    badge: 'NATURE & CULTURE',
    title: 'Combo Parc & Culture',
    description: 'Combiné safari au Parc de la Ruvubu et sites culturels. Inclut frais de parc, visites guidées, hébergement et tous les repas.',
    validity: 'Meilleur Mai - Octobre',
    priceInfo: 'Contacter pour les prix',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop',
    featured: true,
  },
  {
    badge: 'ÉVÉNEMENTS',
    title: 'Forfait Mariage & Événement',
    description: 'Forfait complet incluant location de salle, restauration professionnelle, hébergement des invités et matériels pour les cérémonie traditionnelle.',
    validity: 'Réserver 3 mois à l\'avance',
    priceInfo: 'Devis personnalisé sur demande',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    featured: false,
  },
];

export function OffersSection() {
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
            Offres
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Forfaits Découverte
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Offres spéciales pour découvrir la région et ses merveilles
          </p>
        </motion.div>

        {/* Offer cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group bg-card rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300 relative",
                offer.featured && "ring-2 ring-accent"
              )}
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {offer.badge}
                </span>
              </div>

              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {offer.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {offer.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{offer.validity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>{offer.priceInfo}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/contact">
                    {offer.title.includes('Mariage') ? 'Obtenir un Devis' : 'Réserver'}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}