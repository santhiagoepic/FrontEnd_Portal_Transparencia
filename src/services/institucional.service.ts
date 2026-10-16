import { UnidadeOrganizacional, PerguntaFrequente } from '../types/institucional.types';

const STORAGE_KEYS = {
  UNIDADES: 'saomiguel_institucional_unidades_v2',
  FAQS: 'saomiguel_institucional_faqs_v2',
};

export const INITIAL_UNIDADES: UnidadeOrganizacional[] = [
  {
    id: 'gabinete-prefeito',
    nome: 'Gabinete do Prefeito',
    tipo: 'Gabinete',
    gestao: '2025 - 2028',
    sigla: 'GP',
    unidadeSuperiorId: null, // Órgão Máximo do Poder Executivo
    funcaoGestor: 'Prefeito',
    nomeGestor: 'Alberto Loiola Gomes Moreira',
    pendenteNomeacao: false,
    endereco: 'Afonso Pena, S/N - Centro, São Miguel do Tocantins - TO 77925-000',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 257/2025',
    baseJuridicaId: 'lei-257-2025',
    email: 'prefeitura@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1347',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'LEI Nº 257/2025, DE 20 DE FEVEREIRO DE 2025:\nCompete ao Gabinete do Prefeito assistir direta e imediatamente ao Chefe do Poder Executivo na coordenação geral das ações de governo, relações institucionais com os Poderes Legislativo e Judiciário, representação civil, cerimonial público, comunicação institucional e articulação política com as demais esferas federativas.',
    perfilGestor: 'Prefeito Municipal em exercício no mandato constitucional 2025-2028. Gestor público experiente e líder comunitário dedicado ao desenvolvimento econômico sustentável e fortalecimento da transparência pública no Bico do Papagaio.',
    resumoCurriculo: 'Graduado em Gestão Pública, ampla atuação no setor produtivo e liderança política no Estado do Tocantins. Foco em modernização administrativa, infraestrutura e ampliação do acesso à saúde e educação.',
    ordem: 1,
  },
  {
    id: 'gabinete-vice-prefeito',
    nome: 'Gabinete do Vice Prefeito',
    tipo: 'Gabinete',
    gestao: '2025 - 2028',
    sigla: 'GVP',
    unidadeSuperiorId: 'gabinete-prefeito', // Subordinado ao Gabinete do Prefeito
    funcaoGestor: 'Vice Prefeito',
    nomeGestor: 'Raimundo Nonato Ferreira da Silva',
    pendenteNomeacao: false,
    endereco: 'Afonso Pena, S/N - Centro, São Miguel do Tocantins - TO 77925-000',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 257/2025',
    baseJuridicaId: 'lei-257-2025',
    email: 'viceprefeito@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1348',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Compete ao Gabinete do Vice-Prefeito prestar assistência e assessoramento direto ao Prefeito Municipal nas funções político-administrativas, substituir o titular em casos de ausência, impedimento ou licença, e desempenhar missões especiais, comissões de governo e projetos prioritários delegados pelo Chefe do Executivo.',
    perfilGestor: 'Vice-Prefeito Municipal eleito para a gestão 2025-2028, atuando diretamente no diálogo com a comunidade rural e associações de produtores.',
    resumoCurriculo: 'Histórico de liderança cooperativa e comunitária no Município de São Miguel do Tocantins, com vasta experiência em articulação social.',
    ordem: 2,
  },
  {
    id: 'semas',
    nome: 'Secretaria Municipal de Meio Ambiente e Saneamento - SEMAS',
    tipo: 'Secretaria',
    gestao: '2025 - 2028',
    sigla: 'SEMAS',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Secretário Municipal',
    nomeGestor: 'Marcos Vinícius Alencar Lima',
    pendenteNomeacao: false,
    endereco: 'Rua Afonso Pena, Centro Administrativo José Wilson Siqueira Campos, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 412/2021',
    baseJuridicaId: 'lei-412-2021',
    email: 'meioambiente@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1420',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Formula, planeja e executa a política ambiental do Município, fiscalização de recursos hídricos, arborização urbana, licenciamento ambiental municipal prévio, de instalação e de operação, gestão de resíduos sólidos e programas de educação ambiental e preservação de mananciais.',
    perfilGestor: 'Especialista em Engenharia Ambiental com foco em sustentabilidade da bacia hidrográfica do Rio Tocantins.',
    resumoCurriculo: 'Engenheiro Ambiental, com 10 anos de experiência em gestão de unidades de conservação e licenciamento municipal.',
    ordem: 3,
  },
  {
    id: 'sinfra',
    nome: 'Secretaria Municipal de Infra-estrutura - SINFRA',
    tipo: 'Secretaria',
    gestao: '2025 - 2028',
    sigla: 'SINFRA',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Secretário Municipal',
    nomeGestor: 'Eduardo Cardoso de Sousa',
    pendenteNomeacao: false,
    endereco: 'Av. Tocantins, nº 140 - Bairro Centro, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 412/2021',
    baseJuridicaId: 'lei-412-2021',
    email: 'obras@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1510',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Execução de obras públicas municipais, pavimentação asfáltica, manutenção e recuperação de estradas vicinais e pontes, serviços de drenagem, iluminação pública urbana, limpeza de vias e conservação dos prédios públicos municipais.',
    perfilGestor: 'Engenheiro Civil com vasta atuação em obras rodoviárias e infraestrutura urbana municipal.',
    resumoCurriculo: 'Especialista em Estruturas e Drenagem Urbana. Responsável pelo plano municipal de pavimentação em bloquetes e manutenção de estradas vicinais.',
    ordem: 4,
  },
  {
    id: 'financas',
    nome: 'Secretaria Municipal de Finanças',
    tipo: 'Secretaria',
    gestao: '2025 - 2028',
    sigla: 'SEFIN',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Secretário Municipal',
    nomeGestor: 'Ana Paula Cavalcante Santos',
    pendenteNomeacao: false,
    endereco: 'Rua Afonso Pena, S/N - Centro Administrativo, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 257/2025',
    baseJuridicaId: 'lei-257-2025',
    email: 'financas@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1349',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Gestão da arrecadação de tributos municipais (IPTU, ISSQN, ITBI, taxas), execução orçamentária e financeira, contabilidade pública municipal, tesouraria, controle da dívida ativa e prestação de contas aos órgãos de controle (TCE-TO e Câmara Municipal).',
    perfilGestor: 'Contadora Pública e Especialista em Responsabilidade Fiscal.',
    resumoCurriculo: 'Contadora formada pela UFTO, pós-graduada em Auditoria e Perícia Contábil, com 14 anos de atuação no setor público.',
    ordem: 5,
  },
  {
    id: 'educacao',
    nome: 'Secretaria Municipal de Educação',
    tipo: 'Secretaria',
    gestao: '2025 - 2028',
    sigla: 'SEMED',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Secretária Municipal',
    nomeGestor: 'Francisca Maria dos Reis Silva',
    pendenteNomeacao: false,
    endereco: 'Rua 7 de Setembro, nº 85 - Centro, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 412/2021',
    baseJuridicaId: 'lei-412-2021',
    email: 'educacao@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1234',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Coordenação da política municipal de educação infantil e ensino fundamental, gestão das escolas municipais e creches, fornecimento da merenda e transporte escolar de rotas rurais, valorização do magistério e cumprimento das metas do IDEB e Plano Municipal de Educação.',
    perfilGestor: 'Educadora e Mestra em Ciências da Educação.',
    resumoCurriculo: 'Pedagoga com mais de 20 anos dedicados à rede pública de ensino fundamental do Tocantins.',
    ordem: 6,
  },
  {
    id: 'secult',
    nome: 'Secretaria Municipal de Esporte Juventude Cultura Turismo e Lazer - SECULT',
    tipo: 'Secretaria',
    gestao: '2025 - 2028',
    sigla: 'SECULT',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Secretário Municipal',
    nomeGestor: 'Thiago Pereira Guimarães',
    pendenteNomeacao: false,
    endereco: 'Complexo Esportivo Municipal, Bairro Bela Vista, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 257/2025',
    baseJuridicaId: 'lei-257-2025',
    email: 'cultura@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1600',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Planejamento e fomento das atividades desportivas comunitárias, campeonatos de futebol amador, apoio às manifestações culturais tradicionais (festividades juninas e folclóricas), políticas públicas para a juventude e promoção dos atrativos turísticos do Rio Tocantins.',
    perfilGestor: 'Profissional de Educação Física e produtor cultural.',
    resumoCurriculo: 'Especialista em Gestão Esportiva, organizador de circuitos esportivos e festivais culturais no Bico do Papagaio.',
    ordem: 7,
  },
  {
    id: 'seconti',
    nome: 'Secretaria de Controle Interna - SECONTI',
    tipo: 'Controladoria',
    gestao: '2025 - 2028',
    sigla: 'SECONTI',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Controlador Geral',
    nomeGestor: 'Renato Soares de Mendonça',
    pendenteNomeacao: false,
    endereco: 'Rua Afonso Pena, S/N - Anexo 2, Centro Administrativo, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 412/2021',
    baseJuridicaId: 'lei-412-2021',
    email: 'controleinterno@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1355',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Fiscalização contábil, financeira, orçamentária, operacional e patrimonial da administração direta e indireta municipal, auditoria interna preventiva em processos licitatórios e contratos, e monitoramento do cumprimento das normas da Lei de Responsabilidade Fiscal e Transparência.',
    perfilGestor: 'Auditor e Bacharel em Direito e Contabilidade.',
    resumoCurriculo: 'Especialista em Direito Administrativo e Auditoria Governamental, ex-conselheiro municipal de controle social.',
    ordem: 8,
  },
  {
    id: 'seapec',
    nome: 'Secretaria Municipal de Agricultura, pecuária, Comércio e Indústria - SEAPECI',
    tipo: 'Secretaria',
    gestao: '2025 - 2028',
    sigla: 'SEAPECI',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Secretário Municipal',
    nomeGestor: 'José de Ribamar Nogueira',
    pendenteNomeacao: false,
    endereco: 'Rua do Comércio, nº 42 - Centro, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 257/2025',
    baseJuridicaId: 'lei-257-2025',
    email: 'agricultura@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1480',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Assistência técnica aos pequenos produtores da agricultura familiar, patrulha mecanizada para preparo do solo, incentivo à pecuária de leite e corte, feiras do produtor rural, atração de investimentos comerciais e desburocratização de alvarás.',
    perfilGestor: 'Engenheiro Agrônomo e extensionista rural.',
    resumoCurriculo: 'Agrônomo com carreira dedicada ao desenvolvimento da bacia leiteira e apoio a assentamentos rurais no Tocantins.',
    ordem: 9,
  },
  {
    id: 'semad',
    nome: 'Secretaria Municipal de Administração - SEMAD',
    tipo: 'Secretaria',
    gestao: '2025 - 2028',
    sigla: 'SEMAD',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Secretário Municipal',
    nomeGestor: 'Carlos Alberto Fernandes Lima',
    pendenteNomeacao: false,
    endereco: 'Rua Afonso Pena, S/N - Centro, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 412/2021',
    baseJuridicaId: 'lei-412-2021',
    email: 'administracao@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1346',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Gestão dos servidores públicos municipais (folha de pagamento, posse, aposentadorias e treinamentos), compras públicas centralizadas, patrimônio mobiliário e imobiliário municipal, frota oficial de veículos e protocolo geral de correspondências.',
    perfilGestor: 'Administrador de Empresas e Gestor de RH Público.',
    resumoCurriculo: 'Especialista em Gestão de Pessoas no Setor Público e Logística Governamental.',
    ordem: 10,
  },
  {
    id: 'semus',
    nome: 'Secretaria Municipal de Saúde - SEMUS',
    tipo: 'Secretaria',
    gestao: '2025 - 2028',
    sigla: 'SEMUS',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Secretária Municipal',
    nomeGestor: 'Dra. Juliana Monteiro Albuquerque',
    pendenteNomeacao: false,
    endereco: 'Av. Marechal Rondon, S/N - Bairro Saúde, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 412/2021',
    baseJuridicaId: 'lei-412-2021',
    email: 'saude@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1290',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas (Unidade Mista 24h)',
    competencia: 'Gestão plena do Sistema Único de Saúde (SUS) no âmbito municipal, coordenação da atenção básica (Estratégia Saúde da Família e Unidades Básicas de Saúde), vacinação, vigilância sanitária e epidemiológica, assistência farmacêutica básica e atendimento de urgência e emergência na Unidade Mista de Saúde.',
    perfilGestor: 'Médica Sanitarista e Especialista em Saúde Pública.',
    resumoCurriculo: 'Médica com residência em Saúde da Família e Comunidade, pós-graduada em Gestão de Serviços de Saúde.',
    ordem: 11,
  },
  {
    id: 'pgm',
    nome: 'Procuradoria Geral do Município - PGM',
    tipo: 'Procuradoria',
    gestao: '2025 - 2028',
    sigla: 'PGM',
    unidadeSuperiorId: 'gabinete-prefeito',
    funcaoGestor: 'Procurador Geral',
    nomeGestor: 'Dr. Lucas Barbosa de Oliveira',
    pendenteNomeacao: false,
    endereco: 'Rua Afonso Pena, S/N - Gabinete Jurídico, Centro, São Miguel do Tocantins - TO',
    tipoBaseJuridica: 'Lei',
    baseJuridica: 'Lei nº 412/2021',
    baseJuridicaId: 'lei-412-2021',
    email: 'procuradoria@saomigueldotocantins.to.gov.br',
    telefones: '(63) 3447-1350',
    horarioAtendimento: 'Segunda à Sexta das 07:30 às 13:30 horas.',
    competencia: 'Representação judicial e extrajudicial do Município de São Miguel do Tocantins, consultoria e assessoramento jurídico ao Prefeito e secretários, emissão de pareceres em licitações e contratos administrativos, cobrança judicial da dívida ativa e defesa dos interesses públicos e patrimônio municipal.',
    perfilGestor: 'Advogado e Procurador do Município.',
    resumoCurriculo: 'Bacharel em Direito, Especialista em Direito Constitucional e Administrativo, membro da OAB/TO.',
    ordem: 12,
  },
];

