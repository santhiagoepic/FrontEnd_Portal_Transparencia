import React from 'react';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query?: string) => void;
  onTagClick: (tag: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onTagClick,
}) => {
  const exampleTags = [
    'despesas 2024',
    'contratos',
    'licitações',
    'folha de pagamento',
    'leis municipais',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <section className="pt-8 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Welcome Text */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="text-[11px] font-bold tracking-[0.25em] text-slate-700 uppercase mb-1">
            B E M - V I N D O &nbsp; A O
          </div>
          
          <h1 className="text-4xl sm:text-[45px] font-extrabold tracking-tight leading-[1.1] mb-3 text-[#0c2340]">
            Portal da <span className="text-[#059669]">Transparência</span>
          </h1>

          <div className="text-slate-600 text-[14.5px] leading-relaxed space-y-0.5">
            <p>Acompanhe como os recursos públicos são aplicados em nosso município.</p>
            <p>Consulte receitas, despesas, contratos, licitações, obras e muito mais.</p>
          </div>
        </div>

        {/* Right Column: Search Area directly on page, without the outer enclosing rectangle */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="relative w-full">
            <div className="flex items-center gap-2 border border-slate-200/90 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-600 transition bg-white shadow-2xs hover:border-slate-300">
              <Search className="w-5 h-5 text-slate-400 ml-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar no portal"
                className="w-full text-slate-800 placeholder:text-slate-400 text-sm sm:text-base outline-none bg-transparent px-2"
              />
              <button
                type="submit"
                className="bg-[#1b7a63] hover:bg-[#146451] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition shrink-0 cursor-pointer shadow-xs"
              >
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </button>
            </div>
          </form>

          <p className="text-[12px] sm:text-[12.5px] text-slate-400 text-center mt-2.5">
            Pesquise por receitas, despesas, contratos, licitações, leis, servidores e outros conteúdos.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-3 pt-1">
            <span className="text-xs font-bold text-slate-700 mr-1 shrink-0">
              Exemplos de busca:
            </span>
            {exampleTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick(tag)}
                className="bg-[#edf2f7] hover:bg-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-full transition cursor-pointer font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
