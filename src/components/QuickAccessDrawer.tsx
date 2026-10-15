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
  HelpCircle,
  X
} from 'lucide-react';

interface QuickAccessDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSelectItem: (itemKey: string) => void;
  onOpenHelp: () => void;
}

export const QuickAccessDrawer: React.FC<QuickAccessDrawerProps> = ({
  isOpen,
  onClose,
  onOpen,
  onSelectItem,
  onOpenHelp,
}) => {
  const quickItems = [
    { key: 'despesas', label: 'Consultar despesas', desc: 'Execução orçamentária e notas de empenho', icon: <FileText className="w-4 h-4 text-rose-600" />, iconBg: 'bg-rose-50' },
    { key: 'receitas', label: 'Consultar receitas', desc: 'Arrecadação de tributos e transferências', icon: <CreditCard className="w-4 h-4 text-emerald-600" />, iconBg: 'bg-emerald-50' },
    { key: 'licitacoes', label: 'Pesquisar licitações', desc: 'Editais, pregões e concorrências públicas', icon: <Search className="w-4 h-4 text-sky-600" />, iconBg: 'bg-sky-50' },
    { key: 'obras', label: 'Acompanhar obras', desc: 'Andamento físico e medições em andamento', icon: <HardHat className="w-4 h-4 text-amber-600" />, iconBg: 'bg-amber-50' },
    { key: 'diarias', label: 'Ver diárias e passagens', desc: 'Concessões a servidores e agentes públicos', icon: <CalendarDays className="w-4 h-4 text-purple-600" />, iconBg: 'bg-purple-50' },
    { key: 'sic', label: 'Acessar o SIC', desc: 'Serviço de Informação ao Cidadão (e-SIC)', icon: <MessageSquare className="w-4 h-4 text-teal-600" />, iconBg: 'bg-teal-50' },
    { key: 'ouvidoria', label: 'Registrar na Ouvidoria', desc: 'Sugestões, denúncias, elogios e reclamações', icon: <ShieldAlert className="w-4 h-4 text-orange-600" />, iconBg: 'bg-orange-50' },
  ];

  return (
    <>
      {/* 1. Sleek Floating Lateral Tab - Permanent Vertical Tab as in User Reference Image */}
      <aside 
        aria-label="Acesso Rápido e Dúvidas"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none"
      >
        <button
          onClick={onOpen}
          className="bg-[#0c2340] hover:bg-[#071a30] text-white shadow-2xl rounded-l-2xl border-l-[2.5px] border-y-2 border-amber-400 pt-2.5 pb-4 px-1.5 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-200 transform hover:-translate-x-1 group focus:outline-none focus:ring-2 focus:ring-amber-400"
          title="Acesso Rápido - Clique para abrir o menu"
          aria-label="Acesso Rápido - Clique para abrir o menu"
        >
          {/* Quadrado âmbar arredondado com o raio preto idêntico à imagem */}
          <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:bg-amber-300 transition-transform">
            <Zap className="w-4 h-4 fill-slate-950 text-slate-950 stroke-[2.5]" />
          </div>

          {/* Texto ACESSO RÁPIDO na vertical idêntico à imagem */}
          <span 
            style={{ writingMode: 'vertical-rl' }}
            className="text-[10.5px] font-black uppercase tracking-widest text-amber-400 select-none whitespace-nowrap group-hover:text-amber-300 transition-colors"
          >
            ACESSO RÁPIDO
          </span>
        </button>
      </aside>

      {/* 2. Slide-over Lateral Drawer (without occupying the whole screen) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200/80 animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 shadow-2xs">
                    <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[16px] text-[#0c2340]">
                      Acesso Rápido
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Serviços mais buscados pelos cidadãos
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content / List of Quick Access */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {quickItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      onSelectItem(item.key);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13.5px] font-bold text-slate-800 group-hover:text-emerald-800 transition-colors truncate">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-400 group-hover:text-slate-500 truncate">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}

                {/* Bottom Card: Precisa de Ajuda / Dúvidas */}
                <div className="mt-6 pt-2">
                  <div className="bg-[#eaf4fe] border border-sky-200/70 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-xs">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-[14.5px] text-[#0c2340]">
                        Dúvidas Frequentes?
                      </h4>
                    </div>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed">
                      Encontre orientações passo a passo sobre pedidos de informação, leis municipais e fiscalização.
                    </p>
                    <button
                      onClick={() => {
                        onOpenHelp();
                        onClose();
                      }}
                      className="w-full bg-white hover:bg-sky-50 text-[#0284c7] font-bold text-xs py-2 px-3 rounded-xl border border-sky-300 flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                    >
                      <span>Ver perguntas frequentes</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-400">
                <span>São Miguel do Tocantins - TO</span>
                <button
                  onClick={onClose}
                  className="text-slate-600 hover:text-slate-900 font-medium"
                >
                  Fechar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
