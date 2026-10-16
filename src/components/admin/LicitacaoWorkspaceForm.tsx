import React, { useState, useEffect } from 'react';
import {
  Trophy,
  FileCheck,
  Link as LinkIcon,
  Plus,
  Trash2,
  Calendar,
  AlertTriangle,
  FileText,
  ExternalLink,
} from 'lucide-react';
import {
  LicitacaoDetalhada,
  VencedorItem,
  LinkItem,
  DocumentTypeConfig,
  ChecklistItem,
} from '../../types/licitacoes.types';
import {
  licitacoesConfigService,
  extractSimpleNumber,
  formatCombinedLicitacaoNumber,
} from '../../services/licitacoesConfig.service';
import { CONTRATOS_MOCK } from '../../data/mock/contratos.mock';
import { ManagedFile } from '../documents/PermanentDocumentManager';
import { useAuth } from '../../context/AuthContext';
import {
  AppInput,
  AppTextarea,
  AppSelect,
  AppSearchableSelect,
  AppMultiSelect,
  AppCheckbox,
  AppDatePicker,
  AppTimePicker,
  AppCurrencyInput,
  AppStatusBadge,
  AppChecklist,
} from '../ui';

interface LicitacaoWorkspaceFormProps {
  licitacaoId: string;
  files: ManagedFile[];
  onFilesChange: (files: ManagedFile[]) => void;
  isNewRecord: boolean;
  onDetailedChange?: (data: LicitacaoDetalhada) => void;
  onNavigateToContrato?: (contratoId: string) => void;
  readOnly?: boolean;
}

