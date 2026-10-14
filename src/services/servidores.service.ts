import { apiClient } from './api.client';
import { apiConfig } from '../config/site.config';
import { ServidorDTO, PaginatedResponse } from '../types/api.types';
import { SERVIDORES_MOCK } from '../data/mock/servidores.mock';

export const servidoresService = {
  async getServidores(params?: { search?: string; cargo?: string }): Promise<ServidorDTO[]> {
    if (apiClient.isMockEnabled()) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      let data = [...SERVIDORES_MOCK];
      if (params?.search) {
        const q = params.search.toLowerCase();
        data = data.filter(
          (s) =>
            s.nome.toLowerCase().includes(q) ||
            s.matricula.includes(q) ||
            s.cargo.toLowerCase().includes(q) ||
            s.lotacao.toLowerCase().includes(q)
        );
      }
      return data;
    }

    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    const queryStr = query.toString() ? `?${query.toString()}` : '';

    const res = await apiClient.request<PaginatedResponse<ServidorDTO> | ServidorDTO[]>(
      `${apiConfig.endpoints.servidores}${queryStr}`
    );
    return Array.isArray(res) ? res : res.results;
  },
};
