import React, { useState, useEffect, useTransition } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Home, 
  Search, 
  Download, 
  Calendar, 
  ChevronDown, 
  ArrowRight,
  Menu,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Printer,
  FileCheck,
  Shield,
  FileText,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  FileQuestion,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Brasao } from './Brasao.tsx';
import { GROUP_CONFIGS } from '../config/navigation.config';
import { useGroupDocuments } from '../hooks/useGroupDocuments';
import { DocumentoOficialDTO } from '../types/api.types';
import { useToast } from './Toast';
import { TableSkeleton } from './Skeleton';
import { siteConfig } from '../config/site.config';

interface GroupDetailViewProps {
  groupId: string;
  initialSubItem?: string;
  onBackToHome: () => void;
  onSelectAnotherGroup: (groupId: string, subItem?: string) => void;
}

export const GroupDetailView: React.FC<GroupDetailViewProps> = ({
  groupId,
  initialSubItem,
  onBackToHome,
  onSelectAnotherGroup,
}) => {
  const { success, info, error: toastError } = useToast();
  const [, startTransition] = useTransition();

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

  // Reset tab and selected document whenever group changes
  useEffect(() => {
    setActiveTab(getInitialTab());
    setSelectedDoc(null);
    setIsPdfBlurred(true);
    setSearchQuery('');
  }, [groupId, initialSubItem]);

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

  // View mode: 'list' (Image 2) or 'detail' (Image 3)
  const [selectedDoc, setSelectedDoc] = useState<DocumentoOficialDTO | null>(null);

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
  const filteredDocs = documents.filter((doc) => {
    if (covidFilter) {
      const isCovid = doc.ementa.toLowerCase().includes('covid') || 
                      doc.secao.toLowerCase().includes('covid');
      if (!isCovid) return false;
    }
    return true;
  });

  // Helper to format heading for any municipal document type
  const getDocHeading = (doc: DocumentoOficialDTO | null) => {
    if (!doc) return '';
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
                <span className="font-bold text-slate-900">
                  {getDocHeading(selectedDoc)}
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
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-sm transition cursor-pointer ml-auto"
              >
                <span>EXPORTAR</span>
                <Download className="w-3.5 h-3.5 text-slate-500" />
              </button>
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
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  {/* Header with metallic gradient */}
                  <thead>
                    <tr className="bg-gradient-to-b from-[#e5e7eb] to-[#d1d5db] border-y border-slate-300 text-slate-700 text-xs font-bold shadow-2xs">
                      <th className="py-2.5 px-4 w-32 whitespace-nowrap">Número</th>
                      <th className="py-2.5 px-4 w-36 whitespace-nowrap">Seção</th>
                      <th className="py-2.5 px-4 w-28 whitespace-nowrap">Assinatura</th>
                      <th className="py-2.5 px-4">Ementa</th>
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
                          {doc.secao || '-'}
                        </td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                          {doc.assinatura}
                        </td>
                        <td className="py-3 px-4 text-slate-700 leading-snug uppercase group-hover:text-slate-900">
                          {doc.ementa}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
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

            {/* Split Screen Layout (Left: PDF Viewer | Right: Document Details) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[580px]">
              
              {/* LEFT COLUMN: PDF Viewer with Blur Overlay & Attachment */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                
                <div className="space-y-3">
                  {/* ANEXO Header Bar (Gradient gray matching Image 3) */}
                  <div className="bg-gradient-to-b from-[#e5e7eb] to-[#d1d5db] border border-slate-300 py-1.5 px-4 text-center font-bold text-xs text-slate-700 tracking-wider">
                    ANEXO
                  </div>

                  {/* Attachment Box with Menu Dropdown (Matching Image 3 & following group theme) */}
                  <div className="relative">
                    <div 
                      className="p-3 rounded-xs flex items-center justify-between border"
                      style={{ 
                        backgroundColor: theme.softBgHex, 
                        borderColor: theme.softBorderHex 
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <button
                          type="button"
                          onClick={() => setAttachmentMenuOpen(!attachmentMenuOpen)}
                          className="p-1 hover:bg-black/5 rounded cursor-pointer transition text-slate-700"
                          title="Opções do anexo"
                        >
                          <Menu className="w-4 h-4" />
                        </button>
                        <span className="text-xs sm:text-[13px] font-semibold text-slate-800 truncate">
                          {selectedDoc.anexoNome}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDownload(selectedDoc)}
                        disabled={isDownloading}
                        className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer transition shrink-0"
                        title="Baixar arquivo"
                      >
                        <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                      </button>
                    </div>

                    {/* Dropdown Menu (Visualizar / Baixar) */}
                    {attachmentMenuOpen && (
                      <div className="absolute top-12 left-2 z-30 bg-white border border-slate-200 shadow-lg rounded-sm py-1 w-36 text-xs text-slate-700">
                        <button
                          type="button"
                          onClick={() => {
                            setIsPdfBlurred(false);
                            setAttachmentMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>Visualizar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleDownload(selectedDoc);
                            setAttachmentMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Baixar</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* PDF Viewer Container (A4 Ratio Sheet Preview with Controls & Blur Effect) */}
                  <div className="border border-slate-300 rounded-xs bg-[#525659] p-3 shadow-inner">
                    
                    {/* PDF Viewer Top Controls Bar */}
                    <div className="bg-[#323639] text-white px-3 py-1.5 rounded-t-xs flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-2 text-slate-300">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span className="truncate max-w-[180px]">{selectedDoc.anexoNome}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          type="button"
                          onClick={() => setPdfZoom(z => Math.max(70, z - 10))}
                          className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                          title="Diminuir Zoom"
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] font-mono text-slate-300">{pdfZoom}%</span>
                        <button 
                          type="button"
                          onClick={() => setPdfZoom(z => Math.min(150, z + 10))}
                          className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                          title="Aumentar Zoom"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => setPdfRotation(r => (r + 90) % 360)}
                          className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                          title="Girar"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          type="button"
                          onClick={handlePrint}
                          className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                          title="Imprimir"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* PDF Sheet Preview Area */}
                    <div className="relative bg-white rounded-xs p-6 shadow-md min-h-[460px] max-h-[540px] overflow-hidden flex flex-col justify-between">
                      
                      {/* Document Body (Subject to Blur effect until unlocked by user click) */}
                      <div 
                        className={`transition-all duration-300 select-none ${
                          isPdfBlurred ? 'filter blur-md opacity-40' : 'filter-none opacity-100'
                        }`}
                        style={{
                          transform: `scale(${pdfZoom / 100}) rotate(${pdfRotation}deg)`,
                          transformOrigin: 'top center'
                        }}
                      >
                        {/* Municipal Document Formal Header */}
                        <div className="text-center pb-4 border-b border-slate-300 space-y-1">
                          <div className="w-10 h-10 mx-auto mb-1">
                            <Brasao className="w-full h-full object-contain" />
                          </div>
                          <h4 className="text-[11px] font-bold text-slate-800 tracking-wider">
                            ESTADO DO TOCANTINS
                          </h4>
                          <h3 className="text-xs font-extrabold text-slate-900 tracking-wide">
                            PREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS
                          </h3>
                          <p className="text-[9.5px] text-slate-500 uppercase">
                            CNPJ: {siteConfig.cnpj} • Gabinete do Prefeito
                          </p>
                        </div>

                        {/* Document Content / Text Body */}
                        <div className="py-4 space-y-3 text-[11px] text-slate-800 leading-relaxed font-serif">
                          <div className="text-center font-bold font-sans text-xs pb-1" style={{ color: theme.primaryHex }}>
                            {getDocHeading(selectedDoc).toUpperCase()}
                          </div>

                          <div className="text-right text-[10px] text-slate-600 italic pl-24">
                            &quot;{selectedDoc.ementa}&quot;
                          </div>

                          <div className="pt-2 text-justify space-y-2 whitespace-pre-line">
                            {selectedDoc.textoIntegral ? (
                              selectedDoc.textoIntegral
                            ) : (
                              <>
                                <p>
                                  O PREFEITO MUNICIPAL DE SÃO MIGUEL DO TOCANTINS, Estado do Tocantins, no uso de suas atribuições legais e constitucionais que lhe são conferidas pela Lei Orgânica do Município;
                                </p>
                                <p>
                                  CONSIDERANDO a necessidade pública e a estrita observância aos princípios da legalidade, publicidade, transparência e eficiência insculpidos no art. 37 da Constituição Federal;
                                </p>
                                <p className="font-semibold text-center py-1">
                                  D E C R E T A / R E S O L V E:
                                </p>
                                <p>
                                  Art. 1º Fica homologado e publicado no Diário Oficial o presente ato de {selectedDoc.numero}, com efeitos imediatos a partir de {selectedDoc.assinatura}.
                                </p>
                                <p>
                                  Art. 2º Revogam-se as disposições em contrário.
                                </p>
                              </>
                            )}
                          </div>

                          {/* Signature stamp */}
                          <div className="pt-8 text-center space-y-0.5">
                            <div className="w-48 border-t border-slate-700 mx-auto mb-1" />
                            <div className="font-bold font-sans text-xs text-slate-900">
                              {selectedDoc.signatario}
                            </div>
                            <div className="text-[10px] text-slate-500 font-sans">
                              {selectedDoc.cargoSignatario}
                            </div>
                          </div>
                        </div>

                        {/* Digital Verification Bar */}
                        <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                          <div className="flex items-center gap-1 text-emerald-700 font-sans font-bold">
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>DOCUMENTO ASSINADO DIGITALMENTE (ICP-BRASIL)</span>
                          </div>
                          <span>CHAVE: 2026.SMT.9482.01B7</span>
                        </div>
                      </div>

                      {/* BLUR OVERLAY WITH UNLOCK BUTTON (Matching Requirement 7) */}
                      {isPdfBlurred && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-900/30 backdrop-blur-[3px] transition-all">
                          <div className="bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-slate-200/80 max-w-xs text-center space-y-3">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-2xs"
                              style={{ backgroundColor: theme.softBgHex, color: theme.primaryHex }}
                            >
                              <Shield className="w-6 h-6 stroke-[2.2]" />
                            </div>
                            <h4 className="font-bold text-sm text-slate-800">
                              Visualizador de Documento
                            </h4>
                            <p className="text-xs text-slate-500 leading-snug">
                              O conteúdo oficial deste ato municipal está protegido contra visualização acidental.
                            </p>
                            <button
                              type="button"
                              onClick={handleUnlockBlur}
                              disabled={isUnblurring}
                              style={{ backgroundColor: theme.primaryHex }}
                              className="w-full text-white py-2.5 px-4 rounded-md font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
                            >
                              {isUnblurring ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                              <span>{isUnblurring ? 'Desbloqueando...' : 'VISUALIZAR DOCUMENTO'}</span>
                            </button>
                            <div className="text-[10.5px] text-slate-400">
                              Arquivo: {selectedDoc.anexoTamanho}
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                </div>

                {/* Left Column Bottom: Download File Action */}
                <button
                  type="button"
                  onClick={() => handleDownload(selectedDoc)}
                  disabled={isDownloading}
                  className="w-full py-2 px-4 rounded-sm border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce text-emerald-600' : 'text-slate-500'}`} />
                  <span>{isDownloading ? 'Baixando...' : `Baixar Arquivo Completo (${selectedDoc.anexoTamanho})`}</span>
                </button>

              </div>

              {/* RIGHT COLUMN: Document Metadata with Horizontal Lines (Image 3) */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  
                  {/* Document Title Heading in Group Color (Image 3) */}
                  <div>
                    <h2 
                      className="text-xl sm:text-2xl font-bold tracking-tight"
                      style={{ color: theme.primaryHex }}
                    >
                      {getDocHeading(selectedDoc)}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Publicação Oficial no Portal da Transparência de São Miguel do Tocantins
                    </p>
                  </div>

                  {/* Metadata Table / Items separated ONLY by horizontal lines (Image 3) */}
                  <div className="divide-y divide-slate-200 text-xs sm:text-[13px]">
                    
                    {/* Número */}
                    <div className="py-2.5 flex items-baseline justify-between gap-4">
                      <span className="font-bold text-slate-800 w-32 shrink-0">Número:</span>
                      <span className="text-slate-700 font-mono font-medium">{selectedDoc.numero}</span>
                    </div>

                    {/* Ano */}
                    <div className="py-2.5 flex items-baseline justify-between gap-4">
                      <span className="font-bold text-slate-800 w-32 shrink-0">Ano:</span>
                      <span className="text-slate-700">{selectedDoc.ano}</span>
                    </div>

                    {/* Seção */}
                    <div className="py-2.5 flex items-baseline justify-between gap-4">
                      <span className="font-bold text-slate-800 w-32 shrink-0">Seção:</span>
                      <span className="text-slate-700">{selectedDoc.secao || '-'}</span>
                    </div>

                    {/* Assinatura */}
                    <div className="py-2.5 flex items-baseline justify-between gap-4">
                      <span className="font-bold text-slate-800 w-32 shrink-0">Assinatura:</span>
                      <span className="text-slate-700">{selectedDoc.assinatura}</span>
                    </div>

                    {/* Ementa */}
                    <div className="py-2.5 flex items-start justify-between gap-4">
                      <span className="font-bold text-slate-800 w-32 shrink-0">Ementa:</span>
                      <span className="text-slate-700 uppercase leading-relaxed text-justify flex-1">
                        {selectedDoc.ementa}
                      </span>
                    </div>

                    {/* Signatário */}
                    <div className="py-2.5 flex items-baseline justify-between gap-4">
                      <span className="font-bold text-slate-800 w-32 shrink-0">Signatário:</span>
                      <span className="text-slate-700 font-medium">{selectedDoc.signatario}</span>
                    </div>

                    {/* Cargo do Signatário */}
                    <div className="py-2.5 flex items-baseline justify-between gap-4">
                      <span className="font-bold text-slate-800 w-32 shrink-0">Cargo:</span>
                      <span className="text-slate-600">{selectedDoc.cargoSignatario}</span>
                    </div>

                    {/* Órgão Emissor */}
                    <div className="py-2.5 flex items-baseline justify-between gap-4">
                      <span className="font-bold text-slate-800 w-32 shrink-0">Órgão Emissor:</span>
                      <span className="text-slate-600">Prefeitura Municipal de São Miguel do Tocantins</span>
                    </div>

                  </div>

                </div>

                {/* Right Column Bottom: VOLTAR Button (Matching Image 3) */}
                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoc(null);
                      setIsPdfBlurred(true);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-sm transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>VOLTAR PARA A LISTA</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
