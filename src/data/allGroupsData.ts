export interface GroupDocument {
  id: string;
  groupId: string;
  tab: string; // e.g. 'CONTRATOS', 'EMPENHOS', 'DECRETOS', etc.
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

export const ALL_GROUPS_DOCUMENTS: GroupDocument[] = [
  // ==========================================
  // 1. CONTRATOS (Roxo: #7e22ce)
  // ==========================================
  {
    id: 'ct-042-2026',
    groupId: 'contratos',
    tab: 'CONTRATOS',
    numero: '042/2026',
    numeroSimples: '42',
    ano: '2026',
    secao: 'Contratos Administrativos',
    assinatura: '12/08/2026',
    ementa: 'CONTRATAÇÃO DE EMPRESA ESPECIALIZADA PARA FORNECIMENTO DE MEDICAMENTOS E INSUMOS HOSPITALARES PARA A FARMÁCIA MUNICIPAL E UNIDADES BÁSICAS DE SAÚDE.',
    anexoNome: 'Contrato_042_2026_Medicamentos.pdf',
    anexoTamanho: '1.4 MB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito',
    textoIntegral: `ESTADO DO TOCANTINS\nPREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS\nCONTRATO ADMINISTRATIVO Nº 042/2026\n\nCONTRATANTE: Município de São Miguel do Tocantins - TO, através do Fundo Municipal de Saúde.\nCONTRATADA: Distribuidora Tocantinense de Medicamentos Ltda.\n\nCLÁUSULA PRIMEIRA - DO OBJETO: O presente contrato tem por objeto o fornecimento parcelado de medicamentos básicos, injetáveis e insumos para abastecimento da Farmácia Central Municipal e postos de saúde da família.\n\nCLÁUSULA SEGUNDA - DO VALOR: O valor global deste instrumento é de R$ 345.280,00 (trezentos e quarenta e cinco mil, duzentos e oitenta reais).\n\nCLÁUSULA TERCEIRA - DA VIGÊNCIA: Vigência de 12 (doze) meses contados a partir da data de publicação no Diário Oficial.`
  },
  {
    id: 'ct-041-2026',
    groupId: 'contratos',
    tab: 'CONTRATOS',
    numero: '041/2026',
    numeroSimples: '41',
    ano: '2026',
    secao: 'Obras e Engenharia',
    assinatura: '28/07/2026',
    ementa: 'PRESTAÇÃO DE SERVIÇOS DE ENGENHARIA PARA REFORMA GERAL, PINTURA E ADEQUAÇÃO DA UNIDADE BÁSICA DE SAÚDE DR. ANTÔNIO CARLOS.',
    anexoNome: 'Contrato_041_2026_Reforma_UBS.pdf',
    anexoTamanho: '2.3 MB',
    signatario: 'Secretário Municipal de Infraestrutura',
    cargoSignatario: 'Secretaria de Infraestrutura',
    textoIntegral: `CONTRATO Nº 041/2026 - REFORMA UBS\n\nOBJETO: Serviços de engenharia civil para execução de obras de ampliação e reforma do posto de atendimento de saúde central de São Miguel do Tocantins.\nVALOR: R$ 189.600,00\nPRAZO: 180 dias de execução.`
  },
  {
    id: 'ct-040-2026',
    groupId: 'contratos',
    tab: 'CONTRATOS',
    numero: '040/2026',
    numeroSimples: '40',
    ano: '2026',
    secao: 'Educação',
    assinatura: '15/06/2026',
    ementa: 'AQUISIÇÃO PARCELADA DE GÊNEROS ALIMENTÍCIOS PERECÍVEIS E NÃO PERECÍVEIS DESTINADOS À ALIMENTAÇÃO ESCOLAR DO ANO LETIVO.',
    anexoNome: 'Contrato_040_2026_Merenda_Escolar.pdf',
    anexoTamanho: '950 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'ct-fisc-01-2026',
    groupId: 'contratos',
    tab: 'FISCAIS DE CONTRATOS',
    numero: 'PORT. 018/2026',
    numeroSimples: '18',
    ano: '2026',
    secao: 'Fiscalização de Contratos',
    assinatura: '14/08/2026',
    ementa: 'DESIGNA SERVIDORES PÚBLICOS MUNICIPAIS COMO FISCAL TITULAR E SUPLENTE DO CONTRATO ADMINISTRATIVO Nº 042/2026.',
    anexoNome: 'Designacao_Fiscais_Contrato_042.pdf',
    anexoTamanho: '160 KB',
    signatario: 'Secretário Municipal de Administração',
    cargoSignatario: 'Secretaria de Administração'
  },
  {
    id: 'ct-ordem-09-2026',
    groupId: 'contratos',
    tab: 'ORDEM CRONOLÓGICA',
    numero: 'LISTA 09/2026',
    numeroSimples: '9',
    ano: '2026',
    secao: 'Tesouraria Municipal',
    assinatura: '01/09/2026',
    ementa: 'RELAÇÃO DA ORDEM CRONOLÓGICA DE EXIGIBILIDADE DOS PAGAMENTOS A FORNECEDORES E CONTRATADOS - SETEMBRO/2026.',
    anexoNome: 'Ordem_Cronologica_Pagamentos_Setembro.pdf',
    anexoTamanho: '410 KB',
    signatario: 'Secretário Municipal de Finanças',
    cargoSignatario: 'Secretaria de Finanças'
  },
  {
    id: 'ct-ant-088-2024',
    groupId: 'contratos',
    tab: 'CONTRATOS ANTERIORES',
    numero: '088/2024',
    numeroSimples: '88',
    ano: '2024',
    secao: 'Contratos Encerrados',
    assinatura: '10/03/2024',
    ementa: 'TERMO DE ENCERRAMENTO E LIQUIDAÇÃO FINAL DO CONTRATO DE LOCAÇÃO DE CAMINHÕES BASCULANTES PARA A ZONA RURAL.',
    anexoNome: 'Termo_Encerramento_Contrato_088_2024.pdf',
    anexoTamanho: '380 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },

  // ==========================================
  // 2. DESPESAS (Vermelho: #dc2626)
  // ==========================================
  {
    id: 'dp-emp-1204-2026',
    groupId: 'despesas',
    tab: 'DESPESAS',
    numero: '1204/2026',
    numeroSimples: '1204',
    ano: '2026',
    secao: 'Fundo Municipal de Saúde',
    assinatura: '15/09/2026',
    ementa: 'EMPENHO REFERENTE À AQUISIÇÃO DE COMBUSTÍVEL PARA VEÍCULOS E AMBULÂNCIAS DA SECRETARIA MUNICIPAL DE SAÚDE.',
    anexoNome: 'Nota_Empenho_1204_2026.pdf',
    anexoTamanho: '280 KB',
    signatario: 'Gestor do Fundo Municipal de Saúde',
    cargoSignatario: 'FMS - São Miguel do Tocantins',
    textoIntegral: `PREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS - TO\nNOTA DE EMPENHO Nº 1204/2026\n\nÓRGÃO: 02 - Poder Executivo\nUNIDADE: 02.04 - Fundo Municipal de Saúde\nFUNÇÃO: 10 - Saúde\nSUBFUNÇÃO: 301 - Atenção Básica\nPROGRAMA: 0014 - Saúde com Dignidade para Todos\nFONTE: 1500 - Recursos Ordinários do SUS\nCREDOR: Auto Posto São Miguel Ltda.\nVALOR EMPENHADO: R$ 28.450,00`
  },
  {
    id: 'dp-emp-1203-2026',
    groupId: 'despesas',
    tab: 'EMPENHOS',
    numero: '1203/2026',
    numeroSimples: '1203',
    ano: '2026',
    secao: 'Secretaria de Educação',
    assinatura: '10/09/2026',
    ementa: 'EMPENHO DESTINADO AO PAGAMENTO DE FORNECIMENTO DE MATERIAIS PEDAGÓGICOS E DIDÁTICOS PARA AS ESCOLAS MUNICIPAIS.',
    anexoNome: 'Nota_Empenho_1203_2026.pdf',
    anexoTamanho: '290 KB',
    signatario: 'Secretária Municipal de Educação',
    cargoSignatario: 'Secretaria de Educação'
  },
  {
    id: 'dp-liq-842-2026',
    groupId: 'despesas',
    tab: 'LIQUIDAÇÕES',
    numero: 'LIQ. 842/2026',
    numeroSimples: '842',
    ano: '2026',
    secao: 'Contabilidade Central',
    assinatura: '18/09/2026',
    ementa: 'TERMO DE LIQUIDAÇÃO DE DESPESA ATESTANDO O RECEBIMENTO DEFINITIVO DE MEDICAMENTOS REFERENTES À NOTA FISCAL Nº 8492.',
    anexoNome: 'Liquidacao_Despesa_842_2026.pdf',
    anexoTamanho: '310 KB',
    signatario: 'Contador Geral do Município',
    cargoSignatario: 'Setor de Contabilidade'
  },
  {
    id: 'dp-pag-610-2026',
    groupId: 'despesas',
    tab: 'PAGAMENTOS',
    numero: 'OB 610/2026',
    numeroSimples: '610',
    ano: '2026',
    secao: 'Tesouraria',
    assinatura: '20/09/2026',
    ementa: 'ORDEM BANCÁRIA Nº 2026OB00610 EFETIVANDO A TRANSFERÊNCIA DE RECURSOS PARA CONTA DE FORNECEDOR CONTRATADO.',
    anexoNome: 'Comprovante_Ordem_Bancaria_610.pdf',
    anexoTamanho: '190 KB',
    signatario: 'Tesoureiro Municipal',
    cargoSignatario: 'Secretaria de Finanças'
  },

  // ==========================================
  // 3. RECEITAS (Verde Esmeralda: #059669)
  // ==========================================
  {
    id: 'rec-09-2026',
    groupId: 'receitas',
    tab: 'RECEITAS',
    numero: 'REC. 09/2026',
    numeroSimples: '9',
    ano: '2026',
    secao: 'Arrecadação Tributária',
    assinatura: '15/09/2026',
    ementa: 'DEMONSTRATIVO MENSAL DE ARRECADAÇÃO DE TRIBUTOS MUNICIPAIS (IPTU, ISSQN, ITBI E TAXAS) - EXERCÍCIO 2026.',
    anexoNome: 'Arrecadacao_Tributaria_Setembro.pdf',
    anexoTamanho: '520 KB',
    signatario: 'Secretário Municipal de Finanças',
    cargoSignatario: 'Secretaria de Finanças',
    textoIntegral: `RELATÓRIO MENSAL DE RECEITAS PRÓPRIAS\nMUNICÍPIO DE SÃO MIGUEL DO TOCANTINS - TO\n\nCOMPETÊNCIA: Setembro/2026\nIPTU: R$ 184.230,00\nISSQN: R$ 312.450,00\nITBI: R$ 42.100,00\nTaxas Municipais: R$ 68.910,00\nTotal de Receitas Próprias: R$ 607.690,00`
  },
  {
    id: 'rec-div-01-2026',
    groupId: 'receitas',
    tab: 'DÍVIDA ATIVA',
    numero: 'REL. 01/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Dívida Ativa e Execuções Fiscais',
    assinatura: '01/08/2026',
    ementa: 'RELATÓRIO GERAL DE CRÉDITOS TRIBUTÁRIOS E NÃO TRIBUTÁRIOS INSCRITOS EM DÍVIDA ATIVA DO MUNICÍPIO.',
    anexoNome: 'Relatorio_Divida_Ativa_2026.pdf',
    anexoTamanho: '640 KB',
    signatario: 'Procurador-Geral do Município',
    cargoSignatario: 'Procuradoria Geral'
  },
  {
    id: 'rec-prev-2026',
    groupId: 'receitas',
    tab: 'PREVISÃO ORÇAMENTÁRIA',
    numero: 'PREV. 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Planejamento Orçamentário',
    assinatura: '02/01/2026',
    ementa: 'QUADRO ESTIMATIVO DA RECEITA PREVISTA PARA O EXERCÍCIO FINANCEIRO DE 2026 CONSTANTE DA LEI ORÇAMENTÁRIA ANUAL.',
    anexoNome: 'Previsao_Receita_LOA_2026.pdf',
    anexoTamanho: '880 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },

  // ==========================================
  // 4. LICITAÇÕES (Azul Celeste: #0284c7)
  // ==========================================
  {
    id: 'lic-pe-014-2026',
    groupId: 'licitacoes',
    tab: 'LICITAÇÕES',
    numero: 'PE 014/2026',
    numeroSimples: '14',
    ano: '2026',
    secao: 'Comissão de Licitações (CPL)',
    assinatura: '04/09/2026',
    ementa: 'PREGÃO ELETRÔNICO PARA REGISTRO DE PREÇOS OBJETIVANDO A AQUISIÇÃO DE COMBUSTÍVEIS E ÓLEOS LUBRIFICANTES PARA A FROTA MUNICIPAL.',
    anexoNome: 'Edital_Pregao_Eletronico_014_2026.pdf',
    anexoTamanho: '2.8 MB',
    signatario: 'Pregoeiro Oficial do Município',
    cargoSignatario: 'CPL - São Miguel do Tocantins',
    textoIntegral: `EDITAL DE PREGÃO ELETRÔNICO Nº 014/2026 - REGISTRO DE PREÇOS\n\nOBJETO: Registro de Preços para futura e eventual contratação de empresa visando o fornecimento continuado de gasolina comum, óleo diesel S-10 e etanol para veículos das Secretarias Municipais de São Miguel do Tocantins - TO.\nDATA DA SESSÃO PÚBLICA: 25 de Setembro de 2026 às 09:00 horas.\nLOCAL: Portal de Compras Públicas.`
  },
  {
    id: 'lic-disp-028-2026',
    groupId: 'licitacoes',
    tab: 'DISPENSAS E INEXIGIBILIDADES',
    numero: 'DISP. 028/2026',
    numeroSimples: '28',
    ano: '2026',
    secao: 'Contratações Diretas',
    assinatura: '22/08/2026',
    ementa: 'AVISO DE DISPENSA ELETRÔNICA DE LICITAÇÃO COM BASE NO ART. 75, INCISO II DA LEI Nº 14.133/2021 PARA MANUTENÇÃO PREVENTIVA.',
    anexoNome: 'Aviso_Dispensa_028_2026.pdf',
    anexoTamanho: '450 KB',
    signatario: 'Presidente da Comissão de Contratação',
    cargoSignatario: 'Setor de Licitações'
  },
  {
    id: 'lic-pca-2026',
    groupId: 'licitacoes',
    tab: 'PLANO ANUAL (PCA)',
    numero: 'PCA 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Governança das Contratações',
    assinatura: '15/01/2026',
    ementa: 'PLANO DE CONTRATAÇÕES ANUAL (PCA) CONSOLIDADO DO MUNICÍPIO DE SÃO MIGUEL DO TOCANTINS PARA O ANO DE 2026.',
    anexoNome: 'Plano_Contratacoes_Anual_PCA_2026.pdf',
    anexoTamanho: '1.2 MB',
    signatario: 'Secretário Municipal de Administração',
    cargoSignatario: 'Secretaria de Administração'
  },
  {
    id: 'lic-sanc-002-2026',
    groupId: 'licitacoes',
    tab: 'SANÇÕES ADMINISTRATIVAS',
    numero: 'SANC. 002/2026',
    numeroSimples: '2',
    ano: '2026',
    secao: 'Controle Disciplinar de Licitantes',
    assinatura: '05/06/2026',
    ementa: 'APLICAÇÃO DE PENALIDADE DE IMPEDIMENTO DE LICITAR E CONTRATAR COM A ADMINISTRAÇÃO MUNICIPAL POR DESCUMPRIMENTO CONTRATUAL.',
    anexoNome: 'Termo_Aplicacao_Sancao_002.pdf',
    anexoTamanho: '320 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },

  // ==========================================
  // 5. RECURSOS HUMANOS (Laranja: #ea580c)
  // ==========================================
  {
    id: 'rh-fp-08-2026',
    groupId: 'recursos-humanos',
    tab: 'FOLHA DE PAGAMENTO',
    numero: 'FP 08/2026',
    numeroSimples: '8',
    ano: '2026',
    secao: 'Departamento de Gestão de Pessoas',
    assinatura: '30/08/2026',
    ementa: 'FOLHA DE PAGAMENTO NOMINAL CONSOLIDADA DOS SERVIDORES EFETIVOS, COMISSIONADOS E CONTRATADOS - AGOSTO/2026.',
    anexoNome: 'Folha_Pagamento_Nominal_Agosto_2026.pdf',
    anexoTamanho: '1.9 MB',
    signatario: 'Diretor do Departamento de Recursos Humanos',
    cargoSignatario: 'Secretaria de Administração',
    textoIntegral: `DEMONSTRATIVO GERAL DE FOLHA DE PAGAMENTO NOMINAL\nÓRGÃO: PREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS\nCOMPETÊNCIA: AGOSTO/2026\n\nTotal de Servidores Efetivos: 342\nTotal de Servidores Comissionados: 48\nTotal de Contratos Temporários: 76\nTotal Bruto da Folha: R$ 1.482.904,15\nTotal de Encargos Previdenciários: R$ 326.115,80`
  },
  {
    id: 'rh-pr-2026',
    groupId: 'recursos-humanos',
    tab: 'PADRÃO REMUNERATÓRIO',
    numero: 'PR 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Plano de Cargos e Vencimentos',
    assinatura: '10/01/2026',
    ementa: 'TABELA OFICIAL DE PADRÃO REMUNERATÓRIO, CARGOS, NÍVEIS DE VENCIMENTO E GRATIFICAÇÕES VIGENTES NO MUNICÍPIO.',
    anexoNome: 'Tabela_Salarios_Plano_Carreira.pdf',
    anexoTamanho: '750 KB',
    signatario: 'Secretário Municipal de Administração',
    cargoSignatario: 'Secretaria de Administração'
  },
  {
    id: 'rh-estag-01-2026',
    groupId: 'recursos-humanos',
    tab: 'ESTAGIÁRIOS',
    numero: 'REL. 01/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Programa Municipal de Estágio',
    assinatura: '15/07/2026',
    ementa: 'RELAÇÃO NOMINAL DOS ESTAGIÁRIOS VINCULADOS AO TERMO DE COOPERAÇÃO COM INSTITUIÇÕES DE ENSINO SUPERIOR E TÉCNICO.',
    anexoNome: 'Lista_Estagiarios_Ativos_2026.pdf',
    anexoTamanho: '210 KB',
    signatario: 'Coordenador do Programa de Estágio',
    cargoSignatario: 'Secretaria de Educação e Administração'
  },
  {
    id: 'rh-conc-001-2024',
    groupId: 'recursos-humanos',
    tab: 'CONCURSOS',
    numero: 'ED. 001/2024',
    numeroSimples: '1',
    ano: '2024',
    secao: 'Comissão de Concursos Públicos',
    assinatura: '18/11/2024',
    ementa: 'HOMOLOGAÇÃO DO RESULTADO FINAL DO CONCURSO PÚBLICO MUNICIPAL PARA PROVIMENTO DE CARGOS DO QUADRO PERMANENTE.',
    anexoNome: 'Homologacao_Final_Concurso_Publico.pdf',
    anexoTamanho: '2.5 MB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },

  // ==========================================
  // 6. INFORMAÇÕES INSTITUCIONAIS (Azul: #1d4ed8)
  // ==========================================
  {
    id: 'inst-org-01-2026',
    groupId: 'institucional',
    tab: 'ESTRUTURA ORGANIZACIONAL',
    numero: 'DOC. 001/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Gabinete do Prefeito',
    assinatura: '05/01/2026',
    ementa: 'ORGANOGRAMA OFICIAL, COMPETÊNCIAS DAS SECRETARIAS MUNICIPAIS E DADOS DE CONTATO DOS TITULARES DAS PASTAS.',
    anexoNome: 'Estrutura_Organizacional_Prefeitura.pdf',
    anexoTamanho: '850 KB',
    signatario: 'Chefe de Gabinete',
    cargoSignatario: 'Gabinete do Prefeito',
    textoIntegral: `ESTADO DO TOCANTINS\nPREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS\nESTRUTURA ADMINISTRATIVA OFICIAL\n\n1. GABINETE DO PREFEITO\n2. SECRETARIA MUNICIPAL DE ADMINISTRAÇÃO E FINANÇAS\n3. SECRETARIA MUNICIPAL DE EDUCAÇÃO E CULTURA\n4. SECRETARIA MUNICIPAL DE SAÚDE\n5. SECRETARIA MUNICIPAL DE INFRAESTRUTURA E OBRAS\n6. SECRETARIA MUNICIPAL DE MEIO AMBIENTE E AGRICULTURA\n7. SECRETARIA MUNICIPAL DE ASSISTÊNCIA SOCIAL E DA MULHER`
  },
  {
    id: 'inst-faq-2026',
    groupId: 'institucional',
    tab: 'PERGUNTAS FREQUENTES',
    numero: 'GUIA 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Ouvidoria e SIC',
    assinatura: '10/01/2026',
    ementa: 'GUIA DE PERGUNTAS E RESPOSTAS FREQUENTES SOBRE O ACESSO À INFORMAÇÃO PÚBLICA, TRIBUTOS E SERVIÇOS MUNICIPAIS.',
    anexoNome: 'Guia_Perguntas_Frequentes_FAQ.pdf',
    anexoTamanho: '480 KB',
    signatario: 'Ouvidor Municipal',
    cargoSignatario: 'Ouvidoria Geral'
  },
  {
    id: 'inst-radar-2026',
    groupId: 'institucional',
    tab: 'RADAR DA TRANSPARÊNCIA',
    numero: 'REL. ATRICON 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Controle Interno Municipal',
    assinatura: '15/08/2026',
    ementa: 'CERTIFICADO DE CONFORMIDADE E NÍVEL DE TRANSPARÊNCIA PÚBLICA CONFORME DIRETRIZES DA ATRICON E TCE-TO.',
    anexoNome: 'Radar_Transparencia_Atricon_2026.pdf',
    anexoTamanho: '1.1 MB',
    signatario: 'Controlador Geral do Município',
    cargoSignatario: 'Controladoria Interna'
  },

  // ==========================================
  // 7. OUVIDORIA (Teal: #0d9488)
  // ==========================================
  {
    id: 'ouv-sol-01-2026',
    groupId: 'ouvidoria',
    tab: 'SOLICITAÇÃO',
    numero: 'OUV. 045/2026',
    numeroSimples: '45',
    ano: '2026',
    secao: 'Atendimento ao Cidadão',
    assinatura: '12/09/2026',
    ementa: 'FORMULÁRIO E DIRETRIZES PARA ENCAMINHAMENTO DE SOLICITAÇÕES DE SERVIÇOS PÚBLICOS MUNICIPAIS VIA OUVIDORIA.',
    anexoNome: 'Manual_Solicitacao_Ouvidoria.pdf',
    anexoTamanho: '320 KB',
    signatario: 'Ouvidor Geral do Município',
    cargoSignatario: 'Ouvidoria Municipal'
  },
  {
    id: 'ouv-elog-01-2026',
    groupId: 'ouvidoria',
    tab: 'ELOGIOS',
    numero: 'REL. 01/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Atendimento ao Cidadão',
    assinatura: '30/08/2026',
    ementa: 'RELATÓRIO CONSOLIDADO DE ELOGIOS E RECONHECIMENTOS DE MÉRITO A SERVIDORES E EQUIPES DE SAÚDE MUNICIPAL.',
    anexoNome: 'Consolidado_Elogios_Recebidos_2026.pdf',
    anexoTamanho: '270 KB',
    signatario: 'Ouvidor Geral do Município',
    cargoSignatario: 'Ouvidoria Municipal'
  },
  {
    id: 'ouv-sug-01-2026',
    groupId: 'ouvidoria',
    tab: 'SUGESTÕES',
    numero: 'REL. 02/2026',
    numeroSimples: '2',
    ano: '2026',
    secao: 'Participação Social',
    assinatura: '18/08/2026',
    ementa: 'PROPOSTAS E SUGESTÕES DE MELHORIA DO TRANSPORTE ESCOLAR E LIMPEZA URBANA RECEBIDAS PELO CANAL DIRETO.',
    anexoNome: 'Sugestoes_Cidadao_Aprimoramento_2026.pdf',
    anexoTamanho: '360 KB',
    signatario: 'Ouvidor Geral do Município',
    cargoSignatario: 'Ouvidoria Municipal'
  },
  {
    id: 'ouv-rec-01-2026',
    groupId: 'ouvidoria',
    tab: 'RECLAMAÇÕES',
    numero: 'REL. 03/2026',
    numeroSimples: '3',
    ano: '2026',
    secao: 'Atendimento ao Cidadão',
    assinatura: '05/09/2026',
    ementa: 'PAINEL DE MONITORAMENTO E ÍNDICE DE RESOLUTIVIDADE DE RECLAMAÇÕES REGISTRADAS JUNTO À ADMINISTRAÇÃO PÚBLICA.',
    anexoNome: 'Painel_Resolutividade_Reclamacoes.pdf',
    anexoTamanho: '410 KB',
    signatario: 'Ouvidor Geral do Município',
    cargoSignatario: 'Ouvidoria Municipal'
  },
  {
    id: 'ouv-den-01-2026',
    groupId: 'ouvidoria',
    tab: 'DENÚNCIAS',
    numero: 'PORT. 008/2026',
    numeroSimples: '8',
    ano: '2026',
    secao: 'Proteção ao Denunciante',
    assinatura: '10/02/2026',
    ementa: 'REGULAMENTA O PROCEDIMENTO DE RECEBIMENTO, TRATAMENTO E PROTEÇÃO DA IDENTIDADE DE DENUNCIANTES NO MUNICÍPIO.',
    anexoNome: 'Regulamentacao_Protecao_Denunciantes.pdf',
    anexoTamanho: '490 KB',
    signatario: 'Controlador Geral do Município',
    cargoSignatario: 'Controladoria Interna'
  },

  // ==========================================
  // 8. SAÚDE (Rosa Rubi: #e11d48)
  // ==========================================
  {
    id: 'sau-plano-2026',
    groupId: 'saude',
    tab: 'PLANO MUNICIPAL DE SAÚDE',
    numero: 'PMS 2026-2029',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Fundo Municipal de Saúde',
    assinatura: '02/01/2026',
    ementa: 'PLANO MUNICIPAL DE SAÚDE (PMS) CONTENDO DIRETRIZES, METAS E INDICADORES EPIDEMIOLÓGICOS E ASSISTENCIAIS.',
    anexoNome: 'Plano_Municipal_Saude_2026_2029.pdf',
    anexoTamanho: '3.6 MB',
    signatario: 'Secretário Municipal de Saúde',
    cargoSignatario: 'Secretaria de Saúde',
    textoIntegral: `MUNICÍPIO DE SÃO MIGUEL DO TOCANTINS - TO\nPLANO MUNICIPAL DE SAÚDE\n\nEIXOS PRINCIPAIS:\n1. Fortalecimento da Atenção Primária e Saúde da Família (ESF).\n2. Ampliação da cobertura vacinal infantil e de idosos.\n3. Garantia do fornecimento regular de medicamentos na Farmácia Básica.\n4. Atendimento médico itinerante para comunidades ribeirinhas e rurais.`
  },
  {
    id: 'sau-med-sus-2026',
    groupId: 'saude',
    tab: 'MEDICAMENTOS SUS',
    numero: 'REMUME 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Assistência Farmacêutica',
    assinatura: '15/02/2026',
    ementa: 'RELAÇÃO MUNICIPAL DE MEDICAMENTOS ESSENCIAIS (REMUME) DISPONÍVEIS GRATUITAMENTE NAS FARMÁCIAS PÚBLICAS DO SUS.',
    anexoNome: 'Relacao_Medicamentos_REMUME_SUS.pdf',
    anexoTamanho: '780 KB',
    signatario: 'Farmacêutico Responsável Técnico',
    cargoSignatario: 'Assistência Farmacêutica'
  },
  {
    id: 'sau-plant-09-2026',
    groupId: 'saude',
    tab: 'ESCALAS DE PLANTÃO',
    numero: 'ESC. 09/2026',
    numeroSimples: '9',
    ano: '2026',
    secao: 'Atenção Básica e Urgência',
    assinatura: '01/09/2026',
    ementa: 'ESCALA MENSAL DE PLANTÃO DE MÉDICOS, ENFERMEIROS, TÉCNICOS E CONDUTORES DE AMBULÂNCIA - SETEMBRO/2026.',
    anexoNome: 'Escala_Plantao_Medicos_Enfermeiros.pdf',
    anexoTamanho: '450 KB',
    signatario: 'Coordenador de Atenção Básica',
    cargoSignatario: 'Secretaria de Saúde'
  },
  {
    id: 'sau-cons-03-2026',
    groupId: 'saude',
    tab: 'CONSELHO DE SAÚDE',
    numero: 'ATA 003/2026',
    numeroSimples: '3',
    ano: '2026',
    secao: 'Conselho Municipal de Saúde',
    assinatura: '25/08/2026',
    ementa: 'ATA DA REUNIÃO ORDINÁRIA COM APROVAÇÃO DO RELATÓRIO DO QUADRIMESTRE ANTERIOR E FISCALIZAÇÃO DOS RECURSOS DO SUS.',
    anexoNome: 'Ata_Reuniao_Conselho_Municipal_Saude.pdf',
    anexoTamanho: '390 KB',
    signatario: 'Presidente do Conselho Municipal de Saúde',
    cargoSignatario: 'Conselho Municipal de Saúde'
  },

  // ==========================================
  // 9. OBRAS (Âmbar: #d97706)
  // ==========================================
  {
    id: 'obr-acomp-01-2026',
    groupId: 'obras',
    tab: 'ACOMPANHAMENTO DE OBRAS',
    numero: 'OBRA 004/2026',
    numeroSimples: '4',
    ano: '2026',
    secao: 'Engenharia e Fiscalização de Obras',
    assinatura: '10/09/2026',
    ementa: 'RELATÓRIO MENSAL DE EVOLUÇÃO FÍSICO-FINANCEIRA DA OBRA DE PAVIMENTAÇÃO EM BLOQUETES DE RUAS DO SETOR BELA VISTA.',
    anexoNome: 'Relatorio_Acompanhamento_Obra_Pavimentacao.pdf',
    anexoTamanho: '3.1 MB',
    signatario: 'Engenheiro Civil Fiscal da Obra',
    cargoSignatario: 'Secretaria de Infraestrutura',
    textoIntegral: `RELATÓRIO DE FISCALIZAÇÃO DE OBRA PÚBLICA\n\nDENOMINAÇÃO: Pavimentação e drenagem superficial no Setor Bela Vista.\nCONTRATADA: Construtora Vale do Tocantins Eireli.\nVALOR: R$ 412.300,00\nPERCENTUAL EXECUTADO: 68,4%\nSITUAÇÃO ATUAL: Em andamento normal dentro do cronograma contratual pactuado.`
  },
  {
    id: 'obr-paral-2026',
    groupId: 'obras',
    tab: 'OBRAS PARALISADAS',
    numero: 'DECL. 01/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Engenharia e Fiscalização de Obras',
    assinatura: '01/09/2026',
    ementa: 'CERTIDÃO DECLARATÓRIA INFORMANDO A INEXISTÊNCIA DE OBRAS PÚBLICAS PARALISADAS NO ÂMBITO DO MUNICÍPIO.',
    anexoNome: 'Certidao_Obras_Paralisadas_2026.pdf',
    anexoTamanho: '210 KB',
    signatario: 'Secretário Municipal de Infraestrutura',
    cargoSignatario: 'Secretaria de Infraestrutura'
  },
  {
    id: 'obr-med-05-2026',
    groupId: 'obras',
    tab: 'MEDIÇÕES',
    numero: 'MED. 005/2026',
    numeroSimples: '5',
    ano: '2026',
    secao: 'Engenharia e Fiscalização de Obras',
    assinatura: '05/09/2026',
    ementa: 'BOLETIM DE MEDIÇÃO Nº 05 ATESTANDO OS SERVIÇOS EXECUTADOS NA CONSTRUÇÃO DA PONTE DE CONCRETO NA VICINAL 03.',
    anexoNome: 'Boletim_Medicao_05_Ponte_Vicinal.pdf',
    anexoTamanho: '1.4 MB',
    signatario: 'Engenheiro Fiscal da Obra',
    cargoSignatario: 'Secretaria de Infraestrutura'
  },

  // ==========================================
  // 10. MEIO AMBIENTE E SANEAMENTO (Verde Floresta: #15803d)
  // ==========================================
  {
    id: 'ma-san-2026',
    groupId: 'meio-ambiente',
    tab: 'PLANO DE SANEAMENTO',
    numero: 'PMSB 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Secretaria de Meio Ambiente',
    assinatura: '20/01/2026',
    ementa: 'PLANO MUNICIPAL DE SANEAMENTO BÁSICO - ABASTECIMENTO DE ÁGUA, ESGOTAMENTO SANITÁRIO E DRENAGEM DE ÁGUAS PLUVIAIS.',
    anexoNome: 'Plano_Municipal_Saneamento_Basico.pdf',
    anexoTamanho: '4.2 MB',
    signatario: 'Secretário de Meio Ambiente e Recursos Hídricos',
    cargoSignatario: 'Secretaria de Meio Ambiente'
  },
  {
    id: 'ma-cons-02-2026',
    groupId: 'meio-ambiente',
    tab: 'CONSELHO MEIO AMBIENTE',
    numero: 'RES. 002/2026',
    numeroSimples: '2',
    ano: '2026',
    secao: 'Conselho Municipal de Meio Ambiente',
    assinatura: '14/06/2026',
    ementa: 'DELIBERAÇÃO QUE APROVA AS DIRETRIZES DE PRESERVAÇÃO E RECUPERAÇÃO DAS MATAS CILIARES E NASCENTES MUNICIPAIS.',
    anexoNome: 'Resolucao_Conselho_Meio_Ambiente_002.pdf',
    anexoTamanho: '380 KB',
    signatario: 'Presidente do Conselho de Meio Ambiente',
    cargoSignatario: 'Conselho Municipal de Meio Ambiente'
  },
  {
    id: 'ma-prest-2026',
    groupId: 'meio-ambiente',
    tab: 'PRESTAÇÃO DE CONTAS',
    numero: 'PC 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Fundo Municipal de Meio Ambiente',
    assinatura: '15/07/2026',
    ementa: 'DEMONSTRATIVO DE APLICAÇÃO DOS RECURSOS DO ICMS ECOLÓGICO E MULTAS AMBIENTAIS NO PRIMEIRO SEMESTRE.',
    anexoNome: 'Prestacao_Contas_ICMS_Ecologico.pdf',
    anexoTamanho: '520 KB',
    signatario: 'Secretário Municipal de Meio Ambiente',
    cargoSignatario: 'Secretaria de Meio Ambiente'
  },

  // ==========================================
  // 11. LGPD E GOVERNO DIGITAL (Rosa Magenta: #db2777)
  // ==========================================
  {
    id: 'lgpd-enc-2026',
    groupId: 'lgpd',
    tab: 'ENCARREGADO LGPD',
    numero: 'PORT. 009/2026',
    numeroSimples: '9',
    ano: '2026',
    secao: 'Encarregado de Proteção de Dados (DPO)',
    assinatura: '08/01/2026',
    ementa: 'DESIGNAÇÃO DO ENCARREGADO DE PROTEÇÃO DE DADOS PESSOAIS (DPO) E PUBLICAÇÃO DO CANAL OFICIAL DE ATENDIMENTO.',
    anexoNome: 'Designacao_Encarregado_LGPD_DPO.pdf',
    anexoTamanho: '230 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito',
    textoIntegral: `PORTARIA Nº 009/2026 - LGPD\n\nArt. 1º - Designar o servidor responsável pelo atendimento à Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD) no âmbito do Poder Executivo de São Miguel do Tocantins.\nArt. 2º - Canal de contato oficial com titulares de dados: dpo@saomigueldotocantins.to.gov.br.`
  },
  {
    id: 'lgpd-pol-2026',
    groupId: 'lgpd',
    tab: 'POLÍTICA DE PRIVACIDADE',
    numero: 'POL. 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Tecnologia da Informação e Segurança',
    assinatura: '15/01/2026',
    ementa: 'POLÍTICA OFICIAL DE PRIVACIDADE E PROTEÇÃO DE DADOS PESSOAIS NO PORTAL INSTITUCIONAL E SISTEMAS DIGITAIS.',
    anexoNome: 'Politica_Privacidade_Protecao_Dados.pdf',
    anexoTamanho: '620 KB',
    signatario: 'Diretor de Tecnologia e Informação',
    cargoSignatario: 'Secretaria de Administração'
  },
  {
    id: 'lgpd-api-2026',
    groupId: 'lgpd',
    tab: 'DADOS ABERTOS (API)',
    numero: 'DOC. API 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Governo Digital e Transparência',
    assinatura: '01/03/2026',
    ementa: 'DOCUMENTAÇÃO TÉCNICA E ENDPOINTS REST PARA ACESSO AUTOMATIZADO AOS DADOS ABERTOS DA TRANSPARÊNCIA MUNICIPAL.',
    anexoNome: 'Documentacao_API_Dados_Abertos.pdf',
    anexoTamanho: '440 KB',
    signatario: 'Coordenador de Governo Digital',
    cargoSignatario: 'Núcleo de Tecnologia da Informação'
  },

  // ==========================================
  // 12. EDUCAÇÃO E ASSISTÊNCIA SOCIAL (Azul Celeste: #0284c7)
  // ==========================================
  {
    id: 'edu-plano-2026',
    groupId: 'educacao',
    tab: 'PLANO DE EDUCAÇÃO',
    numero: 'PME 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Secretaria Municipal de Educação',
    assinatura: '10/02/2026',
    ementa: 'RELATÓRIO ANUAL DE MONITORAMENTO E AVALIAÇÃO DAS 20 METAS DO PLANO MUNICIPAL DE EDUCAÇÃO (PME).',
    anexoNome: 'Relatorio_Monitoramento_Metas_PME.pdf',
    anexoTamanho: '2.1 MB',
    signatario: 'Secretária Municipal de Educação',
    cargoSignatario: 'Secretaria de Educação'
  },
  {
    id: 'edu-creche-2026',
    groupId: 'educacao',
    tab: 'FILA DE CRECHES',
    numero: 'LISTA 08/2026',
    numeroSimples: '8',
    ano: '2026',
    secao: 'Educação Infantil',
    assinatura: '20/08/2026',
    ementa: 'DIVULGAÇÃO TRANSPARENTE DA LISTA DE ESPERA E CRITÉRIOS DE PRIORIDADE PARA VAGAS NA REDE MUNICIPAL DE CRECHES.',
    anexoNome: 'Fila_Espera_Vagas_Creches_Publicas.pdf',
    anexoTamanho: '310 KB',
    signatario: 'Coordenadora de Educação Infantil',
    cargoSignatario: 'Secretaria de Educação'
  },
  {
    id: 'edu-fundeb-2026',
    groupId: 'educacao',
    tab: 'FUNDEB',
    numero: 'REL. 08/2026',
    numeroSimples: '8',
    ano: '2026',
    secao: 'Conselho de Acompanhamento do FUNDEB',
    assinatura: '31/08/2026',
    ementa: 'DEMONSTRATIVO DE APLICAÇÃO DOS RECURSOS DO FUNDEB COM DETALHAMENTO DO CUMPRIMENTO DO MÍNIMO DE 70% AOS DOCENTES.',
    anexoNome: 'Demonstrativo_Aplicacao_FUNDEB_70.pdf',
    anexoTamanho: '720 KB',
    signatario: 'Presidente do Conselho do FUNDEB',
    cargoSignatario: 'CACS-FUNDEB'
  },

  // ==========================================
  // 13. DIÁRIAS (Âmbar: #d97706)
  // ==========================================
  {
    id: 'dia-pass-08-2026',
    groupId: 'diarias',
    tab: 'DIÁRIAS E PASSAGENS',
    numero: 'REL. 08/2026',
    numeroSimples: '8',
    ano: '2026',
    secao: 'Controle de Diárias e Viagens',
    assinatura: '31/08/2026',
    ementa: 'RELAÇÃO NOMINAL CONSOLIDADA DAS CONCESSÕES DE DIÁRIAS E PASSAGENS A AGENTES POLÍTICOS E SERVIDORES EM VIAGENS A TRABALHO.',
    anexoNome: 'Relatorio_Consolidado_Diarias_Agosto.pdf',
    anexoTamanho: '360 KB',
    signatario: 'Secretário Municipal de Administração',
    cargoSignatario: 'Secretaria de Administração',
    textoIntegral: `MUNICÍPIO DE SÃO MIGUEL DO TOCANTINS\nRELATÓRIO NOMINAL DE DIÁRIAS CONCEDIDAS\nCOMPETÊNCIA: AGOSTO/2026\n\nBeneficiário: Carlos Alberto Silva (Motorista da Saúde)\nDestino: Palmas - TO (Transporte de pacientes para TFD)\nPeríodo: 14/08/2026 a 15/08/2026 (2 diárias)\nValor Total: R$ 400,00`
  },
  {
    id: 'dia-tab-2026',
    groupId: 'diarias',
    tab: 'TABELA DE VALORES',
    numero: 'DEC. 004/2026',
    numeroSimples: '4',
    ano: '2026',
    secao: 'Normas de Concessão de Diárias',
    assinatura: '02/01/2026',
    ementa: 'FIXA OS VALORES DAS DIÁRIAS PARA DESLOCAMENTOS NO ÂMBITO DO ESTADO DO TOCANTINS E PARA OUTRAS UNIDADES DA FEDERAÇÃO.',
    anexoNome: 'Tabela_Oficial_Valores_Diarias.pdf',
    anexoTamanho: '290 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },

  // ==========================================
  // 14. PLANEJAMENTO E PRESTAÇÃO DE CONTAS (Ciano: #0891b2)
  // ==========================================
  {
    id: 'plan-bal-2025',
    groupId: 'planejamento',
    tab: 'BALANÇO ANUAL',
    numero: 'BAL. 2025',
    numeroSimples: '2025',
    ano: '2025',
    secao: 'Contabilidade Geral do Município',
    assinatura: '31/03/2026',
    ementa: 'BALANÇO GERAL CONSOLIDADO DO EXERCÍCIO FINANCEIRO DE 2025 ENCAMINHADO AO TRIBUNAL DE CONTAS DO ESTADO DO TOCANTINS.',
    anexoNome: 'Balanco_Geral_Consolidado_Exercicio_2025.pdf',
    anexoTamanho: '4.8 MB',
    signatario: 'Prefeito Municipal & Contador Responsável',
    cargoSignatario: 'Gabinete e Contabilidade',
    textoIntegral: `PRESTAÇÃO DE CONTAS ANUAL\nBALANÇO GERAL CONSOLIDADO\nMUNICÍPIO DE SÃO MIGUEL DO TOCANTINS - TO\n\nReceita Arrecadada: R$ 34.892.400,00\nDespesa Liquidada: R$ 32.740.110,00\nSuperávit Orçamentário Apurado: R$ 2.152.290,00\nAplicação em Saúde: 19,4% (Mínimo Constitucional: 15%)\nAplicação em Educação: 27,2% (Mínimo Constitucional: 25%)`
  },
  {
    id: 'plan-tce-2024',
    groupId: 'planejamento',
    tab: 'PARECER TCE',
    numero: 'PAR. 142/2024',
    numeroSimples: '142',
    ano: '2024',
    secao: 'Tribunal de Contas do Estado do Tocantins',
    assinatura: '10/11/2025',
    ementa: 'PARECER PRÉVIO PELA APROVAÇÃO DAS CONTAS CONSOLIDADAS DO CHEFE DO PODER EXECUTIVO DE SÃO MIGUEL DO TOCANTINS.',
    anexoNome: 'Parecer_Previo_TCE_TO_Aprovacao.pdf',
    anexoTamanho: '1.8 MB',
    signatario: 'Tribunal de Contas do Estado do Tocantins',
    cargoSignatario: 'TCE-TO'
  },
  {
    id: 'plan-rgf-2026',
    groupId: 'planejamento',
    tab: 'RGF / RREO',
    numero: 'RGF 2º QUAD/2026',
    numeroSimples: '2',
    ano: '2026',
    secao: 'Responsabilidade Fiscal (LRF)',
    assinatura: '25/08/2026',
    ementa: 'RELATÓRIO DE GESTÃO FISCAL (RGF) E RELATÓRIO RESUMIDO DE EXECUÇÃO ORÇAMENTÁRIA (RREO) DO 2º QUADRIMESTRE.',
    anexoNome: 'Relatorio_RGF_RREO_2_Quadrimestre.pdf',
    anexoTamanho: '960 KB',
    signatario: 'Secretário de Finanças e Controle Interno',
    cargoSignatario: 'Secretaria de Finanças'
  },
  {
    id: 'plan-loa-2026',
    groupId: 'planejamento',
    tab: 'PPA / LDO / LOA',
    numero: 'LEI 418/2025',
    numeroSimples: '418',
    ano: '2025',
    secao: 'Leis Orçamentárias',
    assinatura: '20/12/2025',
    ementa: 'LEI ORÇAMENTÁRIA ANUAL (LOA) QUE ESTIMA A RECEITA E FIXA A DESPESA DO MUNICÍPIO PARA O EXERCÍCIO FINANCEIRO DE 2026.',
    anexoNome: 'Lei_Orcamentaria_Anual_LOA_2026.pdf',
    anexoTamanho: '3.2 MB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },

  // ==========================================
  // 15. CONVÊNIOS E TRANSFERÊNCIAS (Índigo: #4f46e5)
  // ==========================================
  {
    id: 'conv-rec-01-2026',
    groupId: 'convenios',
    tab: 'CONVÊNIOS RECEBIDOS',
    numero: 'CONV. 912/2026',
    numeroSimples: '912',
    ano: '2026',
    secao: 'Transferências Voluntárias da União e Estado',
    assinatura: '14/05/2026',
    ementa: 'TERMO DE CONVÊNIO CELEBRADO COM A COMPANHIA DE DESENVOLVIMENTO DOS VALES PARA AQUISIÇÃO DE TRATORES AGRÍCOLAS.',
    anexoNome: 'Termo_Convenio_CODEVASF_Tratores.pdf',
    anexoTamanho: '1.7 MB',
    signatario: 'Prefeito Municipal e Representante Concedente',
    cargoSignatario: 'Gabinete do Prefeito',
    textoIntegral: `ESTADO DO TOCANTINS\nCONVÊNIO CELEBRADO COM O GOVERNO FEDERAL\n\nOBJETO: Aquisição de 02 (dois) tratores agrícolas com implementos para apoio aos pequenos produtores da agricultura familiar.\nVALOR DO CONVÊNIO: R$ 580.000,00\nCONTRAPARTIDA MUNICIPAL: R$ 30.000,00`
  },
  {
    id: 'conv-conc-01-2026',
    groupId: 'convenios',
    tab: 'CONVÊNIOS CONCEDIDOS',
    numero: 'TERM. 003/2026',
    numeroSimples: '3',
    ano: '2026',
    secao: 'Repasses a Entidades e Associações',
    assinatura: '10/02/2026',
    ementa: 'TERMO DE COLABORAÇÃO CELEBRADO COM A ASSOCIAÇÃO DE PAIS E AMIGOS DOS EXCEPCIONAIS (APAE) PARA ATENDIMENTOS EDUCACIONAIS.',
    anexoNome: 'Termo_Colaboracao_Repasse_APAE.pdf',
    anexoTamanho: '890 KB',
    signatario: 'Prefeito Municipal e Presidente da APAE',
    cargoSignatario: 'Secretaria de Assistência Social'
  },
  {
    id: 'conv-parc-01-2026',
    groupId: 'convenios',
    tab: 'TERMOS E PARCERIAS',
    numero: 'ACORD. 001/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Parcerias Institucionais',
    assinatura: '15/03/2026',
    ementa: 'ACORDO DE COOPERAÇÃO TÉCNICA COM O SEBRAE-TO PARA IMPLANTAÇÃO DA SALA DO EMPREENDEDOR NO MUNICÍPIO.',
    anexoNome: 'Acordo_Cooperacao_SEBRAE_Sala_Empreendedor.pdf',
    anexoTamanho: '670 KB',
    signatario: 'Prefeito Municipal e Superintendente do SEBRAE',
    cargoSignatario: 'Gabinete do Prefeito'
  },

  // ==========================================
  // 16. RENÚNCIA DE RECEITA (Vermelho: #dc2626)
  // ==========================================
  {
    id: 'ren-fisc-2026',
    groupId: 'renuncia-receita',
    tab: 'RENÚNCIAS FISCAIS',
    numero: 'REL. 01/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Fiscalização e Arrecadação Tributária',
    assinatura: '20/02/2026',
    ementa: 'ESTIMATIVA E IMPACTO ORÇAMENTÁRIO-FINANCEIRO DE RENÚNCIA DE RECEITA TRIBUTÁRIA CONFORME ART. 14 DA LEI DE RESPONSABILIDADE FISCAL.',
    anexoNome: 'Demonstrativo_Renuncia_Fiscal_2026.pdf',
    anexoTamanho: '380 KB',
    signatario: 'Secretário Municipal de Finanças',
    cargoSignatario: 'Secretaria de Finanças'
  },
  {
    id: 'ren-cult-2026',
    groupId: 'renuncia-receita',
    tab: 'INCENTIVOS CULTURAIS',
    numero: 'DEC. 012/2026',
    numeroSimples: '12',
    ano: '2026',
    secao: 'Cultura e Turismo',
    assinatura: '15/04/2026',
    ementa: 'REGULAMENTAÇÃO DOS INCENTIVOS FISCAIS MUNICIPAIS PARA APOIO A PROJETOS CULTURAIS, ARTÍSTICOS E ESPORTIVOS LOCAIS.',
    anexoNome: 'Regulamento_Incentivos_Fiscais_Cultura.pdf',
    anexoTamanho: '450 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },

  // ==========================================
  // 17. SIC - SERVIÇO DE INFORMAÇÃO AO CIDADÃO (Teal: #0f766e)
  // ==========================================
  {
    id: 'sic-ped-01-2026',
    groupId: 'sic',
    tab: 'PEDIDOS DE INFORMAÇÃO',
    numero: 'SIC 088/2026',
    numeroSimples: '88',
    ano: '2026',
    secao: 'Serviço de Informação ao Cidadão',
    assinatura: '16/09/2026',
    ementa: 'REGISTRO DE ATENDIMENTO E PROTOCOLO DE PEDIDO DE INFORMAÇÃO PÚBLICA CUMPRIDO NO PRAZO REGULAMENTAR DA LAI.',
    anexoNome: 'Resposta_Pedido_Informacao_eSIC.pdf',
    anexoTamanho: '240 KB',
    signatario: 'Responsável pelo e-SIC Municipal',
    cargoSignatario: 'Serviço de Informação ao Cidadão',
    textoIntegral: `SISTEMA ELETRÔNICO DO SERVIÇO DE INFORMAÇÃO AO CIDADÃO - E-SIC\nPROTOCOLO: 202609160088\nDATA DO PEDIDO: 02/09/2026\nDATA DA RESPOSTA: 16/09/2026 (Prazo legal: 20 dias)\n\nAssunto: Relação de servidores lotados na Secretaria de Saúde.\nResposta: Segue em anexo a relação pública oficial sem dados pessoais sigilosos conforme a Lei de Acesso à Informação.`
  },
  {
    id: 'sic-rel-2026',
    groupId: 'sic',
    tab: 'RELATÓRIOS E-SIC',
    numero: 'REL. ANUAL 2026',
    numeroSimples: '2026',
    ano: '2026',
    secao: 'Estatísticas de Acesso à Informação',
    assinatura: '01/09/2026',
    ementa: 'RELATÓRIO ESTATÍSTICO DE PEDIDOS DE INFORMAÇÃO RECEBIDOS, ATENDIDOS, DEFERIDOS E TEMPO MÉDIO DE RESPOSTA.',
    anexoNome: 'Relatorio_Estatistico_Anual_eSIC.pdf',
    anexoTamanho: '530 KB',
    signatario: 'Ouvidor e Gestor do e-SIC',
    cargoSignatario: 'Ouvidoria Geral'
  },
  {
    id: 'sic-rec-2026',
    groupId: 'sic',
    tab: 'RECURSOS',
    numero: 'DEC. REC. 01/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Instância Recursal da LAI',
    assinatura: '10/06/2026',
    ementa: 'DECISÃO DA AUTORIDADE SUPERIOR SOBRE RECURSO DE 1ª INSTÂNCIA EM PEDIDO DE ACESSO À INFORMAÇÃO.',
    anexoNome: 'Decisao_Recurso_Primeira_Instancia_LAI.pdf',
    anexoTamanho: '290 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },

  // ==========================================
  // 18. EMENDAS PARLAMENTARES (Violeta: #7c3aed)
  // ==========================================
  {
    id: 'em-imp-01-2026',
    groupId: 'emendas',
    tab: 'EMENDAS IMPOSITIVAS',
    numero: 'EM. 004/2026',
    numeroSimples: '4',
    ano: '2026',
    secao: 'Execução Orçamentária de Emendas',
    assinatura: '18/05/2026',
    ementa: 'PLANO DE TRABALHO E EXECUÇÃO ORÇAMENTÁRIA DE EMENDA PARLAMENTAR INDIVIDUAL IMPOSITIVA DESTINADA À SAÚDE BÁSICA.',
    anexoNome: 'Plano_Trabalho_Emenda_Impositiva_004.pdf',
    anexoTamanho: '620 KB',
    signatario: 'Secretário Municipal de Finanças',
    cargoSignatario: 'Secretaria de Finanças',
    textoIntegral: `EXECUÇÃO DE EMENDA PARLAMENTAR INDIVIDUAL IMPOSITIVA\nEXERCÍCIO: 2026\nAUTOR DA EMENDA: Vereador Municipal\nVALOR ALOCADO: R$ 85.000,00\nDESTINAÇÃO: Aquisição de equipamentos odontológicos para os postos de saúde da família.`
  },
  {
    id: 'em-banc-01-2026',
    groupId: 'emendas',
    tab: 'EMENDAS DE BANCADA',
    numero: 'EM. BANC. 002/2026',
    numeroSimples: '2',
    ano: '2026',
    secao: 'Transferências da União',
    assinatura: '25/07/2026',
    ementa: 'ACOMPANHAMENTO DA LIBERAÇÃO E EXECUÇÃO FINANCEIRA DE EMENDA PARLAMENTAR FEDERAL DE BANCADA PARA INFRAESTRUTURA.',
    anexoNome: 'Emenda_Bancada_Federal_Infraestrutura.pdf',
    anexoTamanho: '780 KB',
    signatario: 'Secretário Municipal de Infraestrutura',
    cargoSignatario: 'Secretaria de Infraestrutura'
  },

  // ==========================================
  // 19. CONSELHOS (Azul Real: #2563eb)
  // ==========================================
  {
    id: 'cons-comp-2026',
    groupId: 'conselhos',
    tab: 'COMPOSIÇÃO DOS CONSELHOS',
    numero: 'DEC. 008/2026',
    numeroSimples: '8',
    ano: '2026',
    secao: 'Conselhos Municipais',
    assinatura: '15/02/2026',
    ementa: 'NOMEIA OS REPRESENTANTES GOVERNAMENTAIS E DA SOCIEDADE CIVIL PARA COMPOR OS CONSELHOS MUNICIPAIS DE SÃO MIGUEL DO TOCANTINS.',
    anexoNome: 'Decreto_Composicao_Conselhos_Municipais.pdf',
    anexoTamanho: '520 KB',
    signatario: 'Prefeito Municipal de São Miguel do Tocantins',
    cargoSignatario: 'Gabinete do Prefeito'
  },
  {
    id: 'cons-atas-2026',
    groupId: 'conselhos',
    tab: 'ATAS E RESOLUÇÕES',
    numero: 'RES. CONJUNTA 01/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Conselho Municipal de Assistência Social',
    assinatura: '10/08/2026',
    ementa: 'RESOLUÇÃO DO CMAS QUE APROVA O PLANO DE AÇÃO PARA ATENDIMENTO ÀS FAMÍLIAS EM SITUAÇÃO DE VULNERABILIDADE SOCIAL.',
    anexoNome: 'Resolucao_CMAS_Plano_Acao_Social.pdf',
    anexoTamanho: '410 KB',
    signatario: 'Presidente do Conselho de Assistência Social',
    cargoSignatario: 'CMAS - São Miguel do Tocantins'
  },

  // ==========================================
  // 20. OUTRAS INFORMAÇÕES (Ardósia: #475569)
  // ==========================================
  {
    id: 'out-plan-2026',
    groupId: 'outras-informacoes',
    tab: 'PLANOS MUNICIPAIS',
    numero: 'DOC. 01/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Secretaria de Governo',
    assinatura: '05/01/2026',
    ementa: 'COMPÊNDIO DOS PLANOS SETORIAIS MUNICIPAIS VIGENTES NO MUNICÍPIO DE SÃO MIGUEL DO TOCANTINS.',
    anexoNome: 'Compendio_Planos_Setoriais_Municipais.pdf',
    anexoTamanho: '1.5 MB',
    signatario: 'Secretário Municipal de Governo',
    cargoSignatario: 'Secretaria de Governo'
  },
  {
    id: 'out-aldir-2026',
    groupId: 'outras-informacoes',
    tab: 'EDITAIS ALDIR BLANC',
    numero: 'ED. PNAB 01/2026',
    numeroSimples: '1',
    ano: '2026',
    secao: 'Cultura e Fomento Artístico',
    assinatura: '18/06/2026',
    ementa: 'EDITAL DE SELEÇÃO PÚBLICA DE PROJETOS CULTURAIS COM RECURSOS DA POLÍTICA NACIONAL ALDIR BLANC DE FOMENTO À CULTURA (PNAB).',
    anexoNome: 'Edital_Selecao_Projetos_Aldir_Blanc_PNAB.pdf',
    anexoTamanho: '890 KB',
    signatario: 'Coordenador Municipal de Cultura',
    cargoSignatario: 'Departamento de Cultura'
  }
];
