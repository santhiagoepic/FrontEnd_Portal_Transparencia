import React, { useState, useEffect } from 'react';
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
  EyeOff,
  LogOut,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Printer,
  FileCheck,
  Shield,
  FileText
} from 'lucide-react';
import { ATOS_NORMATIVOS_DATA, DocumentItem } from '../data/atosNormativosData.ts';
import { ALL_GROUPS_DOCUMENTS } from '../data/allGroupsData.ts';
import { Brasao } from './Brasao.tsx';

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
  // Available top tabs matching municipal system
  const defaultTabs = ['PORTARIAS', 'DECRETOS', 'LEIS', 'RESOLUÇÕES'];
  
  // Custom tabs per group matching municipal portal
  const getTabsForGroup = () => {
    switch (groupId) {
      case 'contratos': return ['CONTRATOS', 'FISCAIS DE CONTRATOS', 'ORDEM CRONOLÓGICA', 'CONTRATOS ANTERIORES'];
      case 'licitacoes': return ['LICITAÇÕES', 'DISPENSAS E INEXIGIBILIDADES', 'PLANO ANUAL (PCA)', 'SANÇÕES ADMINISTRATIVAS'];
      case 'receitas': return ['RECEITAS', 'DÍVIDA ATIVA', 'PREVISÃO ORÇAMENTÁRIA'];
      case 'despesas': return ['DESPESAS', 'EMPENHOS', 'LIQUIDAÇÕES', 'PAGAMENTOS'];
      case 'recursos-humanos': return ['FOLHA DE PAGAMENTO', 'PADRÃO REMUNERATÓRIO', 'ESTAGIÁRIOS', 'CONCURSOS'];
      case 'obras': return ['ACOMPANHAMENTO DE OBRAS', 'OBRAS PARALISADAS', 'MEDIÇÕES'];
      case 'saude': return ['PLANO MUNICIPAL DE SAÚDE', 'MEDICAMENTOS SUS', 'ESCALAS DE PLANTÃO', 'CONSELHO DE SAÚDE'];
      case 'educacao': return ['PLANO DE EDUCAÇÃO', 'FILA DE CRECHES', 'FUNDEB', 'ASSISTÊNCIA SOCIAL'];
      case 'institucional': return ['ESTRUTURA ORGANIZACIONAL', 'PERGUNTAS FREQUENTES', 'RADAR DA TRANSPARÊNCIA'];
      case 'convenios': return ['CONVÊNIOS RECEBIDOS', 'CONVÊNIOS CONCEDIDOS', 'TERMOS E PARCERIAS'];
      case 'ouvidoria': return ['SOLICITAÇÃO', 'ELOGIOS', 'SUGESTÕES', 'RECLAMAÇÕES', 'DENÚNCIAS'];
      case 'meio-ambiente': return ['PLANO DE SANEAMENTO', 'CONSELHO MEIO AMBIENTE', 'PRESTAÇÃO DE CONTAS'];
      case 'lgpd': return ['ENCARREGADO LGPD', 'POLÍTICA DE PRIVACIDADE', 'DADOS ABERTOS (API)'];
      case 'diarias': return ['DIÁRIAS E PASSAGENS', 'TABELA DE VALORES'];
      case 'planejamento': return ['BALANÇO ANUAL', 'PARECER TCE', 'RGF / RREO', 'PPA / LDO / LOA'];
      case 'renuncia-receita': return ['RENÚNCIAS FISCAIS', 'INCENTIVOS CULTURAIS'];
      case 'sic': return ['PEDIDOS DE INFORMAÇÃO', 'RELATÓRIOS E-SIC', 'RECURSOS'];
      case 'emendas': return ['EMENDAS IMPOSITIVAS', 'EMENDAS DE BANCADA'];
      case 'conselhos': return ['COMPOSIÇÃO DOS CONSELHOS', 'ATAS E RESOLUÇÕES'];
      default: return defaultTabs;
    }
  };

  const getGroupName = (id: string): string => {
    switch (id) {
      case 'recursos-humanos': return 'Recursos Humanos';
      case 'contratos': return 'Contratos';
      case 'despesas': return 'Despesas';
      case 'receitas': return 'Receitas';
      case 'licitacoes': return 'Licitações';
      case 'institucional': return 'Informações Institucionais';
      case 'ouvidoria': return 'Ouvidoria';
      case 'saude': return 'Saúde';
      case 'meio-ambiente': return 'Meio Ambiente e Saneamento';
      case 'atos-normativos': return 'Atos Normativos';
      case 'obras': return 'Obras';
      case 'lgpd': return 'LGPD e Governo Digital';
      case 'educacao': return 'Educação e Assistência Social';
      case 'diarias': return 'Diárias';
      case 'planejamento': return 'Planejamento e Prestação de Contas';
      case 'renuncia-receita': return 'Renúncia de Receita';
      case 'sic': return 'SIC';
      case 'emendas': return 'Emendas Parlamentares';
      case 'conselhos': return 'Conselhos';
      case 'convenios': return 'Convênios e Transferências';
      default: return 'Atos Normativos';
    }
  };

  // Group theme colors (User specified: verde atos normativos, roxo contratos, vermelho despesas, etc.)
  const getGroupTheme = (id: string) => {
    switch (id) {
      case 'contratos':
        return {
          primaryHex: '#7e22ce', // Roxo
          softBgHex: '#f3e8ff',
          softBorderHex: '#d8b4fe',
          textColor: 'text-purple-700',
        };
      case 'despesas':
      case 'renuncia-receita':
        return {
          primaryHex: '#dc2626', // Vermelho
          softBgHex: '#fee2e2',
          softBorderHex: '#fca5a5',
          textColor: 'text-red-700',
        };
      case 'recursos-humanos':
        return {
          primaryHex: '#ea580c', // Laranja
          softBgHex: '#ffedd5',
          softBorderHex: '#fed7aa',
          textColor: 'text-orange-700',
        };
      case 'institucional':
      case 'conselhos':
        return {
          primaryHex: '#1d4ed8', // Azul Real
          softBgHex: '#dbeafe',
          softBorderHex: '#bfdbfe',
          textColor: 'text-blue-700',
        };
      case 'licitacoes':
      case 'educacao':
        return {
          primaryHex: '#0284c7', // Azul Celeste / Sky
          softBgHex: '#e0f2fe',
          softBorderHex: '#bae6fd',
          textColor: 'text-sky-700',
        };
      case 'saude':
        return {
          primaryHex: '#e11d48', // Rosa Rubi
          softBgHex: '#ffe4e6',
          softBorderHex: '#fecdd3',
          textColor: 'text-rose-700',
        };
      case 'ouvidoria':
      case 'sic':
        return {
          primaryHex: '#0d9488', // Teal
          softBgHex: '#ccfbf1',
          softBorderHex: '#99f6e4',
          textColor: 'text-teal-700',
        };
      case 'obras':
      case 'diarias':
        return {
          primaryHex: '#d97706', // Âmbar
          softBgHex: '#fef3c7',
          softBorderHex: '#fde68a',
          textColor: 'text-amber-700',
        };
      case 'lgpd':
        return {
          primaryHex: '#db2777', // Rosa Magenta
          softBgHex: '#fce7f3',
          softBorderHex: '#fbcfe8',
          textColor: 'text-pink-700',
        };
      case 'convenios':
        return {
          primaryHex: '#4f46e5', // Índigo
          softBgHex: '#e0e7ff',
          softBorderHex: '#c7d2fe',
          textColor: 'text-indigo-700',
        };
      case 'planejamento':
        return {
          primaryHex: '#0891b2', // Ciano
          softBgHex: '#cffafe',
          softBorderHex: '#a5f3fc',
          textColor: 'text-cyan-700',
        };
      case 'emendas':
        return {
          primaryHex: '#7c3aed', // Roxo Violeta
          softBgHex: '#ede9fe',
          softBorderHex: '#ddd6fe',
          textColor: 'text-purple-700',
        };
      case 'meio-ambiente':
        return {
          primaryHex: '#15803d', // Verde Floresta
          softBgHex: '#dcfce7',
          softBorderHex: '#bbf7d0',
          textColor: 'text-emerald-700',
        };
      case 'receitas':
        return {
          primaryHex: '#059669', // Verde Esmeralda
          softBgHex: '#d1fae5',
          softBorderHex: '#6ee7b7',
          textColor: 'text-emerald-700',
        };
      case 'atos-normativos':
      default:
        return {
          primaryHex: '#16a34a', // Verde Atos Normativos
          softBgHex: '#cdeedb',
          softBorderHex: '#a7dfbe',
          textColor: 'text-emerald-700',
        };
    }
  };

  const theme = getGroupTheme(groupId);
  const groupName = getGroupName(groupId);
  const tabs = getTabsForGroup();

  // Normalize initial tab
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
  
  // View mode: 'list' (Image 2) or 'detail' (Image 3)
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  // PDF Viewer State (Blur toggle, zoom, rotation)
  const [isPdfBlurred, setIsPdfBlurred] = useState<boolean>(true);
  const [pdfZoom, setPdfZoom] = useState<number>(100);
  const [pdfRotation, setPdfRotation] = useState<number>(0);

  // Filter bar states
  const [searchQuery, setSearchQuery] = useState('');
  const [covidFilter, setCovidFilter] = useState(false);

  // Dropdown states
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);

  // Helper to format heading for any municipal document type
  const getDocHeading = (doc: DocumentItem | null) => {
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
      num.toLowerCase().includes('em.')
    ) {
      return num;
    }
    const tabLabel = activeTab.charAt(0) + activeTab.slice(1).toLowerCase();
    return `${tabLabel} nº ${num}`;
  };

  // Contextual documents according to the group and activeTab
  const getDocumentsForCurrentGroup = (): DocumentItem[] => {
    if (groupId === 'atos-normativos') {
      return ATOS_NORMATIVOS_DATA;
    }

    // Documents specifically authored for this group in allGroupsData
    const groupMatches = (ALL_GROUPS_DOCUMENTS as unknown as DocumentItem[]).filter(
      (d: any) => d.groupId === groupId
    );

    // If there are matches for the exact active tab
    const tabMatches = groupMatches.filter((d: any) => d.tab === activeTab);
    if (tabMatches.length > 0) {
      return tabMatches;
    }

    // If group has documents but none specifically labeled for this tab, return all group documents
    if (groupMatches.length > 0) {
      return groupMatches;
    }

    // Dynamic generation for any group/tab so every tab in all 21 groups has rich content
    return [
      {
        id: `${groupId}-01-2026`,
        numero: `001/2026`,
        numeroSimples: '1',
        ano: '2026',
        secao: getGroupName(groupId),
        assinatura: '15/09/2026',
        tipo: activeTab as any,
        ementa: `DOCUMENTAÇÃO OFICIAL DE REGISTRO E DEMONSTRATIVO - ${activeTab} - ${getGroupName(groupId).toUpperCase()}`,
        anexoNome: `${activeTab.replace(/[\s\(\)\/]/g, '_')}_Oficial_2026.pdf`,
        anexoTamanho: '450 KB',
        signatario: 'Prefeitura Municipal de São Miguel do Tocantins',
        cargoSignatario: 'Gabinete Municipal',
        textoIntegral: `ESTADO DO TOCANTINS\nPREFEITURA MUNICIPAL DE SÃO MIGUEL DO TOCANTINS\n\nPUBLICAÇÃO OFICIAL - ${getGroupName(groupId).toUpperCase()}\nASSUNTO: ${activeTab}\n\nO presente registro compõe a base pública oficial de transparência e prestação de contas do Município de São Miguel do Tocantins - TO, em conformidade com as exigências da Lei de Acesso à Informação (Lei 12.527/2011) e Lei de Responsabilidade Fiscal.`
      },
      {
        id: `${groupId}-02-2026`,
        numero: `002/2026`,
        numeroSimples: '2',
        ano: '2026',
        secao: getGroupName(groupId),
        assinatura: '28/08/2026',
        tipo: activeTab as any,
        ementa: `RELATÓRIO CONSOLIDADO E CERTIDÃO DEMONSTRATIVA DE ${activeTab} - EXERCÍCIO 2026`,
        anexoNome: `Demonstrativo_${activeTab.replace(/[\s\(\)\/]/g, '_')}_2026.pdf`,
        anexoTamanho: '620 KB',
        signatario: 'Prefeitura Municipal de São Miguel do Tocantins',
        cargoSignatario: 'Gabinete Municipal'
      }
    ];
  };

  // Filter documents based on active tab & search query
  const allGroupDocs = getDocumentsForCurrentGroup();
  const filteredDocs = allGroupDocs.filter((doc: any) => {
    // Tab matching:
    if (groupId === 'atos-normativos') {
      if (doc.tipo !== activeTab) return false;
    } else {
      // If document is tagged with a tab, ensure it matches activeTab if other docs exist for that tab
      if (doc.tab && doc.tab !== activeTab) {
        const hasTabMatches = allGroupDocs.some((d: any) => d.tab === activeTab);
        if (hasTabMatches) return false;
      }
    }
    const matchesSearch = searchQuery === '' || 
      doc.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.ementa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.assinatura.includes(searchQuery);
    return matchesSearch;
  });

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

  const handleDownload = (doc: DocumentItem) => {
    alert(`Iniciando download do arquivo ${doc.anexoNome} (${doc.anexoTamanho})...`);
  };

  const handlePrint = () => {
    window.print();
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
                    {[
                      { id: 'atos-normativos', name: 'Atos Normativos', color: '#16a34a' },
                      { id: 'contratos', name: 'Contratos', color: '#7e22ce' },
                      { id: 'despesas', name: 'Despesas', color: '#dc2626' },
                      { id: 'receitas', name: 'Receitas', color: '#059669' },
                      { id: 'licitacoes', name: 'Licitações', color: '#0284c7' },
                      { id: 'recursos-humanos', name: 'Recursos Humanos', color: '#ea580c' },
                      { id: 'institucional', name: 'Informações Institucionais', color: '#1d4ed8' },
                      { id: 'ouvidoria', name: 'Ouvidoria', color: '#0d9488' },
                      { id: 'sic', name: 'SIC', color: '#0f766e' },
                      { id: 'saude', name: 'Saúde', color: '#e11d48' },
                      { id: 'obras', name: 'Obras', color: '#d97706' },
                      { id: 'meio-ambiente', name: 'Meio Ambiente e Saneamento', color: '#15803d' },
                      { id: 'lgpd', name: 'LGPD e Governo Digital', color: '#db2777' },
                      { id: 'educacao', name: 'Educação e Assistência Social', color: '#0284c7' },
                      { id: 'diarias', name: 'Diárias', color: '#d97706' },
                      { id: 'planejamento', name: 'Planejamento e Prestação de Contas', color: '#0891b2' },
                      { id: 'convenios', name: 'Convênios e Transferências', color: '#4f46e5' },
                      { id: 'renuncia-receita', name: 'Renúncia de Receita', color: '#dc2626' },
                      { id: 'emendas', name: 'Emendas Parlamentares', color: '#7c3aed' },
                      { id: 'conselhos', name: 'Conselhos', color: '#2563eb' },
                      { id: 'outras-informacoes', name: 'Outras Informações', color: '#475569' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          setGroupDropdownOpen(false);
                          onSelectAnotherGroup(g.id);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between transition cursor-pointer ${
                          g.id === groupId ? 'font-bold bg-slate-50/80' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ backgroundColor: g.color }}
                          />
                          <span className="truncate">{g.name}</span>
                        </div>
                        {g.id === groupId && (
                          <span className="text-[10px] text-emerald-600 font-bold">Ativo</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <button
              onClick={() => {
                setSelectedDoc(null);
                setIsPdfBlurred(true);
              }}
              style={{ color: theme.primaryHex }}
              className="font-bold hover:underline cursor-pointer"
            >
              {activeTab}
            </button>
            {selectedDoc && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-bold text-slate-800">{selectedDoc.numero}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        
        {/* 2. Top Tabs - Menu Superior tipo Navegador com as Cores de Acordo com o Grupo */}
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
                  setActiveTab(tab);
                  setSelectedDoc(null);
                  setIsPdfBlurred(true);
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
            - Clicking a row opens the individual document viewer screen
           ========================================================================= */}
        {!selectedDoc ? (
          <div className="pt-4 space-y-3">
            
            {/* Filter Bar (Matching Image 2) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Search input */}
              <div className="relative min-w-[220px] max-w-sm flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar"
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
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>FILTRAR COVID-19</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Period filter */}
              <div className="flex items-center border border-slate-300 rounded-sm bg-white">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>PERÍODO</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <div className="border-l border-slate-200 px-2 py-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Filter button */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-sm transition cursor-pointer"
              >
                <span>FILTRAR</span>
                <Search className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Section dropdown */}
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-sm transition cursor-pointer"
              >
                <span>SEÇÃO</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Export button */}
              <button
                type="button"
                onClick={() => alert('Exportando relação em formato CSV/PDF...')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-sm transition cursor-pointer ml-auto"
              >
                <span>EXPORTAR</span>
                <Download className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            {/* Helper status text */}
            <div className="text-[11.5px] text-slate-400 pt-0.5">
              {searchQuery ? `Filtrando por: "${searchQuery}" (${filteredDocs.length} registros)` : 'Não há filtros selecionados'}
            </div>

            {/* Horizontal Line separating filter bar and table */}
            <hr className="border-t border-slate-200 my-2" />

            {/* Table: SEPARATED ONLY BY HORIZONTAL LINES! */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Header with metallic gradient */}
                <thead>
                  <tr className="bg-gradient-to-b from-[#e5e7eb] to-[#d1d5db] border-y border-slate-300 text-slate-700 text-xs font-bold shadow-2xs">
                    <th className="py-2.5 px-4 w-28 whitespace-nowrap">Número</th>
                    <th className="py-2.5 px-4 w-24 whitespace-nowrap">Seção</th>
                    <th className="py-2.5 px-4 w-32 whitespace-nowrap">Assinatura</th>
                    <th className="py-2.5 px-4">Ementa</th>
                  </tr>
                </thead>

                {/* Rows with clear horizontal division lines */}
                <tbody className="divide-y divide-slate-200 text-xs sm:text-[13px] bg-white">
                  {filteredDocs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400 border-b border-slate-200">
                        Nenhum registro encontrado para este filtro.
                      </td>
                    </tr>
                  ) : (
                    filteredDocs.map((doc) => (
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          /* =========================================================================
              SCREEN 2: INDIVIDUAL DOCUMENT VIEWER (PDF VIEWER FORMAT)
              - Horizontal dividing lines
              - Left: ANEXO, PDF Viewer with Blur Overlay & button to un-blur, download
              - Right: Document metadata with horizontal lines and VOLTAR button
             ========================================================================= */
          <div className="pt-3 space-y-4">
            
            {/* Navigation Arrows (Image 3: ← →) */}
            <div className="flex items-center gap-2 pb-1 text-slate-400">
              <button
                type="button"
                onClick={handlePrevDoc}
                disabled={currentDocIndex <= 0}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                title="Documento anterior"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button
                type="button"
                onClick={handleNextDoc}
                disabled={currentDocIndex >= filteredDocs.length - 1}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                title="Próximo documento"
              >
                <ArrowRight className="w-4 h-4 text-slate-600" />
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
                          className="p-1 hover:bg-[#b9e5cb] rounded cursor-pointer transition text-slate-700"
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
                        className="p-1 text-slate-600 hover:text-emerald-800 cursor-pointer transition shrink-0"
                        title="Baixar arquivo"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Dropdown Menu (Visualizar / Baixar) */}
                    {attachmentMenuOpen && (
                      <div className="absolute top-12 left-2 z-30 bg-white border border-slate-200 shadow-lg rounded-sm py-1 w-36 text-xs text-slate-700">
                        <button
                          type="button"
                          onClick={() => {
                            setAttachmentMenuOpen(false);
                            setIsPdfBlurred(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>Visualizar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAttachmentMenuOpen(false);
                            handleDownload(selectedDoc);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer border-t border-slate-100"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Baixar</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Horizontal Line separating attachment from PDF Viewer */}
                  <hr className="border-t border-slate-200" />

                  {/* ============================================================
                      FORMATO DE VISUALIZADOR DE PDF COM CONTROLES & BORRÃO
                     ============================================================ */}
                  <div className="border border-slate-300 rounded-sm overflow-hidden shadow-sm flex flex-col bg-[#323639]">
                    
                    {/* PDF Viewer Dark Control Toolbar */}
                    <div className="bg-[#2a2d30] text-slate-200 px-3 py-2 flex items-center justify-between text-xs border-b border-slate-700 select-none">
                      <div className="flex items-center gap-2 text-slate-300">
                        <FileText className="w-4 h-4 text-red-400 shrink-0" />
                        <span className="font-mono text-[11px] truncate max-w-[150px] sm:max-w-xs">{selectedDoc.anexoNome}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-[11px] text-slate-400">1 / 1</span>
                      </div>

                      {/* PDF Toolbar Controls: Zoom, Rotate, Print, Blur Toggle */}
                      <div className="flex items-center gap-2 text-slate-300">
                        <button
                          onClick={() => setPdfZoom(prev => Math.max(70, prev - 15))}
                          className="p-1 hover:bg-slate-700 rounded transition cursor-pointer"
                          title="Diminuir zoom"
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10.5px] font-mono text-slate-400 w-9 text-center">{pdfZoom}%</span>
                        <button
                          onClick={() => setPdfZoom(prev => Math.min(150, prev + 15))}
                          className="p-1 hover:bg-slate-700 rounded transition cursor-pointer"
                          title="Aumentar zoom"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPdfRotation(prev => (prev + 90) % 360)}
                          className="p-1 hover:bg-slate-700 rounded transition cursor-pointer"
                          title="Girar documento"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={handlePrint}
                          className="p-1 hover:bg-slate-700 rounded transition cursor-pointer"
                          title="Imprimir PDF"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setIsPdfBlurred(!isPdfBlurred)}
                          className={`p-1 rounded transition cursor-pointer ${isPdfBlurred ? 'text-emerald-400 hover:bg-slate-700' : 'text-slate-400 hover:bg-slate-700'}`}
                          title={isPdfBlurred ? 'Remover borrão e ver documento' : 'Aplicar borrão no documento'}
                        >
                          {isPdfBlurred ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* PDF Document Canvas with Blur Overlay */}
                    <div className="bg-[#525659] p-4 sm:p-6 overflow-y-auto max-h-[480px] relative flex justify-center">
                      
                      {/* Document Sheet (Simulated A4 Official Paper) */}
                      <div 
                        className={`bg-white shadow-2xl p-6 sm:p-8 max-w-md w-full border border-slate-300 font-serif min-h-[520px] text-slate-800 transition-all duration-300 ${
                          isPdfBlurred ? 'filter blur-[3.5px] select-none pointer-events-none opacity-80' : 'filter-none opacity-100'
                        }`}
                        style={{
                          transform: `scale(${pdfZoom / 100}) rotate(${pdfRotation}deg)`,
                          transformOrigin: 'top center',
                        }}
                      >
                        {/* Official Header */}
                        <div className="text-center space-y-1 pb-3 border-b border-slate-200">
                          <Brasao className="w-10 h-10 mx-auto" />
                          <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-700">
                            Estado do Tocantins
                          </div>
                          <div className="text-xs font-bold uppercase text-[#0c2340]">
                            Prefeitura Municipal de São Miguel do Tocantins
                          </div>
                          <div className="text-[8.5px] text-slate-400 uppercase">
                            Gabinete do Prefeito • Diário Oficial Municipal
                          </div>
                        </div>

                        {/* Title & Date */}
                        <div className="pt-3 text-center">
                          <h4 className="font-bold text-xs uppercase text-slate-900 tracking-wide">
                            {getDocHeading(selectedDoc)}
                          </h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            De {selectedDoc.assinatura}
                          </p>
                        </div>

                        {/* Ementa Indented */}
                        <div className="py-3 text-right max-w-xs ml-auto">
                          <p className="text-[10px] italic text-slate-600 leading-snug">
                            "{selectedDoc.ementa}"
                          </p>
                        </div>

                        {/* Document Body */}
                        <div className="text-[10.5px] text-slate-800 leading-relaxed space-y-2 pt-2 border-t border-slate-100">
                          <p>
                            {selectedDoc.textoIntegral || 
                              `O PREFEITO MUNICIPAL DE SÃO MIGUEL DO TOCANTINS, Estado do Tocantins, no uso de suas atribuições legais e constitucionais vigentes, resolve baixar e publicar o presente ato normativo oficial.\n\nArt. 1º - Fica oficializada e registrada a publicação referente a ${selectedDoc.ementa}.\n\nArt. 2º - Este ato entra em vigor na data de sua publicação, revogadas as disposições em contrário.`}
                          </p>
                        </div>

                        {/* Official Signature Stamp */}
                        <div className="pt-8 text-center border-t border-slate-200 mt-8 space-y-1">
                          <div className="w-32 border-t border-slate-400 mx-auto" />
                          <div className="text-[10px] font-bold text-slate-900">
                            {selectedDoc.signatario || 'Gabinete do Prefeito Municipal'}
                          </div>
                          <div className="text-[8.5px] text-slate-400">
                            São Miguel do Tocantins - TO
                          </div>
                        </div>
                      </div>

                      {/* BLUR OVERLAY WITH BUTTON TO REMOVE BLUR (Requested by user) */}
                      {isPdfBlurred && (
                        <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 z-20">
                          <div className="bg-white/95 border border-slate-200 p-5 rounded-2xl shadow-2xl max-w-xs text-center space-y-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                              <Eye className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-slate-800">Visualização do Documento</h4>
                              <p className="text-xs text-slate-500 mt-0.5">
                                O arquivo está protegido em modo de pré-visualização rápida.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsPdfBlurred(false)}
                              style={{ backgroundColor: theme.primaryHex }}
                              className="w-full text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer filter hover:brightness-95"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Clique aqui para visualizar</span>
                            </button>
                            <span className="text-[10.5px] text-slate-400 block">
                              Ao clicar, o borrão será removido
                            </span>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                </div>

                {/* Horizontal Line above BAIXAR TODOS */}
                <hr className="border-t border-slate-200" />

                {/* Bottom Left Button: BAIXAR TODOS (Matching Image 3) */}
                <div>
                  <button
                    type="button"
                    onClick={() => handleDownload(selectedDoc)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-sm transition cursor-pointer shadow-2xs"
                  >
                    <span>BAIXAR TODOS</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: Document Details & Metadata with Horizontal Dividing Lines */}
              <div className="lg:col-span-6 flex flex-col justify-between min-h-[580px] pl-0 lg:pl-4">
                
                <div className="space-y-4">
                  {/* Document Heading */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {getDocHeading(selectedDoc)}
                  </h2>

                  {/* Horizontal Line 1 */}
                  <hr className="border-t border-slate-200" />

                  {/* Metadata Grid (Matching Image 3: DATA DE ASSINATURA | NÚMERO | SEÇÃO) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider block">
                        DATA DE ASSINATURA
                      </span>
                      <span className="text-sm font-bold text-slate-900 mt-1 block">
                        {selectedDoc.assinatura}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider block">
                        NÚMERO
                      </span>
                      <span className="text-sm font-bold text-slate-900 mt-1 block">
                        {selectedDoc.numeroSimples}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider block">
                        SEÇÃO
                      </span>
                      <span className="text-sm font-bold text-slate-900 mt-1 block">
                        {selectedDoc.secao || '-'}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Line 2 */}
                  <hr className="border-t border-slate-200" />

                  {/* Ementa Section (Matching Image 3) */}
                  <div className="space-y-2">
                    <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider block">
                      EMENTA
                    </span>
                    <p className="text-sm sm:text-[14.5px] font-bold text-slate-900 uppercase leading-relaxed">
                      {selectedDoc.ementa}
                    </p>
                  </div>

                  {/* Horizontal Line 3 */}
                  <hr className="border-t border-slate-200" />

                  {/* Additional Information / Diário Oficial */}
                  <div className="space-y-2 text-xs text-slate-600">
                    <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider block">
                      PUBLICAÇÃO E AUTENTICIDADE
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                        <span className="text-[10px] text-slate-400 uppercase block">Órgão Publicador</span>
                        <span className="font-semibold text-slate-800 text-xs">Diário Oficial do Município</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                        <span className="text-[10px] text-slate-400 uppercase block">Certificação Digital</span>
                        <span className="font-semibold text-emerald-700 text-xs flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Assinado Digitalmente (ICP-Brasil)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Line 4 */}
                  <hr className="border-t border-slate-200" />
                </div>

                {/* Bottom Right Button: VOLTAR (Matching Image 3) */}
                <div className="flex justify-end pt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoc(null);
                      setIsPdfBlurred(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-sm transition cursor-pointer shadow-2xs"
                  >
                    <span>VOLTAR</span>
                    <LogOut className="w-3.5 h-3.5 rotate-180" />
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
