import { useState, useRef, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import { Calendar as CalendarIcon, AlertCircle, CheckCircle } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
  'aria-describedby'?: string;
  helpText?: string;
  loading?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder = 'Selecciona una fecha',
  required = false,
  error,
  success = false,
  disabled = false,
  className = '',
  autoComplete,
  'aria-describedby': ariaDescribedBy,
  helpText,
  loading = false,
  minDate,
  maxDate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;
  
  const hasError = error && touched;
  const hasSuccess = success && touched && !error && value;
  
  const dateValue: Value = value ? (() => {
    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = value.split('-').map(Number);
      return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    }
    return new Date(value);
  })() : null;
  
  const isLikelyBirthDate = label.toLowerCase().includes('nacimiento') || label.toLowerCase().includes('birth');
  const defaultMinDate = isLikelyBirthDate ? new Date(1900, 0, 1) : undefined;
  
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      
      const formattedDay = String(date.getUTCDate()).padStart(2, '0');
      const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
      const formattedYear = date.getUTCFullYear();
      
      return `${formattedDay}/${formattedMonth}/${formattedYear}`;
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const handleCalendarChange = (newValue: Value) => {
    if (newValue && !Array.isArray(newValue)) {
      const day = newValue.getDate();
      const month = newValue.getMonth();
      const year = newValue.getFullYear();
      
      const formattedMonth = String(month + 1).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      const dateString = `${year}-${formattedMonth}-${formattedDay}`;
      
      onChange(dateString);
      setIsOpen(false);
      setTouched(true);
      
      setTimeout(() => {
        onBlur?.();
      }, 0);
    }
  };
  
  const handleFocus = () => {
    setFocused(true);
    setIsOpen(true);
    onFocus?.();
  };
  
  const handleBlur = useCallback(() => {
    setFocused(false);
    setTouched(true);
    onBlur?.();
  }, [onBlur]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (focused) {
          handleBlur();
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [focused, handleBlur]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };
  
  const baseInputClasses = `
    w-full px-4 py-3 border rounded-lg transition-all duration-150 text-base
    focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400
    disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500
    cursor-pointer
    ${hasError 
      ? 'border-red-300 bg-red-50 focus:ring-red-300 focus:border-red-400' 
      : hasSuccess 
        ? 'border-green-300 bg-green-50 focus:ring-green-300 focus:border-green-400'
        : focused
          ? 'border-gray-400 bg-white'
          : 'border-gray-200 bg-white hover:border-gray-300'
    }
    ${loading ? 'animate-pulse' : ''}
    ${className}
  `;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label 
          htmlFor={fieldId} 
          className={`block text-sm font-medium transition-colors ${
            hasError ? 'text-red-600' : hasSuccess ? 'text-green-600' : 'text-gray-900'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      
      <div className="relative" ref={containerRef}>
        <input
          ref={inputRef}
          id={fieldId}
          type="text"
          value={formatDate(value)}
          readOnly
          onClick={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={hasError ? true : false}
          aria-describedby={[ariaDescribedBy, hasError ? errorId : '', helpText ? helpId : '']
            .filter(Boolean).join(' ') || undefined}
          className={`${baseInputClasses} pr-12`}
        />
        
        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        
        {!loading && (hasError || hasSuccess) && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {hasError ? (
              <AlertCircle className="w-4 h-4 text-red-500" />
            ) : hasSuccess ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : null}
          </div>
        )}
        
        {isOpen && !disabled && !loading && (
          <div className="absolute top-full left-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <Calendar
              onChange={handleCalendarChange}
              value={dateValue}
              minDate={minDate || defaultMinDate}
              maxDate={maxDate || new Date()}
              locale="es-ES"
              showNeighboringMonth={false}
              className="react-calendar-custom"
            />
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