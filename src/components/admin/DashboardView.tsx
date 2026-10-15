import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Gavel, 
  FileCheck2, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Users, 
  PlusCircle, 
  ArrowRight, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  UserCheck, 
  AlertCircle,
  Eye,
  Settings,
  Sparkles,
  FilePlus,
  Layers,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../Toast';
import { UserManagementModal } from './UserManagementModal';
import { CreatePublicationModal } from './CreatePublicationModal';
import { DocumentoOficialDTO } from '../../types/api.types';

interface DashboardViewProps {
  onNavigateToGroup: (groupId: string, subItem?: string, docId?: string) => void;
  onOpenPublicPortal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToGroup,
  onOpenPublicPortal,
}) => {
  const { currentUser, isMaster, hasPermission, auditLogs } = useAuth();
  const { info } = useToast();

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModule, setCreateModule] = useState('atos-normativos');
  const [createTab, setCreateTab] = useState('PORTARIAS');

  // Sample recent publications that link directly to their respective group/module
  const [recentPublications, setRecentPublications] = useState([
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
  ]);

  const handleOpenCreateModal = (mod: string, tab: string) => {
    setCreateModule(mod);
    setCreateTab(tab);
    setCreateModalOpen(true);
  };

  const handleCreatedSuccess = (newDoc: DocumentoOficialDTO) => {
    setRecentPublications(prev => [
      {
        id: newDoc.id,
        tipo: newDoc.categoria || 'Portaria',
        numero: newDoc.numero,
        data: newDoc.assinatura,
        situacao: 'Publicado',
        responsavel: currentUser?.name || 'Administrador',
        groupId: 'atos-normativos',
        subItem: newDoc.categoria || 'Portarias',
      },
      ...prev,
    ]);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                <span>Portal da Transparência</span>
                <span>/</span>
                <span className="text-emerald-700 font-bold">Painel Administrativo</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                <LayoutDashboard className="w-6 h-6 text-[#0b5444]" />
                <span>Dashboard de Gestão Pública</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Prefeitura Municipal de São Miguel do Tocantins — Ambiente integrado de publicação e gestão
              </p>
            </div>

            {/* User status card & action */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                {currentUser?.name.charAt(0) || 'A'}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">{currentUser?.name}</span>
                  <span
                    className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full ${
                      currentUser?.role === 'MASTER'
                        ? 'bg-emerald-700 text-white'
                        : currentUser?.role === 'ADMIN'
                        ? 'bg-blue-700 text-white'
                        : 'bg-purple-700 text-white'
                    }`}
                  >
                    {currentUser?.role}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">{currentUser?.cargo}</span>
              </div>

              <div className="ml-3 pl-3 border-l border-slate-200">
                <button
                  onClick={onOpenPublicPortal}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ver Portal Público</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* 1. VISÃO GERAL: KPI Cards */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Visão Geral do Sistema</span>
            </h2>
            <span className="text-xs text-slate-400">Dados consolidados do município</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {/* Atos Normativos */}
            {hasPermission('atos-normativos', 'view_admin') && (
              <div 
                onClick={() => onNavigateToGroup('atos-normativos')}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Atos Normativos</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-2">1.248</div>
                <p className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                  <span>+14 este mês</span>
                </p>
              </div>
            )}

            {/* Licitações */}
            {hasPermission('licitacoes', 'view_admin') && (
              <div 
                onClick={() => onNavigateToGroup('licitacoes')}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Licitações</span>
                  <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                    <Gavel className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-2">32</div>
                <p className="text-[10px] text-sky-700 font-semibold mt-1 flex items-center gap-1">
                  <span>8 em andamento</span>
                </p>
              </div>
            )}

            {/* Contratos */}
            {hasPermission('contratos', 'view_admin') && (
              <div 
                onClick={() => onNavigateToGroup('contratos')}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contratos</span>
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-2">84</div>
                <p className="text-[10px] text-purple-700 font-semibold mt-1 flex items-center gap-1">
                  <span>62 vigentes</span>
                </p>
              </div>
            )}

            {/* Despesas */}
            {hasPermission('despesas', 'view_admin') && (
              <div 
                onClick={() => onNavigateToGroup('despesas')}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-rose-300 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Despesas</span>
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-2">R$ 28,4M</div>
                <p className="text-[10px] text-slate-500 font-medium mt-1">Exercício 2026</p>
              </div>
            )}

            {/* Receitas */}
            {hasPermission('receitas', 'view_admin') && (
              <div 
                onClick={() => onNavigateToGroup('receitas')}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Receitas</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-2">R$ 31,8M</div>
                <p className="text-[10px] text-emerald-700 font-semibold mt-1">Arrecadação 104%</p>
              </div>
            )}

            {/* Auditoria / Histórico */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Auditoria</span>
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">{auditLogs.length}</div>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Operações rastreadas</p>
            </div>
          </div>
        </section>

        {/* 2. AÇÕES RÁPIDAS (Filtradas pelas permissões do usuário) */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Ações Rápidas de Publicação</span>
            </h2>
            <span className="text-xs text-slate-400">Ações autorizadas para o seu perfil</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {hasPermission('atos-normativos', 'create') && (
              <button
                onClick={() => handleOpenCreateModal('atos-normativos', 'PORTARIAS')}
                className="p-3.5 bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl text-left transition flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center group-hover:scale-105 transition shrink-0">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950">Nova Portaria</div>
                  <div className="text-[10px] text-emerald-700">Atos Normativos</div>
                </div>
              </button>
            )}

            {hasPermission('atos-normativos', 'create') && (
              <button
                onClick={() => handleOpenCreateModal('atos-normativos', 'DECRETOS')}
                className="p-3.5 bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl text-left transition flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center group-hover:scale-105 transition shrink-0">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950">Novo Decreto</div>
                  <div className="text-[10px] text-emerald-700">Atos Normativos</div>
                </div>
              </button>
            )}

            {hasPermission('licitacoes', 'create') && (
              <button
                onClick={() => handleOpenCreateModal('licitacoes', 'EDITAIS')}
                className="p-3.5 bg-sky-50/70 hover:bg-sky-100/80 border border-sky-200/80 rounded-xl text-left transition flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-700 text-white flex items-center justify-center group-hover:scale-105 transition shrink-0">
                  <Gavel className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-sky-950">Nova Licitação</div>
                  <div className="text-[10px] text-sky-700">Edital & Anexos</div>
                </div>
              </button>
            )}

            {hasPermission('contratos', 'create') && (
              <button
                onClick={() => handleOpenCreateModal('contratos', 'CONTRATOS')}
                className="p-3.5 bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200/80 rounded-xl text-left transition flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-700 text-white flex items-center justify-center group-hover:scale-105 transition shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-purple-950">Novo Contrato</div>
                  <div className="text-[10px] text-purple-700">Termos & Aditivos</div>
                </div>
              </button>
            )}

            {/* MASTER: Acesso à Gestão de Usuários */}
            {isMaster && (
              <button
                onClick={() => setUserModalOpen(true)}
                className="p-3.5 bg-amber-50/80 hover:bg-amber-100 border border-amber-200 rounded-xl text-left transition flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-700 text-white flex items-center justify-center group-hover:scale-105 transition shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-950">Gerenciar Usuários</div>
                  <div className="text-[10px] text-amber-700">Exclusivo MASTER</div>
                </div>
              </button>
            )}
          </div>
        </section>

        {/* 3. GRID 2 COLUNAS: PUBLICAÇÕES RECENTES + ATIVIDADES DE AUDITORIA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Publicações Recentes (2 colunas) */}
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

          {/* Atividades Recentes de Auditoria (1 coluna) */}
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

      </div>

      {/* User Management Modal (MASTER exclusive) */}
      <UserManagementModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
      />

      {/* Create Publication Modal */}
      <CreatePublicationModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        defaultModule={createModule}
        defaultTab={createTab}
        onSuccessCreated={handleCreatedSuccess}
      />
    </div>
  );
};
