import { StepWrapper } from '../StepWrapper';
import { FormField } from '../ui/FormField';
import { useOnboardingStore } from '../../store/onboardingStore';
import { Plus, X } from 'lucide-react';

export const WorkExperienceStep: React.FC = () => {
  const { data, updateWorkExperience, nextStep, previousStep } = useOnboardingStore();
  const workData = data.workExperience;

  const isValid = workData.currentlyWorking !== undefined && 
    workData.clinicalAreas.length > 0 && workData.responsibilities;

  const clinicalAreasOptions = [
    'Unidad de Cuidados Intensivos (UCI)',
    'Urgencias',
    'Hospitalización General',
    'Quirófano',
    'Pediatría',
    'Ginecología y Obstetricia',
    'Cardiología',
    'Oncología',
    'Geriatría',
    'Salud Mental/Psiquiatría',
    'Medicina Interna',
    'Consulta Externa',
    'Neonatología',
    'Rehabilitación'
  ];

  const toggleClinicalArea = (area: string) => {
    if (workData.clinicalAreas.includes(area)) {
      updateWorkExperience({ 
        clinicalAreas: workData.clinicalAreas.filter(a => a !== area) 
      });
    } else {
      updateWorkExperience({ 
        clinicalAreas: [...workData.clinicalAreas, area] 
      });
    }
  };

  return (
    <StepWrapper
      title="Experiencia Laboral"
      subtitle="Dinos sobre tu experiencia trabajando como enfermera"
      onNext={nextStep}
      onPrevious={previousStep}
      canGoNext={!!isValid}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Actualmente trabajas como enfermera? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="currentlyWorking"
                checked={workData.currentlyWorking === true}
                onChange={() => updateWorkExperience({ currentlyWorking: true })}
                className="mr-2 text-blue-600"
              />
              Sí, actualmente trabajo
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="currentlyWorking"
                checked={workData.currentlyWorking === false}
                onChange={() => updateWorkExperience({ currentlyWorking: false })}
                className="mr-2 text-blue-600"
              />
              No trabajo actualmente
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del hospital/institución
            </label>
            <input
              type="text"
              value={workData.hospitalName}
              onChange={(e) => updateWorkExperience({ hospitalName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Hospital o clínica donde has trabajado"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Puesto/Cargo
            </label>
            <input
              type="text"
              value={workData.position}
              onChange={(e) => updateWorkExperience({ position: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Ej: Enfermera General, Enfermera Especialista"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Fecha de inicio"
            type="date"
            value={workData.startDate || ''}
            onChange={(value: string) => updateWorkExperience({ startDate: value })}
            placeholder="Selecciona la fecha de inicio"
            useCalendarPicker={true}
            helpText="Fecha en que comenzaste a trabajar en esta institución"
          />

          <FormField
            label={`Fecha de fin ${workData.currentlyWorking ? '(opcional si trabajas actualmente)' : ''}`}
            type="date"
            value={workData.endDate || ''}
            onChange={(value: string) => updateWorkExperience({ endDate: value })}
            placeholder="Selecciona la fecha de fin"
            disabled={workData.currentlyWorking}
            useCalendarPicker={true}
            helpText={workData.currentlyWorking ? "Puedes dejarlo vacío si aún trabajas aquí" : "Fecha en que terminaste de trabajar en esta institución"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Áreas clínicas donde has trabajado *
          </label>
          
          {workData.clinicalAreas.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {workData.clinicalAreas.map((area, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {area}
                  <button
                    onClick={() => toggleClinicalArea(area)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {clinicalAreasOptions
              .filter(area => !workData.clinicalAreas.includes(area))
              .map((area, index) => (
                <button
                  key={index}
                  onClick={() => toggleClinicalArea(area)}
                  className="flex items-center justify-start px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                  {area}
                </button>
              ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Principales responsabilidades y logros *
          </label>
          <textarea
            value={workData.responsibilities}
            onChange={(e) => updateWorkExperience({ responsibilities: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Describe tus principales responsabilidades, procedimientos que realizas, logros destacados, etc."
          />
        </div>
      </div>
    </StepWrapper>
  );
};