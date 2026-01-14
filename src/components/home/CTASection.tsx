import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const featureKeys = [
  'spacious_comfortable_rooms',
  'burundian_international_cuisine',
  'bar_landscaped_gardens',
  'event_conference_spaces',
  'excursions_ruvubu_park',
];

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 md:px-8 lg:px-12 bg-secondary/30">
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
              {t('experience_buhumuza_hospitality')}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t('cta_description')}
            </p>

            {/* Features list */}
            <ul className="space-y-3 mb-8">
              {featureKeys.map((featureKey, index) => (
                <motion.li
                  key={featureKey}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{t(featureKey)}</span>
                </motion.li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact">{t('reserve_now')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">{t('contact_us_cta')}</Link>
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
                src="/assets/images/home/park.jpg"
                alt={t('ruvubu_park_title')}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute bottom-6 right-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-hotel-lg">
              <span className="block text-xs uppercase tracking-wider">
                {t('nature_culture_badge')}
              </span>
              <span className="block font-serif text-lg font-bold">
                {t('to_discover')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}