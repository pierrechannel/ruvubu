import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Chambres', href: '/chambres' },
  { name: 'À Propos', href: '/a-propos' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-background/98 backdrop-blur-xl border-b border-border shadow-lg" 
        : "bg-background/95 backdrop-blur-md border-b border-border/50"
    )}>
      {/* Top bar */}
      <div className="hidden md:block bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-2.5">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+25779123456" className="flex items-center gap-2 hover:text-accent transition-colors group">
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>+257 79 123 456</span>
            </a>
            <a href="mailto:info@hotelruvubu.com" className="flex items-center gap-2 hover:text-accent transition-colors group">
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>info@hotelruvubu.com</span>
            </a>
          </div>
          <p className="text-primary-foreground/90 font-medium">Bienvenue à Buhumuza, Cankuzo</p>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-serif text-xl font-bold">HR</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Hôtel Ruvubu
              </h1>
              <p className="text-xs text-muted-foreground">Buhumuza, Cankuzo</p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.name}
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/contact">Réserver</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-border pt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-base font-medium transition-all duration-300 px-4 py-3 rounded-lg",
                      location.pathname === item.href
                        ? "text-primary bg-primary/10 border-l-4 border-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 mt-2 mx-4">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Réserver Maintenant
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}