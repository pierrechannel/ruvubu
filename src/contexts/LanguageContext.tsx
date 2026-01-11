import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  fr: {
    // Header translations
    'home': 'Accueil',
    'rooms': 'Chambres',
    'dining': 'Restaurant',
    'about': 'À Propos',
    'gallery': 'Galerie',
    'contact': 'Contact',
    'book_now': 'Réserver',
    'book_now_mobile': 'Réserver Maintenant',
    'hotel_ruvubu': 'Hôtel Ruvubu',
    'buhumuza_cankuzo': 'Buhumuza, Cankuzo',
    
    // Restaurant page translations
    'restaurant_bar': 'Restaurant & Bar',
    'dining_at_buhumuza': 'Restauration à Buhumuza',
    'dining_description': 'Cuisine burundaise authentique et spécialités internationales, préparées avec des produits sélectionnés. Bar lounge moderne, boissons maison et paniers-repas sur demande.',
    'local_international_cuisine': 'Cuisine locale et internationale',
    'lounge_bar_lemonades': 'Bar lounge & limonades artisanales',
    'picnic_baskets': 'Paniers-repas pour vos excursions',
    'cuisine_quote': 'Une cuisine adaptée à tous les goûts.',
    'our_menu': 'Notre Carte',
    'select_category': 'Sélectionnez une catégorie pour explorer nos saveurs',
    'all': 'Tout',
    'burundian': 'Burundais',
    'international': 'International',
    'special': 'Spécial',
    'previous': 'Précédent',
    'next': 'Suivant',
    'page_of': 'Page {current} sur {total}',
    'no_items': 'Aucun élément de menu disponible pour cette catégorie.',
    'thirsty_after_visits': 'Envie de fraîcheur après vos visites ?',
    'bar_description': 'Découvrez notre bar moderne et nos limonades artisanales après Muyaga, Mishiha ou le Parc Ruvubu.',
    'book_table': 'Réserver une Table',
    'view_bar': 'Voir le Bar',
    'error': 'Erreur',
    'retry': 'Réessayer',
    'loading': 'Chargement...',

    // About page translations
    'about_us': 'À propos',
    'our_heritage_history': 'Notre Patrimoine & Histoire',
    'our_story': 'Notre Histoire',
    'heritage_hospitality': 'Patrimoine & Hospitalité',
    'hero_title': 'Plus qu\'un hôtel, un pont vers l\'âme de Buhumuza.',
    'hero_description_1': 'L\'Hôtel Ruvubu incarne l\'esprit d\'apaisement de Buhumuza. Un refuge pour voyageurs en quête de sérénité et d\'immersion culturelle burundaise.',
    'hero_description_2': 'Porte d\'entrée vers les trésors de l\'Est : église de Muyaga, eaux thermales de Mishiha et Parc National de la Ruvubu. Histoire, nature et culture à portée de main.',
    'hero_description_3': 'Chambres confortables, cuisine raffinée, bar convivial, jardins paisibles : l\'hospitalité burundaise dans chaque détail.',
    'inauguration': 'Inauguration',
    'opening_title': 'Ouverture Officielle',
    'opening_description': 'L\'Hôtel Ruvubu devient la référence de l\'hospitalité à Cankuzo.',
    'tours_title': 'Circuits Touristiques',
    'tours_description': 'Excursions vers Muyaga, Mishiha et le Parc de la Ruvubu avec guides locaux.',
    'discover_region': 'Découvrir la Région',
    'watch_video': 'Voir la Vidéo',
    'excellence': 'L\'Excellence',
    'serving_your_stay': 'Au Service de votre Séjour',
    'gastronomy_title': 'Gastronomie Professionnelle',
    'gastronomy_description': 'Fusion de saveurs burundaises et internationales par nos chefs qualifiés.',
    'cultural_experiences_title': 'Expériences Culturelles',
    'cultural_experiences_description': 'Excursions vers sites historiques et naturels avec accès privilégié aux guides locaux.',
    'burundian_lifestyle_title': 'Art de Vivre Burundais',
    'burundian_lifestyle_description': 'Jardins paysagers et espaces pour mariages, conférences et réceptions.',
    'discover': 'Découvrir',
    'buhumuza_treasures': 'Trésors de Buhumuza',
    'explore_jewels': 'Explorez les joyaux entourant l\'Hôtel Ruvubu',
    'historical_badge': 'Historique',
    'wellness_badge': 'Bien-être',
    'culture_badge': 'Culture',
    'adventure_badge': 'Aventure',
    'muyaga_church_title': 'Première Église de Muyaga',
    'muyaga_church_description': 'Berceau du catholicisme burundais depuis 1889. Architecture coloniale et spiritualité.',
    'muyaga_church_distance': 'À proximité immédiate',
    'mishiha_hot_springs_title': 'Eaux Chaudes de Mishiha',
    'mishiha_hot_springs_description': 'Sources géothermiques naturelles aux vertus curatives et relaxantes.',
    'mishiha_hot_springs_distance': 'Excursion d\'une journée',
    'musugi_cendajuru_title': 'Musugi Cendajuru',
    'musugi_cendajuru_description': 'Site historique de l\'arrivée des premiers missionnaires, mémoire vivante de la région.',
    'musugi_cendajuru_distance': 'Accès facilité',
    'ruvubu_park_title': 'Parc National de la Ruvubu',
    'ruvubu_park_description': 'Safari et observation de la faune : hippopotames, crocodiles, buffles et avifaune.',
    'ruvubu_park_distance': 'Circuit guidé disponible',
    'book_stay_circuit': 'Réserver mon séjour & circuit',
    'garden_image_alt': 'Jardins paisibles de l\'Hôtel Ruvubu à Cankuzo',
    'room_image_alt': 'Chambre spacieuse',

    // Rooms page translations
    'rooms': 'Chambres',
    'your_comfortable_base': 'Votre Base Confortable',
    'loading_rooms': 'Chargement des chambres...',
    'loading_error': 'Erreur de chargement',
    'fetch_error': 'Échec du chargement des chambres',
    'generic_error': 'Une erreur est survenue',
    'price_range': 'Fourchette de Prix',
    'all_prices': 'Tous les Prix',
    'under_50k': 'Moins de 50 000',
    '50k_100k': '50 000 - 100 000',
    '100k_150k': '100 000 - 150 000',
    'over_150k': '150 000+',
    'guest_capacity': 'Capacité d\'Accueil',
    'any_capacity': 'Toute Capacité',
    '1_person': '1 Personne',
    '1_2_people': '1-2 Personnes',
    '3_4_people': '3-4 Personnes',
    '5_people': '5+ Personnes',
    'room_type': 'Type de Chambre',
    'all_rooms': 'Toutes les Chambres',
    'suite': 'Suite',
    'standard_room': 'Chambre Standard',
    'family_room': 'Chambre Familiale',
    'twin_room': 'Chambre Twin',
    'bungalow': 'Bungalow Groupe',
    'sort_by': 'Trier Par',
    'most_popular': 'Les Plus Populaires',
    'price_low_high': 'Prix : Croissant',
    'price_high_low': 'Prix : Décroissant',
    'customer_rating': 'Évaluation Client',
    'room_size': 'Taille de Chambre',
    'people': 'pers.',
    'default_room_description': 'Chambre confortable avec toutes les commodités nécessaires.',
    'reviews': 'avis',
    'no_reviews_yet': 'Pas encore d\'avis',
    'book': 'Réserver',
    'view_details': 'Voir détails',
    'no_rooms_match': 'Aucune chambre ne correspond',
    'adjust_filters': 'Ajustez vos filtres pour voir plus d\'options.',
    'reset_filters': 'Réinitialiser les filtres',
    'view_more_rooms': 'Voir Plus de Chambres',

  },
  en: {
    // Header translations
    'home': 'Home',
    'rooms': 'Rooms',
    'dining': 'Dining',
    'about': 'About',
    'gallery': 'Gallery',
    'contact': 'Contact',
    'book_now': 'Book Now',
    'book_now_mobile': 'Book Now',
    'hotel_ruvubu': 'Hotel Ruvubu',
    'buhumuza_cankuzo': 'Buhumuza, Cankuzo',
    
    // Restaurant page translations
    'restaurant_bar': 'Restaurant & Bar',
    'dining_at_buhumuza': 'Dining at Buhumuza',
    'dining_description': 'Authentic Burundian cuisine and international specialties, prepared with carefully selected products. Modern lounge bar, house-made drinks, and picnic baskets available upon request.',
    'local_international_cuisine': 'Local and international cuisine',
    'lounge_bar_lemonades': 'Lounge bar & artisanal lemonades',
    'picnic_baskets': 'Picnic baskets for your excursions',
    'cuisine_quote': 'A cuisine to suit all tastes.',
    'our_menu': 'Our Menu',
    'select_category': 'Select a category to explore our flavors',
    'all': 'All',
    'burundian': 'Burundian',
    'international': 'International',
    'special': 'Special',
    'previous': 'Previous',
    'next': 'Next',
    'page_of': 'Page {current} of {total}',
    'no_items': 'No menu items available for this category.',
    'thirsty_after_visits': 'Thirsty after your visits?',
    'bar_description': 'Discover our modern bar and artisanal lemonades after visiting Muyaga, Mishiha or Ruvubu Park.',
    'book_table': 'Book a Table',
    'view_bar': 'View the Bar',
    'error': 'Error',
    'retry': 'Retry',
    'loading': 'Loading...',

    // About page translations
    'about_us': 'About',
    'our_heritage_history': 'Our Heritage & History',
    'our_story': 'Our Story',
    'heritage_hospitality': 'Heritage & Hospitality',
    'hero_title': 'More than a hotel, a bridge to the soul of Buhumuza.',
    'hero_description_1': 'Hotel Ruvubu embodies the calming spirit of Buhumuza. A refuge for travelers seeking serenity and Burundian cultural immersion.',
    'hero_description_2': 'Gateway to the treasures of the East: Muyaga Church, Mishiha hot springs, and Ruvubu National Park. History, nature, and culture at your fingertips.',
    'hero_description_3': 'Comfortable rooms, refined cuisine, cozy bar, peaceful gardens: Burundian hospitality in every detail.',
    'inauguration': 'Inauguration',
    'opening_title': 'Official Opening',
    'opening_description': 'Hotel Ruvubu becomes the hospitality reference in Cankuzo.',
    'tours_title': 'Tourist Circuits',
    'tours_description': 'Excursions to Muyaga, Mishiha, and Ruvubu Park with local guides.',
    'discover_region': 'Discover the Region',
    'watch_video': 'Watch Video',
    'excellence': 'Excellence',
    'serving_your_stay': 'Serving Your Stay',
    'gastronomy_title': 'Professional Gastronomy',
    'gastronomy_description': 'Fusion of Burundian and international flavors by our qualified chefs.',
    'cultural_experiences_title': 'Cultural Experiences',
    'cultural_experiences_description': 'Excursions to historical and natural sites with privileged access to local guides.',
    'burundian_lifestyle_title': 'Burundian Lifestyle',
    'burundian_lifestyle_description': 'Landscaped gardens and spaces for weddings, conferences, and receptions.',
    'discover': 'Discover',
    'buhumuza_treasures': 'Buhumuza Treasures',
    'explore_jewels': 'Explore the jewels surrounding Hotel Ruvubu',
    'historical_badge': 'Historical',
    'wellness_badge': 'Wellness',
    'culture_badge': 'Culture',
    'adventure_badge': 'Adventure',
    'muyaga_church_title': 'First Church of Muyaga',
    'muyaga_church_description': 'Birthplace of Burundian Catholicism since 1889. Colonial architecture and spirituality.',
    'muyaga_church_distance': 'In immediate proximity',
    'mishiha_hot_springs_title': 'Mishiha Hot Springs',
    'mishiha_hot_springs_description': 'Natural geothermal springs with curative and relaxing properties.',
    'mishiha_hot_springs_distance': 'One-day excursion',
    'musugi_cendajuru_title': 'Musugi Cendajuru',
    'musugi_cendajuru_description': 'Historical site of the arrival of the first missionaries, living memory of the region.',
    'musugi_cendajuru_distance': 'Easy access',
    'ruvubu_park_title': 'Ruvubu National Park',
    'ruvubu_park_description': 'Safari and wildlife observation: hippopotamuses, crocodiles, buffaloes, and avifauna.',
    'ruvubu_park_distance': 'Guided tour available',
    'book_stay_circuit': 'Book my stay & tour',
    'garden_image_alt': 'Peaceful gardens of Hotel Ruvubu in Cankuzo',
    'room_image_alt': 'Spacious room',

     // Rooms page translations
    // 'rooms': 'Rooms',
    'your_comfortable_base': 'Your Comfortable Base',
    'loading_rooms': 'Loading rooms...',
    'loading_error': 'Loading Error',
    'fetch_error': 'Failed to fetch rooms',
    'generic_error': 'An error occurred',
    'price_range': 'Price Range',
    'all_prices': 'All Prices',
    'under_50k': 'Under 50,000',
    '50k_100k': '50,000 - 100,000',
    '100k_150k': '100,000 - 150,000',
    'over_150k': '150,000+',
    'guest_capacity': 'Guest Capacity',
    'any_capacity': 'Any Capacity',
    '1_person': '1 Person',
    '1_2_people': '1-2 People',
    '3_4_people': '3-4 People',
    '5_people': '5+ People',
    'room_type': 'Room Type',
    'all_rooms': 'All Rooms',
    'suite': 'Suite',
    'standard_room': 'Standard Room',
    'family_room': 'Family Room',
    'twin_room': 'Twin Room',
    'bungalow': 'Group Bungalow',
    'sort_by': 'Sort By',
    'most_popular': 'Most Popular',
    'price_low_high': 'Price: Low to High',
    'price_high_low': 'Price: High to Low',
    'customer_rating': 'Customer Rating',
    'room_size': 'Room Size',
    'people': 'people',
    'default_room_description': 'Comfortable room with all necessary amenities.',
    'reviews': 'reviews',
    'no_reviews_yet': 'No reviews yet',
    'book': 'Book',
    'view_details': 'View details',
    'no_rooms_match': 'No rooms match',
    'adjust_filters': 'Adjust your filters to see more options.',
    'reset_filters': 'Reset filters',
    'view_more_rooms': 'View More Rooms',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage for saved language preference
    const saved = localStorage.getItem('preferredLanguage');
    return (saved === 'fr' || saved === 'en') ? saved : 'fr';
  });

  // Save language preference
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || key;
    
    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};