import React from 'react';
import { Calendar } from 'lucide-react';

export interface AppDatePickerProps {
  label?: string;
  value: string; // "DD/MM/AAAA" format or ISO "YYYY-MM-DD"
  onChange: (value: string) => void;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
  compact?: boolean;
}

// Convert YYYY-MM-DD -> DD/MM/AAAA
const toBrFormat = (val: string): string => {
  if (!val) return '';
  if (val.includes('/')) return val;
  const parts = val.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return val;
};

// Convert DD/MM/AAAA -> YYYY-MM-DD for native input
const toIsoFormat = (val: string): string => {
  if (!val) return '';
  if (val.includes('-')) return val;
  const parts = val.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return val;
};

export const AppDatePicker: React.FC<AppDatePickerProps> = ({
  label,
  value,
  onChange,
  helperText,
  error,
  required = false,
  disabled = false,
  placeholder = 'DD/MM/AAAA',
  className = '',
  id,
  compact = false,
}) => {
  const displayValue = toBrFormat(value);
  const nativeValue = toIsoFormat(value);

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoVal = e.target.value;
    if (!isoVal) {
      onChange('');
      return;
    }
    onChange(toBrFormat(isoVal));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 8) raw = raw.slice(0, 8);
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    if (raw.length > 4) {
      formatted = `${formatted.slice(0, 5)}/${raw.slice(4)}`;
    }
    onChange(formatted);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          value={displayValue}
          onChange={handleTextChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={10}
          className={`w-full font-mono transition-all rounded-lg border pl-9 pr-9 ${
            compact ? 'py-1.5 text-xs' : 'py-2 text-xs'
          } ${
            disabled
              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
              : error
              ? 'bg-white border-red-400 text-slate-900 focus:ring-2 focus:ring-red-400'
              : 'bg-slate-50/70 hover:bg-white border-slate-300 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs'
          }`}
        />

        {/* Calendar Icon on Left */}
        <div className="absolute left-3 pointer-events-none text-slate-400">
          <Calendar className="w-4 h-4" />
        </div>

        {/* Hidden Native Date Picker for visual calendar picker popup */}
        <input
          type="date"
          value={nativeValue}
          onChange={handleNativeChange}
          disabled={disabled}
          tabIndex={-1}
          className="absolute right-2.5 opacity-0 w-6 h-6 cursor-pointer"
          title="Abrir calendário"
        />
        <div className="absolute right-3 pointer-events-none text-slate-400">
          <Calendar className="w-3.5 h-3.5 opacity-60" />
        </div>
      </div>

      {error ? (
        <p className="text-[11px] font-medium text-red-600 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
