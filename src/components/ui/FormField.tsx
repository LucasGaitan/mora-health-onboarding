import { useState } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff, Calendar } from 'lucide-react';
import { DatePicker } from './DatePicker';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select' | 'textarea' | 'password';
  value: string | number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
  'aria-describedby'?: string;
  helpText?: string;
  loading?: boolean;
  maxLength?: number;
  pattern?: string;
  step?: number;
  useCalendarPicker?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  required = false,
  error,
  success = false,
  options,
  rows = 4,
  min,
  max,
  disabled = false,
  className = '',
  autoComplete,
  'aria-describedby': ariaDescribedBy,
  helpText,
  loading = false,
  maxLength,
  pattern,
  step,
  useCalendarPicker = false
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;
  
  const hasError = error && touched;
  const hasSuccess = success && touched && !error && value;
  
  const showCharCount = maxLength && (type === 'text' || type === 'textarea') && focused;
  const charCount = typeof value === 'string' ? value.length : 0;
  
  const isDateType = type === 'date';
  const hasStatusIcon = !loading && (hasError || hasSuccess);
  const needsExtraPadding = isDateType && hasStatusIcon;
  
  const getDatePlaceholder = () => {
    if (type === 'date') {
      return placeholder || 'dd/mm/aaaa';
    }
    return placeholder;
  };
  
  const hasDateValue = isDateType && value && value !== '' && value !== 'dd/mm/aaaa';
  
  const baseInputClasses = `
    w-full px-4 py-3 border rounded-xl transition-all duration-200 text-base
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
    disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500
    placeholder:text-gray-400
    ${hasError 
      ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
      : hasSuccess 
        ? 'border-green-300 bg-green-50 focus:ring-green-500 focus:border-green-500'
        : focused
          ? 'border-purple-300 bg-white shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
    }
    ${loading ? 'animate-pulse' : ''}
    ${needsExtraPadding ? 'pr-12' : ''}
    ${className}
  `;

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
    onBlur?.();
  };

  const renderInput = () => {
    const commonProps = {
      id: fieldId,
      value: value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => 
        onChange(e.target.value),
      onFocus: handleFocus,
      onBlur: handleBlur,
      placeholder: getDatePlaceholder(),
      disabled: disabled || loading,
      required,
      autoComplete,
      'aria-invalid': hasError ? true : false,
      'aria-describedby': [ariaDescribedBy, hasError ? errorId : '', helpText ? helpId : '']
        .filter(Boolean).join(' ') || undefined,
      className: type === 'password' ? `${baseInputClasses} pr-12` : baseInputClasses,
      maxLength,
      pattern,
      step
    };

    switch (type) {
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">{placeholder || `Selecciona ${label.toLowerCase()}`}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={rows}
            style={{ resize: 'vertical', minHeight: `${rows * 1.5}rem` }}
          />
        );
      
      case 'password':
        return (
          <div className="relative">
            <input
              {...commonProps}
              type={showPassword ? 'text' : 'password'}
              min={min}
              max={max}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        );
      
      case 'date':
        if (useCalendarPicker) {
          return null;
        }
        return (
          <div className={`date-input custom-style relative ${hasError ? 'error' : hasSuccess ? 'success' : ''}`}>
            <input
              {...commonProps}
              type="date"
              min={min}
              max={max}
              placeholder=""
              className={`${baseInputClasses} 
                ${hasStatusIcon ? 'pr-16' : 'pr-12'} 
                relative z-0
                date-field
                ${!hasDateValue && !focused ? 'date-field-empty' : 'date-field-filled'}
              `}
              style={{
                colorScheme: 'light',
                WebkitAppearance: 'none',
                MozAppearance: 'textfield'
              }}
            />
            
            {!hasDateValue && !focused && (
              <div className="absolute inset-0 flex items-center px-4 pointer-events-none z-10 text-gray-400">
                {getDatePlaceholder()}
              </div>
            )}
            
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-20" />
          </div>
        );
      
      default:
        return (
          <input
            {...commonProps}
            type={type}
            min={min}
            max={max}
          />
        );
    }
  };

  if (type === 'date' && useCalendarPicker) {
    return (
      <DatePicker
        label={label}
        value={String(value)}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        required={required}
        error={error}
        success={success}
        disabled={disabled}
        className={className}
        autoComplete={autoComplete}
        aria-describedby={ariaDescribedBy}
        helpText={helpText}
        loading={loading}
      />
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label 
          htmlFor={fieldId} 
          className={`block text-sm font-semibold transition-colors ${
            hasError ? 'text-red-600' : hasSuccess ? 'text-green-600' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>

        {showCharCount && (
          <span className={`text-xs transition-colors ${
            charCount > maxLength! * 0.9 ? 'text-orange-500' : 'text-gray-500'
          }`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      
      <div className="relative">
        {renderInput()}
        
        {!loading && !isDateType && (hasError || hasSuccess) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {hasError ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : hasSuccess ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : null}
          </div>
        )}
        
        {!loading && isDateType && (hasError || hasSuccess) && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {hasError ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : hasSuccess ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : null}
          </div>
        )}
      </div>
      
      {helpText && !hasError && (
        <p 
          id={helpId}
          className="text-sm text-gray-500 leading-relaxed"
        >
          {helpText}
        </p>
      )}
      
      {hasError && (
        <div 
          id={errorId}
          className="flex items-center gap-2 text-sm text-red-600 animate-in slide-in-from-top-1 duration-200"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}; 