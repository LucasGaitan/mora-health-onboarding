import React, { useState, useEffect } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { ProcessSection } from './components/ProcessSection';
import { MobileMenu } from './components/MobileMenu';
import { SuccessModal } from './components/SuccessModal';
import { WelcomeStep } from './components/steps/WelcomeStep';
import { PersonalInfoStep } from './components/steps/PersonalInfoStep';
import { ProfessionalInfoStep } from './components/steps/ProfessionalInfoStep';
import { WorkExperienceStep } from './components/steps/WorkExperienceStep';
import { EnglishProficiencyStep } from './components/steps/EnglishProficiencyStep';
import { USPreferencesStep } from './components/steps/USPreferencesStep';
import { NCLEXStatusStep } from './components/steps/NCLEXStatusStep';
import { SummaryStep } from './components/steps/SummaryStep';
import { OnboardingData } from './types/onboarding';

const initialData: OnboardingData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    currentCountry: '',
    currentCity: ''
  },
  professionalInfo: {
    nursingDegree: '',
    graduationYear: '',
    nursingSchool: '',
    nursingLicense: '',
    licenseExpiry: '',
    specializations: [],
    yearsOfExperience: ''
  },
  workExperience: {
    currentlyWorking: true,
    hospitalName: '',
    position: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
    clinicalAreas: []
  },
  englishProficiency: {
    speakingLevel: '',
    listeningLevel: '',
    readingLevel: '',
    writingLevel: '',
    hasIELTS: false,
    ieltsScore: '',
    hasTOEFL: false,
    toeflScore: '',
    willingToTakeTest: true
  },
  usPreferences: {
    preferredStates: [],
    hospitalTypes: [],
    workSettings: [],
    shiftPreferences: [],
    startDate: '',
    salaryExpectations: ''
  },
  nclexStatus: {
    hasTakenNCLEX: false,
    nclexResult: '',
    planToTake: '',
    studyTimeframe: '',
    needsSupport: true,
    studyMaterials: []
  },
  currentStep: 0
};

const stepTitles = [
  'Bienvenida',
  'Personal',
  'Profesional',
  'Experiencia',
  'Inglés',
  'Preferencias',
  'NCLEX-RN',
  'Resumen'
];

