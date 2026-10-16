import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Trash2, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  Plus, 
  Upload,
  Eye,
  X,
  FileCheck2,
  Calendar,
  HardDrive,
  Shield,
  ShieldCheck,
  Printer,
  ChevronDown
} from 'lucide-react';
import { AppSelect } from '../ui/AppSelect';
import { Brasao } from '../Brasao';
import { siteConfig } from '../../config/site.config';

export const DEFAULT_DOCUMENT_TYPES = [
  { id: 'edital', name: 'Documento Principal' },
  { id: 'ata-sessao', name: 'Ata da Sessão Pública anexada' },
  { id: 'homologacao', name: 'Termo de Homologação / Adjudicação publicado' },
  { id: 'contrato', name: 'Contrato Administrativo vinculado' },
  { id: 'termo-referencia', name: 'Termo de Referência / ETP' },
  { id: 'estudo-tecnico', name: 'Estudo Técnico Preliminar (ETP)' },
  { id: 'parecer-juridico', name: 'Parecer Jurídico Conclusivo' },
  { id: 'publicacao-pncp', name: 'Certificação de Envio ao PNCP / Diário Oficial' },
  { id: 'proposta', name: 'Proposta de Preços' },
  { id: 'recursos', name: 'Recursos e Julgamentos' },
  { id: 'errata', name: 'Errata / Retificação' },
  { id: 'complementar', name: 'Documento Complementar' },
];

export interface ManagedFile {
  id: string;
  name: string;
  size?: number;
  formattedSize?: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  progress: number;
  errorMessage?: string;
  uploadedAt?: string;
  fileObject?: File;
  isMain?: boolean;
  documentTypeId?: string;
  customTitle?: string;
}

interface PermanentDocumentManagerProps {
  files: ManagedFile[];
  onFilesChange: (files: ManagedFile[]) => void;
  primaryColor?: string;
  allowMultiple?: boolean;
  moduleLabel?: string;
  documentTypes?: { id: string; name: string; active?: boolean }[];
  onClassificationChange?: (fileId: string, typeId: string) => void;
  readOnly?: boolean;
  isPdfBlurred?: boolean;
  onUnlockBlur?: () => void;
  documentTitle?: string;
  documentNumber?: string;
  documentContent?: string;
}

const MAX_FILE_SIZE = 35 * 1024 * 1024; // Pelo menos 30 MB (35 MB)

