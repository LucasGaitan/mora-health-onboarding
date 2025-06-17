import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: 'default' | 'highlighted' | 'info' | 'success';
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  icon: Icon,
  children,
  variant = 'default',
  className = ''
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'highlighted':
        return 'bg-purple-50 border-purple-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'highlighted':
        return 'text-purple-600';
      case 'info':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`border rounded-xl p-6 transition-all duration-200 hover:shadow-sm ${getVariantStyles()} ${className}`}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {Icon && (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${variant === 'default' ? 'bg-gray-100' : 'bg-white/50'}`}>
              <Icon className={`w-5 h-5 ${getIconColor()}`} />
            </div>
          )}
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
        {description && (
          <p className="text-sm text-gray-600 leading-relaxed ml-11">
            {description}
          </p>
        )}
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}; 