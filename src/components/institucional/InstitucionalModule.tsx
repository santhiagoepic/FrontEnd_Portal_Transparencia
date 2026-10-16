import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronRight,
  Home,
  Search,
  Plus,
  Trash2,
  FileText,
  Mail,
  Phone,
  Clock,
  MapPin,
  Scale,
  Sparkles,
  ChevronDown,
  User,
  Download,
  Check,
  Building,
  HelpCircle,
  ExternalLink,
  Edit,
  ArrowRight,
  ShieldCheck,
  Eye,
  SlidersHorizontal,
  X,
  FileCheck2,
  Printer,
  CornerDownRight
} from 'lucide-react';
import { UnidadeOrganizacional, PerguntaFrequente } from '../../types/institucional.types';
import { institucionalService } from '../../services/institucional.service';
import { ATOS_NORMATIVOS_DATA } from '../../data/atosNormativosData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../Toast';
import { siteConfig } from '../../config/site.config';
import {
  AppInput,
  AppTextarea,
  AppSelect,
  AppSearchableSelect,
  AppCheckbox,
} from '../ui';

interface InstitucionalModuleProps {
  initialTab?: string;
  onBackToHome: () => void;
  onSelectGroup?: (groupId: string, subItem?: string, docId?: string) => void;
}

