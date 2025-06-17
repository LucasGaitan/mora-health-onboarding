import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';

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
  autoSave?: boolean;
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
  autoSave = false,
  completionPercentage = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (autoSave && completionPercentage > 0) {
      setShowSaveIndicator(true);
      setLastSaveTime(new Date());
      const timer = setTimeout(() => setShowSaveIndicator(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [autoSave, completionPercentage]);

  const formatLastSaveTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'hace unos segundos';
    if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} min`;
    return `hace ${Math.floor(diffInSeconds / 3600)} h`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && canGoNext && !isLoading) {
      onNext();
    }
  };

  return (
    <div 
      className={`w-full transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Header with enhanced metadata */}
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
          
          {/* Auto-save indicator */}
          <div className="flex flex-col items-end gap-2">
            {showSaveIndicator && (
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-full animate-in slide-in-from-top duration-300 shadow-sm">
                <Save className="w-4 h-4 animate-pulse" />
                <span className="font-medium">Guardado automáticamente</span>
              </div>
            )}
            {lastSaveTime && !showSaveIndicator && autoSave && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle className="w-3 h-3" />
                Guardado {formatLastSaveTime(lastSaveTime)}
              </div>
            )}
          </div>
        </div>
        
        
      </div>

      {/* Main content */}
      <div className="mb-8">
        <div className={`${isLoading ? 'opacity-50' : ''}`}>
          {children}
        </div>
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="flex items-center gap-3 text-purple-600">
              <div className="w-6 h-6 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <span className="font-medium">Procesando...</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
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
          {/* Keyboard shortcut hint */}
          {canGoNext && !isLoading && (
            <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
              <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-xs">Enter</kbd>
            </div>
          )}
          
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

      {/* Accessibility improvements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isLoading && "Procesando información del paso"}
        {showSaveIndicator && "Información guardada automáticamente"}
        {completionPercentage === 100 && "Paso completado al 100%"}
      </div>
    </div>
  );
};