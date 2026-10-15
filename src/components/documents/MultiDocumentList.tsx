import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Upload, 
  PlusCircle, 
  Trash2, 
  Check, 
  AlertCircle,
  FileCheck2,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../Toast';
import { Brasao } from '../Brasao';

export interface DocumentoEtapa {
  id: string;
  nome: string;
  fase: 'preparatoria' | 'divulgacao' | 'julgamento' | 'homologacao';
  tamanho: string;
  dataUpload: string;
  pdfUrl: string;
}

interface MultiDocumentListProps {
  publicationTitle: string;
  publicationNumber: string;
  groupId: string;
  primaryColor?: string;
}

export const MultiDocumentList: React.FC<MultiDocumentListProps> = ({
  publicationTitle,
  publicationNumber,
  groupId,
  primaryColor = '#0284c7', // Sky / Licitacoes
}) => {
  const { hasPermission, addAuditLog, currentUser } = useAuth();
  const { success, error: toastError, info } = useToast();

  const canAddFiles = hasPermission(groupId, 'add_files');
  const canReplaceFiles = hasPermission(groupId, 'replace_files');
  const canDeleteFiles = hasPermission(groupId, 'delete_files');

  // Documents categorized by municipal procurement stages
  const [documents, setDocuments] = useState<DocumentoEtapa[]>([
    {
      id: 'doc-prep-01',
      nome: 'Termo_de_Referencia_Consolidado.pdf',
      fase: 'preparatoria',
      tamanho: '2.4 MB',
      dataUpload: '2026-03-20',
      pdfUrl: '/documents/termo_referencia.pdf',
    },
    {
      id: 'doc-prep-02',
      nome: 'Estudo_Tecnico_Preliminar_ETP.pdf',
      fase: 'preparatoria',
      tamanho: '1.8 MB',
      dataUpload: '2026-03-22',
      pdfUrl: '/documents/estudo_tecnico.pdf',
    },
    {
      id: 'doc-div-01',
      nome: 'Edital_Pregao_Eletronico_012_2026.pdf',
      fase: 'divulgacao',
      tamanho: '4.6 MB',
      dataUpload: '2026-03-28',
      pdfUrl: '/documents/edital_pregao.pdf',
    },
    {
      id: 'doc-div-02',
      nome: 'Aviso_de_Licitacao_Diario_Oficial.pdf',
      fase: 'divulgacao',
      tamanho: '840 KB',
      dataUpload: '2026-03-29',
      pdfUrl: '/documents/aviso_licitacao.pdf',
    },
    {
      id: 'doc-julg-01',
      nome: 'Ata_da_Sessao_Publica_Pregao.pdf',
      fase: 'julgamento',
      tamanho: '1.2 MB',
      dataUpload: '2026-04-05',
      pdfUrl: '/documents/ata_sessao.pdf',
    },
    {
      id: 'doc-julg-02',
      nome: 'Relatorio_Julgamento_Propostas.pdf',
      fase: 'julgamento',
      tamanho: '1.5 MB',
      dataUpload: '2026-04-06',
      pdfUrl: '/documents/relatorio_julgamento.pdf',
    },
    {
      id: 'doc-hom-01',
      nome: 'Termo_de_Homologacao_e_Adjudicacao.pdf',
      fase: 'homologacao',
      tamanho: '1.1 MB',
      dataUpload: '2026-04-10',
      pdfUrl: '/documents/termo_homologacao.pdf',
    },
    {
      id: 'doc-hom-02',
      nome: 'Minuta_Contrato_Administrativo_Assinado.pdf',
      fase: 'homologacao',
      tamanho: '3.2 MB',
      dataUpload: '2026-04-12',
      pdfUrl: '/documents/contrato_assinado.pdf',
    },
  ]);

  // Selected document for single viewer modal (Requirement 9: never 10 blurred viewers!)
  const [selectedDocToView, setSelectedDocToView] = useState<DocumentoEtapa | null>(null);

  // Modal for adding new file to a stage
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [targetFase, setTargetFase] = useState<DocumentoEtapa['fase']>('preparatoria');
  const [newDocName, setNewDocName] = useState('');
  const [newDocSize, setNewDocSize] = useState('1.5 MB');

  // Stages configuration
  const stages: { id: DocumentoEtapa['fase']; label: string; badge: string; desc: string }[] = [
    {
      id: 'preparatoria',
      label: 'Fase Preparatória / Planejamento',
      badge: 'Planejamento Interno',
      desc: 'Estudos técnicos, termo de referência e estimativa de custos',
    },
    {
      id: 'divulgacao',
      label: 'Fase de Divulgação do Edital',
      badge: 'Publicação Oficial',
      desc: 'Instrumento convocatório, avisos e esclarecimentos',
    },
    {
      id: 'julgamento',
      label: 'Fase de Julgamento e Habilitação',
      badge: 'Sessão Pública',
      desc: 'Atas de sessão, propostas e documentação dos concorrentes',
    },
    {
      id: 'homologacao',
      label: 'Fase de Homologação e Contratação',
      badge: 'Encerramento',
      desc: 'Atos de homologação, adjudicação e termos contratuais',
    },
  ];

  const handleOpenAdd = (fase: DocumentoEtapa['fase']) => {
    setTargetFase(fase);
    setNewDocName('');
    setAddModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName) {
      toastError('Informe o nome do arquivo.');
      return;
    }

    const cleanName = newDocName.endsWith('.pdf') ? newDocName : `${newDocName}.pdf`;
    const newDoc: DocumentoEtapa = {
      id: `doc-${Date.now()}`,
      nome: cleanName,
      fase: targetFase,
      tamanho: newDocSize,
      dataUpload: new Date().toISOString().split('T')[0],
      pdfUrl: `/documents/${cleanName}`,
    };

    setDocuments(prev => [...prev, newDoc]);
    addAuditLog({
      module: groupId,
      moduleTitle: 'Licitações e Contratos',
      action: 'Documento publicado',
      recordId: newDoc.id,
      recordTitle: `${publicationNumber} — ${cleanName}`,
      details: `Arquivo adicionado na etapa ${targetFase} por ${currentUser?.name}`,
    });

    success('Documento enviado e vinculado com sucesso!');
    setAddModalOpen(false);
  };

  const handleReplaceFile = (doc: DocumentoEtapa) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setDocuments(prev => prev.map(d => {
          if (d.id === doc.id) {
            return {
              ...d,
              nome: file.name,
              tamanho: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              dataUpload: new Date().toISOString().split('T')[0],
            };
          }
          return d;
        }));

        addAuditLog({
          module: groupId,
          moduleTitle: 'Licitações e Contratos',
          action: 'Arquivo substituído',
          recordId: doc.id,
          recordTitle: `${publicationNumber} — ${file.name}`,
          details: `Documento substituído por ${currentUser?.name}`,
        });

        success('Arquivo substituído com sucesso!');
      }
    };
    input.click();
  };

  const handleDeleteFile = (doc: DocumentoEtapa) => {
    if (confirm(`Tem certeza que deseja excluir o documento "${doc.nome}"?`)) {
      setDocuments(prev => prev.filter(d => d.id !== doc.id));
      addAuditLog({
        module: groupId,
        moduleTitle: 'Licitações e Contratos',
        action: 'Documento excluído',
        recordId: doc.id,
        recordTitle: `${publicationNumber} — ${doc.nome}`,
        details: `Arquivo removido da publicação por ${currentUser?.name}`,
      });
      success('Documento excluído com sucesso!');
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Informative Header (Tipo B: Multi-document list) */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-sky-700" />
            <span>Documentos Oficiais da Licitação por Etapa</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Todos os arquivos estão organizados cronologicamente pelas fases do procedimento licitatório
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
            {documents.length} Arquivos Cadastrados
          </span>
        </div>
      </div>

      {/* Stages Grouped Accordion / List */}
      <div className="space-y-5">
        {stages.map((stage) => {
          const stageDocs = documents.filter(d => d.fase === stage.id);

          return (
            <div 
              key={stage.id} 
              className="border border-slate-200 rounded-2xl bg-white shadow-2xs overflow-hidden transition"
            >
              {/* Stage Header */}
              <div className="bg-slate-100/70 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 tracking-tight">
                      {stage.label}
                    </h4>
                    <p className="text-[11px] text-slate-500 hidden sm:block">
                      {stage.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                    {stageDocs.length} {stageDocs.length === 1 ? 'arquivo' : 'arquivos'}
                  </span>

                  {/* Administrative Action: + Adicionar documento na etapa */}
                  {canAddFiles && (
                    <button
                      type="button"
                      onClick={() => handleOpenAdd(stage.id)}
                      className="px-2.5 py-1 bg-white hover:bg-sky-50 text-sky-700 hover:text-sky-800 border border-sky-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Adicionar novo arquivo a esta fase"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Adicionar documento</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Document Items List */}
              {stageDocs.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 italic">
                  Nenhum arquivo cadastrado para esta etapa até o momento.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {stageDocs.map((doc) => (
                    <div 
                      key={doc.id} 
                      className="p-3.5 sm:px-5 hover:bg-slate-50/80 transition flex items-center justify-between gap-3 text-xs"
                    >
                      {/* Left: Document Icon + Name */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div 
                            onClick={() => setSelectedDocToView(doc)}
                            className="font-bold text-slate-800 hover:text-sky-700 hover:underline cursor-pointer truncate"
                          >
                            {doc.nome}
                          </div>
                          <div className="text-[10.5px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>Tamanho: {doc.tamanho}</span>
                            <span>•</span>
                            <span>Data de envio: {doc.dataUpload}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Public Action: View PDF in Single Viewer Modal */}
                        <button
                          type="button"
                          onClick={() => setSelectedDocToView(doc)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                          title="Visualizar documento"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Visualizar</span>
                        </button>

                        {/* Public Action: Download PDF */}
                        <button
                          type="button"
                          onClick={() => {
                            success(`Download iniciado: ${doc.nome}`);
                          }}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          title="Baixar arquivo PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        {/* Admin Action: Replace PDF */}
                        {canReplaceFiles && (
                          <button
                            type="button"
                            onClick={() => handleReplaceFile(doc)}
                            className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                            title="Substituir este arquivo PDF"
                          >
                            <Upload className="w-3 h-3" />
                            <span className="hidden md:inline">Substituir</span>
                          </button>
                        )}

                        {/* Admin Action: Delete PDF */}
                        {canDeleteFiles && (
                          <button
                            type="button"
                            onClick={() => handleDeleteFile(doc)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Excluir documento"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SINGLE VIEWER MODAL FOR SELECTED DOCUMENT (Requirement 9) */}
      {selectedDocToView && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedDocToView(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Viewer Header */}
            <div className="bg-[#0b5444] px-6 py-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-300" />
                <div className="min-w-0">
                  <h3 className="font-extrabold text-sm sm:text-base truncate">
                    {selectedDocToView.nome}
                  </h3>
                  <p className="text-[11px] text-emerald-100">
                    {publicationNumber} • {selectedDocToView.tamanho}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => success(`Download iniciado: ${selectedDocToView.nome}`)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar</span>
                </button>

                <button
                  onClick={() => setSelectedDocToView(null)}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Simulated Clean PDF Content */}
            <div className="p-8 overflow-y-auto flex-1 bg-slate-100 flex justify-center">
              <div className="bg-white w-full max-w-2xl p-8 rounded shadow-lg min-h-[500px] font-serif text-xs text-slate-800 space-y-4">
                <div className="text-center pb-4 border-b border-slate-300 space-y-1">
                  <div className="w-10 h-10 mx-auto mb-1">
                    <Brasao className="w-full h-full object-contain" />
                  </div>
                  <h4 className="text-[10.5px] font-bold text-slate-800">ESTADO DO TOCANTINS</h4>
                  <h3 className="text-xs font-black text-slate-900">
                    PREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS
                  </h3>
                  <p className="text-[9.5px] text-slate-500 uppercase">
                    Comissão Permanente de Licitações e Contratos
                  </p>
                </div>

                <div className="text-center font-sans font-bold text-xs py-2 text-sky-800 uppercase">
                  {selectedDocToView.nome.replace(/_/g, ' ').replace(/\.pdf$/i, '')}
                </div>

                <p className="text-justify leading-relaxed">
                  Referente ao <strong>{publicationNumber}</strong>. O Município de São Miguel do Tocantins - TO torna público para conhecimento dos interessados o documento constante dos autos do procedimento administrativo licitatório, devidamente homologado pelas autoridades municipais competentes.
                </p>

                <p className="text-justify leading-relaxed">
                  Os autos encontram-se disponíveis para vista pública de acordo com a Lei Federal nº 14.133/2021 (Nova Lei de Licitações) e Lei nº 12.527/2011 (Lei de Acesso à Informação).
                </p>

                <div className="pt-10 text-center space-y-0.5">
                  <div className="w-48 border-t border-slate-700 mx-auto mb-1" />
                  <div className="font-bold font-sans text-xs text-slate-900">
                    Comissão de Contratação do Município
                  </div>
                  <div className="text-[10px] text-slate-500 font-sans">
                    São Miguel do Tocantins - TO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {addModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3"
          onClick={() => setAddModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0b5444] px-5 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Adicionar Documento à Etapa</h3>
              <button onClick={() => setAddModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome do Documento / Arquivo *
                </label>
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="Ex: Ata_da_Sessao_Julgamento.pdf"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Etapa do Procedimento
                </label>
                <select
                  value={targetFase}
                  onChange={(e) => setTargetFase(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="preparatoria">Fase Preparatória</option>
                  <option value="divulgacao">Fase de Divulgação</option>
                  <option value="julgamento">Fase de Julgamento</option>
                  <option value="homologacao">Fase de Homologação</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Arquivo PDF
                </label>
                <div className="border border-dashed border-slate-300 p-3 rounded-xl text-center text-xs text-slate-500 bg-slate-50">
                  <Upload className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                  <span>Arquivo simulado selecionado: {newDocName || 'documento.pdf'}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0b5444] hover:bg-[#084336] text-white text-xs font-bold rounded-lg transition"
                >
                  Confirmar Envio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
