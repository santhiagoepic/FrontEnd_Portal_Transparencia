export interface ReceitaItem {
  id: string;
  codigo: string;
  descricao: string;
  categoria: string;
  arrecadado: number;
  previsto: number;
  data: string;
}

export interface DespesaItem {
  id: string;
  empenho: string;
  orgao: string;
  credor: string;
  valor: number;
  fase: 'Empenhado' | 'Liquidado' | 'Pago';
  data: string;
  elemento: string;
}

export interface LicitacaoItem {
  id: string;
  numero: string;
  modalidade: string;
  objeto: string;
  status: 'Aberta' | 'Em Andamento' | 'Homologada' | 'Encerrada';
  dataAbertura: string;
  valorEstimado: number;
}

export interface ContratoItem {
  id: string;
  numero: string;
  objeto: string;
  contratado: string;
  cnpj: string;
  valorTotal: number;
  vigenciaFim: string;
  status: 'Vigente' | 'Finalizado' | 'Em Aditivo';
}

export interface ServidorItem {
  id: string;
  matricula: string;
  nome: string;
  cargo: string;
  lotacao: string;
  salarioBruto: number;
  salarioLiquido: number;
  tipoVinculo: 'Efetivo' | 'Comissionado' | 'Contratado' | 'Estagiário';
}

export interface ObraItem {
  id: string;
  nome: string;
  local: string;
  valor: number;
  progresso: number;
  status: 'Em Execução' | 'Concluída' | 'Em Licitação';
  prazo: string;
}

export interface FaqItem {
  pergunta: string;
  resposta: string;
  categoria: string;
}

export const RECEITAS_DATA: ReceitaItem[] = [
  { id: '1', codigo: '1.7.1.8.01.2.1', descricao: 'Cota-Parte do Fundo de Participação dos Municípios (FPM)', categoria: 'Transferências Correntes', arrecadado: 14850420.50, previsto: 16000000.00, data: '12/10/2024' },
  { id: '2', codigo: '1.7.2.8.01.1.1', descricao: 'Cota-Parte do ICMS do Estado do Tocantins', categoria: 'Transferências dos Estados', arrecadado: 4120890.10, previsto: 4500000.00, data: '10/10/2024' },
  { id: '3', codigo: '1.7.5.8.01.1.1', descricao: 'Transferências de Recursos do FUNDEB', categoria: 'Educação', arrecadado: 5890340.00, previsto: 6200000.00, data: '08/10/2024' },
  { id: '4', codigo: '1.1.1.8.01.1.1', descricao: 'Imposto Predial e Territorial Urbano - IPTU', categoria: 'Tributos Municipais', arrecadado: 742150.80, previsto: 850000.00, data: '05/10/2024' },
  { id: '5', codigo: '1.1.1.8.02.3.1', descricao: 'Imposto Sobre Serviços de Qualquer Natureza - ISSQN', categoria: 'Tributos Municipais', arrecadado: 1380900.25, previsto: 1500000.00, data: '04/10/2024' },
  { id: '6', codigo: '1.7.1.8.03.1.1', descricao: 'Transferência de Recursos do SUS - Atenção Básica', categoria: 'Saúde', arrecadado: 2950600.00, previsto: 3100000.00, data: '02/10/2024' },
];

export const DESPESAS_DATA: DespesaItem[] = [
  { id: '1', empenho: '2024NE00142', orgao: 'Secretaria Municipal de Saúde', credor: 'DISTRIBUIDORA TOCANTINS FARMACÊUTICA LTDA', valor: 86450.00, fase: 'Pago', data: '11/10/2024', elemento: 'Material de Consumo / Medicamentos' },
  { id: '2', empenho: '2024NE00143', orgao: 'Secretaria de Educação e Cultura', credor: 'COOPERATIVA DE PRODUTORES RURAIS DA REGIAO', valor: 42300.00, fase: 'Pago', data: '09/10/2024', elemento: 'Alimentação Escolar (PNAE)' },
  { id: '3', empenho: '2024NE00144', orgao: 'Secretaria Municipal de Infraestrutura e Obras', credor: 'NORTE ASFALTO PAVIMENTADORA E SERVIÇOS', valor: 315000.00, fase: 'Liquidado', data: '08/10/2024', elemento: 'Obras e Instalações de Vias Públicas' },
  { id: '4', empenho: '2024NE00145', orgao: 'Secretaria de Administração e Finanças', credor: 'CONCESSIONÁRIA ENERGISA TOCANTINS', valor: 28940.15, fase: 'Liquidado', data: '05/10/2024', elemento: 'Energia Elétrica Prédios Públicos' },
  { id: '5', empenho: '2024NE00146', orgao: 'Fundo Municipal de Assistência Social', credor: 'COMÉRCIO DE ALIMENTOS UNIÃO LTDA', valor: 19800.00, fase: 'Empenhado', data: '04/10/2024', elemento: 'Cestas Básicas / Benefícios Eventuais' },
  { id: '6', empenho: '2024NE00147', orgao: 'Secretaria de Meio Ambiente e Turismo', credor: 'BIORESÍDUOS GESTÃO AMBIENTAL E COLETA', valor: 54200.00, fase: 'Pago', data: '01/10/2024', elemento: 'Serviços de Terceiros - Limpeza Urbana' },
];

