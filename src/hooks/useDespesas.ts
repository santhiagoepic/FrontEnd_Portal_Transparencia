import { useState, useEffect, useCallback } from 'react';
import { DespesaDTO, QueryState } from '../types/api.types';
import { despesasService } from '../services/despesas.service';

export function useDespesas(initialParams?: { search?: string; fase?: string }) {
  const [data, setData] = useState<DespesaDTO[]>([]);
  const [state, setState] = useState<QueryState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchDespesas = useCallback(async (params?: { search?: string; fase?: string }) => {
    setState('loading');
    setError(null);
    try {
      const results = await despesasService.getDespesas(params);
      setData(results);
      setState(results.length === 0 ? 'empty' : 'success');
    } catch (err: any) {
      setError(err.message || 'Falha ao carregar dados de despesas.');
      setState('error');
    }
  }, []);

  useEffect(() => {
    fetchDespesas(initialParams);
  }, [fetchDespesas, initialParams?.search, initialParams?.fase]);

  return {
    despesas: data,
    state,
    isLoading: state === 'loading',
    isError: state === 'error',
    isEmpty: state === 'empty',
    error,
    refetch: () => fetchDespesas(initialParams),
  };
}
