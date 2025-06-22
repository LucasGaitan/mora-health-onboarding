import { useEffect, useState } from 'react';
import { X, Mail, Phone, Calendar } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);

      // Prevent scroll on body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Wait for animation to complete
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={handleBackdropClick}
      />



      {/* Modal */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Mora Health Logo with Success Animation */}
          <div className="relative mb-6">
            <div className="w-28 h-28 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg border-4 border-purple-500">
              <img 
                src="/67cdc67308ea1ae1f6113e19_logo.svg" 
                alt="Mora Health" 
                className="w-24 h-24"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            ¡Aplicación enviada exitosamente! 🎉
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Hemos recibido tu aplicación y estamos emocionados de ayudarte a comenzar
            tu carrera de enfermería en Estados Unidos.
          </p>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Próximos pasos
            </h3>

            <div className="space-y-3 text-sm text-purple-800 text-left">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <span><strong>24-48 horas:</strong> Nuestro equipo revisará tu aplicación</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <span><strong>1-3 días:</strong> Te contactaremos para una consulta inicial gratuita</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <span><strong>1 semana:</strong> Recibirás tu plan personalizado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-3">
              <strong>¿Tienes preguntas?</strong> Contáctanos directamente:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
              <a
                href="mailto:talent@mora.health"
                className="flex items-center justify-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                talent@mora.health
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center justify-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            ¡Perfecto! Entendido
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"></div>
      </div>
    </div>
  );
}; 