export const PermanentDocumentManager: React.FC<PermanentDocumentManagerProps> = ({
  files,
  onFilesChange,
  primaryColor = '#0b5444',
  allowMultiple = true,
  moduleLabel = 'a Publicação',
  documentTypes,
  onClassificationChange,
  readOnly = false,
  isPdfBlurred = false,
  onUnlockBlur,
  documentTitle = 'Publicação Oficial',
  documentNumber = 'Nº 085/2026',
  documentContent,
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragCounter = useRef(0);
  const [fileToDelete, setFileToDelete] = useState<ManagedFile | null>(null);
  const [previewingFile, setPreviewingFile] = useState<ManagedFile | null>(null);
  const [localUnblurred, setLocalUnblurred] = useState<boolean>(false);
  const [isUnblurring, setIsUnblurring] = useState<boolean>(false);
  
  // Specific state for single file pre-visualization blur
  const [singlePreviewUnblurred, setSinglePreviewUnblurred] = useState<boolean>(false);
  const [isUnblurringSingle, setIsUnblurringSingle] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const [replacingFileId, setReplacingFileId] = useState<string | null>(null);

  // Keep a ref to the latest files to avoid stale closures during async uploads
  const filesRef = useRef<ManagedFile[]>(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  // Reset blur states whenever the record changes
  useEffect(() => {
    setSinglePreviewUnblurred(false);
    setLocalUnblurred(false);
  }, [documentNumber, documentTitle]);

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'PDF Oficial';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const availableDocumentTypes = (documentTypes && documentTypes.length > 0)
    ? documentTypes.map((d) => {
        if (d.id === 'edital') return { ...d, name: 'Documento Principal' };
        if (d.id === 'ata-sessao') return { ...d, name: 'Ata da Sessão Pública anexada' };
        if (d.id === 'homologacao') return { ...d, name: 'Termo de Homologação / Adjudicação publicado' };
        if (d.id === 'contrato') return { ...d, name: 'Contrato Administrativo vinculado' };
        if (d.id === 'parecer-juridico') return { ...d, name: 'Conferência de Parecer Jurídico Conclusivo' };
        if (d.id === 'publicacao-pncp') return { ...d, name: 'Certificação de Envio ao PNCP / Diário Oficial' };
        return d;
      })
    : DEFAULT_DOCUMENT_TYPES;

  /**
   * REGRA DE NEGÓCIO DO NOME DOS ARQUIVOS:
   * Os arquivos recebem o nome de acordo com como foram publicados / classificados no seletor.
   * Se for o arquivo principal ou documento único sem alteração, fica nomeado como "Documento Principal".
   * Se for selecionado outro tipo (ex: "Ata da Sessão Pública anexada"), o arquivo assume esse nome
   * e valida instantaneamente o Checklist correspondente antes mesmo de salvar.
   */
  const getPublishedFileName = (file: ManagedFile, index: number = 0, total: number = files.length): string => {
    if (file.documentTypeId) {
      const docType = availableDocumentTypes.find((d) => d.id === file.documentTypeId);
      if (docType) {
        return docType.name;
      }
    }

    if (file.customTitle) {
      return file.customTitle;
    }

    if (file.name && file.name !== 'Documento Principal' && !file.name.startsWith('Anexo')) {
      return file.name;
    }

    if (file.isMain || index === 0 || total === 1) {
      return 'Documento Principal';
    }

    return `Anexo ${index}`;
  };

  const handleDocumentTypeChange = (fileId: string, typeId: string) => {
    const selectedType = availableDocumentTypes.find((t) => t.id === typeId);
    const newName = selectedType ? selectedType.name : 'Documento';

    const updated = filesRef.current.map((f) => {
      if (f.id === fileId) {
        return {
          ...f,
          documentTypeId: typeId,
          name: newName,
          customTitle: newName,
          isMain: typeId === 'edital',
        };
      }
      return f;
    });

    filesRef.current = updated;
    onFilesChange(updated);

    if (onClassificationChange) {
      onClassificationChange(fileId, typeId);
    }
  };

  const processFiles = (incomingFiles: FileList | File[]) => {
    const fileArray = Array.from(incomingFiles);

    if (fileArray.length === 0) return;

    const currentFiles = filesRef.current;

    // Build new managed file entries with published business names
    const newEntries: ManagedFile[] = fileArray.map((file, idx) => {
      const isOversized = file.size > MAX_FILE_SIZE;
      const id = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 6)}-${idx}`;
      const isMain = currentFiles.length === 0 && idx === 0;
      const defaultDocTypeId = isMain ? 'edital' : 'edital';
      const matched = availableDocumentTypes.find((t) => t.id === defaultDocTypeId);
      const publishedName = matched ? matched.name : (isMain ? 'Documento Principal' : `Anexo ${currentFiles.length + idx}`);
      return {
        id,
        name: publishedName,
        size: file.size,
        formattedSize: formatFileSize(file.size),
        status: isOversized ? 'error' : 'uploading',
        progress: isOversized ? 0 : 25,
        errorMessage: isOversized ? 'Arquivo excede o limite máximo de 30MB' : undefined,
        uploadedAt: new Date().toLocaleDateString('pt-BR'),
        fileObject: file,
        isMain,
        documentTypeId: defaultDocTypeId,
      };
    });

    const updatedList = allowMultiple ? [...currentFiles, ...newEntries] : newEntries;
    filesRef.current = updatedList;
    onFilesChange(updatedList);

    // Smooth real-time upload progression simulation for realistic feedback
    newEntries.forEach((entry) => {
      if (entry.status === 'error') return;

      let currentProgress = 25;
      const interval = setInterval(() => {
        currentProgress += 25;
        if (currentProgress < 100) {
          const progressing = filesRef.current.map((f) =>
            f.id === entry.id ? { ...f, progress: currentProgress } : f
          );
          filesRef.current = progressing;
          onFilesChange(progressing);
        } else {
          clearInterval(interval);
          const completed = filesRef.current.map((f) =>
            f.id === entry.id ? { ...f, status: 'ready' as const, progress: 100 } : f
          );
          filesRef.current = completed;
          onFilesChange(completed);
        }
      }, 90);
    });
  };

  const handleDragEnter = (e: React.DragEvent) => {
    if (readOnly) return;
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDraggingOver(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (readOnly) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (readOnly) return;
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      setIsDraggingOver(false);
      dragCounter.current = 0;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (readOnly) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    dragCounter.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleConfirmDelete = () => {
    if (!fileToDelete) return;
    const remaining = filesRef.current.filter((f) => f.id !== fileToDelete.id);
    if (fileToDelete.isMain && remaining.length > 0) {
      remaining[0] = { ...remaining[0], isMain: true };
    }
    filesRef.current = remaining;
    onFilesChange(remaining);
    setFileToDelete(null);
  };

  const handleDownloadFile = (file: ManagedFile, index: number = 0) => {
    const publishedName = getPublishedFileName(file, index, files.length);
    const downloadFileName = `${publishedName.replace(/[\s/]+/g, '_')}.pdf`;
    const blob = file.fileObject || new Blob([
      `%PDF-1.4\n% Documento Oficial - Prefeitura Municipal de São Miguel do Tocantins\n% Arquivo: ${publishedName}\n% Publicação: ${documentTitle} - ${documentNumber}`
    ], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasFiles = files.length > 0;

  return (
    <div 
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative flex flex-col h-full min-h-[580px] bg-slate-50/40 select-none"
    >
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={allowMultiple}
        className="hidden"
        onChange={handleFileInputChange}
      />
      <input
        ref={replaceFileInputRef}
        type="file"
        className="hidden"
      />

      {/* Confirmation Modal for File Deletion */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-2xs p-4 animate-in fade-in duration-100">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 text-center">
              Remover este documento?
            </h3>
            <p className="text-xs text-slate-600 text-center mt-1 truncate max-w-full font-medium">
              &quot;{getPublishedFileName(fileToDelete)}&quot;
            </p>
            <p className="text-[11px] text-slate-400 text-center mt-1">
              O arquivo será desvinculado desta publicação.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition cursor-pointer shadow-xs"
              >
                Sim, Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discrete File Inspection Modal (Visualizar Modal na Íntegra) */}
      {previewingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-2xs p-3 sm:p-4 animate-in fade-in duration-100 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    {getPublishedFileName(previewingFile)}
                  </h3>
                  <span className="text-[10px] text-slate-500">Documento Oficial PDF</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewingFile(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 space-y-3">
              {/* Official Sheet Preview Container */}
              <div className="border border-slate-300 rounded-xl bg-[#525659] p-2.5 shadow-inner">
                <div className="bg-[#323639] text-white px-3 py-1.5 rounded-t-lg flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate max-w-[200px] text-[11px]">
                      {getPublishedFileName(previewingFile)}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300">
                    Página 1 de 1
                  </div>
                </div>

                {/* PDF Sheet Preview Area */}
                <div className="relative bg-white rounded-lg p-5 shadow-sm min-h-[300px] max-h-[380px] overflow-y-auto flex flex-col justify-between">
                  <div 
                    className={`transition-all duration-300 ${
                      readOnly && isPdfBlurred && !localUnblurred
                        ? 'filter blur-[6px] opacity-40 select-none pointer-events-none'
                        : 'filter-none opacity-100'
                    }`}
                  >
                    <div className="text-center pb-3 border-b border-slate-200 space-y-1">
                      <div className="w-9 h-9 mx-auto mb-1">
                        <Brasao className="w-full h-full object-contain" />
                      </div>
                      <h4 className="text-[10px] font-bold text-slate-800 tracking-wider">
                        ESTADO DO TOCANTINS
                      </h4>
                      <h3 className="text-xs font-extrabold text-slate-900 tracking-wide">
                        PREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS
                      </h3>
                      <p className="text-[9px] text-slate-500 uppercase">
                        CNPJ: {siteConfig.cnpj} • Gabinete do Prefeito
                      </p>
                    </div>

                    <div className="py-3 space-y-2 text-[11px] text-slate-800 leading-relaxed font-serif">
                      <div className="text-center font-bold font-sans text-xs pb-1" style={{ color: primaryColor }}>
                        {documentTitle.toUpperCase()} • {documentNumber}
                      </div>
                      <div className="text-right text-[10px] text-slate-600 italic pl-12">
                        &quot;{documentContent ? documentContent.slice(0, 180) + '...' : 'DOCUMENTO OFICIAL REGISTRADO NO PORTAL DA TRANSPARÊNCIA'}&quot;
                      </div>
                      <div className="pt-2 text-justify space-y-2 whitespace-pre-line text-[10.5px]">
                        {documentContent || (
                          <>
                            <p>
                              O PREFEITO MUNICIPAL DE SÃO MIGUEL DO TOCANTINS, Estado do Tocantins, no uso de suas atribuições legais e constitucionais que lhe são conferidas pela Lei Orgânica do Município;
                            </p>
                            <p className="font-semibold text-center py-1 font-sans">
                              RESOLVE:
                            </p>
                            <p>
                              Art. 1º Fica homologado e publicado no Diário Oficial o presente ato de {documentNumber}, com plena eficácia jurídica e efeitos imediatos a partir de sua publicação.
                            </p>
                            <p>
                              Art. 2º Revogam-se as disposições em contrário.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Blur Overlay with Unlock Button for Visitors */}
                  {readOnly && isPdfBlurred && !localUnblurred && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-slate-900/30 backdrop-blur-[2px] rounded-lg transition-all">
                      <div className="bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-2xl border border-slate-200 text-center space-y-2.5 max-w-xs animate-in zoom-in-95 duration-150">
                        <div 
                          className="w-11 h-11 rounded-full flex items-center justify-center mx-auto shadow-2xs bg-emerald-100 text-emerald-800"
                        >
                          <Shield className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <h4 className="font-bold text-xs text-slate-800">
                          Visualizador de Documento
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          Clique para desbloquear e visualizar o documento na íntegra.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsUnblurring(true);
                            setTimeout(() => {
                              setLocalUnblurred(true);
                              setIsUnblurring(false);
                              if (onUnlockBlur) onUnlockBlur();
                            }, 300);
                          }}
                          disabled={isUnblurring}
                          style={{ backgroundColor: primaryColor }}
                          className="w-full text-white py-2 px-3 rounded-lg font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          {isUnblurring ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isUnblurring ? 'Desbloqueando...' : 'VISUALIZAR DOCUMENTO'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setPreviewingFile(null)}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadFile(previewingFile);
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-[#0b5444] hover:bg-[#084336] rounded-xl transition cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Documento</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          1. CABEÇALHO DO PAINEL ESQUERDO
          - Exibe estritamente o título e a quantidade: "ANEXOS (X)"
         ========================================================================= */}
      <div className="bg-gradient-to-b from-[#e5e7eb] to-[#d1d5db] border-b border-slate-300 py-2 px-4 sm:px-5 flex items-center justify-between text-xs font-bold text-slate-700 tracking-wider shadow-2xs shrink-0">
        <span className="uppercase">ANEXOS ({files.length})</span>
        <span className="text-[10.5px] text-slate-500 font-normal">
          {!hasFiles ? 'Nenhum documento' : `${files.length} arquivo(s)`}
        </span>
      </div>

      {/* =========================================================================
          2. ÁREA CENTRAL
          - ESTADO VAZIO: Grande zona de upload ou aviso de vazio
          - ESTADO COM 1 ARQUIVO:
              * Card limpo com nome publicado ("Documento Principal"), ícone, olhinho e baixar
              * Sem tamanho (MB), sem data e sem linha "Classificação" (tanto público quanto Admin)
              * Pré-visualizado abaixo com borrão e botão "VISUALIZAR DOCUMENTO"
          - ESTADO COM MÚLTIPLOS ARQUIVOS (> 1):
              * Forma padrão com a lista limpa de arquivos
         ========================================================================= */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {!hasFiles ? (
          /* =====================================================================
             ESTADO 1: VAZIO — SEM ARQUIVOS
             ===================================================================== */
          readOnly ? (
            <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-xl border border-slate-200 bg-white/70">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3 shadow-2xs">
                <FileText className="w-8 h-8 stroke-1" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                Nenhum documento anexado
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1.5 leading-relaxed">
                Esta publicação ainda não possui arquivos digitais disponíveis para consulta pública.
              </p>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-xl border-2 border-dashed border-slate-300 bg-white/70 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-400 hover:text-emerald-700 flex items-center justify-center transition-colors mb-3 shadow-2xs">
                <FileText className="w-8 h-8 stroke-1" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                Nenhum documento anexado
              </h4>
            </div>
          )
        ) : files.length === 1 ? (
          /* =====================================================================
             ESTADO 2A: PROCESSO COM APENAS 1 ARQUIVO
             - Card limpo do arquivo com nome publicado ("Documento Principal")
             - Sem tamanho, sem data e sem texto "Classificação"
             - Apenas ícone de folha, nome, ícone de olhinho e botão de baixar
             - Não muda de cor ao passar o mouse, apenas a área do ícone
             - Abaixo do card: documento pré-visualizado em folha oficial com borrão
             - Só revela após o clique no botão "VISUALIZAR DOCUMENTO" ou no olhinho
             ===================================================================== */
          (() => {
            const singleFile = files[0];
            const publishedName = getPublishedFileName(singleFile, 0, 1);
            return (
              <div className="space-y-3">
                {/* Single file card matching user specification - only icon area reacts to hover */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 hover:bg-emerald-200/80 text-emerald-800 transition-colors flex items-center justify-center shrink-0 cursor-default">
                      <FileText className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {readOnly ? (
                        <span className="text-xs sm:text-sm font-bold text-slate-800 block truncate" title={publishedName}>
                          {publishedName}
                        </span>
                      ) : (
                        <AppSelect
                          value={singleFile.documentTypeId || 'edital'}
                          onChange={(val) => handleDocumentTypeChange(singleFile.id, val)}
                          options={availableDocumentTypes.map((type) => ({
                            value: type.id,
                            label: type.name,
                          }))}
                          compact={true}
                          className="w-full"
                        />
                      )}
                    </div>
                  </div>

                  {/* Contextual actions: Eye icon + Download button */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (!singlePreviewUnblurred) {
                          setIsUnblurringSingle(true);
                          setTimeout(() => {
                            setSinglePreviewUnblurred(true);
                            setIsUnblurringSingle(false);
                            if (onUnlockBlur) onUnlockBlur();
                          }, 300);
                        } else {
                          setPreviewingFile(singleFile);
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                      title="Visualizar documento"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadFile(singleFile, 0)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                      title="Baixar documento"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Simulated PDF Canvas Pré-visualizado diretamente no painel */}
                <div className="border border-slate-300 rounded-xl bg-slate-100 overflow-hidden shadow-inner flex flex-col">
                  {/* Preview Topbar */}
                  <div className="bg-[#323639] text-white px-3 py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300 min-w-0">
                      <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[200px] text-[11px] font-medium">{publishedName}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {singlePreviewUnblurred && (
                        <span className="text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded flex items-center gap-1">
                          <FileCheck2 className="w-3 h-3 text-emerald-400" />
                          <span>Autêntico</span>
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-400">Página 1 de 1</span>
                    </div>
                  </div>

                  {/* Simulated PDF Sheet */}
                  <div className="relative p-3 sm:p-4 min-h-[460px] flex flex-col justify-start overflow-hidden">
                    <div
                      className={`bg-white border border-slate-200/90 rounded-lg shadow-sm p-4 sm:p-6 text-slate-800 transition-all duration-300 ${
                        !singlePreviewUnblurred
                          ? 'filter blur-[7px] opacity-40 select-none pointer-events-none'
                          : 'filter-none opacity-100'
                      }`}
                    >
                      {/* Municipal Header */}
                      <div className="text-center pb-3 border-b border-slate-200 space-y-1">
                        <div className="w-10 h-10 mx-auto mb-1">
                          <Brasao className="w-full h-full object-contain drop-shadow-2xs" />
                        </div>
                        <p className="text-[9.5px] font-bold text-slate-700 tracking-wider uppercase">
                          ESTADO DO TOCANTINS
                        </p>
                        <h3 className="text-xs font-extrabold text-[#0c2340] tracking-tight uppercase">
                          PREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS
                        </h3>
                        <p className="text-[8.5px] text-slate-500 uppercase tracking-widest">
                          Portal da Transparência • CNPJ: {siteConfig.cnpj}
                        </p>
                      </div>

                      {/* Body */}
                      <div className="py-4 space-y-3 text-[11px] text-slate-800 leading-relaxed font-serif">
                        <div className="text-center font-bold font-sans text-xs pb-1" style={{ color: primaryColor }}>
                          {documentTitle.toUpperCase()} • {documentNumber}
                        </div>
                        <div className="text-right text-[10.5px] text-slate-600 italic pl-10 border-l-2 border-slate-200 py-1">
                          &quot;{documentContent ? documentContent.slice(0, 220) + '...' : 'DOCUMENTO OFICIAL HOMOLOGADO E PUBLICADO NO PORTAL DA TRANSPARÊNCIA'}&quot;
                        </div>
                        <div className="pt-2 text-justify space-y-2 whitespace-pre-line text-[11px] font-sans">
                          {documentContent || (
                            <>
                              <p>
                                O PREFEITO MUNICIPAL DE SÃO MIGUEL DO TOCANTINS, Estado do Tocantins, no uso de suas atribuições legais e constitucionais que lhe são conferidas pela Lei Orgânica do Município;
                              </p>
                              <p className="font-semibold text-center py-1">
                                RESOLVE:
                              </p>
                              <p>
                                Art. 1º Fica homologado e publicado no Diário Oficial e Portal da Transparência o presente ato de {documentNumber}, com plena eficácia jurídica e efeitos imediatos a partir de sua publicação.
                              </p>
                              <p>
                                Art. 2º Determina-se a ampla publicidade e registro nos autos processuais competentes.
                              </p>
                              <p>
                                Art. 3º Revogam-se as disposições em contrário.
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Footer Stamp */}
                      <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                        <span>Certificação Digital ICP-Brasil</span>
                        <span>Publicação Oficial Registrada</span>
                      </div>
                    </div>

                    {/* Blur Overlay with Button: "só mostrar depois que a gente clicar pra visualizar" */}
                    {!singlePreviewUnblurred && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-slate-900/30 backdrop-blur-[3px] rounded-b-xl transition-all">
                        <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-200 text-center space-y-3 max-w-xs animate-in zoom-in-95 duration-150">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-2xs bg-emerald-100 text-emerald-800">
                            <Eye className="w-6 h-6 stroke-[2.2] text-emerald-700" />
                          </div>
                          <h4 className="font-bold text-sm text-slate-900">
                            Visualizador de Documento
                          </h4>
                          <p className="text-xs text-slate-500 leading-snug">
                            Clique no botão abaixo para desbloquear e visualizar o documento na íntegra.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setIsUnblurringSingle(true);
                              setTimeout(() => {
                                setSinglePreviewUnblurred(true);
                                setIsUnblurringSingle(false);
                                if (onUnlockBlur) onUnlockBlur();
                              }, 300);
                            }}
                            disabled={isUnblurringSingle}
                            style={{ backgroundColor: primaryColor }}
                            className="w-full text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
                          >
                            {isUnblurringSingle ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                            <span>{isUnblurringSingle ? 'Carregando...' : 'VISUALIZAR DOCUMENTO'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          /* =====================================================================
             ESTADO 2B: COM MÚLTIPLOS ARQUIVOS (caso contrário -> visualização padrão)
             - Cada arquivo na listagem com card limpo
             - Nome publicado, ícone, botão olhinho e botão baixar
             - Sem tamanho, sem data, sem caixa de classificação
             ===================================================================== */
          <div className="space-y-2.5">
            {files.map((file, index) => {
              const publishedName = getPublishedFileName(file, index, files.length);
              return (
                <div
                  key={file.id}
                  className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 hover:bg-emerald-200/80 text-emerald-800 transition-colors flex items-center justify-center shrink-0 cursor-default">
                      <FileText className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {readOnly ? (
                        <span className="text-xs sm:text-sm font-bold text-slate-800 block truncate" title={publishedName}>
                          {publishedName}
                        </span>
                      ) : (
                        <AppSelect
                          value={file.documentTypeId || 'edital'}
                          onChange={(val) => handleDocumentTypeChange(file.id, val)}
                          options={availableDocumentTypes.map((type) => ({
                            value: type.id,
                            label: type.name,
                          }))}
                          compact={true}
                          className="w-full"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setPreviewingFile(file)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                      title="Visualizar documento na íntegra"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadFile(file, index)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                      title="Baixar documento"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          3. RODAPÉ DO PAINEL ESQUERDO
          - Administrador: Botão "Adicionar" que abre o seletor nativo
          - Visitante (ReadOnly): Indicador de transparência e botão para baixar documento
         ========================================================================= */}
      <div className="p-3 sm:p-4 border-t border-slate-200 bg-white/95 backdrop-blur-2xs shrink-0 flex items-center justify-between shadow-2xs">
        {readOnly ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Documentos oficiais disponíveis para consulta</span>
            </div>
            {hasFiles && (
              <button
                type="button"
                onClick={() => handleDownloadFile(files[0], 0)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition cursor-pointer"
                title="Baixar documento oficial"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Baixar Documento</span>
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0b5444] hover:bg-[#084336] text-white text-xs font-bold rounded-lg transition cursor-pointer shadow-xs active:scale-[0.98]"
            title="Selecionar arquivo do computador"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Adicionar</span>
          </button>
        )}
      </div>
    </div>
  );
};
