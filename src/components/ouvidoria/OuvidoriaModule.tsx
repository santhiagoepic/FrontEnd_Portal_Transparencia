import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Search, 
  PlusCircle, 
  FileText, 
  BarChart3, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft, 
  FileCheck2, 
  ThumbsUp, 
  Lightbulb, 
  AlertTriangle, 
  AlertOctagon, 
  MessageSquarePlus,
  BookOpen,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { ModalidadeOuvidoria } from '../../types/ouvidoria.types';
import { useOuvidoria } from '../../hooks/useOuvidoria';
import { OUVIDORIA_CONTATOS } from '../../data/mock/ouvidoria.mock';
import { ManifestacaoFormModal } from './ManifestacaoFormModal';
import { ConsultaManifestacaoView } from './ConsultaManifestacaoView';
import { CartaServicosView } from './CartaServicosView';
import { useToast } from '../Toast';

interface OuvidoriaModuleProps {
  initialSubItem?: string;
  onBackToHome: () => void;
  onSelectGroup?: (groupId: string, subItem?: string) => void;
}

export const OuvidoriaModule: React.FC<OuvidoriaModuleProps> = ({
  initialSubItem,
  onBackToHome,
  onSelectGroup,
}) => {
  const { success, info } = useToast();
  const {
    estatisticas,
    cartaServicos,
    cartaState,
    manifestacaoConsultada,
    consultaState,
    consultaError,
    consultar,
    registrar,
    limparConsulta,
  } = useOuvidoria();

  // Navigation tabs within Ouvidoria
  const tabs = [
    'INÍCIO',
    'REGISTRAR',
    'CONSULTAR',
    'CARTA DE SERVIÇOS',
    'ESTATÍSTICAS',
    'LEGISLAÇÃO E PRAZOS'
  ];

  const getInitialTab = () => {
    if (!initialSubItem) return 'INÍCIO';
    const s = initialSubItem.toLowerCase();
    if (s.includes('carta')) return 'CARTA DE SERVIÇOS';
    if (s.includes('estat')) return 'ESTATÍSTICAS';
    if (s.includes('reclam') || s.includes('elog') || s.includes('denun') || s.includes('solicit') || s.includes('sugest')) {
      return 'REGISTRAR';
    }
    return 'INÍCIO';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [selectedModalidade, setSelectedModalidade] = useState<ModalidadeOuvidoria>('solicitacao');

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [initialSubItem]);

  const handleOpenFormWithModalidade = (mod: ModalidadeOuvidoria) => {
    setSelectedModalidade(mod);
    setModalFormOpen(true);
  };

  const modalidadesCards = [
    {
      tipo: 'solicitacao' as ModalidadeOuvidoria,
      titulo: 'Solicitação',
      desc: 'Peça atendimento de um serviço público ou providência da Prefeitura.',
      icon: <MessageSquarePlus className="w-5 h-5 text-teal-700" />,
      bg: 'hover:border-teal-400 bg-teal-50/40',
      badge: 'text-teal-700 bg-teal-100',
    },
    {
      tipo: 'elogio' as ModalidadeOuvidoria,
      titulo: 'Elogio',
      desc: 'Reconheça a qualidade ou bom atendimento de um servidor ou setor municipal.',
      icon: <ThumbsUp className="w-5 h-5 text-emerald-700" />,
      bg: 'hover:border-emerald-400 bg-emerald-50/40',
      badge: 'text-emerald-700 bg-emerald-100',
    },
    {
      tipo: 'sugestao' as ModalidadeOuvidoria,
      titulo: 'Sugestão',
      desc: 'Apresente ideias e propostas para melhorar os serviços municipais.',
      icon: <Lightbulb className="w-5 h-5 text-blue-700" />,
      bg: 'hover:border-blue-400 bg-blue-50/40',
      badge: 'text-blue-700 bg-blue-100',
    },
    {
      tipo: 'reclamacao' as ModalidadeOuvidoria,
      titulo: 'Reclamação',
      desc: 'Relate falha, atraso ou insatisfação com a execução de um serviço público.',
      icon: <AlertTriangle className="w-5 h-5 text-amber-700" />,
      bg: 'hover:border-amber-400 bg-amber-50/40',
      badge: 'text-amber-700 bg-amber-100',
    },
    {
      tipo: 'denuncia' as ModalidadeOuvidoria,
      titulo: 'Denúncia',
      desc: 'Notifique irregularidades, ilegalidades ou descumprimento de normas com opção anônima.',
      icon: <AlertOctagon className="w-5 h-5 text-rose-700" />,
      bg: 'hover:border-rose-400 bg-rose-50/40',
      badge: 'text-rose-700 bg-rose-100',
    },
  ];

  return (
    <div className="w-full bg-white pb-20">
      
      {/* 1. Header Banner & Official Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button 
                onClick={onBackToHome}
                className="hover:text-teal-700 font-medium transition cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Início do Portal</span>
              </button>
              <span>/</span>
              <span className="font-bold text-teal-800">Ouvidoria Geral do Município</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Canal Oficial de Transparência Passiva</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0c2340] tracking-tight">
                  Ouvidoria Geral de São Miguel do Tocantins
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Participe, fiscalize e colabore para a melhoria dos serviços públicos da nossa cidade.
                </p>
              </div>
            </div>

            {/* Direct Action: Nova Manifestação */}
            <button
              onClick={() => handleOpenFormWithModalidade('solicitacao')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition cursor-pointer self-start md:self-auto shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Fazer Nova Manifestação</span>
            </button>
          </div>

          {/* Browser-style Tab Bar */}
          <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto border-b border-slate-300 no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-2 text-xs font-bold uppercase transition whitespace-nowrap cursor-pointer border-b-2 -mb-px ${
                    isActive
                      ? 'border-teal-700 text-teal-900 bg-white rounded-t-lg'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* ================= TAB: INÍCIO ================= */}
        {activeTab === 'INÍCIO' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            
            {/* 1. Presentation & Presencial Contacts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Presentation Column */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Apresentação Institucional
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0c2340]">
                    O que é a Ouvidoria Municipal e para que serve?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                    A Ouvidoria Geral do Município de São Miguel do Tocantins é o canal democrático de comunicação direta entre os cidadãos e a Administração Pública Municipal. Sua principal missão é garantir os direitos dos usuários de serviços públicos, recebendo manifestações, examinando reclamações, acolhendo sugestões e promovendo melhorias na gestão pública com total transparência e imparcialidade.
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Todas as manifestações são registradas formalmente, recebem número de protocolo e código de acesso, permitindo o acompanhamento em tempo real desde a autuação até a resposta conclusiva do órgão responsável.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('CARTA DE SERVIÇOS')}
                    className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Consultar Carta de Serviços aos Usuários</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    onClick={() => setActiveTab('LEGISLAÇÃO E PRAZOS')}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Conhecer Prazos e Legislação</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Physical Atendimento Card */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0c2340]">
                        Atendimento Presencial
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {OUVIDORIA_CONTATOS.setor}
                      </p>
                    </div>
                  </div>

                  {/* Contact info list */}
                  <div className="space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <User className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Responsável:</strong> {OUVIDORIA_CONTATOS.responsavel} ({OUVIDORIA_CONTATOS.cargo})
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Endereço:</strong> {OUVIDORIA_CONTATOS.endereco} ({OUVIDORIA_CONTATOS.sala})
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Horário:</strong> {OUVIDORIA_CONTATOS.horario}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Telefone:</strong> {OUVIDORIA_CONTATOS.telefone} • <strong>WhatsApp:</strong> {OUVIDORIA_CONTATOS.whatsapp}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>E-mail:</strong> {OUVIDORIA_CONTATOS.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-200 text-[11px] text-teal-900 bg-teal-100/50 p-2.5 rounded-lg">
                  <strong>Prazo Geral de Resposta:</strong> Até 30 dias corridos (prorrogáveis por igual período).
                </div>
              </div>

            </div>

            {/* 2. Choose Modality Cards */}
            <div>
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#0c2340]">
                  Escolha o Tipo de Manifestação que Deseja Fazer
                </h3>
                <p className="text-xs text-slate-500">
                  Clique na modalidade desejada para abrir o formulário em 3 etapas com protocolo imediato.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {modalidadesCards.map((card) => (
                  <div
                    key={card.tipo}
                    onClick={() => handleOpenFormWithModalidade(card.tipo)}
                    className={`p-4 rounded-xl border border-slate-200 transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${card.bg}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-white shadow-2xs flex items-center justify-center">
                          {card.icon}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badge}`}>
                          Registrar
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">
                        {card.titulo}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center text-xs font-bold text-slate-700 group-hover:text-teal-800">
                      <span>Iniciar Registro →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Fast Consultation Box */}
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-2xs">
              <ConsultaManifestacaoView
                manifestacao={manifestacaoConsultada}
                isLoading={consultaState === 'loading'}
                error={consultaError}
                onConsultar={consultar}
                onLimpar={limparConsulta}
              />
            </div>

            {/* 4. Statistics Summary Banner */}
            {estatisticas && (
              <div className="bg-[#0c2340] text-white rounded-xl p-6 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      Transparência em Números • Exercício {estatisticas.ano}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      Relatório Estatístico de Manifestações da Ouvidoria
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('ESTATÍSTICAS')}
                    className="text-xs font-bold text-teal-300 hover:text-teal-200 underline cursor-pointer"
                  >
                    Ver Relatório Completo Detalhado →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <span className="text-xs text-slate-300">Total de Manifestações</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {estatisticas.total}
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <span className="text-xs text-slate-300">Respondidas / Concluídas</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 mt-1">
                      {estatisticas.respondidas}
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <span className="text-xs text-slate-300">Tempo Médio de Resposta</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {estatisticas.tempoMedioDias} dias
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <span className="text-xs text-slate-300">Índice de Satisfação</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 mt-1">
                      {estatisticas.taxaSatisfacao}%
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= TAB: REGISTRAR ================= */}
        {activeTab === 'REGISTRAR' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c2340]">
                Formulário de Registro de Manifestação
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                Preencha os dados em 3 etapas simples para formalizar sua solicitação, elogio, sugestão, reclamação ou denúncia perante a Ouvidoria Geral.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4">
              {modalidadesCards.map((card) => (
                <button
                  key={card.tipo}
                  onClick={() => handleOpenFormWithModalidade(card.tipo)}
                  className={`p-4 rounded-xl border border-slate-200 text-left transition hover:shadow-md cursor-pointer ${card.bg}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center mb-2">
                    {card.icon}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    {card.titulo}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {card.desc}
                  </p>
                  <span className="mt-3 inline-block text-xs font-bold text-teal-800 underline">
                    Abrir Formulário
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Garantia de Sigilo e Proteção ao Denunciante</span>
              </div>
              <p>
                A Prefeitura Municipal de São Miguel do Tocantins assegura a proteção da identidade do manifestante, conforme preceituam a Lei nº 13.460/2017 e a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Caso deseje, você pode enviar denúncias de forma anônima.
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB: CONSULTAR ================= */}
        {activeTab === 'CONSULTAR' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-200">
            <ConsultaManifestacaoView
              manifestacao={manifestacaoConsultada}
              isLoading={consultaState === 'loading'}
              error={consultaError}
              onConsultar={consultar}
              onLimpar={limparConsulta}
            />
          </div>
        )}

        {/* ================= TAB: CARTA DE SERVIÇOS ================= */}
        {activeTab === 'CARTA DE SERVIÇOS' && (
          <div className="animate-in fade-in duration-200">
            <CartaServicosView
              servicos={cartaServicos}
              isLoading={cartaState === 'loading'}
              onBackToOuvidoria={() => setActiveTab('INÍCIO')}
            />
          </div>
        )}

        {/* ================= TAB: ESTATÍSTICAS ================= */}
        {activeTab === 'ESTATÍSTICAS' && estatisticas && (
          <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
            
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c2340]">
                Relatório Estatístico da Ouvidoria Municipal
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Demonstrativo de manifestações recebidas, índices de atendimento e distribuição por secretarias no exercício {estatisticas.ano}.
              </p>
            </div>

            {/* Numbers Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs text-slate-500">Total Recebido</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0c2340] mt-1">{estatisticas.total}</div>
                <span className="text-[11px] text-teal-700 font-medium">100% autuadas</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs text-slate-500">Respondidas</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{estatisticas.respondidas}</div>
                <span className="text-[11px] text-emerald-700 font-medium">{((estatisticas.respondidas / estatisticas.total) * 100).toFixed(1)}% de resolução</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs text-slate-500">Em Tramitação</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 mt-1">{estatisticas.emTramitacao}</div>
                <span className="text-[11px] text-blue-700 font-medium">Dentro do prazo legal</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs text-slate-500">Tempo Médio</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 mt-1">{estatisticas.tempoMedioDias} dias</div>
                <span className="text-[11px] text-slate-500">Limite legal: 30 dias</span>
              </div>
            </div>

            {/* Distribution by Modality */}
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
                Quantidade de Manifestações por Categoria / Modalidade
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Solicitações de Serviços</span>
                    <span>{estatisticas.porModalidade.solicitacao} ({((estatisticas.porModalidade.solicitacao / estatisticas.total) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-teal-600 h-full rounded-full" 
                      style={{ width: `${(estatisticas.porModalidade.solicitacao / estatisticas.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Elogios</span>
                    <span>{estatisticas.porModalidade.elogio} ({((estatisticas.porModalidade.elogio / estatisticas.total) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full rounded-full" 
                      style={{ width: `${(estatisticas.porModalidade.elogio / estatisticas.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Sugestões</span>
                    <span>{estatisticas.porModalidade.sugestao} ({((estatisticas.porModalidade.sugestao / estatisticas.total) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full" 
                      style={{ width: `${(estatisticas.porModalidade.sugestao / estatisticas.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Reclamações</span>
                    <span>{estatisticas.porModalidade.reclamacao} ({((estatisticas.porModalidade.reclamacao / estatisticas.total) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-600 h-full rounded-full" 
                      style={{ width: `${(estatisticas.porModalidade.reclamacao / estatisticas.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Denúncias</span>
                    <span>{estatisticas.porModalidade.denuncia} ({((estatisticas.porModalidade.denuncia / estatisticas.total) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-600 h-full rounded-full" 
                      style={{ width: `${(estatisticas.porModalidade.denuncia / estatisticas.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution by Secretariat */}
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
                Demandas por Secretaria ou Órgão Demandado
              </h3>

              <div className="divide-y divide-slate-200 text-xs sm:text-[13px]">
                {estatisticas.porSecretaria.map((sec, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-800">{sec.secretaria}</span>
                    <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {sec.quantidade} manifestações
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB: LEGISLAÇÃO E PRAZOS ================= */}
        {activeTab === 'LEGISLAÇÃO E PRAZOS' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c2340]">
                Legislação, Prazos e Regulamentação
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Conheça os diplomas legais que norteiam a atuação da Ouvidoria Municipal e os direitos do usuário de serviços públicos em São Miguel do Tocantins.
              </p>
            </div>

            {/* Prazos Card */}
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>Prazos de Tramitação e Resposta</span>
              </div>
              <p className="text-xs text-teal-950 leading-relaxed text-justify">
                {OUVIDORIA_CONTATOS.prazosTexto} O usuário recebe notificação em caso de prorrogação motivada. Respostas conclusivas são publicadas com fundamentação clara e indicação de eventuais recursos cabíveis.
              </p>
            </div>

            {/* Legislação List separated ONLY by horizontal lines */}
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2">
                Normas e Regulamentos Municipais e Federais
              </h3>

              <div className="divide-y divide-slate-200 text-xs sm:text-[13px]">
                {OUVIDORIA_CONTATOS.legislacao.map((leg, i) => (
                  <div key={i} className="py-3 space-y-1">
                    <h4 className="font-bold text-teal-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{leg.titulo}</span>
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-justify">
                      {leg.descricao}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Floating / Standalone Manifestação Form Modal */}
      <ManifestacaoFormModal
        isOpen={modalFormOpen}
        onClose={() => setModalFormOpen(false)}
        modalidadeInicial={selectedModalidade}
        onSubmit={registrar}
      />

    </div>
  );
};
