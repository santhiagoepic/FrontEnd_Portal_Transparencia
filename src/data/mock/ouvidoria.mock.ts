import { 
  ManifestacaoDTO, 
  EstatisticasOuvidoria, 
  CartaServicoDTO 
} from '../../types/ouvidoria.types';

export const OUVIDORIA_CONTATOS = {
  setor: 'Ouvidoria Geral do Município',
  responsavel: 'Dr. Carlos Eduardo Lima',
  cargo: 'Ouvidor Geral Municipal',
  endereco: 'Rua Afonso Pena, s/n - Centro, São Miguel do Tocantins - TO, CEP 77925-000',
  sala: 'Gabinete da Ouvidoria - Térreo',
  horario: 'Segunda a Sexta-feira, das 07:30 às 13:30',
  telefone: '(63) 3447-1122',
  whatsapp: '(63) 98452-3341',
  email: 'ouvidoria@saomigueldotocantins.to.gov.br',
  prazosTexto: 'Prazo inicial de até 30 (trinta) dias para resposta, prorrogável por igual período mediante justificativa expressa, conforme a Lei Federal nº 13.460/2017.',
  legislacao: [
    {
      titulo: 'Lei Federal nº 13.460/2017',
      descricao: 'Dispõe sobre participação, proteção e defesa dos direitos do usuário dos serviços públicos da administração pública.'
    },
    {
      titulo: 'Lei Municipal nº 342/2021',
      descricao: 'Regulamenta o funcionamento da Ouvidoria Geral e institui o Código de Defesa do Usuário de Serviços Públicos no Município de São Miguel do Tocantins.'
    },
    {
      titulo: 'Decreto Municipal nº 084/2022',
      descricao: 'Estabelece os fluxos, procedimentos de tramitação e prazos internos para atendimento às manifestações de ouvidoria.'
    }
  ]
};

