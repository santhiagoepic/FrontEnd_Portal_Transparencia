import {
  DocumentTypeConfig,
  OrgaoConfig,
  ModalidadeConfig,
  LeiBaseConfig,
  SituacaoLicitacaoConfig,
  FornecedorConfig,
  AlertRuleConfig,
  LicitacaoDetalhada,
} from '../types/licitacoes.types';

const STORAGE_KEYS = {
  DOC_TYPES: 'saomiguel_licitacoes_doc_types',
  ORGAOS: 'saomiguel_licitacoes_orgaos',
  MODALIDADES: 'saomiguel_licitacoes_modalidades',
  LEIS_BASE: 'saomiguel_licitacoes_leis_base',
  SITUACOES: 'saomiguel_licitacoes_situacoes',
  FORNECEDORES: 'saomiguel_licitacoes_fornecedores',
  ALERT_RULES: 'saomiguel_licitacoes_alert_rules',
  DETALHADAS: 'saomiguel_licitacoes_detalhadas',
};

// Initial Seed Data for Document Types
export const INITIAL_DOC_TYPES: DocumentTypeConfig[] = [
  { id: 'edital', name: 'Documento Principal', fase: 'divulgacao', requiredForChecklist: true, order: 1, active: true },
  { id: 'termo-referencia', name: 'Termo de Referência / ETP', fase: 'preparatoria', requiredForChecklist: true, order: 2, active: true },
  { id: 'ata-sessao', name: 'Ata da Sessão Pública anexada', fase: 'julgamento', requiredForChecklist: true, order: 3, active: true },
  { id: 'homologacao', name: 'Termo de Homologação / Adjudicação publicado', fase: 'homologacao', requiredForChecklist: true, order: 4, active: true },
  { id: 'contrato', name: 'Contrato Administrativo vinculado', fase: 'contratual', requiredForChecklist: false, order: 5, active: true },
  { id: 'parecer-juridico', name: 'Conferência de Parecer Jurídico Conclusivo', fase: 'preparatoria', requiredForChecklist: false, order: 6, active: true },
  { id: 'publicacao-pncp', name: 'Certificação de Envio ao PNCP / Diário Oficial', fase: 'divulgacao', requiredForChecklist: false, order: 7, active: true },
  { id: 'estudo-tecnico', name: 'Estudo Técnico Preliminar (ETP)', fase: 'preparatoria', requiredForChecklist: false, order: 8, active: true },
  { id: 'errata', name: 'Errata / Retificação', fase: 'divulgacao', requiredForChecklist: false, order: 9, active: true },
  { id: 'proposta', name: 'Propostas de Preços', fase: 'julgamento', requiredForChecklist: false, order: 10, active: true },
  { id: 'recursos', name: 'Recursos e Julgamentos', fase: 'julgamento', requiredForChecklist: false, order: 11, active: true },
  { id: 'complementar', name: 'Documentos Complementares', fase: 'divulgacao', requiredForChecklist: false, order: 12, active: true },
];

/**
 * Extrai somente a parte numérica digitada da licitação (ex: "PE 014/2026" -> "014", "014" -> "014")
 */
export const extractSimpleNumber = (val: string | null | undefined): string => {
  if (!val) return '';
  const str = String(val).trim();
  const beforeSlash = str.includes('/') ? str.split('/')[0] : str;
  const match = beforeSlash.match(/(\d+)/);
  if (match && match[1]) {
    return match[1];
  }
  return beforeSlash.replace(/^[^\d]*/, '').trim();
};

/**
 * Combina o número da licitação digitado com o ano/exercício selecionado
 */
export const formatCombinedLicitacaoNumber = (
  numero: string | null | undefined,
  ano: string | null | undefined
): string => {
  const clean = extractSimpleNumber(numero);
  const cleanAno = ano ? String(ano).trim() : '2026';
  if (!clean) return '';
  return `${clean}/${cleanAno}`;
};

