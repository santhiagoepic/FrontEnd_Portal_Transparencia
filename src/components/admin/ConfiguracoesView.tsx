import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Plus, 
  Search, 
  RefreshCw, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  Check,
  Filter,
  Layers,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../Toast';

interface ConfiguracoesViewProps {
  onBack: () => void;
  onNavigateToGroup: (groupId: string, subItem?: string, docId?: string) => void;
}

type ConfigTab = 
  | 'DECLARAÇÕES' 
  | 'AÇÕES' 
  | 'INSTITUIÇÃO' 
  | 'CONTRATADOS' 
  | 'LGPD' 
  | 'GRUPOS MENU' 
  | 'DASHBOARD' 
  | 'MENU';

export const ConfiguracoesView: React.FC<ConfiguracoesViewProps> = ({
  onBack,
  onNavigateToGroup,
}) => {
  const { currentUser, auditLogs } = useAuth();
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState<ConfigTab>('DECLARAÇÕES');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModulo, setSelectedModulo] = useState('todos');
  const [isRefreshingLembretes, setIsRefreshingLembretes] = useState(false);

  // Declarations mock state for the system
  const [declaracoes, setDeclaracoes] = useState([
    {
      id: 'dec-1',
      titulo: 'Declaração de Inexistência de Nepotismo (Súmula Vinculante 13/STF)',
      modulo: 'Recursos Humanos',
      moduloId: 'recursos-humanos',
      obrigatorio: true,
      status: 'Ativo',
      ultimaAtualizacao: '2026-03-10',
    },
    {
      id: 'dec-2',
      titulo: 'Declaração de Cumprimento do Art. 7º, XXXIII da CF (Trabalho de Menor)',
      modulo: 'Licitações',
      moduloId: 'licitacoes',
      obrigatorio: true,
      status: 'Ativo',
      ultimaAtualizacao: '2026-04-02',
    },
    {
      id: 'dec-3',
      titulo: 'Termo de Ciência e Notificação do Tribunal de Contas (TCE-TO)',
      modulo: 'Contratos',
      moduloId: 'contratos',
      obrigatorio: true,
      status: 'Ativo',
      ultimaAtualizacao: '2026-03-25',
    },
    {
      id: 'dec-4',
      titulo: 'Declaração de Regularidade Fiscal e Trabalhista Integrada',
      modulo: 'Licitações',
      moduloId: 'licitacoes',
      obrigatorio: true,
      status: 'Ativo',
      ultimaAtualizacao: '2026-04-12',
    },
    {
      id: 'dec-5',
      titulo: 'Termo de Encarregado e Política de Proteção de Dados (LGPD)',
      modulo: 'LGPD',
      moduloId: 'lgpd',
      obrigatorio: false,
      status: 'Ativo',
      ultimaAtualizacao: '2026-01-15',
    },
  ]);

  // Publicações Recentes no Portal (transferidas da tela de Dashboard)
  const recentPublications = [
    {
      id: 'doc-085',
      tipo: 'Portaria',
      numero: 'Portaria nº 085/2026',
      data: '2026-04-10',
      situacao: 'Publicado',
      responsavel: 'Dra. Ana Paula Castro',
      groupId: 'atos-normativos',
      subItem: 'Portarias',
    },
    {
      id: 'lic-012',
      tipo: 'Licitação',
      numero: 'Pregão Eletrônico nº 012/2026',
      data: '2026-04-08',
      situacao: 'Em Andamento',
      responsavel: 'Lucas Ribeiro Santos',
      groupId: 'licitacoes',
      subItem: 'Licitações',
    },
    {
      id: 'cont-045',
      tipo: 'Contrato',
      numero: 'Contrato Administrativo nº 045/2026',
      data: '2026-04-05',
      situacao: 'Vigente',
      responsavel: 'Mariana Duarte de Alencar',
      groupId: 'contratos',
      subItem: 'Contratos',
    },
    {
      id: 'doc-184',
      tipo: 'Decreto',
      numero: 'Decreto Municipal nº 184/2026',
      data: '2026-03-28',
      situacao: 'Publicado',
      responsavel: 'Dr. Carlos Eduardo Lima',
      groupId: 'atos-normativos',
      subItem: 'Decretos',
    },
    {
      id: 'doc-lei-420',
      tipo: 'Lei Municipal',
      numero: 'Lei Ordinária nº 420/2026',
      data: '2026-03-15',
      situacao: 'Publicado',
      responsavel: 'Gabinete do Prefeito',
      groupId: 'atos-normativos',
      subItem: 'Leis',
    },
  ];

  const tabs: ConfigTab[] = [
    'DECLARAÇÕES',
    'AÇÕES',
    'INSTITUIÇÃO',
    'CONTRATADOS',
    'LGPD',
    'GRUPOS MENU',
    'DASHBOARD',
    'MENU',
  ];

  const handleAtualizarLembretes = () => {
    setIsRefreshingLembretes(true);
    setTimeout(() => {
      setIsRefreshingLembretes(false);
      success('Contagem de lembretes e pendências atualizada com sucesso!');
    }, 400);
  };

  const handleAdicionarDeclaracao = () => {
    info('Formulário de cadastro de nova declaração/parâmetro aberto');
  };

  const filteredDeclaracoes = declaracoes.filter((d) => {
    const matchesSearch = 
      d.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.modulo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModulo = selectedModulo === 'todos' || d.moduloId === selectedModulo;
    return matchesSearch && matchesModulo;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* 1. TOPO DA TELA CONFORME IMAGEM DE EXEMPLO */}
      <div className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-0">
          
          {/* Header com botão voltar e título */}
          <div className="flex items-center gap-3.5 mb-2">
            <button
              onClick={onBack}
              className="w-8 h-8 bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center rounded transition cursor-pointer shadow-xs"
              title="Voltar à tela anterior"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Configurações
            </h1>
          </div>

          {/* Breadcrumb idêntico à imagem de exemplo */}
          <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-4 flex items-center gap-1.5">
            <span>VOCÊ ESTÁ AQUI:</span>
            <span className="text-slate-600">PÁGINA INICIAL</span>
            <span>&gt;</span>
            <span className="text-slate-600">CONFIGURAÇÕES</span>
            <span>&gt;</span>
            <span className="text-[#22c55e] font-extrabold">{activeTab}</span>
          </div>

          {/* Abas horizontais com acabamento idêntico à imagem de exemplo */}
          <div className="relative">
            <div className="flex items-end gap-1.5 overflow-x-auto scrollbar-none pt-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-xs font-bold transition whitespace-nowrap cursor-pointer rounded-t-lg border-t border-x ${
                      isActive
                        ? 'bg-[#22c55e] text-white border-[#22c55e] shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
            
            {/* Linha horizontal verde contínua abaixo das abas */}
            <div className="h-[3px] bg-[#22c55e] w-full" />
          </div>

        </div>
      </div>

      {/* 2. BARRA DE AÇÕES DA TELA DE CONFIGURAÇÕES */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5 flex-wrap flex-1 min-w-[280px]">
            {/* Botão ADICIONAR + */}
            <button
              onClick={handleAdicionarDeclaracao}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-lg text-xs font-extrabold transition cursor-pointer shadow-2xs"
            >
              <span>ADICIONAR</span>
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>

            {/* Input de Busca com Lupa */}
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Dropdown MÓDULO */}
            <select
              value={selectedModulo}
              onChange={(e) => setSelectedModulo(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 shadow-2xs cursor-pointer"
            >
              <option value="todos">MÓDULO ∨</option>
              <option value="atos-normativos">Atos Normativos</option>
              <option value="licitacoes">Licitações</option>
              <option value="contratos">Contratos</option>
              <option value="recursos-humanos">Recursos Humanos</option>
              <option value="lgpd">LGPD</option>
            </select>
          </div>

          {/* Botão ATUALIZAR CONTAGEM DE LEMBRETES */}
          <button
            onClick={handleAtualizarLembretes}
            disabled={isRefreshingLembretes}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-lg text-xs font-extrabold transition cursor-pointer shadow-2xs shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingLembretes ? 'animate-spin text-emerald-600' : ''}`} />
            <span>ATUALIZAR CONTAGEM DE LEMBRETES</span>
          </button>
        </div>
      </div>

      {/* 3. CONTEÚDO PRINCIPAL: ITENS MOVIDOS DO DASHBOARD (PUBLICAÇÕES RECENTES + AUDITORIA) E DECLARAÇÕES */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        
        {/* Tabela de Declarações e Parâmetros */}
        <section className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Declarações e Parâmetros Cadastrados</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Modelos de conformidade, termos e declarações de cumprimento legal do município
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Título do Parâmetro / Declaração</th>
                  <th className="py-3 px-3">Módulo</th>
                  <th className="py-3 px-3">Obrigatoriedade</th>
                  <th className="py-3 px-3">Situação</th>
                  <th className="py-3 px-3">Última Atualização</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDeclaracoes.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {item.titulo}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {item.modulo}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {item.obrigatorio ? (
                        <span className="text-[10.5px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Obrigatório
                        </span>
                      ) : (
                        <span className="text-[10.5px] text-slate-500 font-medium">
                          Opcional
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{item.ultimaAtualizacao}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => info(`Configurações de "${item.titulo}" abertas.`)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition text-[11px] cursor-pointer"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. SEÇÃO MOVIDA DO DASHBOARD: PUBLICAÇÕES RECENTES NO PORTAL + AUDITORIA E ATIVIDADES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Painel de Registros Recentes e Atividades Administrativas</span>
            </h2>
            <span className="text-xs text-slate-400">Transferido para as Configurações Gerais</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Publicações Recentes no Portal (2 colunas) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>Publicações Recentes no Portal</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clique no registro para abrir diretamente a página individual com ferramentas de edição
                  </p>
                </div>

                <button
                  onClick={() => onNavigateToGroup('atos-normativos')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">Tipo</th>
                      <th className="py-3 px-4">Identificação / Número</th>
                      <th className="py-3 px-3">Data</th>
                      <th className="py-3 px-3">Situação</th>
                      <th className="py-3 px-3">Responsável</th>
                      <th className="py-3 px-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentPublications.map((pub) => (
                      <tr 
                        key={pub.id} 
                        className="hover:bg-slate-50/80 transition cursor-pointer"
                        onClick={() => onNavigateToGroup(pub.groupId, pub.subItem, pub.id)}
                      >
                        <td className="py-3.5 px-4 font-bold text-slate-800">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                            {pub.tipo}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-emerald-900 hover:underline">
                            {pub.numero}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-500">{pub.data}</td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{pub.situacao}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-600 text-[11px] truncate max-w-[140px]">
                          {pub.responsavel}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateToGroup(pub.groupId, pub.subItem, pub.id);
                            }}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg transition text-[11px] flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Abrir e Editar</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Auditoria e Atividades Recentes (1 coluna) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span>Auditoria e Atividades Recentes</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Registro cronológico de operações administrativas
                  </p>
                </div>
              </div>

              <div className="p-5 overflow-y-auto max-h-[460px] space-y-4">
                {auditLogs.slice(0, 7).map((log) => (
                  <div key={log.id} className="relative pl-6 pb-4 border-l-2 border-emerald-200 last:border-l-transparent last:pb-0">
                    <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-50" />
                    
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                      <span className="font-semibold text-slate-700">{log.action}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div className="text-xs font-bold text-slate-900">
                      {log.recordTitle}
                    </div>

                    {log.details && (
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {log.details}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                      <span className="font-medium text-emerald-800">{log.userName}</span>
                      <span>•</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">
                        {log.userRole}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};
