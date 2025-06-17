import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  
  // Convert string value to Date for calendar - using UTC to avoid timezone issues
  const dateValue: Value = value ? (() => {
    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = value.split('-').map(Number);
      // Create date using UTC with fixed hour (12:00) to avoid timezone issues
      return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    }
    return new Date(value);
  })() : null;
  
  // Set reasonable defaults for birth date fields
  const isLikelyBirthDate = label.toLowerCase().includes('nacimiento') || label.toLowerCase().includes('birth');
  const defaultMaxDate = isLikelyBirthDate ? new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()) : undefined;
  const defaultMinDate = isLikelyBirthDate ? new Date(1900, 0, 1) : undefined;
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    // Parse the date using the same UTC approach
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      
      // Use UTC methods to avoid timezone issues
      const formattedDay = String(date.getUTCDate()).padStart(2, '0');
      const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
      const formattedYear = date.getUTCFullYear();
      
      return `${formattedDay}/${formattedMonth}/${formattedYear}`;
    }
    
    // Fallback for other date formats
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Handle calendar date change
  const handleCalendarChange = (newValue: Value) => {
    if (newValue && !Array.isArray(newValue)) {
      // Use the same approach as the working component
      const day = newValue.getDate();
      const month = newValue.getMonth();
      const year = newValue.getFullYear();
      
      // Format YYYY-MM-DD for the selected date (using padStart to format correctly)
      const formattedMonth = String(month + 1).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      const dateString = `${year}-${formattedMonth}-${formattedDay}`;
      
      onChange(dateString);
      setIsOpen(false);
      setTouched(true);
    }
  };
  
  // Handle input focus
  const handleFocus = () => {
    setFocused(true);
    setIsOpen(true);
    onFocus?.();
  };
  
  // Handle input blur
  const handleBlur = useCallback(() => {
    setFocused(false);
    setTouched(true);
    onBlur?.();
  }, [onBlur]);
  
  // Handle clicking outside to close calendar
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
  
  // Handle keyboard navigation
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
      {/* Label */}
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
      
      {/* Date input container */}
      <div className="relative" ref={containerRef}>
        <input
          ref={inputRef}
          id={fieldId}
          type="text"
          value={value ? formatDate(value) : ''}
          placeholder={placeholder}
          readOnly
          disabled={disabled || loading}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={hasError ? true : false}
          aria-describedby={[ariaDescribedBy, hasError ? errorId : '', helpText ? helpId : '']
            .filter(Boolean).join(' ') || undefined}
          className={`${baseInputClasses} pr-12`}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
        
        {/* Calendar icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {loading && (
            <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" aria-hidden="true" />
          )}
          {!loading && hasError && (
            <AlertCircle className="w-4 h-4 text-red-500" aria-hidden="true" />
          )}
          {!loading && hasSuccess && (
            <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
          )}
          <CalendarIcon 
            className={`w-4 h-4 transition-colors ${
              focused ? 'text-gray-700' : hasError ? 'text-red-500' : hasSuccess ? 'text-green-600' : 'text-gray-400'
            }`} 
            aria-hidden="true" 
          />
        </div>
        
                {/* Calendar dropdown */}
        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-sm z-50 overflow-hidden">
            <Calendar
              onChange={handleCalendarChange}
              value={dateValue}
              minDate={minDate || defaultMinDate}
              maxDate={maxDate || defaultMaxDate}
              locale="es-ES"
              className="react-calendar-custom"
              calendarType="gregory"
              showNeighboringMonth={false}
              prev2Label={null}
              next2Label={null}
              formatShortWeekday={(locale, date) => {
                const days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
                return days[date.getDay()];
              }}
            />
          </div>
        )}
      </div>
      
      {/* Help text */}
      {helpText && (
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