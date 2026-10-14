import React from 'react';
import { ChevronRight, Gavel, MessageSquareMore } from 'lucide-react';

interface PrimaryCardsProps {
  onCardClick: (cardType: string) => void;
}

export const PrimaryCards: React.FC<PrimaryCardsProps> = ({ onCardClick }) => {
  return (
    <section className="mt-5 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Receitas */}
        <div
          onClick={() => onCardClick('receitas')}
          className="group bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all duration-200 hover:border-emerald-300 hover:shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="12" width="4" height="9" rx="1.5" />
                <rect x="10" y="7" width="4" height="14" rx="1.5" />
                <rect x="17" y="3" width="4" height="18" rx="1.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold text-[#0c2340] group-hover:text-emerald-700 transition-colors leading-tight">
                Receitas
              </h3>
              <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
                Confira a arrecadação do município.
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700 flex items-center justify-center shrink-0 ml-2 transition-colors">
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* 2. Despesas */}
        <div
          onClick={() => onCardClick('despesas')}
          className="group bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all duration-200 hover:border-rose-300 hover:shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M 12 12 L 12 2 A 10 10 0 1 0 22 12 Z" />
                <path d="M 14 10 L 22 10 A 10 10 0 0 0 14 2 Z" transform="translate(1, -1)" />
              </svg>
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold text-[#0c2340] group-hover:text-rose-600 transition-colors leading-tight">
                Despesas
              </h3>
              <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
                Acompanhe como os recursos públicos são aplicados.
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-rose-100 group-hover:text-rose-600 flex items-center justify-center shrink-0 ml-2 transition-colors">
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* 3. Licitações */}
        <div
          onClick={() => onCardClick('licitacoes')}
          className="group bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all duration-200 hover:border-sky-300 hover:shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
              <Gavel className="w-6 h-6 stroke-[2.2] -rotate-12" />
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold text-[#0c2340] group-hover:text-sky-600 transition-colors leading-tight">
                Licitações
              </h3>
              <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
                Editais, processos e resultados de licitações.
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600 flex items-center justify-center shrink-0 ml-2 transition-colors">
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* 4. SIC / Ouvidoria */}
        <div
          onClick={() => onCardClick('sic-ouvidoria')}
          className="group bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all duration-200 hover:border-amber-300 hover:shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <MessageSquareMore className="w-6 h-6 fill-current stroke-none" />
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold text-[#0c2340] group-hover:text-amber-600 transition-colors leading-tight">
                SIC / Ouvidoria
              </h3>
              <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
                Solicite informações, faça sugestões ou denúncias.
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-600 flex items-center justify-center shrink-0 ml-2 transition-colors">
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

      </div>
    </section>
  );
};
