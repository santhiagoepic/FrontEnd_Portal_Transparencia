import { useState, useEffect, useCallback } from 'react';
import { DocumentoOficialDTO, QueryState } from '../types/api.types';
import { documentosService } from '../services/documentos.service';

interface UseGroupDocumentsParams {
  groupId: string;
  tab?: string;
  search?: string;
  ano?: string;
}

export function useGroupDocuments({ groupId, tab, search, ano }: UseGroupDocumentsParams) {
  const [documents, setDocuments] = useState<DocumentoOficialDTO[]>([]);
  const [state, setState] = useState<QueryState>('loading');
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setState('loading');
    setError(null);
    try {
      const results = await documentosService.getDocumentosByGroup(groupId, {
        tab,
        search,
        ano,
      });
      setDocuments(results);
      setState(results.length === 0 ? 'empty' : 'success');
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar os documentos oficiais.');
      setState('error');
    }
  }, [groupId, tab, search, ano]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    state,
    isLoading: state === 'loading',
    isError: state === 'error',
    isEmpty: state === 'empty',
    error,
    refetch: fetchDocuments,
  };
}
