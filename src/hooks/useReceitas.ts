import { useState, useEffect, useCallback } from 'react';
import { ReceitaDTO, QueryState } from '../types/api.types';
import { receitasService } from '../services/receitas.service';

export function useReceitas(initialParams?: { search?: string; exercicio?: number }) {
  const [data, setData] = useState<ReceitaDTO[]>([]);
  const [state, setState] = useState<QueryState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchReceitas = useCallback(async (params?: { search?: string; exercicio?: number }) => {
    setState('loading');
    setError(null);
    try {
      const results = await receitasService.getReceitas(params);
      setData(results);
      setState(results.length === 0 ? 'empty' : 'success');
    } catch (err: any) {
      setError(err.message || 'Falha ao carregar dados de receitas.');
      setState('error');
    }
  }, []);

  useEffect(() => {
    fetchReceitas(initialParams);
  }, [fetchReceitas, initialParams?.search, initialParams?.exercicio]);

  return {
    receitas: data,
    state,
    isLoading: state === 'loading',
    isError: state === 'error',
    isEmpty: state === 'empty',
    error,
    refetch: () => fetchReceitas(initialParams),
  };
}
