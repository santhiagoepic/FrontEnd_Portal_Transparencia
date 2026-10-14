import { apiClient } from './api.client';
import { apiConfig } from '../config/site.config';
import { DespesaDTO, PaginatedResponse } from '../types/api.types';
import { DESPESAS_MOCK } from '../data/mock/despesas.mock';

export const despesasService = {
  async getDespesas(params?: { search?: string; fase?: string }): Promise<DespesaDTO[]> {
    if (apiClient.isMockEnabled()) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      let data = [...DESPESAS_MOCK];
      if (params?.search) {
        const q = params.search.toLowerCase();
        data = data.filter(
          (d) =>
            d.empenho.toLowerCase().includes(q) ||
            d.credor.toLowerCase().includes(q) ||
            d.orgao.toLowerCase().includes(q) ||
            d.elemento.toLowerCase().includes(q)
        );
      }
      if (params?.fase) {
        data = data.filter((d) => d.fase.toLowerCase() === params.fase?.toLowerCase());
      }
      return data;
    }

    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.fase) query.set('fase', params.fase);
    const queryStr = query.toString() ? `?${query.toString()}` : '';

    const res = await apiClient.request<PaginatedResponse<DespesaDTO> | DespesaDTO[]>(
      `${apiConfig.endpoints.despesas}${queryStr}`
    );
    return Array.isArray(res) ? res : res.results;
  },
};
