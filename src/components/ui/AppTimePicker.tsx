import React from 'react';
import { Clock } from 'lucide-react';

export interface AppTimePickerProps {
  label?: string;
  value: string; // "HH:MM"
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

export const AppTimePicker: React.FC<AppTimePickerProps> = ({
  label,
  value,
  onChange,
  helperText,
  error,
  required = false,
  disabled = false,
  placeholder = 'HH:MM',
  className = '',
  id,
  compact = false,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 4) raw = raw.slice(0, 4);
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `${raw.slice(0, 2)}:${raw.slice(2)}`;
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
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={5}
          className={`w-full font-mono transition-all rounded-lg border pl-9 pr-3 ${
            compact ? 'py-1.5 text-xs' : 'py-2 text-xs'
          } ${
            disabled
              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
              : error
              ? 'bg-white border-red-400 text-slate-900 focus:ring-2 focus:ring-red-400'
              : 'bg-slate-50/70 hover:bg-white border-slate-300 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs'
          }`}
        />

        <div className="absolute left-3 pointer-events-none text-slate-400">
          <Clock className="w-4 h-4" />
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
