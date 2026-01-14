import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Compass, MapPin, UtensilsCrossed, Users, Sparkles, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext"; // Import the language hook

const milestones = [
  {
    year: "2024",
    title_key: "opening_title",
    description_key: "opening_description",
  },
  {
    year: "2025",
    title_key: "tours_title",
    description_key: "tours_description",
  },
];

const features = [
  {
    title_key: "gastronomy_title",
    description_key: "gastronomy_description",
    icon: UtensilsCrossed,
    image: "/assets/images/about/chef.webp",
  },
  {
    title_key: "cultural_experiences_title",
    description_key: "cultural_experiences_description",
    icon: Compass,
    image: "/assets/images/about/tour.jpg",
  },
  {
    title_key: "burundian_lifestyle_title",
    description_key: "burundian_lifestyle_description",
    icon: Users,
    image: "/assets/images/about/garden.png",
  },
];

const heritageSites = [
  {
    badge_key: "historical_badge",
    title_key: "muyaga_church_title",
    description_key: "muyaga_church_description",
    distance_key: "muyaga_church_distance",
    image: "public/assets/images/about/muyaga.webp",
  },
  {
    badge_key: "wellness_badge",
    title_key: "mishiha_hot_springs_title",
    description_key: "mishiha_hot_springs_description",
    distance_key: "mishiha_hot_springs_distance",
    image: "public/assets/images/about/eau_thermale.jpg",
  },
  {
    badge_key: "culture_badge",
    title_key: "musugi_cendajuru_title",
    description_key: "musugi_cendajuru_description",
    distance_key: "musugi_cendajuru_distance",
    image: "public/assets/images/about/misugi.jpg",
  },
  {
    badge_key: "adventure_badge",
    title_key: "ruvubu_park_title",
    description_key: "ruvubu_park_description",
    distance_key: "ruvubu_park_distance",
    image: "public/assets/images/about/park.jpg",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function About() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Page title / breadcrumb */}
      <section className="bg-secondary/30 py-10 border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">
              {t('about_us')}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t('our_heritage_history')}
            </h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <a href="/" className="hover:text-primary transition-colors">
              {t('home')}
            </a>
            <span className="text-border">/</span>
            <span className="text-foreground">{t('our_story')}</span>
          </nav>
        </div>
      </section>

      {/* About section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Images stack */}
          <motion.div {...fadeUp} className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-hotel-lg">
              <img
                src="public/assets/images/about/garden.jpg"
                alt={t('garden_image_alt')}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden lg:block absolute -bottom-10 -right-10 w-48 h-36 rounded-xl overflow-hidden shadow-hotel-lg border-4 border-background">
              <img
                src="public/assets/images/about/room.png"
                alt={t('room_image_alt')}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-6 -left-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-hotel-lg">
              <span className="block font-serif text-2xl font-bold">18 Juillet 2024</span>
              <span className="text-xs">{t('inauguration')}</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              {t('heritage_hospitality')}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t('hero_title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('hero_description_1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('hero_description_2')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('hero_description_3')}
            </p>

            {/* Milestones */}
            <div className="grid gap-4">
              {milestones.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 shadow-hotel-sm"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/15 text-accent flex items-center justify-center font-serif text-lg font-bold">
                    {item.year}
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">{t(item.title_key)}</h5>
                    <p className="text-sm text-muted-foreground">{t(item.description_key)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild>
                <a href="/galerie" className="inline-flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  {t('discover_region')}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="inline-flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" />
                  {t('watch_video')}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.18em] text-accent font-semibold mb-2">
              {t('excellence')}
            </p>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t('serving_your_stay')}
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title_key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="bg-card rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300 border border-border"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={t(feature.title_key)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-hotel-md">
                    <feature.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="font-serif text-xl font-semibold text-foreground">
                    {t(feature.title_key)}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(feature.description_key)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.18em] text-accent font-semibold mb-2">
              {t('discover')}
            </p>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t('buhumuza_treasures')}
            </h3>
            <p className="text-muted-foreground mt-2">
              {t('explore_jewels')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heritageSites.map((site, idx) => (
              <motion.div
                key={site.title_key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={site.image}
                    alt={t(site.title_key)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-hotel-sm">
                    {t(site.badge_key)}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h4 className="font-serif text-lg font-semibold text-foreground">
                    {t(site.title_key)}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(site.description_key)}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{t(site.distance_key)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <Button asChild size="lg">
              <a href="/contact" className="inline-flex items-center gap-2">
                <HeartHandshake className="w-5 h-5" />
                {t('book_stay_circuit')}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}