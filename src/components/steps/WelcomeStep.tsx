import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section - Exact match to the image */}
      <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh] py-16">
        {/* Left Column - Text Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="mora-badge">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                <img 
                  src="/67cdaf892a301dcf0be2b265_nurse-01.avif" 
                  alt="Enfermera" 
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/67cdaf8958e2299374e84cd9_nurse-03.avif" 
                  alt="Enfermero" 
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/67e443919263cec64ae68d86_nurse-circle-male.png" 
                  alt="Enfermero" 
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
              </div>
              <span>Únete a más de 100+ enfermeras y enfermeros mexicanas</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="mora-hero-title">
              Logra tus objetivos<br />
              con una carrera de<br />
              <span className="mora-purple-accent">enfermería</span> en 🇺🇸 EE.UU.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="mora-hero-subtitle max-w-lg">
            Únete a cientos de enfermeras y enfermeros mexicanos que están 
            construyendo su carrera soñada en Estados Unidos. Gana hasta 8 veces más, 
            mantente cerca de casa en comunidades hispanohablantes y recibe nuestro 
            apoyo completo sin costo alguno.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={onNext}
              className="mora-btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
            >
              Comienza Tu Viaje
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Small text below button */}
          <p className="text-sm mora-text-muted">
            5 minutos para registrarse en línea
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)' }}>
            <img 
              src="/67e44436a3c4a3adf6fd01ef_nurse-male-large-p-2000.jpg" 
              alt="Nurse is smiling" 
              className="w-full h-auto object-cover"
              style={{ minHeight: '500px' }}
            />
            
            {/* Floating CTA in top right */}
            <div className="absolute top-6 right-6">
              <button
                onClick={onNext}
                className="mora-btn-primary px-6 py-3 text-sm font-semibold rounded-xl shadow-lg"
              >
                Comienza Tu Viaje
              </button>
            </div>

            {/* Bottom overlay text */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <p className="text-sm font-medium mora-text-primary">
                Tu camino hacia una carrera<br />
                de enfermería en EE.UU.
              </p>
              <div className="flex items-center mt-2 space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};