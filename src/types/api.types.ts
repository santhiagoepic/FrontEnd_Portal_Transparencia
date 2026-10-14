export type QueryState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ReceitaDTO {
  id: string;
  codigo: string;
  descricao: string;
  categoria: string;
  arrecadado: number;
  previsto: number;
  data: string;
  exercicio: number;
  fonte_recurso?: string;
}

export interface DespesaDTO {
  id: string;
  empenho: string;
  orgao: string;
  credor: string;
  cnpj_cpf?: string;
  valor: number;
  fase: 'Empenhado' | 'Liquidado' | 'Pago';
  data: string;
  elemento: string;
  funcao?: string;
  subfuncao?: string;
}

export interface LicitacaoDTO {
  id: string;
  numero: string;
  modalidade: string;
  objeto: string;
  status: 'Aberta' | 'Em Andamento' | 'Homologada' | 'Encerrada';
  data_abertura: string;
  valor_estimado: number;
  edital_url?: string;
}

export interface ContratoDTO {
  id: string;
  numero: string;
  objeto: string;
  contratado: string;
  cnpj: string;
  valor_total: number;
  vigencia_inicio?: string;
  vigencia_fim: string;
  status: 'Vigente' | 'Finalizado' | 'Em Aditivo';
  processo_licitatorio?: string;
}

export interface ServidorDTO {
  id: string;
  matricula: string;
  nome: string;
  cargo: string;
  lotacao: string;
  salario_bruto: number;
  salario_liquido: number;
  tipo_vinculo: 'Efetivo' | 'Comissionado' | 'Contratado' | 'Estagiário';
  mes_ano?: string;
}

export interface ObraDTO {
  id: string;
  nome: string;
  local: string;
  valor: number;
  progresso: number;
  status: 'Em Execução' | 'Concluída' | 'Em Licitação' | 'Paralisada';
  prazo: string;
  contratada?: string;
}

export interface DocumentoOficialDTO {
  id: string;
  groupId: string;
  tab: string;
  numero: string;
  numeroSimples: string;
  ano: string;
  secao: string;
  assinatura: string;
  ementa: string;
  anexoNome: string;
  anexoTamanho: string;
  signatario: string;
  cargoSignatario: string;
  textoIntegral?: string;
}
