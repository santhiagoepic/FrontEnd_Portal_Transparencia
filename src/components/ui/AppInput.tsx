import React, { forwardRef } from 'react';

export interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  compact?: boolean;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className = '',
  id,
  required,
  disabled,
  compact = false,
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

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          className={`w-full transition-all font-sans rounded-lg border ${
            compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-xs'
          } ${leftIcon ? 'pl-9' : ''} ${rightIcon ? 'pr-9' : ''} ${
            disabled
              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
              : error
              ? 'bg-white border-red-400 text-slate-900 focus:ring-2 focus:ring-red-400 focus:border-red-500'
              : 'bg-slate-50/70 hover:bg-white border-slate-300 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs'
          } ${className}`}
          {...rest}
        />

        {rightIcon && (
          <div className="absolute right-3 pointer-events-none text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-[11px] font-medium text-red-600 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

AppInput.displayName = 'AppInput';
