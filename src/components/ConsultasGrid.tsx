import React from 'react';
import { 
  Landmark, 
  ArrowLeftRight, 
  FileCheck2, 
  Headphones, 
  HeartPulse, 
  Trees, 
  FileText, 
  Users, 
  HardHat, 
  Lock, 
  GraduationCap, 
  TrendingUp, 
  CalendarDays, 
  PieChart, 
  Receipt, 
  FolderOpen, 
  TrendingDown, 
  Gavel, 
  MessageSquare, 
  Building, 
  UsersRound,
  ChevronRight
} from 'lucide-react';

interface ConsultasGridProps {
  onSelectItem: (category: string, item?: string) => void;
}

interface ConsultaGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  titleColor: string;
  itemColor: string;
  itemHoverColor: string;
  dotColor: string;
  items: string[];
}

export const ConsultasGrid: React.FC<ConsultasGridProps> = ({ onSelectItem }) => {
  // Column 1 Groups
  const col1: ConsultaGroup[] = [
    {
      id: 'institucional',
      title: 'Informações Institucionais',
      icon: <Landmark className="w-4 h-4 text-blue-700" />,
      iconBg: 'bg-blue-100',
      titleColor: 'text-blue-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-blue-700',
      dotColor: 'bg-blue-500',
      items: [
        'Estrutura Organizacional',
        'Perguntas Frequentes',
        'Radar da Transparência',
      ],
    },
    {
      id: 'convenios',
      title: 'Convênios e Transferências',
      icon: <ArrowLeftRight className="w-4 h-4 text-indigo-700" />,
      iconBg: 'bg-indigo-100',
      titleColor: 'text-indigo-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-indigo-700',
      dotColor: 'bg-indigo-500',
      items: [
        'Convênios e Transferências Recebidas',
        'Convênios e Transferências Concedidas',
        'Parcerias, Acordos e Outros Termos',
      ],
    },
    {
      id: 'contratos',
      title: 'Contratos',
      icon: <FileCheck2 className="w-4 h-4 text-purple-700" />,
      iconBg: 'bg-purple-100',
      titleColor: 'text-purple-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-purple-700',
      dotColor: 'bg-purple-500',
      items: [
        'Contratos',
        'Fiscais de Contratos',
        'Ordem Cronológica de Pagamentos',
        'Contratos até abril 2024',
      ],
    },
    {
      id: 'ouvidoria',
      title: 'Ouvidoria',
      icon: <Headphones className="w-4 h-4 text-teal-700" />,
      iconBg: 'bg-teal-100',
      titleColor: 'text-teal-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-teal-700',
      dotColor: 'bg-teal-500',
      items: [
        'Início',
        'Solicitação',
        'Elogios',
        'Sugestões',
        'Reclamações',
        'Denúncias',
        'Carta de Serviços aos Usuários',
      ],
    },
    {
      id: 'saude',
      title: 'Saúde',
      icon: <HeartPulse className="w-4 h-4 text-rose-700" />,
      iconBg: 'bg-rose-100',
      titleColor: 'text-rose-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-rose-700',
      dotColor: 'bg-rose-500',
      items: [
        'Plano Municipal de Saúde',
        'Programação Anual da Saúde',
        'Relatório de Gestão da Saúde',
        'Serviços de Saúde (Escalas)',
        'Lista de Medicamentos SUS',
        'Medicamentos de Alto Custo',
        'Estoques de Medicamentos das Farmácias Públicas',
        'Lista de Espera da Regulação Municipal',
        'Lista de Espera da Regulação Estadual',
        'Conselho de Saúde',
        'Atas do Conselho de Saúde',
        'Resoluções do Conselho de Saúde',
        'Pareceres do Conselho de Saúde',
        'Relatórios do Conselho de Saúde',
      ],
    },
    {
      id: 'meio-ambiente',
      title: 'Meio Ambiente e Saneamento',
      icon: <Trees className="w-4 h-4 text-emerald-700" />,
      iconBg: 'bg-emerald-100',
      titleColor: 'text-emerald-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-emerald-700',
      dotColor: 'bg-emerald-500',
      items: [
        'Plano Plurianual (PPA) - Meio Ambiente',
        'Prestação de Contas',
        'Relatórios do Conselho de Meio Ambiente e Desenvolvimento Rural Sustentável',
        'Pareceres do Conselho de Meio Ambiente e Desenvolvimento Rural Sustentável',
        'Resoluções do Conselho de Meio Ambiente e Desenvolvimento Rural Sustentável',
        'Atas do Conselho de Meio Ambiente e Desenvolvimento Rural Sustentável',
        'Plano Municipal de Saneamento Básico',
        'Conselho Municipal de Meio Ambiente e Desenvolvimento Rural Sustentável',
        'Quadro de Detalhamento de Despesas (QDD)',
      ],
    },
  ];

  // Column 2 Groups
  const col2: ConsultaGroup[] = [
    {
      id: 'atos-normativos',
      title: 'Atos Normativos',
      icon: <FileText className="w-4 h-4 text-emerald-700" />,
      iconBg: 'bg-emerald-100',
      titleColor: 'text-emerald-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-emerald-700',
      dotColor: 'bg-emerald-500',
      items: [
        'Portarias',
        'Decretos',
        'Leis',
        'Resoluções',
      ],
    },
    {
      id: 'recursos-humanos',
      title: 'Recursos Humanos',
      icon: <Users className="w-4 h-4 text-orange-700" />,
      iconBg: 'bg-orange-100',
      titleColor: 'text-orange-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-orange-700',
      dotColor: 'bg-orange-500',
      items: [
        'Folha de Pagamento',
        'Padrão Remuneratório',
        'Lista de Estagiários',
        'Lista de Terceirizados',
        'Concursos Públicos',
        'Processos Seletivos',
        'Eleição de Conselhos Municipais',
        'Documentos Oficiais',
      ],
    },
    {
      id: 'obras',
      title: 'Obras',
      icon: <HardHat className="w-4 h-4 text-amber-700" />,
      iconBg: 'bg-amber-100',
      titleColor: 'text-amber-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-amber-700',
      dotColor: 'bg-amber-500',
      items: [
        'Acompanhamento de Obras',
        'Consulta de Obras Paralisadas',
      ],
    },
    {
      id: 'lgpd',
      title: 'LGPD e Governo Digital',
      icon: <Lock className="w-4 h-4 text-pink-700" />,
      iconBg: 'bg-pink-100',
      titleColor: 'text-pink-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-pink-700',
      dotColor: 'bg-pink-500',
      items: [
        'Encarregado LGPD',
        'Política de Privacidade',
        'Serviços',
        'Acesso Automatizado aos Dados Abertos (API)',
        'Regulamentação Lei do Governo Digital',
        'Pesquisas de Satisfação',
      ],
    },
    {
      id: 'educacao',
      title: 'Educação e Assistência Social',
      icon: <GraduationCap className="w-4 h-4 text-sky-700" />,
      iconBg: 'bg-sky-100',
      titleColor: 'text-sky-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-sky-700',
      dotColor: 'bg-sky-500',
      items: [
        'Plano Municipal de Educação Relatório de Resultados',
        'Lista de espera em creches',
        'Conselho do Fundeb',
        'Conselho de Assistência Social',
        'Atas do Conselho do Fundeb',
        'Atas do Conselho de Assistência Social',
        'Resoluções do Conselho do Fundeb',
        'Resoluções do Conselho de Assistência Social',
        'Pareceres do Conselho do Fundeb',
        'Pareceres do Conselho de Assistência Social',
        'Relatórios do Conselho do Fundeb',
        'Relatórios do Conselho de Assistência Social',
      ],
    },
  ];

  // Column 3 Groups
  const col3: ConsultaGroup[] = [
    {
      id: 'receitas',
      title: 'Receitas',
      icon: <TrendingUp className="w-4 h-4 text-emerald-700" />,
      iconBg: 'bg-emerald-100',
      titleColor: 'text-emerald-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-emerald-700',
      dotColor: 'bg-emerald-500',
      items: [
        'Receitas',
        'Inscritos em Dívida Ativa',
      ],
    },
    {
      id: 'diarias',
      title: 'Diárias',
      icon: <CalendarDays className="w-4 h-4 text-amber-700" />,
      iconBg: 'bg-amber-100',
      titleColor: 'text-amber-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-amber-700',
      dotColor: 'bg-amber-500',
      items: [
        'Diárias e Passagens',
        'Tabela de Valores de Diárias',
      ],
    },
    {
      id: 'planejamento',
      title: 'Planejamento e Prestação de Contas',
      icon: <PieChart className="w-4 h-4 text-cyan-700" />,
      iconBg: 'bg-cyan-100',
      titleColor: 'text-cyan-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-cyan-700',
      dotColor: 'bg-cyan-500',
      items: [
        'Prestação de Contas (Balanço Anual)',
        'Relatório de Gestão ou Atividades',
        'Parecer do Tribunal de Contas',
        'Julgamento de Contas pelo legislativo',
        'Relatórios de Gestão Fiscal',
        'Relatórios Resumido de Execução Orçamentária',
        'Plano Estratégico',
        'Lei do Plano Plurianual (PPA)',
        'Lei de Diretrizes Orçamentárias (LDO)',
        'Lei Orçamentária Anual (LOA)',
      ],
    },
    {
      id: 'renuncia-receita',
      title: 'Renúncia de Receita',
      icon: <Receipt className="w-4 h-4 text-red-700" />,
      iconBg: 'bg-red-100',
      titleColor: 'text-red-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-red-700',
      dotColor: 'bg-red-500',
      items: [
        'Renúncias Fiscais',
        'Renúncias Pormenorizadas',
        'Renúncias por Incentivos Culturais',
      ],
    },
    {
      id: 'outras-informacoes',
      title: 'Outras Informações',
      icon: <FolderOpen className="w-4 h-4 text-slate-700" />,
      iconBg: 'bg-slate-200',
      titleColor: 'text-slate-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-slate-900',
      dotColor: 'bg-slate-500',
      items: [
        'Planos Municipais',
        'Referências Normativas',
        'Glossário e Termos Técnicos',
        'Editais Aldir Blanc',
      ],
    },
  ];

  // Column 4 Groups
  const col4: ConsultaGroup[] = [
    {
      id: 'despesas',
      title: 'Despesas',
      icon: <TrendingDown className="w-4 h-4 text-rose-700" />,
      iconBg: 'bg-rose-100',
      titleColor: 'text-rose-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-rose-700',
      dotColor: 'bg-rose-500',
      items: [
        'Despesas',
      ],
    },
    {
      id: 'licitacoes',
      title: 'Licitações',
      icon: <Gavel className="w-4 h-4 text-sky-700" />,
      iconBg: 'bg-sky-100',
      titleColor: 'text-sky-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-sky-700',
      dotColor: 'bg-sky-500',
      items: [
        'Licitações',
        'Dispensas e Inexigibilidades',
        'Plano de Contratações Anual (PCA)',
        'Sanções Administrativas',
        'Dispensas, Inexigibilidades e Licitações até Setembro de 2024',
      ],
    },
    {
      id: 'sic',
      title: 'SIC',
      icon: <MessageSquare className="w-4 h-4 text-teal-700" />,
      iconBg: 'bg-teal-100',
      titleColor: 'text-teal-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-teal-700',
      dotColor: 'bg-teal-500',
      items: [
        'SIC - Serviço de Informação ao Cidadão',
        'Regulamentação da LAI',
        'Relatório Estatístico do e-SIC',
        'Informações Classificadas como Sigilosas',
        'Informações Desclassificadas como Sigilosas',
      ],
    },
    {
      id: 'emendas',
      title: 'Emendas Parlamentares',
      icon: <Building className="w-4 h-4 text-violet-700" />,
      iconBg: 'bg-violet-100',
      titleColor: 'text-violet-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-violet-700',
      dotColor: 'bg-violet-500',
      items: [
        'Emendas Parlamentares',
        'Execução Orçamentária e Financeira de Emendas Parlamentares',
      ],
    },
    {
      id: 'conselhos',
      title: 'Conselhos',
      icon: <UsersRound className="w-4 h-4 text-blue-700" />,
      iconBg: 'bg-blue-100',
      titleColor: 'text-blue-700',
      itemColor: 'text-slate-700',
      itemHoverColor: 'hover:text-blue-700',
      dotColor: 'bg-blue-500',
      items: [
        'Conselhos',
        'Atas dos Conselhos',
        'Resoluções dos Conselhos',
        'Pareceres dos Conselhos',
        'Relatórios dos Conselhos',
      ],
    },
  ];

  const columns = [col1, col2, col3, col4];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-10">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="space-y-8">
          {column.map((group) => (
            <div key={group.id} className="flex flex-col">
              
              {/* Group Header with Colored Circular Badge & Icon + Group Title in its color */}
              <div
                onClick={() => onSelectItem(group.id)}
                className="flex items-center justify-between cursor-pointer group mb-2.5 pb-1.5 border-b border-slate-100 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <div className={`w-8 h-8 rounded-full ${group.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs`}>
                    {group.icon}
                  </div>
                  <h3 className={`font-bold text-[15px] sm:text-[15.5px] ${group.titleColor} transition-colors leading-tight`}>
                    {group.title}
                  </h3>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-300 group-hover:${group.titleColor} group-hover:translate-x-0.5 transition-all shrink-0 ml-1`} />
              </div>

              {/* Sub-items list matching the color of their group! */}
              <ul className="space-y-1.5 text-[13px] pl-1">
                {group.items.map((subItem) => (
                  <li key={subItem}>
                    <button
                      type="button"
                      onClick={() => onSelectItem(group.id, subItem)}
                      className={`text-left w-full ${group.itemColor} ${group.itemHoverColor} hover:translate-x-1 transition-all py-0.5 leading-snug cursor-pointer block flex items-center gap-1.5 group/item`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${group.dotColor} opacity-70 group-hover/item:opacity-100 transition-opacity shrink-0`} />
                      <span>{subItem}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
