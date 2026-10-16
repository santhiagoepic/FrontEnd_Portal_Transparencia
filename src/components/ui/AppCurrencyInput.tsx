import React from 'react';

export interface AppCurrencyInputProps {
  label?: string;
  value: number; // raw numeric value in Reais, e.g. 1250000.50
  onChange: (value: number) => void;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
  compact?: boolean;
}

export const formatCurrency = (val: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(val || 0);
};

export const AppCurrencyInput: React.FC<AppCurrencyInputProps> = ({
  label,
  value,
  onChange,
  helperText,
  error,
  required = false,
  disabled = false,
  placeholder = 'R$ 0,00',
  className = '',
  id,
  compact = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = Number(raw) / 100;
    onChange(num);
  };

  const display = value === 0 ? '' : formatCurrency(value);

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
          value={display}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full font-mono font-bold transition-all rounded-lg border px-3 text-right ${
            compact ? 'py-1.5 text-xs' : 'py-2 text-xs'
          } ${
            disabled
              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
              : error
              ? 'bg-white border-red-400 text-slate-900 focus:ring-2 focus:ring-red-400'
              : 'bg-slate-50/70 hover:bg-white border-slate-300 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs'
          }`}
        />
      </div>

      {error ? (
        <p className="text-[11px] font-medium text-red-600 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
