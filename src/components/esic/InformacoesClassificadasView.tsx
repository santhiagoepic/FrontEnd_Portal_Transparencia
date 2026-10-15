import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Printer, 
  ShieldAlert, 
  FileCheck2, 
  Lock, 
  Unlock, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { InformacaoClassificadaDTO, InformacaoDesclassificadaDTO } from '../../types/esic.types';
import { useToast } from '../Toast';

interface InformacoesClassificadasViewProps {
  classificadas: InformacaoClassificadaDTO[];
  desclassificadas: InformacaoDesclassificadaDTO[];
  isLoadingClassificadas: boolean;
  isLoadingDesclassificadas: boolean;
  initialMode?: 'classificadas' | 'desclassificadas';
}

export const InformacoesClassificadasView: React.FC<InformacoesClassificadasViewProps> = ({
  classificadas,
  desclassificadas,
  isLoadingClassificadas,
  isLoadingDesclassificadas,
  initialMode = 'classificadas'
}) => {
  const { success, info } = useToast();
  const [mode, setMode] = useState<'classificadas' | 'desclassificadas'>(initialMode);
  const [search, setSearch] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('Todos');

  const periodos = ['Todos', '2026', '2025', '2024', '2023', '2022', '2021'];

  // Filtered lists
  const filteredClassificadas = classificadas.filter((item) => {
    if (selectedPeriodo !== 'Todos') {
      const anoProd = item.dataProducao.split('/')[2];
      const anoClass = item.dataClassificacao.split('/')[2];
      if (anoProd !== selectedPeriodo && anoClass !== selectedPeriodo) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.assunto.toLowerCase().includes(q) ||
        item.dispositivoLegal.toLowerCase().includes(q) ||
        item.orgaoResponsavel.toLowerCase().includes(q) ||
        item.grauSigilo.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredDesclassificadas = desclassificadas.filter((item) => {
    if (selectedPeriodo !== 'Todos') {
      const anoProd = item.dataProducao.split('/')[2];
      const anoDesclass = item.dataDesclassificacao.split('/')[2];
      if (anoProd !== selectedPeriodo && anoDesclass !== selectedPeriodo) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.assunto.toLowerCase().includes(q) ||
        item.motivo.toLowerCase().includes(q) ||
        item.dispositivoLegal.toLowerCase().includes(q) ||
        item.orgaoResponsavel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    info('Exportando relatório...');
    if (mode === 'classificadas') {
      const headers = ['Assunto', 'Grau de Sigilo', 'Data de Produção', 'Data de Classificação', 'Prazo de Sigilo', 'Dispositivo Legal', 'Órgão'];
      const rows = filteredClassificadas.map(c => [
        `"${c.assunto}"`,
        `"${c.grauSigilo}"`,
        `"${c.dataProducao}"`,
        `"${c.dataClassificacao}"`,
        `"${c.prazo}"`,
        `"${c.dispositivoLegal}"`,
        `"${c.orgaoResponsavel}"`
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `informacoes_classificadas_lai_${new Date().getFullYear()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const headers = ['Assunto', 'Grau Anterior', 'Data de Produção', 'Data de Desclassificação', 'Motivo da Desclassificação', 'Dispositivo Legal', 'Órgão'];
      const rows = filteredDesclassificadas.map(d => [
        `"${d.assunto}"`,
        `"${d.grauSigiloAnterior}"`,
        `"${d.dataProducao}"`,
        `"${d.dataDesclassificacao}"`,
        `"${d.motivo}"`,
        `"${d.dispositivoLegal}"`,
        `"${d.orgaoResponsavel}"`
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `informacoes_desclassificadas_lai_${new Date().getFullYear()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    success('Arquivo CSV exportado com sucesso!');
  };

  return (
    <div className="space-y-6">
      
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Transparência Passiva • Art. 30 da Lei 12.527/2011 (LAI)
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c2340] tracking-tight mt-0.5">
            {mode === 'classificadas' ? 'Informações Classificadas em Grau de Sigilo' : 'Informações Desclassificadas nos Últimos 12 Meses'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            {mode === 'classificadas'
              ? 'Rol de informações que foram classificadas com reserva de sigilo pela autoridade competente com fundamentação legal estrita.'
              : 'Rol de documentos que perderam a condição de sigilo por decurso do prazo ou termo de desclassificação formal.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-teal-700" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Mode Buttons (2 telas de consulta independentes) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setMode('classificadas')}
          className={`px-4 py-2 text-xs font-bold rounded-lg border transition cursor-pointer flex items-center gap-2 ${
            mode === 'classificadas'
              ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Informações Classificadas ({classificadas.length})</span>
        </button>

        <button
          onClick={() => setMode('desclassificadas')}
          className={`px-4 py-2 text-xs font-bold rounded-lg border transition cursor-pointer flex items-center gap-2 ${
            mode === 'desclassificadas'
              ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>Informações Desclassificadas ({desclassificadas.length})</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por assunto, dispositivo legal ou órgão..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <label htmlFor="filter-ano-sigilo" className="text-xs font-bold text-slate-600 shrink-0">Ano de Produção:</label>
          <select
            id="filter-ano-sigilo"
            value={selectedPeriodo}
            onChange={(e) => setSelectedPeriodo(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-slate-800"
          >
            {periodos.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= TELA 1: CLASSIFICADAS ================= */}
      {mode === 'classificadas' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 font-medium">
            Exibindo <strong>{filteredClassificadas.length}</strong> registro(s) classificado(s) em sigilo legal.
          </div>

          {/* List items separated ONLY by horizontal lines (strict rule) */}
          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {filteredClassificadas.length > 0 ? (
              filteredClassificadas.map((item) => (
                <div key={item.id} className="py-4 px-2 space-y-2 hover:bg-slate-50/60 transition">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-rose-100 text-rose-800 border border-rose-200">
                        Grau: {item.grauSigilo}
                      </span>
                      <span className="text-xs font-bold text-teal-800">{item.orgaoResponsavel}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-3">
                      <span>Produção: {item.dataProducao}</span>
                      <span>•</span>
                      <span>Classificação: {item.dataClassificacao}</span>
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-[#0c2340]">
                    {item.assunto}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div>
                      <strong className="text-slate-800">Prazo de Sigilo:</strong> {item.prazo}
                    </div>
                    <div>
                      <strong className="text-slate-800">Dispositivo Legal:</strong> {item.dispositivoLegal}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <FileCheck2 className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-semibold text-slate-700">Nenhuma informação classificada encontrada</p>
                <p className="text-xs text-slate-400">
                  {search ? 'Tente refazer a pesquisa sem filtros.' : 'No momento não constam informações com reserva de sigilo ativo neste exercício.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TELA 2: DESCLASSIFICADAS ================= */}
      {mode === 'desclassificadas' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 font-medium">
            Exibindo <strong>{filteredDesclassificadas.length}</strong> documento(s) desclassificado(s) com livre acesso.
          </div>

          {/* List items separated ONLY by horizontal lines (strict rule) */}
          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {filteredDesclassificadas.length > 0 ? (
              filteredDesclassificadas.map((item) => (
                <div key={item.id} className="py-4 px-2 space-y-2 hover:bg-slate-50/60 transition">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Desclassificado (Era: {item.grauSigiloAnterior})
                      </span>
                      <span className="text-xs font-bold text-teal-800">{item.orgaoResponsavel}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-3">
                      <span>Produção: {item.dataProducao}</span>
                      <span>•</span>
                      <span>Desclassificação: {item.dataDesclassificacao}</span>
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-[#0c2340]">
                    {item.assunto}
                  </h4>

                  <div className="space-y-1 text-xs text-slate-600 pt-1">
                    <div>
                      <strong className="text-slate-800">Motivo da Desclassificação:</strong> {item.motivo}
                    </div>
                    <div>
                      <strong className="text-slate-800">Dispositivo Legal:</strong> {item.dispositivoLegal}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <FileCheck2 className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-semibold text-slate-700">Nenhuma informação desclassificada encontrada</p>
                <p className="text-xs text-slate-400">
                  {search ? 'Tente refazer a pesquisa sem filtros.' : 'Não constam termos de desclassificação formal registrados para o período selecionado.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
