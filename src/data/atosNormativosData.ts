export interface DocumentItem {
  id: string;
  numero: string;
  numeroSimples: string;
  ano: string;
  secao: string;
  assinatura: string;
  ementa: string;
  tipo: 'PORTARIAS' | 'DECRETOS' | 'LEIS' | 'RESOLUÇÕES';
  anexoNome: string;
  anexoTamanho: string;
  textoIntegral?: string;
  signatario?: string;
  cargoSignatario?: string;
}

export const ATOS_NORMATIVOS_DATA: DocumentItem[] = [
  {
    id: 'port-085-2026',
    numero: '085/2026',
    numeroSimples: '85',
    ano: '2026',
    secao: '',
    assinatura: '16/09/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE DESIGNAÇÃO DE SERVIDORA PARA EXERCER A FUNÇÃO DE GESTORA DO FUNDO MUNICIPAL DA INFÂNCIA E ADOLESCÊNCIA - FIA, E DÁ OUTRAS PROVIDENCIAS.',
    anexoNome: '085. Gestora_FIA_Designacao.pdf',
    anexoTamanho: '184 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito',
    textoIntegral: `O PREFEITO MUNICIPAL DE SÃO MIGUEL DO TOCANTINS, Estado do Tocantins, no uso de suas atribuições legais conferidas pela Lei Orgânica do Município;\n\nRESOLVE:\n\nArt. 1º - DESIGNAR servidora pública municipal para exercer, no âmbito da Secretaria Municipal de Assistência Social, a função de Gestora do Fundo Municipal dos Direitos da Criança e do Adolescente - FIA.\n\nArt. 2º - Esta Portaria entra em vigor na data de sua publicação, revogadas as disposições em contrário.`
  },
  {
    id: 'port-084-2026',
    numero: '084/2026',
    numeroSimples: '84',
    ano: '2026',
    secao: '',
    assinatura: '03/09/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE A NOMEAÇÃO DE SERVIDOR PARA EXERCER CARGO EM COMISSÃO, E DÁ OUTRAS PROVIDÊNCIAS',
    anexoNome: '084. Nomeação - CHRYSTIANE.pdf',
    anexoTamanho: '215 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito',
    textoIntegral: `O PREFEITO MUNICIPAL DE SÃO MIGUEL DO TOCANTINS, no uso de suas atribuições legais que lhe são conferidas pela Lei Orgânica Municipal e pela legislação vigente;\n\nRESOLVE:\n\nArt. 1º - NOMEAR a servidora para exercer o cargo de provimento em comissão na estrutura administrativa do Poder Executivo Municipal de São Miguel do Tocantins - TO.\n\nArt. 2º - Esta portaria entra em vigor na data de sua publicação, com efeitos retroativos à data de assunção das funções.\n\nRegistre-se, publique-se e cumpra-se.`
  },
  {
    id: 'port-083-2026',
    numero: '083/2026',
    numeroSimples: '83',
    ano: '2026',
    secao: '',
    assinatura: '24/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DESIGNA A SECRETÁRIA MUNICIPAL DE DESENVOLVIMENTO SOCIAL E DA MULHER PARA DESEMPENHAR A FUNÇÃO DE PRESIDENTE DA CAISAN DE SÃO MIGUEL DO TOCANTINS/TO',
    anexoNome: '083. Designacao_Presidente_CAISAN.pdf',
    anexoTamanho: '198 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'port-082-2026',
    numero: '082/2026',
    numeroSimples: '82',
    ano: '2026',
    secao: '',
    assinatura: '24/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'NOMEIA OS MEMBROS QUE INTEGRARÃO A CÂMARA INTERSECRETARIAL DE SEGURANÇA ALIMENTAR E NUTRICIONAL DE SÃO MIGUEL DO TOCANTINS- CAISAN',
    anexoNome: '082. Membros_Camara_CAISAN.pdf',
    anexoTamanho: '240 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'port-081-2026',
    numero: '081/2026',
    numeroSimples: '81',
    ano: '2026',
    secao: '',
    assinatura: '26/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DESIGNA A SERVIDORA PÚBLICA LUANA BARROS ALVES DOS SANTOS PARA RESPONDER CUMULATIVAMENTE PELA FUNÇÃO DE COORDENADORA DE APOIO AOS CONSELHOS MUNICIPAIS, NO ÂMBITO DO MUNICÍPIO DE SÃO MIGUEL DO TOCANTINS/TO',
    anexoNome: '081. Designacao_Coordenadora_Conselhos.pdf',
    anexoTamanho: '188 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'port-080-2026',
    numero: '080/2026',
    numeroSimples: '80',
    ano: '2026',
    secao: '',
    assinatura: '21/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE CONCESSÃO DE LICENÇA MATERNIDADE À SERVIDORA PÚBLICA MUNICIPAL, E DÁ OUTRAS PROVIDENCIAS',
    anexoNome: '080. Licenca_Maternidade.pdf',
    anexoTamanho: '172 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Secretaria de Administração'
  },
  {
    id: 'port-079-2026',
    numero: '079/2026',
    numeroSimples: '79',
    ano: '2026',
    secao: '',
    assinatura: '21/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE CONCESSÃO DE LICENÇA MATERNIDADE À SERVIDORA PÚBLICA MUNICIPAL, E DÁ OUTRAS PROVIDENCIAS',
    anexoNome: '079. Concessao_Licenca.pdf',
    anexoTamanho: '174 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Secretaria de Administração'
  },
  {
    id: 'port-077-2026',
    numero: '077/2026',
    numeroSimples: '77',
    ano: '2026',
    secao: '',
    assinatura: '05/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE A NOMEAÇÃO DE SERVIDOR PARA EXERCER CARGO EM COMISSÃO, E DÁ OUTRAS PROVIDÊNCIAS',
    anexoNome: '077. Nomeacao_Cargo_Comissao.pdf',
    anexoTamanho: '210 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'port-076-2026',
    numero: '076/2026',
    numeroSimples: '76',
    ano: '2026',
    secao: '',
    assinatura: '05/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE A NOMEAÇÃO DE SERVIDORA CEDIDA PELO MUNICÍPIO DE IMPERATRIZ/MA PARA O EXERCÍCIO DE CARGO EM COMISSÃO NO MUNICÍPIO DE SÃO MIGUEL DO TOCANTINS E DÁ OUTRAS PROVIDÊNCIAS',
    anexoNome: '076. Servidora_Cedida_Imperatriz.pdf',
    anexoTamanho: '232 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'port-075-2026',
    numero: '075/2026',
    numeroSimples: '75',
    ano: '2026',
    secao: '',
    assinatura: '04/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE A EXONERAÇÃO DE FUNCIONÁRIO COMISSIONADO DO MUNICÍPIO DE SÃO MIGUEL DO TOCANTINS, E DÁ OUTRAS PROVIDÊNCIAS',
    anexoNome: '075. Exoneracao_Comissionado.pdf',
    anexoTamanho: '165 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'port-074-2026',
    numero: '074/2026',
    numeroSimples: '74',
    ano: '2026',
    secao: '',
    assinatura: '03/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE PRORROGAÇÃO DE LICENÇA PARA TRATAR DE INTERESSE PARTICULAR PARA SERVIDOR PÚBLICO DE SÃO MIGUEL DO TOCANTINS, E DÁ OUTRAS PROVIDENCIAS',
    anexoNome: '074. Prorrogacao_Licenca_Interesse.pdf',
    anexoTamanho: '180 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Secretaria de Administração'
  },
  {
    id: 'port-073-2026',
    numero: '073/2026',
    numeroSimples: '73',
    ano: '2026',
    secao: '',
    assinatura: '03/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE CONCESSÃO DE LICENÇA MATERNIDADE À SERVIDORA PÚBLICA MUNICIPAL, E DÁ OUTRAS PROVIDENCIAS',
    anexoNome: '073. Licenca_Maternidade.pdf',
    anexoTamanho: '172 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Secretaria de Administração'
  },
  {
    id: 'port-072-2026',
    numero: '072/2026',
    numeroSimples: '72',
    ano: '2026',
    secao: '',
    assinatura: '03/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'DISPÕE SOBRE A NOMEAÇÃO DE SERVIDOR PARA EXERCER CARGO EM COMISSÃO, E DÁ OUTRAS PROVIDÊNCIAS',
    anexoNome: '072. Nomeacao_Cargo_Comissao.pdf',
    anexoTamanho: '208 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'port-071-2026',
    numero: '071/2026',
    numeroSimples: '71',
    ano: '2026',
    secao: '',
    assinatura: '03/08/2026',
    tipo: 'PORTARIAS',
    ementa: 'NOMEAR A SRA. RAIMUNDA NONATA DE MORAIS SOUZA, PARA EXERCER O CARGO COMISSIONADO DE "SECRETÁRIA EXECUTIVA DE DESENVOLVIMENTO SOCIAL"',
    anexoNome: '071. Nomeacao_Raimunda_Nonata.pdf',
    anexoTamanho: '218 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  // DECRETOS
  {
    id: 'dec-112-2026',
    numero: '112/2026',
    numeroSimples: '112',
    ano: '2026',
    secao: '',
    assinatura: '15/09/2026',
    tipo: 'DECRETOS',
    ementa: 'REGULAMENTA O PROCEDIMENTO DE RETENÇÃO NA FONTE DO IMPOSTO SOBRE A RENDA (IRPJ/IRPF) NO ÂMBITO DA ADMINISTRAÇÃO PÚBLICA MUNICIPAL',
    anexoNome: '112. Regulamentacao_Retencao_IR.pdf',
    anexoTamanho: '280 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'dec-098-2026',
    numero: '098/2026',
    numeroSimples: '98',
    ano: '2026',
    secao: '',
    assinatura: '10/08/2026',
    tipo: 'DECRETOS',
    ementa: 'DECLARA DE UTILIDADE PÚBLICA PARA FINS DE DESAPROPRIAÇÃO ÁREA DE TERRA DESTINADA À AMPLIAÇÃO DO SISTEMA DE TRATAMENTO DE ÁGUA',
    anexoNome: '098. Desapropriacao_Tratamento_Agua.pdf',
    anexoTamanho: '310 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  // LEIS
  {
    id: 'lei-482-2026',
    numero: '482/2026',
    numeroSimples: '482',
    ano: '2026',
    secao: '',
    assinatura: '28/06/2026',
    tipo: 'LEIS',
    ementa: 'DISPÕE SOBRE AS DIRETRIZES ORÇAMENTÁRIAS (LDO) PARA O EXERCÍCIO FINANCEIRO DE 2027 E DÁ OUTRAS PROVIDÊNCIAS',
    anexoNome: '482. Lei_Diretrizes_Orcamentarias_2027.pdf',
    anexoTamanho: '1.4 MB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'lei-480-2026',
    numero: '480/2026',
    numeroSimples: '480',
    ano: '2026',
    secao: '',
    assinatura: '14/05/2026',
    tipo: 'LEIS',
    ementa: 'INSTITUI O PROGRAMA MUNICIPAL DE INCENTIVO À AGRICULTURA FAMILIAR E AO PEQUENO PRODUTOR RURAL DE SÃO MIGUEL DO TOCANTINS',
    anexoNome: '480. Incentivo_Agricultura_Familiar.pdf',
    anexoTamanho: '450 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  // RESOLUÇÕES
  {
    id: 'res-018-2026',
    numero: '018/2026',
    numeroSimples: '18',
    ano: '2026',
    secao: '',
    assinatura: '19/08/2026',
    tipo: 'RESOLUÇÕES',
    ementa: 'APROVA O PLANO DE AÇÃO ANUAL DO CONSELHO MUNICIPAL DOS DIREITOS DA CRIANÇA E DO ADOLESCENTE (CMDCA) PARA O EXERCÍCIO VIGENTE',
    anexoNome: '018. Resolucao_Plano_Acao_CMDCA.pdf',
    anexoTamanho: '290 KB',
    signatario: 'Presidente do CMDCA',
    cargoSignatario: 'Conselho Municipal dos Direitos da Criança e do Adolescente'
  }
];
