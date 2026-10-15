import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  ShieldCheck, 
  AlertCircle, 
  Copy, 
  Check, 
  FileText,
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  Send
} from 'lucide-react';
import { SolicitacaoEsicInput } from '../../types/esic.types';
import { useToast } from '../Toast';

interface SolicitacaoEsicFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmitted?: (protocolo: string, codigo: string) => void;
  onSubmit: (data: SolicitacaoEsicInput) => Promise<{ protocolo: string; codigoAcesso: string }>;
}

const FORMAS_RECEBIMENTO = [
  { id: 'sistema', label: 'Pelo próprio sistema e-SIC (Recomendado)' },
  { id: 'email', label: 'Por e-mail' },
  { id: 'presencial', label: 'Retirada física no SIC Presencial da Prefeitura' }
];

export const SolicitacaoEsicFormModal: React.FC<SolicitacaoEsicFormModalProps> = ({
  isOpen,
  onClose,
  onSuccessSubmitted,
  onSubmit
}) => {
  const { success, error: toastError } = useToast();
  const [etapa, setEtapa] = useState<1 | 2 | 3 | 4>(1);

  // Etapa 1: Pedido
  const [assunto, setAssunto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [orgaoDestino, setOrgaoDestino] = useState('Secretaria Municipal de Administração e Finanças');
  const [formaRecebimento, setFormaRecebimento] = useState<'sistema' | 'email' | 'presencial'>('sistema');
  const [anexos, setAnexos] = useState<{ nome: string; tamanho: string }[]>([]);

  // Etapa 2: Identificação
  const [tipoPessoa, setTipoPessoa] = useState<'fisica' | 'juridica'>('fisica');
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [profissao, setProfissao] = useState('');
  const [cidade, setCidade] = useState('São Miguel do Tocantins');
  const [estado, setEstado] = useState('TO');

  // Submissão
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [protocoloGerado, setProtocoloGerado] = useState('');
  const [codigoGerado, setCodigoGerado] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assunto.trim() || !descricao.trim()) {
      toastError('Informe o assunto e a especificação detalhada da informação solicitada.');
      return;
    }
    if (descricao.trim().length < 15) {
      toastError('A especificação do pedido deve conter mais detalhes (mínimo 15 caracteres).');
      return;
    }
    setEtapa(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !cpfCnpj.trim() || !email.trim()) {
      toastError('Nome, CPF/CNPJ e E-mail são obrigatórios para autuação do pedido LAI.');
      return;
    }
    setEtapa(3);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload: SolicitacaoEsicInput = {
        assunto,
        descricao,
        orgaoDestino,
        formaRecebimento,
        anexos,
        solicitante: {
          tipoPessoa,
          nome,
          cpfCnpj,
          email,
          telefone,
          profissao,
          cidade,
          estado
        }
      };

      const res = await onSubmit(payload);
      setProtocoloGerado(res.protocolo);
      setCodigoGerado(res.codigoAcesso);
      setEtapa(4);
      success(`Pedido e-SIC protocolado com sucesso: ${res.protocolo}`);
      if (onSuccessSubmitted) {
        onSuccessSubmitted(res.protocolo, res.codigoAcesso);
      }
    } catch (err: any) {
      toastError(err?.message || 'Falha ao processar solicitação no e-SIC. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCodes = () => {
    const text = `Protocolo e-SIC: ${protocoloGerado}\nCódigo de Acesso: ${codigoGerado}\nPortal da Transparência de São Miguel do Tocantins`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    success('Protocolo e código copiados para a área de transferência!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setAnexos(prev => [...prev, { nome: file.name, tamanho: sizeMb }]);
      success(`Arquivo "${file.name}" anexado.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="esic-modal-title"
      >
        
        {/* Top Header */}
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
              e-SIC Municipal
            </span>
            <h2 id="esic-modal-title" className="text-base sm:text-lg font-bold text-white">
              Novo Pedido de Acesso à Informação
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            title="Fechar formulário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper (Etapas 1, 2, 3) */}
        {etapa < 4 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between max-w-md mx-auto text-xs font-semibold">
              
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  etapa === 1 ? 'bg-teal-700 text-white' : 'bg-teal-100 text-teal-800'
                }`}>
                  1
                </span>
                <span className={etapa === 1 ? 'text-teal-900 font-bold' : 'text-slate-500'}>
                  Solicitação
                </span>
              </div>

              <div className={`h-0.5 flex-1 mx-3 ${etapa >= 2 ? 'bg-teal-600' : 'bg-slate-200'}`} />

              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  etapa === 2 ? 'bg-teal-700 text-white' : etapa > 2 ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  2
                </span>
                <span className={etapa === 2 ? 'text-teal-900 font-bold' : 'text-slate-500'}>
                  Identificação
                </span>
              </div>

              <div className={`h-0.5 flex-1 mx-3 ${etapa >= 3 ? 'bg-teal-600' : 'bg-slate-200'}`} />

              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  etapa === 3 ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </span>
                <span className={etapa === 3 ? 'text-teal-900 font-bold' : 'text-slate-500'}>
                  Revisão e Envio
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">

          {/* ================= STEP 1: SOLICITAÇÃO ================= */}
          {etapa === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-4">
              
              <div className="bg-teal-50 border border-teal-200 p-3 rounded-lg text-xs text-teal-900">
                <p className="font-semibold">Lei Federal nº 12.527/2011 (LAI):</p>
                <p className="mt-0.5">
                  Qualquer cidadão tem o direito de receber informações públicas, sem necessidade de justificar os motivos da solicitação.
                </p>
              </div>

              <div>
                <label htmlFor="esic-assunto" className="block text-xs font-bold text-slate-800 mb-1">
                  Resumo do Pedido / Assunto <span className="text-rose-500">*</span>
                </label>
                <input
                  id="esic-assunto"
                  type="text"
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  placeholder="Ex: Cópia integral do Contrato nº 048/2026 e seus termos aditivos"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="esic-orgao" className="block text-xs font-bold text-slate-800 mb-1">
                  Secretaria ou Órgão Relacionado
                </label>
                <select
                  id="esic-orgao"
                  value={orgaoDestino}
                  onChange={(e) => setOrgaoDestino(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-slate-900"
                >
                  <option value="Secretaria Municipal de Administração e Finanças">Secretaria Municipal de Administração e Finanças</option>
                  <option value="Secretaria Municipal de Saúde">Secretaria Municipal de Saúde</option>
                  <option value="Secretaria Municipal de Educação e Cultura">Secretaria Municipal de Educação e Cultura</option>
                  <option value="Secretaria Municipal de Infraestrutura e Obras">Secretaria Municipal de Infraestrutura e Obras</option>
                  <option value="Secretaria Municipal de Meio Ambiente e Saneamento">Secretaria Municipal de Meio Ambiente e Saneamento</option>
                  <option value="Gabinete do Prefeito">Gabinete do Prefeito</option>
                  <option value="Controladoria Geral do Município">Controladoria Geral do Município</option>
                  <option value="Serviço de Informação ao Cidadão (SIC Central)">Serviço de Informação ao Cidadão (SIC Central)</option>
                </select>
              </div>

              <div>
                <label htmlFor="esic-descricao" className="block text-xs font-bold text-slate-800 mb-1">
                  Especificação Detalhada da Informação Desejada <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="esic-descricao"
                  rows={4}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva de forma clara e precisa a informação ou documento público que você deseja obter, indicando datas, números de processo ou outros elementos que facilitem a busca..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 leading-relaxed"
                  required
                />
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>Mínimo 15 caracteres</span>
                  <span>{descricao.length} caracteres</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Forma Preferencial de Recebimento da Resposta
                </label>
                <div className="space-y-1.5">
                  {FORMAS_RECEBIMENTO.map(f => (
                    <label key={f.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer bg-slate-50 p-2 rounded-lg border border-slate-200 hover:bg-slate-100">
                      <input
                        type="radio"
                        name="formaRecebimento"
                        checked={formaRecebimento === f.id}
                        onChange={() => setFormaRecebimento(f.id as any)}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <span>{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Anexos */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Anexar Documento ou Modelo de Referência (Opcional)</span>
                </label>
                
                <div className="border border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50 hover:bg-slate-100 transition relative cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileSimulate}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">Clique para anexar arquivo (PDF, imagens, planilhas até 10MB)</span>
                </div>

                {anexos.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {anexos.map((arq, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                        <span className="font-medium text-slate-700 truncate">{arq.nome}</span>
                        <span className="text-slate-400 text-[10px] shrink-0 ml-2">{arq.tamanho}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 1 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span>Avançar para Identificação</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          )}

          {/* ================= STEP 2: IDENTIFICAÇÃO ================= */}
          {etapa === 2 && (
            <form onSubmit={handleNextStep2} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Tipo de Solicitante
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTipoPessoa('fisica')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition cursor-pointer flex items-center justify-center gap-2 ${
                      tipoPessoa === 'fisica'
                        ? 'bg-teal-50 border-teal-600 text-teal-900 ring-1 ring-teal-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Pessoa Física</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTipoPessoa('juridica')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition cursor-pointer flex items-center justify-center gap-2 ${
                      tipoPessoa === 'juridica'
                        ? 'bg-teal-50 border-teal-600 text-teal-900 ring-1 ring-teal-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Pessoa Jurídica</span>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="esic-nome" className="block text-xs font-bold text-slate-800 mb-1">
                  {tipoPessoa === 'fisica' ? 'Nome Completo' : 'Razão Social da Empresa'} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="esic-nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder={tipoPessoa === 'fisica' ? 'Seu nome completo' : 'Razão social'}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="esic-cpf" className="block text-xs font-bold text-slate-800 mb-1">
                    {tipoPessoa === 'fisica' ? 'CPF' : 'CNPJ'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="esic-cpf"
                    type="text"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    placeholder={tipoPessoa === 'fisica' ? '000.000.000-00' : '00.000.000/0001-00'}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="esic-email" className="block text-xs font-bold text-slate-800 mb-1">
                    E-mail do Solicitante <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="esic-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="esic-tel" className="block text-xs font-medium text-slate-700 mb-1">
                    Telefone para Contato
                  </label>
                  <input
                    id="esic-tel"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(63) 99999-9999"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="esic-cidade" className="block text-xs font-medium text-slate-700 mb-1">
                    Município / UF
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="esic-cidade"
                      type="text"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                    />
                    <input
                      type="text"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="w-16 px-2 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 uppercase"
                    />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Identificação necessária para fins de autuação do processo administrativo LAI.</span>
              </p>

              {/* Step 2 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEtapa(1)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span>Revisar Solicitação</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          )}

          {/* ================= STEP 3: REVISÃO E ENVIO ================= */}
          {etapa === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs sm:text-[13px]">
                <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                  Revisão dos Dados do Pedido LAI
                </h4>

                <div className="divide-y divide-slate-200">
                  <div className="py-1.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-600">Assunto:</span>
                    <span className="font-bold text-slate-900 text-right">{assunto}</span>
                  </div>
                  <div className="py-1.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-600">Órgão Destino:</span>
                    <span className="text-slate-800 text-right">{orgaoDestino}</span>
                  </div>
                  <div className="py-1.5 flex flex-col gap-1">
                    <span className="font-semibold text-slate-600">Descrição do Pedido:</span>
                    <p className="text-slate-800 bg-white p-2.5 rounded border border-slate-200 text-xs leading-relaxed">
                      {descricao}
                    </p>
                  </div>
                  <div className="py-1.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-600">Forma de Resposta:</span>
                    <span className="text-teal-800 font-medium">
                      {FORMAS_RECEBIMENTO.find(f => f.id === formaRecebimento)?.label}
                    </span>
                  </div>
                  <div className="py-1.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-600">Solicitante:</span>
                    <span className="font-medium text-slate-900">
                      {nome} ({tipoPessoa === 'fisica' ? 'CPF' : 'CNPJ'}: {cpfCnpj})
                    </span>
                  </div>
                  <div className="py-1.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-600">Contato:</span>
                    <span className="text-slate-700">{email} {telefone && `• ${telefone}`}</span>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <p>
                  Prazo de resposta conforme Art. 11 da Lei Federal nº 12.527/2011: <strong>20 dias corridos</strong>, prorrogáveis por mais 10 dias com justificativa expressa.
                </p>
              </div>

              {/* Step 3 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setEtapa(2)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleFinalSubmit}
                  className="px-6 py-2.5 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processando no e-SIC...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Protocolar Pedido no e-SIC</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 4: CONFIRMAÇÃO & PROTOCOLO ================= */}
          {etapa === 4 && (
            <div className="space-y-5 text-center py-2 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#0c2340]">
                  Pedido e-SIC Protocolado com Sucesso!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Sua solicitação de acesso à informação foi autuada pelo Serviço de Informação ao Cidadão de São Miguel do Tocantins.
                </p>
              </div>

              {/* Box de Credenciais */}
              <div className="bg-slate-50 border-2 border-dashed border-teal-300 rounded-xl p-4 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Protocolo e-SIC:</span>
                  <span className="text-sm font-mono font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-teal-200">
                    {protocoloGerado}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Código de Acesso:</span>
                  <span className="text-sm font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-300">
                    {codigoGerado}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Prazo Legal (LAI):</span>
                  <span className="text-xs font-semibold text-slate-700">20 dias corridos</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCodes}
                  className="w-full mt-2 py-2 text-xs font-bold bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copiado com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copiar Protocolo e Código de Acesso</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-slate-500 max-w-md mx-auto bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-justify leading-relaxed">
                <strong>Acompanhamento:</strong> Utilize a aba "Acompanhar Pedido" a qualquer momento para verificar o andamento, ler respostas e, caso necessário, interpor recursos.
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg transition cursor-pointer shadow-xs"
                >
                  Concluir e Fechar
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
