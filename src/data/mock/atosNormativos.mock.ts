import { DocumentoOficialDTO } from '../../types/api.types';
import { ATOS_NORMATIVOS_DATA } from '../atosNormativosData';

export const ATOS_NORMATIVOS_MOCK: DocumentoOficialDTO[] = ATOS_NORMATIVOS_DATA.map((item) => ({
  id: item.id,
  groupId: 'atos-normativos',
  tab: item.tipo.toUpperCase(),
  numero: item.numero,
  numeroSimples: item.numeroSimples,
  ano: item.ano,
  secao: item.secao,
  assinatura: item.assinatura,
  ementa: item.ementa,
  anexoNome: item.anexoNome,
  anexoTamanho: item.anexoTamanho,
  signatario: item.signatario,
  cargoSignatario: item.cargoSignatario,
  textoIntegral: item.textoIntegral,
}));
