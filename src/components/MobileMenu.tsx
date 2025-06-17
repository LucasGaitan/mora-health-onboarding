import React, { useState } from 'react';

interface MobileMenuProps {
  onStartJourney: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onStartJourney }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        {!isOpen ? (
          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 z-50" style={{ backgroundColor: '#FAF7EA' }}>
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => {
                onStartJourney();
                setIsOpen(false);
              }}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Comienza Tu Viaje
            </button>
          </div>
        </div>
      )}
    </>
  );
}; 