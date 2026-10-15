export interface SolicitacaoEsicInput {
  assunto: string;
  descricao: string;
  orgaoDestino?: string;
  formaRecebimento: 'sistema' | 'email' | 'presencial';
  anexos?: { nome: string; tamanho: string }[];
  solicitante: {
    tipoPessoa: 'fisica' | 'juridica';
    nome: string;
    cpfCnpj: string;
    email: string;
    telefone: string;
    profissao?: string;
    escolaridade?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
  };
}

export interface TramitacaoEsic {
  data: string;
  hora: string;
  orgao: string;
  acao: string;
  descricao: string;
  status: string;
}

export interface RecursoEsic {
  instancia: '1ª Instância' | '2ª Instância';
  dataAbertura: string;
  justificativa: string;
  status: 'Em análise' | 'Deferido' | 'Indeferido';
  resposta?: string;
  dataResposta?: string;
}

export interface PedidoEsicDTO {
  id: string;
  protocolo: string;
  codigoAcesso: string;
  assunto: string;
  descricao: string;
  dataAbertura: string;
  prazoResposta: string;
  prorrogado: boolean;
  motivoProrrogacao?: string;
  status: 'Aguardando Análise' | 'Em Tramitação' | 'Respondido' | 'Indeferido' | 'Em Recurso' | 'Concluído';
  formaRecebimento: string;
  orgaoDestino: string;
  solicitante: {
    nome: string;
    email: string;
    telefone: string;
    cpfCnpj: string;
    cidade: string;
  };
  resposta?: {
    data: string;
    responsavel: string;
    cargo: string;
    parecer: 'Acesso Concedido' | 'Acesso Negado' | 'Informação Parcial';
    texto: string;
    fundamentacaoLegal?: string;
    anexoUrl?: string;
  };
  recursos: RecursoEsic[];
  historico: TramitacaoEsic[];
}

export interface EstatisticasEsic {
  ano: number;
  totalPedidos: number;
  atendidos: number;
  indeferidos: number;
  emTramitacao: number;
  recursosInterpostos: number;
  tempoMedioDias: number;
  indiceAtendimento: number; // percentage
  porTema: {
    tema: string;
    quantidade: number;
  }[];
}

export interface InformacaoClassificadaDTO {
  id: string;
  assunto: string;
  grauSigilo: 'Ultrassecreto' | 'Secreto' | 'Reservado';
  dataProducao: string;
  dataClassificacao: string;
  prazo: string;
  dispositivoLegal: string;
  orgaoResponsavel: string;
  categoria: string;
}

export interface InformacaoDesclassificadaDTO {
  id: string;
  assunto: string;
  grauSigiloAnterior: 'Ultrassecreto' | 'Secreto' | 'Reservado';
  dataProducao: string;
  dataDesclassificacao: string;
  motivo: string;
  dispositivoLegal: string;
  orgaoResponsavel: string;
}
