import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, Circle, Users } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  completedSteps?: number[];
  onStepClick?: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  stepTitles,
  completedSteps = [],
  onStepClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  const isStepCompleted = (stepIndex: number) => completedSteps.includes(stepIndex) || stepIndex < currentStep;
  const isStepClickable = (stepIndex: number) => onStepClick && (isStepCompleted(stepIndex) || stepIndex === currentStep);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-24 right-4 z-40 w-80 md:w-96 transition-all duration-500 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      {/* Compact indicator */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Header - Always visible with enhanced design */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
        >
          <div className="flex items-center gap-4">
          
            
            <div className="text-left flex-1">
              <div className="text-xs font-medium text-purple-600 mb-0.5">
                Paso {currentStep + 1} de {totalSteps}
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {stepTitles[currentStep]}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
 
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            )}
          </div>
        </button>

        {/* Enhanced progress bar */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Progreso general</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Expanded content with smooth animations and better scroll */}
        <div className={`border-t border-gray-100 transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-gray-100">
            <div className="p-5 space-y-3">
            {stepTitles.map((title, index) => {
              const isCompleted = isStepCompleted(index);
              const isCurrent = index === currentStep;
              const isClickable = isStepClickable(index);
              
              return (
                <button
                  key={index}
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  className={`
                    w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 text-left transform hover:scale-[1.02]
                    ${isCurrent
                      ? 'bg-purple-50 border border-purple-200 shadow-sm' 
                      : isCompleted
                        ? 'hover:bg-green-50 border border-transparent hover:border-green-200 hover:shadow-sm'
                        : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
                    }
                    ${isClickable ? 'cursor-pointer' : 'cursor-default opacity-60'}
                  `}
                  aria-label={`${isCompleted ? 'Completado' : isCurrent ? 'Actual' : 'Pendiente'}: ${title}`}
                >
                  <div className={`
                    w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200
                    ${isCompleted
                      ? 'bg-green-500 text-white shadow-sm' 
                      : isCurrent
                        ? 'bg-purple-600 text-white shadow-sm animate-pulse'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : isCurrent ? (
                      <Circle className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <span className="text-xs font-semibold">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`
                      text-sm font-medium transition-colors leading-tight
                      ${isCurrent
                        ? 'text-purple-900' 
                        : isCompleted
                          ? 'text-green-800'
                          : 'text-gray-700'
                      }
                    `}>
                      {title}
                    </div>
                    
                    {/* Enhanced status indicator */}
                    <div className="text-xs mt-1 flex items-center gap-1">
                      {isCompleted && (
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          Completado
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-purple-600 font-medium flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse"></div>
                          En progreso
                        </span>
                      )}
                      {!isCompleted && !isCurrent && (
                        <span className="text-gray-500 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          Pendiente
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            </div>
          </div>
          
        
        </div>
      </div>

      {/* Mobile floating indicator with enhanced design */}
      <div className={`md:hidden fixed bottom-4 right-4 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-3 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
           
            <div className="text-xs">
              <div className="font-semibold text-purple-600">{Math.round(progressPercentage)}% completado</div>
              <div className="text-gray-600">Paso {currentStep + 1} de {totalSteps}</div>
            </div>
          </div>
          {/* Mini progress bar */}
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-1 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 