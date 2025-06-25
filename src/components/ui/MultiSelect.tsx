import { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  maxHeight?: string;
  searchable?: boolean;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  placeholder = "Selecciona opciones",
  required = false,
  error,
  maxHeight = "max-h-40",
  searchable = false,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !selected.includes(option)
      )
    : options.filter(option => !selected.includes(option));

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const removeOption = (option: string) => {
    onChange(selected.filter(item => item !== option));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 border border-purple-200 animate-in fade-in duration-200"
            >
              {item}
              <button
                onClick={() => removeOption(item)}
                className="ml-2 text-purple-600 hover:text-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 rounded-full"
                aria-label={`Remover ${item}`}
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar opciones..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
      )}

      <div className="space-y-2">
        {!isExpanded && filteredOptions.length > 6 && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            Ver todas las opciones ({filteredOptions.length})
          </button>
        )}
        
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto ${!isExpanded ? 'max-h-48' : maxHeight}`}>
          {(isExpanded ? filteredOptions : filteredOptions.slice(0, 6)).map((option, index) => (
            <button
              key={index}
              onClick={() => toggleOption(option)}
              className="flex items-center justify-start px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-300 transition-all text-left group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
            >
              <Plus className="w-4 h-4 mr-2 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-purple-700 transition-colors">{option}</span>
            </button>
          ))}
        </div>

        {isExpanded && filteredOptions.length > 6 && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Mostrar menos opciones
          </button>
        )}
      </div>

      {filteredOptions.length === 0 && searchable && searchTerm && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No se encontraron opciones para "{searchTerm}"
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 animate-in slide-in-from-top-1 duration-200">
          <X className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {selected.length === 0 && (
        <p className="text-sm text-gray-500">
          {placeholder}
        </p>
      )}
    </div>
  );
}; 