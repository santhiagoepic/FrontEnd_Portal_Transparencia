import { apiClient } from './api.client';
import { apiConfig } from '../config/site.config';
import { DocumentoOficialDTO, PaginatedResponse } from '../types/api.types';
import { getMockDocumentsByGroupAndTab, TODAS_CONSULTAS_MOCK } from '../data/mock/todasConsultas.mock';
import { GROUP_CONFIGS } from '../config/navigation.config';

export const documentosService = {
  async getDocumentosByGroup(
    groupId: string,
    params?: { tab?: string; search?: string; ano?: string }
  ): Promise<DocumentoOficialDTO[]> {
    if (apiClient.isMockEnabled()) {
      // Simulate fast network loading (200ms) for smooth skeleton animations
      await new Promise((resolve) => setTimeout(resolve, 200));
      
      let docs = getMockDocumentsByGroupAndTab(groupId, params?.tab, params?.search);

      // If no docs matched tab directly, generate contextual docs for this tab so that all tabs have content
      if (docs.length === 0) {
        const config = GROUP_CONFIGS[groupId];
        const groupTitle = config?.title || groupId;
        const currentTab = params?.tab || 'DOCUMENTOS';
        
        docs = [
          {
            id: `${groupId}-01-2026`,
            groupId,
            tab: currentTab,
            numero: `001/2026`,
            numeroSimples: '1',
            ano: '2026',
            secao: groupTitle,
            assinatura: '15/09/2026',
            ementa: `DOCUMENTAÇÃO OFICIAL DE REGISTRO E DEMONSTRATIVO - ${currentTab} - ${groupTitle.toUpperCase()}`,
            anexoNome: `${currentTab.replace(/[\s\(\)\/]/g, '_')}_Oficial_2026.pdf`,
            anexoTamanho: '450 KB',
            signatario: 'Prefeitura Municipal de São Miguel do Tocantins',
            cargoSignatario: 'Gabinete Municipal',
            textoIntegral: `ESTADO DO TOCANTINS\nPREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS\n\nPUBLICAÇÃO OFICIAL - ${groupTitle.toUpperCase()}\nASSUNTO: ${currentTab}\n\nO presente registro compõe a base pública oficial de transparência e prestação de contas do Município de São Miguel do Tocantins - TO, em conformidade com as exigências da Lei de Acesso à Informação (Lei 12.527/2011) e Lei de Responsabilidade Fiscal.`
          },
          {
            id: `${groupId}-02-2026`,
            groupId,
            tab: currentTab,
            numero: `002/2026`,
            numeroSimples: '2',
            ano: '2026',
            secao: groupTitle,
            assinatura: '01/08/2026',
            ementa: `RELATÓRIO CONSOLIDADO E CERTIDÃO DE PUBLICAÇÃO DO EXERCÍCIO - ${currentTab}`,
            anexoNome: `${currentTab.replace(/[\s\(\)\/]/g, '_')}_Relatorio_2026.pdf`,
            anexoTamanho: '620 KB',
            signatario: 'Secretaria Municipal de Administração',
            cargoSignatario: 'Administração Geral',
            textoIntegral: `RELATÓRIO E PRESTAÇÃO DE CONTAS - ${currentTab}\nMUNICÍPIO DE SÃO MIGUEL DO TOCANTINS\n\nPublicação regular no Diário Oficial e disponibilização imediata aos órgãos de controle (TCE-TO / MPC) e cidadãos.`
          }
        ];

        if (params?.search && params.search.trim()) {
          const s = params.search.toLowerCase();
          docs = docs.filter(
            (d) =>
              d.numero.toLowerCase().includes(s) ||
              d.ementa.toLowerCase().includes(s) ||
              d.secao.toLowerCase().includes(s)
          );
        }
      }

      if (params?.ano && params.ano !== 'Todos') {
        docs = docs.filter((d) => d.ano === params.ano);
      }

      return docs;
    }

    // Real API call
    const query = new URLSearchParams();
    query.set('group', groupId);
    if (params?.tab) query.set('tab', params.tab);
    if (params?.search) query.set('search', params.search);
    if (params?.ano && params.ano !== 'Todos') query.set('ano', params.ano);

    const res = await apiClient.request<PaginatedResponse<DocumentoOficialDTO> | DocumentoOficialDTO[]>(
      `${apiConfig.endpoints.documentos}?${query.toString()}`
    );
    return Array.isArray(res) ? res : res.results;
  },

  async getDocumentoById(id: string): Promise<DocumentoOficialDTO | null> {
    if (apiClient.isMockEnabled()) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const found = TODAS_CONSULTAS_MOCK.find((d) => d.id === id);
      return found || null;
    }

    return await apiClient.request<DocumentoOficialDTO>(
      `${apiConfig.endpoints.documentos}${id}/`
    );
  },
};