// Initial Seed Data for Órgãos
export const INITIAL_ORGAOS: OrgaoConfig[] = [
  { id: 'gabinete', nome: 'Gabinete do Prefeito', sigla: 'GP', active: true },
  { id: 'administracao', nome: 'Secretaria Municipal de Administração e Finanças', sigla: 'SEMAF', active: true },
  { id: 'saude', nome: 'Secretaria Municipal de Saúde', sigla: 'SMS', active: true },
  { id: 'educacao', nome: 'Secretaria Municipal de Educação e Cultura', sigla: 'SEMEC', active: true },
  { id: 'obras', nome: 'Secretaria Municipal de Obras e Serviços Públicos', sigla: 'SEMOSP', active: true },
  { id: 'cpl', nome: 'Comissão Permanente de Licitação', sigla: 'CPL', active: true },
  { id: 'cgm', nome: 'Controladoria Geral do Município', sigla: 'CGM', active: true },
];

// Initial Seed Data for Modalidades
export const INITIAL_MODALIDADES: ModalidadeConfig[] = [
  { id: 'pregao-eletronico', nome: 'Pregão Eletrônico', tipo: 'licitacao', active: true },
  { id: 'pregao-presencial', nome: 'Pregão Presencial', tipo: 'licitacao', active: true },
  { id: 'concorrencia', nome: 'Concorrência Pública', tipo: 'licitacao', active: true },
  { id: 'dispensa', nome: 'Dispensa de Licitação', tipo: 'contratacao_direta', active: true },
  { id: 'inexigibilidade', nome: 'Inexigibilidade de Licitação', tipo: 'contratacao_direta', active: true },
  { id: 'credenciamento', nome: 'Credenciamento', tipo: 'procedimento_auxiliar', active: true },
  { id: 'dialogo-competitivo', nome: 'Diálogo Competitivo', tipo: 'licitacao', active: true },
  { id: 'chamada-publica', nome: 'Chamada Pública', tipo: 'procedimento_auxiliar', active: true },
];

// Initial Seed Data for Leis Base
export const INITIAL_LEIS_BASE: LeiBaseConfig[] = [
  { id: 'lei-14133-2021', codigo: 'Lei 14.133/2021', titulo: 'Lei nº 14.133/2021 (Nova Lei de Licitações e Contratos)', vigencia: 'vigente', active: true },
  { id: 'lei-8666-1993', codigo: 'Lei 8.666/1993', titulo: 'Lei nº 8.666/1993 (Regime Anterior)', vigencia: 'historica', active: true },
  { id: 'lei-10520-2002', codigo: 'Lei 10.520/2002', titulo: 'Lei nº 10.520/2002 (Lei do Pregão)', vigencia: 'historica', active: true },
  { id: 'lei-12462-2011', codigo: 'Lei 12.462/2011', titulo: 'Lei nº 12.462/2011 (Regime Diferenciado de Contratações - RDC)', vigencia: 'historica', active: true },
  { id: 'lei-12232-2010', codigo: 'Lei 12.232/2010', titulo: 'Lei nº 12.232/2010 (Serviços de Publicidade)', vigencia: 'vigente', active: true },
  { id: 'lei-14065-2020', codigo: 'Lei 14.065/2020', titulo: 'Lei nº 14.065/2020 (Dispensa em Calamidade e Pandemia)', vigencia: 'transicao', active: true },
];

