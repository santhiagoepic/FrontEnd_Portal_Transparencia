export interface GroupThemeConfig {
  groupId: string;
  title: string;
  primaryHex: string;
  softBgHex: string;
  softBorderHex: string;
  textColor: string;
  badgeBg: string;
  tabs: string[];
}

export const GROUP_CONFIGS: Record<string, GroupThemeConfig> = {
  'atos-normativos': {
    groupId: 'atos-normativos',
    title: 'Atos Normativos',
    primaryHex: '#16a34a', // Verde
    softBgHex: '#cdeedb',
    softBorderHex: '#a7dfbe',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    tabs: ['PORTARIAS', 'DECRETOS', 'LEIS', 'RESOLUÇÕES'],
  },
  'institucional': {
    groupId: 'institucional',
    title: 'Informações Institucionais',
    primaryHex: '#1d4ed8', // Azul Real
    softBgHex: '#dbeafe',
    softBorderHex: '#bfdbfe',
    textColor: 'text-blue-700',
    badgeBg: 'bg-blue-100',
    tabs: ['ESTRUTURA ORGANIZACIONAL', 'PERGUNTAS FREQUENTES'],
  },
  'contratos': {
    groupId: 'contratos',
    title: 'Contratos',
    primaryHex: '#7e22ce', // Roxo
    softBgHex: '#f3e8ff',
    softBorderHex: '#d8b4fe',
    textColor: 'text-purple-700',
    badgeBg: 'bg-purple-100',
    tabs: ['CONTRATOS', 'FISCAIS DE CONTRATOS', 'ORDEM CRONOLÓGICA', 'CONTRATOS ANTERIORES'],
  },
  'despesas': {
    groupId: 'despesas',
    title: 'Despesas',
    primaryHex: '#dc2626', // Vermelho
    softBgHex: '#fee2e2',
    softBorderHex: '#fca5a5',
    textColor: 'text-red-700',
    badgeBg: 'bg-rose-100',
    tabs: ['DESPESAS', 'EMPENHOS', 'LIQUIDAÇÕES', 'PAGAMENTOS'],
  },
  'receitas': {
    groupId: 'receitas',
    title: 'Receitas',
    primaryHex: '#059669', // Verde Esmeralda
    softBgHex: '#d1fae5',
    softBorderHex: '#a7f3d0',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    tabs: ['RECEITAS', 'DÍVIDA ATIVA', 'PREVISÃO ORÇAMENTÁRIA'],
  },
  'licitacoes': {
    groupId: 'licitacoes',
    title: 'Licitações',
    primaryHex: '#0284c7', // Azul Celeste / Sky
    softBgHex: '#e0f2fe',
    softBorderHex: '#bae6fd',
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-100',
    tabs: ['LICITAÇÕES', 'DISPENSAS E INEXIGIBILIDADES', 'PLANO ANUAL (PCA)', 'SANÇÕES ADMINISTRATIVAS'],
  },
  'recursos-humanos': {
    groupId: 'recursos-humanos',
    title: 'Recursos Humanos',
    primaryHex: '#ea580c', // Laranja
    softBgHex: '#ffedd5',
    softBorderHex: '#fed7aa',
    textColor: 'text-orange-700',
    badgeBg: 'bg-orange-100',
    tabs: ['FOLHA DE PAGAMENTO', 'PADRÃO REMUNERATÓRIO', 'ESTAGIÁRIOS', 'CONCURSOS', 'TERCEIRIZADOS'],
  },
  'ouvidoria': {
    groupId: 'ouvidoria',
    title: 'Ouvidoria',
    primaryHex: '#0d9488', // Teal
    softBgHex: '#ccfbf1',
    softBorderHex: '#99f6e4',
    textColor: 'text-teal-700',
    badgeBg: 'bg-teal-100',
    tabs: ['SOLICITAÇÃO', 'ELOGIOS', 'SUGESTÕES', 'RECLAMAÇÕES', 'DENÚNCIAS'],
  },
  'sic': {
    groupId: 'sic',
    title: 'SIC - Serviço de Informação ao Cidadão',
    primaryHex: '#0d9488', // Teal
    softBgHex: '#ccfbf1',
    softBorderHex: '#99f6e4',
    textColor: 'text-teal-700',
    badgeBg: 'bg-teal-100',
    tabs: ['PEDIDOS DE INFORMAÇÃO', 'REGULAMENTAÇÃO LAI', 'RELATÓRIOS E-SIC', 'INFORMAÇÕES SIGILOSAS'],
  },
  'saude': {
    groupId: 'saude',
    title: 'Saúde',
    primaryHex: '#e11d48', // Rosa Rubi / Magenta
    softBgHex: '#ffe4e6',
    softBorderHex: '#fecdd3',
    textColor: 'text-rose-700',
    badgeBg: 'bg-rose-100',
    tabs: ['PLANO MUNICIPAL DE SAÚDE', 'MEDICAMENTOS SUS', 'ESCALAS DE PLANTÃO', 'CONSELHO DE SAÚDE'],
  },
  'obras': {
    groupId: 'obras',
    title: 'Obras',
    primaryHex: '#d97706', // Âmbar
    softBgHex: '#fef3c7',
    softBorderHex: '#fde68a',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    tabs: ['ACOMPANHAMENTO DE OBRAS', 'OBRAS PARALISADAS', 'MEDIÇÕES', 'PROJETOS'],
  },
  'educacao': {
    groupId: 'educacao',
    title: 'Educação e Assistência Social',
    primaryHex: '#0284c7', // Azul Royal / Sky
    softBgHex: '#e0f2fe',
    softBorderHex: '#bae6fd',
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-100',
    tabs: ['PLANO DE EDUCAÇÃO', 'FILA DE CRECHES', 'CONSELHO FUNDEB', 'ASSISTÊNCIA SOCIAL'],
  },
  'meio-ambiente': {
    groupId: 'meio-ambiente',
    title: 'Meio Ambiente e Saneamento',
    primaryHex: '#047857', // Verde Musgo
    softBgHex: '#d1fae5',
    softBorderHex: '#a7f3d0',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    tabs: ['PLANO DE SANEAMENTO', 'CONSELHO MEIO AMBIENTE', 'PRESTAÇÃO DE CONTAS', 'LICENCIAMENTO'],
  },
  'lgpd': {
    groupId: 'lgpd',
    title: 'LGPD e Governo Digital',
    primaryHex: '#db2777', // Rosa Pink
    softBgHex: '#fce7f3',
    softBorderHex: '#fbcfe8',
    textColor: 'text-pink-700',
    badgeBg: 'bg-pink-100',
    tabs: ['ENCARREGADO LGPD', 'POLÍTICA DE PRIVACIDADE', 'DADOS ABERTOS (API)', 'GOVERNO DIGITAL'],
  },
  'diarias': {
    groupId: 'diarias',
    title: 'Diárias',
    primaryHex: '#b45309', // Âmbar Escuro
    softBgHex: '#fef3c7',
    softBorderHex: '#fde68a',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    tabs: ['DIÁRIAS E PASSAGENS', 'TABELA DE VALORES', 'RELATÓRIOS DE VIAGEM'],
  },
  'planejamento': {
    groupId: 'planejamento',
    title: 'Planejamento e Prestação de Contas',
    primaryHex: '#0891b2', // Ciano
    softBgHex: '#cffafe',
    softBorderHex: '#a5f3fc',
    textColor: 'text-cyan-700',
    badgeBg: 'bg-cyan-100',
    tabs: ['BALANÇO ANUAL', 'PARECER TCE', 'RGF / RREO', 'PPA / LDO / LOA'],
  },
  'renuncia-receita': {
    groupId: 'renuncia-receita',
    title: 'Renúncia de Receita',
    primaryHex: '#b91c1c', // Vermelho Escuro
    softBgHex: '#fee2e2',
    softBorderHex: '#fca5a5',
    textColor: 'text-red-700',
    badgeBg: 'bg-red-100',
    tabs: ['RENÚNCIAS FISCAIS', 'RENÚNCIAS PORMENORIZADAS', 'INCENTIVOS CULTURAIS'],
  },
  'emendas': {
    groupId: 'emendas',
    title: 'Emendas Parlamentares',
    primaryHex: '#7c3aed', // Violeta
    softBgHex: '#ede9fe',
    softBorderHex: '#ddd6fe',
    textColor: 'text-violet-700',
    badgeBg: 'bg-violet-100',
    tabs: ['EMENDAS PARLAMENTARES', 'EXECUÇÃO ORÇAMENTÁRIA', 'BENEFICIÁRIOS'],
  },
  'conselhos': {
    groupId: 'conselhos',
    title: 'Conselhos Municipais',
    primaryHex: '#1d4ed8', // Azul
    softBgHex: '#dbeafe',
    softBorderHex: '#bfdbfe',
    textColor: 'text-blue-700',
    badgeBg: 'bg-blue-100',
    tabs: ['COMPOSIÇÃO DOS CONSELHOS', 'ATAS', 'RESOLUÇÕES', 'PARECERES'],
  },
  'convenios': {
    groupId: 'convenios',
    title: 'Convênios e Transferências',
    primaryHex: '#4f46e5', // Índigo
    softBgHex: '#e0e7ff',
    softBorderHex: '#c7d2fe',
    textColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-100',
    tabs: ['CONVÊNIOS RECEBIDOS', 'CONVÊNIOS CONCEDIDOS', 'TERMOS E PARCERIAS'],
  },
  'outras-informacoes': {
    groupId: 'outras-informacoes',
    title: 'Outras Informações',
    primaryHex: '#475569', // Cinza Azulado
    softBgHex: '#f1f5f9',
    softBorderHex: '#cbd5e1',
    textColor: 'text-slate-700',
    badgeBg: 'bg-slate-200',
    tabs: ['PLANOS MUNICIPAIS', 'REFERÊNCIAS NORMATIVAS', 'GLOSSÁRIO', 'EDITAIS DE FOMENTO'],
  },
};
