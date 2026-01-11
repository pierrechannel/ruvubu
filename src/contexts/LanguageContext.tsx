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
    'loading': 'Chargement...'
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
    'loading': 'Loading...'
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