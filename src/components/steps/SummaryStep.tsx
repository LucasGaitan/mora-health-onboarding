import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { OnboardingData } from '../../types/onboarding';
import { User, Briefcase, Globe, Stethoscope, MapPin, GraduationCap, CheckCircle, Send } from 'lucide-react';

interface SummaryStepProps {
  data: OnboardingData;
  onPrevious: () => void;
  onSubmit: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
  data,
  onPrevious,
  onSubmit
}) => {
  return (
    <StepWrapper
      title="Resumen de tu aplicación"
      subtitle="Revisa tu información antes de enviar tu aplicación a nuestro equipo"
      onNext={onSubmit}
      onPrevious={onPrevious}
      canGoNext={true}
      isLast={true}
      nextButtonText="Enviar aplicación"
    >
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-2">¡Aplicación completa!</h3>
              <p className="text-green-700 leading-relaxed">
                Has completado todos los pasos requeridos. Nuestro equipo de especialistas revisará 
                tu aplicación y se pondrá en contacto contigo en las próximas 24-48 horas para 
                programar tu consulta inicial gratuita.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Información Personal */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Información Personal</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-gray-600">Nombre:</span> {data.personalInfo.firstName} {data.personalInfo.lastName}</p>
              <p><span className="font-medium text-gray-600">Email:</span> {data.personalInfo.email}</p>
              <p><span className="font-medium text-gray-600">Teléfono:</span> {data.personalInfo.phone}</p>
              <p><span className="font-medium text-gray-600">Nacionalidad:</span> {data.personalInfo.nationality}</p>
              <p><span className="font-medium text-gray-600">Ubicación:</span> {data.personalInfo.currentCity}, {data.personalInfo.currentCountry}</p>
            </div>
          </div>

          {/* Información Profesional */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
                <Briefcase className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Información Profesional</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-gray-600">Título:</span> {data.professionalInfo.nursingDegree}</p>
              <p><span className="font-medium text-gray-600">Graduación:</span> {data.professionalInfo.graduationYear}</p>
              <p><span className="font-medium text-gray-600">Institución:</span> {data.professionalInfo.nursingSchool}</p>
              <p><span className="font-medium text-gray-600">Experiencia:</span> {data.professionalInfo.yearsOfExperience}</p>
              {data.professionalInfo.specializations.length > 0 && (
                <p><span className="font-medium text-gray-600">Especializaciones:</span> {data.professionalInfo.specializations.join(', ')}</p>
              )}
            </div>
          </div>

          {/* Nivel de Inglés */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Nivel de Inglés</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-gray-600">Hablar:</span> {data.englishProficiency.speakingLevel}</p>
              <p><span className="font-medium text-gray-600">Escuchar:</span> {data.englishProficiency.listeningLevel}</p>
              <p><span className="font-medium text-gray-600">Leer:</span> {data.englishProficiency.readingLevel}</p>
              <p><span className="font-medium text-gray-600">Escribir:</span> {data.englishProficiency.writingLevel}</p>
              {data.englishProficiency.hasIELTS && (
                <p><span className="font-medium text-gray-600">IELTS:</span> {data.englishProficiency.ieltsScore}</p>
              )}
              {data.englishProficiency.hasTOEFL && (
                <p><span className="font-medium text-gray-600">TOEFL:</span> {data.englishProficiency.toeflScore}</p>
              )}
            </div>
          </div>

          {/* Experiencia Laboral */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                <Stethoscope className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Experiencia Laboral</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-gray-600">Estado:</span> {data.workExperience.currentlyWorking ? 'Trabajando actualmente' : 'No trabajando'}</p>
              {data.workExperience.hospitalName && (
                <p><span className="font-medium text-gray-600">Hospital:</span> {data.workExperience.hospitalName}</p>
              )}
              {data.workExperience.position && (
                <p><span className="font-medium text-gray-600">Puesto:</span> {data.workExperience.position}</p>
              )}
              {data.workExperience.clinicalAreas.length > 0 && (
                <p><span className="font-medium text-gray-600">Áreas clínicas:</span> {data.workExperience.clinicalAreas.join(', ')}</p>
              )}
            </div>
          </div>

          {/* Preferencias US */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Preferencias EE.UU.</h3>
            </div>
            <div className="space-y-2 text-sm">
              {data.usPreferences.preferredStates.length > 0 && (
                <p><span className="font-medium text-gray-600">Estados:</span> {data.usPreferences.preferredStates.join(', ')}</p>
              )}
              {data.usPreferences.hospitalTypes.length > 0 && (
                <p><span className="font-medium text-gray-600">Tipo de hospital:</span> {data.usPreferences.hospitalTypes.join(', ')}</p>
              )}
              {data.usPreferences.startDate && (
                <p><span className="font-medium text-gray-600">Inicio:</span> {data.usPreferences.startDate}</p>
              )}
              {data.usPreferences.salaryExpectations && (
                <p><span className="font-medium text-gray-600">Salario esperado:</span> {data.usPreferences.salaryExpectations}</p>
              )}
            </div>
          </div>

          {/* Estado NCLEX */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                <GraduationCap className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Estado NCLEX-RN</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-gray-600">Ha tomado NCLEX:</span> {data.nclexStatus.hasTakenNCLEX ? 'Sí' : 'No'}</p>
              {data.nclexStatus.nclexResult && (
                <p><span className="font-medium text-gray-600">Resultado:</span> {data.nclexStatus.nclexResult}</p>
              )}
              {data.nclexStatus.planToTake && (
                <p><span className="font-medium text-gray-600">Plan:</span> {data.nclexStatus.planToTake}</p>
              )}
              {data.nclexStatus.studyTimeframe && (
                <p><span className="font-medium text-gray-600">Timeframe:</span> {data.nclexStatus.studyTimeframe}</p>
              )}
              <p><span className="font-medium text-gray-600">Necesita apoyo:</span> {data.nclexStatus.needsSupport ? 'Sí' : 'No'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
            <Send className="w-6 h-6 mr-2" />
            Próximos pasos
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="text-purple-800 space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm">Nuestro equipo revisará tu aplicación en 24-48 horas</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm">Te contactaremos para una consulta inicial gratuita</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm">Comenzaremos el proceso de documentación y preparación</span>
              </li>
            </ul>
            <ul className="text-purple-800 space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm">Te asignaremos un coordinador personal para tu caso</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm">Diseñaremos un plan personalizado según tu perfil</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm">Iniciaremos tu camino hacia Estados Unidos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StepWrapper>
  );
};