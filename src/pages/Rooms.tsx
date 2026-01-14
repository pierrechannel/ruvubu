import { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDownCircle, BedDouble, Users, Star, Square, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type RoomType = "suite" | "standard" | "family" | "twin" | "bungalow";

type Room = {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  guests: number;
  type: RoomType;
  size: number;
  rating: number;
  image: string;
  review_count: number;
};

type ApiRoom = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  max_guests: number;
  size: string;
  room_type: string;
  rating: string;
  review_count: number;
  primary_image: string;
};

type PriceFilter = "all" | "under-50k" | "50k-100k" | "100k-150k" | "over-150k";
type GuestsFilter = "any" | "1" | "2" | "3" | "5";
type SortFilter = "popular" | "price_low" | "price_high" | "rating" | "size";

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<PriceFilter>("all");
  const [guests, setGuests] = useState<GuestsFilter>("any");
  const [type, setType] = useState<RoomType | "all">("all");
  const [sort, setSort] = useState<SortFilter>("popular");
  const [visible, setVisible] = useState(6);
  
  const { t } = useLanguage();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://ruvubu-hotel.com/api/rooms");
        if (!response.ok) throw new Error(t('fetch_error'));
        const data = await response.json();
        
        const transformedRooms: Room[] = data.rooms.map((room: ApiRoom) => ({
          id: room.id,
          slug: room.slug,
          title: room.name,
          description: room.description === "undefined" ? t('default_room_description') : room.description,
          price: parseFloat(room.price),
          guests: room.max_guests,
          type: room.room_type as RoomType,
          size: parseFloat(room.size),
          rating: parseFloat(room.rating) || 0,
          image: `https://ruvubu-hotel.com${room.primary_image}`,
          review_count: room.review_count
        }));
        
        setRooms(transformedRooms);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('generic_error'));
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

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
  }, [rooms, price, guests, type, sort]);

  const visibleRooms = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const formatPrice = (price: number) => {
    return price.toLocaleString(t('locale') === 'fr' ? 'fr-FR' : 'en-US') + ' FBu';
  };

  return (
    <Layout>
      {/* Page title / breadcrumb */}
      <section className="bg-secondary/30 py-10 px-6 md:px-8 lg:px-12border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">
              {t('rooms')}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t('your_comfortable_base')}
            </h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground">{t('rooms')}</span>
          </nav>
        </div>
      </section>

      <section className="py-16 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto px-4 space-y-8">
          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">{t('loading_rooms')}</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-destructive/10 border border-destructive/30 rounded-2xl p-8"
            >
              <h4 className="font-serif text-xl font-semibold text-destructive mb-2">
                {t('loading_error')}
              </h4>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                {t('retry')}
              </Button>
            </motion.div>
          )}

          {/* Filters */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {t('price_range')} (FBu)
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                  value={price}
                  onChange={(e) => setPrice(e.target.value as PriceFilter)}
                >
                  <option value="all">{t('all_prices')}</option>
                  <option value="under-50k">{t('under_50k')}</option>
                  <option value="50k-100k">{t('50k_100k')}</option>
                  <option value="100k-150k">{t('100k_150k')}</option>
                  <option value="over-150k">{t('over_150k')}</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {t('guest_capacity')}
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value as GuestsFilter)}
                >
                  <option value="any">{t('any_capacity')}</option>
                  <option value="1">{t('1_person')}</option>
                  <option value="2">{t('1_2_people')}</option>
                  <option value="3">{t('3_4_people')}</option>
                  <option value="5">{t('5_people')}</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {t('room_type')}
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                  value={type}
                  onChange={(e) => setType(e.target.value as RoomType | "all")}
                >
                  <option value="all">{t('all_rooms')}</option>
                  <option value="suite">{t('suite')}</option>
                  <option value="standard">{t('standard_room')}</option>
                  <option value="family">{t('family_room')}</option>
                  <option value="twin">{t('twin_room')}</option>
                  <option value="bungalow">{t('bungalow')}</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {t('sort_by')}
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortFilter)}
                >
                  <option value="popular">{t('most_popular')}</option>
                  <option value="price_low">{t('price_low_high')}</option>
                  <option value="price_high">{t('price_high_low')}</option>
                  <option value="rating">{t('customer_rating')}</option>
                  <option value="size">{t('room_size')}</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Grid */}
          {!loading && !error && (
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
                      {/* {formatPrice(room.price)} */}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{room.guests} {t('people')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-4 h-4" />
                        <span>{t(room.type)}</span>
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
                    {room.rating > 0 ? (
                      <div className="flex items-center gap-1 text-sm text-accent">
                        <Star className="w-4 h-4 fill-accent" />
                        <span className="font-semibold">{room.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">/5</span>
                        {room.review_count > 0 && (
                          <span className="text-muted-foreground ml-1">
                            ({room.review_count} {t('reviews')})
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4" />
                        <span>{t('no_reviews_yet')}</span>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Button asChild variant="outline" className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Link to="/contact">
                          {t('book')} <ArrowDownCircle className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button asChild className="flex-1" variant="secondary">
                        <Link to={`/chambres/${room.slug}`}>
                          {t('view_details')}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-secondary/40 border border-border rounded-2xl p-8"
            >
              <h4 className="font-serif text-xl font-semibold text-foreground mb-2">
                {t('no_rooms_match')}
              </h4>
              <p className="text-muted-foreground mb-4">
                {t('adjust_filters')}
              </p>
              <Button onClick={() => { setPrice("all"); setGuests("any"); setType("all"); setSort("popular"); }}>
                {t('reset_filters')}
              </Button>
            </motion.div>
          )}

          {/* Load more */}
          {!loading && !error && hasMore && (
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
                {t('view_more_rooms')}
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}