export const LICITACOES_DATA: LicitacaoItem[] = [
  { id: '1', numero: 'PE 014/2024', modalidade: 'Pregão Eletrônico', objeto: 'Aquisição de combustíveis (gasolina, diesel S10 e etanol) para frota de veículos oficiais do município.', status: 'Aberta', dataAbertura: '22/10/2024 às 09:00', valorEstimado: 480000.00 },
  { id: '2', numero: 'CP 003/2024', modalidade: 'Concorrência Pública', objeto: 'Contratação de empresa de engenharia para pavimentação em bloquetes intertravados nos Bairros Bela Vista e Centro.', status: 'Em Andamento', dataAbertura: '28/10/2024 às 10:00', valorEstimado: 1250000.00 },
  { id: '3', numero: 'PE 012/2024', modalidade: 'Pregão Eletrônico', objeto: 'Contratação de serviços de transporte escolar para alunos da rede municipal de ensino residentes na zona rural.', status: 'Homologada', dataAbertura: '15/09/2024 às 09:30', valorEstimado: 790000.00 },
  { id: '4', numero: 'DL 022/2024', modalidade: 'Dispensa de Licitação', objeto: 'Locação emergencial de grupo gerador de energia para a Unidade Mista de Saúde.', status: 'Encerrada', dataAbertura: '05/08/2024 às 14:00', valorEstimado: 34500.00 },
];

export const CONTRATOS_DATA: ContratoItem[] = [
  { id: '1', numero: 'CT 048/2024', objeto: 'Fornecimento continuado de pneus e serviços de vulcanização para ambulâncias e máquinas', contratado: 'TOCANTINS PNEUS E RECAPAGENS LTDA', cnpj: '12.345.678/0001-90', valorTotal: 182400.00, vigenciaFim: '31/12/2024', status: 'Vigente' },
  { id: '2', numero: 'CT 035/2024', objeto: 'Prestação de serviços de assessoria contábil pública e suporte ao e-Sfinge/TCE-TO', contratado: 'AUDICON CONSULTORIA PÚBLICA INTEGRADA', cnpj: '98.765.432/0001-12', valorTotal: 144000.00, vigenciaFim: '28/02/2025', status: 'Vigente' },
  { id: '3', numero: 'CT 029/2024', objeto: 'Reforma e ampliação da Escola Municipal Pequeno Príncipe com quadra poliesportiva', contratado: 'CONSTRUTORA ARAGUAIA TOCANTINS EIRELI', cnpj: '45.678.901/0001-34', valorTotal: 840500.00, vigenciaFim: '15/11/2024', status: 'Em Aditivo' },
  { id: '4', numero: 'CT 011/2023', objeto: 'Manutenção preventiva e corretiva da iluminação pública com lâmpadas LED', contratado: 'LUZ DA CIDADE ILUMINAÇÃO URBANA LTDA', cnpj: '67.890.123/0001-56', valorTotal: 310000.00, vigenciaFim: '10/05/2024', status: 'Finalizado' },
];

