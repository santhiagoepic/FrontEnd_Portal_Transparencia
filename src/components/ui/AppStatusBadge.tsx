import React from 'react';

export interface AppStatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const AppStatusBadge: React.FC<AppStatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const s = status.toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (s.includes('abert') || s.includes('vigente')) {
    colorClasses = 'bg-sky-50 text-sky-800 border-sky-200';
  } else if (s.includes('andamento') || s.includes('aditivo')) {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (s.includes('homologad') || s.includes('conclu') || s.includes('publicad')) {
    colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (s.includes('encerrad') || s.includes('finalizad')) {
    colorClasses = 'bg-slate-100 text-slate-600 border-slate-300';
  } else if (s.includes('suspens')) {
    colorClasses = 'bg-orange-50 text-orange-800 border-orange-200';
  } else if (s.includes('revogad') || s.includes('anulad')) {
    colorClasses = 'bg-rose-50 text-rose-800 border-rose-200';
  } else if (s.includes('desert') || s.includes('fracassad')) {
    colorClasses = 'bg-purple-50 text-purple-800 border-purple-200';
  }

  const padding = size === 'sm' ? 'px-1.5 py-0.5 text-[9.5px]' : 'px-2 py-0.5 text-[10.5px]';

  return (
    <span
      className={`inline-flex items-center font-extrabold uppercase rounded border tracking-wider shadow-2xs ${padding} ${colorClasses} ${className}`}
    >
      {status}
    </span>
  );
};
