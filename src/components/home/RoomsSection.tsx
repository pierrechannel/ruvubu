import { Link } from 'react-router-dom';
import { ArrowRight, Users, BedDouble, Square, Star, ArrowDownCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type Room = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  max_guests: number;
  size: number;
  room_type: string;
  rating: number;
  review_count: number;
  primary_image: string;
  formatted_price: string;
};

type ApiResponse = {
  success: boolean;
  rooms: Room[];
  current_page: number;
  last_page: number;
  total: number;
  has_more: boolean;
};

export function RoomsSection() {
  const { t } = useLanguage();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://ruvubu-hotel.com/api/rooms/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success && data.rooms && data.rooms.length > 0) {
        const transformedRooms: Room[] = data.rooms.map(room => ({
          ...room,
          price: parseFloat(room.price.toString()),
          size: parseFloat(room.size.toString()),
          rating: parseFloat(room.rating.toString()) || 0,
        }));
        setRooms(transformedRooms);
      } else {
        setError(t('no_rooms_match'));
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError(t('fetch_error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) {
      return 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop';
    }
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    if (imagePath.startsWith('/storage/')) {
      const cleanPath = imagePath.replace('/storage/', '');
      return `https://ruvubu-hotel.com/storage/${cleanPath}`;
    }
    
    return `https://ruvubu-hotel.com${imagePath}`;
  };

  const getRoomTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      'suite': t('suite'),
      'standard': t('standard_room'),
      'family': t('family_room'),
      'twin': t('twin_room'),
      'bungalow': t('bungalow'),
    };
    return typeMap[type] || type;
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <span className="ml-3">{t('loading_rooms')}</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchRooms} variant="outline">
            {t('retry')}
          </Button>
        </div>
      </section>
    );
  }

  // Take only first 3 rooms for homepage
  const displayRooms = rooms.slice(0, 3);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-2 block">
            {t('accommodation')}
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('your_comfortable_base_home')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('quality_accommodation_comfort')}
          </p>
        </motion.div>

        {/* Room cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={getImageUrl(room.primary_image)}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {room.formatted_price}{t('per_night')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{room.max_guests} {t('people')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BedDouble className="w-4 h-4" />
                    <span>{getRoomTypeLabel(room.room_type)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{room.size} {t('sqm')}</span>
                  </div>
                </div>
                
                <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {room.name}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {room.description === "undefined" 
                    ? `${t('default_room_description')}`
                    : room.description}
                </p>
                
                {/* Rating */}
                {room.rating > 0 ? (
                  <div className="flex items-center gap-1 text-sm text-accent">
                    <Star className="w-4 h-4 fill-accent" />
                    <span className="font-semibold">{room.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">/5</span>
                    {room.review_count > 0 && (
                      <span className="text-muted-foreground ml-1">({room.review_count} {t('reviews')})</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4" />
                    <span>{t('no_reviews_yet')}</span>
                  </div>
                )}
                
                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button asChild variant="outline" className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to="/contact">
                      {t('book')} <ArrowDownCircle className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild className="flex-1" variant="secondary">
                    <Link to={`/chambres/${room.slug}`}>{t('view_details')}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/chambres"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            <span>{t('discover_all_rooms')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}