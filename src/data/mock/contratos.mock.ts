import { ContratoDTO } from '../../types/api.types';

export const CONTRATOS_MOCK: ContratoDTO[] = [
  {
    id: 'ct-001',
    numero: 'CT 048/2026',
    objeto: 'Fornecimento continuado de pneus, câmaras de ar e serviços de vulcanização para ambulâncias e máquinas pesadas do município.',
    contratado: 'TOCANTINS PNEUS E RECAPAGENS LTDA',
    cnpj: '12.345.678/0001-90',
    valor_total: 182400.00,
    vigencia_fim: '31/12/2026',
    status: 'Vigente',
  },
  {
    id: 'ct-002',
    numero: 'CT 035/2026',
    objeto: 'Prestação de serviços técnicos de consultoria contábil pública, fechamento bimestral e suporte na transmissão ao e-Sfinge/TCE-TO.',
    contratado: 'AUDICON CONSULTORIA PÚBLICA INTEGRADA LTDA',
    cnpj: '98.765.432/0001-12',
    valor_total: 144000.00,
    vigencia_fim: '28/02/2027',
    status: 'Vigente',
  },
  {
    id: 'ct-003',
    numero: 'CT 029/2026',
    objeto: 'Reforma, modernização e ampliação da Escola Municipal Pequeno Príncipe, contemplando cobertura de quadra poliesportiva e refeitório.',
    contratado: 'CONSTRUTORA ARAGUAIA TOCANTINS EIRELI',
    cnpj: '45.678.901/0001-34',
    valor_total: 840500.00,
    vigencia_fim: '15/11/2026',
    status: 'Em Aditivo',
  },
  {
    id: 'ct-004',
    numero: 'CT 011/2025',
    objeto: 'Manutenção preventiva e corretiva da rede de iluminação pública municipal com substituição por luminárias LED inteligentes.',
    contratado: 'LUZ DA CIDADE ILUMINAÇÃO URBANA LTDA',
    cnpj: '67.890.123/0001-56',
    valor_total: 310000.00,
    vigencia_fim: '10/05/2026',
    status: 'Finalizado',
  },
];
