import { 
  PedidoEsicDTO, 
  EstatisticasEsic, 
  InformacaoClassificadaDTO, 
  InformacaoDesclassificadaDTO 
} from '../../types/esic.types';

export const SIC_FISICO_INFO = {
  setor: 'Serviço de Informação ao Cidadão - SIC Presencial',
  responsavel: 'Mariana Duarte de Alencar',
  cargo: 'Gestora e Encarregada do e-SIC Municipal',
  endereco: 'Rua Afonso Pena, s/n - Centro, São Miguel do Tocantins - TO, CEP 77925-000',
  sala: 'Recepção Central / Protocolo Geral do Município',
  horario: 'Segunda a Sexta-feira, das 07:30 às 13:30',
  telefone: '(63) 3447-1122 (Ramal 204)',
  whatsapp: '(63) 98452-3341',
  email: 'esic@saomigueldotocantins.to.gov.br',
  prazosDescricao: 'Resposta em até 20 (vinte) dias corridos, prorrogáveis por mais 10 (dez) dias mediante justificativa expressa (Art. 11 da Lei Federal nº 12.527/2011).',
  recursosDescricao: 'Em caso de negativa de acesso à informação ou não fornecimento das razões da negativa, o cidadão poderá interpor recurso no prazo de 10 dias à autoridade hierarquicamente superior (Secretário da Pasta) e, em 2ª instância, ao Gabinete do Prefeito Municipal.',
  legislacao: [
    {
      titulo: 'Lei Federal nº 12.527/2011 (LAI)',
      descricao: 'Regula o acesso a informações previsto no inciso XXXIII do art. 5º, no inciso II do § 3º do art. 37 e no § 2º do art. 216 da Constituição Federal.'
    },
    {
      titulo: 'Decreto Municipal nº 045/2015',
      descricao: 'Regulamenta os procedimentos para a garantia do acesso à informação e institui o Serviço de Informação ao Cidadão (SIC) no âmbito do Poder Executivo de São Miguel do Tocantins.'
    },
    {
      titulo: 'Decreto Federal nº 7.724/2012',
      descricao: 'Regulamenta a Lei Federal nº 12.527/2011, que dispõe sobre o acesso a informações.'
    }
  ]
};

