import { useState, useEffect, useCallback } from 'react';
import { 
  EstatisticasEsic, 
  PedidoEsicDTO, 
  SolicitacaoEsicInput, 
  InformacaoClassificadaDTO, 
  InformacaoDesclassificadaDTO 
} from '../types/esic.types';
import { QueryState } from '../types/api.types';
import { esicService } from '../services/esic.service';

export function useEsic() {
  const [estatisticas, setEstatisticas] = useState<EstatisticasEsic | null>(null);
  const [estatisticasState, setEstatisticasState] = useState<QueryState>('idle');

  const [pedidoConsultado, setPedidoConsultado] = useState<PedidoEsicDTO | null>(null);
  const [consultaState, setConsultaState] = useState<QueryState>('idle');
  const [consultaError, setConsultaError] = useState<string | null>(null);

  const [classificadas, setClassificadas] = useState<InformacaoClassificadaDTO[]>([]);
  const [classificadasState, setClassificadasState] = useState<QueryState>('idle');

  const [desclassificadas, setDesclassificadas] = useState<InformacaoDesclassificadaDTO[]>([]);
  const [desclassificadasState, setDesclassificadasState] = useState<QueryState>('idle');

  const [envioLoading, setEnvioLoading] = useState(false);
  const [recursoLoading, setRecursoLoading] = useState(false);

  // Carregar estatísticas
  const carregarEstatisticas = useCallback(async () => {
    setEstatisticasState('loading');
    try {
      const data = await esicService.getEstatisticas();
      setEstatisticas(data);
      setEstatisticasState('success');
    } catch {
      setEstatisticasState('error');
    }
  }, []);

  // Consultar por protocolo
  const consultar = useCallback(async (protocolo: string, codigoAcesso: string) => {
    setConsultaState('loading');
    setConsultaError(null);
    try {
      const doc = await esicService.consultarPedido(protocolo, codigoAcesso);
      setPedidoConsultado(doc);
      setConsultaState('success');
      return doc;
    } catch (err: any) {
      setConsultaState('error');
      setConsultaError(err?.message || 'Erro ao consultar pedido');
      setPedidoConsultado(null);
      throw err;
    }
  }, []);

  // Registrar pedido
  const registrar = useCallback(async (input: SolicitacaoEsicInput) => {
    setEnvioLoading(true);
    try {
      const result = await esicService.registrarSolicitacao(input);
      setEnvioLoading(false);
      return result;
    } catch (err: any) {
      setEnvioLoading(false);
      throw err;
    }
  }, []);

  // Interpor recurso
  const interporRecurso = useCallback(async (pedidoId: string, justificativa: string, instancia: '1ª Instância' | '2ª Instância') => {
    setRecursoLoading(true);
    try {
      const updated = await esicService.interporRecurso(pedidoId, justificativa, instancia);
      setPedidoConsultado(updated);
      setRecursoLoading(false);
      return updated;
    } catch (err: any) {
      setRecursoLoading(false);
      throw err;
    }
  }, []);

  // Carregar classificadas
  const carregarClassificadas = useCallback(async (params?: { search?: string }) => {
    setClassificadasState('loading');
    try {
      const data = await esicService.getClassificadas(params);
      setClassificadas(data);
      setClassificadasState(data.length === 0 ? 'empty' : 'success');
    } catch {
      setClassificadasState('error');
    }
  }, []);

  // Carregar desclassificadas
  const carregarDesclassificadas = useCallback(async (params?: { search?: string }) => {
    setDesclassificadasState('loading');
    try {
      const data = await esicService.getDesclassificadas(params);
      setDesclassificadas(data);
      setDesclassificadasState(data.length === 0 ? 'empty' : 'success');
    } catch {
      setDesclassificadasState('error');
    }
  }, []);

  useEffect(() => {
    carregarEstatisticas();
    carregarClassificadas();
    carregarDesclassificadas();
  }, [carregarEstatisticas, carregarClassificadas, carregarDesclassificadas]);

  return {
    estatisticas,
    estatisticasState,
    pedidoConsultado,
    consultaState,
    consultaError,
    classificadas,
    classificadasState,
    desclassificadas,
    desclassificadasState,
    envioLoading,
    recursoLoading,
    consultar,
    registrar,
    interporRecurso,
    carregarClassificadas,
    carregarDesclassificadas,
    limparConsulta: () => {
      setPedidoConsultado(null);
      setConsultaState('idle');
      setConsultaError(null);
    }
  };
}
