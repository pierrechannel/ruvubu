import { Link } from 'react-router-dom';
import { ArrowRight, Users, Wifi, Bath, Tv, Star, Loader2, Home, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type RoomTag = {
  name: string;
  type: string;
};

type Room = {
  id: number;
  name: string;
  slug: string;
  description: string;
  formatted_price: string;
  price: string;
  max_guests: number;
  size: string;
  view_type: string;
  room_type: string;
  rating: string;
  review_count: number;
  stars_html: string;
  is_featured: boolean;
  primary_image: string;
  tags: RoomTag[];
};

type ApiResponse = {
  success: boolean;
  rooms: Room[];
  current_page: number;
  last_page: number;
  total: number;
  has_more: boolean;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'wifi': Wifi,
  'wifi gratuit': Wifi,
  'tv': Tv,
  'télévision': Tv,
  'salle de bain': Bath,
  'salle de bain privée': Bath,
  'douche': Bath,
  'espace': Maximize2,
  'taille': Maximize2,
  'capacité': Users,
  'vue': Home,
};

export function RoomsSection() {
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
        setRooms(data.rooms);
      } else {
        setError('No rooms available');
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError(err instanceof Error ? err.message : 'Failed to load rooms');
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

  const getAmenitiesFromTags = (tags: RoomTag[]) => {
    const amenities: string[] = [];
    
    // Add standard amenities based on tags
    tags.forEach(tag => {
      const tagName = tag.name.toLowerCase();
      if (tagName.includes('wifi')) {
        amenities.push('WiFi Gratuit');
      } else if (tagName.includes('tv') || tagName.includes('télévision')) {
        amenities.push('TV');
      } else if (tagName.includes('vue') || tag.type === 'garden') {
        amenities.push('Vue sur Jardin');
      } else if (tagName.includes('taille') || tag.type === 'value') {
        amenities.push('Meilleur Rapport Qualité/Prix');
      }
    });
    
    // Add default amenities for all rooms
    if (!amenities.includes('WiFi Gratuit')) amenities.push('WiFi Gratuit');
    if (!amenities.includes('Salle de Bain Privée')) amenities.push('Salle de Bain Privée');
    if (!amenities.includes('TV')) amenities.push('TV');
    
    return amenities.slice(0, 4); // Limit to 4 amenities for display
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    if (isNaN(numRating)) return null;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < Math.floor(numRating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          ({numRating.toFixed(1)})
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
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
            Réessayer
          </Button>
        </div>
      </section>
    );
  }

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
            Hébergement
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Nos Chambres Spacieuses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hébergement de qualité et confort au cœur de Buhumuza
          </p>
        </motion.div>

        {/* Room cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => {
            const amenities = getAmenitiesFromTags(room.tags);
            
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
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
                    {room.formatted_price}/nuit
                  </div>
                  {room.is_featured && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Recommandée
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Users className="w-4 h-4" />
                      <span>{room.max_guests} personne{room.max_guests > 1 ? 's' : ''}</span>
                    </div>
                    {renderStars(room.rating)}
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {room.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {room.description === "undefined" 
                      ? `Chambre ${room.room_type} confortable avec ${room.view_type} pour un séjour mémorable à Buhumuza.`
                      : room.description}
                  </p>

                  {/* Room details */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-muted-foreground">
                    {room.size && (
                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        <span>{room.size} m²</span>
                      </div>
                    )}
                    {room.view_type && (
                      <div className="flex items-center gap-1">
                        <Home className="w-3 h-3" />
                        <span>Vue {room.view_type}</span>
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {amenities.map((amenity) => {
                      const Icon = iconMap[amenity.toLowerCase().split(' ')[0]] || Wifi;
                      return (
                        <span
                          key={amenity}
                          className="inline-flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-md"
                          title={amenity}
                        >
                          <Icon className="w-3 h-3" />
                          <span className="max-w-[80px] truncate">{amenity}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Tags */}
                  {room.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {room.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag.name}
                          className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={`/chambres/${room.slug}`} className="flex items-center justify-center">
                      Réserver maintenant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
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
            <span>Découvrir Toutes Nos Chambres</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}