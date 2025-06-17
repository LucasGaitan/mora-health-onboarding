import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { ProfessionalInfo } from '../../types/onboarding';
import { Plus, X } from 'lucide-react';

interface ProfessionalInfoStepProps {
  data: ProfessionalInfo;
  updateData: (data: Partial<ProfessionalInfo>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ProfessionalInfoStep: React.FC<ProfessionalInfoStepProps> = ({
  data,
  updateData,
  onNext,
  onPrevious
}) => {
  const isValid = data.nursingDegree && data.graduationYear && data.nursingSchool && 
    data.nursingLicense && data.licenseExpiry && data.yearsOfExperience;

  const availableSpecializations = [
    'Enfermería General',
    'Cuidados Intensivos',
    'Urgencias',
    'Pediatría',
    'Ginecología y Obstetricia',
    'Quirófano',
    'Cardiología',
    'Oncología',
    'Geriatría',
    'Salud Mental',
    'Medicina Interna',
    'Neonatología'
  ];

  const addSpecialization = (spec: string) => {
    if (!data.specializations.includes(spec)) {
      updateData({ specializations: [...data.specializations, spec] });
    }
  };

  const removeSpecialization = (spec: string) => {
    updateData({ 
      specializations: data.specializations.filter(s => s !== spec) 
    });
  };

  return (
    <StepWrapper
      title="Información Profesional"
      subtitle="Cuéntanos sobre tu formación y credenciales en enfermería"
      onNext={onNext}
      onPrevious={onPrevious}
      canGoNext={!!isValid}
    >
      <div className="space-y-8">
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-indigo-900 mb-2">Validación de credenciales</h3>
              <p className="text-indigo-800 text-sm leading-relaxed">
                Nuestro equipo verificará todas tus credenciales y te ayudará con el proceso 
                de validación requerido para ejercer en Estados Unidos.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Título de enfermería *
            </label>
            <select
              value={data.nursingDegree}
              onChange={(e) => updateData({ nursingDegree: e.target.value })}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
            >
              <option value="">Selecciona tu título</option>
              <option value="licenciatura">Licenciatura en Enfermería</option>
              <option value="tecnico">Técnico en Enfermería</option>
              <option value="especialidad">Especialidad en Enfermería</option>
              <option value="maestria">Maestría en Enfermería</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Año de graduación *
            </label>
            <input
              type="number"
              min="1990"
              max={new Date().getFullYear()}
              value={data.graduationYear}
              onChange={(e) => updateData({ graduationYear: e.target.value })}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
              placeholder="2020"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Institución educativa *
          </label>
          <input
            type="text"
            value={data.nursingSchool}
            onChange={(e) => updateData({ nursingSchool: e.target.value })}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
            placeholder="Nombre de la universidad o instituto"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Número de cédula profesional *
            </label>
            <input
              type="text"
              value={data.nursingLicense}
              onChange={(e) => updateData({ nursingLicense: e.target.value })}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
              placeholder="Número de cédula"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Vigencia de la licencia *
            </label>
            <input
              type="date"
              value={data.licenseExpiry}
              onChange={(e) => updateData({ licenseExpiry: e.target.value })}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Años de experiencia *
          </label>
          <select
            value={data.yearsOfExperience}
            onChange={(e) => updateData({ yearsOfExperience: e.target.value })}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
          >
            <option value="">Selecciona tu experiencia</option>
            <option value="menos-1">Menos de 1 año</option>
            <option value="1-2">1-2 años</option>
            <option value="3-5">3-5 años</option>
            <option value="6-10">6-10 años</option>
            <option value="mas-10">Más de 10 años</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Especializaciones y áreas de experiencia
          </label>
          
          {data.specializations.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {data.specializations.map((spec, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-purple-100 text-purple-800 font-medium"
                >
                  {spec}
                  <button
                    onClick={() => removeSpecialization(spec)}
                    className="ml-2 text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableSpecializations
              .filter(spec => !data.specializations.includes(spec))
              .map((spec, index) => (
                <button
                  key={index}
                  onClick={() => addSpecialization(spec)}
                  className="flex items-center justify-center px-4 py-3 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-purple-300 transition-all font-medium"
                >
                  <Plus className="w-4 h-4 mr-2 text-purple-600" />
                  {spec}
                </button>
              ))}
          </div>
        </div>
      </div>
    </StepWrapper>
  );
};