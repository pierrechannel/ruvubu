import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutSection() {
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
              {t('welcome_to_hotel')}
            </h2>
            <p className="text-lg text-accent font-medium mb-4">
              {t('your_haven_of_peace')}
            </p>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                {t('about_description_1')}
              </p>
              <p>
                {t('about_description_2')}
              </p>
              <p>
                {t('about_description_3')}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-card rounded-lg">
                <span className="block font-serif text-lg font-bold text-primary">
                  {t('authenticity')}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t('local_hospitality')}
                </span>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <span className="block font-serif text-lg font-bold text-primary">
                  {t('24_7')}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t('customer_service')}
                </span>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <span className="block font-serif text-lg font-bold text-primary">6+</span>
                <span className="text-xs text-muted-foreground">
                  {t('premium_services')}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/a-propos">{t('learn_more')}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/chambres">{t('view_rooms')}</Link>
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img
                src="/assets/images/home/board.jpg"
                alt={t('hotel_ruvubu')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-36 rounded-xl overflow-hidden shadow-hotel-lg hidden lg:block">
              <img
                src="/assets/images/home/bed.jpg"
                alt={t('spacious_room')}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-6 -left-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-hotel-lg">
              <span className="block font-serif text-2xl font-bold">
                {t('number_one_hotel')}
              </span>
              <span className="text-xs">{t('hotel_in_cankuzo')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}