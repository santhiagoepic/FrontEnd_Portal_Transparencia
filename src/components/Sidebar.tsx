import React from 'react';
import { 
  Zap, 
  FileText, 
  CreditCard, 
  Search, 
  HardHat, 
  CalendarDays, 
  MessageSquare, 
  ShieldAlert, 
  ChevronRight, 
  HelpCircle 
} from 'lucide-react';

interface SidebarProps {
  onQuickAccessClick: (itemKey: string) => void;
  onHelpClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onQuickAccessClick, onHelpClick }) => {
  const quickItems = [
    { key: 'despesas', label: 'Consultar despesas', icon: <FileText className="w-4 h-4 text-slate-500" /> },
    { key: 'receitas', label: 'Consultar receitas', icon: <CreditCard className="w-4 h-4 text-slate-500" /> },
    { key: 'licitacoes', label: 'Pesquisar licitações', icon: <Search className="w-4 h-4 text-slate-500" /> },
    { key: 'obras', label: 'Acompanhar obras', icon: <HardHat className="w-4 h-4 text-slate-500" /> },
    { key: 'diarias', label: 'Ver diárias e passagens', icon: <CalendarDays className="w-4 h-4 text-slate-500" /> },
    { key: 'sic', label: 'Acessar o SIC', icon: <MessageSquare className="w-4 h-4 text-slate-500" /> },
    { key: 'ouvidoria', label: 'Registrar na Ouvidoria', icon: <ShieldAlert className="w-4 h-4 text-slate-500" /> },
  ];

  return (
    <aside className="space-y-5">
      {/* 1. Acesso Rápido Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Clean Header Banner */}
        <div className="p-4 flex items-center gap-3 border-b border-slate-100 bg-white">
          <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#0c2340] leading-tight">
              Acesso Rápido
            </h3>
            <p className="text-[11.5px] text-slate-400 leading-tight mt-0.5">
              Serviços mais procurados pelos cidadãos.
            </p>
          </div>
        </div>

        {/* List of Quick Access Links */}
        <div className="divide-y divide-slate-100">
          {quickItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onQuickAccessClick(item.key)}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-50/70 transition group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-400 group-hover:text-emerald-700 transition">
                  {item.icon}
                </span>
                <span className="text-[13px] text-slate-700 font-medium group-hover:text-emerald-800 transition">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition" />
            </button>
          ))}
        </div>
      </div>

      {/* 2. Precisa de ajuda? Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
          <HelpCircle className="w-5 h-5" />
        </div>
        
        <h4 className="text-[16px] font-extrabold text-[#0c2340] leading-tight">
          Precisa de ajuda?
        </h4>
        
        <p className="text-[12px] text-slate-500 mt-1 mb-4 leading-relaxed">
          Encontre orientações, tutoriais e respostas para as dúvidas mais comuns.
        </p>

        <button
          onClick={onHelpClick}
          className="w-full bg-white hover:bg-slate-50 text-slate-700 hover:text-emerald-800 font-semibold text-xs sm:text-[13px] py-2.5 px-4 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <span>Ver perguntas frequentes</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </aside>
  );
};
