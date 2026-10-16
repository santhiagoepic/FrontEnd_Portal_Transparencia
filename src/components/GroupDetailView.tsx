import React, { useState, useEffect, useTransition, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Home, 
  Search, 
  Download, 
  Calendar, 
  ChevronDown, 
  ArrowRight,
  Eye,
  Shield,
  FileText,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  FileQuestion,
  Sparkles,
  ExternalLink,
  PlusCircle,
  Trash2,
  Settings
} from 'lucide-react';
import { Brasao } from './Brasao.tsx';
import { GROUP_CONFIGS } from '../config/navigation.config';
import { useGroupDocuments } from '../hooks/useGroupDocuments';
import { DocumentoOficialDTO } from '../types/api.types';
import { useToast } from './Toast';
import { TableSkeleton } from './Skeleton';
import { siteConfig } from '../config/site.config';
import { useAuth } from '../context/AuthContext';
import { PermanentDocumentManager, ManagedFile } from './documents/PermanentDocumentManager';
import { AdminPublicationWorkspace } from './admin/AdminPublicationWorkspace';
import { LicitacoesConfigModal } from './admin/LicitacoesConfigModal';
import { LicitacoesAlertsPopover } from './admin/LicitacoesAlertsPopover';
import { licitacoesAlertsService } from '../services/licitacoesAlerts.service';
import {
  licitacoesConfigService,
  extractSimpleNumber,
  formatCombinedLicitacaoNumber,
} from '../services/licitacoesConfig.service';
import { AppStatusBadge } from './ui/AppStatusBadge';

interface GroupDetailViewProps {
  groupId: string;
  initialSubItem?: string;
  initialDocId?: string;
  onBackToHome: () => void;
  onSelectAnotherGroup: (groupId: string, subItem?: string, docId?: string) => void;
}

