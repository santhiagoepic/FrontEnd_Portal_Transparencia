import React from 'react';
import { CheckCircle2, CircleDashed, ShieldCheck, UserCheck } from 'lucide-react';
import { AppCheckbox } from './AppCheckbox';

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  type: 'automatico' | 'manual';
  checked: boolean;
  required?: boolean;
}

export interface AppChecklistProps {
  title?: string;
  items: ChecklistItem[];
  onToggleManual?: (itemId: string, checked: boolean) => void;
  showProgress?: boolean;
  className?: string;
  readOnly?: boolean;
}

export const AppChecklist: React.FC<AppChecklistProps> = ({
  title = 'Verificação de Documentos e Processo',
  items,
  onToggleManual,
  showProgress = true,
  className = '',
  readOnly = false,
}) => {
  const total = items.length;
  const verifiedCount = items.filter((item) => item.checked).length;
  const percentage = total > 0 ? Math.round((verifiedCount / total) * 100) : 0;

  return (
    <div className={`p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3 ${className}`}>
      {/* Header with Title and Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {title}
          </h4>
          <span className="text-[11px] text-slate-500">
            Acompanhamento de conformidade e anexos obrigatórios
          </span>
        </div>

        {showProgress && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-700">
              {verifiedCount} de {total} verificados
            </span>
            <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-200/80 px-1.5 py-0.5 rounded">
              {percentage}%
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              percentage === 100 ? 'bg-emerald-600' : 'bg-sky-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}

      {/* Items List */}
      <div className="space-y-2 pt-1">
        {items.map((item) => {
          const isAuto = item.type === 'automatico';

          return (
            <div
              key={item.id}
              className={`p-2.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                item.checked
                  ? 'bg-white border-emerald-200/80 shadow-2xs'
                  : 'bg-white/60 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                {isAuto ? (
                  // Automatic items cannot be manually toggled: show check status
                  <div className="pt-0.5 shrink-0">
                    {item.checked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    ) : (
                      <CircleDashed className="w-4 h-4 text-slate-300 stroke-[2]" />
                    )}
                  </div>
                ) : (
                  // Manual items can be toggled by auditor
                  <div className="pt-0.5 shrink-0">
                    <AppCheckbox
                      checked={item.checked}
                      onChange={(c) => onToggleManual && onToggleManual(item.id, c)}
                      disabled={readOnly}
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-xs ${
                        item.checked ? 'font-bold text-slate-800' : 'font-medium text-slate-600'
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.required && (
                      <span className="text-[9.5px] font-bold text-red-600 uppercase">
                        (Obrigatório)
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-[10.5px] text-slate-500 mt-0.5 leading-normal">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Tag indicating Automatic vs Manual Verification */}
              <div className="shrink-0 flex items-center gap-1">
                {isAuto ? (
                  <span
                    className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded"
                    title="Verificado automaticamente pelo sistema através dos arquivos anexados"
                  >
                    <ShieldCheck className="w-3 h-3 text-sky-600" />
                    <span>Automático</span>
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded"
                    title="Análise e conferência manual pelo auditor/administrador"
                  >
                    <UserCheck className="w-3 h-3 text-amber-600" />
                    <span>Manual</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
