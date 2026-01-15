import { UtensilsCrossed, Flower2, Mic, Compass, Wine, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const amenities = [
  {
    icon: UtensilsCrossed,
    titleKey: 'professional_restaurant',
    descriptionKey: 'professional_restaurant_desc',
    featuresKeys: ['qualified_chefs', 'local_specialties'],
    image: '/assets/images/home/chef.webp',
  },
  {
    icon: Flower2,
    titleKey: 'magnificent_gardens',
    descriptionKey: 'magnificent_gardens_desc',
    featuresKeys: ['green_spaces', 'relaxation_areas'],
    image: '/assets/images/home/garden.jpg',
  },
  {
    icon: Mic,
    titleKey: 'event_halls',
    descriptionKey: 'event_halls_desc',
    featuresKeys: ['wedding_hall', 'conference_rooms'],
    image: '/assets/images/home/salle.jpg',
  },
  {
    icon: Compass,
    titleKey: 'tourist_services',
    descriptionKey: 'tourist_services_desc',
    featuresKeys: ['cultural_circuits', 'nature_excursions'],
    image: '/assets/images/home/tourisme.jpg',
  },
  {
    icon: Wine,
    titleKey: 'modern_bar',
    descriptionKey: 'modern_bar_desc',
    featuresKeys: ['premium_drinks', 'modern_ambiance'],
    image: '/assets/images/home/bottles.jpg',
  },
  {
    icon: Heart,
    titleKey: 'warm_hospitality',
    descriptionKey: 'warm_hospitality_desc',
    featuresKeys: ['service_24_7', 'warm_welcome'],
    image: '/assets/images/home/room.png',
  },
];

export function AmenitiesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 md:px-8 lg:px-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-2 block">
            {t('services')}
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('our_premium_facilities')}
          </h2>
        </motion.div>

        {/* Amenity cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
            >
              {/* Image with overlay icon */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={amenity.image}
                  alt={t(amenity.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <amenity.icon className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {t(amenity.titleKey)}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {t(amenity.descriptionKey)}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3">
                  {amenity.featuresKeys.map((featureKey) => (
                    <span
                      key={featureKey}
                      className="inline-flex items-center gap-1 text-xs text-primary"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {t(featureKey)}
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