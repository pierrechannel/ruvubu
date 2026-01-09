import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  CalendarCheck,
  DoorOpen,
  Info,
  Images,
  Headset,
  MessageCircle,
  CheckCircle,
  ChevronDown,
  Globe,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";

const infoCards = [
  {
    icon: MapPin,
    title: "Notre Localisation",
    lines: ["Cankuzo, Province de Buhumuza", "Burundi, Afrique de l'Est"],
    note: "Près de l'entrée du Parc National de la Ruvubu",
  },
  {
    icon: Phone,
    title: "Appelez-nous",
    lines: ["+257 66 307 160", "+257 69 671 060"],
    note: "WhatsApp disponible",
  },
  {
    icon: Mail,
    title: "Envoyez-nous un Email",
    lines: ["ruvubuhotel@gmail.com"],
    note: "Réponse sous 24 heures",
  },
];

const faqItems = [
  {
    question: "Comment se rendre à l'Hôtel Ruvubu depuis Bujumbura ?",
    answer:
      "Depuis l'Aéroport International de Bujumbura, il y a environ 4 heures de route jusqu'à Cankuzo. Nous proposons des transferts sur demande. Vous pouvez aussi prendre un bus jusqu'à Cankuzo puis un taxi jusqu'à l'hôtel.",
  },
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer:
      "Espèces (BIF, USD), virements bancaires, Visa, MasterCard. Pour les réservations internationales, des options en ligne sécurisées peuvent être proposées.",
  },
  {
    question: "Proposez-vous des visites guidées des sites patrimoniaux ?",
    answer:
      "Oui, visites guidées de Muyaga, Musugi Cendajuru, sources chaudes de Mishiha et Parc National de la Ruvubu. Guides locaux, transport et repas disponibles.",
  },
  {
    question: "Quelles installations pour les réunions d'affaires ?",
    answer:
      "Salle de conférence (jusqu'à 100 pers), WiFi, projecteur/son, paperboards, restauration, salles de sous-groupes et hébergement des délégués.",
  },
  {
    question: "Gérez-vous les restrictions alimentaires ?",
    answer:
      "Oui. Régimes végétarien, végétalien, sans gluten, halal et autres sur demande. Indiquez vos besoins lors de la réservation.",
  },
];