export const MANIFESTACOES_MOCK: ManifestacaoDTO[] = [
  {
    id: 'ouv-001',
    protocolo: 'OUV-2026-00412',
    codigoAcesso: 'SMT-8849',
    modalidade: 'solicitacao',
    assunto: 'Manutenção na iluminação pública da Rua Afonso Pena',
    descricao: 'Solicito a troca de três lâmpadas de LED que estão queimadas nos postes próximos ao número 140, gerando insegurança aos pedestres no período noturno.',
    dataAbertura: '04/03/2026',
    prazoResposta: '03/04/2026',
    status: 'Respondida',
    isAnonimo: false,
    solicitante: {
      nome: 'Raimundo Nonato Alves',
      email: 'raimundo.alves@gmail.com',
      telefone: '(63) 99214-5582',
      cpf: '452.***.***-82'
    },
    orgaoDestino: 'Secretaria Municipal de Infraestrutura e Obras',
    resposta: {
      data: '18/03/2026',
      responsavel: 'Eng. Roberto Soares',
      cargo: 'Secretário Municipal de Infraestrutura',
      texto: 'Informamos que a equipe técnica de iluminação pública realizou a substituição dos módulos de LED dos postes solicitados no dia 17/03/2026, com restabelecimento total da iluminação no logradouro.',
    },
    historico: [
      {
        data: '04/03/2026',
        hora: '09:15',
        setor: 'Ouvidoria Geral',
        descricao: 'Manifestação registrada no sistema e gerado protocolo.',
        status: 'Registrada'
      },
      {
        data: '05/03/2026',
        hora: '10:30',
        setor: 'Ouvidoria Geral',
        descricao: 'Manifestação analisada, qualificada e encaminhada para o setor de iluminação.',
        status: 'Em tramitação'
      },
      {
        data: '18/03/2026',
        hora: '14:20',
        setor: 'Sec. de Infraestrutura e Obras',
        descricao: 'Resposta conclusiva emitida após execução do serviço em campo.',
        status: 'Respondida'
      }
    ]
  },
  {
    id: 'ouv-002',
    protocolo: 'OUV-2026-00389',
    codigoAcesso: 'SMT-3120',
    modalidade: 'elogio',
    assunto: 'Elogio ao atendimento da Unidade Básica de Saúde Central',
    descricao: 'Gostaria de registrar um sincero elogio à equipe de enfermagem e ao médico plantonista da UBS Central pelo acolhimento humano e pontualidade na consulta da minha mãe idosa.',
    dataAbertura: '22/02/2026',
    prazoResposta: '24/03/2026',
    status: 'Concluída',
    isAnonimo: false,
    solicitante: {
      nome: 'Maria da Conceição Ferreira',
      email: 'conceicao.ferreira@yahoo.com.br',
      telefone: '(63) 98841-2091',
      cpf: '612.***.***-34'
    },
    orgaoDestino: 'Secretaria Municipal de Saúde',
    resposta: {
      data: '27/02/2026',
      responsavel: 'Dra. Vanessa Martins',
      cargo: 'Secretária Municipal de Saúde',
      texto: 'Agradecemos o reconhecimento e informamos que o elogio foi formalmente registrado no prontuário funcional dos profissionais da equipe da UBS Central, servindo de estímulo contínuo à humanização no SUS.'
    },
    historico: [
      {
        data: '22/02/2026',
        hora: '11:40',
        setor: 'Ouvidoria Geral',
        descricao: 'Elogio registrado e classificado com sucesso.',
        status: 'Registrada'
      },
      {
        data: '27/02/2026',
        hora: '16:00',
        setor: 'Secretaria de Saúde',
        descricao: 'Notificação e agradecimento registrados.',
        status: 'Concluída'
      }
    ]
  },
  {
    id: 'ouv-003',
    protocolo: 'OUV-2026-00455',
    codigoAcesso: 'SMT-9921',
    modalidade: 'denuncia',
    assunto: 'Uso indevido de veículo oficial fora de horário de expediente',
    descricao: 'Presenciei caminhonete com identificação municipal estacionada em estabelecimento comercial privado no domingo à tarde no povoado Bela Vista.',
    dataAbertura: '10/03/2026',
    prazoResposta: '09/04/2026',
    status: 'Em tramitação',
    isAnonimo: true,
    orgaoDestino: 'Controladoria Geral do Município',
    historico: [
      {
        data: '10/03/2026',
        hora: '15:22',
        setor: 'Ouvidoria Geral',
        descricao: 'Denúncia anônima recebida com garantia integral de sigilo da fonte.',
        status: 'Registrada'
      },
      {
        data: '12/03/2026',
        hora: '09:00',
        setor: 'Controladoria Geral',
        descricao: 'Abertura de Procedimento de Investigação Preliminar (PIP) para verificação de registro de bordo e GPS.',
        status: 'Em tramitação'
      }
    ]
  },
  {
    id: 'ouv-004',
    protocolo: 'OUV-2026-00478',
    codigoAcesso: 'SMT-5512',
    modalidade: 'sugestao',
    assunto: 'Ampliação do horário de coleta seletiva no bairro Novo Horizonte',
    descricao: 'Sugiro a inclusão de um segundo dia semanal para a coleta seletiva de materiais recicláveis no bairro Novo Horizonte, tendo em vista o aumento da adesão dos moradores.',
    dataAbertura: '14/03/2026',
    prazoResposta: '13/04/2026',
    status: 'Em análise',
    isAnonimo: false,
    solicitante: {
      nome: 'José Valdir Ribeiro',
      email: 'valdir.ambiental@gmail.com',
      telefone: '(63) 99182-3344',
      cpf: '789.***.***-01'
    },
    orgaoDestino: 'Secretaria Municipal de Meio Ambiente e Saneamento',
    historico: [
      {
        data: '14/03/2026',
        hora: '14:10',
        setor: 'Ouvidoria Geral',
        descricao: 'Sugestão cadastrada e autuada.',
        status: 'Em análise'
      }
    ]
  }
];

