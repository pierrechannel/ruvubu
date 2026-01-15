import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const offers = [
  {
    badgeKey: 'cultural_circuit',
    titleKey: 'buhumuza_heritage_circuit',
    descriptionKey: 'heritage_circuit_desc',
    validityKey: 'valid_all_year',
    priceInfoKey: 'contact_for_prices',
    image: '/assets/images/home/muyaga.webp',
    featured: false,
  },
  {
    badgeKey: 'nature_culture',
    titleKey: 'park_culture_combo',
    descriptionKey: 'park_culture_combo_desc',
    validityKey: 'best_may_october',
    priceInfoKey: 'contact_for_prices',
    image: '/assets/images/home/ruvubu-tour.webp',
    featured: true,
  },
  {
    badgeKey: 'events',
    titleKey: 'wedding_event_package',
    descriptionKey: 'wedding_event_package_desc',
    validityKey: 'book_3_months_advance',
    priceInfoKey: 'custom_quote_on_request',
    image: '/assets/images/home/mariage.jpg',
    featured: false,
  },
];

export function OffersSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 md:px-8 lg:px-12">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-2 block">
            {t('offers')}
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('discovery_packages')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('special_offers_description')}
          </p>
        </motion.div>

        {/* Offer cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.titleKey}
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
                  {t(offer.badgeKey)}
                </span>
              </div>

              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={offer.image}
                  alt={t(offer.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {t(offer.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {t(offer.descriptionKey)}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{t(offer.validityKey)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>{t(offer.priceInfoKey)}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/contact">
                    {offer.titleKey.includes('wedding') ? t('get_quote') : t('reserve')}
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