export const InstitucionalModule: React.FC<InstitucionalModuleProps> = ({
  initialTab,
  onBackToHome,
  onSelectGroup,
}) => {
  const { currentUser } = useAuth();
  const { success, error: toastError } = useToast();
  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';

  // Active top tab: ESTRUTURA ORGANIZACIONAL vs PERGUNTAS FREQUENTES
  const [activeTab, setActiveTab] = useState<'estrutura' | 'faqs'>(() => {
    if (initialTab && initialTab.toLowerCase().includes('pergunta')) {
      return 'faqs';
    }
    return 'estrutura';
  });

  // Admin View Mode toggle (Admin can toggle between Editing Mode and Citizen Preview)
  const [isAdminView, setIsAdminView] = useState<boolean>(() => Boolean(isSuperAdmin));

  // Sync admin state if user logs in
  useEffect(() => {
    if (isSuperAdmin) {
      setIsAdminView(true);
    }
  }, [isSuperAdmin]);

  // Data states
  const [unidades, setUnidades] = useState<UnidadeOrganizacional[]>(() =>
    institucionalService.getUnidades()
  );
  const [faqs, setFaqs] = useState<PerguntaFrequente[]>(() =>
    institucionalService.getFaqs()
  );

  // Selected Unit for Admin editing & Public Accordion
  const [selectedUnidadeId, setSelectedUnidadeId] = useState<string>(() => {
    return unidades[0]?.id || 'gabinete-prefeito';
  });
  const [expandedPublicUnidades, setExpandedPublicUnidades] = useState<Record<string, boolean>>({
    'gabinete-prefeito': true,
    'gabinete-vice-prefeito': false,
  });

  // Unit Form state (Admin)
  const currentUnidade = useMemo(() => {
    return unidades.find((u) => u.id === selectedUnidadeId) || unidades[0];
  }, [unidades, selectedUnidadeId]);

  const [editForm, setEditForm] = useState<UnidadeOrganizacional | null>(null);

  useEffect(() => {
    if (currentUnidade) {
      setEditForm({ ...currentUnidade });
    }
  }, [currentUnidade]);

  // Filters for Estrutura
  const [unidadeSearch, setUnidadeSearch] = useState('');
  const [unidadeTipoFilter, setUnidadeTipoFilter] = useState('todos');

  // Filters for FAQ
  const [faqSearch, setFaqSearch] = useState('');
  const [faqSecaoFilter, setFaqSecaoFilter] = useState('todas');
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({
    'faq-01': true,
  });

  // Modals
  const [gestorModalOpen, setGestorModalOpen] = useState(false);
  const [curriculoModalOpen, setCurriculoModalOpen] = useState(false);
  const [modalUnidade, setModalUnidade] = useState<UnidadeOrganizacional | null>(null);

  // FAQ Modal (Admin)
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<PerguntaFrequente | null>(null);

  // Atos Normativos list for the custom selector
  const atosOptions = useMemo(() => {
    return ATOS_NORMATIVOS_DATA.map((ato) => ({
      value: ato.numero,
      label: `${ato.tipo === 'LEIS' ? 'Lei' : ato.tipo === 'DECRETOS' ? 'Decreto' : ato.tipo === 'PORTARIAS' ? 'Portaria' : 'Resolução'} nº ${ato.numero}`,
      subtitle: ato.ementa.slice(0, 95) + '...',
    }));
  }, []);

  // Filtered Unidades
  const filteredUnidades = useMemo(() => {
    return unidades.filter((u) => {
      const matchSearch =
        unidadeSearch === '' ||
        u.nome.toLowerCase().includes(unidadeSearch.toLowerCase()) ||
        u.nomeGestor.toLowerCase().includes(unidadeSearch.toLowerCase()) ||
        (u.sigla && u.sigla.toLowerCase().includes(unidadeSearch.toLowerCase()));
      const matchTipo =
        unidadeTipoFilter === 'todos' || u.tipo.toLowerCase() === unidadeTipoFilter.toLowerCase();
      return matchSearch && matchTipo;
    });
  }, [unidades, unidadeSearch, unidadeTipoFilter]);

  // Build Hierarchy Tree for Public View: Superior -> Subordinados
  const hierarchyTree = useMemo(() => {
    const superiors = filteredUnidades.filter((u) => !u.unidadeSuperiorId);
    const subordinatesMap: Record<string, UnidadeOrganizacional[]> = {};

    filteredUnidades.forEach((u) => {
      if (u.unidadeSuperiorId) {
        if (!subordinatesMap[u.unidadeSuperiorId]) {
          subordinatesMap[u.unidadeSuperiorId] = [];
        }
        subordinatesMap[u.unidadeSuperiorId].push(u);
      }
    });

    return { superiors, subordinatesMap };
  }, [filteredUnidades]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const matchSearch =
        faqSearch === '' ||
        f.pergunta.toLowerCase().includes(faqSearch.toLowerCase()) ||
        f.resposta.toLowerCase().includes(faqSearch.toLowerCase());
      const matchSecao =
        faqSecaoFilter === 'todas' || f.secao.toLowerCase() === faqSecaoFilter.toLowerCase();
      return matchSearch && matchSecao;
    });
  }, [faqs, faqSearch, faqSecaoFilter]);

  // Handlers for Units
  const handleSelectUnidade = (id: string) => {
    setSelectedUnidadeId(id);
  };

  const handleCreateNewUnidade = () => {
    const newId = `unidade-${Date.now()}`;
    const newUnit: UnidadeOrganizacional = {
      id: newId,
      nome: 'Nova Unidade Administrativa',
      tipo: 'Secretaria',
      gestao: '2025 - 2028',
      sigla: 'NOVA',
      unidadeSuperiorId: 'gabinete-prefeito',
      funcaoGestor: 'Secretário(a) Municipal',
      nomeGestor: 'Nome do Titular',
      pendenteNomeacao: false,
      endereco: 'Rua Afonso Pena, S/N - Centro Administrativo, São Miguel do Tocantins - TO',
      tipoBaseJuridica: 'Lei',
      baseJuridica: 'Lei nº 257/2025',
      baseJuridicaId: 'lei-257-2025',
      email: 'contato@saomigueldotocantins.to.gov.br',
      telefones: '(63) 3447-1347',
      horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
      competencia: 'Descreva as atribuições legais e competências regimentais desta unidade...',
      perfilGestor: 'Perfil biográfico do gestor.',
      resumoCurriculo: 'Resumo da formação acadêmica e experiência profissional.',
      ordem: unidades.length + 1,
    };
    institucionalService.saveUnidade(newUnit);
    setUnidades(institucionalService.getUnidades());
    setSelectedUnidadeId(newId);
    success('Nova unidade criada com sucesso! Preencha as informações ao lado.');
  };

  const handleDeleteUnidade = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const unit = unidades.find((u) => u.id === id);
    if (!unit) return;
    if (confirm(`Tem certeza de que deseja remover a unidade "${unit.nome}"?`)) {
      institucionalService.deleteUnidade(id);
      const updated = institucionalService.getUnidades();
      setUnidades(updated);
      if (selectedUnidadeId === id && updated.length > 0) {
        setSelectedUnidadeId(updated[0].id);
      }
      success('Unidade removida com sucesso!');
    }
  };

  const handleSaveUnidadeForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;
    institucionalService.saveUnidade(editForm);
    setUnidades(institucionalService.getUnidades());
    success('Informações da unidade atualizadas com sucesso!');
  };

  const handleUpdateFormField = <K extends keyof UnidadeOrganizacional>(
    field: K,
    val: UnidadeOrganizacional[K]
  ) => {
    if (!editForm) return;
    setEditForm((prev) => (prev ? { ...prev, [field]: val } : prev));
  };

  // Toggle Public Accordion
  const togglePublicUnidade = (id: string) => {
    setExpandedPublicUnidades((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle FAQ Accordion
  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // FAQ Handlers (Admin)
  const handleOpenNewFaq = () => {
    setEditingFaq({
      id: `faq-${Date.now()}`,
      pergunta: '',
      resposta: '',
      secao: 'Administração Geral',
      ordem: faqs.length + 1,
    });
    setFaqModalOpen(true);
  };

  const handleEditFaq = (faq: PerguntaFrequente) => {
    setEditingFaq({ ...faq });
    setFaqModalOpen(true);
  };

  const handleDeleteFaq = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Deseja realmente excluir esta pergunta frequente?')) {
      institucionalService.deleteFaq(id);
      setFaqs(institucionalService.getFaqs());
      success('Pergunta frequente excluída!');
    }
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.pergunta.trim() || !editingFaq.resposta.trim()) {
      toastError('Preencha a pergunta e a resposta.');
      return;
    }
    institucionalService.saveFaq(editingFaq);
    setFaqs(institucionalService.getFaqs());
    setFaqModalOpen(false);
    success('Pergunta frequente salva com sucesso!');
  };

  // Export structure
  const handleExportStructure = () => {
    window.print();
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      {/* 1. BREADCRUMBS & TOP BAR */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1 hover:text-emerald-700 transition cursor-pointer font-medium"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Início</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="hover:text-emerald-700 transition cursor-pointer font-medium">
          Principais Áreas de Consulta
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          Informações Institucionais
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800 capitalize">
          {activeTab === 'estrutura' ? 'Estrutura Organizacional' : 'Perguntas Frequentes'}
        </span>

        {/* Demonstrative mode badge */}
        <div className="ml-auto hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 border border-slate-200">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Base Oficial • {siteConfig.municipality} - {siteConfig.state}</span>
        </div>
      </nav>

      {/* 2. HEADER TITLE AND ADMIN VIEW TOGGLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight">
            Informações Institucionais
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Portal do Cidadão da{' '}
            <strong className="text-slate-700">Prefeitura de São Miguel do Tocantins - TO</strong>
          </p>
        </div>

        {/* Admin switcher button (When user is logged in as Admin) */}
        {isSuperAdmin && (
          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setIsAdminView(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                !isAdminView
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>Visão Cidadão (Pública)</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAdminView(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isAdminView
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Modo Gerenciador (Admin)</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. GREEN PILL TABS (Exactly matching Image 3, 4, 5, 6) */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('estrutura')}
          className={`px-4 sm:px-6 py-2 rounded-t-lg font-extrabold text-xs tracking-wider uppercase transition cursor-pointer border-t-2 ${
            activeTab === 'estrutura'
              ? 'bg-[#15803d] text-white border-[#15803d] shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Estrutura Organizacional
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('faqs')}
          className={`px-4 sm:px-6 py-2 rounded-t-lg font-extrabold text-xs tracking-wider uppercase transition cursor-pointer border-t-2 ${
            activeTab === 'faqs'
              ? 'bg-[#15803d] text-white border-[#15803d] shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Perguntas Frequentes
        </button>
      </div>

      {/* =========================================================================
          TAB 1: ESTRUTURA ORGANIZACIONAL
         ========================================================================= */}
      {activeTab === 'estrutura' && (
        <div>
          {/* =====================================================================
              A. ADMIN VIEW (Image 3)
             ===================================================================== */}
          {isAdminView ? (
            <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col lg:flex-row min-h-[680px]">
              {/* LEFT COLUMN: LIST OF UNIDADES */}
              <div className="w-full lg:w-[380px] border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50 flex flex-col justify-between shrink-0">
                <div className="p-3.5 sm:p-4 space-y-3">
                  {/* Top Action Bar: ADICIONAR, SEARCH, TIPO */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCreateNewUnidade}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg border border-slate-300 transition flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-700" />
                      <span>ADICIONAR</span>
                    </button>

                    <div className="relative flex-1 min-w-0">
                      <input
                        type="text"
                        value={unidadeSearch}
                        onChange={(e) => setUnidadeSearch(e.target.value)}
                        placeholder="Buscar"
                        className="w-full pl-2.5 pr-7 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="w-28 shrink-0">
                      <AppSelect
                        value={unidadeTipoFilter}
                        onChange={setUnidadeTipoFilter}
                        options={[
                          { value: 'todos', label: 'UNIDADE' },
                          { value: 'Gabinete', label: 'Gabinete' },
                          { value: 'Secretaria', label: 'Secretaria' },
                          { value: 'Controladoria', label: 'Controle' },
                          { value: 'Procuradoria', label: 'Jurídico' },
                        ]}
                        compact={true}
                      />
                    </div>
                  </div>

                  {/* Header Title Bar */}
                  <div className="bg-slate-200/80 px-3 py-1.5 rounded-md text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Unidades
                  </div>

                  {/* List of Units */}
                  <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
                    {filteredUnidades.map((unit) => {
                      const isSelected = unit.id === selectedUnidadeId;
                      return (
                        <div
                          key={unit.id}
                          onClick={() => handleSelectUnidade(unit.id)}
                          className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                            isSelected
                              ? 'bg-[#dcfce7] border-[#86efac] shadow-2xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <button
                              type="button"
                              onClick={(e) => handleDeleteUnidade(unit.id, e)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded transition cursor-pointer shrink-0"
                              title="Excluir unidade"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="min-w-0 flex-1">
                              <span className="text-xs font-bold text-slate-800 block truncate" title={unit.nome}>
                                {unit.nome}
                              </span>
                              {unit.unidadeSuperiorId && (
                                <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                  <CornerDownRight className="w-2.5 h-2.5 text-slate-400" />
                                  <span>Subordinado a {unidades.find(u => u.id === unit.unidadeSuperiorId)?.nome || 'Gabinete'}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10.5px] font-semibold text-emerald-800 bg-white border border-emerald-400 px-2 py-0.5 rounded-full">
                              {unit.gestao}
                            </span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isSelected ? 'rotate-180 text-emerald-700' : ''}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom of Left Column */}
                <div className="p-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => success('Ordem das unidades atualizada com sucesso!')}
                    className="px-3 py-1.5 text-slate-700 font-bold hover:bg-slate-100 rounded-lg border border-slate-200 transition cursor-pointer"
                  >
                    REORDENAR
                  </button>
                  <span className="text-slate-400 italic text-[11px]">
                    Histórico de Registros
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: UNIT EDITING FORM (Image 3) */}
              <div className="flex-1 p-5 sm:p-6 lg:p-7 bg-white overflow-y-auto min-w-0">
                {editForm ? (
                  <form onSubmit={handleSaveUnidadeForm} className="space-y-4">
                    {/* Unit Heading */}
                    <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {editForm.nome}
                      </h2>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                        Gestão {editForm.gestao}
                      </span>
                    </div>

                    {/* Row 1: TIPO* & GESTÃO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <AppSelect
                        label="TIPO *"
                        value={editForm.tipo}
                        onChange={(val) => handleUpdateFormField('tipo', val as any)}
                        options={[
                          { value: 'Gabinete', label: 'Gabinete' },
                          { value: 'Secretaria', label: 'Secretaria' },
                          { value: 'Fundo', label: 'Fundo Municipal' },
                          { value: 'Procuradoria', label: 'Procuradoria Geral' },
                          { value: 'Controladoria', label: 'Controladoria Geral' },
                          { value: 'Conselho', label: 'Conselho Municipal' },
                          { value: 'Autarquia', label: 'Autarquia' },
                        ]}
                        required
                      />

                      <AppSelect
                        label="GESTÃO"
                        value={editForm.gestao}
                        onChange={(val) => handleUpdateFormField('gestao', val)}
                        options={[
                          { value: '2025 - 2028', label: '2025 - 2028' },
                          { value: '2021 - 2024', label: '2021 - 2024' },
                          { value: '2017 - 2020', label: '2017 - 2020' },
                        ]}
                      />
                    </div>

                    {/* Row 2: NOME DA UNIDADE* & UNIDADE SUPERIOR (?) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <AppInput
                        label="NOME DA UNIDADE *"
                        value={editForm.nome}
                        onChange={(e) => handleUpdateFormField('nome', e.target.value)}
                        placeholder="Ex: Gabinete do Vice Prefeito"
                        required
                      />

                      <AppSelect
                        label="UNIDADE SUPERIOR (?)"
                        value={editForm.unidadeSuperiorId || 'nenhuma'}
                        onChange={(val) =>
                          handleUpdateFormField('unidadeSuperiorId', val === 'nenhuma' ? null : val)
                        }
                        options={[
                          { value: 'nenhuma', label: 'Nenhuma (Órgão Superior / Direção Geral)' },
                          ...unidades
                            .filter((u) => u.id !== editForm.id)
                            .map((u) => ({
                              value: u.id,
                              label: u.nome,
                            })),
                        ]}
                        helperText="Define a hierarquia: de quem esta unidade é subordinada."
                      />
                    </div>

                    {/* Row 3: FUNÇÃO DO GESTOR & NOME DO GESTOR */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <AppInput
                        label="FUNÇÃO DO GESTOR"
                        value={editForm.funcaoGestor}
                        onChange={(e) => handleUpdateFormField('funcaoGestor', e.target.value)}
                        placeholder="Ex: Prefeito, Vice Prefeito, Secretário Municipal"
                        required
                      />

                      <div>
                        <AppInput
                          label="NOME DO GESTOR"
                          value={editForm.nomeGestor}
                          onChange={(e) => handleUpdateFormField('nomeGestor', e.target.value)}
                          placeholder="Nome completo do titular"
                          disabled={editForm.pendenteNomeacao}
                          required={!editForm.pendenteNomeacao}
                        />
                        <div className="mt-1.5">
                          <AppCheckbox
                            checked={editForm.pendenteNomeacao}
                            onChange={(c) => {
                              handleUpdateFormField('pendenteNomeacao', c);
                              if (c) handleUpdateFormField('nomeGestor', 'A definir (Pendente)');
                            }}
                            label="Pendente em nomeação"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: ENDEREÇO COMPLETO* */}
                    <div>
                      <AppInput
                        label="ENDEREÇO COMPLETO *"
                        value={editForm.endereco}
                        onChange={(e) => handleUpdateFormField('endereco', e.target.value)}
                        placeholder="Ex: Afonso Pena, S/N - Centro, São Miguel do Tocantins - TO 77925-000"
                        required
                      />
                    </div>

                    {/* Row 5: TIPO DE BASE JURÍDICA & BASE JURÍDICA (?) [CUSTOM SELECTOR FROM PORTAL ATOS] */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <AppSelect
                        label="TIPO DE BASE JURÍDICA"
                        value={editForm.tipoBaseJuridica}
                        onChange={(val) => handleUpdateFormField('tipoBaseJuridica', val as any)}
                        options={[
                          { value: 'Lei', label: 'Lei' },
                          { value: 'Decreto', label: 'Decreto' },
                          { value: 'Portaria', label: 'Portaria' },
                          { value: 'Resolução', label: 'Resolução' },
                        ]}
                      />

                      <div>
                        <AppSearchableSelect
                          label="BASE JURÍDICA (?)"
                          value={editForm.baseJuridica}
                          onChange={(val) => {
                            handleUpdateFormField('baseJuridica', val);
                          }}
                          options={atosOptions}
                          placeholder="Selecione o ato normativo do portal..."
                          searchPlaceholder="Buscar na base de atos normativos..."
                          helperText="Selecione o documento da base de Atos Normativos do portal"
                          required
                        />
                      </div>
                    </div>

                    {/* Row 6: EMAIL */}
                    <div>
                      <AppInput
                        label="EMAIL"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleUpdateFormField('email', e.target.value)}
                        placeholder="Ex: gabinete@saomigueldotocantins.to.gov.br"
                      />
                    </div>

                    {/* Row 7: TELEFONES* & HORÁRIO DE ATENDIMENTO* */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <AppInput
                        label="TELEFONES *"
                        value={editForm.telefones}
                        onChange={(e) => handleUpdateFormField('telefones', e.target.value)}
                        placeholder="Ex: (63) 3447-1347"
                        required
                      />

                      <AppInput
                        label="HORÁRIO DE ATENDIMENTO *"
                        value={editForm.horarioAtendimento}
                        onChange={(e) => handleUpdateFormField('horarioAtendimento', e.target.value)}
                        placeholder="Ex: Segunda à Sexta das 07:30 às 13:30 horas."
                        required
                      />
                    </div>

                    {/* Row 8: COMPETÊNCIA */}
                    <div>
                      <AppTextarea
                        label="COMPETÊNCIA"
                        value={editForm.competencia}
                        onChange={(e) => handleUpdateFormField('competencia', e.target.value)}
                        placeholder="Descreva as competências e atribuições legais da unidade..."
                        rows={4}
                        required
                      />
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setModalUnidade(editForm);
                            setGestorModalOpen(true);
                          }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <User className="w-3.5 h-3.5 text-slate-600" />
                          <span>PERFIL DO(A) GESTOR(A)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setModalUnidade(editForm);
                            setCurriculoModalOpen(true);
                          }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-600" />
                          <span>RESUMO DO CURRÍCULO</span>
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>SALVAR</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="text-slate-400 italic text-sm">Selecione uma unidade ao lado para editar.</p>
                )}
              </div>
            </div>
          ) : (
            /* =====================================================================
                B. PUBLIC CITIZEN VIEW (Image 6)
               ===================================================================== */
            <div className="space-y-4">
              {/* Top search & filter bar */}
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative flex-1 min-w-0">
                      <input
                        type="text"
                        value={unidadeSearch}
                        onChange={(e) => setUnidadeSearch(e.target.value)}
                        placeholder="Buscar unidade, gestor ou cargo..."
                        className="w-full pl-3 pr-8 py-2 text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                      />
                      <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="w-44 shrink-0">
                      <AppSelect
                        value={unidadeTipoFilter}
                        onChange={setUnidadeTipoFilter}
                        options={[
                          { value: 'todos', label: 'Todas Unidades' },
                          { value: 'Gabinete', label: 'Gabinetes' },
                          { value: 'Secretaria', label: 'Secretarias' },
                          { value: 'Controladoria', label: 'Controle' },
                          { value: 'Procuradoria', label: 'Jurídico' },
                        ]}
                        compact={true}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExportStructure}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-300 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span>EXPORTAR</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400">
                  {unidadeSearch || unidadeTipoFilter !== 'todos' ? (
                    <span className="text-emerald-700 font-medium">
                      Exibindo {filteredUnidades.length} de {unidades.length} unidades encontradas
                    </span>
                  ) : (
                    <span>Não há filtros selecionados • Exibindo estrutura organizacional completa</span>
                  )}
                </div>
              </div>

              {/* Units List / Accordion Organized by Hierarchy (Superior a Subordinado) */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>UNIDADES DO PODER EXECUTIVO MUNICIPAL</span>
                  <span className="text-[11px] font-normal lowercase text-slate-500">
                    clique sobre a unidade para ver dados do gestor, endereço, base jurídica e competências
                  </span>
                </div>

                <div className="divide-y divide-slate-200">
                  {filteredUnidades.map((unit) => {
                    const isExpanded = Boolean(expandedPublicUnidades[unit.id]);
                    const superiorUnit = unit.unidadeSuperiorId
                      ? unidades.find((u) => u.id === unit.unidadeSuperiorId)
                      : null;

                    return (
                      <div key={unit.id} className="transition-colors">
                        {/* Unit Accordion Header */}
                        <div
                          onClick={() => togglePublicUnidade(unit.id)}
                          className={`px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 cursor-pointer transition select-none ${
                            isExpanded ? 'bg-slate-50/80 font-bold' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            {unit.unidadeSuperiorId ? (
                              <CornerDownRight className="w-4 h-4 text-slate-400 shrink-0 ml-1 sm:ml-3" />
                            ) : (
                              <Building className="w-4 h-4 text-emerald-700 shrink-0" />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs sm:text-sm font-bold text-slate-800">
                                  {unit.nome}
                                </span>
                                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.2 rounded-full">
                                  Gestão {unit.gestao}
                                </span>
                                {superiorUnit && (
                                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.2 rounded border border-slate-200">
                                    Subordinado a: <strong>{superiorUnit.nome}</strong>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="hidden sm:inline text-xs text-slate-500">
                              {unit.funcaoGestor}: <strong>{unit.nomeGestor}</strong>
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-emerald-700' : ''
                              }`}
                            />
                          </div>
                        </div>

                        {/* Unit Expanded Detail Card */}
                        {isExpanded && (
                          <div className="px-4 sm:px-6 py-5 bg-slate-50/50 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
                            {/* Grid of Key Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {/* Gestor */}
                              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                  <User className="w-3 h-3 text-emerald-600" />
                                  <span>{unit.funcaoGestor}</span>
                                </span>
                                <p className="text-xs font-bold text-slate-900">{unit.nomeGestor}</p>
                                <div className="pt-1 flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setModalUnidade(unit);
                                      setGestorModalOpen(true);
                                    }}
                                    className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                                  >
                                    Ver Perfil Completo
                                  </button>
                                  <span className="text-slate-300">•</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setModalUnidade(unit);
                                      setCurriculoModalOpen(true);
                                    }}
                                    className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                                  >
                                    Currículo
                                  </button>
                                </div>
                              </div>

                              {/* Endereço */}
                              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-emerald-600" />
                                  <span>Endereço Completo</span>
                                </span>
                                <p className="text-xs text-slate-800 leading-relaxed">{unit.endereco}</p>
                              </div>

                              {/* Base Jurídica */}
                              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                  <Scale className="w-3 h-3 text-emerald-600" />
                                  <span>Base Jurídica / Criação</span>
                                </span>
                                <p className="text-xs font-bold text-slate-900">{unit.baseJuridica}</p>
                                {onSelectGroup && (
                                  <button
                                    type="button"
                                    onClick={() => onSelectGroup('atos-normativos')}
                                    className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 mt-1 cursor-pointer"
                                  >
                                    <span>Consultar Atos Normativos</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </button>
                                )}
                              </div>

                              {/* Contato & Telefones */}
                              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-emerald-600" />
                                  <span>Telefones Oficiais</span>
                                </span>
                                <p className="text-xs font-bold font-mono text-slate-800">{unit.telefones}</p>
                              </div>

                              {/* Email */}
                              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-emerald-600" />
                                  <span>E-mail Institucional</span>
                                </span>
                                <a
                                  href={`mailto:${unit.email}`}
                                  className="text-xs font-semibold text-emerald-800 hover:underline block truncate"
                                >
                                  {unit.email}
                                </a>
                              </div>

                              {/* Horário de Atendimento */}
                              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-emerald-600" />
                                  <span>Horário de Atendimento</span>
                                </span>
                                <p className="text-xs text-slate-800">{unit.horarioAtendimento}</p>
                              </div>
                            </div>

                            {/* Competências & Atribuições */}
                            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Competências e Atribuições Oficiais</span>
                              </h4>
                              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line text-justify font-sans">
                                {unit.competencia}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: PERGUNTAS FREQUENTES (FAQ)
         ========================================================================= */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          {/* Header Action Bar */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {isAdminView && (
                  <button
                    type="button"
                    onClick={handleOpenNewFaq}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg border border-slate-300 transition flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-700" />
                    <span>NOVA PERGUNTA</span>
                  </button>
                )}

                <div className="relative flex-1 min-w-0">
                  <input
                    type="text"
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    placeholder="Buscar pergunta ou palavra-chave..."
                    className="w-full pl-3 pr-8 py-2 text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="w-48 shrink-0">
                  <AppSelect
                    value={faqSecaoFilter}
                    onChange={setFaqSecaoFilter}
                    options={[
                      { value: 'todas', label: 'SEÇÃO (Todas)' },
                      { value: 'Meio Ambiente', label: 'Meio Ambiente' },
                      { value: 'Saúde', label: 'Saúde' },
                      { value: 'Acesso à Informação', label: 'Acesso à Informação' },
                    ]}
                    compact={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FAQ List / Accordion */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>PERGUNTAS FREQUENTES DA ADMINISTRAÇÃO MUNICIPAL</span>
              <span className="text-[11px] font-normal text-slate-500">
                {filteredFaqs.length} pergunta(s) cadastrada(s)
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredFaqs.map((faq) => {
                const isExpanded = Boolean(expandedFaqs[faq.id]);
                return (
                  <div key={faq.id} className="transition-colors">
                    <div
                      onClick={() => toggleFaq(faq.id)}
                      className={`px-4 sm:px-6 py-4 flex items-start justify-between gap-3 cursor-pointer transition select-none ${
                        isExpanded ? 'bg-slate-50/80' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        {isAdminView && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteFaq(faq.id, e)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded transition cursor-pointer shrink-0 mt-0.5"
                            title="Excluir pergunta"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {faq.pergunta}
                          </h3>
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded mt-1 inline-block border border-emerald-200">
                            {faq.secao}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isAdminView && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditFaq(faq);
                            }}
                            className="p-1 text-slate-400 hover:text-emerald-700 rounded transition cursor-pointer"
                            title="Editar pergunta"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-emerald-700' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 sm:px-6 py-4 bg-white border-t border-slate-100 animate-in fade-in duration-150">
                        <div className="prose prose-xs max-w-none text-xs text-slate-700 leading-relaxed whitespace-pre-line text-justify pl-7">
                          {faq.resposta}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom bar for FAQs */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              {isAdminView ? (
                <>
                  <button
                    type="button"
                    onClick={() => success('Ordem das perguntas atualizada com sucesso!')}
                    className="px-3 py-1.5 text-slate-700 font-bold hover:bg-slate-100 rounded-lg border border-slate-300 transition cursor-pointer bg-white"
                  >
                    REORDENAR
                  </button>
                  <span>1-{filteredFaqs.length} de {faqs.length}</span>
                </>
              ) : (
                <span className="italic">Portal da Transparência de São Miguel do Tocantins</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS: GESTOR PROFILE & CURRÍCULO
         ========================================================================= */}
      {gestorModalOpen && modalUnidade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-2xs p-4 animate-in fade-in duration-100">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">Perfil do(a) Gestor(a)</h3>
              </div>
              <button
                type="button"
                onClick={() => setGestorModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {modalUnidade.funcaoGestor}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">{modalUnidade.nomeGestor}</h4>
                <p className="text-xs text-slate-500">{modalUnidade.nome}</p>
              </div>

              {isAdminView ? (
                <div>
                  <AppTextarea
                    label="Biografia e Perfil Público"
                    value={modalUnidade.perfilGestor || ''}
                    onChange={(e) => {
                      const updated = { ...modalUnidade, perfilGestor: e.target.value };
                      setModalUnidade(updated);
                      if (editForm && editForm.id === modalUnidade.id) {
                        setEditForm(updated);
                      }
                      institucionalService.saveUnidade(updated);
                    }}
                    rows={5}
                  />
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {modalUnidade.perfilGestor || 'Informações biográficas em processo de atualização institucional.'}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setGestorModalOpen(false);
                  success('Perfil atualizado com sucesso!');
                }}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {curriculoModalOpen && modalUnidade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-2xs p-4 animate-in fade-in duration-100">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">Resumo do Currículo</h3>
              </div>
              <button
                type="button"
                onClick={() => setCurriculoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {modalUnidade.funcaoGestor}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">{modalUnidade.nomeGestor}</h4>
                <p className="text-xs text-slate-500">{modalUnidade.nome}</p>
              </div>

              {isAdminView ? (
                <div>
                  <AppTextarea
                    label="Experiência Profissional e Formação Acadêmica"
                    value={modalUnidade.resumoCurriculo || ''}
                    onChange={(e) => {
                      const updated = { ...modalUnidade, resumoCurriculo: e.target.value };
                      setModalUnidade(updated);
                      if (editForm && editForm.id === modalUnidade.id) {
                        setEditForm(updated);
                      }
                      institucionalService.saveUnidade(updated);
                    }}
                    rows={5}
                  />
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {modalUnidade.resumoCurriculo || 'Currículo resumido disponível para consulta nos anais da administração municipal.'}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setCurriculoModalOpen(false);
                  success('Currículo atualizado com sucesso!');
                }}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ ADD / EDIT MODAL (Admin) */}
      {faqModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-2xs p-4 animate-in fade-in duration-100">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">
                  {faqs.some((f) => f.id === editingFaq.id) ? 'Editar Pergunta' : 'Nova Pergunta Frequente'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFaqModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3">
              <AppSelect
                label="Seção / Categoria"
                value={editingFaq.secao}
                onChange={(val) => setEditingFaq((prev) => (prev ? { ...prev, secao: val } : prev))}
                options={[
                  { value: 'Meio Ambiente', label: 'Meio Ambiente' },
                  { value: 'Saúde', label: 'Saúde' },
                  { value: 'Acesso à Informação', label: 'Acesso à Informação' },
                  { value: 'Administração Geral', label: 'Administração Geral' },
                  { value: 'Finanças e Tributos', label: 'Finanças e Tributos' },
                ]}
              />

              <AppInput
                label="Pergunta / Dúvida do Cidadão"
                value={editingFaq.pergunta}
                onChange={(e) =>
                  setEditingFaq((prev) => (prev ? { ...prev, pergunta: e.target.value } : prev))
                }
                placeholder="Ex: Como faço para emitir certidão negativa?"
                required
              />

              <AppTextarea
                label="Resposta Oficial"
                value={editingFaq.resposta}
                onChange={(e) =>
                  setEditingFaq((prev) => (prev ? { ...prev, resposta: e.target.value } : prev))
                }
                placeholder="Insira a resposta detalhada, passos a passos e orientações ao cidadão..."
                rows={6}
                required
              />

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition cursor-pointer shadow-sm"
                >
                  Salvar Pergunta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