// Initial Seed Data for Situations
export const INITIAL_SITUACOES: SituacaoLicitacaoConfig[] = [
  { id: 'aberta', nome: 'Aberta', cor: 'sky', badgeBg: 'bg-sky-50', badgeText: 'text-sky-800', active: true },
  { id: 'em-andamento', nome: 'Em Andamento', cor: 'amber', badgeBg: 'bg-amber-50', badgeText: 'text-amber-800', active: true },
  { id: 'homologada', nome: 'Homologada', cor: 'emerald', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-800', active: true },
  { id: 'encerrada', nome: 'Encerrada', cor: 'slate', badgeBg: 'bg-slate-100', badgeText: 'text-slate-700', active: true },
  { id: 'suspensa', nome: 'Suspensa', cor: 'orange', badgeBg: 'bg-orange-50', badgeText: 'text-orange-800', active: true },
  { id: 'revogada', nome: 'Revogada', cor: 'rose', badgeBg: 'bg-rose-50', badgeText: 'text-rose-800', active: true },
  { id: 'anulada', nome: 'Anulada', cor: 'rose', badgeBg: 'bg-rose-50', badgeText: 'text-rose-800', active: true },
  { id: 'deserta', nome: 'Deserta', cor: 'purple', badgeBg: 'bg-purple-50', badgeText: 'text-purple-800', active: true },
  { id: 'fracassada', nome: 'Fracassada', cor: 'purple', badgeBg: 'bg-purple-50', badgeText: 'text-purple-800', active: true },
];

// Initial Seed Data for Fornecedores (Reutilizáveis)
export const INITIAL_FORNECEDORES: FornecedorConfig[] = [
  {
    id: 'forn-01',
    razaoSocial: 'TOCANTINS DISTRIBUIDORA DE COMBUSTÍVEIS EIRELI',
    nomeFantasia: 'Posto Araguaia Combustíveis',
    cnpj: '14.283.992/0001-45',
    cidade: 'São Miguel do Tocantins',
    uf: 'TO',
    telefone: '(63) 3447-1122',
    email: 'contato@araguaiacombustiveis.com.br',
    active: true,
  },
  {
    id: 'forn-02',
    razaoSocial: 'CONSTRUTORA ARAGUAIA TOCANTINS LTDA',
    nomeFantasia: 'Araguaia Engenharia e Pavimentação',
    cnpj: '45.678.901/0001-34',
    cidade: 'Araguatins',
    uf: 'TO',
    telefone: '(63) 3474-2050',
    email: 'licitacoes@araguaiaeng.com.br',
    active: true,
  },
  {
    id: 'forn-03',
    razaoSocial: 'TRANSPORTE ESCOLAR E TURISMO SÃO MIGUEL EIRELI',
    nomeFantasia: 'TransSãoMiguel Escolar',
    cnpj: '08.765.432/0001-99',
    cidade: 'São Miguel do Tocantins',
    uf: 'TO',
    telefone: '(63) 99234-8877',
    email: 'diretoria@transsaomiguel.com',
    active: true,
  },
  {
    id: 'forn-04',
    razaoSocial: 'CIRÚRGICA TOCANTINENSE PRODUTOS MÉDICOS LTDA',
    nomeFantasia: 'Cirúrgica Tocantins',
    cnpj: '22.333.444/0001-55',
    cidade: 'Palmas',
    uf: 'TO',
    telefone: '(63) 3215-9000',
    email: 'vendas@cirurgicatocantinense.com.br',
    active: true,
  },
  {
    id: 'forn-05',
    razaoSocial: 'TOCANTINS PNEUS E RECAPAGENS LTDA',
    nomeFantasia: 'Tocantins Pneus',
    cnpj: '12.345.678/0001-90',
    cidade: 'Imperatriz',
    uf: 'MA',
    telefone: '(99) 3524-1188',
    email: 'governo@tocantinspneus.com.br',
    active: true,
  },
];

// Initial Seed Data for Alert Rules
export const INITIAL_ALERT_RULES: AlertRuleConfig[] = [
  {
    id: 'rule-sem-edital',
    title: 'Ausência de Edital na Publicação',
    severity: 'critica',
    conditionType: 'sem_edital',
    message: 'Processo licitatório cadastrado sem o documento do Edital e Termo de Referência anexados.',
    actionLabel: 'Anexar Edital',
    active: true,
  },
  {
    id: 'rule-sem-ata',
    title: 'Ata de Sessão Pública Pendente',
    severity: 'atencao',
    conditionType: 'sem_ata',
    message: 'Licitação em fase de julgamento sem a Ata da Sessão Pública anexada ao processo.',
    actionLabel: 'Anexar Ata',
    active: true,
  },
  {
    id: 'rule-sem-contrato',
    title: 'Contrato Pendente após Homologação',
    severity: 'critica',
    conditionType: 'sem_contrato_homologado',
    message: 'Processo homologado sem instrumento contratual formalizado e vinculado.',
    actionLabel: 'Vincular Contrato',
    active: true,
  },
  {
    id: 'rule-sem-homologacao',
    title: 'Ato de Homologação Pendente',
    severity: 'atencao',
    conditionType: 'sem_homologacao',
    message: 'Licitação concluída sem o Termo de Homologação / Adjudicação publicado.',
    actionLabel: 'Anexar Homologação',
    active: true,
  },
  {
    id: 'rule-prazo-abertura',
    title: 'Sessão Pública Próxima',
    severity: 'informativa',
    conditionType: 'prazo_abertura_proximo',
    message: 'Data de abertura das propostas se aproximando da realização da sessão pública.',
    actionLabel: 'Verificar Processo',
    active: true,
  },
];

// Pre-seeded Detailed Licitações with rich data
export const INITIAL_DETALHADAS: Record<string, LicitacaoDetalhada> = {
  'lic-pe-014-2026': {
    id: 'lic-pe-014-2026',
    groupId: 'licitacoes',
    numero: '014',
    ano: '2026',
    orgaoId: 'administracao',
    modalidadeId: 'pregao-eletronico',
    leisBase: ['lei-14133-2021'],
    situacaoId: 'aberta',
    objeto: 'PREGÃO ELETRÔNICO PARA REGISTRO DE PREÇOS OBJETIVANDO A AQUISIÇÃO DE COMBUSTÍVEIS E ÓLEOS LUBRIFICANTES PARA A FROTA MUNICIPAL.',
    dataPublicacao: '04/09/2026',
    dataAbertura: '25/09/2026',
    horaAbertura: '09:00',
    tipoValor: 'Estimado',
    valorEstimado: 480000.00,
    covid: false,
    lei14065: false,
    secao: 'Comissão de Licitações (CPL)',
    signatario: 'Pregoeiro Oficial do Município',
    cargoSignatario: 'CPL - São Miguel do Tocantins',
    vencedores: [],
    contratosVinculados: [],
    links: [
      { id: 'link-1', titulo: 'Sessão Pública no Portal de Compras Públicas', url: 'https://compraspublicas.com.br' },
    ],
    checklistManual: {
      'parecer-juridico': true,
      'publicacao-pncp': true,
    },
    classificacoesArquivos: {
      'Edital_Pregao_Eletronico_014_2026.pdf': 'edital',
    },
  },
  'lic-disp-028-2026': {
    id: 'lic-disp-028-2026',
    groupId: 'licitacoes',
    numero: '028',
    ano: '2026',
    orgaoId: 'administracao',
    modalidadeId: 'dispensa',
    leisBase: ['lei-14133-2021'],
    situacaoId: 'homologada',
    objeto: 'AVISO DE DISPENSA ELETRÔNICA DE LICITAÇÃO COM BASE NO ART. 75, INCISO II DA LEI Nº 14.133/2021 PARA MANUTENÇÃO PREVENTIVA.',
    dataPublicacao: '22/08/2026',
    dataAbertura: '22/08/2026',
    horaAbertura: '10:00',
    tipoValor: 'Homologado',
    valorEstimado: 34500.00,
    covid: false,
    lei14065: false,
    secao: 'Contratações Diretas',
    signatario: 'Presidente da Comissão de Contratação',
    cargoSignatario: 'Setor de Licitações',
    vencedores: [
      {
        id: 'venc-01',
        fornecedorId: 'forn-05',
        razaoSocial: 'TOCANTINS PNEUS E RECAPAGENS LTDA',
        cnpj: '12.345.678/0001-90',
        loteItem: 'Item Único',
        objetoAdjudicado: 'Manutenção preventiva e corretiva de pneus e alinhamento',
        valorProposta: 36000.00,
        valorAdjudicado: 34500.00,
        dataResultado: '24/08/2026',
      },
    ],
    contratosVinculados: ['CT 048/2026'],
    links: [],
    checklistManual: {
      'parecer-juridico': true,
      'publicacao-pncp': true,
    },
    classificacoesArquivos: {
      'Aviso_Dispensa_028_2026.pdf': 'edital',
    },
  },
};

// Generic LocalStorage helper with initialization
function getStored<T>(key: string, initial: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initial;
  } catch {
    return initial;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to save to localStorage (${key})`, err);
  }
}

export const licitacoesConfigService = {
  // Document Types
  getDocumentTypes(): DocumentTypeConfig[] {
    return getStored<DocumentTypeConfig[]>(STORAGE_KEYS.DOC_TYPES, INITIAL_DOC_TYPES);
  },
  saveDocumentTypes(types: DocumentTypeConfig[]): void {
    setStored(STORAGE_KEYS.DOC_TYPES, types);
  },

  // Órgãos
  getOrgaos(): OrgaoConfig[] {
    return getStored<OrgaoConfig[]>(STORAGE_KEYS.ORGAOS, INITIAL_ORGAOS);
  },
  saveOrgaos(orgaos: OrgaoConfig[]): void {
    setStored(STORAGE_KEYS.ORGAOS, orgaos);
  },

  // Modalidades
  getModalidades(): ModalidadeConfig[] {
    return getStored<ModalidadeConfig[]>(STORAGE_KEYS.MODALIDADES, INITIAL_MODALIDADES);
  },
  saveModalidades(modalidades: ModalidadeConfig[]): void {
    setStored(STORAGE_KEYS.MODALIDADES, modalidades);
  },

  // Leis Base
  getLeisBase(): LeiBaseConfig[] {
    return getStored<LeiBaseConfig[]>(STORAGE_KEYS.LEIS_BASE, INITIAL_LEIS_BASE);
  },
  saveLeisBase(leis: LeiBaseConfig[]): void {
    setStored(STORAGE_KEYS.LEIS_BASE, leis);
  },

  // Situações
  getSituacoes(): SituacaoLicitacaoConfig[] {
    return getStored<SituacaoLicitacaoConfig[]>(STORAGE_KEYS.SITUACOES, INITIAL_SITUACOES);
  },
  saveSituacoes(situacoes: SituacaoLicitacaoConfig[]): void {
    setStored(STORAGE_KEYS.SITUACOES, situacoes);
  },

  // Fornecedores
  getFornecedores(): FornecedorConfig[] {
    return getStored<FornecedorConfig[]>(STORAGE_KEYS.FORNECEDORES, INITIAL_FORNECEDORES);
  },
  saveFornecedores(fornecedores: FornecedorConfig[]): void {
    setStored(STORAGE_KEYS.FORNECEDORES, fornecedores);
  },

  // Alert Rules
  getAlertRules(): AlertRuleConfig[] {
    return getStored<AlertRuleConfig[]>(STORAGE_KEYS.ALERT_RULES, INITIAL_ALERT_RULES);
  },
  saveAlertRules(rules: AlertRuleConfig[]): void {
    setStored(STORAGE_KEYS.ALERT_RULES, rules);
  },

  // Detailed Licitações Map
  getLicitacaoDetalhada(id: string): LicitacaoDetalhada | null {
    const map = getStored<Record<string, LicitacaoDetalhada>>(STORAGE_KEYS.DETALHADAS, INITIAL_DETALHADAS);
    return map[id] || null;
  },
  saveLicitacaoDetalhada(doc: LicitacaoDetalhada): void {
    const map = getStored<Record<string, LicitacaoDetalhada>>(STORAGE_KEYS.DETALHADAS, INITIAL_DETALHADAS);
    map[doc.id] = doc;
    setStored(STORAGE_KEYS.DETALHADAS, map);
  },
  getAllLicitacoesDetalhadas(): Record<string, LicitacaoDetalhada> {
    return getStored<Record<string, LicitacaoDetalhada>>(STORAGE_KEYS.DETALHADAS, INITIAL_DETALHADAS);
  },
};