function App() {
  const [data, setData] = useState<OnboardingData>(() => {
    // Load saved data from localStorage on initial load
    const savedData = localStorage.getItem('mora-health-onboarding');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved data:', error);
        return initialData;
      }
    }
    return initialData;
  });
  
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (showOnboarding && data.currentStep > 0) {
      setIsAutoSaving(true);
      const saveTimer = setTimeout(() => {
        try {
          localStorage.setItem('mora-health-onboarding', JSON.stringify(data));
          setLastSaveTime(new Date());
          setIsAutoSaving(false);
        } catch (error) {
          console.error('Error saving data:', error);
          setIsAutoSaving(false);
        }
      }, 1000); // Save after 1 second of inactivity

      return () => clearTimeout(saveTimer);
    }
  }, [data, showOnboarding]);

  // Calculate completed steps
  const getCompletedSteps = (): number[] => {
    const completed: number[] = [];
    
    // Check each step completion
    if (data.personalInfo.firstName && data.personalInfo.lastName && data.personalInfo.email) {
      completed.push(1);
    }
    if (data.professionalInfo.nursingDegree && data.professionalInfo.graduationYear) {
      completed.push(2);
    }
    if (data.workExperience.hospitalName && data.workExperience.position) {
      completed.push(3);
    }
    if (data.englishProficiency.speakingLevel && data.englishProficiency.listeningLevel) {
      completed.push(4);
    }
    if (data.usPreferences.preferredStates.length > 0 && data.usPreferences.startDate) {
      completed.push(5);
    }
    if (data.nclexStatus.planToTake && data.nclexStatus.studyTimeframe) {
      completed.push(6);
    }
    
    return completed;
  };

  const updatePersonalInfo = (updates: Partial<OnboardingData['personalInfo']>) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates }
    }));
  };

  const updateProfessionalInfo = (updates: Partial<OnboardingData['professionalInfo']>) => {
    setData(prev => ({
      ...prev,
      professionalInfo: { ...prev.professionalInfo, ...updates }
    }));
  };

  const updateWorkExperience = (updates: Partial<OnboardingData['workExperience']>) => {
    setData(prev => ({
      ...prev,
      workExperience: { ...prev.workExperience, ...updates }
    }));
  };

  const updateEnglishProficiency = (updates: Partial<OnboardingData['englishProficiency']>) => {
    setData(prev => ({
      ...prev,
      englishProficiency: { ...prev.englishProficiency, ...updates }
    }));
  };

  const updateUSPreferences = (updates: Partial<OnboardingData['usPreferences']>) => {
    setData(prev => ({
      ...prev,
      usPreferences: { ...prev.usPreferences, ...updates }
    }));
  };

  const updateNCLEXStatus = (updates: Partial<OnboardingData['nclexStatus']>) => {
    setData(prev => ({
      ...prev,
      nclexStatus: { ...prev.nclexStatus, ...updates }
    }));
  };

  const nextStep = () => {
    setData(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, stepTitles.length - 1)
    }));
  };

  const startOnboarding = () => {
    setShowOnboarding(true);
    setShowSuccessModal(true)

    setData(prev => ({ ...prev, currentStep: 1 })); // Skip welcome step and go directly to personal info
  };

  const previousStep = () => {
    setData(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  };

  const goToStep = (stepIndex: number) => {
    const completedSteps = getCompletedSteps();
    // Allow navigation to completed steps or current step
    if (completedSteps.includes(stepIndex) || stepIndex === data.currentStep || stepIndex === 0) {
      setData(prev => ({ ...prev, currentStep: stepIndex }));
    }
  };

  const handleSubmit = () => {
    // Clear saved data on successful submission
    localStorage.removeItem('mora-health-onboarding');
    
    // Here you would typically send the data to your backend
    console.log('Submitting application:', data);
    
    // Show success modal instead of alert
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Reset to initial state
    setData(initialData);
    setShowOnboarding(false);
  };

  const renderStep = () => {

    switch (data.currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;
      case 1:
        return (
          <PersonalInfoStep
            data={data.personalInfo}
            updateData={updatePersonalInfo}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 2:
        return (
          <ProfessionalInfoStep
            data={data.professionalInfo}
            updateData={updateProfessionalInfo}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 3:
        return (
          <WorkExperienceStep
            data={data.workExperience}
            updateData={updateWorkExperience}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 4:
        return (
          <EnglishProficiencyStep
            data={data.englishProficiency}
            updateData={updateEnglishProficiency}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 5:
        return (
          <USPreferencesStep
            data={data.usPreferences}
            updateData={updateUSPreferences}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 6:
        return (
          <NCLEXStatusStep
            data={data.nclexStatus}
            updateData={updateNCLEXStatus}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 7:
        return (
          <SummaryStep
            data={data}
            onPrevious={previousStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return <WelcomeStep onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7EA' }}>
      {/* Header */}
      <header className="mora-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="/67cdc67308ea1ae1f6113e19_logo.svg" alt="Mora Health" className="h-8" />
            </div>
            <div className="flex items-center space-x-6">
              {/* Auto-save indicator */}
              {showOnboarding && isAutoSaving && (
                <div className="hidden md:flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <div className="w-3 h-3 border border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </div>
              )}
              
              <button 
                onClick={startOnboarding}
                className="hidden md:block mora-btn-primary px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-lg transition-all"
              >
                Comienza Tu Viaje
              </button>
              <MobileMenu onStartJourney={startOnboarding} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative">
        {!showOnboarding ? (
          <>
            {/* Hero Section - Only show when on welcome step */}
            <div className="relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <div className="text-center lg:text-left">
                    {/* Small nurse avatars */}
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

                    {/* Main Heading */}
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

                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                      Únete a cientos de enfermeras y enfermeros mexicanos que están 
                      construyendo su carrera soñada en Estados Unidos. Gana hasta 8 veces más, 
                      mantente cerca de casa en comunidades hispanohablantes y recibe nuestro 
                      apoyo completo sin costo alguno.
                    </p>

                    {/* CTA Button */}
                    <button 
                      onClick={startOnboarding}
                      className="mora-btn-primary px-8 py-4 rounded-lg font-semibold shadow-lg text-lg"
                    >
                      Comienza Tu Viaje
                    </button>

                    {/* Small text */}
                    <p className="text-sm text-gray-500 mt-4">
                      5 minutos para registrarse en línea
                    </p>
                  </div>

                  {/* Right Content - Nurse Image */}
                  <div className="relative">
                    <div className="relative">
                      <img 
                        src="/67cdaf892a301dcf0be2b265_nurse-01.avif" 
                        alt="Nurse is smiling" 
                        className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl object-cover"
                      />
                      
                      {/* Floating CTA */}
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

            {/* Process Section */}
            <ProcessSection onStartJourney={startOnboarding} />
          </>
        ) : (
          // Onboarding Steps - Using same background color for consistency
          <div className="min-h-screen" style={{ backgroundColor: '#FAF7EA' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Back to Home Button */}
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

              {/* Step Indicator - Fixed position */}
              <StepIndicator
                currentStep={data.currentStep}
                totalSteps={stepTitles.length}
                stepTitles={stepTitles}
                completedSteps={getCompletedSteps()}
                onStepClick={goToStep}
              />
              
              {/* Main Step Content */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-8 md:p-12">
                  {renderStep()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simple Footer */}
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

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        email={data.personalInfo.email}
      />
    </div>
  );
}

export default App;