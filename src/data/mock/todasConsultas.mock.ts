import { DocumentoOficialDTO } from '../../types/api.types';
import { ALL_GROUPS_DOCUMENTS } from '../allGroupsData';
import { INSTITUCIONAL_DOCUMENTS_MOCK } from './institucional.mock';
import { ATOS_NORMATIVOS_MOCK } from './atosNormativos.mock';

export const TODAS_CONSULTAS_MOCK: DocumentoOficialDTO[] = [
  ...ATOS_NORMATIVOS_MOCK,
  ...INSTITUCIONAL_DOCUMENTS_MOCK,
  ...ALL_GROUPS_DOCUMENTS,
];

export const getMockDocumentsByGroupAndTab = (
  groupId: string,
  tab?: string,
  search?: string
): DocumentoOficialDTO[] => {
  let docs = TODAS_CONSULTAS_MOCK.filter((d) => d.groupId === groupId);

  if (tab && tab.trim()) {
    const tabUpper = tab.trim().toUpperCase();
    const tabMatches = docs.filter(
      (d) => d.tab.toUpperCase() === tabUpper || d.tab.toUpperCase().includes(tabUpper)
    );
    if (tabMatches.length > 0) {
      docs = tabMatches;
    }
  }

  if (search && search.trim()) {
    const s = search.toLowerCase();
    docs = docs.filter(
      (d) =>
        d.numero.toLowerCase().includes(s) ||
        d.ementa.toLowerCase().includes(s) ||
        (d.signatario && d.signatario.toLowerCase().includes(s))
    );
  }

  return docs;
};
