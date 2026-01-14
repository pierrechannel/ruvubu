import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart, CalendarCheck, Send, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Merci de vous être abonné à notre newsletter !');
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-primary text-primary-foreground relative">
        {/* Main footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Contact Info */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-4">
                <h2 className="font-serif text-2xl font-bold">Hôtel Ruvubu</h2>
              </Link>
              <div className="space-y-2">
                <p className="flex items-start gap-2 text-sm text-primary-foreground/80">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Buhumuza Burundi, Commune Cankuzo, Quartier Résidentiel</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href="mailto:info@ruvubu-hotel.com" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    info@ruvubu-hotel.com
                  </a>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:+25769671060" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    +257 69 671 060
                  </a>
                </p>
              </div>
            </div>

            {/* Explorer Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6">Explorer</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/a-propos" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link to="/chambres" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                    Chambres
                  </Link>
                </li>
                <li>
                  <Link to="/galerie" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                    Galerie
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6">Nos Services</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                <li><Link to="/chambres" className="hover:text-accent transition-colors">Service en chambre</Link></li>
                <li><Link to="/restaurant" className="hover:text-accent transition-colors">Restaurant</Link></li>
                <li><Link to="/evenements" className="hover:text-accent transition-colors">Événements & Banquets</Link></li>
                <li><a href="#" className="hover:text-accent transition-colors">Spa & Bien-être</a></li>
                <li><Link to="/galerie" className="hover:text-accent transition-colors">Salles de conférence</Link></li>
              </ul>
            </div>

            {/* Social & Legal */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6">Réseaux sociaux</h4>
              <div className="flex gap-3 mb-6">
                <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors group">
                  <Twitter className="w-5 h-5 group-hover:text-accent-foreground" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors group">
                  <Facebook className="w-5 h-5 group-hover:text-accent-foreground" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors group">
                  <Instagram className="w-5 h-5 group-hover:text-accent-foreground" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors group">
                  <Linkedin className="w-5 h-5 group-hover:text-accent-foreground" />
                </a>
              </div>
              
              <h4 className="font-serif text-lg font-semibold mb-4 mt-6">Légal</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Politique des cookies</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Accessibilité</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-center lg:text-left">
                <div className="text-sm text-primary-foreground/60 mb-2">
                  &copy; Copyright <strong>Hôtel Ruvubu</strong>. {currentYear} Tous droits réservés
                </div>
                <div className="text-sm text-primary-foreground/60 flex items-center justify-center lg:justify-start gap-1">
                  Conçu avec <Heart className="w-4 h-4 text-red-500 fill-red-500" /> par{' '}
                  <a href="https://npcode.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    NpCode
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Language Selector */}
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
                
                {/* Newsletter */}
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="px-3 py-2 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent w-full md:w-auto"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-3 py-2 bg-primary-foreground/10 hover:bg-accent border border-primary-foreground/20 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                
                {/* Book Now */}
                <Link 
                  to="/chambres"
                  className="px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Réserver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-accent text-accent-foreground rounded-lg flex items-center justify-center shadow-lg hover:bg-accent/90 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}