export const INITIAL_FAQS: PerguntaFrequente[] = [
  {
    id: 'faq-01',
    pergunta: 'COMO FAÇO PARA CONSEGUIR LICENÇAS REFERENTES AO MEIO AMBIENTE?',
    secao: 'Meio Ambiente',
    ordem: 1,
    resposta: `1. IDENTIFIQUE O TIPO DE LICENÇA NECESSÁRIA

Antes de iniciar o processo, é importante entender qual tipo de licença ambiental é exigida para o seu empreendimento ou atividade. As principais licenças municipais incluem:

- Licença Prévia (LP): Aprovação do projeto ambiental antes do início das atividades, que visa avaliar a viabilidade ambiental.
- Licença de Instalação (LI): Autoriza a execução do projeto, permitindo que as obras ou instalações comecem.
- Licença de Operação (LO): Autoriza o início das atividades do empreendimento, após a conclusão das obras, garantindo que o empreendimento esteja operando conforme o previsto e com as medidas de controle ambiental.

Uso e Ocupação do Solo – É necessário protocolar o requerimento de CERTIDÃO DE USO E OCUPAÇÃO DE SOLO, juntos ao setor de protocolo do Município, localizado na RUA AFONSO PENA, CENTRO ADMINISTRATIVO, JOSÉ WILSON SIQUEIRA CAMPOS, na cidade de São Miguel do Tocantins, seguindo as orientações e juntado os anexos necessários para analise, caso seja satisfatório, fica a SEMMAS, incumbida de realizar vistoria técnica no local informado para atestar informações apresentadas bem como para observar as características do local afim de se identificar impedimentos possíveis e referenciados em Lei, a exemplo de áreas de preservação permanente. Em caso positivo, será emitido taxa de emissão de certidão de uso e ocupação de solo para posterior emissão e assinatura da mesma.

*A CERTIDÃO DE USO E OCUPAÇÃO DE SOLO, é documento fundamental dentro do processo de licenciamento ambiental, esta emitida pelos municípios para atender aos requisitos da legislação estadual.

2. VERIFIQUE OS REQUISITOS PARA EMISSÃO
Órgão responsável pelo licenciamento ambiental é a Secretaria Municipal de Meio Ambiente e Saneamento será o responsável por analisar, aprovar e fiscalizar o cumprimento das licenças ambientais.

3. CONSULTA PRÉVIA OU VERIFICAÇÃO DE VIABILIDADE
Nessa etapa, você pode ser orientado sobre a necessidade de estudos ambientais adicionais, como um Estudo de Impacto Ambiental (EIA) ou Relatório de Impacto Ambiental (RIMA), caso o projeto tenha impactos significativos.

4. ELABORAÇÃO DE DOCUMENTAÇÃO TÉCNICA
Em muitos casos, será necessário apresentar documentação técnica e estudos que avaliem os impactos ambientais do empreendimento. Dependendo da atividade, você pode precisar contratar um especialista ou empresa especializada para elaborar:
- Estudo de Impacto Ambiental (EIA): Para empreendimentos com grandes impactos ambientais.
- Relatório de Impacto Ambiental (RIMA): Documento que sintetiza os resultados do EIA, apresentando de forma clara os impactos e as medidas mitigadoras.`,
  },
  {
    id: 'faq-02',
    pergunta: 'O QUE É LICENCIAMENTO AMBIENTAL MUNICIPAL?',
    secao: 'Meio Ambiente',
    ordem: 2,
    resposta: `O licenciamento ambiental municipal é o procedimento administrativo pelo qual a Secretaria Municipal de Meio Ambiente e Saneamento (SEMMAS) licencia a localização, instalação, ampliação e a operação de empreendimentos e atividades utilizadoras de recursos ambientais, consideradas efetiva ou potencialmente poluidoras ou daquelas que, sob qualquer forma, possam causar degradação ambiental de impacto local, nos termos da Lei Complementar Federal nº 140/2011 e Resoluções do COEMA-TO.`,
  },
  {
    id: 'faq-03',
    pergunta: 'CRIAR ANIMAIS SILVESTRES É CRIME SEM AUTORIZAÇÃO/LICENÇA (JUSTIFIQUE)?',
    secao: 'Meio Ambiente',
    ordem: 3,
    resposta: `Sim, é crime ambiental conforme previsto no Artigo 29 da Lei Federal nº 9.605/1998 (Lei de Crimes Ambientais). A criação, manutenção em cativeiro, guarda ou transporte de espécimes da fauna silvestre sem a devida permissão, licença ou autorização da autoridade ambiental competente (IBAMA ou órgão estadual/municipal conveniado) sujeita o infrator a detenção de seis meses a um ano, além de multa administrativa e apreensão dos animais. Somente é permitida a posse de animais com nota fiscal de criadouros comerciais legalizados e devidamente anilhados ou microchipados.`,
  },
  {
    id: 'faq-04',
    pergunta: 'Em casos de emergência que colocam a sua vida em risco, como infarto, derrame, fraturas, acidentes de trânsito, ferimentos graves, quedas de alturas, convulsão, perda da consciência, trabalho de parto, grandes sangramentos',
    secao: 'Saúde',
    ordem: 4,
    resposta: `Em casos de urgência e emergência grave com risco à vida, procure imediatamente a Unidade Mista de Saúde de São Miguel do Tocantins (Plantão 24 Horas) ou acione o SAMU pelo número 192 ou ambulância municipal no telefone de plantão (63) 3447-1290. A equipe médica e de enfermagem plantonista realiza os primeiros socorros, estabilização clínica e, quando necessário, regulação imediata pelo sistema estadual para o Hospital Regional de Augustinópolis ou Araguaína.`,
  },
  {
    id: 'faq-05',
    pergunta: 'O que é Unidade Básica de Saúde?',
    secao: 'Saúde',
    ordem: 5,
    resposta: `A Unidade Básica de Saúde (UBS) é a porta de entrada preferencial do Sistema Único de Saúde (SUS). Nela são realizados os atendimentos de atenção primária, como consultas médicas e de enfermagem, acompanhamento pré-natal, vacinação do calendário infantil e adulto, distribuição de medicamentos básicos, curativos, testes rápidos e acompanhamento de hipertensos, diabéticos e programas de saúde da família. O horário de funcionamento é de segunda a sexta-feira, das 07h30 às 13h30.`,
  },
  {
    id: 'faq-06',
    pergunta: 'Que atendimentos posso encontrar em uma Unidade Básica de Saúde?',
    secao: 'Saúde',
    ordem: 6,
    resposta: `Nas UBS de São Miguel do Tocantins o cidadão tem acesso gratuito a:
- Consultas de Clínica Geral e Enfermagem;
- Pré-natal para gestantes e puerpério;
- Puericultura e vacinação infantil e de idosos;
- Acompanhamento do hipertenso e diabético (HiperDia);
- Atendimento e profilaxia odontológica básica;
- Coleta de preventivo (Papanicolau);
- Testes rápidos para HIV, Sífilis, Hepatites e gravidez;
- Curativos, aferição de pressão arterial e glicemia capilar;
- Dispensação de medicamentos da Farmácia Básica Municipal.`,
  },
  {
    id: 'faq-07',
    pergunta: 'É preciso dar razões para o pedido?',
    secao: 'Acesso à Informação',
    ordem: 7,
    resposta: `Não. Conforme determina o Art. 10, § 3º da Lei Federal nº 12.527/2011 (Lei de Acesso à Informação - LAI), são vedadas quaisquer exigências relativas aos motivos determinantes da solicitação de informações de interesse público. O cidadão pode solicitar qualquer informação ou documento governamental sem necessidade de justificar a razão ou destinação do uso do dado.`,
  },
  {
    id: 'faq-08',
    pergunta: 'Quais informações poderão ser solicitadas?',
    secao: 'Acesso à Informação',
    ordem: 8,
    resposta: `Qualquer informação pública produzida ou custodiada pela Prefeitura Municipal de São Miguel do Tocantins que não possua classificação expressa de sigilo legal (como dados protegidos por sigilo fiscal, bancário ou segredo de justiça) ou dados pessoais protegidos pela LGPD. Podem ser solicitados cópias de processos licitatórios, contratos, folhas de pagamento, relatórios de obras, convênios, pareceres jurídicos, despesas e receitas.`,
  },
];

