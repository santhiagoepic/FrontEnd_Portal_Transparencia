import React, { forwardRef } from 'react';

export interface AppTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  uppercase?: boolean;
}

export const AppTextarea = forwardRef<HTMLTextAreaElement, AppTextareaProps>(({
  label,
  helperText,
  error,
  uppercase = false,
  className = '',
  id,
  required,
  disabled,
  rows = 3,
  ...rest
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={id}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`w-full px-3 py-2 text-xs font-sans leading-relaxed transition-all rounded-lg border ${
          uppercase ? 'uppercase' : ''
        } ${
          disabled
            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
            : error
            ? 'bg-white border-red-400 text-slate-900 focus:ring-2 focus:ring-red-400 focus:border-red-500'
            : 'bg-slate-50/70 hover:bg-white border-slate-300 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs'
        } ${className}`}
        {...rest}
      />

      {error ? (
        <p className="text-[11px] font-medium text-red-600 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

AppTextarea.displayName = 'AppTextarea';
