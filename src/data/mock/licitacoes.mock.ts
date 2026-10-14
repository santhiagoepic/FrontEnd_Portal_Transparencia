import { LicitacaoDTO } from '../../types/api.types';

export const LICITACOES_MOCK: LicitacaoDTO[] = [
  {
    id: 'lic-001',
    numero: 'PE 014/2026',
    modalidade: 'Pregão Eletrônico',
    objeto: 'Aquisição continuada de combustíveis (gasolina comum, diesel S10 e etanol) para a frota de veículos oficiais do município.',
    status: 'Aberta',
    data_abertura: '22/10/2026 às 09:00',
    valor_estimado: 480000.00,
  },
  {
    id: 'lic-002',
    numero: 'CP 003/2026',
    modalidade: 'Concorrência Pública',
    objeto: 'Contratação de empresa de engenharia especializada para pavimentação em bloquetes sextavados e drenagem superficial nos bairros Bela Vista e Centro.',
    status: 'Em Andamento',
    data_abertura: '28/10/2026 às 10:00',
    valor_estimado: 1250000.00,
  },
  {
    id: 'lic-003',
    numero: 'PE 012/2026',
    modalidade: 'Pregão Eletrônico',
    objeto: 'Contratação de serviços de transporte escolar para alunos da rede municipal residentes nas rotas rurais e vicinais.',
    status: 'Homologada',
    data_abertura: '15/09/2026 às 09:30',
    valor_estimado: 790000.00,
  },
  {
    id: 'lic-004',
    numero: 'DL 022/2026',
    modalidade: 'Dispensa de Licitação',
    objeto: 'Locação emergencial e manutenção de grupo gerador trifásico automático para atendimento da Unidade Mista de Saúde Central.',
    status: 'Encerrada',
    data_abertura: '05/08/2026 às 14:00',
    valor_estimado: 34500.00,
  },
];