export const ESTATISTICAS_OUVIDORIA_MOCK: EstatisticasOuvidoria = {
  ano: 2026,
  total: 248,
  respondidas: 221,
  emTramitacao: 27,
  tempoMedioDias: 8.4,
  taxaSatisfacao: 93.6,
  porModalidade: {
    solicitacao: 112,
    elogio: 46,
    sugestao: 38,
    reclamacao: 34,
    denuncia: 18,
  },
  porSecretaria: [
    { secretaria: 'Infraestrutura e Obras Públicas', quantidade: 78 },
    { secretaria: 'Saúde', quantidade: 62 },
    { secretaria: 'Meio Ambiente e Limpeza Urbana', quantidade: 41 },
    { secretaria: 'Educação e Cultura', quantidade: 33 },
    { secretaria: 'Administração e Finanças', quantidade: 21 },
    { secretaria: 'Assistência Social', quantidade: 13 },
  ]
};

export const CARTA_SERVICOS_MOCK: CartaServicoDTO[] = [
  {
    id: 'cs-01',
    titulo: 'Solicitação de Manutenção de Iluminação Pública',
    tipo: 'Infraestrutura e Serviços Públicos',
    publicoAlvo: 'Cidadãos residentes em São Miguel do Tocantins',
    dataPublicacao: '15/01/2025',
    dataRevisao: '10/01/2026',
    requisitos: [
      'Endereço completo com ponto de referência',
      'Número do poste ou identificação da placa metálica (quando visível)',
      'Descrição do defeito (lâmpada acesa de dia, apagada à noite ou piscando)'
    ],
    etapas: [
      'Abertura de chamado presencial ou via Ouvidoria Online',
      'Vistoria técnica pela equipe de eletricistas em até 48 horas',
      'Execução da troca de componentes e encerramento do protocolo'
    ],
    prazo: 'Até 72 horas úteis',
    canais: ['Ouvidoria Online', 'Telefone (63) 3447-1122', 'Atendimento Presencial na Prefeitura'],
    horario: 'Segunda a Sexta, das 07:30 às 13:30',
    responsavel: 'Secretaria Municipal de Infraestrutura e Obras',
  },
  {
    id: 'cs-02',
    titulo: 'Emissão de Guia de IPTU e Certidão Negativa de Débitos (CND)',
    tipo: 'Administração e Finanças',
    publicoAlvo: 'Proprietários de imóveis e contribuintes municipais',
    dataPublicacao: '05/01/2025',
    dataRevisao: '02/01/2026',
    requisitos: [
      'Número de Inscrição Municipal do imóvel ou CPF/CNPJ do titular',
      'Documento de identidade oficial com foto'
    ],
    etapas: [
      'Acesso ao Portal do Contribuinte ou atendimento presencial no setor de Tributos',
      'Validação dos dados cadastrais e seleção do exercício fiscal',
      'Geração imediata do documento em formato PDF com QR Code de autenticidade'
    ],
    prazo: 'Imediato (Online) ou até 15 minutos (Presencial)',
    canais: ['Portal da Transparência / Tributos Web', 'Setor de Arrecadação Municipal'],
    horario: 'Segunda a Sexta, das 07:30 às 13:30',
    responsavel: 'Secretaria Municipal de Finanças e Tributação',
  },
  {
    id: 'cs-03',
    titulo: 'Dispensação de Medicamentos da Farmácia Básica Municipal',
    tipo: 'Saúde',
    publicoAlvo: 'Usuários do Sistema Único de Saúde (SUS) residentes no município',
    dataPublicacao: '12/02/2025',
    dataRevisao: '15/01/2026',
    requisitos: [
      'Receita médica original emitida pelo SUS com validade vigente',
      'Cartão Nacional do SUS (CNS)',
      'Documento de identificação com foto e comprovante de residência'
    ],
    etapas: [
      'Apresentação da receita na Farmácia Básica da UBS Central',
      'Triagem e conferência da posologia pelo farmacêutico responsável',
      'Dispensação e orientação sobre o uso adequado da medicação'
    ],
    prazo: 'Atendimento imediato conforme disponibilidade em estoque',
    canais: ['Farmácia Básica Municipal - UBS Central Dr. Pedro Silva'],
    horario: 'Segunda a Sexta, das 07:30 às 13:30 e das 14:00 às 17:00',
    responsavel: 'Secretaria Municipal de Saúde',
  },
  {
    id: 'cs-04',
    titulo: 'Matrícula e Rematrícula na Rede Municipal de Ensino',
    tipo: 'Educação',
    publicoAlvo: 'Alunos da Educação Infantil e Ensino Fundamental I e II',
    dataPublicacao: '20/11/2024',
    dataRevisao: '18/12/2025',
    requisitos: [
      'Certidão de Nascimento do estudante',
      'Cartão de Vacinação atualizado',
      'Comprovante de residência atualizado',
      'Histórico escolar ou declaração de transferência',
      'Documento de identidade e CPF dos responsáveis legais'
    ],
    etapas: [
      'Chamada pública no período de matrículas escolares',
      'Comparecimento à unidade escolar de preferência com documentos obrigatórios',
      'Confirmação da vaga e emissão da ficha cadastral do estudante'
    ],
    prazo: 'Efetivação em até 48 horas após entrega completa dos documentos',
    canais: ['Secretarias das Escolas Municipais e Secretaria de Educação'],
    horario: 'Segunda a Sexta, das 07:30 às 13:30',
    responsavel: 'Secretaria Municipal de Educação e Cultura',
  },
  {
    id: 'cs-05',
    titulo: 'Emissão de Alvará de Funcionamento e Localização',
    tipo: 'Administração e Finanças',
    publicoAlvo: 'Pessoas jurídicas, microempreendedores individuais (MEI) e autônomos',
    dataPublicacao: '01/03/2025',
    dataRevisao: '10/01/2026',
    requisitos: [
      'Contrato Social ou CCMEI registrado na Junta Comercial',
      'Comprovante de endereço comercial e CNPJ ativo',
      'Laudo do Corpo de Bombeiros e Licença Sanitária (quando aplicável)'
    ],
    etapas: [
      'Protocolo do pedido via sistema eletrônico ou setor de tributação',
      'Vistoria prévia do local pelos fiscais municipais',
      'Pagamento da taxa de licença e emissão do alvará digital'
    ],
    prazo: 'De 3 a 5 dias úteis',
    canais: ['Sala do Empreendedor e Setor de Tributos'],
    horario: 'Segunda a Sexta, das 07:30 às 13:30',
    responsavel: 'Secretaria Municipal de Finanças / Sala do Empreendedor',
  },
  {
    id: 'cs-06',
    titulo: 'Inscrição e Atualização no Cadastro Único (CadÚnico / Bolsa Família)',
    tipo: 'Assistência Social',
    publicoAlvo: 'Famílias de baixa renda residentes no município',
    dataPublicacao: '10/01/2025',
    dataRevisao: '08/01/2026',
    requisitos: [
      'CPF ou Título de Eleitor do Responsável Familiar',
      'Certidão de Nascimento ou Casamento de todos os membros do grupo familiar',
      'Comprovante de renda familiar e comprovante de residência atualizado',
      'Declaração escolar de frequência dos dependentes em idade escolar'
    ],
    etapas: [
      'Agendamento prévio no CRAS ou comparecimento presencial',
      'Entrevista socioeconômica com assistente social',
      'Inserção dos dados no sistema federal V7 e entrega do comprovante NIS'
    ],
    prazo: 'Atendimento no mesmo dia do agendamento',
    canais: ['CRAS Esperança e Secretaria de Assistência Social'],
    horario: 'Segunda a Sexta, das 07:30 às 13:30',
    responsavel: 'Secretaria Municipal de Assistência Social',
  }
];
