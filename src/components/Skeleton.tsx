import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 rounded-md ${className}`}
      aria-hidden="true"
    />
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-3 py-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 py-3 border-b border-slate-100"
        >
          <div className="w-24 shrink-0">
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="w-24 shrink-0">
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
          <div className="w-36 shrink-0 hidden md:block">
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="w-16 shrink-0 flex justify-end">
            <Skeleton className="h-7 w-12 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>
    </div>
  );
};
