import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { AppCheckbox } from './AppCheckbox';

export interface AppMultiSelectOption {
  value: string;
  label: string;
  subtitle?: string;
  badge?: string;
  disabled?: boolean;
}

export interface AppMultiSelectProps {
  label?: string;
  values: string[];
  options: AppMultiSelectOption[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  id?: string;
  compact?: boolean;
}

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const AppMultiSelect: React.FC<AppMultiSelectProps> = ({
  label,
  values,
  options,
  onChange,
  placeholder = 'Selecione uma ou mais opções',
  searchPlaceholder = 'Buscar...',
  required = false,
  disabled = false,
  error,
  helperText,
  className = '',
  id,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [openUpward, setOpenUpward] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);

      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceNeeded = 260;
        setOpenUpward(spaceBelow < spaceNeeded && rect.top > spaceNeeded);
      }
    }
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const term = normalizeText(search);
    return options.filter(
      (opt) =>
        normalizeText(opt.label).includes(term) ||
        (opt.subtitle && normalizeText(opt.subtitle).includes(term))
    );
  }, [options, search]);

  const handleToggle = (optValue: string) => {
    if (values.includes(optValue)) {
      onChange(values.filter((v) => v !== optValue));
    } else {
      onChange([...values, optValue]);
    }
  };

  const handleSelectAll = () => {
    const allEnabled = options.filter((o) => !o.disabled).map((o) => o.value);
    onChange(allEnabled);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  // Trigger display label
  const renderTriggerLabel = () => {
    if (values.length === 0) {
      return <span className="text-slate-400 truncate">{placeholder}</span>;
    }
    if (values.length === 1) {
      const match = options.find((o) => o.value === values[0]);
      return <span className="font-medium text-slate-900 truncate">{match ? match.label : values[0]}</span>;
    }
    return (
      <span className="font-semibold text-emerald-800">
        {values.length} selecionadas
      </span>
    );
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between text-left transition-all cursor-pointer font-sans ${
          compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-xs'
        } rounded-lg border ${
          disabled
            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
            : error
            ? 'bg-white border-red-400 text-slate-900 focus:ring-2 focus:ring-red-400 focus:border-red-500'
            : isOpen
            ? 'bg-white border-emerald-600 ring-2 ring-emerald-500/20 text-slate-900 shadow-xs'
            : 'bg-slate-50/70 hover:bg-white border-slate-300 text-slate-900 hover:border-slate-400 shadow-2xs'
        }`}
      >
        <div className="flex-1 truncate mr-2">{renderTriggerLabel()}</div>
        <div className="flex items-center gap-1.5 shrink-0">
          {values.length > 0 && !disabled && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              className="p-0.5 text-slate-400 hover:text-slate-600 rounded transition"
              title="Limpar seleção"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              disabled ? 'text-slate-300' : 'text-slate-500'
            } ${isOpen ? 'rotate-180 text-emerald-700' : ''}`}
          />
        </div>
      </button>

      {/* Selected Items summary tags if any */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {values.slice(0, 3).map((val) => {
            const opt = options.find((o) => o.value === val);
            return (
              <span
                key={val}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded text-[10.5px] font-medium"
              >
                <span className="truncate max-w-[140px]">{opt ? opt.label : val}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleToggle(val)}
                    className="hover:text-red-700 transition"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </span>
            );
          })}
          {values.length > 3 && (
            <span className="text-[10.5px] text-slate-500 self-center font-medium">
              +{values.length - 3} mais
            </span>
          )}
        </div>
      )}

      {/* Helper text or Error */}
      {error ? (
        <p className="text-[11px] font-medium text-red-600 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      ) : null}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1 min-w-[240px] max-w-full animate-in fade-in duration-100 ${
            openUpward ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}
        >
          {/* Internal Search */}
          <div className="px-2 pt-1 pb-2 border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center justify-between text-[10.5px] pt-1.5 px-0.5 text-slate-500">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-emerald-700 hover:underline font-semibold cursor-pointer"
              >
                Marcar todos
              </button>
              {values.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-slate-500 hover:text-red-600 hover:underline cursor-pointer"
                >
                  Desmarcar todos
                </button>
              )}
            </div>
          </div>

          {/* Options with custom checkboxes */}
          <div className="max-h-[220px] overflow-y-auto py-1 text-xs">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-3 text-xs text-slate-400 text-center italic">
                Nenhuma opção encontrada
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = values.includes(opt.value);

                return (
                  <div
                    key={opt.value}
                    onClick={() => !opt.disabled && handleToggle(opt.value)}
                    className={`px-3 py-2 flex items-start gap-2.5 cursor-pointer select-none transition-colors ${
                      opt.disabled
                        ? 'opacity-40 cursor-not-allowed bg-slate-50'
                        : isSelected
                        ? 'bg-emerald-50/70 hover:bg-emerald-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="pt-0.5">
                      <AppCheckbox
                        checked={isSelected}
                        onChange={() => {}}
                        disabled={opt.disabled}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs ${isSelected ? 'font-bold text-emerald-950' : 'text-slate-800'}`}>
                        {opt.label}
                      </div>
                      {opt.subtitle && (
                        <div className="text-[10.5px] text-slate-500 font-normal">
                          {opt.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
