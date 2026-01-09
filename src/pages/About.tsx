import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Compass, MapPin, UtensilsCrossed, Users, Sparkles, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "2024",
    title: "Ouverture Officielle",
    description: "L'Hôtel Ruvubu devient la référence de l'hospitalité à Cankuzo.",
  },
  {
    year: "2025",
    title: "Circuits Touristiques",
    description: "Excursions vers Muyaga, Mishiha et le Parc de la Ruvubu avec guides locaux.",
  },
];

const features = [
  {
    title: "Gastronomie Professionnelle",
    description: "Fusion de saveurs burundaises et internationales par nos chefs qualifiés.",
    icon: UtensilsCrossed,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  },
  {
    title: "Expériences Culturelles",
    description: "Excursions vers sites historiques et naturels avec accès privilégié aux guides locaux.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
  },
  {
    title: "Art de Vivre Burundais",
    description: "Jardins paysagers et espaces pour mariages, conférences et réceptions.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  },
];

const heritageSites = [
  {
    badge: "Historique",
    title: "Première Église de Muyaga",
    description: "Berceau du catholicisme burundais depuis 1889. Architecture coloniale et spiritualité.",
    distance: "À proximité immédiate",
    image: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?w=600&h=400&fit=crop",
  },
  {
    badge: "Bien-être",
    title: "Eaux Chaudes de Mishiha",
    description: "Sources géothermiques naturelles aux vertus curatives et relaxantes.",
    distance: "Excursion d'une journée",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=400&fit=crop",
  },
  {
    badge: "Culture",
    title: "Musugi Cendajuru",
    description: "Site historique de l'arrivée des premiers missionnaires, mémoire vivante de la région.",
    distance: "Accès facilité",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
  },
  {
    badge: "Aventure",
    title: "Parc National de la Ruvubu",
    description: "Safari et observation de la faune : hippopotames, crocodiles, buffles et avifaune.",
    distance: "Circuit guidé disponible",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function About() {
  return (
    <Layout>
      {/* Page title / breadcrumb */}
      <section className="bg-secondary/30 py-10 border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">À propos</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Notre Patrimoine & Histoire</h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <a href="/" className="hover:text-primary transition-colors">Accueil</a>
            <span className="text-border">/</span>
            <span className="text-foreground">Notre Histoire</span>
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
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=900&h=650&fit=crop"
                alt="Jardins paisibles de l'Hôtel Ruvubu à Cankuzo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden lg:block absolute -bottom-10 -right-10 w-48 h-36 rounded-xl overflow-hidden shadow-hotel-lg border-4 border-background">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
                alt="Chambre spacieuse"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-6 -left-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-hotel-lg">
              <span className="block font-serif text-2xl font-bold">18 Juillet 2024</span>
              <span className="text-xs">Inauguration</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Patrimoine & Hospitalité
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Plus qu'un hôtel, un pont vers l'âme de Buhumuza.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              L'Hôtel Ruvubu incarne l'esprit d'apaisement de Buhumuza. Un refuge pour voyageurs en quête de sérénité et d'immersion culturelle burundaise.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Porte d'entrée vers les trésors de l'Est : église de Muyaga, eaux thermales de Mishiha et Parc National de la Ruvubu. Histoire, nature et culture à portée de main.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Chambres confortables, cuisine raffinée, bar convivial, jardins paisibles : l'hospitalité burundaise dans chaque détail.
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
                    <h5 className="font-semibold text-foreground">{item.title}</h5>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild>
                <a href="/galerie" className="inline-flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Découvrir la Région
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="inline-flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" />
                  Voir la Vidéo
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
            <p className="text-sm uppercase tracking-[0.18em] text-accent font-semibold mb-2">L'Excellence</p>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Au Service de votre Séjour</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="bg-card rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300 border border-border"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-hotel-md">
                    <feature.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="font-serif text-xl font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="section-title">
            <span className="description-title">Découvrir</span>
            <h2>Trésors de Buhumuza</h2>
            <p>Explorez les joyaux entourant l'Hôtel Ruvubu</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heritageSites.map((site, idx) => (
              <motion.div
                key={site.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="heritage-card bg-card rounded-2xl overflow-hidden border border-border shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-hotel-sm">
                    {site.badge}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h4 className="font-serif text-lg font-semibold text-foreground">{site.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{site.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{site.distance}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <Button asChild size="lg">
              <a href="/contact" className="inline-flex items-center gap-2">
                <HeartHandshake className="w-5 h-5" />
                Réserver mon séjour & circuit
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
