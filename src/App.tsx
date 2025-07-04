import { StepIndicator } from './components/StepIndicator';
import { ProcessSection } from './components/ProcessSection';
import { SuccessModal } from './components/SuccessModal';
import { PersonalInfoStep } from './components/steps/PersonalInfoStep';
import { ProfessionalInfoStep } from './components/steps/ProfessionalInfoStep';
import { WorkExperienceStep } from './components/steps/WorkExperienceStep';
import { EnglishProficiencyStep } from './components/steps/EnglishProficiencyStep';
import { USPreferencesStep } from './components/steps/USPreferencesStep';
import { NCLEXStatusStep } from './components/steps/NCLEXStatusStep';
import { SummaryStep } from './components/steps/SummaryStep';
import { useOnboardingStore, stepTitles } from './store/onboardingStore';

function App() {
  const {
    data,
    showOnboarding,
    showSuccessModal,
    startOnboarding,
    setShowOnboarding,
    handleSuccessModalClose,
    getCompletedSteps,
    goToStep
  } = useOnboardingStore();

  const renderStep = () => {
    switch (data.currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <ProfessionalInfoStep />;
      case 2:
        return <WorkExperienceStep />;
      case 3:
        return <EnglishProficiencyStep />;
      case 4:
        return <USPreferencesStep />;
      case 5:
        return <NCLEXStatusStep />;
      case 6:
        return <SummaryStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7EA' }}>
      <header className="mora-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="/67cdc67308ea1ae1f6113e19_logo.svg" alt="Mora Health" className="h-8" />
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={startOnboarding}
                className="hidden md:block mora-btn-primary px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-lg transition-all"
              >
                Comienza Tu Viaje
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative">
        {!showOnboarding ? (
          <>
            <div className="relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                    <div className="flex justify-center lg:justify-start items-center mb-6">
                      <div className="flex -space-x-2">
                        <img 
                          src="/67cdaf892a301dcf0be2b265_nurse-01.avif" 
                          alt="Enfermera" 
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                        />
                        <img 
                          src="/67cdaf8958e2299374e84cd9_nurse-03.avif" 
                          alt="Enfermero" 
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                        />
                        <img 
                          src="/67e443919263cec64ae68d86_nurse-circle-male.png" 
                          alt="Enfermero" 
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                        />
                      </div>
                      <p className="ml-4 text-sm text-gray-600 font-medium">
                        Únete a más de 100+ enfermeras<br />y enfermeros mexicanas
                      </p>
                    </div>

                    <div className="mb-6">
                      <h1 className="mora-hero-title">
                        Logra tus objetivos con una carrera de{' '}
                        <span className="mora-purple-accent">enfermería</span> en{' '}
                        <div className="inline-flex items-center">
                          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                            <img 
                              src="/67cdb8bb08e0807c319e26b9_US - United States.svg" 
                              alt="Estados Unidos" 
                              className="w-6 h-6" 
                            />
                          </div>
                          EE.UU.
                        </div>
                      </h1>
                    </div>

                    <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                      Únete a cientos de enfermeras y enfermeros mexicanos que están 
                      construyendo su carrera soñada en Estados Unidos. Gana hasta 8 veces más, 
                      mantente cerca de casa en comunidades hispanohablantes y recibe nuestro 
                      apoyo completo sin costo alguno.
                    </p>

                    <button 
                      onClick={startOnboarding}
                      className="mora-btn-primary px-8 py-4 rounded-lg font-semibold shadow-lg text-lg"
                    >
                      Comienza Tu Viaje
                    </button>

                    <p className="text-sm text-gray-500 mt-4">
                      5 minutos para registrarse en línea
                    </p>
                  </div>

                  <div className="relative">
                    <div className="relative">
                      <img 
                        src="/67cdaf892a301dcf0be2b265_nurse-01.avif" 
                        alt="Nurse is smiling" 
                        className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl object-cover"
                      />
                      
                      <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                        <p className="text-sm text-gray-600 mb-2">
                          Tu camino hacia una carrera<br />de enfermería en EE.UU.
                        </p>
                        <button 
                          onClick={startOnboarding}
                          className="mora-btn-primary px-4 py-2 rounded-lg font-medium text-sm w-full"
                        >
                          Comienza Tu Viaje
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProcessSection onStartJourney={startOnboarding} />
          </>
        ) : (
          <div className="min-h-screen" style={{ backgroundColor: '#FAF7EA' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <button
                  onClick={() => setShowOnboarding(false)}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors hover:bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 bg-white/80 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver al inicio
                </button>
              </div>

              <StepIndicator
                currentStep={data.currentStep}
                totalSteps={stepTitles.length}
                stepTitles={stepTitles}
                completedSteps={getCompletedSteps()}
                onStepClick={goToStep}
              />
              
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-8 md:p-12">
                  {renderStep()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mora-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <img src="/67cdc67308ea1ae1f6113e19_logo.svg" alt="Mora Health" className="h-8" />
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
              <div className="text-sm text-gray-600">
                <a href="mailto:talent@mora.health" className="hover:text-gray-900 transition-colors">
                  talent@mora.health
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              2025 Mora Health. All Rights Reserved
            </p>
            <div className="mt-2 text-xs text-gray-400">
              <a href="#" className="hover:text-gray-600 transition-colors mr-4">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        email={data.personalInfo.email}
      />
    </div>
  );
}

export default App;