import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Search, 
  Send, 
  CheckCircle, 
  Building2, 
  DollarSign, 
  FileText, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  RECEITAS_DATA, 
  DESPESAS_DATA, 
  LICITACOES_DATA, 
  CONTRATOS_DATA, 
  SERVIDORES_DATA, 
  OBRAS_DATA, 
  FAQS_DATA 
} from '../data/portalData.ts';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  subCategory?: string;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  category,
  subCategory,
}) => {
  const [filterSearch, setFilterSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  
  // SIC / Ouvidoria Form state
  const [formType, setFormType] = useState<'informacao' | 'ouvidoria'>('informacao');
  const [manifestationType, setManifestationType] = useState('Reclamação');
  const [citizenName, setCitizenName] = useState('');
  const [citizenEmail, setCitizenEmail] = useState('');
  const [citizenCpf, setCitizenCpf] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [protocolGenerated, setProtocolGenerated] = useState<string | null>(null);

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleGenerateProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    const randomProtocol = `SMT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setProtocolGenerated(randomProtocol);
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    alert(`Relatório em formato ${type.toUpperCase()} gerado com sucesso para os dados de ${getTitle()}!`);
  };

  const getTitle = () => {
    if (subCategory) return subCategory;
    switch (category) {
      case 'receitas': return 'Receitas Municipais';
      case 'despesas': return 'Despesas Públicas';
      case 'licitacoes': return 'Licitações e Editais';
      case 'sic-ouvidoria':
      case 'sic': return 'Serviço de Informação ao Cidadão (SIC)';
      case 'ouvidoria': return 'Ouvidoria Municipal';
      case 'institucional': return 'Informações Institucionais';
      case 'convenios': return 'Convênios e Transferências';
      case 'saude': return 'Saúde Pública Municipal';
      case 'meio-ambiente': return 'Meio Ambiente e Saneamento Básico';
      case 'atos-normativos':
      case 'legislacao': return 'Atos Normativos e Legislação';
      case 'contratos': return 'Contratos e Convênios';
      case 'recursos-humanos': return 'Recursos Humanos e Folha Salarial';
      case 'educacao': return 'Educação e Assistência Social';
      case 'diarias': return 'Diárias e Passagens Concedidas';
      case 'planejamento': return 'Planejamento e Prestação de Contas (PPA/LDO/LOA)';
      case 'renuncia-receita': return 'Renúncia de Receita e Benefícios Fiscais';
      case 'outras-informacoes': return 'Outras Informações e Planos Municipais';
      case 'emendas': return 'Emendas Parlamentares';
      case 'conselhos': return 'Conselhos Municipais';
      case 'lgpd': return 'LGPD & Governo Digital';
      case 'obras': return 'Acompanhamento de Obras Públicas';
      case 'perguntas-frequentes': return 'Perguntas Frequentes (FAQ)';
      case 'fale-conosco': return 'Fale Conosco e Atendimento';
      default: return 'Portal da Transparência';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <h2 className="text-xl font-extrabold text-[#0c2340]">
                {getTitle()}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Prefeitura Municipal de São Miguel do Tocantins - TO • Exercício {selectedYear}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('csv')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition"
              title="Exportar CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition"
              title="Exportar PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with dynamic views */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* 1. RECEITAS VIEW */}
          {category === 'receitas' && (
            <div className="space-y-5">
              {/* Top KPI row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <span className="text-xs font-semibold text-emerald-800 uppercase">Total Arrecadado</span>
                  <div className="text-2xl font-black text-emerald-900 mt-1">
                    {formatCurrency(RECEITAS_DATA.reduce((acc, curr) => acc + curr.arrecadado, 0))}
                  </div>
                  <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
                    <TrendingUp className="w-3 h-3" /> 89.4% da meta prevista
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <span className="text-xs font-semibold text-slate-600 uppercase">Previsão Anual</span>
                  <div className="text-2xl font-black text-slate-800 mt-1">
                    {formatCurrency(RECEITAS_DATA.reduce((acc, curr) => acc + curr.previsto, 0))}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Lei Orçamentária Anual</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <span className="text-xs font-semibold text-blue-800 uppercase">Maior Fonte</span>
                  <div className="text-lg font-bold text-blue-900 mt-1">Fundo Part. Municípios (FPM)</div>
                  <span className="text-[11px] text-blue-700 mt-1 block">51.2% do montante apurado</span>
                </div>
              </div>

              {/* Table search & filter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    placeholder="Filtrar por código ou descrição..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-emerald-600"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Ano:</span>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium bg-white"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Código</th>
                      <th className="py-3 px-4">Descrição da Receita</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4 text-right">Arrecadado</th>
                      <th className="py-3 px-4 text-right">Previsto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {RECEITAS_DATA.filter(
                      (r) =>
                        r.descricao.toLowerCase().includes(filterSearch.toLowerCase()) ||
                        r.codigo.includes(filterSearch)
                    ).map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono text-xs text-slate-600">{r.codigo}</td>
                        <td className="py-3 px-4 font-medium text-slate-800">{r.descricao}</td>
                        <td className="py-3 px-4 text-slate-500 text-xs">{r.categoria}</td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-700">{formatCurrency(r.arrecadado)}</td>
                        <td className="py-3 px-4 text-right text-slate-500">{formatCurrency(r.previsto)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. DESPESAS VIEW */}
          {category === 'despesas' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
                  <span className="text-xs font-semibold text-rose-800 uppercase">Total Liquidado/Pago</span>
                  <div className="text-2xl font-black text-rose-900 mt-1">
                    {formatCurrency(DESPESAS_DATA.reduce((acc, curr) => acc + curr.valor, 0))}
                  </div>
                  <span className="text-[11px] text-rose-700 mt-1 block">Execução orçamentária</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <span className="text-xs font-semibold text-slate-600 uppercase">Empenhos Emitidos</span>
                  <div className="text-2xl font-black text-slate-800 mt-1">147 notas</div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Todas secretarias municipais</span>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <span className="text-xs font-semibold text-amber-800 uppercase">Maior Destinação</span>
                  <div className="text-lg font-bold text-amber-900 mt-1">Infraestrutura e Obras</div>
                  <span className="text-[11px] text-amber-700 mt-1 block">Pavimentação e saneamento</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    placeholder="Filtrar por credor, órgão ou empenho..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Nº Empenho</th>
                      <th className="py-3 px-4">Órgão / Secretaria</th>
                      <th className="py-3 px-4">Credor</th>
                      <th className="py-3 px-4">Fase</th>
                      <th className="py-3 px-4 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {DESPESAS_DATA.filter(
                      (d) =>
                        d.credor.toLowerCase().includes(filterSearch.toLowerCase()) ||
                        d.orgao.toLowerCase().includes(filterSearch.toLowerCase()) ||
                        d.empenho.toLowerCase().includes(filterSearch.toLowerCase())
                    ).map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono font-medium text-slate-700">{d.empenho}</td>
                        <td className="py-3 px-4 text-slate-600">{d.orgao}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{d.credor}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              d.fase === 'Pago'
                                ? 'bg-emerald-100 text-emerald-800'
                                : d.fase === 'Liquidado'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {d.fase}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-slate-900">{formatCurrency(d.valor)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. LICITAÇÕES VIEW */}
          {category === 'licitacoes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Acompanhe os processos licitatórios abertos, em andamento e concluídos pela Prefeitura Municipal.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {LICITACOES_DATA.map((lic) => (
                  <div key={lic.id} className="border border-slate-200 rounded-xl p-4 bg-white hover:border-emerald-300 transition shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-sky-100 text-sky-800 font-bold px-2.5 py-1 rounded-md text-xs">
                          {lic.modalidade}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
                          {lic.numero}
                        </h4>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          lic.status === 'Aberta'
                            ? 'bg-emerald-100 text-emerald-800'
                            : lic.status === 'Em Andamento'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {lic.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                      {lic.objeto}
                    </p>

                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-50 gap-2">
                      <div>
                        <span>Abertura: </span>
                        <strong className="text-slate-700">{lic.dataAbertura}</strong>
                      </div>
                      <div>
                        <span>Valor Estimado: </span>
                        <strong className="text-emerald-700 font-bold">{formatCurrency(lic.valorEstimado)}</strong>
                      </div>
                      <button 
                        onClick={() => alert(`Baixando Edital e Anexos de ${lic.numero}...`)}
                        className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Baixar Edital
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CONTRATOS VIEW */}
          {category === 'contratos' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {CONTRATOS_DATA.map((ct) => (
                  <div key={ct.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                      <span className="font-bold text-slate-900 text-base">{ct.numero}</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                        {ct.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{ct.objeto}</p>
                    <div className="text-xs text-slate-500 flex flex-wrap gap-4 pt-2 border-t border-slate-50">
                      <div>Contratado: <strong className="text-slate-800">{ct.contratado}</strong></div>
                      <div>CNPJ: <strong className="text-slate-800">{ct.cnpj}</strong></div>
                      <div>Valor: <strong className="text-emerald-700">{formatCurrency(ct.valorTotal)}</strong></div>
                      <div>Vigência até: <strong className="text-slate-800">{ct.vigenciaFim}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. RECURSOS HUMANOS / FOLHA VIEW */}
          {category === 'recursos-humanos' && (
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-xs text-orange-900">
                Consulta nominal de servidores públicos municipais da Prefeitura de São Miguel do Tocantins - TO, em conformidade com a Lei de Acesso à Informação.
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Matrícula</th>
                      <th className="py-3 px-4">Nome do Servidor</th>
                      <th className="py-3 px-4">Cargo / Lotação</th>
                      <th className="py-3 px-4">Vínculo</th>
                      <th className="py-3 px-4 text-right">Salário Líquido</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {SERVIDORES_DATA.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono text-slate-500">{s.matricula}</td>
                        <td className="py-3 px-4 font-bold text-slate-800">{s.nome}</td>
                        <td className="py-3 px-4">
                          <div className="text-slate-800 font-medium">{s.cargo}</div>
                          <div className="text-xs text-slate-400">{s.lotacao}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">
                            {s.tipoVinculo}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-700">
                          {formatCurrency(s.salarioLiquido)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. OBRAS VIEW */}
          {category === 'obras' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OBRAS_DATA.map((obra) => (
                  <div key={obra.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm">{obra.nome}</span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                        {obra.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{obra.local}</p>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Progresso físico:</span>
                        <span>{obra.progresso}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${obra.progresso}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <span>Investimento: <strong className="text-slate-800">{formatCurrency(obra.valor)}</strong></span>
                      <span>Previsão: <strong className="text-slate-800">{obra.prazo}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. SIC / OUVIDORIA VIEW & FORM */}
          {(category === 'sic-ouvidoria' || category === 'sic' || category === 'ouvidoria' || category === 'fale-conosco') && (
            <div className="space-y-6">
              {protocolGenerated ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-900">
                    Manifestação Registrada com Sucesso!
                  </h3>
                  <p className="text-sm text-emerald-800 max-w-md mx-auto">
                    Seu pedido foi registrado no sistema integrado da Ouvidoria e SIC de São Miguel do Tocantins. Guarde seu número de protocolo para acompanhamento:
                  </p>
                  <div className="bg-white border-2 border-emerald-500 rounded-xl py-3 px-6 inline-block font-mono font-bold text-xl text-emerald-800 tracking-wider">
                    {protocolGenerated}
                  </div>
                  <p className="text-xs text-emerald-700">
                    O prazo regulamentar de resposta é de até 20 dias corridos conforme a Lei Federal 12.527/2011.
                  </p>
                  <button
                    onClick={() => setProtocolGenerated(null)}
                    className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs px-5 py-2 rounded-lg transition"
                  >
                    Fazer nova solicitação
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex border-b border-slate-200 gap-6">
                    <button
                      onClick={() => setFormType('informacao')}
                      className={`pb-3 text-sm font-bold border-b-2 transition ${
                        formType === 'informacao'
                          ? 'border-emerald-600 text-emerald-700'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      e-SIC (Pedido de Informação Pública)
                    </button>
                    <button
                      onClick={() => setFormType('ouvidoria')}
                      className={`pb-3 text-sm font-bold border-b-2 transition ${
                        formType === 'ouvidoria'
                          ? 'border-emerald-600 text-emerald-700'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Ouvidoria Municipal (Elogios, Sugestões, Reclamações)
                    </button>
                  </div>

                  <form onSubmit={handleGenerateProtocol} className="space-y-4">
                    {formType === 'ouvidoria' && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Manifestação</label>
                        <select
                          value={manifestationType}
                          onChange={(e) => setManifestationType(e.target.value)}
                          className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                        >
                          <option value="Reclamação">Reclamação</option>
                          <option value="Sugestão">Sugestão</option>
                          <option value="Elogio">Elogio</option>
                          <option value="Denúncia">Denúncia (Sigilo Garantido)</option>
                          <option value="Solicitação de Providência">Solicitação de Providência</option>
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo</label>
                        <input
                          type="text"
                          required
                          value={citizenName}
                          onChange={(e) => setCitizenName(e.target.value)}
                          placeholder="Seu nome completo"
                          className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">E-mail para Resposta</label>
                        <input
                          type="email"
                          required
                          value={citizenEmail}
                          onChange={(e) => setCitizenEmail(e.target.value)}
                          placeholder="exemplo@email.com"
                          className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CPF (Opcional se for Denúncia Anônima)</label>
                        <input
                          type="text"
                          value={citizenCpf}
                          onChange={(e) => setCitizenCpf(e.target.value)}
                          placeholder="000.000.000-00"
                          className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Assunto</label>
                        <input
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Ex: Reforma da escola, limpeza de via pública"
                          className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Descrição Detalhada</label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Descreva de forma clara e objetiva a informação desejada ou sua manifestação..."
                        className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="bg-[#0b5444] hover:bg-[#084336] text-white px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition"
                      >
                        <Send className="w-4 h-4" />
                        <span>Enviar Manifestação</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* 8. PERGUNTAS FREQUENTES VIEW */}
          {(category === 'perguntas-frequentes' || subCategory === 'Perguntas frequentes') && (
            <div className="space-y-4">
              <div className="space-y-3">
                {FAQS_DATA.map((faq, idx) => (
                  <details key={idx} className="group border border-slate-200 rounded-xl p-4 bg-white open:bg-slate-50 transition">
                    <summary className="font-bold text-slate-800 text-sm cursor-pointer list-none flex items-center justify-between">
                      <span>{faq.pergunta}</span>
                      <span className="text-emerald-700 font-bold ml-2 text-base group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.resposta}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* 9. ATOS NORMATIVOS / LEGISLAÇÃO / DEMAIS */}
          {category !== 'receitas' && 
           category !== 'despesas' && 
           category !== 'licitacoes' && 
           category !== 'contratos' && 
           category !== 'recursos-humanos' && 
           category !== 'obras' && 
           category !== 'sic-ouvidoria' && 
           category !== 'sic' && 
           category !== 'ouvidoria' && 
           category !== 'fale-conosco' && 
           category !== 'perguntas-frequentes' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                Visualizando informações relativas a <strong>{getTitle()}</strong>. Todos os documentos e dados são atualizados em conformidade com as diretrizes do Tribunal de Contas do Estado do Tocantins (TCE-TO).
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Lei Municipal Ordinária Nº 412/2024</h4>
                    <p className="text-xs text-slate-500">Dispõe sobre as diretrizes para a elaboração e execução do orçamento municipal de São Miguel do Tocantins.</p>
                  </div>
                  <button onClick={() => alert('Download do arquivo PDF da Lei 412/2024')} className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Decreto Municipal Nº 089/2024</h4>
                    <p className="text-xs text-slate-500">Regulamenta os procedimentos de compras e contratações em conformidade com a Nova Lei de Licitações (Lei 14.133/21).</p>
                  </div>
                  <button onClick={() => alert('Download do arquivo PDF do Decreto 089/2024')} className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Portaria Municipal Nº 045/2024</h4>
                    <p className="text-xs text-slate-500">Nomeia a comissão de fiscalização e governança digital da Prefeitura Municipal.</p>
                  </div>
                  <button onClick={() => alert('Download do arquivo PDF da Portaria 045/2024')} className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Fonte: Secretaria Municipal de Finanças e Controle Interno</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
