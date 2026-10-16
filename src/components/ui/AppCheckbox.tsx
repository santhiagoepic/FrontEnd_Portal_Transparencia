import React, { forwardRef, useEffect, useRef } from 'react';
import { Check, Minus } from 'lucide-react';

export interface AppCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label?: React.ReactNode;
  description?: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const AppCheckbox = forwardRef<HTMLInputElement, AppCheckboxProps>(({
  label,
  description,
  checked,
  indeterminate = false,
  onChange,
  disabled = false,
  error,
  className = '',
  size = 'md',
  id,
  ...rest
}, ref) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;

  useEffect(() => {
    if (resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, resolvedRef]);

  const boxSize = size === 'sm' ? 'w-4 h-4 rounded' : 'w-4.5 h-4.5 rounded-md';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <label
      htmlFor={id}
      className={`inline-flex items-start gap-2.5 select-none transition-opacity ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${className}`}
    >
      <div className="relative flex items-center justify-center pt-0.5">
        <input
          ref={resolvedRef}
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="sr-only peer"
          {...rest}
        />

        {/* Custom Checkbox Container */}
        <div
          className={`${boxSize} border transition-all duration-150 flex items-center justify-center ${
            disabled
              ? 'bg-slate-100 border-slate-300'
              : checked || indeterminate
              ? 'bg-[#0b5444] border-[#0b5444] text-white shadow-2xs peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/40 peer-focus-visible:ring-offset-1'
              : error
              ? 'bg-white border-red-400 peer-focus-visible:ring-2 peer-focus-visible:ring-red-400/40'
              : 'bg-white border-slate-300 hover:border-slate-400 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/40'
          }`}
        >
          {indeterminate ? (
            <Minus className={`${iconSize} stroke-[3] text-white`} />
          ) : checked ? (
            <Check className={`${iconSize} stroke-[3] text-white animate-in zoom-in-75 duration-100`} />
          ) : null}
        </div>
      </div>

      {(label || description) && (
        <div className="min-w-0 flex-1">
          {label && (
            <span
              className={`block text-xs font-semibold leading-tight ${
                disabled ? 'text-slate-400' : 'text-slate-800'
              }`}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="block text-[11px] text-slate-500 leading-normal mt-0.5">
              {description}
            </span>
          )}
          {error && (
            <span className="block text-[11px] font-medium text-red-600 mt-0.5">
              {error}
            </span>
          )}
        </div>
      )}
    </label>
  );
});

AppCheckbox.displayName = 'AppCheckbox';
