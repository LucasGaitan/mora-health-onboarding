export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  currentCountry: string;
  currentCity: string;
}

export interface ProfessionalInfo {
  nursingDegree: string;
  graduationYear: string;
  nursingSchool: string;
  nursingLicense: string;
  licenseExpiry: string;
  specializations: string[];
  yearsOfExperience: string;
}

export interface WorkExperience {
  currentlyWorking: boolean;
  hospitalName: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  clinicalAreas: string[];
}

export interface EnglishProficiency {
  speakingLevel: string;
  listeningLevel: string;
  readingLevel: string;
  writingLevel: string;
  hasIELTS: boolean;
  ieltsScore: string;
  hasTOEFL: boolean;
  toeflScore: string;
  willingToTakeTest: boolean;
}

export interface USPreferences {
  preferredStates: string[];
  hospitalTypes: string[];
  workSettings: string[];
  shiftPreferences: string[];
  startDate: string;
  salaryExpectations: string;
}

export interface NCLEXStatus {
  hasTakenNCLEX: boolean;
  nclexResult: string;
  planToTake: string;
  studyTimeframe: string;
  needsSupport: boolean;
  studyMaterials: string[];
}

export interface OnboardingData {
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
  workExperience: WorkExperience;
  englishProficiency: EnglishProficiency;
  usPreferences: USPreferences;
  nclexStatus: NCLEXStatus;
  currentStep: number;
}