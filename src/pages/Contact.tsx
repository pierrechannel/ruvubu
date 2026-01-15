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
import { useLanguage } from "@/contexts/LanguageContext";

const infoCards = [
  {
    icon: MapPin,
    title_key: "location_title",
    lines_key: ["location_line1", "location_line2"],
    note_key: "location_note",
  },
  {
    icon: Phone,
    title_key: "call_us_title",
    lines_key: ["phone_line1", "phone_line2"],
    note_key: "phone_note",
  },
  {
    icon: Mail,
    title_key: "email_title",
    lines_key: ["email_line1"],
    note_key: "email_note",
  },
];

const faqItems = [
  {
    question_key: "faq1_question",
    answer_key: "faq1_answer",
  },
  {
    question_key: "faq2_question",
    answer_key: "faq2_answer",
  },
  {
    question_key: "faq3_question",
    answer_key: "faq3_answer",
  },
  {
    question_key: "faq4_question",
    answer_key: "faq4_answer",
  },
  {
    question_key: "faq5_question",
    answer_key: "faq5_answer",
  },
];

const socialLinks = [
  { 
    href: "https://facebook.com/ruvubuhotel", 
    label: "Facebook", 
    handle: "@ruvubuhotel", 
    className: "bg-gradient-to-r from-[#1877F2] to-[#0D5AB1]" 
  },
  { 
    href: "https://instagram.com/ruvubuhotel", 
    label: "Instagram", 
    handle: "@ruvubuhotel", 
    className: "bg-gradient-to-r from-[#E4405F] to-[#C13584]" 
  },
  { 
    href: "https://twitter.com/ruvubuhotel", 
    label: "Twitter", 
    handle: "@ruvubuhotel", 
    className: "bg-gradient-to-r from-[#1DA1F2] to-[#0D8BD9]" 
  },
  { 
    href: "https://www.tripadvisor.com/Hotel_Review-g1234567-d1234567-Reviews-Ruvubu_Hotel-Cankuzo_Cankuzo_Province.html", 
    label: "TripAdvisor", 
    handle_key: "tripadvisor_handle",
    className: "bg-gradient-to-r from-[#34E0A1] to-[#00A680]" 
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Contact() {
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Page title / breadcrumb */}
      <section className="bg-secondary/30 py-10 px-6 md:px-8 lg:px-12 border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">
              {t('contact')}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t('contact_us')}
            </h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground">{t('contact')}</span>
          </nav>
        </div>
      </section>

      <section className="py-16 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto px-4 space-y-12">
          {/* Heading */}
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-sm uppercase tracking-[0.18em] text-accent font-semibold">
              {t('contact_us')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t('connect_with_hotel')}
            </h2>
            <p className="text-muted-foreground">
              {t('contact_description')}
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
                title={t('map_title')}
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
                  {t('open_in_google_maps')}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div {...fadeUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infoCards.map((card) => (
              <div
                key={card.title_key}
                className="bg-card border border-border rounded-2xl p-6 text-center shadow-hotel-sm hover:shadow-hotel-lg transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <card.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {t(card.title_key)}
                </h4>
                {card.lines_key.map((lineKey) => (
                  <p key={lineKey} className="text-sm text-muted-foreground">
                    {t(lineKey)}
                  </p>
                ))}
                {card.note_key && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {t(card.note_key)}
                  </p>
                )}
              </div>
            ))}
          </motion.div>

          {/* Form + side info */}
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <motion.div {...fadeUp} className="lg:col-span-2 bg-card border border-border rounded-2xl p-8 shadow-hotel-md space-y-4">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {t('send_message_title')}
              </h3>
              <p className="text-muted-foreground">
                {t('send_message_description')}
              </p>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('full_name')} *
                    </label>
                    <input className="w-full rounded-lg border border-border bg-background px-3 py-2" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('email_address')} *
                    </label>
                    <input type="email" className="w-full rounded-lg border border-border bg-background px-3 py-2" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('phone_number')}
                    </label>
                    <input className="w-full rounded-lg border border-border bg-background px-3 py-2" placeholder={t('phone_placeholder')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('country')}
                    </label>
                    <input className="w-full rounded-lg border border-border bg-background px-3 py-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('subject')} *
                  </label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2" required>
                    <option value="">{t('select_subject')}</option>
                    <option value="reservation">{t('room_booking')}</option>
                    <option value="heritage_tour">{t('heritage_tour_request')}</option>
                    <option value="event">{t('event_conference')}</option>
                    <option value="restaurant">{t('restaurant_booking')}</option>
                    <option value="group_booking">{t('group_booking')}</option>
                    <option value="general">{t('general_inquiry')}</option>
                    <option value="feedback">{t('feedback')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('your_message')} *
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 min-h-[140px]"
                    required
                    maxLength={1000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('message_placeholder')}
                  />
                  <div className="text-right text-xs text-muted-foreground">
                    {message.length}/1000
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border" />
                  {t('newsletter_consent')}
                </label>

                <Button type="button" className="w-full md:w-auto">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('send_message_button')}
                </Button>
              </form>
            </motion.div>

            <motion.div {...fadeUp} className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm space-y-4">
                <h4 className="font-serif text-xl font-semibold text-foreground">
                  {t('how_to_find_us')}
                </h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <strong className="text-foreground">{t('address_label')}:</strong>
                      <p>{t('address_details')}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Compass className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <strong className="text-foreground">{t('landmarks_label')}:</strong>
                      <p>{t('landmarks_details')}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Globe className="w-4 h-4 text-accent mt-0.5" />
                    <div>
                      <strong className="text-foreground">{t('transport_label')}:</strong>
                      <p>{t('transport_details')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm space-y-4">
                <h4 className="font-serif text-xl font-semibold text-foreground">
                  {t('quick_actions')}
                </h4>
                <div className="grid gap-3">
                  <Link to="/contact" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors">
                    <CalendarCheck className="w-4 h-4" />
                    <span>{t('book_room')}</span>
                  </Link>
                  <Link to="/chambres" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors">
                    <DoorOpen className="w-4 h-4" />
                    <span>{t('view_rooms')}</span>
                  </Link>
                  <Link to="/a-propos" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors">
                    <Info className="w-4 h-4" />
                    <span>{t('our_story')}</span>
                  </Link>
                  <Link to="/galerie" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors">
                    <Images className="w-4 h-4" />
                    <span>{t('gallery')}</span>
                  </Link>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm space-y-3 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Headset className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-foreground">
                  {t('immediate_help')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('reception_24_7')}
                </p>
                <div className="space-y-2">
                  <a href="tel:+25766307160" className="block text-primary font-semibold">
                    +257 66 307 160
                  </a>
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
              <span className="text-sm uppercase tracking-[0.18em] text-accent font-semibold">
                {t('faq_title')}
              </span>
              <h3 className="font-serif text-3xl font-bold text-foreground">
                {t('frequently_asked_questions')}
              </h3>
              <p className="text-muted-foreground">
                {t('faq_description')}
              </p>
            </div>

            <div className="space-y-3 max-w-4xl mx-auto">
              {faqItems.map((item, idx) => {
                const open = openFaq === idx;
                return (
                  <div key={item.question_key} className="border border-border rounded-lg bg-card">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : idx)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left gap-3"
                    >
                      <span className="font-medium text-foreground">
                        {t(item.question_key)}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground">
                        {t(item.answer_key)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center space-x-3">
              <Button asChild variant="outline">
                <Link to="/a-propos">
                  {t('learn_more_about_us')}
                </Link>
              </Button>
              <Button asChild>
                <Link to="/chambres">
                  {t('view_our_rooms')}
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp} className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-sm uppercase tracking-[0.18em] text-accent font-semibold">
                {t('follow_us')}
              </span>
              <h3 className="font-serif text-3xl font-bold text-foreground">
                {t('connect_on_social_media')}
              </h3>
              <p className="text-muted-foreground">
                {t('social_media_description')}
              </p>
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
                  className={`block rounded-2xl text-white p-6 text-center shadow-hotel-lg hover:shadow-hotel-xl transition-transform hover:-translate-y-1 ${link.className}`}
                >
                  <div className="text-lg font-semibold">{link.label}</div>
                  <div className="text-sm opacity-90">
                    {link.handle_key ? t(link.handle_key) : link.handle}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}