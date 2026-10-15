import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Calendar, 
  Building, 
  User, 
  FileText, 
  ShieldAlert,
  ArrowRight,
  Clock,
  Send
} from 'lucide-react';
import { PedidoEsicDTO } from '../../types/esic.types';
import { useToast } from '../Toast';

interface AcompanhamentoEsicViewProps {
  pedido: PedidoEsicDTO | null;
  isLoading: boolean;
  error: string | null;
  onConsultar: (protocolo: string, codigo: string) => Promise<any>;
  onInterporRecurso: (pedidoId: string, justificativa: string, instancia: '1ª Instância' | '2ª Instância') => Promise<any>;
  onLimpar: () => void;
}

export const AcompanhamentoEsicView: React.FC<AcompanhamentoEsicViewProps> = ({
  pedido,
  isLoading,
  error,
  onConsultar,
  onInterporRecurso,
  onLimpar,
}) => {
  const { success, info, error: toastError } = useToast();
  const [protocolo, setProtocolo] = useState('');
  const [codigo, setCodigo] = useState('');

  // Recurso form state
  const [recursoOpen, setRecursoOpen] = useState(false);
  const [instancia, setInstancia] = useState<'1ª Instância' | '2ª Instância'>('1ª Instância');
  const [justificativa, setJustificativa] = useState('');
  const [isSubmittingRecurso, setIsSubmittingRecurso] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!protocolo.trim() || !codigo.trim()) {
      toastError('Informe o protocolo e o código de acesso e-SIC.');
      return;
    }
    try {
      await onConsultar(protocolo, codigo);
      success('Pedido e-SIC localizado com sucesso!');
    } catch (err: any) {
      toastError(err?.message || 'Pedido não localizado.');
    }
  };

  const handleSendRecurso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!justificativa.trim() || justificativa.trim().length < 20) {
      toastError('A fundamentação do recurso deve conter ao menos 20 caracteres.');
      return;
    }
    if (!pedido) return;

    setIsSubmittingRecurso(true);
    try {
      await onInterporRecurso(pedido.id, justificativa, instancia);
      success(`Recurso em ${instancia} protocolado com sucesso!`);
      setRecursoOpen(false);
      setJustificativa('');
    } catch (err: any) {
      toastError(err?.message || 'Falha ao interpor recurso.');
    } finally {
      setIsSubmittingRecurso(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Respondido':
      case 'Concluído':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Em Tramitação':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Aguardando Análise':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Em Recurso':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Indeferido':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search Input Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs">
        <div className="max-w-xl mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-[#0c2340] text-center mb-1">
            Acompanhamento de Pedido de Informação (e-SIC)
          </h3>
          <p className="text-xs text-slate-500 text-center mb-5">
            Insira os dados gerados no protocolo para visualizar as respostas e o histórico do seu pedido.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="esic-proto" className="block text-xs font-bold text-slate-700 mb-1">
                  Número do Protocolo
                </label>
                <input
                  id="esic-proto"
                  type="text"
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                  placeholder="Ex: SIC-2026-00085"
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-slate-900 uppercase"
                  required
                />
              </div>

              <div>
                <label htmlFor="esic-code" className="block text-xs font-bold text-slate-700 mb-1">
                  Código de Acesso
                </label>
                <input
                  id="esic-code"
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ex: SIC-7712"
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-slate-900 uppercase"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400">
                Teste rápido: <strong>SIC-2026-00085</strong> / <strong>SIC-7712</strong>
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {pedido && (
                  <button
                    type="button"
                    onClick={onLimpar}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
                  >
                    Limpar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-5 py-2 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Consultando...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Localizar Pedido</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pedido Details View */}
      {pedido && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${getStatusBadge(pedido.status)}`}>
                  {pedido.status}
                </span>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {pedido.protocolo}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  Aberto em: {pedido.dataAbertura}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#0c2340] mt-1.5">
                {pedido.assunto}
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Imprimir</span>
              </button>
            </div>
          </div>

          {/* Details Table separated ONLY by horizontal lines (strict rule) */}
          <div className="divide-y divide-slate-200 text-xs sm:text-[13px]">
            
            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <span className="font-bold text-slate-800 w-36 shrink-0">Órgão Destino:</span>
              <span className="text-slate-700 text-right">{pedido.orgaoDestino}</span>
            </div>

            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <span className="font-bold text-slate-800 w-36 shrink-0">Prazo Legal (LAI):</span>
              <div className="text-right">
                <span className="text-slate-700 font-medium">{pedido.prazoResposta}</span>
                {pedido.prorrogado && (
                  <span className="block text-[11px] text-amber-700 font-semibold">
                    (Prorrogado: {pedido.motivoProrrogacao || 'Complexidade técnica'})
                  </span>
                )}
              </div>
            </div>

            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <span className="font-bold text-slate-800 w-36 shrink-0">Solicitante:</span>
              <span className="text-slate-700 font-medium">
                {pedido.solicitante.nome} ({pedido.solicitante.cpfCnpj})
              </span>
            </div>

            <div className="py-2.5 flex flex-col gap-1.5">
              <span className="font-bold text-slate-800">Especificação do Pedido:</span>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-800 leading-relaxed text-justify">
                {pedido.descricao}
              </div>
            </div>

            {/* Official Answer */}
            {pedido.resposta && (
              <div className="py-3 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-900 text-sm">
                    Resposta Conclusiva do e-SIC ({pedido.resposta.parecer})
                  </span>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl text-slate-800 space-y-2 text-xs sm:text-[13px] leading-relaxed">
                  <p className="text-justify">{pedido.resposta.texto}</p>
                  {pedido.resposta.fundamentacaoLegal && (
                    <div className="text-[11px] text-emerald-900 font-medium bg-white/70 p-2 rounded border border-emerald-200">
                      <strong>Fundamentação Legal:</strong> {pedido.resposta.fundamentacaoLegal}
                    </div>
                  )}
                  <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-800">
                    <span><strong>Responsável:</strong> {pedido.resposta.responsavel} ({pedido.resposta.cargo})</span>
                    <span>Emitida em: {pedido.resposta.data}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recursos interpostos */}
            {pedido.recursos && pedido.recursos.length > 0 && (
              <div className="py-3 space-y-2">
                <span className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-purple-700" />
                  <span>Recursos Interpostos:</span>
                </span>
                {pedido.recursos.map((rec, idx) => (
                  <div key={idx} className="bg-purple-50 border border-purple-200 p-3 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-purple-900">
                      <span>{rec.instancia}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-purple-200 text-[11px]">
                        Status: {rec.status}
                      </span>
                    </div>
                    <p className="text-slate-700"><strong>Justificativa do Cidadão:</strong> {rec.justificativa}</p>
                    <span className="text-[10px] text-slate-500 block">Interposto em: {rec.dataAbertura}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tramitação */}
            <div className="py-4 flex flex-col gap-3">
              <span className="font-bold text-slate-800 text-sm">Histórico de Tramitação e Despachos:</span>
              <div className="space-y-3">
                {pedido.historico.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3 pl-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-600 mt-1.5 shrink-0 ring-4 ring-teal-100" />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-800 text-xs">{h.acao}</span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-slate-500 text-xs font-mono">{h.data} às {h.hora}</span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-xs text-teal-800 font-medium">{h.orgao}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{h.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recurso Trigger Option */}
            <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-600">
                <strong className="text-slate-800">Não ficou satisfeito com a resposta ou houve recusa injustificada?</strong>
                <p>Você pode interpor recurso à autoridade hierarquicamente superior no prazo de 10 dias.</p>
              </div>
              <button
                type="button"
                onClick={() => setRecursoOpen(true)}
                className="px-4 py-2 text-xs font-bold text-purple-900 bg-purple-100 hover:bg-purple-200 border border-purple-300 rounded-lg transition cursor-pointer shrink-0 shadow-2xs"
              >
                Interpor Recurso
              </button>
            </div>

          </div>

          {/* Modal de Recurso */}
          {recursoOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="font-bold text-base text-slate-900">
                    Interposição de Recurso LAI
                  </h4>
                  <button onClick={() => setRecursoOpen(false)} className="text-slate-400 hover:text-slate-700">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSendRecurso} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Instância Recursal
                    </label>
                    <select
                      value={instancia}
                      onChange={(e) => setInstancia(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="1ª Instância">1ª Instância - Secretário Municipal da Pasta</option>
                      <option value="2ª Instância">2ª Instância - Gabinete do Prefeito Municipal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Razões do Recurso / Justificativa <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={justificativa}
                      onChange={(e) => setJustificativa(e.target.value)}
                      placeholder="Indique as razões pelas quais a resposta fornecida não atende ao pedido ou os fundamentos da discordância..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setRecursoOpen(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingRecurso}
                      className="px-4 py-2 text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition"
                    >
                      {isSubmittingRecurso ? 'Enviando...' : 'Protocolar Recurso'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