function getStored<T>(key: string, initial: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initial;
  } catch {
    return initial;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to save to localStorage (${key})`, err);
  }
}

export const institucionalService = {
  // Unidades Organizacionais
  getUnidades(): UnidadeOrganizacional[] {
    return getStored<UnidadeOrganizacional[]>(STORAGE_KEYS.UNIDADES, INITIAL_UNIDADES);
  },

  getUnidadeById(id: string): UnidadeOrganizacional | undefined {
    return this.getUnidades().find((u) => u.id === id);
  },

  saveUnidade(unidade: UnidadeOrganizacional): void {
    const list = this.getUnidades();
    const idx = list.findIndex((u) => u.id === unidade.id);
    if (idx >= 0) {
      list[idx] = unidade;
    } else {
      list.push(unidade);
    }
    setStored(STORAGE_KEYS.UNIDADES, list);
  },

  deleteUnidade(id: string): void {
    const list = this.getUnidades().filter((u) => u.id !== id);
    setStored(STORAGE_KEYS.UNIDADES, list);
  },

  reorderUnidades(ids: string[]): void {
    const list = this.getUnidades();
    const ordered = ids
      .map((id, index) => {
        const item = list.find((u) => u.id === id);
        return item ? { ...item, ordem: index + 1 } : null;
      })
      .filter(Boolean) as UnidadeOrganizacional[];
    setStored(STORAGE_KEYS.UNIDADES, ordered);
  },

  // Perguntas Frequentes (FAQs)
  getFaqs(): PerguntaFrequente[] {
    return getStored<PerguntaFrequente[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
  },

  saveFaq(faq: PerguntaFrequente): void {
    const list = this.getFaqs();
    const idx = list.findIndex((f) => f.id === faq.id);
    if (idx >= 0) {
      list[idx] = faq;
    } else {
      list.push(faq);
    }
    setStored(STORAGE_KEYS.FAQS, list);
  },

  deleteFaq(id: string): void {
    const list = this.getFaqs().filter((f) => f.id !== id);
    setStored(STORAGE_KEYS.FAQS, list);
  },

  getSecoesFaq(): string[] {
    const faqs = this.getFaqs();
    const set = new Set(faqs.map((f) => f.secao));
    return Array.from(set);
  },
};
