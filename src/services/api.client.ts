import { apiConfig } from '../config/site.config';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = {
  isMockEnabled: (): boolean => {
    return apiConfig.useMocks;
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${apiConfig.baseUrl.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(options.headers || {}),
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `Falha na requisição ao servidor (${response.status} ${response.statusText})`,
          response.status
        );
      }

      return (await response.json()) as T;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new ApiError('Tempo limite de conexão excedido ao consultar o servidor da API.');
      }
      throw new ApiError(
        err.message || 'Erro de comunicação com o servidor de dados do município.'
      );
    }
  },

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  async post<T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
};
