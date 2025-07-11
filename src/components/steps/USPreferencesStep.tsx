import { StepWrapper } from '../StepWrapper';
import { FormField } from '../ui/FormField';
import { FormSection } from '../ui/FormSection';
import { MultiSelect } from '../ui/MultiSelect';
import { useOnboardingStore } from '../../store/onboardingStore';
import { MapPin, Building, Clock, DollarSign, Star } from 'lucide-react';

export const USPreferencesStep: React.FC = () => {
  const { data, updateUSPreferences, nextStep, previousStep } = useOnboardingStore();
  const preferencesData = data.usPreferences;

  const isValid = Boolean(
    preferencesData.preferredStates.length > 0 && preferencesData.hospitalTypes.length > 0 && 
    preferencesData.workSettings.length > 0 && preferencesData.shiftPreferences.length > 0 && 
    preferencesData.startDate && preferencesData.salaryExpectations
  );

  const completionPercentage = (() => {
    const requirements = [
      preferencesData.preferredStates.length > 0,
      preferencesData.hospitalTypes.length > 0,
      preferencesData.workSettings.length > 0,
      preferencesData.shiftPreferences.length > 0,
      !!preferencesData.startDate,
      !!preferencesData.salaryExpectations
    ];
    const completed = requirements.filter(Boolean).length;
    return (completed / requirements.length) * 100;
  })();

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
      onNext={nextStep}
      onPrevious={previousStep}
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
            selected={preferencesData.preferredStates}
            onChange={(selected: string[]) => updateUSPreferences({ preferredStates: selected })}
            placeholder="Busca y selecciona los estados donde te gustaría trabajar"
            required
            searchable
            error={preferencesData.preferredStates.length === 0 ? 'Selecciona al menos un estado donde te gustaría trabajar' : undefined}
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
            selected={preferencesData.hospitalTypes}
            onChange={(selected: string[]) => updateUSPreferences({ hospitalTypes: selected })}
            placeholder="Selecciona los tipos de hospital que te interesan"
            required
            error={preferencesData.hospitalTypes.length === 0 ? 'Selecciona al menos un tipo de hospital' : undefined}
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
            selected={preferencesData.workSettings}
            onChange={(selected: string[]) => updateUSPreferences({ workSettings: selected })}
            placeholder="Selecciona tus entornos de trabajo preferidos"
            required
            error={preferencesData.workSettings.length === 0 ? 'Selecciona al menos un entorno de trabajo' : undefined}
            searchable
          />
          
          {preferencesData.workSettings.length > 0 && (
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">
                <strong>Seleccionaste:</strong> {preferencesData.workSettings.join(', ')}. 
                {preferencesData.workSettings.includes('Unidad de Cuidados Intensivos (ICU)') && 
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
            selected={preferencesData.shiftPreferences}
            onChange={(selected: string[]) => updateUSPreferences({ shiftPreferences: selected })}
            placeholder="Selecciona tus preferencias de turno"
            required
            error={preferencesData.shiftPreferences.length === 0 ? 'Selecciona al menos una preferencia de turno' : undefined}
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
              value={preferencesData.startDate}
              onChange={(value: string) => updateUSPreferences({ startDate: value })}
              placeholder="Selecciona tu disponibilidad"
              options={[
                { value: 'inmediato', label: 'Inmediatamente (ya tengo visa)' },
                { value: '1-3-meses', label: 'En 1-3 meses' },
                { value: '3-6-meses', label: 'En 3-6 meses' },
                { value: '6-12-meses', label: 'En 6-12 meses' },
                { value: 'mas-12-meses', label: 'Más de 12 meses' }
              ]}
              required
              error={!preferencesData.startDate ? 'Selecciona cuándo podrías comenzar' : undefined}
              success={!!preferencesData.startDate}
              helpText="El proceso típico de visa toma 6-12 meses"
            />

            <FormField
              label="Expectativas salariales (USD anuales)"
              type="select"
              value={preferencesData.salaryExpectations}
              onChange={(value: string) => updateUSPreferences({ salaryExpectations: value })}
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
              error={!preferencesData.salaryExpectations ? 'Selecciona tus expectativas salariales' : undefined}
              success={!!preferencesData.salaryExpectations}
              helpText="Salario promedio para enfermeras RN: $75,000-$95,000"
            />
          </div>
        </FormSection>

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