import { apiClient } from './api.client';
import { apiConfig } from '../config/site.config';
import { ReceitaDTO, PaginatedResponse } from '../types/api.types';
import { RECEITAS_MOCK } from '../data/mock/receitas.mock';

export const receitasService = {
  async getReceitas(params?: { search?: string; exercicio?: number }): Promise<ReceitaDTO[]> {
    if (apiClient.isMockEnabled()) {
      // Simulate real async delay
      await new Promise((resolve) => setTimeout(resolve, 180));
      let data = [...RECEITAS_MOCK];
      if (params?.search) {
        const q = params.search.toLowerCase();
        data = data.filter(
          (r) =>
            r.descricao.toLowerCase().includes(q) ||
            r.codigo.includes(q) ||
            r.categoria.toLowerCase().includes(q)
        );
      }
      if (params?.exercicio) {
        data = data.filter((r) => r.exercicio === params.exercicio);
      }
      return data;
    }

    // Call real Django REST Framework API
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.exercicio) query.set('exercicio', params.exercicio.toString());
    const queryStr = query.toString() ? `?${query.toString()}` : '';

    const res = await apiClient.request<PaginatedResponse<ReceitaDTO> | ReceitaDTO[]>(
      `${apiConfig.endpoints.receitas}${queryStr}`
    );
    return Array.isArray(res) ? res : res.results;
  },
};
