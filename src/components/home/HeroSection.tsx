import { Link } from 'react-router-dom';
import { Wifi, UtensilsCrossed, Flower2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
              {t('hero_main_title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('hero_main_description')}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">{t('free_wifi')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">{t('restaurant')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Flower2 className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">{t('gardens')}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact">{t('book_now_hero')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/chambres">{t('discover_our_rooms')}</Link>
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
              <img
                src="/assets/images/home/garden.jpg"
                alt={t('hotel_ruvubu')}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-hotel-lg max-w-xs"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <h6 className="font-semibold text-sm mb-2">{t('exceptional_service')}</h6>
              <p className="text-xs text-muted-foreground mb-3">
                {t('warm_welcome_service')}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full overflow-hidden">
                  <img
                    src="/assets/images/home/person_1.jpg"
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <span className="block font-serif text-4xl lg:text-5xl font-bold text-primary">20</span>
            <span className="text-sm text-muted-foreground">{t('comfortable_rooms')}</span>
          </div>
          <div>
            <span className="block font-serif text-4xl lg:text-5xl font-bold text-primary">25</span>
            <span className="text-sm text-muted-foreground">{t('km_from_national_park')}</span>
          </div>
          <div className="col-span-2 md:col-span-1">
            <span className="block font-serif text-4xl lg:text-5xl font-bold text-primary">4</span>
            <span className="text-sm text-muted-foreground">{t('tourist_sites')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}