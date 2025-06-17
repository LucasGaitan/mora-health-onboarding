import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, Eye, EyeOff, Calendar } from 'lucide-react';

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
  tooltip?: string;
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
  tooltip,
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
  step
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${fieldId}-error`;
  const tooltipId = `${fieldId}-tooltip`;
  const helpId = `${fieldId}-help`;
  
  const hasError = error && touched;
  const hasSuccess = success && touched && !error && value;
  const isEmpty = !value || (typeof value === 'string' && value.trim() === '');
  
  // Character count for text inputs with maxLength
  const showCharCount = maxLength && (type === 'text' || type === 'textarea') && focused;
  const charCount = typeof value === 'string' ? value.length : 0;
  
  // Special handling for date inputs to avoid icon overlap
  const isDateType = type === 'date';
  const hasStatusIcon = !loading && (hasError || hasSuccess);
  const needsExtraPadding = isDateType && hasStatusIcon;
  
  // Format date placeholder
  const getDatePlaceholder = () => {
    if (type === 'date') {
      return placeholder || 'dd/mm/aaaa';
    }
    return placeholder;
  };
  
  // Check if date input has a valid value
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
      'aria-describedby': [ariaDescribedBy, hasError ? errorId : '', tooltip ? tooltipId : '', helpText ? helpId : '']
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
              }}
            />
            {/* Custom placeholder overlay - only shown when empty and not focused */}
            {!hasDateValue && !focused && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-base select-none z-1 font-normal">
                {getDatePlaceholder()}
              </div>
            )}
            {/* Custom calendar icon */}
            <div className={`absolute top-1/2 transform -translate-y-1/2 pointer-events-none z-2 ${
              hasStatusIcon ? 'right-12' : 'right-4'
            }`}>
              <Calendar className={`calendar-icon w-5 h-5 transition-all duration-200 ${
                focused ? 'focused text-purple-500 scale-110' : 
                hasError ? 'error text-red-400' : 
                hasSuccess ? 'success text-green-500' : 
                'text-gray-400'
              }`} />
            </div>
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

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label 
          htmlFor={fieldId}
          className={`block text-sm font-semibold transition-colors ${
            focused ? 'text-purple-700' : hasError ? 'text-red-700' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="requerido">*</span>}
        </label>
        
        {tooltip && (
          <div className="relative group">
            <Info 
              className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help transition-colors" 
              aria-describedby={tooltipId}
            />
            <div 
              id={tooltipId}
              className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap max-w-xs"
              role="tooltip"
            >
              {tooltip}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}

        {showCharCount && (
          <span className={`text-xs ml-auto ${
            charCount > maxLength! * 0.9 ? 'text-orange-500' : 'text-gray-500'
          }`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      
      <div className="relative">
        {renderInput()}
        
        {/* Status icons - positioned to avoid overlap with date picker */}
        {type !== 'password' && type !== 'date' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            {loading && (
              <div className="w-5 h-5 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin" aria-hidden="true" />
            )}
            {!loading && hasError && (
              <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
            )}
            {!loading && hasSuccess && (
              <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
            )}
          </div>
        )}
        
        {/* Status icons for date inputs - positioned to avoid calendar icon */}
        {type === 'date' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            {loading && (
              <div className="w-5 h-5 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin" aria-hidden="true" />
            )}
            {!loading && hasError && (
              <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
            )}
            {!loading && hasSuccess && (
              <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
            )}
          </div>
        )}
      </div>
      
      {/* Help text */}
      {helpText && !hasError && (
        <div 
          id={helpId}
          className="text-sm text-gray-600"
        >
          {helpText}
        </div>
      )}
      
      {/* Error message */}
      {hasError && (
        <div 
          id={errorId}
          className="flex items-center gap-2 text-sm text-red-600 animate-in slide-in-from-top-1 duration-200"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
      
    </div>
  );
}; 