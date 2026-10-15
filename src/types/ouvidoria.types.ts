export type ModalidadeOuvidoria = 
  | 'solicitacao' 
  | 'elogio' 
  | 'sugestao' 
  | 'reclamacao' 
  | 'denuncia';

export interface ManifestacaoInput {
  modalidade: ModalidadeOuvidoria;
  assunto: string;
  descricao: string;
  orgaoDestino?: string;
  localOcorrencia?: string;
  dataOcorrencia?: string;
  anexos?: { nome: string; tamanho: string }[];
  isAnonimo: boolean;
  solicitante: {
    nome?: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    bairro?: string;
  };
}

export interface HistoricoTramitacao {
  data: string;
  hora: string;
  setor: string;
  descricao: string;
  status: string;
}

export interface ManifestacaoDTO {
  id: string;
  protocolo: string;
  codigoAcesso: string;
  modalidade: ModalidadeOuvidoria;
  assunto: string;
  descricao: string;
  dataAbertura: string;
  prazoResposta: string;
  status: 'Em análise' | 'Em tramitação' | 'Respondida' | 'Concluída';
  isAnonimo: boolean;
  solicitante?: {
    nome?: string;
    email?: string;
    telefone?: string;
    cpf?: string;
  };
  orgaoDestino: string;
  resposta?: {
    data: string;
    responsavel: string;
    cargo: string;
    texto: string;
    anexoUrl?: string;
  };
  historico: HistoricoTramitacao[];
}

export interface EstatisticasOuvidoria {
  ano: number;
  total: number;
  respondidas: number;
  emTramitacao: number;
  tempoMedioDias: number;
  taxaSatisfacao: number; // percentage
  porModalidade: {
    solicitacao: number;
    elogio: number;
    sugestao: number;
    reclamacao: number;
    denuncia: number;
  };
  porSecretaria: {
    secretaria: string;
    quantidade: number;
  }[];
}

export interface CartaServicoDTO {
  id: string;
  titulo: string;
  tipo: string; // 'Saúde' | 'Educação' | 'Administração e Finanças' | 'Obras e Infraestrutura' | 'Meio Ambiente' | 'Assistência Social'
  publicoAlvo: string;
  dataPublicacao: string;
  dataRevisao: string;
  requisitos: string[];
  etapas: string[];
  prazo: string;
  canais: string[];
  horario: string;
  responsavel: string;
  documentoUrl?: string;
}