const socialLinks = [
  { href: "https://facebook.com/ruvubuhotel", label: "Facebook", handle: "@ruvubuhotel", className: "bg-gradient-to-r from-[#1877F2] to-[#0D5AB1]" },
  { href: "https://instagram.com/ruvubuhotel", label: "Instagram", handle: "@ruvubuhotel", className: "bg-gradient-to-r from-[#E4405F] to-[#C13584]" },
  { href: "https://twitter.com/ruvubuhotel", label: "Twitter", handle: "@ruvubuhotel", className: "bg-gradient-to-r from-[#1DA1F2] to-[#0D8BD9]" },
  { href: "https://www.tripadvisor.com/Hotel_Review-g1234567-d1234567-Reviews-Ruvubu_Hotel-Cankuzo_Cankuzo_Province.html", label: "TripAdvisor", handle: "Lire les avis", className: "bg-gradient-to-r from-[#34E0A1] to-[#00A680]" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Contact() {
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <Layout>
      {/* Page title / breadcrumb */}
      <section className="bg-secondary/30 py-10 border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">Contact</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Nous Contacter</h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Contact</span>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 space-y-12">
          {/* Heading */}
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-3">
            <span className="description-title">Contactez-nous</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Connectez-vous avec l'Hôtel Ruvubu</h2>
            <p className="text-muted-foreground">
              Votre porte d'entrée vers l'hospitalité de Buhumuza et les expériences du patrimoine culturel.
            </p>
          </motion.div>

          {/* Map */}
          <motion.div {...fadeUp} className="rounded-2xl overflow-hidden border border-border shadow-hotel-md">
            <div className="relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.296470867116!2d30.552037576645298!3d-3.2114209383644035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dbb15c11111111%3A0x8a4b5e6b3c2d1e0f!2sRuvubu%20Hotel%2C%20Cankuzo%2C%20Burundi!5e0!3m2!1sen!2sus!4v1621234567890!5m2!1sen!2sus"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Emplacement de l'Hôtel Ruvubu à Cankuzo, Burundi"
                allowFullScreen
              />
              <div className="absolute bottom-4 inset-x-0 flex justify-center">
                <a
                  href="https://maps.app.goo.gl/aVfZ86aNFak5YPtW7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-card text-foreground px-4 py-2 rounded-lg border border-border shadow-hotel-sm hover:border-accent hover:text-accent transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  Ouvrir dans Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div {...fadeUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="bg-card border border-border rounded-2xl p-6 text-center shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <card.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2">{card.title}</h4>
                {card.lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">{line}</p>
                ))}
                {card.note && <p className="text-xs text-muted-foreground mt-2">{card.note}</p>}
              </div>
            ))}
          </motion.div>

          {/* Form + side info */}
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <motion.div {...fadeUp} className="lg:col-span-2 bg-card border border-border rounded-2xl p-8 shadow-hotel-md space-y-4">
              <h3 className="font-serif text-2xl font-bold text-foreground">Envoyez-nous un Message</h3>
              <p className="text-muted-foreground">
                Des questions sur nos chambres, visites patrimoniales ou installations événementielles ? Remplissez le formulaire et nous répondons sous 24h.
              </p>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom Complet *</label>
                    <input className="w-full rounded-lg border border-border bg-background px-3 py-2" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Adresse Email *</label>
                    <input type="email" className="w-full rounded-lg border border-border bg-background px-3 py-2" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Numéro de Téléphone</label>
                    <input className="w-full rounded-lg border border-border bg-background px-3 py-2" placeholder="+257 79 123 456" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pays</label>
                    <input className="w-full rounded-lg border border-border bg-background px-3 py-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sujet *</label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2" required>
                    <option value="">Sélectionnez un sujet</option>
                    <option value="reservation">Réservation de Chambre</option>
                    <option value="heritage_tour">Demande de Visite Patrimoniale</option>
                    <option value="event">Événement & Conférence</option>
                    <option value="restaurant">Réservation Restaurant</option>
                    <option value="group_booking">Réservation de Groupe</option>
                    <option value="general">Demande Générale</option>
                    <option value="feedback">Retour d'Expérience</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Votre Message *</label>
                  <textarea
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 min-h-[140px]"
                    required
                    maxLength={1000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Dites-nous comment nous pouvons vous aider à vivre l'hospitalité de Buhumuza..."
                  />
                  <div className="text-right text-xs text-muted-foreground">{message.length}/1000</div>
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border" />
                  Je souhaite recevoir les nouvelles et offres spéciales de l'Hôtel Ruvubu
                </label>

                <Button type="button" className="w-full md:w-auto">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Envoyer le Message
                </Button>
              </form>
            </motion.div>

            <motion.div {...fadeUp} className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm space-y-4">
                <h4 className="font-serif text-xl font-semibold text-foreground">Comment Nous Trouver</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <strong className="text-foreground">Adresse :</strong>
                      <p>Hôtel Ruvubu, Cankuzo<br />Province de Buhumuza, Burundi</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Compass className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <strong className="text-foreground">Points de repère :</strong>
                      <p>25 km du Parc National de la Ruvubu<br />4 km de la Première Église de Muyaga<br />25 km des Sources Chaudes de Mishiha</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Globe className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <strong className="text-foreground">Transport :</strong>
                      <p>Transferts depuis Bujumbura possibles. Contactez-nous pour organiser le transport.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm space-y-4">
                <h4 className="font-serif text-xl font-semibold text-foreground">Actions Rapides</h4>
                <div className="grid gap-3">
                  <Link to="/contact" className="action-btn">
                    <CalendarCheck className="w-4 h-4" />
                    <span>Réserver une Chambre</span>
                  </Link>
                  <Link to="/chambres" className="action-btn">
                    <DoorOpen className="w-4 h-4" />
                    <span>Voir nos Chambres</span>
                  </Link>
                  <Link to="/a-propos" className="action-btn">
                    <Info className="w-4 h-4" />
                    <span>Notre Histoire</span>
                  </Link>
                  <Link to="/galerie" className="action-btn">
                    <Images className="w-4 h-4" />
                    <span>Galerie</span>
                  </Link>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm space-y-3 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Headset className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-foreground">Besoin d'Aide Immédiate ?</h4>
                <p className="text-sm text-muted-foreground">Réception 24/7 prête à vous aider</p>
                <div className="space-y-2">
                  <a href="tel:+25766307160" className="block text-primary font-semibold">+257 66 307 160</a>
                  <a href="https://wa.me/25769671060" target="_blank" rel="noreferrer" className="block text-green-600 font-semibold hover:text-green-700 transition-colors">
                    WhatsApp : +257 69 671 060
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ */}
          <motion.div {...fadeUp} className="bg-secondary/30 border border-border rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="description-title">FAQ</span>
              <h3 className="font-serif text-3xl font-bold text-foreground">Questions Fréquemment Posées</h3>
              <p className="text-muted-foreground">Questions courantes sur nos services et installations</p>
            </div>

            <div className="space-y-3 max-w-4xl mx-auto">
              {faqItems.map((item, idx) => {
                const open = openFaq === idx;
                return (
                  <div key={item.question} className="border border-border rounded-lg bg-card">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : idx)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left gap-3"
                    >
                      <span className="font-medium text-foreground">{item.question}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center space-x-3">
              <Button asChild variant="outline">
                <Link to="/a-propos">En savoir plus sur nous</Link>
              </Button>
              <Button asChild>
                <Link to="/chambres">Voir nos Chambres</Link>
              </Button>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp} className="space-y-6">
            <div className="text-center space-y-2">
              <span className="description-title">Suivez-nous</span>
              <h3 className="font-serif text-3xl font-bold text-foreground">Connectez-vous sur les Réseaux Sociaux</h3>
              <p className="text-muted-foreground">Restez informé de nos dernières nouvelles, offres et événements culturels</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 * idx }}
                  className={`social-link block rounded-2xl text-white p-6 text-center shadow-hotel-lg hover:shadow-hotel-xl transition-transform hover:-translate-y-1 ${link.className}`}
                >
                  <div className="text-lg font-semibold">{link.label}</div>
                  <div className="text-sm opacity-90">{link.handle}</div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