export const PEDIDOS_ESIC_MOCK: PedidoEsicDTO[] = [
  {
    id: 'esic-001',
    protocolo: 'SIC-2026-00085',
    codigoAcesso: 'SIC-7712',
    assunto: 'Cópia integral do Contrato nº 048/2026 e aditivos de fornecimento de pneus',
    descricao: 'Solicito a íntegra digitalizada do Contrato de Fornecimento nº 048/2026 celebrado com a Auto Peças Tocantins, incluindo seus eventuais termos aditivos e empenhos de liquidação.',
    dataAbertura: '02/03/2026',
    prazoResposta: '22/03/2026',
    prorrogado: false,
    status: 'Respondido',
    formaRecebimento: 'sistema',
    orgaoDestino: 'Secretaria Municipal de Administração e Finanças',
    solicitante: {
      nome: 'Carlos Fernando Mendes',
      email: 'carlos.mendes@advocacia.com.br',
      telefone: '(63) 98112-9900',
      cpfCnpj: '234.***.***-55',
      cidade: 'São Miguel do Tocantins'
    },
    resposta: {
      data: '11/03/2026',
      responsavel: 'Dra. Mariana Duarte de Alencar',
      cargo: 'Gestora do e-SIC Municipal',
      parecer: 'Acesso Concedido',
      texto: 'Prezado solicitante, informamos que o Contrato nº 048/2026 e seus termos correlatos foram disponibilizados para download direto no Portal da Transparência, na aba Contratos, bem como encaminhamos a cópia digitalizada autenticada em anexo ao presente expediente.',
      fundamentacaoLegal: 'Art. 7º, inciso VI, da Lei Federal nº 12.527/2011.',
    },
    recursos: [],
    historico: [
      {
        data: '02/03/2026',
        hora: '10:00',
        orgao: 'SIC Central',
        acao: 'Autuação de Pedido de Informação',
        descricao: 'Pedido recebido com sucesso e gerado número de protocolo.',
        status: 'Registrado'
      },
      {
        data: '03/03/2026',
        hora: '08:30',
        orgao: 'Secretaria de Finanças',
        acao: 'Tramitação Interna',
        descricao: 'Encaminhado ao setor de Contratos para localização e compilação das peças processuais.',
        status: 'Em Tramitação'
      },
      {
        data: '11/03/2026',
        hora: '14:50',
        orgao: 'SIC Central',
        acao: 'Resposta Conclusiva',
        descricao: 'Resposta redigida e documento integral anexado ao portal.',
        status: 'Respondido'
      }
    ]
  },
  {
    id: 'esic-002',
    protocolo: 'SIC-2026-00102',
    codigoAcesso: 'SIC-4421',
    assunto: 'Quadro demonstrativo da folha salarial dos servidores da saúde por cargo',
    descricao: 'Requeiro o demonstrativo analítico de servidores lotados na Secretaria Municipal de Saúde, discriminando cargo efetivo, comissionado, vencimento base e gratificações do mês de janeiro/2026.',
    dataAbertura: '12/03/2026',
    prazoResposta: '01/04/2026',
    prorrogado: false,
    status: 'Em Tramitação',
    formaRecebimento: 'sistema',
    orgaoDestino: 'Secretaria Municipal de Saúde / Recursos Humanos',
    solicitante: {
      nome: 'Amanda Barreto de Oliveira',
      email: 'amanda.barreto@observatorio.org.br',
      telefone: '(63) 99245-1020',
      cpfCnpj: '581.***.***-42',
      cidade: 'Palmas'
    },
    recursos: [],
    historico: [
      {
        data: '12/03/2026',
        hora: '16:15',
        orgao: 'SIC Central',
        acao: 'Protocolo Eletrônico',
        descricao: 'Solicitação autuada no sistema de transparência ativa e passiva.',
        status: 'Registrado'
      },
      {
        data: '13/03/2026',
        hora: '09:00',
        orgao: 'Departamento de Recursos Humanos',
        acao: 'Compilação de Dados',
        descricao: 'Em fase de extração no sistema de folha e conferência de proteção a dados sensíveis (LGPD).',
        status: 'Em Tramitação'
      }
    ]
  },
  {
    id: 'esic-003',
    protocolo: 'SIC-2026-00042',
    codigoAcesso: 'SIC-9930',
    assunto: 'Laudo de vistoria estrutural da Ponte do Córrego da Gameleira',
    descricao: 'Solicitação de cópia do relatório técnico de engenharia referente às condições de tráfego e suporte de peso da ponte de madeira do Córrego da Gameleira.',
    dataAbertura: '15/01/2026',
    prazoResposta: '04/02/2026',
    prorrogado: true,
    motivoProrrogacao: 'Complexidade técnica e necessidade de elaboração de planta complementar in loco.',
    status: 'Concluído',
    formaRecebimento: 'email',
    orgaoDestino: 'Secretaria Municipal de Infraestrutura e Obras',
    solicitante: {
      nome: 'Geraldo Antunes Viana',
      email: 'antunes.viana@agroto.com.br',
      telefone: '(63) 98432-8877',
      cpfCnpj: '098.***.***-11',
      cidade: 'São Miguel do Tocantins'
    },
    resposta: {
      data: '08/02/2026',
      responsavel: 'Eng. Roberto Soares',
      cargo: 'Secretário Municipal de Obras',
      parecer: 'Acesso Concedido',
      texto: 'O laudo de vistoria técnica nº 004/2026 foi concluído pela equipe de engenharia civil do município, apontando necessidade de reforço estrutural em vigas de sustentação, com processo licitatório de reforma em andamento.',
      fundamentacaoLegal: 'Art. 10 da Lei 12.527/2011',
    },
    recursos: [],
    historico: [
      {
        data: '15/01/2026',
        hora: '11:00',
        orgao: 'SIC Central',
        acao: 'Recebimento de Solicitação',
        descricao: 'Pedido formulado via plataforma e-SIC.',
        status: 'Registrado'
      },
      {
        data: '02/02/2026',
        hora: '17:00',
        orgao: 'SIC Central',
        acao: 'Prorrogação de Prazo',
        descricao: 'Prazo prorrogado por 10 dias devido à vistoria técnica agendada na zona rural.',
        status: 'Em Tramitação'
      },
      {
        data: '08/02/2026',
        hora: '10:30',
        orgao: 'Secretaria de Obras',
        acao: 'Fornecimento de Informação',
        descricao: 'Laudo emitido e disponibilizado ao cidadão.',
        status: 'Concluído'
      }
    ]
  }
];