export const SERVIDORES_DATA: ServidorItem[] = [
  { id: '1', matricula: '001042', nome: 'Carlos Eduardo Oliveira', cargo: 'Médico Clínico Geral', lotacao: 'Unidade Básica de Saúde Central', salarioBruto: 14800.00, salarioLiquido: 11450.00, tipoVinculo: 'Efetivo' },
  { id: '2', matricula: '002155', nome: 'Maria Aparecida Santos', cargo: 'Professora de Ensino Fundamental', lotacao: 'Escola Municipal São Miguel', salarioBruto: 5240.00, salarioLiquido: 4320.00, tipoVinculo: 'Efetivo' },
  { id: '3', matricula: '003489', nome: 'João Batista da Silva', cargo: 'Operador de Máquinas Pesadas', lotacao: 'Secretaria de Obras e Serviços Urbanos', salarioBruto: 3600.00, salarioLiquido: 3050.00, tipoVinculo: 'Efetivo' },
  { id: '4', matricula: '004120', nome: 'Luciana Ferreira Lima', cargo: 'Secretária de Finanças', lotacao: 'Secretaria Municipal de Administração e Finanças', salarioBruto: 9500.00, salarioLiquido: 7420.00, tipoVinculo: 'Comissionado' },
  { id: '5', matricula: '005612', nome: 'Rafael Mendes de Sousa', cargo: 'Estagiário de Direito', lotacao: 'Procuradoria Geral do Município', salarioBruto: 900.00, salarioLiquido: 900.00, tipoVinculo: 'Estagiário' },
];

export const OBRAS_DATA: ObraItem[] = [
  { id: '1', nome: 'Construção da Creche Municipal Proinfância', local: 'Bairro Nova Esperança', valor: 1450000.00, progresso: 75, status: 'Em Execução', prazo: 'Dezembro / 2024' },
  { id: '2', nome: 'Pavimentação Asfáltica e Drenagem Pluvial no Centro', local: 'Avenida Tocantins e Ruas Adjacentes', valor: 2100000.00, progresso: 92, status: 'Em Execução', prazo: 'Novembro / 2024' },
  { id: '3', nome: 'Reforma Geral do Hospital / Unidade Mista', local: 'Setor Hospitalar', valor: 650000.00, progresso: 100, status: 'Concluída', prazo: 'Setembro / 2024' },
  { id: '4', nome: 'Construção de Praça com Academia da Saúde', local: 'Vila São José', valor: 280000.00, progresso: 35, status: 'Em Execução', prazo: 'Janeiro / 2025' },
];

export const FAQS_DATA: FaqItem[] = [
  {
    categoria: 'Acesso à Informação',
    pergunta: 'O que é o Portal da Transparência?',
    resposta: 'É um canal pelo qual todo cidadão pode acompanhar e fiscalizar a correta aplicação dos recursos públicos municipais, em cumprimento à Lei de Acesso à Informação (Lei Federal nº 12.527/2011) e à Lei de Responsabilidade Fiscal (Lei Complementar nº 131/2009).'
  },
  {
    categoria: 'Prazos e Solicitações',
    pergunta: 'Qual o prazo para resposta aos pedidos feitos pelo SIC (e-SIC)?',
    resposta: 'Conforme a Lei de Acesso à Informação, se a informação solicitada estiver disponível, ela deve ser concedida imediatamente. Não sendo possível, o prazo de resposta é de até 20 (vinte) dias, prorrogável por mais 10 (dez) dias mediante justificativa expressa.'
  },
  {
    categoria: 'Recursos Humanos',
    pergunta: 'Onde posso consultar a folha salarial dos servidores?',
    resposta: 'Na seção Recursos Humanos > Folha de Pagamento, ou buscando o nome ou cargo do servidor pelo campo de busca. Os valores brutos, descontos legais e remuneração líquida são disponibilizados mensalmente.'
  },
  {
    categoria: 'Licitações e Contratos',
    pergunta: 'Como acompanhar os editais e resultados de licitações?',
    resposta: 'Acesse o menu Licitações. É possível baixar na íntegra editais, anexos, atas de julgamento, relatórios e homologações das modalidades Pregão, Concorrência, Tomada de Preços e Leilão.'
  },
  {
    categoria: 'Ouvidoria',
    pergunta: 'Qual a diferença entre o SIC e a Ouvidoria?',
    resposta: 'O SIC (Serviço de Informação ao Cidadão) atende solicitações de dados, documentos e informações públicas. A Ouvidoria recebe reclamações, elogios, sugestões, denúncias e pedidos de providências sobre serviços municipais.'
  }
];
