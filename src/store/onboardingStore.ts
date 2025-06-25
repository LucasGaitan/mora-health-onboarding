import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OnboardingData, PersonalInfo, ProfessionalInfo, WorkExperience, EnglishProficiency, USPreferences, NCLEXStatus } from '../types/onboarding';

interface OnboardingStore {
  data: OnboardingData;
  showOnboarding: boolean;
  showSuccessModal: boolean;
  
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void;
  updateProfessionalInfo: (updates: Partial<ProfessionalInfo>) => void;
  updateWorkExperience: (updates: Partial<WorkExperience>) => void;
  updateEnglishProficiency: (updates: Partial<EnglishProficiency>) => void;
  updateUSPreferences: (updates: Partial<USPreferences>) => void;
  updateNCLEXStatus: (updates: Partial<NCLEXStatus>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (stepIndex: number) => void;
  startOnboarding: () => void;
  setShowOnboarding: (show: boolean) => void;
  setShowSuccessModal: (show: boolean) => void;
  handleSubmit: () => void;
  handleSuccessModalClose: () => void;
  getCompletedSteps: () => number[];
  resetData: () => void;
}

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
  'Personal',
  'Profesional',
  'Experiencia',
  'Inglés',
  'Preferencias',
  'NCLEX-RN',
  'Resumen'
];

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      data: initialData,
      showOnboarding: false,
      showSuccessModal: false,
      updatePersonalInfo: (updates) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...updates }
          }
        })),

      updateProfessionalInfo: (updates) =>
        set((state) => ({
          data: {
            ...state.data,
            professionalInfo: { ...state.data.professionalInfo, ...updates }
          }
        })),

      updateWorkExperience: (updates) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: { ...state.data.workExperience, ...updates }
          }
        })),

      updateEnglishProficiency: (updates) =>
        set((state) => ({
          data: {
            ...state.data,
            englishProficiency: { ...state.data.englishProficiency, ...updates }
          }
        })),

      updateUSPreferences: (updates) =>
        set((state) => ({
          data: {
            ...state.data,
            usPreferences: { ...state.data.usPreferences, ...updates }
          }
        })),

      updateNCLEXStatus: (updates) =>
        set((state) => ({
          data: {
            ...state.data,
            nclexStatus: { ...state.data.nclexStatus, ...updates }
          }
        })),

      setCurrentStep: (step) =>
        set((state) => ({
          data: { ...state.data, currentStep: step }
        })),

      nextStep: () => {
        set((state) => ({
          data: {
            ...state.data,
            currentStep: Math.min(state.data.currentStep + 1, stepTitles.length - 1)
          }
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      previousStep: () => {
        set((state) => ({
          data: {
            ...state.data,
            currentStep: Math.max(state.data.currentStep - 1, 0)
          }
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      goToStep: (stepIndex) => {
        const completedSteps = get().getCompletedSteps();
        const canAccessStep = stepIndex === 0 || completedSteps.includes(stepIndex - 1);
        
        if (canAccessStep) {
          set((state) => ({
            data: { ...state.data, currentStep: stepIndex }
          }));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },

      startOnboarding: () => {
        set(() => ({
          showOnboarding: true,
          data: { ...get().data, currentStep: 0 }
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      setShowOnboarding: (show) => {
        set(() => ({ showOnboarding: show }));
        if (!show) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },

      setShowSuccessModal: (show) =>
        set(() => ({ showSuccessModal: show })),

      handleSubmit: () => {
        console.log('Submitting onboarding data:', get().data);
        set(() => ({ showSuccessModal: true }));
      },

      handleSuccessModalClose: () => {
        set(() => ({
          showSuccessModal: false,
          showOnboarding: false
        }));
        get().resetData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      getCompletedSteps: () => {
        const data = get().data;
        const completed: number[] = [];
        
        if (data.personalInfo.firstName && data.personalInfo.lastName && data.personalInfo.email) {
          completed.push(0);
        }
        if (data.professionalInfo.nursingDegree && data.professionalInfo.graduationYear) {
          completed.push(1);
        }
        if (data.workExperience.hospitalName && data.workExperience.position) {
          completed.push(2);
        }
        if (data.englishProficiency.speakingLevel && data.englishProficiency.listeningLevel) {
          completed.push(3);
        }
        if (data.usPreferences.preferredStates.length > 0 && data.usPreferences.startDate) {
          completed.push(4);
        }
        if (data.nclexStatus.planToTake && data.nclexStatus.studyTimeframe) {
          completed.push(5);
        }
        
        return completed;
      },

      resetData: () =>
        set(() => ({
          data: initialData,
          showOnboarding: false,
          showSuccessModal: false
        }))
    }),
    {
      name: 'mora-health-onboarding',
      partialize: (state) => ({ data: state.data })
    }
  )
);

export { stepTitles };