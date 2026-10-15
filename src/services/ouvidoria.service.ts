import { apiClient } from './api.client';
import { apiConfig } from '../config/site.config';
import { 
  ManifestacaoDTO, 
  ManifestacaoInput, 
  EstatisticasOuvidoria, 
  CartaServicoDTO 
} from '../types/ouvidoria.types';
import { 
  MANIFESTACOES_MOCK, 
  ESTATISTICAS_OUVIDORIA_MOCK, 
  CARTA_SERVICOS_MOCK 
} from '../data/mock/ouvidoria.mock';

// Store in-memory for user-submitted items during runtime session
let manifestacoesStore: ManifestacaoDTO[] = [...MANIFESTACOES_MOCK];

export const ouvidoriaService = {
  async getEstatisticas(): Promise<EstatisticasOuvidoria> {
    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 250));
      return ESTATISTICAS_OUVIDORIA_MOCK;
    }
    return apiClient.get<EstatisticasOuvidoria>('/ouvidoria/estatisticas/');
  },

  async consultarManifestacao(protocolo: string, codigoAcesso: string): Promise<ManifestacaoDTO> {
    const cleanProtocolo = protocolo.trim().toUpperCase();
    const cleanCodigo = codigoAcesso.trim().toUpperCase();

    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 350));
      const found = manifestacoesStore.find(
        m => m.protocolo.toUpperCase() === cleanProtocolo &&
             m.codigoAcesso.toUpperCase() === cleanCodigo
      );
      if (!found) {
        throw new Error('Manifestação não encontrada. Verifique se o número do protocolo e o código de acesso estão corretos.');
      }
      return found;
    }

    return apiClient.get<ManifestacaoDTO>(`/ouvidoria/manifestacoes/consulta/?protocolo=${encodeURIComponent(cleanProtocolo)}&codigo=${encodeURIComponent(cleanCodigo)}`);
  },

  async registrarManifestacao(input: ManifestacaoInput): Promise<{ protocolo: string; codigoAcesso: string; manifestacao: ManifestacaoDTO }> {
    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 600));

      const seq = Math.floor(100 + Math.random() * 900);
      const protocolo = `OUV-${new Date().getFullYear()}-${seq.toString().padStart(5, '0')}`;
      const codigoAcesso = `SMT-${Math.floor(1000 + Math.random() * 9000)}`;

      const dataHoje = new Date();
      const prazoData = new Date();
      prazoData.setDate(dataHoje.getDate() + 30);

      const novaManifestacao: ManifestacaoDTO = {
        id: `ouv-new-${Date.now()}`,
        protocolo,
        codigoAcesso,
        modalidade: input.modalidade,
        assunto: input.assunto,
        descricao: input.descricao,
        dataAbertura: dataHoje.toLocaleDateString('pt-BR'),
        prazoResposta: prazoData.toLocaleDateString('pt-BR'),
        status: 'Em análise',
        isAnonimo: input.isAnonimo,
        solicitante: input.isAnonimo ? undefined : {
          nome: input.solicitante.nome,
          email: input.solicitante.email,
          telefone: input.solicitante.telefone,
          cpf: input.solicitante.cpf,
        },
        orgaoDestino: input.orgaoDestino || 'Ouvidoria Geral do Município',
        historico: [
          {
            data: dataHoje.toLocaleDateString('pt-BR'),
            hora: dataHoje.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            setor: 'Ouvidoria Geral',
            descricao: 'Manifestação protocolada com sucesso pelo cidadão através do Portal da Transparência.',
            status: 'Autuada'
          }
        ]
      };

      manifestacoesStore = [novaManifestacao, ...manifestacoesStore];
      return { protocolo, codigoAcesso, manifestacao: novaManifestacao };
    }

    return apiClient.post('/ouvidoria/manifestacoes/', input);
  },

  async getCartaServicos(params?: { search?: string; tipo?: string }): Promise<CartaServicoDTO[]> {
    if (apiConfig.useMocks) {
      await new Promise(res => setTimeout(res, 200));
      let items = [...CARTA_SERVICOS_MOCK];

      if (params?.search) {
        const q = params.search.toLowerCase();
        items = items.filter(
          item => item.titulo.toLowerCase().includes(q) ||
                  item.publicoAlvo.toLowerCase().includes(q) ||
                  item.responsavel.toLowerCase().includes(q)
        );
      }

      if (params?.tipo && params.tipo !== 'Todos') {
        items = items.filter(item => item.tipo.toLowerCase().includes(params.tipo!.toLowerCase()));
      }

      return items;
    }

    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.tipo) query.append('tipo', params.tipo);
    return apiClient.get<CartaServicoDTO[]>(`/ouvidoria/carta-servicos/?${query.toString()}`);
  }
};
