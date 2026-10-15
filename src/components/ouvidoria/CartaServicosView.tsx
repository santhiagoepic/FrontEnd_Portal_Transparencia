import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Printer, 
  ChevronRight, 
  ArrowLeft, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  FileText, 
  Sparkles, 
  FileCheck2,
  Calendar,
  Filter
} from 'lucide-react';
import { CartaServicoDTO } from '../../types/ouvidoria.types';
import { useToast } from '../Toast';
import { Brasao } from '../Brasao';

interface CartaServicosViewProps {
  servicos: CartaServicoDTO[];
  isLoading: boolean;
  onBackToOuvidoria: () => void;
}

export const CartaServicosView: React.FC<CartaServicosViewProps> = ({
  servicos,
  isLoading,
  onBackToOuvidoria,
}) => {
  const { success, info } = useToast();
  const [search, setSearch] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('Todos');
  const [selectedPeriodo, setSelectedPeriodo] = useState('Todos');

  // Selected document for individual viewing
  const [selectedDoc, setSelectedDoc] = useState<CartaServicoDTO | null>(null);
  const [isPdfBlurred, setIsPdfBlurred] = useState(true);
  const [pdfZoom, setPdfZoom] = useState(100);
  const [pdfRotation, setPdfRotation] = useState(0);

  // Filter types available
  const tipos = ['Todos', 'Saúde', 'Educação', 'Infraestrutura e Serviços Públicos', 'Administração e Finanças', 'Assistência Social'];
  const periodos = ['Todos', '2026', '2025', '2024'];

  const filteredServicos = servicos.filter(s => {
    if (selectedTipo !== 'Todos' && !s.tipo.toLowerCase().includes(selectedTipo.toLowerCase())) {
      return false;
    }
    if (selectedPeriodo !== 'Todos') {
      const anoPub = s.dataPublicacao.split('/')[2];
      const anoRev = s.dataRevisao.split('/')[2];
      if (anoPub !== selectedPeriodo && anoRev !== selectedPeriodo) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = s.titulo.toLowerCase().includes(q) ||
                    s.publicoAlvo.toLowerCase().includes(q) ||
                    s.responsavel.toLowerCase().includes(q) ||
                    s.tipo.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleExportCSV = () => {
    info('Gerando arquivo CSV da Carta de Serviços...');
    const headers = ['Tipo', 'Título do Serviço', 'Data Publicação', 'Data Revisão', 'Órgão Responsável', 'Prazo'];
    const rows = filteredServicos.map(s => [
      `"${s.tipo}"`,
      `"${s.titulo}"`,
      `"${s.dataPublicacao}"`,
      `"${s.dataRevisao}"`,
      `"${s.responsavel}"`,
      `"${s.prazo}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `carta_servicos_sao_miguel_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Exportação CSV concluída com sucesso!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* View Header with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            <button 
              onClick={onBackToOuvidoria}
              className="hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para Ouvidoria</span>
            </button>
            <span>/</span>
            <span>Carta de Serviços</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c2340] tracking-tight">
            Carta de Serviços aos Usuários
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Informações sobre os serviços prestados pelos órgãos municipais de São Miguel do Tocantins, formas de acesso, prazos e compromissos de atendimento (Lei Federal nº 13.460/2017).
          </p>
        </div>

        {/* Export buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition cursor-pointer"
            title="Exportar listagem para CSV"
          >
            <Download className="w-3.5 h-3.5 text-teal-700" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition cursor-pointer"
            title="Imprimir lista"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* If a service document is selected: Individual Viewer with Left PDF Blur/Unblur & Right Metadata separated by lines */}
      {selectedDoc ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Top Bar for Selected Document */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <button
              onClick={() => {
                setSelectedDoc(null);
                setIsPdfBlurred(true);
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-300 px-3 py-1.5 rounded-lg transition cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para a Listagem de Serviços</span>
            </button>
            <span className="text-xs text-slate-500 font-mono">
              ID: {selectedDoc.id} • Revisão {selectedDoc.dataRevisao}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: PDF Document Viewer with Blur / Unblur toggle */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between bg-[#1e293b] text-white px-4 py-2 rounded-t-lg text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>Visualizador Oficial de Documento (PDF)</span>
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setPdfZoom(z => Math.max(70, z - 10))}
                    className="p-1 hover:bg-white/10 rounded transition cursor-pointer"
                    title="Diminuir Zoom"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono">{pdfZoom}%</span>
                  <button 
                    onClick={() => setPdfZoom(z => Math.min(150, z + 10))}
                    className="p-1 hover:bg-white/10 rounded transition cursor-pointer"
                    title="Aumentar Zoom"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setPdfRotation(r => (r + 90) % 360)}
                    className="p-1 hover:bg-white/10 rounded transition cursor-pointer"
                    title="Girar"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Simulated PDF Canvas */}
              <div className="relative border border-slate-300 rounded-b-lg bg-slate-100 min-h-[480px] sm:min-h-[580px] p-6 flex flex-col items-center justify-start overflow-hidden shadow-inner">
                
                {/* PDF Page simulation */}
                <div 
                  className={`w-full max-w-md bg-white border border-slate-200 shadow-md p-6 text-slate-800 transition-all duration-300 ${
                    isPdfBlurred ? 'filter blur-[7px] select-none pointer-events-none' : ''
                  }`}
                  style={{ 
                    transform: `scale(${pdfZoom / 100}) rotate(${pdfRotation}deg)`,
                    transformOrigin: 'top center'
                  }}
                >
                  {/* Municipal Header */}
                  <div className="text-center pb-4 border-b border-slate-300 mb-4">
                    <Brasao className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                      ESTADO DO TOCANTINS
                    </p>
                    <p className="text-xs font-extrabold text-slate-900 uppercase">
                      PREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Gabinete da Ouvidoria Geral • Carta de Serviços aos Usuários
                    </p>
                  </div>

                  {/* Document Title */}
                  <div className="text-center my-4">
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 uppercase">
                      {selectedDoc.tipo}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-2">
                      {selectedDoc.titulo}
                    </h3>
                  </div>

                  {/* Content Simulation */}
                  <div className="space-y-3 text-[11px] text-slate-700 leading-relaxed text-justify">
                    <p>
                      <strong>ÓRGÃO RESPONSÁVEL:</strong> {selectedDoc.responsavel}
                    </p>
                    <p>
                      <strong>PÚBLICO-ALVO:</strong> {selectedDoc.publicoAlvo}
                    </p>
                    <p>
                      <strong>PRAZO ESTIMADO:</strong> {selectedDoc.prazo}
                    </p>
                    <div>
                      <strong>REQUISITOS E DOCUMENTOS:</strong>
                      <ul className="list-disc pl-4 mt-1 space-y-0.5">
                        {selectedDoc.requisitos.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>ETAPAS DO ATENDIMENTO:</strong>
                      <ol className="list-decimal pl-4 mt-1 space-y-0.5">
                        {selectedDoc.etapas.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Stamp */}
                  <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[9px] text-slate-400 font-mono">
                    Documento Oficial Registrado • Publicação em {selectedDoc.dataPublicacao} • Revisão {selectedDoc.dataRevisao}
                  </div>
                </div>

                {/* Blur Overlay & Reveal Button */}
                {isPdfBlurred && (
                  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs flex flex-col items-center justify-center p-4">
                    <div className="bg-white/95 border border-slate-300 p-6 rounded-xl shadow-2xl max-w-sm text-center space-y-3">
                      <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                        <Eye className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Visualização do Documento
                      </h4>
                      <p className="text-xs text-slate-500">
                        Clique no botão abaixo para desbloquear e remover o borrão de pré-visualização.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsPdfBlurred(false)}
                        className="w-full py-2.5 px-4 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Visualizar Documento Completo</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Actions for PDF */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setIsPdfBlurred(!isPdfBlurred)}
                  className="text-teal-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isPdfBlurred ? 'Remover borrão' : 'Aplicar borrão'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => success(`Download da Carta de Serviços "${selectedDoc.titulo}" iniciado.`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-300 rounded-lg transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Arquivo PDF</span>
                </button>
              </div>
            </div>

            {/* Right Column: Detailed Information separated ONLY by horizontal lines */}
            <div className="lg:col-span-6 space-y-4">
              
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  {selectedDoc.tipo}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5 leading-snug">
                  {selectedDoc.titulo}
                </h3>
              </div>

              {/* Metadata Table separated ONLY by horizontal lines (strict requirement) */}
              <div className="divide-y divide-slate-200 text-xs sm:text-[13px]">
                
                <div className="py-2.5 flex items-baseline justify-between gap-4">
                  <span className="font-bold text-slate-800 w-36 shrink-0">Órgão Responsável:</span>
                  <span className="text-slate-700 text-right">{selectedDoc.responsavel}</span>
                </div>

                <div className="py-2.5 flex items-baseline justify-between gap-4">
                  <span className="font-bold text-slate-800 w-36 shrink-0">Público-Alvo:</span>
                  <span className="text-slate-700 text-right">{selectedDoc.publicoAlvo}</span>
                </div>

                <div className="py-2.5 flex items-baseline justify-between gap-4">
                  <span className="font-bold text-slate-800 w-36 shrink-0">Data de Publicação:</span>
                  <span className="text-slate-700 font-medium">{selectedDoc.dataPublicacao}</span>
                </div>

                <div className="py-2.5 flex items-baseline justify-between gap-4">
                  <span className="font-bold text-slate-800 w-36 shrink-0">Última Revisão:</span>
                  <span className="text-slate-700 font-medium">{selectedDoc.dataRevisao}</span>
                </div>

                <div className="py-2.5 flex items-baseline justify-between gap-4">
                  <span className="font-bold text-slate-800 w-36 shrink-0">Prazo de Atendimento:</span>
                  <span className="text-teal-800 font-semibold">{selectedDoc.prazo}</span>
                </div>

                <div className="py-2.5 flex items-baseline justify-between gap-4">
                  <span className="font-bold text-slate-800 w-36 shrink-0">Horário de Atendimento:</span>
                  <span className="text-slate-700">{selectedDoc.horario}</span>
                </div>

                <div className="py-2.5 flex flex-col gap-1.5">
                  <span className="font-bold text-slate-800">Canais de Acesso:</span>
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {selectedDoc.canais.map((c, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="py-2.5 flex flex-col gap-1.5">
                  <span className="font-bold text-slate-800">Requisitos e Documentos Necessários:</span>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
                    {selectedDoc.requisitos.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="py-2.5 flex flex-col gap-1.5">
                  <span className="font-bold text-slate-800">Etapas do Procedimento:</span>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-700 text-xs">
                    {selectedDoc.etapas.map((et, i) => (
                      <li key={i}>{et}</li>
                    ))}
                  </ol>
                </div>

              </div>

              {/* Back button */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDoc(null);
                    setIsPdfBlurred(true);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>VOLTAR PARA A LISTAGEM</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* Standard Listing View separated strictly by horizontal lines */
        <div className="space-y-4">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar serviço por nome, assunto ou secretaria..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 bg-white"
              />
            </div>

            {/* Filter by Type */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="filter-tipo" className="text-xs font-bold text-slate-600 shrink-0">Tipo:</label>
              <select
                id="filter-tipo"
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-slate-800"
              >
                {tipos.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Filter by Period */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="filter-periodo" className="text-xs font-bold text-slate-600 shrink-0">Ano:</label>
              <select
                id="filter-periodo"
                value={selectedPeriodo}
                onChange={(e) => setSelectedPeriodo(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-slate-800"
              >
                {periodos.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Results count */}
          <div className="text-xs text-slate-500 font-medium">
            Exibindo <strong>{filteredServicos.length}</strong> serviço(s) público(s) disponível(is)
          </div>

          {/* List items separated ONLY by horizontal lines (NO inner card rectangle) */}
          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {filteredServicos.length > 0 ? (
              filteredServicos.map((servico) => (
                <div
                  key={servico.id}
                  onClick={() => setSelectedDoc(servico)}
                  className="py-4 hover:bg-teal-50/40 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 sm:px-3"
                >
                  <div className="space-y-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                        {servico.tipo}
                      </span>
                      <span className="text-slate-300 text-xs">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        Publicado: {servico.dataPublicacao}
                      </span>
                      <span className="text-slate-300 text-xs">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        Revisão: {servico.dataRevisao}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-[#0c2340] group-hover:text-teal-700 transition-colors">
                      {servico.titulo}
                    </h4>

                    <p className="text-xs text-slate-600 truncate max-w-2xl">
                      <strong className="text-slate-700">Responsável:</strong> {servico.responsavel} — <strong className="text-slate-700">Prazo:</strong> {servico.prazo}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-bold text-teal-700 group-hover:underline flex items-center gap-1">
                      <span>Visualizar Detalhes</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <FileCheck2 className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-semibold text-slate-700">Nenhum serviço encontrado</p>
                <p className="text-xs text-slate-400">Tente ajustar os filtros de pesquisa ou categoria.</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
