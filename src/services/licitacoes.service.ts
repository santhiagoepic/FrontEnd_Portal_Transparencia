import { apiClient } from './api.client';
import { apiConfig } from '../config/site.config';
import { LicitacaoDTO, PaginatedResponse } from '../types/api.types';
import { LICITACOES_MOCK } from '../data/mock/licitacoes.mock';

export const licitacoesService = {
  async getLicitacoes(params?: { search?: string; status?: string }): Promise<LicitacaoDTO[]> {
    if (apiClient.isMockEnabled()) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      let data = [...LICITACOES_MOCK];
      if (params?.search) {
        const q = params.search.toLowerCase();
        data = data.filter(
          (l) =>
            l.numero.toLowerCase().includes(q) ||
            l.objeto.toLowerCase().includes(q) ||
            l.modalidade.toLowerCase().includes(q)
        );
      }
      if (params?.status) {
        data = data.filter((l) => l.status.toLowerCase() === params.status?.toLowerCase());
      }
      return data;
    }

    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.status) query.set('status', params.status);
    const queryStr = query.toString() ? `?${query.toString()}` : '';

    const res = await apiClient.request<PaginatedResponse<LicitacaoDTO> | LicitacaoDTO[]>(
      `${apiConfig.endpoints.licitacoes}${queryStr}`
    );
    return Array.isArray(res) ? res : res.results;
  },
};