export const LicitacaoWorkspaceForm: React.FC<LicitacaoWorkspaceFormProps> = ({
  licitacaoId,
  files,
  isNewRecord,
  onDetailedChange,
  onNavigateToContrato,
  readOnly = false,
}) => {
  // Collections from Configuration Service
  const [docTypes] = useState<DocumentTypeConfig[]>(() =>
    licitacoesConfigService.getDocumentTypes().filter((d) => d.active)
  );
  const [orgaos] = useState(() =>
    licitacoesConfigService.getOrgaos().filter((o) => o.active)
  );
  const [modalidades] = useState(() =>
    licitacoesConfigService.getModalidades().filter((m) => m.active)
  );
  const [leisBaseOptions] = useState(() =>
    licitacoesConfigService.getLeisBase().filter((l) => l.active)
  );
  const [situacoes] = useState(() =>
    licitacoesConfigService.getSituacoes().filter((s) => s.active)
  );
  const [fornecedores] = useState(() =>
    licitacoesConfigService.getFornecedores().filter((f) => f.active)
  );

  // Load detailed state from storage or fallback defaults
  const [detailed, setDetailed] = useState<LicitacaoDetalhada>(() => {
    const saved = licitacoesConfigService.getLicitacaoDetalhada(licitacaoId);
    if (saved) {
      return {
        ...saved,
        numero: extractSimpleNumber(saved.numero),
      };
    }

    const today = new Date().toLocaleDateString('pt-BR');
    return {
      id: licitacaoId,
      groupId: 'licitacoes',
      numero: isNewRecord ? '' : '014',
      ano: '2026',
      orgaoId: 'administracao',
      modalidadeId: 'pregao-eletronico',
      leisBase: ['lei-14133-2021'],
      situacaoId: 'aberta',
      objeto: isNewRecord ? '' : 'Aquisição de combustíveis e óleos lubrificantes para a frota municipal.',
      dataPublicacao: today,
      dataAbertura: today,
      horaAbertura: '09:00',
      tipoValor: 'Estimado',
      valorEstimado: 480000.0,
      covid: false,
      lei14065: false,
      secao: 'Comissão de Licitações (CPL)',
      signatario: 'Pregoeiro Oficial do Município',
      cargoSignatario: 'CPL - São Miguel do Tocantins',
      vencedores: [],
      contratosVinculados: [],
      links: [],
      checklistManual: {
        'parecer-juridico': true,
        'publicacao-pncp': true,
      },
      classificacoesArquivos: {},
    };
  });

  const { currentUser } = useAuth();
  // Process tracking checklist is strictly for system administrators; it must NEVER be shown on public routes
  const isPublicRoute = Boolean(readOnly || !currentUser);

  // Active complementary section accordion / tabs: defaults to 'vencedores' on public routes
  const [complementaryTab, setComplementaryTab] = useState<
    'vencedores' | 'contratos' | 'links' | 'checklist'
  >(() => (isPublicRoute ? 'vencedores' : 'checklist'));

  useEffect(() => {
    if (isPublicRoute && complementaryTab === 'checklist') {
      setComplementaryTab('vencedores');
    }
  }, [isPublicRoute, complementaryTab]);

  // New Winner Form states
  const [selectedFornecedorId, setSelectedFornecedorId] = useState('');
  const [winnerLote, setWinnerLote] = useState('Lote 01');
  const [winnerObjeto, setWinnerObjeto] = useState('');
  const [winnerValorProposta, setWinnerValorProposta] = useState(0);
  const [winnerValorAdjudicado, setWinnerValorAdjudicado] = useState(0);

  // New Link Form states
  const [newLinkTitulo, setNewLinkTitulo] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Sincronize classifications from files prop into detailed state
  useEffect(() => {
    const classMap: Record<string, string> = { ...detailed.classificacoesArquivos };
    files.forEach((f) => {
      if (f.documentTypeId) {
        classMap[f.name] = f.documentTypeId;
      }
    });
    setDetailed((prev) => {
      const updated = { ...prev, classificacoesArquivos: classMap };
      licitacoesConfigService.saveLicitacaoDetalhada(updated);
      if (onDetailedChange) onDetailedChange(updated);
      return updated;
    });
  }, [files]);

  // Update specific field helper
  const updateField = <K extends keyof LicitacaoDetalhada>(
    field: K,
    val: LicitacaoDetalhada[K]
  ) => {
    setDetailed((prev) => {
      const updated = { ...prev, [field]: val };
      licitacoesConfigService.saveLicitacaoDetalhada(updated);
      if (onDetailedChange) onDetailedChange(updated);
      return updated;
    });
  };

  // Add winner
  const handleAddWinner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFornecedorId) return;
    const forn = fornecedores.find((f) => f.id === selectedFornecedorId);
    if (!forn) return;

    const newWinner: VencedorItem = {
      id: `venc-${Date.now()}`,
      fornecedorId: forn.id,
      razaoSocial: forn.razaoSocial,
      cnpj: forn.cnpj,
      loteItem: winnerLote,
      objetoAdjudicado: winnerObjeto || detailed.objeto,
      valorProposta: winnerValorProposta || detailed.valorEstimado,
      valorAdjudicado: winnerValorAdjudicado || winnerValorProposta || detailed.valorEstimado,
      dataResultado: new Date().toLocaleDateString('pt-BR'),
    };

    const updated = [...detailed.vencedores, newWinner];
    updateField('vencedores', updated);
    setSelectedFornecedorId('');
    setWinnerObjeto('');
    setWinnerValorProposta(0);
    setWinnerValorAdjudicado(0);
  };

  const handleRemoveWinner = (id: string) => {
    const updated = detailed.vencedores.filter((w) => w.id !== id);
    updateField('vencedores', updated);
  };

  // Add Link
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitulo.trim() || !newLinkUrl.trim()) return;
    const newLnk: LinkItem = {
      id: `link-${Date.now()}`,
      titulo: newLinkTitulo.trim(),
      url: newLinkUrl.trim().startsWith('http') ? newLinkUrl.trim() : `https://${newLinkUrl.trim()}`,
    };
    const updated = [...detailed.links, newLnk];
    updateField('links', updated);
    setNewLinkTitulo('');
    setNewLinkUrl('');
  };

  const handleRemoveLink = (id: string) => {
    const updated = detailed.links.filter((l) => l.id !== id);
    updateField('links', updated);
  };

  // Contract linking toggle
  const handleToggleContract = (contractNumero: string) => {
    const current = detailed.contratosVinculados || [];
    const updated = current.includes(contractNumero)
      ? current.filter((c) => c !== contractNumero)
      : [...current, contractNumero];
    updateField('contratosVinculados', updated);
  };

  // Automatic + Manual Checklist generation
  // Automatic + Manual Checklist generation
  const classifiedTypes = Object.values(detailed.classificacoesArquivos || {});
  const fileNames = files.map((f) => (f.name || '').toLowerCase());
  const fileDocTypeIds = files.map((f) => f.documentTypeId).filter(Boolean) as string[];

  const hasEdital =
    fileDocTypeIds.includes('edital') ||
    fileDocTypeIds.includes('termo-referencia') ||
    classifiedTypes.includes('edital') ||
    classifiedTypes.includes('termo-referencia') ||
    fileNames.some((n) => n.includes('edital') || n.includes('termo') || n.includes('principal'));

  const hasAta =
    fileDocTypeIds.includes('ata-sessao') ||
    fileDocTypeIds.includes('julgamento') ||
    classifiedTypes.includes('ata-sessao') ||
    classifiedTypes.includes('julgamento') ||
    fileNames.some((n) => n.includes('ata') || n.includes('sessao'));

  const hasHomologacao =
    fileDocTypeIds.includes('homologacao') ||
    fileDocTypeIds.includes('adjudicacao') ||
    classifiedTypes.includes('homologacao') ||
    classifiedTypes.includes('adjudicacao') ||
    fileNames.some((n) => n.includes('homolog') || n.includes('adjudic'));

  const hasContrato =
    fileDocTypeIds.includes('contrato') ||
    classifiedTypes.includes('contrato') ||
    (detailed.contratosVinculados && detailed.contratosVinculados.length > 0) ||
    fileNames.some((n) => n.includes('contrato'));

  const hasParecer =
    fileDocTypeIds.includes('parecer-juridico') ||
    classifiedTypes.includes('parecer-juridico') ||
    fileNames.some((n) => n.includes('parecer')) ||
    Boolean(detailed.checklistManual['parecer-juridico']);

  const hasPncp =
    fileDocTypeIds.includes('publicacao-pncp') ||
    classifiedTypes.includes('publicacao-pncp') ||
    fileNames.some((n) => n.includes('pncp') || n.includes('diario') || n.includes('publicacao')) ||
    Boolean(detailed.checklistManual['publicacao-pncp']);

  const checklistItems: ChecklistItem[] = [
    {
      id: 'chk-edital',
      label: 'Edital e Termo de Referência publicado',
      description: 'Documento convocatório e anexos oficiais devidamente cadastrados',
      type: 'automatico',
      checked: hasEdital,
      required: true,
    },
    {
      id: 'chk-ata',
      label: 'Ata da Sessão Pública anexada',
      description: 'Registro de propostas, lances e negociação da sessão pública',
      type: 'automatico',
      checked: hasAta,
      required: detailed.situacaoId === 'em-andamento' || detailed.situacaoId === 'homologada',
    },
    {
      id: 'chk-homologacao',
      label: 'Termo de Homologação / Adjudicação publicado',
      description: 'Ato oficial da autoridade competente homologando o resultado',
      type: 'automatico',
      checked: hasHomologacao,
      required: detailed.situacaoId === 'homologada' || detailed.situacaoId === 'encerrada',
    },
    {
      id: 'chk-contrato',
      label: 'Contrato Administrativo vinculado',
      description: 'Instrumento contratual formalizado após a homologação',
      type: 'automatico',
      checked: hasContrato,
      required: detailed.situacaoId === 'homologada',
    },
    {
      id: 'parecer-juridico',
      label: 'Conferência de Parecer Jurídico Conclusivo',
      description: 'Aprovação prévia da minuta do edital e contrato pela Procuradoria Municipal',
      type: hasParecer && (fileDocTypeIds.includes('parecer-juridico') || fileNames.some((n) => n.includes('parecer'))) ? 'automatico' : 'manual',
      checked: hasParecer,
      required: false,
    },
    {
      id: 'publicacao-pncp',
      label: 'Certificação de Envio ao PNCP / Diário Oficial',
      description: 'Comprovação de veiculação e publicidade no Portal Nacional de Contratações Públicas',
      type: hasPncp && (fileDocTypeIds.includes('publicacao-pncp') || fileNames.some((n) => n.includes('pncp') || n.includes('diario'))) ? 'automatico' : 'manual',
      checked: hasPncp,
      required: false,
    },
  ];

  const handleToggleManualChecklist = (itemId: string, checked: boolean) => {
    const updated = { ...detailed.checklistManual, [itemId]: checked };
    updateField('checklistManual', updated);
  };

  return (
    <div className="space-y-5">
      {/* 1. SEÇÃO DE IDENTIFICAÇÃO E LEIS BASE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-800">
            Identificação do Processo Licitatório
          </span>
          <AppStatusBadge
            status={
              situacoes.find((s) => s.id === detailed.situacaoId)?.nome || detailed.situacaoId
            }
          />
        </div>

        {/* Leis Base (Seleção Múltipla com Checkbox) */}
        <div>
          <AppMultiSelect
            label="Leis Base (Referência Normativa)"
            values={detailed.leisBase}
            onChange={(vals) => updateField('leisBase', vals)}
            options={leisBaseOptions.map((l) => ({
              value: l.id,
              label: l.codigo,
              subtitle: l.titulo,
            }))}
            placeholder="Selecione as leis aplicáveis"
            searchPlaceholder="Buscar legislação..."
            disabled={readOnly}
            required
          />
        </div>

        {/* Órgão e Modalidade (Seletores com Pesquisa Interna) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AppSearchableSelect
            label="Órgão Responsável"
            value={detailed.orgaoId}
            onChange={(val) => updateField('orgaoId', val)}
            options={orgaos.map((o) => ({
              value: o.id,
              label: o.nome,
              subtitle: o.sigla,
            }))}
            searchPlaceholder="Buscar órgão..."
            disabled={readOnly}
            required
          />

          <AppSearchableSelect
            label="Modalidade / Procedimento"
            value={detailed.modalidadeId}
            onChange={(val) => updateField('modalidadeId', val)}
            options={modalidades.map((m) => ({
              value: m.id,
              label: m.nome,
              subtitle: `Procedimento: ${m.tipo}`,
            }))}
            searchPlaceholder="Buscar modalidade..."
            disabled={readOnly}
            required
          />
        </div>

        {/* Número, Ano e Situação */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AppInput
            label="Número da Licitação"
            value={extractSimpleNumber(detailed.numero)}
            onChange={(e) => {
              const raw = e.target.value;
              const clean = extractSimpleNumber(raw);
              updateField('numero', clean || raw.trim());
            }}
            placeholder="Ex: 014"
            disabled={readOnly}
            required
            helperText="Digite apenas o número (ex: 014). O ano é selecionado na caixa ao lado."
          />

          <AppSelect
            label="Ano / Exercício"
            value={detailed.ano || '2026'}
            onChange={(val) => updateField('ano', val)}
            options={[
              { value: '2026', label: '2026' },
              { value: '2025', label: '2025' },
              { value: '2024', label: '2024' },
              { value: '2023', label: '2023' },
              { value: '2022', label: '2022' },
              { value: '2021', label: '2021' },
            ]}
            disabled={readOnly}
          />

          <AppSelect
            label="Situação do Processo"
            value={detailed.situacaoId}
            onChange={(val) => updateField('situacaoId', val)}
            options={situacoes.map((s) => ({
              value: s.id,
              label: s.nome,
            }))}
            disabled={readOnly}
          />
        </div>

        {/* Checkboxes de Normas Específicas */}
        <div className="flex flex-wrap items-center gap-6 pt-1">
          <AppCheckbox
            checked={detailed.covid}
            onChange={(c) => updateField('covid', c)}
            label="Referente à COVID-19"
            disabled={readOnly}
          />
          <AppCheckbox
            checked={detailed.lei14065}
            onChange={(c) => updateField('lei14065', c)}
            label="Aplicação da Lei nº 14.065/2020"
            disabled={readOnly}
          />
        </div>
      </div>

      {/* 2. OBJETO DA LICITAÇÃO */}
      <div>
        <AppTextarea
          label="Descrição / Objeto da Licitação"
          value={detailed.objeto}
          onChange={(e) => updateField('objeto', e.target.value)}
          placeholder="Descreva detalhadamente o objeto, fornecimento ou contratação de serviço..."
          rows={3}
          readOnly={readOnly}
          required
        />
      </div>

      {/* 3. DATAS E VALORES */}
      <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block">
          Prazos, Sessão Pública e Valores
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <AppDatePicker
            label="Data da Publicação"
            value={detailed.dataPublicacao}
            onChange={(val) => updateField('dataPublicacao', val)}
            disabled={readOnly}
          />

          <AppDatePicker
            label="Data de Abertura da Sessão"
            value={detailed.dataAbertura}
            onChange={(val) => updateField('dataAbertura', val)}
            disabled={readOnly}
            required
          />

          <AppTimePicker
            label="Horário da Abertura"
            value={detailed.horaAbertura}
            onChange={(val) => updateField('horaAbertura', val)}
            disabled={readOnly}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <AppSelect
            label="Tipo de Valor"
            value={detailed.tipoValor}
            onChange={(val) => updateField('tipoValor', val as LicitacaoDetalhada['tipoValor'])}
            options={[
              { value: 'Estimado', label: 'Valor Estimado (Referência)' },
              { value: 'Máximo Aceitável', label: 'Valor Máximo Aceitável' },
              { value: 'Homologado', label: 'Valor Total Homologado' },
            ]}
            disabled={readOnly}
          />

          <AppCurrencyInput
            label="Valor do Processo (R$)"
            value={detailed.valorEstimado}
            onChange={(val) => updateField('valorEstimado', val)}
            disabled={readOnly}
            required
          />
        </div>
      </div>

      {/* 4. COMPONENTES COMPLEMENTARES (Checklist, Vencedores, Contratos, Links) */}
      <div className="space-y-3">
        {/* Navigation Tabs for Complementary Sections */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/90 text-xs overflow-x-auto scrollbar-none">
          {/* Checklist Documental: Visível APENAS para administradores autenticados do sistema (nunca na rota pública) */}
          {!isPublicRoute && (
            <button
              type="button"
              onClick={() => setComplementaryTab('checklist')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                complementaryTab === 'checklist'
                  ? 'bg-white text-sky-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Checklist Documental ({checklistItems.filter((i) => i.checked).length}/{checklistItems.length})
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setComplementaryTab('vencedores')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              complementaryTab === 'vencedores'
                ? 'bg-white text-sky-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Vencedores ({detailed.vencedores.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setComplementaryTab('contratos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              complementaryTab === 'contratos'
                ? 'bg-white text-sky-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-sky-600" />
            <span>Contratos Vinculados ({detailed.contratosVinculados?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => setComplementaryTab('links')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              complementaryTab === 'links'
                ? 'bg-white text-sky-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>Links ({detailed.links.length})</span>
          </button>
        </div>

        {/* COMPLEMENTARY TAB 1: CHECKLIST DOCUMENTAL (Exclusivo para administradores - NÃO exibido na rota pública) */}
        {!isPublicRoute && complementaryTab === 'checklist' && (
          <AppChecklist
            title="Acompanhamento e Checklist do Processo"
            items={checklistItems}
            onToggleManual={readOnly ? undefined : handleToggleManualChecklist}
            readOnly={readOnly}
          />
        )}

        {/* COMPLEMENTARY TAB 2: VENCEDORES */}
        {complementaryTab === 'vencedores' && (
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Empresas Vencedoras e Adjudicadas
                </h4>
                <p className="text-[11px] text-slate-500">
                  {readOnly
                    ? 'Licitantes homologados e adjudicados neste procedimento'
                    : 'Vincule os licitantes vencedores cadastrados na base de fornecedores'}
                </p>
              </div>
            </div>

            {/* Add Winner Form (Admin Only) */}
            {!readOnly && (
              <form onSubmit={handleAddWinner} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AppSearchableSelect
                    label="Selecionar Fornecedor da Base"
                    value={selectedFornecedorId}
                    onChange={setSelectedFornecedorId}
                    options={fornecedores.map((f) => ({
                      value: f.id,
                      label: f.razaoSocial,
                      subtitle: `CNPJ: ${f.cnpj} • ${f.cidade}/${f.uf}`,
                    }))}
                    placeholder="Selecione o fornecedor vencedor"
                    searchPlaceholder="Buscar por razão social ou CNPJ..."
                    required
                  />

                  <AppInput
                    label="Item / Lote Adjudicado"
                    value={winnerLote}
                    onChange={(e) => setWinnerLote(e.target.value)}
                    placeholder="Ex: Lote 01 ou Item 05"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AppCurrencyInput
                    label="Valor da Proposta Final"
                    value={winnerValorProposta}
                    onChange={setWinnerValorProposta}
                  />

                  <AppCurrencyInput
                    label="Valor Homologado / Adjudicado"
                    value={winnerValorAdjudicado}
                    onChange={setWinnerValorAdjudicado}
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={!selectedFornecedorId}
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Vincular Vencedor</span>
                  </button>
                </div>
              </form>
            )}

            {/* Winners List */}
            <div className="space-y-2">
              {detailed.vencedores.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4 bg-white rounded-lg border border-slate-200">
                  Nenhum fornecedor vencedor vinculado a esta licitação.
                </p>
              ) : (
                detailed.vencedores.map((winner) => (
                  <div
                    key={winner.id}
                    className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {winner.razaoSocial}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          CNPJ: {winner.cnpj}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        <span className="font-semibold text-slate-700">{winner.loteItem}</span>: Adjudicado por{' '}
                        <span className="font-bold text-emerald-800 font-mono">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                            winner.valorAdjudicado
                          )}
                        </span>
                      </div>
                    </div>

                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => handleRemoveWinner(winner.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                        title="Remover vencedor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* COMPLEMENTARY TAB 3: CONTRATOS VINCULADOS */}
        {complementaryTab === 'contratos' && (
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Contratos Administrativos Vinculados
              </h4>
              <p className="text-[11px] text-slate-500">
                {readOnly
                  ? 'Contratos decorrentes deste procedimento licitatório'
                  : 'Selecione os contratos administrativos decorrentes deste procedimento licitatório'}
              </p>
            </div>

            <div className="space-y-2">
              {CONTRATOS_MOCK.map((ct) => {
                const isLinked = detailed.contratosVinculados?.includes(ct.numero);
                if (readOnly && !isLinked) return null;

                return (
                  <div
                    key={ct.id}
                    onClick={() => {
                      if (!readOnly) handleToggleContract(ct.numero);
                    }}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      !readOnly ? 'cursor-pointer' : ''
                    } ${
                      isLinked
                        ? 'bg-purple-50/60 border-purple-300 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {!readOnly && (
                        <AppCheckbox
                          checked={isLinked}
                          onChange={() => {}}
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{ct.numero}</span>
                          <span className="text-[10px] font-semibold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded">
                            {ct.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {ct.contratado} • {ct.objeto}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex items-center gap-3">
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-800">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                            ct.valor_total
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">Vigência até {ct.vigencia_fim}</div>
                      </div>

                      {onNavigateToContrato && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToContrato(ct.id);
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-md transition flex items-center gap-1 cursor-pointer"
                          title="Acessar página deste contrato"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span className="hidden sm:inline">Acessar</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {readOnly && (!detailed.contratosVinculados || detailed.contratosVinculados.length === 0) && (
                <p className="text-xs text-slate-400 italic text-center py-4 bg-white rounded-lg border border-slate-200">
                  Nenhum contrato formalizado vinculado a esta licitação até o momento.
                </p>
              )}
            </div>
          </div>
        )}

        {/* COMPLEMENTARY TAB 4: LINKS RELACIONADOS */}
        {complementaryTab === 'links' && (
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Links Públicos e Portais Relacionados
              </h4>
              <p className="text-[11px] text-slate-500">
                {readOnly
                  ? 'Portais oficiais e publicações externas vinculadas ao processo'
                  : 'Adicione endereços eletrônicos como Portal de Compras Públicas ou Diário Oficial'}
              </p>
            </div>

            {/* Add Link Form (Admin Only) */}
            {!readOnly && (
              <form onSubmit={handleAddLink} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AppInput
                    label="Título do Link"
                    value={newLinkTitulo}
                    onChange={(e) => setNewLinkTitulo(e.target.value)}
                    placeholder="Ex: Sessão Pública - Portal de Compras"
                    required
                  />
                  <AppInput
                    label="Endereço URL"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Link</span>
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {detailed.links.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4 bg-white rounded-lg border border-slate-200">
                  Nenhum link complementar cadastrado.
                </p>
              ) : (
                detailed.links.map((lnk) => (
                  <div
                    key={lnk.id}
                    className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <ExternalLink className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">{lnk.titulo}</div>
                        <a
                          href={lnk.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-sky-700 hover:underline font-mono truncate block"
                        >
                          {lnk.url}
                        </a>
                      </div>
                    </div>

                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(lnk.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                        title="Remover link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
