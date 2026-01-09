import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  BedDouble,
  Eye,
  Ruler,
  BadgeCheck,
  CheckCircle2,
  CalendarCheck,
  Phone,
  Mail,
  Link2,
} from "lucide-react";

type RoomDetail = {
  slug: string;
  name: string;
  type: string;
  description: string;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  size: number;
  bed: string;
  view: "safari" | "garden" | "city";
  isFeatured?: boolean;
  isAvailable?: boolean;
  tags: string[];
  images: string[];
  features: { name: string; value?: string }[];
};

const rooms: RoomDetail[] = [
  {
    slug: "suite-vue-safari",
    name: "Suite Vue Safari",
    type: "Suite",
    description: "Vue panoramique sur la Ruvubu, salon privé, balcon et lumière naturelle pour profiter du paysage.",
    rating: 4.8,
    reviewCount: 86,
    maxGuests: 2,
    size: 42,
    bed: "1 King",
    view: "safari",
    isFeatured: true,
    isAvailable: true,
    tags: ["Vue Safari", "Couples", "Balcon"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop",
    ],
    features: [
      { name: "Climatisation" },
      { name: "WiFi Haut Débit" },
      { name: "Mini-bar" },
      { name: "Coffre-fort" },
      { name: "Room Service" },
      { name: "Bureau de travail" },
    ],
  },
  {
    slug: "suite-familiale",
    name: "Suite Familiale",
    type: "Suite",
    description: "Deux chambres communicantes et un salon pour accueillir toute la famille avec confort.",
    rating: 4.7,
    reviewCount: 64,
    maxGuests: 4,
    size: 55,
    bed: "2 Queen",
    view: "garden",
    isAvailable: true,
    tags: ["Familles", "Salon", "Vue Jardin"],
    images: [
      "https://images.unsplash.com/photo-1582719478171-2f2df3229b3d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop",
    ],
    features: [
      { name: "Climatisation" },
      { name: "WiFi Haut Débit" },
      { name: "Coin salon" },
      { name: "Kitchenette" },
      { name: "Salle de bain privée" },
      { name: "Télévision" },
    ],
  },
  {
    slug: "bungalow-groupe",
    name: "Bungalow Groupe",
    type: "Bungalow",
    description: "Grand espace avec terrasse privée, idéal pour groupes et séjours prolongés.",
    rating: 4.9,
    reviewCount: 41,
    maxGuests: 6,
    size: 68,
    bed: "3 Queen",
    view: "garden",
    isAvailable: false,
    tags: ["Groupes", "Terrasse", "Vue Jardin"],
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&h=800&fit=crop",
    ],
    features: [
      { name: "Climatisation" },
      { name: "Terrasse privée" },
      { name: "Espace repas" },
      { name: "Transferts disponibles" },
      { name: "WiFi" },
      { name: "Paniers-repas" },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function RoomDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const room = rooms.find((r) => r.slug === slug) ?? rooms[0];

  const similar = useMemo(
    () => rooms.filter((r) => r.slug !== room.slug && r.type === room.type).slice(0, 3),
    [room.slug, room.type]
  );

  if (!slug) {
    navigate("/chambres");
  }

  return (
    <Layout>
      {/* Page header */}
      <section className="bg-secondary/30 py-10 border-b border-border/60">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="text-border">/</span>
            <Link to="/chambres" className="hover:text-primary transition-colors">Chambres & Suites</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">{room.name}</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{room.name}</h1>
              <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{room.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({room.reviewCount} avis)</span>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{room.type}</span>
                {room.isFeatured && (
                  <span className="px-2 py-1 rounded-full text-xs bg-accent text-accent-foreground flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> En vedette
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Disponible</p>
              <p className="text-primary text-xl font-semibold">Sur demande</p>
              <p className="text-xs text-muted-foreground">Contactez-nous pour les tarifs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero image */}
            <motion.div {...fadeUp} className="relative rounded-2xl overflow-hidden shadow-hotel-lg aspect-[5/3]">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {room.view === "safari" && (
                  <span className="px-3 py-1 rounded-full text-xs bg-emerald-500 text-white flex items-center gap-1">
                    <Eye className="w-4 h-4" /> Vue Safari
                  </span>
                )}
                {room.view === "garden" && (
                  <span className="px-3 py-1 rounded-full text-xs bg-primary text-primary-foreground flex items-center gap-1">
                    <Eye className="w-4 h-4" /> Vue Jardin
                  </span>
                )}
              </div>
            </motion.div>

            {/* Gallery */}
            <motion.div {...fadeUp} className="grid sm:grid-cols-3 gap-3">
              {room.images.slice(1).map((img, idx) => (
                <div key={img + idx} className="rounded-xl overflow-hidden aspect-[4/3] shadow-hotel-sm">
                  <img src={img} alt={`${room.name} ${idx + 2}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </motion.div>

            {/* Description and features */}
            <motion.div {...fadeUp} className="bg-card border border-border rounded-2xl shadow-hotel-sm p-6">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">Aperçu de la chambre</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{room.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span><strong className="text-foreground">Max. invités:</strong> {room.maxGuests}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    <span><strong className="text-foreground">Superficie:</strong> {room.size} m²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-primary" />
                    <span><strong className="text-foreground">Lits:</strong> {room.bed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    <span><strong className="text-foreground">Vue:</strong> {room.view === "safari" ? "Safari" : room.view === "garden" ? "Jardin" : "Extérieur"}</span>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold text-foreground mb-2">Caractéristiques</h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {room.features.map((feat) => (
                      <div key={feat.name} className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/40 border border-border rounded-lg px-3 py-2">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span className="text-foreground">{feat.name}</span>
                        {feat.value && <span className="text-xs text-muted-foreground ml-auto">{feat.value}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            {room.tags.length > 0 && (
              <motion.div {...fadeUp} className="bg-card border border-border rounded-2xl shadow-hotel-sm p-5">
                <h6 className="font-semibold text-foreground mb-3">Étiquettes de la chambre</h6>
                <div className="flex flex-wrap gap-2">
                  {room.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Similar rooms */}
            {similar.length > 0 && (
              <motion.div {...fadeUp} className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-foreground">Chambres similaires</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {similar.map((sim) => (
                    <div key={sim.slug} className="bg-card border border-border rounded-xl overflow-hidden shadow-hotel-sm">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={sim.images[0]} alt={sim.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-semibold text-foreground text-sm line-clamp-2">{sim.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{sim.description}</p>
                        <div className="flex items-center gap-1 text-xs text-accent">
                          <Star className="w-3.5 h-3.5 fill-accent" />
                          <span className="font-semibold">{sim.rating.toFixed(1)}</span>
                        </div>
                        <Button asChild variant="outline" className="w-full text-xs">
                          <Link to={`/chambres/${sim.slug}`}>Voir</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking widget */}
          <motion.div
            {...fadeUp}
            className="bg-card border border-border rounded-2xl shadow-hotel-md p-6 h-fit sticky top-24 space-y-4"
          >
            <h4 className="font-serif text-xl font-semibold text-foreground">Réserver cette chambre</h4>
            {room.isAvailable ? (
              <>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground">Date d'arrivée</label>
                    <input type="date" className="rounded-lg border border-border bg-background px-3 py-2" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground">Date de départ</label>
                    <input type="date" className="rounded-lg border border-border bg-background px-3 py-2" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground">Invités</label>
                    <select className="rounded-lg border border-border bg-background px-3 py-2">
                      {Array.from({ length: room.maxGuests }).map((_, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1} {idx === 0 ? "Invité" : "Invités"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/40 p-3 text-sm text-muted-foreground">
                    Tarifs disponibles sur demande. Contactez-nous pour un devis personnalisé.
                  </div>
                </div>
                <Button className="w-full">
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Demander un devis
                </Button>
                <div className="text-center text-xs text-muted-foreground">
                  <span className="block"><Link2 className="w-3.5 h-3.5 inline mr-1" /> Réservation sécurisée</span>
                  <span className="block mt-1">Annulation gratuite jusqu'à 48h avant l'arrivée</span>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-lg border border-border bg-secondary/40 p-3 text-sm text-muted-foreground">
                  Cette chambre n'est actuellement pas disponible.
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/chambres">Voir les chambres disponibles</Link>
                </Button>
              </>
            )}

            <div className="pt-4 border-t border-border space-y-2 text-sm">
              <h6 className="font-semibold text-foreground">Besoin d'aide ?</h6>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+257 22 20 20 20</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>reservations@ruvubuhotel.com</span>
              </div>
              <div className="text-xs text-muted-foreground">Tarifs sur demande</div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
