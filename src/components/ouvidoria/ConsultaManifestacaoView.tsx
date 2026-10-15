import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  Calendar, 
  Building, 
  User, 
  FileText, 
  ArrowLeft,
  ShieldCheck,
  Download
} from 'lucide-react';
import { ManifestacaoDTO } from '../../types/ouvidoria.types';
import { useToast } from '../Toast';

interface ConsultaManifestacaoViewProps {
  manifestacao: ManifestacaoDTO | null;
  isLoading: boolean;
  error: string | null;
  onConsultar: (protocolo: string, codigo: string) => Promise<any>;
  onLimpar: () => void;
}

export const ConsultaManifestacaoView: React.FC<ConsultaManifestacaoViewProps> = ({
  manifestacao,
  isLoading,
  error,
  onConsultar,
  onLimpar,
}) => {
  const { success, error: toastError } = useToast();
  const [protocolo, setProtocolo] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!protocolo.trim() || !codigo.trim()) {
      toastError('Informe o número do protocolo e o código de acesso.');
      return;
    }
    try {
      await onConsultar(protocolo, codigo);
      success('Manifestação localizada com sucesso!');
    } catch (err: any) {
      toastError(err?.message || 'Manifestação não encontrada.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Respondida':
      case 'Concluída':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Em tramitação':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Em análise':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search Box / Credentials Input Form */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs">
        <div className="max-w-xl mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-[#0c2340] text-center mb-1">
            Consultar Andamento de Manifestação
          </h3>
          <p className="text-xs text-slate-500 text-center mb-5">
            Digite o número do protocolo e o código de acesso fornecidos no momento do registro.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="protocolo-input" className="block text-xs font-bold text-slate-700 mb-1">
                  Número do Protocolo
                </label>
                <input
                  id="protocolo-input"
                  type="text"
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                  placeholder="Ex: OUV-2026-00412"
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-slate-900 uppercase"
                  required
                />
              </div>

              <div>
                <label htmlFor="codigo-input" className="block text-xs font-bold text-slate-700 mb-1">
                  Código de Acesso
                </label>
                <input
                  id="codigo-input"
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ex: SMT-8849"
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-slate-900 uppercase"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400">
                Dica de teste rápido: <strong>OUV-2026-00412</strong> / <strong>SMT-8849</strong>
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {manifestacao && (
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
                      <span>Consultar Manifestação</span>
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

      {/* Manifestação Details when Found */}
      {manifestacao && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${getStatusBadge(manifestacao.status)}`}>
                  {manifestacao.status}
                </span>
                <span className="text-xs font-mono font-bold text-slate-700">
                  Protocolo: {manifestacao.protocolo}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  Aberta em: {manifestacao.dataAbertura}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#0c2340] mt-1.5">
                {manifestacao.assunto}
              </h3>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition cursor-pointer self-start sm:self-center"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Imprimir Espelho</span>
            </button>
          </div>

          {/* Details Table separated ONLY by horizontal lines (strict rule) */}
          <div className="divide-y divide-slate-200 text-xs sm:text-[13px]">
            
            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <span className="font-bold text-slate-800 w-36 shrink-0">Modalidade:</span>
              <span className="font-bold uppercase text-teal-800">{manifestacao.modalidade}</span>
            </div>

            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <span className="font-bold text-slate-800 w-36 shrink-0">Prazo Legal de Resposta:</span>
              <span className="text-slate-700 font-medium">{manifestacao.prazoResposta}</span>
            </div>

            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <span className="font-bold text-slate-800 w-36 shrink-0">Órgão Destinatário:</span>
              <span className="text-slate-700">{manifestacao.orgaoDestino}</span>
            </div>

            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <span className="font-bold text-slate-800 w-36 shrink-0">Identificação do Autor:</span>
              <span className="text-slate-700 font-medium">
                {manifestacao.isAnonimo ? 'Anônimo (identidade protegida por lei)' : `${manifestacao.solicitante?.nome} (${manifestacao.solicitante?.cpf || manifestacao.solicitante?.email})`}
              </span>
            </div>

            <div className="py-2.5 flex flex-col gap-1.5">
              <span className="font-bold text-slate-800">Teor da Manifestação:</span>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-800 leading-relaxed text-justify">
                {manifestacao.descricao}
              </div>
            </div>

            {/* Official Response if available */}
            {manifestacao.resposta && (
              <div className="py-3 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-900 text-sm">Resposta Oficial da Administração Pública:</span>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl text-slate-800 space-y-2 text-xs sm:text-[13px] leading-relaxed">
                  <p className="text-justify">{manifestacao.resposta.texto}</p>
                  <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-800">
                    <span><strong>Responsável:</strong> {manifestacao.resposta.responsavel} ({manifestacao.resposta.cargo})</span>
                    <span>Emitida em: {manifestacao.resposta.data}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline / Histórico de Tramitação */}
            <div className="py-4 flex flex-col gap-3">
              <span className="font-bold text-slate-800 text-sm">Histórico de Tramitação e Atos:</span>
              
              <div className="space-y-3">
                {manifestacao.historico.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3 pl-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-600 mt-1.5 shrink-0 ring-4 ring-teal-100" />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-800 text-xs">{h.status}</span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-slate-500 text-xs font-mono">{h.data} às {h.hora}</span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-xs text-teal-800 font-medium">{h.setor}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{h.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
