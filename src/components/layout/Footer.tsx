import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-serif text-xl font-bold">HR</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Hôtel Ruvubu</h3>
                <p className="text-xs text-primary-foreground/70">Buhumuza, Cankuzo</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Votre havre de paix au cœur du Burundi. Découvrez l'hospitalité légendaire de Buhumuza 
              dans un cadre authentique et chaleureux.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/chambres" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Nos Chambres
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/galerie" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Galerie Photos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Contact & Réservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Nos Services</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>Chambres Spacieuses</li>
              <li>Restaurant Professionnel</li>
              <li>Bar & Jardins</li>
              <li>Salles d'Événements</li>
              <li>Excursions Touristiques</li>
              <li>WiFi Gratuit</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  Buhumuza, Cankuzo<br />Burundi
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:+25779123456" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  +257 79 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:info@hotelruvubu.com" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  info@hotelruvubu.com
                </a>
              </li>
            </ul>

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors group">
                <Facebook className="w-5 h-5 group-hover:text-accent-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors group">
                <Instagram className="w-5 h-5 group-hover:text-accent-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors group">
                <Twitter className="w-5 h-5 group-hover:text-accent-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 Hôtel Ruvubu. Tous droits réservés.</p>
            <p>Conçu avec ❤️ au Burundi</p>
          </div>
        </div>
      </div>
    </footer>
  );
}