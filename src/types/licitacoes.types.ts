export type SeverityLevel = 'critica' | 'atencao' | 'informativa';

export interface DocumentTypeConfig {
  id: string;
  name: string;
  description?: string;
  fase: 'preparatoria' | 'divulgacao' | 'julgamento' | 'homologacao' | 'contratual';
  requiredForChecklist: boolean;
  order: number;
  active: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  type: 'automatico' | 'manual';
  checked: boolean;
  required?: boolean;
}

export interface OrgaoConfig {
  id: string;
  nome: string;
  sigla: string;
  descricao?: string;
  active: boolean;
}

export interface ModalidadeConfig {
  id: string;
  nome: string;
  tipo: 'licitacao' | 'contratacao_direta' | 'procedimento_auxiliar';
  descricao?: string;
  legalBasesDefault?: string[];
  active: boolean;
}

export interface LeiBaseConfig {
  id: string;
  codigo: string;
  titulo: string;
  descricao?: string;
  vigencia: 'vigente' | 'transicao' | 'historica';
  active: boolean;
}

export interface SituacaoLicitacaoConfig {
  id: string;
  nome: string;
  cor: string; // Tailwind color token or semantic key
  badgeBg: string;
  badgeText: string;
  descricao?: string;
  active: boolean;
}

export interface FornecedorConfig {
  id: string;
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  cidade: string;
  uf: string;
  telefone?: string;
  email?: string;
  active: boolean;
}

export interface VencedorItem {
  id: string;
  fornecedorId: string;
  razaoSocial: string;
  cnpj: string;
  loteItem: string;
  objetoAdjudicado: string;
  valorProposta: number;
  valorAdjudicado: number;
  dataResultado: string;
}

export interface LinkItem {
  id: string;
  titulo: string;
  url: string;
  descricao?: string;
}

export interface AlertRuleConfig {
  id: string;
  title: string;
  severity: SeverityLevel;
  conditionType: 'sem_edital' | 'sem_ata' | 'sem_contrato_homologado' | 'prazo_abertura_proximo' | 'sem_homologacao';
  message: string;
  actionLabel: string;
  active: boolean;
}

export interface ProcessAlert {
  id: string;
  licitacaoId: string;
  licitacaoNumero: string;
  licitacaoObjeto: string;
  ruleId: string;
  title: string;
  severity: SeverityLevel;
  message: string;
  actionLabel: string;
  resolved: boolean;
  createdAt: string;
}

export interface LicitacaoDetalhada {
  id: string;
  groupId: string;
  numero: string;
  ano: string;
  orgaoId: string;
  modalidadeId: string;
  leisBase: string[];
  situacaoId: string;
  objeto: string;
  dataPublicacao: string;
  dataAbertura: string;
  horaAbertura: string;
  tipoValor: 'Estimado' | 'Máximo Aceitável' | 'Homologado';
  valorEstimado: number;
  covid: boolean;
  lei14065: boolean;
  secao: string;
  signatario: string;
  cargoSignatario: string;
  vencedores: VencedorItem[];
  contratosVinculados: string[];
  links: LinkItem[];
  checklistManual: Record<string, boolean>;
  classificacoesArquivos: Record<string, string>; // fileId or fileName -> documentTypeId
}
