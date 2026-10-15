import React, { useState, useEffect } from 'react';
import { 
  FileSearch, 
  PlusCircle, 
  Search, 
  MapPin, 
  User, 
  Clock, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  BookOpen, 
  BarChart3, 
  Lock, 
  AlertCircle,
  HelpCircle,
  Scale,
  FileText
} from 'lucide-react';
import { useEsic } from '../../hooks/useEsic';
import { SIC_FISICO_INFO } from '../../data/mock/esic.mock';
import { SolicitacaoEsicFormModal } from './SolicitacaoEsicFormModal';
import { AcompanhamentoEsicView } from './AcompanhamentoEsicView';
import { InformacoesClassificadasView } from './InformacoesClassificadasView';
import { useToast } from '../Toast';

interface EsicModuleProps {
  initialSubItem?: string;
  onBackToHome: () => void;
  onSelectGroup?: (groupId: string, subItem?: string) => void;
}

export const EsicModule: React.FC<EsicModuleProps> = ({
  initialSubItem,
  onBackToHome,
  onSelectGroup,
}) => {
  const { success } = useToast();
  const {
    estatisticas,
    pedidoConsultado,
    consultaState,
    consultaError,
    classificadas,
    classificadasState,
    desclassificadas,
    desclassificadasState,
    consultar,
    registrar,
    interporRecurso,
    limparConsulta,
  } = useEsic();

  const tabs = [
    'INÍCIO',
    'FAZER PEDIDO',
    'ACOMPANHAR PEDIDO',
    'CLASSIFICADAS E DESCLASSIFICADAS',
    'ESTATÍSTICAS',
    'LEGISLAÇÃO E RECURSOS'
  ];

  const getInitialTab = () => {
    if (!initialSubItem) return 'INÍCIO';
    const s = initialSubItem.toLowerCase();
    if (s.includes('classif') || s.includes('sigil')) return 'CLASSIFICADAS E DESCLASSIFICADAS';
    if (s.includes('estat')) return 'ESTATÍSTICAS';
    if (s.includes('acompanh') || s.includes('consult')) return 'ACOMPANHAR PEDIDO';
    if (s.includes('pedid') || s.includes('solicit')) return 'FAZER PEDIDO';
    return 'INÍCIO';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [modalFormOpen, setModalFormOpen] = useState(false);

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [initialSubItem]);

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
              <span className="font-bold text-teal-800">Serviço de Informação ao Cidadão (e-SIC)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Lei Federal nº 12.527/2011 (LAI)</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-md shrink-0">
                <FileSearch className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0c2340] tracking-tight">
                  e-SIC — Sistema Eletrônico do Serviço de Informação ao Cidadão
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Prefeitura Municipal de São Miguel do Tocantins • Transparência Passiva Garantida por Lei
                </p>
              </div>
            </div>

            {/* Direct Action: Fazer Pedido */}
            <button
              onClick={() => setModalFormOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition cursor-pointer self-start md:self-auto shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Fazer Pedido de Informação</span>
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
            
            {/* 1. Presentation & Presencial Contacts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Presentation */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Direito Constitucional de Acesso à Informação
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0c2340]">
                    O que é o e-SIC e como solicitar informações públicas?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                    O <strong>Sistema Eletrônico do Serviço de Informação ao Cidadão (e-SIC)</strong> permite que qualquer pessoa física ou jurídica encaminhe pedidos de acesso a informações e documentos públicos aos órgãos e entidades do Poder Executivo de São Miguel do Tocantins.
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed text-justify">
                    A publicidade é a regra geral e o sigilo, a exceção (Art. 3º da Lei Federal nº 12.527/2011). Não é exigida nenhuma justificativa para o seu pedido. Você pode acompanhar prazos, receber respostas diretamente pelo sistema e interpor recursos quando cabível.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setModalFormOpen(true)}
                    className="text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-lg transition cursor-pointer shadow-2xs"
                  >
                    Registrar Novo Pedido Agora
                  </button>
                  <button
                    onClick={() => setActiveTab('ACOMPANHAR PEDIDO')}
                    className="text-xs font-bold text-teal-800 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Já tenho um protocolo, consultar andamento</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Physical SIC Info */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0c2340]">
                        SIC Físico (Presencial)
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {SIC_FISICO_INFO.setor}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <User className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Responsável:</strong> {SIC_FISICO_INFO.responsavel} ({SIC_FISICO_INFO.cargo})
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Endereço:</strong> {SIC_FISICO_INFO.endereco} ({SIC_FISICO_INFO.sala})
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Horário de Atendimento:</strong> {SIC_FISICO_INFO.horario}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Telefone:</strong> {SIC_FISICO_INFO.telefone}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>E-mail Institucional:</strong> {SIC_FISICO_INFO.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-200 text-[11px] text-teal-900 bg-teal-100/50 p-2.5 rounded-lg">
                  <strong>Prazos da LAI:</strong> Até 20 dias corridos, prorrogáveis por mais 10 dias com justificativa expressa.
                </div>
              </div>

            </div>

            {/* 2. Fast Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div 
                onClick={() => setModalFormOpen(true)}
                className="bg-white border border-slate-200 hover:border-teal-400 p-5 rounded-xl shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    Fazer Solicitação de Informação
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Formule seu pedido em 3 etapas com recebimento imediato de protocolo e chave de segurança.
                  </p>
                </div>
                <span className="mt-4 text-xs font-bold text-teal-700 flex items-center gap-1">
                  <span>Iniciar pedido</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div 
                onClick={() => setActiveTab('ACOMPANHAR PEDIDO')}
                className="bg-white border border-slate-200 hover:border-teal-400 p-5 rounded-xl shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    Acompanhar Pedido Existente
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Consulte o andamento, visualize respostas dos órgãos e interponha recursos em 1ª e 2ª instância.
                  </p>
                </div>
                <span className="mt-4 text-xs font-bold text-teal-700 flex items-center gap-1">
                  <span>Consultar protocolo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div 
                onClick={() => setActiveTab('CLASSIFICADAS E DESCLASSIFICADAS')}
                className="bg-white border border-slate-200 hover:border-teal-400 p-5 rounded-xl shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    Informações Classificadas e Desclassificadas
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Consulte os relatórios anuais de documentos com reserva temporária de sigilo ou desclassificados.
                  </p>
                </div>
                <span className="mt-4 text-xs font-bold text-teal-700 flex items-center gap-1">
                  <span>Acessar relatórios</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>

            {/* 3. Fast Consultation Preview */}
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-2xs">
              <AcompanhamentoEsicView
                pedido={pedidoConsultado}
                isLoading={consultaState === 'loading'}
                error={consultaError}
                onConsultar={consultar}
                onInterporRecurso={interporRecurso}
                onLimpar={limparConsulta}
              />
            </div>

            {/* 4. Statistics Banner */}
            {estatisticas && (
              <div className="bg-[#0c2340] text-white rounded-xl p-6 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      Transparência Passiva • Exercício {estatisticas.ano}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      Relatório Estatístico de Atendimentos do e-SIC
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('ESTATÍSTICAS')}
                    className="text-xs font-bold text-teal-300 hover:text-teal-200 underline cursor-pointer"
                  >
                    Ver Dados Analíticos →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <span className="text-xs text-slate-300">Total de Pedidos LAI</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {estatisticas.totalPedidos}
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <span className="text-xs text-slate-300">Pedidos Atendidos</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 mt-1">
                      {estatisticas.atendidos}
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <span className="text-xs text-slate-300">Tempo Médio de Atendimento</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {estatisticas.tempoMedioDias} dias
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <span className="text-xs text-slate-300">Índice de Atendimento</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 mt-1">
                      {estatisticas.indiceAtendimento}%
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= TAB: FAZER PEDIDO ================= */}
        {activeTab === 'FAZER PEDIDO' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c2340]">
                Solicitação de Informação ao Município
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                Preencha os dados do seu pedido de acesso à informação. O prazo de resposta é de 20 dias, conforme a Lei Federal nº 12.527/2011.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4 shadow-sm">
              <FileSearch className="w-12 h-12 text-teal-700 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">
                  Pronto para formalizar sua solicitação?
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Clique no botão abaixo para abrir o formulário completo em 3 etapas com confirmação e geração imediata de protocolo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalFormOpen(true)}
                className="px-6 py-3 text-xs sm:text-sm font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Abrir Formulário de Pedido e-SIC</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB: ACOMPANHAR PEDIDO ================= */}
        {activeTab === 'ACOMPANHAR PEDIDO' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-200">
            <AcompanhamentoEsicView
              pedido={pedidoConsultado}
              isLoading={consultaState === 'loading'}
              error={consultaError}
              onConsultar={consultar}
              onInterporRecurso={interporRecurso}
              onLimpar={limparConsulta}
            />
          </div>
        )}

        {/* ================= TAB: CLASSIFICADAS E DESCLASSIFICADAS ================= */}
        {activeTab === 'CLASSIFICADAS E DESCLASSIFICADAS' && (
          <div className="animate-in fade-in duration-200">
            <InformacoesClassificadasView
              classificadas={classificadas}
              desclassificadas={desclassificadas}
              isLoadingClassificadas={classificadasState === 'loading'}
              isLoadingDesclassificadas={desclassificadasState === 'loading'}
            />
          </div>
        )}

        {/* ================= TAB: ESTATÍSTICAS ================= */}
        {activeTab === 'ESTATÍSTICAS' && estatisticas && (
          <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c2340]">
                Estatísticas de Acesso à Informação (e-SIC)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Relatório analítico de pedidos protocolados, concedidos, indeferidos e recursos no exercício {estatisticas.ano}.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs text-slate-500">Pedidos Recebidos</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0c2340] mt-1">{estatisticas.totalPedidos}</div>
                <span className="text-[11px] text-teal-700 font-medium">100% autuados</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs text-slate-500">Pedidos Deferidos</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{estatisticas.atendidos}</div>
                <span className="text-[11px] text-emerald-700 font-medium">{estatisticas.indiceAtendimento}% deferimento</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs text-slate-500">Indeferidos</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 mt-1">{estatisticas.indeferidos}</div>
                <span className="text-[11px] text-rose-700 font-medium">Com fundamentação</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs text-slate-500">Recursos</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 mt-1">{estatisticas.recursosInterpostos}</div>
                <span className="text-[11px] text-purple-700 font-medium">1ª e 2ª Instância</span>
              </div>
            </div>

            {/* Demands by Theme */}
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
                Temas Mais Demandados pelos Cidadãos
              </h3>

              <div className="space-y-3">
                {estatisticas.porTema.map((t, idx) => {
                  const perc = ((t.quantidade / estatisticas.totalPedidos) * 100).toFixed(1);
                  return (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>{t.tema}</span>
                        <span>{t.quantidade} pedidos ({perc}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-teal-600 h-full rounded-full" 
                          style={{ width: `${perc}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB: LEGISLAÇÃO E RECURSOS ================= */}
        {activeTab === 'LEGISLAÇÃO E RECURSOS' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c2340]">
                Legislação, Regulamentação e Procedimentos de Recurso
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Conheça os prazos legais, procedimentos de tramitação e como recorrer em caso de indeferimento de pedidos no e-SIC.
              </p>
            </div>

            {/* Prazos e Recursos Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                  <Clock className="w-4 h-4 text-teal-700" />
                  <span>Prazos de Atendimento</span>
                </div>
                <p className="text-xs text-teal-950 leading-relaxed text-justify">
                  {SIC_FISICO_INFO.prazosDescricao}
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                  <Scale className="w-4 h-4 text-purple-700" />
                  <span>Procedimentos de Recurso</span>
                </div>
                <p className="text-xs text-purple-950 leading-relaxed text-justify">
                  {SIC_FISICO_INFO.recursosDescricao}
                </p>
              </div>
            </div>

            {/* Normas separadas APENAS por linhas horizontais */}
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2">
                Marcos Regulatórios Aplicáveis
              </h3>

              <div className="divide-y divide-slate-200 text-xs sm:text-[13px]">
                {SIC_FISICO_INFO.legislacao.map((leg, i) => (
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

      {/* Standalone Solicitacao Form Modal */}
      <SolicitacaoEsicFormModal
        isOpen={modalFormOpen}
        onClose={() => setModalFormOpen(false)}
        onSubmit={registrar}
      />

    </div>
  );
};
