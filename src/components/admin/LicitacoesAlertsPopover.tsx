import React, { useState, useRef, useEffect } from 'react';
import { Bell, AlertTriangle, AlertCircle, Info, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { ProcessAlert, SeverityLevel } from '../../types/licitacoes.types';
import { licitacoesAlertsService, AlertCounts } from '../../services/licitacoesAlerts.service';

interface LicitacoesAlertsPopoverProps {
  alerts: ProcessAlert[];
  onSelectLicitacao: (licitacaoId: string) => void;
}

export const LicitacoesAlertsPopover: React.FC<LicitacoesAlertsPopoverProps> = ({
  alerts,
  onSelectLicitacao,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<SeverityLevel | 'todos'>('todos');
  const containerRef = useRef<HTMLDivElement>(null);

  const counts: AlertCounts = licitacoesAlertsService.getCounts(alerts);

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

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === 'todos') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button with Badge Counters */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer shadow-2xs ${
          counts.total > 0
            ? 'bg-amber-50/80 hover:bg-amber-100/80 text-amber-950 border-amber-300'
            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
        }`}
        title="Central de Pendências e Alertas de Licitações"
      >
        <div className="relative">
          <Bell className="w-3.5 h-3.5 text-amber-700" />
          {counts.total > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          )}
        </div>
        <span>Pendências</span>
        {counts.total > 0 ? (
          <div className="flex items-center gap-1 ml-0.5">
            {counts.critica > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[9px] font-black">
                {counts.critica}
              </span>
            )}
            {counts.atencao > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-600 text-white rounded-full text-[9px] font-black">
                {counts.atencao}
              </span>
            )}
            {counts.informativa > 0 && (
              <span className="px-1.5 py-0.2 bg-sky-600 text-white rounded-full text-[9px] font-black">
                {counts.informativa}
              </span>
            )}
          </div>
        ) : (
          <span className="text-[10px] text-slate-400 font-normal">0</span>
        )}
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in duration-150">
          {/* Header */}
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Central de Pendências</h4>
                <p className="text-[10px] text-slate-300">
                  {counts.total} processo(s) requerem atenção
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="p-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1 text-[11px]">
            <button
              type="button"
              onClick={() => setFilterSeverity('todos')}
              className={`px-2 py-1 rounded-md font-semibold transition cursor-pointer ${
                filterSeverity === 'todos'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({counts.total})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('critica')}
              className={`px-2 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1 ${
                filterSeverity === 'critica'
                  ? 'bg-rose-100 text-rose-900 shadow-2xs font-bold'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              Críticas ({counts.critica})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('atencao')}
              className={`px-2 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1 ${
                filterSeverity === 'atencao'
                  ? 'bg-amber-100 text-amber-900 shadow-2xs font-bold'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              Atenção ({counts.atencao})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('informativa')}
              className={`px-2 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1 ${
                filterSeverity === 'informativa'
                  ? 'bg-sky-100 text-sky-900 shadow-2xs font-bold'
                  : 'text-sky-700 hover:bg-sky-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
              Info ({counts.informativa})
            </button>
          </div>

          {/* List of Alerts */}
          <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100">
            {filteredAlerts.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-slate-800">Tudo em conformidade!</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Nenhuma pendência ativa para os filtros selecionados.
                </p>
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                const colors = licitacoesAlertsService.getSeverityBadgeColor(alert.severity);

                return (
                  <div
                    key={alert.id}
                    className="p-3 hover:bg-slate-50/80 transition flex items-start gap-3"
                  >
                    <div className="pt-0.5 shrink-0">
                      {alert.severity === 'critica' ? (
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                      ) : alert.severity === 'atencao' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Info className="w-4 h-4 text-sky-600" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {alert.licitacaoNumero}
                        </span>
                        <span
                          className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded border ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-600 mt-0.5 leading-snug">
                        {alert.message}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onSelectLicitacao(alert.licitacaoId);
                        }}
                        className="mt-2 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition cursor-pointer"
                      >
                        <span>{alert.actionLabel || 'Acessar Processo'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
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