export const ESTATISTICAS_ESIC_MOCK: EstatisticasEsic = {
  ano: 2026,
  totalPedidos: 164,
  atendidos: 157,
  indeferidos: 4,
  emTramitacao: 3,
  recursosInterpostos: 2,
  tempoMedioDias: 6.2,
  indiceAtendimento: 97.5,
  porTema: [
    { tema: 'Contratos e Compras Públicas', quantidade: 58 },
    { tema: 'Obras e Serviços Urbanos', quantidade: 42 },
    { tema: 'Pessoal e Remuneração', quantidade: 31 },
    { tema: 'Saúde e Medicamentos', quantidade: 19 },
    { tema: 'Orçamento e Finanças', quantidade: 14 },
  ]
};

export const INFORMACOES_CLASSIFICADAS_MOCK: InformacaoClassificadaDTO[] = [
  {
    id: 'class-01',
    assunto: 'Plano de Segurança de Infraestruturas Críticas e Telecomunicações da Sede Administrativa',
    grauSigilo: 'Reservado',
    dataProducao: '14/03/2024',
    dataClassificacao: '15/03/2024',
    prazo: '5 anos (Vigência até 15/03/2029)',
    dispositivoLegal: 'Art. 23, inciso VIII e Art. 24, § 1º, inciso III da Lei Federal nº 12.527/2011',
    orgaoResponsavel: 'Gabinete do Prefeito / Tecnologia da Informação',
    categoria: 'Segurança Orgânica e Tecnologia'
  },
  {
    id: 'class-02',
    assunto: 'Auditoria de Vulnerabilidade e Senhas Mestras dos Servidores de Arrecadação Tributária',
    grauSigilo: 'Reservado',
    dataProducao: '20/08/2024',
    dataClassificacao: '22/08/2024',
    prazo: '5 anos (Vigência até 22/08/2029)',
    dispositivoLegal: 'Art. 23, inciso VI da Lei Federal nº 12.527/2011 e art. 198 do Código Tributário Nacional',
    orgaoResponsavel: 'Controladoria Geral do Município',
    categoria: 'Sigilo Fiscal e Tecnológico'
  }
];

export const INFORMACOES_DESCLASSIFICADAS_MOCK: InformacaoDesclassificadaDTO[] = [
  {
    id: 'desclass-01',
    assunto: 'Termo de Referência Técnico para Aquisição de Equipamentos de Radiocomunicação Policial',
    grauSigiloAnterior: 'Reservado',
    dataProducao: '10/02/2021',
    dataDesclassificacao: '10/02/2026',
    motivo: 'Decurso do prazo legal de 5 (cinco) anos de classificação previsto no art. 24 da Lei 12.527/2011.',
    dispositivoLegal: 'Art. 24, § 1º, inciso III c/c Art. 29 da Lei Federal nº 12.527/2011',
    orgaoResponsavel: 'Secretaria Municipal de Segurança e Trânsito'
  },
  {
    id: 'desclass-02',
    assunto: 'Estudo de Viabilidade para Desapropriação de Terrenos para Ampliação do Distrito Industrial',
    grauSigiloAnterior: 'Reservado',
    dataProducao: '05/01/2023',
    dataDesclassificacao: '15/01/2025',
    motivo: 'Conclusão e publicação formal dos Decretos de Desapropriação por Utilidade Pública, cessando a necessidade de sigilo concorrencial/especulativo.',
    dispositivoLegal: 'Art. 24 da Lei 12.527/2011 e Termo de Desclassificação nº 001/2025',
    orgaoResponsavel: 'Secretaria Municipal de Planejamento e Habitação'
  }
];
