import { UtensilsCrossed, Flower2, Mic, Compass, Wine, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const amenities = [
  {
    icon: UtensilsCrossed,
    title: 'Restaurant Professionnel',
    description: 'Goûtez aux véritables spécialités burundaises et les saveurs de notre carte internationale, préparées avec des produits frais et locaux.',
    features: ['Chefs Qualifiés', 'Spécialités Locales'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
  },
  {
    icon: Flower2,
    title: 'Jardins Magnifiques',
    description: 'Évadez-vous dans nos jardins paysagers et savourez nos délicieuses limonades dans un cadre verdoyant et apaisant.',
    features: ['Espaces Verts', 'Zones de Détente'],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
  },
  {
    icon: Mic,
    title: "Salles d'Événements",
    description: "Conférences, mariages et événements sur mesure avec l'accompagnement de notre équipe professionnelle.",
    features: ['Salle de Mariage', 'Salles de Conférence'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
  },
  {
    icon: Compass,
    title: 'Services Touristiques',
    description: 'Découvrez la région avec nos guides experts : sites historiques, merveilles naturelles comme la réserve naturelle de la Ruvubu.',
    features: ['Circuits Culturels', 'Excursions Nature'],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
  },
  {
    icon: Wine,
    title: 'Bar Moderne',
    description: 'Savourez nos limonades artisanales, boissons locales et cocktails dans notre bar à l\'atmosphère conviviale.',
    features: ['Boissons Premium', 'Ambiance Moderne'],
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop',
  },
  {
    icon: Heart,
    title: 'Hospitalité Chaleureuse',
    description: "Découvrez l'hospitalité légendaire de Buhumuza à travers notre équipe dévouée à votre confort et à un séjour inoubliable.",
    features: ['Service 24/7', 'Accueil Chaleureux'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
  },
];

export function AmenitiesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 via-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-3 block">
            Services
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nos Installations Premium
          </h2>
        </motion.div>

        {/* Amenity cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border hover:border-accent/50"
            >
              {/* Image with overlay icon */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 w-14 h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <amenity.icon className="w-7 h-7 text-accent-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {amenity.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
                  {amenity.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {amenity.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-lg font-medium"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}