export interface UnidadeOrganizacional {
  id: string;
  nome: string;
  tipo: 'Gabinete' | 'Secretaria' | 'Fundo' | 'Procuradoria' | 'Controladoria' | 'Conselho' | 'Autarquia';
  gestao: string;
  sigla?: string;
  unidadeSuperiorId: string | null; // ID da unidade superior hierárquica (ex: null para Prefeito, 'gabinete-prefeito' para Vice Prefeito e secretarias)
  funcaoGestor: string;
  nomeGestor: string;
  pendenteNomeacao: boolean;
  endereco: string;
  tipoBaseJuridica: 'Lei' | 'Decreto' | 'Portaria' | 'Resolução';
  baseJuridica: string; // Ex: "Lei 257/2025" ou selecionado dos atos normativos
  baseJuridicaId?: string; // ID do documento no portal de atos normativos
  email: string;
  telefones: string;
  horarioAtendimento: string;
  competencia: string;
  perfilGestor?: string;
  resumoCurriculo?: string;
  ordem: number;
}

export interface PerguntaFrequente {
  id: string;
  pergunta: string;
  resposta: string;
  secao: string;
  ordem: number;
}
