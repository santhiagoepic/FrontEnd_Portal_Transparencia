import { useState, useEffect, useCallback } from 'react';
import { 
  EstatisticasOuvidoria, 
  CartaServicoDTO, 
  ManifestacaoDTO, 
  ManifestacaoInput 
} from '../types/ouvidoria.types';
import { QueryState } from '../types/api.types';
import { ouvidoriaService } from '../services/ouvidoria.service';

export function useOuvidoria() {
  const [estatisticas, setEstatisticas] = useState<EstatisticasOuvidoria | null>(null);
  const [estatisticasState, setEstatisticasState] = useState<QueryState>('idle');

  const [cartaServicos, setCartaServicos] = useState<CartaServicoDTO[]>([]);
  const [cartaState, setCartaState] = useState<QueryState>('idle');

  const [manifestacaoConsultada, setManifestacaoConsultada] = useState<ManifestacaoDTO | null>(null);
  const [consultaState, setConsultaState] = useState<QueryState>('idle');
  const [consultaError, setConsultaError] = useState<string | null>(null);

  const [envioLoading, setEnvioLoading] = useState(false);

  // Load stats
  const carregarEstatisticas = useCallback(async () => {
    setEstatisticasState('loading');
    try {
      const data = await ouvidoriaService.getEstatisticas();
      setEstatisticas(data);
      setEstatisticasState('success');
    } catch (err: any) {
      setEstatisticasState('error');
    }
  }, []);

  // Load Carta de Serviços
  const carregarCartaServicos = useCallback(async (params?: { search?: string; tipo?: string }) => {
    setCartaState('loading');
    try {
      const data = await ouvidoriaService.getCartaServicos(params);
      setCartaServicos(data);
      setCartaState(data.length === 0 ? 'empty' : 'success');
    } catch (err: any) {
      setCartaState('error');
    }
  }, []);

  // Consultar manifestacao
  const consultar = useCallback(async (protocolo: string, codigoAcesso: string) => {
    setConsultaState('loading');
    setConsultaError(null);
    try {
      const doc = await ouvidoriaService.consultarManifestacao(protocolo, codigoAcesso);
      setManifestacaoConsultada(doc);
      setConsultaState('success');
      return doc;
    } catch (err: any) {
      setConsultaState('error');
      setConsultaError(err?.message || 'Erro ao consultar manifestação');
      setManifestacaoConsultada(null);
      throw err;
    }
  }, []);

  // Registrar manifestação
  const registrar = useCallback(async (input: ManifestacaoInput) => {
    setEnvioLoading(true);
    try {
      const result = await ouvidoriaService.registrarManifestacao(input);
      setEnvioLoading(false);
      return result;
    } catch (err: any) {
      setEnvioLoading(false);
      throw err;
    }
  }, []);

  useEffect(() => {
    carregarEstatisticas();
    carregarCartaServicos();
  }, [carregarEstatisticas, carregarCartaServicos]);

  return {
    estatisticas,
    estatisticasState,
    cartaServicos,
    cartaState,
    manifestacaoConsultada,
    consultaState,
    consultaError,
    envioLoading,
    consultar,
    registrar,
    carregarCartaServicos,
    limparConsulta: () => {
      setManifestacaoConsultada(null);
      setConsultaState('idle');
      setConsultaError(null);
    }
  };
}
