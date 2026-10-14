import React from 'react';
import { Brasao } from './Brasao.tsx';
import { ShieldCheck, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

export const Footer: React.FC<{ onOpenModal: (category: string) => void }> = ({ onOpenModal }) => {
  return (
    <footer className="bg-[#081a2f] text-slate-300 mt-20 border-t-4 border-[#059669]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-700/60">
          
          {/* Col 1: Prefeitura info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Brasao className="w-12 h-12" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Prefeitura Municipal de
                </span>
                <span className="text-base font-extrabold text-white">
                  São Miguel do Tocantins - TO
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trabalho por uma cidade melhor. Portal oficial de transparência pública, controle social e prestação de contas aos munícipes.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Conforme Lei 12.527/11 e LC 131/09</span>
            </div>
          </div>

          {/* Col 2: Contato e Endereço */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">
              Contato & Sede
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Av. Tocantins, nº 140, Centro, São Miguel do Tocantins - TO, CEP: 77925-000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>(63) 3447-1122 / 3447-1234</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>transparencia@saomigueldotocantins.to.gov.br</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Segunda a Sexta-feira: 07:30 às 13:30</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Atalhos de Transparência */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">
              Acesso Rápido
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenModal('receitas')} className="hover:text-emerald-400 transition">
                  • Consulta de Receitas Orçamentárias
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('despesas')} className="hover:text-emerald-400 transition">
                  • Consulta de Despesas e Empenhos
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('licitacoes')} className="hover:text-emerald-400 transition">
                  • Editais de Licitações e Contratos
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('recursos-humanos')} className="hover:text-emerald-400 transition">
                  • Quadro de Pessoal e Folha de Pagamento
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('sic-ouvidoria')} className="hover:text-emerald-400 transition">
                  • Serviço de Informação ao Cidadão (e-SIC)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Selos e Controle Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">
              Certificação & Selos
            </h4>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>★ Radar da Transparência Pública</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Avaliação dos Tribunais de Contas (ATRICON / TCE-TO). Nível Elevado de Transparência e Acessibilidade.
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              CNPJ: 25.064.041/0001-38
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Prefeitura Municipal de São Miguel do Tocantins - TO. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => onOpenModal('lgpd')} className="hover:text-emerald-400 transition">
              Termos de Uso & Privacidade (LGPD)
            </button>
            <span>•</span>
            <button onClick={() => onOpenModal('atos-normativos')} className="hover:text-emerald-400 transition">
              Diário Oficial
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
