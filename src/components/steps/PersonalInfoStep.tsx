import { useState } from 'react';
import { StepWrapper } from '../StepWrapper';
import { FormField } from '../ui/FormField';
import { FormSection } from '../ui/FormSection';
import { PersonalInfo } from '../../types/onboarding';
import { User, MapPin, Mail } from 'lucide-react';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  updateData: (data: Partial<PersonalInfo>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data,
  updateData,
  onNext,
  onPrevious
}) => {
  const [errors, setErrors] = useState<Partial<PersonalInfo>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalInfo, boolean>>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = (field: keyof PersonalInfo, value: string): string => {
    switch (field) {
      case 'email':
        if (!value) return 'El correo electrónico es requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ingresa un correo electrónico válido';
        return '';
      case 'phone':
        if (!value) return 'El teléfono es requerido';
        if (!/^[+]?[0-9\s\-()]{10,}$/.test(value)) return 'Ingresa un número de teléfono válido (mínimo 10 dígitos)';
        return '';
      case 'firstName':
        if (!value) return 'El nombre es requerido';
        if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)) return 'El nombre solo puede contener letras';
        return '';
      case 'lastName':
        if (!value) return 'Los apellidos son requeridos';
        if (value.length < 2) return 'Los apellidos deben tener al menos 2 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)) return 'Los apellidos solo pueden contener letras';
        return '';
      case 'dateOfBirth': {
        if (!value) return 'La fecha de nacimiento es requerida';
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) return 'Debes ser mayor de 18 años';
        if (age > 80) return 'Por favor verifica la fecha de nacimiento';
        return '';
      }
      case 'currentCountry':
      case 'currentCity':
        if (!value) return 'Este campo es requerido';
        if (value.length < 2) return 'Debe tener al menos 2 caracteres';
        return '';
      case 'nationality':
        if (!value) return 'La nacionalidad es requerida';
        return '';
      default:
        return !value ? 'Este campo es requerido' : '';
    }
  };

  const handleFieldChange = (field: keyof PersonalInfo, value: string) => {
    updateData({ [field]: value });
    
    // Real-time validation for touched fields, or always for date fields
    if (touched[field] || field === 'dateOfBirth') {
      setIsValidating(true);
      setTimeout(() => {
        const error = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
        setIsValidating(false);
      }, 300); // Small delay for better UX
    }
  };

  const handleFieldBlur = (field: keyof PersonalInfo) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, data[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleFieldFocus = (field: keyof PersonalInfo) => {
    // Don't clear errors for date fields when focusing (opening calendar)
    // as this creates confusion when the field turns green while having an invalid date
    if (field !== 'dateOfBirth' && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const isValid = Boolean(
    data.firstName && data.lastName && data.email && data.phone && 
    data.dateOfBirth && data.nationality && data.currentCountry && data.currentCity &&
    Object.values(errors).every(error => !error)
  );

  const completionPercentage = (() => {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'nationality', 'currentCountry', 'currentCity'];
    const completedFields = fields.filter(field => data[field as keyof PersonalInfo]).length;
    return (completedFields / fields.length) * 100;
  })();

  const nationalityOptions = [
    { value: 'mexicana', label: 'Mexicana' },
    { value: 'colombiana', label: 'Colombiana' },
    { value: 'peruana', label: 'Peruana' },
    { value: 'argentina', label: 'Argentina' },
    { value: 'chilena', label: 'Chilena' },
    { value: 'ecuatoriana', label: 'Ecuatoriana' },
    { value: 'venezolana', label: 'Venezolana' },
    { value: 'guatemalteca', label: 'Guatemalteca' },
    { value: 'otra', label: 'Otra' }
  ];

  const countryOptions = [
    { value: 'mexico', label: 'México' },
    { value: 'colombia', label: 'Colombia' },
    { value: 'peru', label: 'Perú' },
    { value: 'argentina', label: 'Argentina' },
    { value: 'chile', label: 'Chile' },
    { value: 'ecuador', label: 'Ecuador' },
    { value: 'venezuela', label: 'Venezuela' },
    { value: 'guatemala', label: 'Guatemala' },
    { value: 'otro', label: 'Otro' }
  ];

  return (
    <StepWrapper
      title="Información Personal"
      subtitle="Comencemos conociendo un poco más sobre ti"
      onNext={onNext}
      onPrevious={onPrevious}
      canGoNext={isValid}
      isFirst={true}
      completionPercentage={completionPercentage}
      estimatedTime="3-5 min"
      stepNumber={1}
      totalSteps={7}
    >
      <div className="space-y-8">

        {/* Personal details */}
        <FormSection
          title="Datos personales"
          description="Información básica para tu perfil profesional"
          icon={User}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Nombre"
              type="text"
              value={data.firstName}
              onChange={(value: string) => handleFieldChange('firstName', value)}
              onBlur={() => handleFieldBlur('firstName')}
              onFocus={() => handleFieldFocus('firstName')}
              placeholder="Tu nombre"
              required
              error={errors.firstName}
              success={!errors.firstName && !!data.firstName && !!touched.firstName}
              autoComplete="given-name"
              loading={isValidating && touched.firstName}
              maxLength={50}
              helpText="Solo letras, sin números ni símbolos"
            />

            <FormField
              label="Apellidos"
              type="text"
              value={data.lastName}
              onChange={(value: string) => handleFieldChange('lastName', value)}
              onBlur={() => handleFieldBlur('lastName')}
              onFocus={() => handleFieldFocus('lastName')}
              placeholder="Tus apellidos"
              required
              error={errors.lastName}
              success={!errors.lastName && !!data.lastName && !!touched.lastName}
              autoComplete="family-name"
              loading={isValidating && touched.lastName}
              maxLength={50}
            />

            <FormField
              label="Fecha de nacimiento"
              type="date"
              value={data.dateOfBirth}
              onChange={(value: string) => handleFieldChange('dateOfBirth', value)}
              onBlur={() => handleFieldBlur('dateOfBirth')}
              onFocus={() => handleFieldFocus('dateOfBirth')}
              required
              error={errors.dateOfBirth}
              success={!errors.dateOfBirth && !!data.dateOfBirth && !!touched.dateOfBirth}
              autoComplete="bday"
              helpText="Debes ser mayor de 18 años"
              useCalendarPicker={true}
            />

            <FormField
              label="Nacionalidad"
              type="select"
              value={data.nationality}
              onChange={(value: string) => handleFieldChange('nationality', value)}
              onBlur={() => handleFieldBlur('nationality')}
              onFocus={() => handleFieldFocus('nationality')}
              placeholder="Selecciona tu nacionalidad"
              options={nationalityOptions}
              required
              error={errors.nationality}
              success={!errors.nationality && !!data.nationality && !!touched.nationality}
              autoComplete="country"
            />
          </div>
        </FormSection>

        {/* Contact information */}
        <FormSection
          title="Información de contacto"
          description="¿Cómo podemos contactarte para las mejores oportunidades?"
          icon={Mail}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Correo electrónico"
              type="email"
              value={data.email}
              onChange={(value: string) => handleFieldChange('email', value)}
              onBlur={() => handleFieldBlur('email')}
              onFocus={() => handleFieldFocus('email')}
              placeholder="tu@email.com"
              required
              error={errors.email}
              success={!errors.email && !!data.email && !!touched.email}
              autoComplete="email"
              loading={isValidating && touched.email}
              helpText="Asegúrate de que sea un correo que revises frecuentemente"
            />

            <FormField
              label="Teléfono"
              type="tel"
              value={data.phone}
              onChange={(value: string) => handleFieldChange('phone', value)}
              onBlur={() => handleFieldBlur('phone')}
              onFocus={() => handleFieldFocus('phone')}
              placeholder="+52 555 123 4567"
              required
              error={errors.phone}
              success={!errors.phone && !!data.phone && !!touched.phone}
              autoComplete="tel"
              loading={isValidating && touched.phone}
              helpText="Formato: +[código país] [número]. Ej: +52 555 123 4567"
            />
          </div>
        </FormSection>

        {/* Location information */}
        <FormSection
          title="Ubicación actual"
          description="¿Dónde te encuentras actualmente?"
          icon={MapPin}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="País actual"
              type="select"
              value={data.currentCountry}
              onChange={(value: string) => handleFieldChange('currentCountry', value)}
              onBlur={() => handleFieldBlur('currentCountry')}
              onFocus={() => handleFieldFocus('currentCountry')}
              placeholder="Selecciona tu país actual"
              options={countryOptions}
              required
              error={errors.currentCountry}
              success={!errors.currentCountry && !!data.currentCountry && !!touched.currentCountry}
              autoComplete="country"
            />

            <FormField
              label="Ciudad actual"
              type="text"
              value={data.currentCity}
              onChange={(value: string) => handleFieldChange('currentCity', value)}
              onBlur={() => handleFieldBlur('currentCity')}
              onFocus={() => handleFieldFocus('currentCity')}
              placeholder="Tu ciudad actual"
              required
              error={errors.currentCity}
              success={!errors.currentCity && !!data.currentCity && !!touched.currentCity}
              autoComplete="address-level2"
              maxLength={100}
              helpText="Nombre completo de la ciudad"
            />
          </div>
        </FormSection>

       
      </div>
    </StepWrapper>
  );
};