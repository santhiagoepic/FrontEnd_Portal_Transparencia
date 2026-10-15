import { apiClient } from './api.client';
import { apiConfig } from '../config/site.config';
import { 
  PedidoEsicDTO, 
  SolicitacaoEsicInput, 
  EstatisticasEsic, 
  InformacaoClassificadaDTO, 
  InformacaoDesclassificadaDTO 
} from '../types/esic.types';
import { 
  PEDIDOS_ESIC_MOCK, 
  ESTATISTICAS_ESIC_MOCK, 
  INFORMACOES_CLASSIFICADAS_MOCK, 
  INFORMACOES_DESCLASSIFICADAS_MOCK 
} from '../data/mock/esic.mock';

let pedidosStore: PedidoEsicDTO[] = [...PEDIDOS_ESIC_MOCK];

export const esicService = {
  async getEstatisticas(): Promise<EstatisticasEsic> {
    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 250));
      return ESTATISTICAS_ESIC_MOCK;
    }
    return apiClient.get<EstatisticasEsic>('/esic/estatisticas/');
  },

  async consultarPedido(protocolo: string, codigoAcesso: string): Promise<PedidoEsicDTO> {
    const cleanProtocolo = protocolo.trim().toUpperCase();
    const cleanCodigo = codigoAcesso.trim().toUpperCase();

    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 350));
      const found = pedidosStore.find(
        p => p.protocolo.toUpperCase() === cleanProtocolo &&
             p.codigoAcesso.toUpperCase() === cleanCodigo
      );
      if (!found) {
        throw new Error('Pedido e-SIC não encontrado. Verifique se o protocolo e o código de acesso estão corretos.');
      }
      return found;
    }

    return apiClient.get<PedidoEsicDTO>(`/esic/pedidos/consulta/?protocolo=${encodeURIComponent(cleanProtocolo)}&codigo=${encodeURIComponent(cleanCodigo)}`);
  },

  async registrarSolicitacao(input: SolicitacaoEsicInput): Promise<{ protocolo: string; codigoAcesso: string; pedido: PedidoEsicDTO }> {
    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 600));

      const seq = Math.floor(100 + Math.random() * 900);
      const protocolo = `SIC-${new Date().getFullYear()}-${seq.toString().padStart(5, '0')}`;
      const codigoAcesso = `SIC-${Math.floor(1000 + Math.random() * 9000)}`;

      const dataHoje = new Date();
      const prazoData = new Date();
      prazoData.setDate(dataHoje.getDate() + 20); // 20 days by LAI

      const novoPedido: PedidoEsicDTO = {
        id: `esic-new-${Date.now()}`,
        protocolo,
        codigoAcesso,
        assunto: input.assunto,
        descricao: input.descricao,
        dataAbertura: dataHoje.toLocaleDateString('pt-BR'),
        prazoResposta: prazoData.toLocaleDateString('pt-BR'),
        prorrogado: false,
        status: 'Aguardando Análise',
        formaRecebimento: input.formaRecebimento,
        orgaoDestino: input.orgaoDestino || 'Serviço de Informação ao Cidadão - SIC',
        solicitante: {
          nome: input.solicitante.nome,
          email: input.solicitante.email,
          telefone: input.solicitante.telefone,
          cpfCnpj: input.solicitante.cpfCnpj,
          cidade: input.solicitante.cidade || 'São Miguel do Tocantins'
        },
        recursos: [],
        historico: [
          {
            data: dataHoje.toLocaleDateString('pt-BR'),
            hora: dataHoje.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            orgao: 'SIC Central',
            acao: 'Recepção de Pedido LAI',
            descricao: 'Pedido de acesso à informação registrado e autuado no e-SIC do município.',
            status: 'Aguardando Análise'
          }
        ]
      };

      pedidosStore = [novoPedido, ...pedidosStore];
      return { protocolo, codigoAcesso, pedido: novoPedido };
    }

    return apiClient.post('/esic/pedidos/', input);
  },

  async interporRecurso(pedidoId: string, justificativa: string, instancia: '1ª Instância' | '2ª Instância'): Promise<PedidoEsicDTO> {
    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 400));
      const pedido = pedidosStore.find(p => p.id === pedidoId);
      if (!pedido) throw new Error('Pedido não localizado para recurso.');

      const dataHoje = new Date();
      pedido.recursos.push({
        instancia,
        dataAbertura: dataHoje.toLocaleDateString('pt-BR'),
        justificativa,
        status: 'Em análise'
      });
      pedido.status = 'Em Recurso';
      pedido.historico.push({
        data: dataHoje.toLocaleDateString('pt-BR'),
        hora: dataHoje.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        orgao: instancia === '1ª Instância' ? 'Secretaria da Pasta' : 'Gabinete do Prefeito',
        acao: `Recurso em ${instancia}`,
        descricao: `Cidadão interpôs recurso formal contra a resposta do pedido. Prazo de julgamento de 5 dias.`,
        status: 'Em Recurso'
      });

      return { ...pedido };
    }

    return apiClient.post(`/esic/pedidos/${pedidoId}/recurso/`, { justificativa, instancia });
  },

  async getClassificadas(params?: { search?: string; ano?: string }): Promise<InformacaoClassificadaDTO[]> {
    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 200));
      let items = [...INFORMACOES_CLASSIFICADAS_MOCK];
      if (params?.search) {
        const q = params.search.toLowerCase();
        items = items.filter(i => 
          i.assunto.toLowerCase().includes(q) || 
          i.dispositivoLegal.toLowerCase().includes(q) ||
          i.orgaoResponsavel.toLowerCase().includes(q)
        );
      }
      return items;
    }

    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    return apiClient.get<InformacaoClassificadaDTO[]>(`/esic/classificadas/?${query.toString()}`);
  },

  async getDesclassificadas(params?: { search?: string; ano?: string }): Promise<InformacaoDesclassificadaDTO[]> {
    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 200));
      let items = [...INFORMACOES_DESCLASSIFICADAS_MOCK];
      if (params?.search) {
        const q = params.search.toLowerCase();
        items = items.filter(i => 
          i.assunto.toLowerCase().includes(q) || 
          i.motivo.toLowerCase().includes(q) ||
          i.orgaoResponsavel.toLowerCase().includes(q)
        );
      }
      return items;
    }

    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    return apiClient.get<InformacaoDesclassificadaDTO[]>(`/esic/desclassificadas/?${query.toString()}`);
  }
};
