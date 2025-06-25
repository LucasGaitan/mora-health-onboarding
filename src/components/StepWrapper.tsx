import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious?: () => void;
  canGoNext: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  nextButtonText?: string;
  isLoading?: boolean;
  completionPercentage?: number;
  estimatedTime?: string;
  stepNumber?: number;
  totalSteps?: number;
}

export const StepWrapper: React.FC<StepWrapperProps> = ({
  title,
  subtitle,
  children,
  onNext,
  onPrevious,
  canGoNext,
  isFirst = false,
  isLast = false,
  nextButtonText = 'Continuar',
  isLoading = false,
  completionPercentage = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`w-full transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      tabIndex={-1}
    >
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mora-text-primary mb-2 animate-in fade-in duration-500">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg md:text-xl leading-relaxed mora-text-secondary animate-in fade-in duration-500 delay-100">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className={`${isLoading ? 'opacity-50' : ''}`}>
          {children}
        </div>
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="flex items-center gap-3 text-purple-600">
              <div className="w-6 h-6 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <span className="font-medium">Procesando...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {!isFirst ? (
          <button
            onClick={onPrevious}
            disabled={isLoading}
            className="flex items-center px-6 py-3 font-medium rounded-xl hover:bg-gray-50 mora-text-muted hover:mora-text-primary disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 w-full sm:w-auto justify-center sm:justify-start"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Anterior
          </button>
        ) : (
          <div className="hidden sm:block"></div>
        )}

        <div className="flex items-center gap-3">
          
          <button
            onClick={onNext}
            disabled={!canGoNext || isLoading}
            className={`
              flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg w-full sm:w-auto min-w-[160px]
              ${canGoNext && !isLoading
                ? 'mora-btn-primary mora-shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Procesando...
              </>
            ) : (
              <>
                {nextButtonText}
                {!isLast && (
                  <ArrowRight className="w-5 h-5 ml-2" />
                )}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isLoading && "Procesando información del paso"}
        {completionPercentage === 100 && "Paso completado al 100%"}
      </div>
    </div>
  );
};