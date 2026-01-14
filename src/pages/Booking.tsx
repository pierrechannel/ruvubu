import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Maximize2, Eye, Heart, Shield, CreditCard, CalendarDays, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface Room {
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
  tags: Array<{
    name: string;
    type: string;
  }>;
}

const amenities = [
  { icon: "✓", text: "Free WiFi" },
  { icon: "✓", text: "Air Conditioning" },
  { icon: "✓", text: "Private Bathroom" },
  { icon: "✓", text: "Daily Housekeeping" },
  { icon: "✓", text: "Garden View" },
  { icon: "✓", text: "24/7 Reception" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Booking() {
  const { t, language } = useLanguage();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 2)),
  });
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [nights, setNights] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Simulate API call with provided data
    const fetchRooms = async () => {
      setIsLoading(true);
      // Using the provided JSON data directly
      const data = {
        success: true,
        rooms: [
          {
            id: 11,
            name: "Chambre standard",
            slug: "chambre-standard-xile43",
            description: "undefined",
            formatted_price: "FBu 40,000",
            price: "40000.00",
            max_guests: 2,
            size: "12.00",
            view_type: "garden",
            room_type: "standard",
            rating: "0.00",
            review_count: 0,
            stars_html: "<i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i>",
            is_featured: false,
            primary_image: "/storage/room_images/MNk8ceaDRpHOIV4Q0jL7QXPJPhv3soUfCF2HWYAD.jpg",
            tags: [
              { name: "Garden View", type: "garden" },
              { name: "Best Value", type: "value" }
            ]
          },
          {
            id: 12,
            name: "Chambre double",
            slug: "chambre-double-ogCvyk",
            description: "undefined",
            formatted_price: "FBu 50,000",
            price: "50000.00",
            max_guests: 2,
            size: "14.00",
            view_type: "garden",
            room_type: "standard",
            rating: "0.00",
            review_count: 0,
            stars_html: "<i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i>",
            is_featured: false,
            primary_image: "/storage/room_images/XYgmtmVxjbmgZal9vYLuVnYtmH7Or03VOs2WEE7u.png",
            tags: [
              { name: "Garden View", type: "garden" },
              { name: "Best Value", type: "value" }
            ]
          },
          {
            id: 13,
            name: "Suite",
            slug: "suite-w5mcRp",
            description: "wifi",
            formatted_price: "FBu 80,000",
            price: "80000.00",
            max_guests: 2,
            size: "12.00",
            view_type: "garden",
            room_type: "suite",
            rating: "0.00",
            review_count: 0,
            stars_html: "<i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i>",
            is_featured: false,
            primary_image: "/storage/room_images/wfUVr2HZZdFnSlRVkhaplONwBJUZiSDJ6scZpwZI.png",
            tags: [
              { name: "Garden View", type: "garden" }
            ]
          }
        ]
      };
      
      setRooms(data.rooms);
      setSelectedRoom(data.rooms[0]);
      setIsLoading(false);
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (date?.from && date?.to) {
      const diffTime = Math.abs(date.to.getTime() - date.from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    }
  }, [date]);

  const calculateTotal = (roomPrice: string) => {
    const price = parseFloat(roomPrice);
    return price * nights;
  };

  const formatCurrency = (amount: number) => {
    return `FBu ${amount.toLocaleString("fr-FR")}`;
  };

  const handleBooking = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Handle final booking submission
      console.log("Booking submitted:", {
        room: selectedRoom,
        date,
        guests: { adults, children },
        total: selectedRoom ? calculateTotal(selectedRoom.price) : 0,
      });
      alert(t("booking_confirmation_message"));
    }
  };

  return (
    <Layout>
      {/* Page header */}
      <section className="bg-secondary/30 py-10 border-b border-border/60">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-2">
              {t("reservation")}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t("book_your_stay")}
            </h1>
          </div>
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <a href="/" className="hover:text-primary transition-colors">
              {t("home")}
            </a>
            <span className="text-border">/</span>
            <a href="/rooms" className="hover:text-primary transition-colors">
              {t("rooms")}
            </a>
            <span className="text-border">/</span>
            <span className="text-foreground">{t("booking")}</span>
          </nav>
        </div>
      </section>

      {/* Main booking content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Progress steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center max-w-2xl mx-auto">
              <div className={`flex items-center ${step >= 1 ? "text-accent" : "text-muted-foreground"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-accent bg-accent/10" : "border-border"}`}>
                  <span className="font-semibold">1</span>
                </div>
                <span className="ml-2 font-medium">{t("select_room")}</span>
              </div>
              <div className="w-24 h-0.5 mx-4 bg-border"></div>
              <div className={`flex items-center ${step >= 2 ? "text-accent" : "text-muted-foreground"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-accent bg-accent/10" : "border-border"}`}>
                  <span className="font-semibold">2</span>
                </div>
                <span className="ml-2 font-medium">{t("guest_details")}</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - Booking form */}
            <div className="lg:col-span-2">
              {step === 1 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Date selection */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm">
                    <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-accent" />
                      {t("select_dates")}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="check-in">{t("check_in")}</Label>
                        <Input
                          id="check-in"
                          type="date"
                          value={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
                          onChange={(e) => {
                            const newDate = e.target.value ? new Date(e.target.value) : new Date();
                            setDate(prev => ({
                              from: newDate,
                              to: prev?.to || new Date(newDate.setDate(newDate.getDate() + 2))
                            }));
                          }}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="check-out">{t("check_out")}</Label>
                        <Input
                          id="check-out"
                          type="date"
                          value={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
                          onChange={(e) => {
                            const newDate = e.target.value ? new Date(e.target.value) : new Date();
                            setDate(prev => ({
                              from: prev?.from || new Date(),
                              to: newDate
                            }));
                          }}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guest selection */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm">
                    <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      {t("guests")}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="adults">{t("adults")}</Label>
                        <Select value={adults} onValueChange={setAdults}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select adults" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {t("adults")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="children">{t("children")}</Label>
                        <Select value={children} onValueChange={setChildren}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select children" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {t("children")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Room selection */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm">
                    <h3 className="font-serif text-xl font-semibold mb-4">
                      {t("available_rooms")}
                    </h3>
                    <div className="space-y-4">
                      {rooms.map((room) => (
                        <motion.div
                          key={room.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                            selectedRoom?.id === room.id
                              ? "border-accent ring-2 ring-accent/20"
                              : "border-border hover:border-accent/50"
                          }`}
                          onClick={() => setSelectedRoom(room)}
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-48 h-40 rounded-lg overflow-hidden">
                              <img
                                src={room.primary_image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"}
                                alt={room.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-serif text-lg font-semibold">
                                    {room.name}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {room.review_count} {t("reviews")}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-serif text-xl font-bold text-accent">
                                    {room.formatted_price}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {t("per_night")}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mt-3">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {room.max_guests} {t("guests")}
                                </Badge>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Maximize2 className="w-3 h-3" />
                                  {room.size}m²
                                </Badge>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {room.view_type}
                                </Badge>
                                {room.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="bg-accent/10 text-accent border-accent/30">
                                    {tag.name}
                                  </Badge>
                                ))}
                              </div>

                              <p className="text-sm text-muted-foreground mt-3">
                                {room.description !== "undefined" ? room.description : t("standard_room_description")}
                              </p>

                              {selectedRoom?.id === room.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  className="mt-4 pt-4 border-t border-border"
                                >
                                  <h5 className="font-semibold mb-2">{t("included_amenities")}:</h5>
                                  <div className="grid grid-cols-2 gap-2">
                                    {amenities.map((amenity, index) => (
                                      <div key={index} className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>{amenity.text}</span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Guest information form */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm">
                    <h3 className="font-serif text-xl font-semibold mb-6 flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      {t("guest_information")}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">{t("first_name")}</Label>
                        <Input id="firstName" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t("last_name")}</Label>
                        <Input id="lastName" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="email">{t("email_address")}</Label>
                        <Input id="email" type="email" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="phone">{t("phone_number")}</Label>
                        <Input id="phone" type="tel" className="mt-2" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="specialRequests">{t("special_requests")}</Label>
                        <textarea
                          id="specialRequests"
                          className="w-full mt-2 p-3 border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none min-h-[100px]"
                          placeholder={t("special_requests_placeholder")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment information */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-sm">
                    <h3 className="font-serif text-xl font-semibold mb-6 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-accent" />
                      {t("payment_information")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">{t("cardholder_name")}</Label>
                        <Input id="cardName" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">{t("card_number")}</Label>
                        <Input id="cardNumber" className="mt-2" />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">{t("expiry_date")}</Label>
                          <Input id="expiryDate" placeholder="MM/YY" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">{t("cvv")}</Label>
                          <Input id="cvv" className="mt-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right column - Booking summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-hotel-lg">
                  <h3 className="font-serif text-xl font-semibold mb-6">
                    {t("booking_summary")}
                  </h3>

                  {selectedRoom && (
                    <div className="space-y-6">
                      {/* Selected room */}
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={selectedRoom.primary_image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"}
                            alt={selectedRoom.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{selectedRoom.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {adults} {t("adults")}, {children} {t("children")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <CalendarDays className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {date?.from && format(date.from, "dd MMM", { locale: language === "fr" ? fr : enUS })} -{" "}
                              {date?.to && format(date.to, "dd MMM", { locale: language === "fr" ? fr : enUS })} ({nights} {t("nights")})
                            </span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Price breakdown */}
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {selectedRoom.formatted_price} × {nights} {t("nights")}
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(calculateTotal(selectedRoom.price))}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("taxes_fees")}</span>
                          <span>{formatCurrency(calculateTotal(selectedRoom.price) * 0.1)}</span>
                        </div>
                      </div>

                      <Separator />

                      {/* Total */}
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">{t("total")}</span>
                        <div className="text-right">
                          <div className="font-serif text-2xl font-bold text-accent">
                            {formatCurrency(calculateTotal(selectedRoom.price) * 1.1)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t("includes_taxes")}
                          </div>
                        </div>
                      </div>

                      {/* Security info */}
                      <div className="bg-secondary/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">{t("secure_booking")}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {t("secure_booking_description")}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Book button */}
                      <Button
                        size="lg"
                        className="w-full h-14 text-lg"
                        onClick={handleBooking}
                      >
                        {step === 1 ? t("continue_to_details") : t("complete_booking")}
                      </Button>

                      {/* Cancel policy */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                          {t("free_cancellation")}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-sm"
                          onClick={() => step === 1 ? null : setStep(1)}
                        >
                          {step === 1 ? t("modify_selection") : t("back_to_rooms")}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional info */}
                <div className="mt-6 bg-card border border-border rounded-2xl p-6 shadow-hotel-sm">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    {t("check_in_out_times")}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("check_in")}:</span>
                      <span className="font-medium">14:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("check_out")}:</span>
                      <span className="font-medium">07:00 - 11:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Need help section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center">
            <h3 className="font-serif text-3xl font-bold mb-4">
              {t("need_help_booking")}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("booking_assistance_description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href="tel:+25712345678">
                  <Heart className="w-4 h-4 mr-2" />
                  {t("call_us")}: +257 12 34 56 78
                </a>
              </Button>
              <Button asChild>
                <a href="/contact">
                  {t("contact_us")}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}