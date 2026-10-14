import { apiClient } from './api.client';
import { apiConfig } from '../config/site.config';
import { ContratoDTO, PaginatedResponse } from '../types/api.types';
import { CONTRATOS_MOCK } from '../data/mock/contratos.mock';

export const contratosService = {
  async getContratos(params?: { search?: string; status?: string }): Promise<ContratoDTO[]> {
    if (apiClient.isMockEnabled()) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      let data = [...CONTRATOS_MOCK];
      if (params?.search) {
        const q = params.search.toLowerCase();
        data = data.filter(
          (c) =>
            c.numero.toLowerCase().includes(q) ||
            c.objeto.toLowerCase().includes(q) ||
            c.contratado.toLowerCase().includes(q) ||
            c.cnpj.includes(q)
        );
      }
      if (params?.status) {
        data = data.filter((c) => c.status.toLowerCase() === params.status?.toLowerCase());
      }
      return data;
    }

    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.status) query.set('status', params.status);
    const queryStr = query.toString() ? `?${query.toString()}` : '';

    const res = await apiClient.request<PaginatedResponse<ContratoDTO> | ContratoDTO[]>(
      `${apiConfig.endpoints.contratos}${queryStr}`
    );
    return Array.isArray(res) ? res : res.results;
  },
};
