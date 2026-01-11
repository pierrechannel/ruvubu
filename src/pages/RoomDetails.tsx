import { useState, useEffect, useMemo } from "react";
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
  Loader2,
} from "lucide-react";

type RoomDetail = {
  id: number;
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
  price: number;
  formatted_price: string;
};

type ApiRoomDetail = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  max_guests: number;
  size: string;
  view_type: string;
  room_type: string;
  bed_type: string;
  bed_count: number;
  rating: string;
  review_count: number;
  is_featured: boolean;
  is_available: boolean;
  images: {
    id: number;
    room_id: number;
    image_path: string;
    alt_text: string;
    is_primary: number;
    sort_order: number;
    created_at: string;
    updated_at: string;
  }[];
  features: { name: string }[];
  tags: { name: string }[];
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function RoomDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [similarRooms, setSimilarRooms] = useState<RoomDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      navigate("/chambres");
      return;
    }

    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch specific room by slug
        const roomResponse = await fetch(`https://ruvubu-hotel.com/api/rooms/${slug}`);
        if (!roomResponse.ok) throw new Error("Room not found");
        const roomData = await roomResponse.json();
        
        // Check if response has success wrapper
        const room = roomData.success ? roomData.data : roomData;
        
        // Transform room data
        const transformedRoom: RoomDetail = {
          id: room.id,
          slug: room.slug,
          name: room.name,
          type: room.room_type === "suite" ? "Suite" : room.room_type === "standard" ? "Standard" : "Bungalow",
          description: room.description === "undefined" || !room.description ? 
            "Chambre confortable avec toutes les commodités nécessaires pour un séjour agréable." : 
            room.description,
          rating: parseFloat(room.rating) || 0,
          reviewCount: room.review_count || 0,
          maxGuests: room.max_guests,
          size: parseFloat(room.size),
          bed: room.bed_count === 1 && room.bed_type === "king" ? "1 King" : 
               room.bed_count === 1 && room.bed_type === "queen" ? "1 Queen" : 
               room.bed_count === 1 ? "1 Simple" : `${room.bed_count} Lits simples`,
          view: (room.view_type as "safari" | "garden" | "city") || "garden",
          isFeatured: room.is_featured,
          isAvailable: room.is_available,
          tags: room.tags?.map((tag: any) => tag.name) || [],
          images: room.images && room.images.length > 0 
            ? room.images.map((img: any) => `https://ruvubu-hotel.com/storage/${img.image_path}`)
            : ['/placeholder-room.jpg'],
          features: room.features?.map((feature: any) => ({ name: feature.name })) || [
            { name: "Climatisation" },
            { name: "WiFi Haut Débit" },
            { name: "Salle de bain privée" },
            { name: "Télévision" },
          ],
          price: parseFloat(room.price),
          formatted_price: `${parseFloat(room.price).toLocaleString('fr-FR')} FBu`,
        };

        setRoom(transformedRoom);

        // Fetch all rooms for similar recommendations
        const allRoomsResponse = await fetch("https://ruvubu-hotel.com/api/rooms");
        if (allRoomsResponse.ok) {
          const allRoomsData = await allRoomsResponse.json();
          const rooms = allRoomsData.success ? allRoomsData.data?.rooms || allRoomsData.data : allRoomsData;
          
          // Make sure rooms is an array
          const roomsArray = Array.isArray(rooms) ? rooms : [];
          
          const similar = roomsArray
            .filter((r: any) => r.slug !== slug && r.room_type === room.room_type)
            .slice(0, 3)
            .map((r: any) => ({
              id: r.id,
              slug: r.slug,
              name: r.name,
              type: r.room_type === "suite" ? "Suite" : r.room_type === "standard" ? "Standard" : "Bungalow",
              description: r.description === "undefined" || !r.description ? 
                "Chambre confortable." : 
                r.description.substring(0, 100) + '...',
              rating: parseFloat(r.rating) || 0,
              reviewCount: r.review_count || 0,
              maxGuests: r.max_guests,
              size: parseFloat(r.size),
              bed: r.bed_count === 1 && r.bed_type === "king" ? "1 King" : 
                   r.bed_count === 1 && r.bed_type === "queen" ? "1 Queen" : 
                   r.bed_count === 1 ? "1 Simple" : `${r.bed_count} Lits simples`,
              view: (r.view_type as "safari" | "garden" | "city") || "garden",
              tags: r.tags?.map((tag: any) => tag.name) || [],
              images: r.images && r.images.length > 0 
                ? [`https://ruvubu-hotel.com/storage/${r.images[0].image_path}`]
                : ['/placeholder-room.jpg'],
              features: [],
              price: parseFloat(r.price),
              formatted_price: `${parseFloat(r.price).toLocaleString('fr-FR')} FBu`,
            }));
          setSimilarRooms(similar);
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [slug, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Chargement de la chambre...</p>
        </div>
      </Layout>
    );
  }

  if (error || !room) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center bg-destructive/10 border border-destructive/30 rounded-2xl p-8 max-w-md mx-auto">
            <h4 className="font-serif text-xl font-semibold text-destructive mb-2">Chambre introuvable</h4>
            <p className="text-muted-foreground mb-4">{error || "Cette chambre n'existe pas."}</p>
            <Button asChild>
              <Link to="/chambres">Retour aux chambres</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
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
                {room.rating > 0 ? (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{room.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({room.reviewCount} avis)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Pas encore d'avis</span>
                  </div>
                )}
                <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{room.type}</span>
                {room.isFeatured && (
                  <span className="px-2 py-1 rounded-full text-xs bg-accent text-accent-foreground flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> En vedette
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">À partir de</p>
              <p className="text-primary text-xl font-semibold">{room.formatted_price}</p>
              <p className="text-xs text-muted-foreground">Par nuit</p>
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
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-room.jpg';
                  e.currentTarget.onerror = null;
                }}
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
                {room.view === "city" && (
                  <span className="px-3 py-1 rounded-full text-xs bg-blue-500 text-white flex items-center gap-1">
                    <Eye className="w-4 h-4" /> Vue Ville
                  </span>
                )}
              </div>
            </motion.div>

            {/* Gallery */}
            {room.images.length > 1 && (
              <motion.div {...fadeUp} className="grid sm:grid-cols-3 gap-3">
                {room.images.slice(1, 4).map((img, idx) => (
                  <div key={img + idx} className="rounded-xl overflow-hidden aspect-[4/3] shadow-hotel-sm">
                    <img 
                      src={img} 
                      alt={`${room.name} ${idx + 2}`} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-room.jpg';
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            )}

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
                    <span><strong className="text-foreground">Vue:</strong> {room.view === "safari" ? "Safari" : room.view === "garden" ? "Jardin" : "Ville"}</span>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold text-foreground mb-2">Caractéristiques</h6>
                  <div className="grid grid-cols-1 gap-2">
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
            {similarRooms.length > 0 && (
              <motion.div {...fadeUp} className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-foreground">Chambres similaires</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {similarRooms.map((sim) => (
                    <div key={sim.slug} className="bg-card border border-border rounded-xl overflow-hidden shadow-hotel-sm">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={sim.images[0]} 
                          alt={sim.name} 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-room.jpg';
                            e.currentTarget.onerror = null;
                          }}
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-semibold text-foreground text-sm line-clamp-2">{sim.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{sim.description}</p>
                        {sim.rating > 0 ? (
                          <div className="flex items-center gap-1 text-xs text-accent">
                            <Star className="w-3.5 h-3.5 fill-accent" />
                            <span className="font-semibold">{sim.rating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">Pas d'avis</div>
                        )}
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
                    Prix: <strong className="text-foreground">{room.formatted_price}</strong> par nuit
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link to="/contact">
                    <CalendarCheck className="w-4 h-4 mr-2" />
                    Réserver maintenant
                  </Link>
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
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}