export const GroupDetailView: React.FC<GroupDetailViewProps> = ({
  groupId,
  initialSubItem,
  initialDocId,
  onBackToHome,
  onSelectAnotherGroup,
}) => {
  const { success, info, error: toastError } = useToast();
  const { currentUser, hasPermission, addAuditLog } = useAuth();
  const [, startTransition] = useTransition();

  // Granular permissions for current module
  const canViewAdmin = hasPermission(groupId, 'view_admin');
  const canCreate = hasPermission(groupId, 'create');
  const canEdit = hasPermission(groupId, 'edit');
  const canDeleteRecords = hasPermission(groupId, 'delete_records');
  const canReplaceFiles = hasPermission(groupId, 'replace_files');
  const canDeleteFiles = hasPermission(groupId, 'delete_files');

  // Get configuration and theme for the active group
  const config = GROUP_CONFIGS[groupId] || GROUP_CONFIGS['atos-normativos'];
  const theme = {
    primaryHex: config.primaryHex,
    softBgHex: config.softBgHex,
    softBorderHex: config.softBorderHex,
    textColor: config.textColor,
  };
  const groupName = config.title;
  const tabs = config.tabs;

  // Normalize initial tab matching subItem or default to first tab
  const getInitialTab = () => {
    if (!initialSubItem) return tabs[0];
    const upper = initialSubItem.toUpperCase();
    const match = tabs.find(t => upper.includes(t) || t.includes(upper));
    return match || tabs[0];
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab());

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAno, setSelectedAno] = useState<string>('Todos');
  const [covidFilter, setCovidFilter] = useState(false);

  // Fetch documents via service hook with full async states (idle, loading, success, empty, error)
  const { documents, isLoading, isError, isEmpty, error, refetch } = useGroupDocuments({
    groupId,
    tab: activeTab,
    search: searchQuery,
    ano: selectedAno,
  });

  // Local state for documents (to reflect newly added or deleted items immediately)
  const [localDocs, setLocalDocs] = useState<DocumentoOficialDTO[]>([]);

  useEffect(() => {
    setLocalDocs(documents);
  }, [documents]);

  // View mode: 'list' or 'detail' (Publication page)
  const [selectedDoc, setSelectedDoc] = useState<DocumentoOficialDTO | null>(null);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
  const [managedFiles, setManagedFiles] = useState<ManagedFile[]>([]);

  // Form Fields State
  const [editNumero, setEditNumero] = useState('');
  const [editAno, setEditAno] = useState('2026');
  const [editSecao, setEditSecao] = useState('Gabinete do Prefeito');
  const [editAssinatura, setEditAssinatura] = useState('');
  const [editEmenta, setEditEmenta] = useState('');
  const [editSignatario, setEditSignatario] = useState('Prefeito Municipal de São Miguel do Tocantins');
  const [editCargo, setEditCargo] = useState('Prefeito Municipal');
  const [editCovid, setEditCovid] = useState<boolean>(false);
  const [editTipoRelacao, setEditTipoRelacao] = useState<string>('Nenhuma');
  const [editAtosLeis, setEditAtosLeis] = useState<string>('Nenhum');
  const [isSaving, setIsSaving] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const currentDocsList = localDocs.length > 0 ? localDocs : documents;
  const licitacoesAlerts = React.useMemo(
    () => licitacoesAlertsService.computeAlertsForDocuments(currentDocsList),
    [currentDocsList]
  );

  const handleSelectDocById = (id: string) => {
    const found = currentDocsList.find((d) => d.id === id);
    if (found) {
      setSelectedDoc(found);
      setIsNewRecord(false);
      setIsPdfBlurred(true);
    }
  };

  const getSituacaoName = (doc: DocumentoOficialDTO): string => {
    const detailed = licitacoesConfigService.getLicitacaoDetalhada(doc.id);
    if (detailed) {
      const sit = licitacoesConfigService.getSituacoes().find((s) => s.id === detailed.situacaoId);
      if (sit) return sit.nome;
    }
    if (doc.numero.includes('014')) return 'Aberta';
    if (doc.numero.includes('028')) return 'Homologada';
    if (doc.numero.includes('SANC') || doc.numero.includes('022')) return 'Encerrada';
    return 'Em Andamento';
  };


  const getSingularTitle = () => {
    const tab = activeTab.toLowerCase();
    if (tab.includes('portaria')) return 'Portaria';
    if (tab.includes('decreto')) return 'Decreto';
    if (tab.includes('lei')) return 'Lei';
    if (tab.includes('resolu')) return 'Resolução';
    if (tab.includes('edital') || tab.includes('licita')) return 'Licitação';
    if (tab.includes('contrato')) return 'Contrato';
    return activeTab;
  };

  const handleStartNewPublication = () => {
    const today = new Date().toLocaleDateString('pt-BR');
    const newDocTemplate: DocumentoOficialDTO = {
      id: `new-${Date.now()}`,
      groupId,
      tab: activeTab,
      numero: '',
      numeroSimples: '',
      ano: '2026',
      secao: 'Gabinete do Prefeito',
      assinatura: today,
      ementa: '',
      signatario: 'Prefeito Municipal de São Miguel do Tocantins',
      cargoSignatario: 'Prefeito Municipal',
      anexoNome: '',
      anexoTamanho: '',
      orgaoEmissor: 'Gabinete do Prefeito',
      categoria: activeTab,
      textoIntegral: '',
    };

    setSelectedDoc(newDocTemplate);
    setIsNewRecord(true);
    setManagedFiles([]);
    setEditNumero('');
    setEditAno('2026');
    setEditSecao('Gabinete do Prefeito');
    setEditAssinatura(today);
    setEditEmenta('');
    setEditSignatario('Prefeito Municipal de São Miguel do Tocantins');
    setEditCargo('Prefeito Municipal');
    setEditCovid(false);
    setEditTipoRelacao('Nenhuma');
    setEditAtosLeis('Nenhum');
  };

  // Reset tab and selected document whenever group changes, or handle initialDocId
  useEffect(() => {
    setActiveTab(getInitialTab());
    setSearchQuery('');

    if (initialDocId === 'new') {
      handleStartNewPublication();
    } else if (initialDocId) {
      const match = localDocs.find(d => d.id === initialDocId);
      if (match) {
        setSelectedDoc(match);
        setIsNewRecord(false);
      }
    } else {
      setSelectedDoc(null);
      setIsNewRecord(false);
      setIsPdfBlurred(true);
    }
  }, [groupId, initialSubItem, initialDocId]);

  // Synchronize editing fields and populate managedFiles when opening a document
  useEffect(() => {
    if (selectedDoc && !isNewRecord) {
      setEditNumero(selectedDoc.numero);
      setEditAno(selectedDoc.ano || '2026');
      setEditSecao(selectedDoc.secao || 'Gabinete do Prefeito');
      setEditAssinatura(selectedDoc.assinatura);
      setEditEmenta(selectedDoc.ementa);
      setEditSignatario(selectedDoc.signatario || 'Prefeito Municipal de São Miguel do Tocantins');
      setEditCargo(selectedDoc.cargoSignatario || 'Prefeito Municipal');

      // Populate managed files for document manager with published friendly name
      if (selectedDoc.anexoNome) {
        setManagedFiles([
          {
            id: `file-${selectedDoc.id}`,
            name: 'Documento Principal',
            formattedSize: selectedDoc.anexoTamanho || '720 KB',
            status: 'ready',
            progress: 100,
            uploadedAt: selectedDoc.assinatura,
            isMain: true,
            documentTypeId: 'edital',
          },
        ]);
      } else {
        setManagedFiles([]);
      }

      if (canEdit || canViewAdmin) {
        setIsPdfBlurred(false);
      } else {
        setIsPdfBlurred(true);
      }
    }
  }, [selectedDoc, isNewRecord, canEdit, canViewAdmin]);

  // PDF Viewer State (Blur toggle, zoom, rotation)
  const [isPdfBlurred, setIsPdfBlurred] = useState<boolean>(true);
  const [pdfZoom, setPdfZoom] = useState<number>(100);
  const [pdfRotation, setPdfRotation] = useState<number>(0);

  // Action button states (prevent double-clicks & provide visual feedback)
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isUnblurring, setIsUnblurring] = useState(false);

  // Dropdown states
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  // Filtered documents list (applying client-side COVID or other fast filters)
  const filteredDocs = localDocs.filter((doc) => {
    if (covidFilter) {
      const isCovid = doc.ementa.toLowerCase().includes('covid') || 
                      doc.secao.toLowerCase().includes('covid');
      if (!isCovid) return false;
    }
    return true;
  });

  // Save changes handler (Idempotent for both new and existing records)
  const handleSaveDoc = () => {
    if (!selectedDoc) return;

    if (isNewRecord && !editNumero.trim() && !editEmenta.trim()) {
      toastError('Preencha ao menos o número ou a ementa da publicação antes de salvar.');
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      const mainFile = managedFiles.find(f => f.status === 'ready') || managedFiles[0];
      const fileName = mainFile
        ? (mainFile.documentTypeId === 'edital' || mainFile.isMain || managedFiles.length === 1 ? 'Documento Principal' : mainFile.name)
        : 'Documento Principal';
      const fileSize = mainFile?.formattedSize || selectedDoc.anexoTamanho || '720 KB';

      let saveNumero = editNumero;
      let saveAno = editAno || '2026';
      let saveCategoria = activeTab;

      if (groupId === 'licitacoes' || selectedDoc?.groupId === 'licitacoes') {
        const detailed = licitacoesConfigService.getLicitacaoDetalhada(selectedDoc?.id || '');
        if (detailed) {
          const modalidades = licitacoesConfigService.getModalidades();
          const modalidadeNome =
            modalidades.find((m) => m.id === detailed.modalidadeId)?.nome || 'Pregão Eletrônico';
          const cleanNum = extractSimpleNumber(detailed.numero || editNumero);
          saveAno = detailed.ano || editAno || '2026';
          saveNumero = cleanNum ? `${cleanNum}/${saveAno}` : editNumero;
          saveCategoria = modalidadeNome;
        }
      }

      if (isNewRecord) {
        const createdDoc: DocumentoOficialDTO = {
          ...selectedDoc,
          id: `doc-${Date.now()}`,
          numero: saveNumero || `Nº 0${Math.floor(Math.random() * 90 + 10)}/2026`,
          ano: saveAno,
          secao: editSecao || 'Gabinete do Prefeito',
          assinatura: editAssinatura || new Date().toLocaleDateString('pt-BR'),
          ementa: editEmenta || `PUBLICAÇÃO OFICIAL DE ${activeTab.toUpperCase()}`,
          signatario: editSignatario || 'Prefeito Municipal de São Miguel do Tocantins',
          cargoSignatario: editCargo || 'Prefeito Municipal',
          anexoNome: fileName,
          anexoTamanho: fileSize,
          categoria: saveCategoria,
        };

        setLocalDocs(prev => [createdDoc, ...prev]);
        setSelectedDoc(createdDoc);
        setIsNewRecord(false);

        addAuditLog({
          module: groupId,
          moduleTitle: groupName,
          action: 'Cadastro de publicação',
          recordId: createdDoc.id,
          recordTitle: createdDoc.numero,
          details: `Nova publicação cadastrada via página individual por ${currentUser?.name || 'Administrador'} com ${managedFiles.length} documento(s) anexado(s)`,
        });

        setIsSaving(false);
        success('Publicação cadastrada com sucesso!');
      } else {
        const updatedDoc: DocumentoOficialDTO = {
          ...selectedDoc,
          numero: saveNumero || selectedDoc.numero,
          ano: saveAno || selectedDoc.ano,
          categoria: saveCategoria || selectedDoc.categoria,
          secao: editSecao || selectedDoc.secao,
          assinatura: editAssinatura || selectedDoc.assinatura,
          ementa: editEmenta || selectedDoc.ementa,
          signatario: editSignatario || selectedDoc.signatario,
          cargoSignatario: editCargo || selectedDoc.cargoSignatario,
          anexoNome: fileName,
          anexoTamanho: fileSize,
        };

        setSelectedDoc(updatedDoc);
        setLocalDocs(prev => prev.map(d => d.id === selectedDoc.id ? updatedDoc : d));

        addAuditLog({
          module: groupId,
          moduleTitle: groupName,
          action: 'Atualização de publicação',
          recordId: selectedDoc.id,
          recordTitle: saveNumero || selectedDoc.numero,
          details: `Campos e documentos modificados por ${currentUser?.name || 'Administrador'}`,
        });

        setIsSaving(false);
        success('Alterações salvas com sucesso!');
      }
    }, 350);
  };

  const handleBackToList = () => {
    setSelectedDoc(null);
    setIsNewRecord(false);
    setIsPdfBlurred(true);
    setManagedFiles([]);
  };

  // Replace PDF file handler (Requirement 8)
  const handleReplacePdf = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && selectedDoc) {
        const updatedDoc: DocumentoOficialDTO = {
          ...selectedDoc,
          anexoNome: file.name,
          anexoTamanho: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        };
        setSelectedDoc(updatedDoc);
        setLocalDocs(prev => prev.map(d => d.id === selectedDoc.id ? updatedDoc : d));

        addAuditLog({
          module: groupId,
          moduleTitle: groupName,
          action: 'Arquivo substituído',
          recordId: selectedDoc.id,
          recordTitle: selectedDoc.numero,
          details: `PDF substituído por ${currentUser?.name}: ${file.name}`,
        });

        success('Arquivo substituído com sucesso!');
      }
    };
    input.click();
  };

  // Remove PDF document handler (Requirement 8)
  const handleRemovePdf = () => {
    if (!selectedDoc) return;
    if (confirm(`Tem certeza que deseja remover o documento principal da publicação ${selectedDoc.numero}?`)) {
      addAuditLog({
        module: groupId,
        moduleTitle: groupName,
        action: 'Documento excluído',
        recordId: selectedDoc.id,
        recordTitle: selectedDoc.numero,
        details: `Arquivo principal removido por ${currentUser?.name}`,
      });
      success('Documento excluído com sucesso!');
    }
  };

  // Delete record handler
  const handleDeleteRecord = (doc: DocumentoOficialDTO) => {
    if (confirm(`Tem certeza que deseja excluir permanentemente o registro ${doc.numero}?`)) {
      setLocalDocs(prev => prev.filter(d => d.id !== doc.id));
      addAuditLog({
        module: groupId,
        moduleTitle: groupName,
        action: 'Publicação excluída',
        recordId: doc.id,
        recordTitle: doc.numero,
        details: `Registro removido do portal por ${currentUser?.name} (${currentUser?.role})`,
      });
      success('Registro excluído com sucesso!');
    }
  };

  // Helper to format heading for any municipal document type
  const getDocHeading = (doc: DocumentoOficialDTO | null) => {
    if (!doc) return '';

    // Specialized Licitações naming: Modalidade + número + "/" + ano
    if (groupId === 'licitacoes' || doc.groupId === 'licitacoes') {
      const detailed = licitacoesConfigService.getLicitacaoDetalhada(doc.id);
      const modalidades = licitacoesConfigService.getModalidades();
      const modalidadeNome =
        modalidades.find((m) => m.id === detailed?.modalidadeId)?.nome ||
        (doc as any).modalidade ||
        doc.categoria ||
        'Pregão Eletrônico';
      const cleanNum = extractSimpleNumber(detailed?.numero || doc.numeroSimples || doc.numero);
      const ano = detailed?.ano || doc.ano || '2026';
      return cleanNum ? `${modalidadeNome} nº ${cleanNum}/${ano}` : `${modalidadeNome} - ${ano}`;
    }

    const num = doc.numero;
    if (
      num.toLowerCase().includes('port') || 
      num.toLowerCase().includes('dec') || 
      num.toLowerCase().includes('lei') || 
      num.toLowerCase().includes('pe ') || 
      num.toLowerCase().includes('disp') || 
      num.toLowerCase().includes('fp ') || 
      num.toLowerCase().includes('conv') || 
      num.toLowerCase().includes('rec') || 
      num.toLowerCase().includes('emp') ||
      num.toLowerCase().includes('obra') ||
      num.toLowerCase().includes('rel') ||
      num.toLowerCase().includes('bal') ||
      num.toLowerCase().includes('sic') ||
      num.toLowerCase().includes('med') ||
      num.toLowerCase().includes('sanc') ||
      num.toLowerCase().includes('ouv') ||
      num.toLowerCase().includes('em.') ||
      num.toLowerCase().includes('ct ') ||
      num.toLowerCase().includes('cp ') ||
      num.toLowerCase().includes('faq') ||
      num.toLowerCase().includes('reg')
    ) {
      return num;
    }
    const tabLabel = activeTab.charAt(0) + activeTab.slice(1).toLowerCase();
    return `${tabLabel} nº ${num}`;
  };

  // Navigation between documents in detail view
  const currentDocIndex = selectedDoc ? filteredDocs.findIndex(d => d.id === selectedDoc.id) : -1;

  const handlePrevDoc = () => {
    if (currentDocIndex > 0) {
      setSelectedDoc(filteredDocs[currentDocIndex - 1]);
      setIsPdfBlurred(true);
    }
  };

  const handleNextDoc = () => {
    if (currentDocIndex < filteredDocs.length - 1) {
      setSelectedDoc(filteredDocs[currentDocIndex + 1]);
      setIsPdfBlurred(true);
    }
  };

  const handleDownload = (doc: DocumentoOficialDTO) => {
    if (isDownloading) return;
    setIsDownloading(true);
    info('Iniciando download...', `${doc.anexoNome} (${doc.anexoTamanho})`);

    setTimeout(() => {
      setIsDownloading(false);
      success('Download concluído com sucesso!', `${doc.anexoNome} salvo no dispositivo.`);
    }, 1200);
  };

  const handleCopyLink = (doc: DocumentoOficialDTO) => {
    if (isCopying) return;
    setIsCopying(true);
    navigator.clipboard?.writeText(window.location.href);
    success('Link copiado!', `Link direto para o documento ${doc.numero} copiado.`);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const handleUnlockBlur = () => {
    if (isUnblurring) return;
    setIsUnblurring(true);
    setTimeout(() => {
      setIsPdfBlurred(false);
      setIsUnblurring(false);
      success('Visualizador desbloqueado', 'Documento renderizado em alta definição.');
    }, 300);
  };

  const handlePrint = () => {
    info('Preparando impressão...', 'Enviando documento para a impressora do sistema.');
    window.print();
  };

  const handleExportList = () => {
    info('Exportando registros...', `Gerando planilha CSV com ${filteredDocs.length} registros da consulta.`);
    setTimeout(() => {
      success('Exportação finalizada!', 'O arquivo CSV foi transferido para a sua máquina.');
    }, 1000);
  };

  return (
    <div className="w-full pb-20 bg-white">
      
      {/* 1. Breadcrumbs / Caminho da Página com Linha de Divisão Horizontal */}
      <div className="bg-slate-50 border-b border-slate-200 py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 flex-wrap" aria-label="Caminho da página">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 hover:text-slate-800 font-medium transition cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>Início</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <button
              onClick={onBackToHome}
              className="hover:text-slate-800 font-medium transition cursor-pointer"
            >
              Principais Áreas de Consulta
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            
            {/* Interactive Group Badge with Dropdown Switcher */}
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setGroupDropdownOpen(!groupDropdownOpen)}
                className="font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 transition cursor-pointer hover:opacity-90 shadow-2xs"
                style={{ color: theme.primaryHex, backgroundColor: theme.softBgHex }}
                title="Clique para alternar entre os grupos"
              >
                <span>{groupName}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {groupDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setGroupDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 top-7 z-50 bg-white border border-slate-200 shadow-2xl rounded-xl py-2 w-72 max-h-96 overflow-y-auto text-xs">
                    <div className="px-3 py-1 font-bold text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100 mb-1">
                      Alternar para outro grupo:
                    </div>
                    {Object.values(GROUP_CONFIGS).map((g) => (
                      <button
                        key={g.groupId}
                        type="button"
                        onClick={() => {
                          setGroupDropdownOpen(false);
                          onSelectAnotherGroup(g.groupId);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer ${
                          g.groupId === groupId ? 'font-bold bg-slate-50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ backgroundColor: g.primaryHex }} 
                          />
                          <span>{g.title}</span>
                        </div>
                        {g.groupId === groupId && (
                          <span className="text-[10px] font-bold text-slate-400">Ativo</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            
            {/* Active Tab */}
            <span className="font-semibold text-slate-700 capitalize">
              {activeTab.toLowerCase()}
            </span>

            {/* If in detail view, also show document number */}
            {selectedDoc && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-bold text-slate-900 truncate max-w-[180px] sm:max-w-xs">
                  {isNewRecord ? `Nova ${getSingularTitle()}` : getDocHeading(selectedDoc)}
                </span>
              </>
            )}

            {/* Demonstrative mode badge for transparency compliance */}
            <div className="ml-auto hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 text-[11px] text-slate-600 border border-slate-200">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Base Demonstrativa Oficial • {siteConfig.municipality} - {siteConfig.state}</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* =========================================================================
            TOP TABS MENU (Browser-Style Horizontal Navigation)
            - Following the exact color of the group (border bottom & active tab)
           ========================================================================= */}
        <div 
          className="border-b-2 flex items-center gap-1 overflow-x-auto no-scrollbar"
          style={{ borderColor: theme.primaryHex }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  startTransition(() => {
                    setActiveTab(tab);
                    setSelectedDoc(null);
                    setIsPdfBlurred(true);
                  });
                }}
                style={
                  isActive
                    ? {
                        backgroundColor: theme.primaryHex,
                        borderColor: theme.primaryHex,
                        color: '#ffffff',
                      }
                    : undefined
                }
                className={`px-5 py-2 text-xs sm:text-[13px] font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap rounded-t-sm border border-b-0 ${
                  isActive
                    ? 'shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            SCREEN 1: LISTING VIEW (IMAGE 2)
            - Filter Bar on top
            - Table without surrounding box, separated ONLY by horizontal lines
            - Skeleton Loading during data fetch
            - Empty and Error state handling
            - Clicking a row opens the individual document viewer screen
           ========================================================================= */}
        {!selectedDoc ? (
          <div className="pt-4 space-y-3">
            
            {/* Filter Bar (Matching Image 2) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              
              {/* Search input with live filter */}
              <div className="relative min-w-[220px] max-w-sm flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar nesta lista..."
                  className="w-full pl-3 pr-8 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-sm outline-none transition focus:ring-1"
                  style={{ borderColor: searchQuery ? theme.primaryHex : undefined }}
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
              </div>

              {/* COVID-19 filter */}
              <button
                type="button"
                onClick={() => setCovidFilter(!covidFilter)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border rounded-sm transition cursor-pointer ${
                  covidFilter
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-400 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>FILTRAR COVID-19</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Year / Period filter */}
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-sm transition cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>ANO: {selectedAno}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {yearDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setYearDropdownOpen(false)} />
                    <div className="absolute left-0 top-8 z-40 bg-white border border-slate-200 shadow-lg rounded-sm py-1 w-32 text-xs">
                      {['Todos', '2026', '2025', '2024', '2023', '2022'].map((ano) => (
                        <button
                          key={ano}
                          type="button"
                          onClick={() => {
                            setSelectedAno(ano);
                            setYearDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 ${
                            selectedAno === ano ? 'font-bold text-slate-900 bg-slate-50' : 'text-slate-600'
                          }`}
                        >
                          {ano}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Action buttons group with responsive wrapping */}
              <div className="flex items-center gap-2 flex-wrap sm:ml-auto">
                {/* Reload / Refresh data */}
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-sm transition cursor-pointer"
                  title="Atualizar dados da tabela"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>ATUALIZAR</span>
                </button>

                {/* Export button */}
                <button
                  type="button"
                  onClick={handleExportList}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-sm transition cursor-pointer"
                >
                  <span>EXPORTAR</span>
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Licitações Alerts and Notifications Central */}
                {groupId === 'licitacoes' && (
                  <LicitacoesAlertsPopover
                    alerts={licitacoesAlerts}
                    onSelectLicitacao={handleSelectDocById}
                  />
                )}

                {/* Licitações Admin Configurations Gear */}
                {groupId === 'licitacoes' && (canEdit || canCreate) && (
                  <button
                    type="button"
                    onClick={() => setIsConfigModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-sm transition cursor-pointer"
                    title="Configurações Administrativas do Módulo de Licitações"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden sm:inline">CONFIGURAÇÕES</span>
                  </button>
                )}

                {/* Administrative Action: + Adicionar Registro na própria página individual */}
                {canCreate && (
                  <button
                    type="button"
                    onClick={handleStartNewPublication}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white rounded-sm transition cursor-pointer shadow-xs"
                    style={{ backgroundColor: theme.primaryHex }}
                    title="Cadastrar nova publicação no módulo"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>ADICIONAR</span>
                  </button>
                )}
              </div>
            </div>

            {/* Helper status text */}
            <div className="text-[11.5px] text-slate-400 pt-0.5 flex items-center justify-between">
              <span>
                {searchQuery
                  ? `Filtrando por: "${searchQuery}" (${filteredDocs.length} registros)`
                  : `Exibindo ${filteredDocs.length} registros para ${groupName} • ${activeTab}`}
              </span>
              {selectedAno !== 'Todos' && (
                <span className="font-semibold text-slate-600">Exercício: {selectedAno}</span>
              )}
            </div>

            {/* Horizontal Line separating filter bar and table */}
            <hr className="border-t border-slate-200 my-2" />

            {/* Skeleton Loading State */}
            {isLoading && (
              <div className="py-2">
                <TableSkeleton rows={6} />
              </div>
            )}

            {/* Error State with Retry Button */}
            {isError && (
              <div className="py-12 px-4 text-center border-b border-slate-200">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Falha ao consultar a base de dados</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {error || 'Não foi possível carregar as informações desta seção. Verifique a conexão com o servidor ou tente novamente.'}
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white rounded-md shadow-xs transition"
                  style={{ backgroundColor: theme.primaryHex }}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Tentar novamente</span>
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && isEmpty && (
              <div className="py-14 px-4 text-center border-b border-slate-200">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <FileQuestion className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Nenhum registro encontrado</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Não foram localizados documentos para a aba &quot;{activeTab}&quot; com os filtros atuais.
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-xs font-semibold text-slate-700 underline cursor-pointer"
                  >
                    Limpar termo de busca
                  </button>
                )}
              </div>
            )}

            {/* Table: SEPARATED ONLY BY HORIZONTAL LINES! */}
            {!isLoading && !isError && !isEmpty && (
              <div className="w-full overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
                <table className="w-full text-left border-collapse min-w-[720px]">
                  {/* Header with metallic gradient */}
                  <thead>
                    <tr className="bg-gradient-to-b from-[#e5e7eb] to-[#d1d5db] border-y border-slate-300 text-slate-700 text-xs font-bold shadow-2xs">
                      <th className="py-2.5 px-4 w-32 whitespace-nowrap">Número</th>
                      <th className="py-2.5 px-4 w-36 whitespace-nowrap">{groupId === 'licitacoes' ? 'Modalidade' : 'Seção'}</th>
                      <th className="py-2.5 px-4 w-28 whitespace-nowrap">{groupId === 'licitacoes' ? 'Abertura' : 'Assinatura'}</th>
                      <th className="py-2.5 px-4">{groupId === 'licitacoes' ? 'Objeto da Licitação' : 'Ementa'}</th>
                      {groupId === 'licitacoes' && (
                        <th className="py-2.5 px-4 w-32 whitespace-nowrap">Situação</th>
                      )}
                      <th className="py-2.5 px-4 w-28 text-right whitespace-nowrap">Ação</th>
                    </tr>
                  </thead>

                  {/* Rows with clear horizontal division lines */}
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-[13px] bg-white">
                    {filteredDocs.map((doc) => (
                      <tr
                        key={doc.id}
                        onClick={() => {
                          setSelectedDoc(doc);
                          setIsPdfBlurred(true);
                        }}
                        className="hover:bg-slate-50 transition-colors cursor-pointer group border-b border-slate-200"
                      >
                        <td 
                          className="py-3 px-4 font-mono font-bold whitespace-nowrap transition-colors"
                          style={{ color: theme.primaryHex }}
                        >
                          {doc.numero}
                        </td>
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {groupId === 'licitacoes' ? (doc.categoria || doc.secao || 'Pregão') : (doc.secao || '-')}
                        </td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                          {doc.assinatura}
                        </td>
                        <td className="py-3 px-4 text-slate-700 leading-snug uppercase group-hover:text-slate-900">
                          {doc.ementa}
                        </td>
                        {groupId === 'licitacoes' && (
                          <td className="py-3 px-4 whitespace-nowrap">
                            <AppStatusBadge status={getSituacaoName(doc)} size="sm" />
                          </td>
                        )}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-sm border transition"
                              style={{ 
                                color: theme.primaryHex, 
                                borderColor: theme.softBorderHex,
                                backgroundColor: theme.softBgHex 
                              }}
                            >
                              <Eye className="w-3 h-3" />
                              <span>Ver</span>
                            </button>

                            {/* Administrative Row Delete (Requirement 6) */}
                            {canDeleteRecords && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteRecord(doc);
                                }}
                                className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
                                title="Excluir este registro permanentemente"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        ) : (
          /* =========================================================================
              SCREEN 2: INDIVIDUAL DOCUMENT VIEWER (PDF VIEWER FORMAT)
              - Horizontal dividing lines
              - Left: ANEXO, PDF Viewer with Blur Overlay & button to un-blur, download
              - Right: Document metadata with horizontal lines and VOLTAR button
             ========================================================================= */
          <div className="pt-3 space-y-4">
            
            {/* Navigation Arrows (Image 3: ← →) and Quick Actions */}
            <div className="flex items-center justify-between pb-1 text-slate-400">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevDoc}
                  disabled={currentDocIndex <= 0}
                  className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition"
                  title="Documento anterior"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-600" />
                </button>
                <button
                  type="button"
                  onClick={handleNextDoc}
                  disabled={currentDocIndex >= filteredDocs.length - 1}
                  className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition"
                  title="Próximo documento"
                >
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>
                <span className="text-xs text-slate-400 ml-2">
                  Registro {currentDocIndex + 1} de {filteredDocs.length}
                </span>
              </div>

              {/* Copy Direct Link button */}
              <button
                type="button"
                onClick={() => handleCopyLink(selectedDoc)}
                disabled={isCopying}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-sm hover:bg-slate-50 transition cursor-pointer"
              >
                {isCopying ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopying ? 'Link copiado!' : 'Copiar Link'}</span>
              </button>
            </div>

            {/* Horizontal Line below navigation arrows */}
            <hr className="border-t border-slate-200" />

            {/* Unified Continuous Workspace: Shared between Visitors and Administrators */}
            <AdminPublicationWorkspace
                files={managedFiles}
                onFilesChange={setManagedFiles}
                primaryColor={theme.primaryHex}
                moduleLabel={getSingularTitle()}
                isNewRecord={isNewRecord}
                selectedDoc={selectedDoc}
                docHeading={getDocHeading(selectedDoc)}
                editNumero={editNumero}
                setEditNumero={setEditNumero}
                editAssinatura={editAssinatura}
                setEditAssinatura={setEditAssinatura}
                editCovid={editCovid}
                setEditCovid={setEditCovid}
                editSecao={editSecao}
                setEditSecao={setEditSecao}
                editEmenta={editEmenta}
                setEditEmenta={setEditEmenta}
                editTipoRelacao={editTipoRelacao}
                setEditTipoRelacao={setEditTipoRelacao}
                editAtosLeis={editAtosLeis}
                setEditAtosLeis={setEditAtosLeis}
                editSignatario={editSignatario}
                setEditSignatario={setEditSignatario}
                editCargo={editCargo}
                setEditCargo={setEditCargo}
                onBack={handleBackToList}
                onSave={handleSaveDoc}
                isSaving={isSaving}
                groupId={groupId}
                onNavigateToContrato={(id) => onSelectAnotherGroup('contratos', undefined, id)}
                readOnly={!canEdit && !canCreate && !isNewRecord}
                isPdfBlurred={isPdfBlurred}
                onUnlockBlur={handleUnlockBlur}
              />

          </div>
        )}

      </div>

      {/* Licitações Admin Configurations Modal */}
      {groupId === 'licitacoes' && (
        <LicitacoesConfigModal
          isOpen={isConfigModalOpen}
          onClose={() => setIsConfigModalOpen(false)}
          onConfigUpdated={() => refetch()}
        />
      )}

    </div>
  );
};
