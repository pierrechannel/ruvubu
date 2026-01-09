import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDownCircle, BedDouble, Users, Star, Square } from "lucide-react";

type RoomType = "suite" | "double" | "family" | "twin" | "bungalow";

type Room = {
  id: number;
  title: string;
  description: string;
  price: number;
  guests: number;
  type: RoomType;
  size: number;
  rating: number;
  image: string;
};

const rooms: Room[] = [
  {
    id: 1,
    title: "Suite Vue Safari",
    description: "Vue panoramique sur la Ruvubu, salon privé et balcon.",
    price: 150000,
    guests: 2,
    type: "suite",
    size: 42,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Chambre Double",
    description: "Confort moderne, literie premium et lumière naturelle.",
    price: 85000,
    guests: 2,
    type: "double",
    size: 28,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Chambre Familiale",
    description: "Deux chambres communicantes et espace salon pour la famille.",
    price: 120000,
    guests: 4,
    type: "family",
    size: 45,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Chambre Twin",
    description: "Idéal pour collègues ou amis, lits séparés et bureau.",
    price: 75000,
    guests: 2,
    type: "twin",
    size: 26,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1616594039964-94e201cc63b5?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Bungalow Groupe",
    description: "Espace généreux, terrasse privée et coin repas.",
    price: 180000,
    guests: 6,
    type: "bungalow",
    size: 68,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Chambre Double Jardin",
    description: "Accès direct aux jardins et ambiance paisible.",
    price: 65000,
    guests: 2,
    type: "double",
    size: 24,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&h=600&fit=crop",
  },
];

type PriceFilter = "all" | "under-50k" | "50k-100k" | "100k-150k" | "over-150k";
type GuestsFilter = "any" | "1" | "2" | "3" | "5";
type SortFilter = "popular" | "price_low" | "price_high" | "rating" | "size";

export default function Rooms() {
  const [price, setPrice] = useState<PriceFilter>("all");
  const [guests, setGuests] = useState<GuestsFilter>("any");
  const [type, setType] = useState<RoomType | "all">("all");
  const [sort, setSort] = useState<SortFilter>("popular");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    let data = [...rooms];

    // price
    data = data.filter((r) => {
      switch (price) {
        case "under-50k":
          return r.price < 50000;
        case "50k-100k":
          return r.price >= 50000 && r.price <= 100000;
        case "100k-150k":
          return r.price > 100000 && r.price <= 150000;
        case "over-150k":
          return r.price > 150000;
        default:
          return true;
      }
    });

    // guests
    data = data.filter((r) => {
      switch (guests) {
        case "1":
          return r.guests === 1;
        case "2":
          return r.guests <= 2;
        case "3":
          return r.guests >= 3 && r.guests <= 4;
        case "5":
          return r.guests >= 5;
        default:
          return true;
      }
    });

    // type
    if (type !== "all") {
      data = data.filter((r) => r.type === type);
    }

    // sort
    data.sort((a, b) => {
      switch (sort) {
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "size":
          return b.size - a.size;
        default:
          return 0;
      }
    });

    return data;
  }, [price, guests, type, sort]);

  const visibleRooms = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <Layout>
      {/* Page title / breadcrumb */}
      <section className="bg-secondary/30 py-10 border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">Chambres</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Votre Base Confortable</h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Chambres</span>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 space-y-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <div>
              <label className="text-sm font-medium text-muted-foreground">Fourchette de Prix (FBu)</label>
              <select
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                value={price}
                onChange={(e) => setPrice(e.target.value as PriceFilter)}
              >
                <option value="all">Tous les Prix</option>
                <option value="under-50k">Moins de 50 000</option>
                <option value="50k-100k">50 000 - 100 000</option>
                <option value="100k-150k">100 000 - 150 000</option>
                <option value="over-150k">150 000+</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Capacité d'Accueil</label>
              <select
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                value={guests}
                onChange={(e) => setGuests(e.target.value as GuestsFilter)}
              >
                <option value="any">Toute Capacité</option>
                <option value="1">1 Personne</option>
                <option value="2">1-2 Personnes</option>
                <option value="3">3-4 Personnes</option>
                <option value="5">5+ Personnes</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Type de Chambre</label>
              <select
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                value={type}
                onChange={(e) => setType(e.target.value as RoomType | "all")}
              >
                <option value="all">Toutes les Chambres</option>
                <option value="suite">Suite Vue Safari</option>
                <option value="double">Chambre Double</option>
                <option value="family">Chambre Familiale</option>
                <option value="twin">Chambre Twin</option>
                <option value="bungalow">Bungalow Groupe</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Trier Par</label>
              <select
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortFilter)}
              >
                <option value="popular">Les Plus Populaires</option>
                <option value="price_low">Prix : Croissant</option>
                <option value="price_high">Prix : Décroissant</option>
                <option value="rating">Évaluation Client</option>
                <option value="size">Taille de Chambre</option>
              </select>
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visibleRooms.map((room) => (
              <div
                key={room.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {room.price.toLocaleString()} FBu
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{room.guests} pers.</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" />
                      <span>{room.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      <span>{room.size} m²</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {room.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-accent">
                    <Star className="w-4 h-4 fill-accent" />
                    <span className="font-semibold">{room.rating}</span>
                    <span className="text-muted-foreground">/5</span>
                  </div>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to="/contact">
                      Réserver <ArrowDownCircle className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-secondary/40 border border-border rounded-2xl p-8"
            >
              <h4 className="font-serif text-xl font-semibold text-foreground mb-2">Aucune chambre ne correspond</h4>
              <p className="text-muted-foreground mb-4">Ajustez vos filtres pour voir plus d'options.</p>
              <Button onClick={() => { setPrice("all"); setGuests("any"); setType("all"); setSort("popular"); }}>
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}

          {/* Load more */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button
                variant="outline"
                onClick={() => setVisible((v) => v + 3)}
                className="inline-flex items-center gap-2"
              >
                <ArrowDownCircle className="w-5 h-5" />
                Voir Plus de Chambres
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
