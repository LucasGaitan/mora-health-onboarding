import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { FormField } from '../ui/FormField';
import { FormSection } from '../ui/FormSection';
import { MultiSelect } from '../ui/MultiSelect';
import { USPreferences } from '../../types/onboarding';
import { MapPin, Building, Clock, DollarSign, Star } from 'lucide-react';

interface USPreferencesStepProps {
  data: USPreferences;
  updateData: (data: Partial<USPreferences>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const USPreferencesStep: React.FC<USPreferencesStepProps> = ({
  data,
  updateData,
  onNext,
  onPrevious
}) => {

  const isValid = Boolean(
    data.preferredStates.length > 0 && data.hospitalTypes.length > 0 && 
    data.workSettings.length > 0 && data.shiftPreferences.length > 0 && 
    data.startDate && data.salaryExpectations
  );

  const completionPercentage = (() => {
    const requirements = [
      data.preferredStates.length > 0,
      data.hospitalTypes.length > 0,
      data.workSettings.length > 0,
      data.shiftPreferences.length > 0,
      !!data.startDate,
      !!data.salaryExpectations
    ];
    const completed = requirements.filter(Boolean).length;
    return (completed / requirements.length) * 100;
  })();

  // Enhanced US states with popular destinations for international nurses
  const usStates = [
    'California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois',
    'Ohio', 'Georgia', 'North Carolina', 'Michigan', 'New Jersey', 'Virginia',
    'Washington', 'Arizona', 'Massachusetts', 'Tennessee', 'Maryland', 'Colorado',
    'Minnesota', 'Louisiana', 'Oregon', 'Nevada', 'Connecticut', 'Utah',
    'Wisconsin', 'Indiana', 'Missouri', 'Alabama', 'South Carolina', 'Kentucky',
    'Iowa', 'Arkansas', 'Kansas', 'Oklahoma', 'Mississippi', 'New Mexico',
    'Nebraska', 'West Virginia', 'Idaho', 'Hawaii', 'New Hampshire', 'Maine',
    'Rhode Island', 'Montana', 'Delaware', 'South Dakota', 'North Dakota',
    'Alaska', 'Vermont', 'Wyoming'
  ];

  const hospitalTypes = [
    'Hospital General/Académico',
    'Hospital Comunitario',
    'Centro Médico de Trauma',
    'Hospital Pediátrico',
    'Hospital de Rehabilitación',
    'Centro de Cáncer',
    'Hospital Psiquiátrico',
    'Clínica Ambulatoria',
    'Hospital de Veteranos (VA)',
    'Centro Médico Universitario',
    'Hospital de Especialidades',
    'Centro de Cirugía Ambulatoria'
  ];

  const workSettings = [
    'Unidad de Cuidados Intensivos (ICU)',
    'Urgencias/Emergencias (ER)',
    'Hospitalización General (Med-Surg)',
    'Quirófano (OR)',
    'Unidad de Cuidados Coronarios (CCU)',
    'Unidad de Cuidados Intensivos Neonatales (NICU)',
    'Unidad de Cuidados Intensivos Pediátricos (PICU)',
    'Oncología',
    'Consulta Externa',
    'Cuidados Ambulatorios',
    'Rehabilitación',
    'Cuidados Paliativos',
    'Sala de Partos (L&D)',
    'Psiquiatría',
    'Geriatría'
  ];

  const shiftOptions = [
    'Turno diurno (7am-7pm)',
    'Turno nocturno (7pm-7am)',
    'Turnos de 8 horas',
    'Turnos de 12 horas',
    'Fines de semana',
    'Flexible/PRN (Por Necesidad)',
    'Turnos rotativos',
    'Solo días laborables'
  ];



  return (
    <StepWrapper
      title="Preferencias para Estados Unidos"
      subtitle="Ayúdanos a encontrar la oportunidad perfecta que se adapte a tus necesidades y objetivos profesionales"
      onNext={onNext}
      onPrevious={onPrevious}
      canGoNext={isValid}
      completionPercentage={completionPercentage}
      estimatedTime="5-7 min"
      stepNumber={5}
      totalSteps={7}
    >
      <div className="space-y-8">
       

        <FormSection
          title="Ubicación preferida"
          description="¿En qué estados te gustaría trabajar? Puedes seleccionar múltiples opciones para aumentar tus oportunidades."
          icon={MapPin}
          variant="info"
        >
          <MultiSelect
            label="Estados de preferencia"
            options={usStates}
            selected={data.preferredStates}
            onChange={(selected) => updateData({ preferredStates: selected })}
            placeholder="Busca y selecciona los estados donde te gustaría trabajar"
            required
            searchable
            error={data.preferredStates.length === 0 ? 'Selecciona al menos un estado donde te gustaría trabajar' : undefined}
            maxHeight="max-h-60"
          />
          
        </FormSection>

        <FormSection
          title="Tipo de hospital"
          description="¿En qué tipo de hospitales te gustaría trabajar? Diferentes tipos ofrecen distintas experiencias y oportunidades."
          icon={Building}
        >
          <MultiSelect
            label="Tipos de hospital preferidos"
            options={hospitalTypes}
            selected={data.hospitalTypes}
            onChange={(selected) => updateData({ hospitalTypes: selected })}
            placeholder="Selecciona los tipos de hospital que te interesan"
            required
            error={data.hospitalTypes.length === 0 ? 'Selecciona al menos un tipo de hospital' : undefined}
          />
        </FormSection>

        <FormSection
          title="Entorno de trabajo"
          description="¿En qué áreas clínicas prefieres trabajar? Selecciona según tu experiencia y preferencias."
          icon={Building}
        >
          <MultiSelect
            label="Entornos de trabajo preferidos"
            options={workSettings}
            selected={data.workSettings}
            onChange={(selected) => updateData({ workSettings: selected })}
            placeholder="Selecciona tus entornos de trabajo preferidos"
            required
            error={data.workSettings.length === 0 ? 'Selecciona al menos un entorno de trabajo' : undefined}
            searchable
          />
          
          {data.workSettings.length > 0 && (
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">
                <strong>Seleccionaste:</strong> {data.workSettings.join(', ')}. 
                {data.workSettings.includes('Unidad de Cuidados Intensivos (ICU)') && 
                  ' ICU es una especialidad muy demandada con excelentes oportunidades salariales.'}
              </p>
            </div>
          )}
        </FormSection>

        <FormSection
          title="Preferencias de horario"
          description="¿Qué tipos de turnos prefieres? La flexibilidad en horarios puede abrir más oportunidades."
          icon={Clock}
        >
          <MultiSelect
            label="Preferencias de turno"
            options={shiftOptions}
            selected={data.shiftPreferences}
            onChange={(selected) => updateData({ shiftPreferences: selected })}
            placeholder="Selecciona tus preferencias de turno"
            required
            error={data.shiftPreferences.length === 0 ? 'Selecciona al menos una preferencia de turno' : undefined}
          />
        </FormSection>

        <FormSection
          title="Disponibilidad y expectativas"
          description="Información sobre tu disponibilidad y expectativas salariales nos ayuda a encontrar las mejores oportunidades."
          icon={DollarSign}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="¿Cuándo podrías comenzar a trabajar?"
              type="select"
              value={data.startDate}
              onChange={(value) => updateData({ startDate: value })}
              placeholder="Selecciona tu disponibilidad"
              options={[
                { value: 'inmediato', label: 'Inmediatamente (ya tengo visa)' },
                { value: '1-3-meses', label: 'En 1-3 meses' },
                { value: '3-6-meses', label: 'En 3-6 meses' },
                { value: '6-12-meses', label: 'En 6-12 meses' },
                { value: 'mas-12-meses', label: 'Más de 12 meses' }
              ]}
              required
              error={!data.startDate ? 'Selecciona cuándo podrías comenzar' : undefined}
              success={!!data.startDate}
              helpText="El proceso típico de visa toma 6-12 meses"
            />

            <FormField
              label="Expectativas salariales (USD anuales)"
              type="select"
              value={data.salaryExpectations}
              onChange={(value) => updateData({ salaryExpectations: value })}
              placeholder="Selecciona rango salarial esperado"
              options={[
                { value: '50000-60000', label: '$50,000 - $60,000' },
                { value: '60000-70000', label: '$60,000 - $70,000' },
                { value: '70000-80000', label: '$70,000 - $80,000' },
                { value: '80000-90000', label: '$80,000 - $90,000' },
                { value: '90000-100000', label: '$90,000 - $100,000' },
                { value: '100000-120000', label: '$100,000 - $120,000' },
                { value: '120000+', label: '$120,000+' }
              ]}
              required
              error={!data.salaryExpectations ? 'Selecciona tus expectativas salariales' : undefined}
              success={!!data.salaryExpectations}
              helpText="Salario promedio para enfermeras RN: $75,000-$95,000"
            />
          </div>
          
          
        </FormSection>

        {/* Progress encouragement */}
        {completionPercentage === 100 && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-purple-600" />
              <div>
                <h4 className="font-medium text-purple-900">¡Perfecto!</h4>
                <p className="text-sm text-purple-700">
                  Has completado todas tus preferencias. Esto nos ayudará a encontrar las oportunidades 
                  que mejor se adapten a tu perfil y objetivos profesionales.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </StepWrapper>
  );
};