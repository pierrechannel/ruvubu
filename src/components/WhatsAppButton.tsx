import { MessageCircle, X, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function WhatsAppButton() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const whatsappNumber = '25769671060';
  
  const messageOptions = {
    fr: [
      { text: 'Demande de réservation', message: 'Bonjour, je souhaite faire une réservation.' },
      { text: 'Informations sur les chambres', message: 'Bonjour, je voudrais des informations sur vos chambres.' },
      { text: 'Demande de tarifs', message: 'Bonjour, pourriez-vous me communiquer vos tarifs ?' },
      { text: 'Visite guidée', message: 'Bonjour, je suis intéressé(e) par une visite guidée.' }
    ],
    en: [
      { text: 'Booking inquiry', message: 'Hello, I would like to make a reservation.' },
      { text: 'Room information', message: 'Hello, I would like information about your rooms.' },
      { text: 'Price request', message: 'Hello, could you provide me with your prices?' },
      { text: 'Guided tour', message: 'Hello, I am interested in a guided tour.' }
    ]
  };
  
  const openWhatsApp = (customMessage?: string) => {
    const defaultMessage = language === 'fr' 
      ? 'Bonjour Hôtel Ruvubu!'
      : 'Hello Hotel Ruvubu!';
    
    const message = customMessage || defaultMessage;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Options Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white rounded-xl shadow-2xl p-4 mb-3 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">
              {language === 'fr' ? 'Contact rapide' : 'Quick Contact'}
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2 mb-4">
            {messageOptions[language].map((option, index) => (
              <button
                key={index}
                onClick={() => openWhatsApp(option.message)}
                className="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors border border-gray-100 hover:border-green-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => openWhatsApp()}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            {language === 'fr' ? 'Message personnalisé' : 'Custom Message'}
          </button>
        </div>
      )}
      
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group relative"
        aria-label="WhatsApp"
      >
        {isOpen ? (
          <ChevronUp className="w-7 h-7" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-green-500 animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-green-500"></div>
          </>
        )}
      </button>
    </div>
  );
}