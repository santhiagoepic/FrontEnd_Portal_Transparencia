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
  UserX,
  Lock,
  Building,
  Calendar,
  MapPin
} from 'lucide-react';
import { ModalidadeOuvidoria, ManifestacaoInput } from '../../types/ouvidoria.types';
import { useToast } from '../Toast';

interface ManifestacaoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalidadeInicial?: ModalidadeOuvidoria;
  onSuccessSubmitted?: (protocolo: string, codigo: string) => void;
  onSubmit: (data: ManifestacaoInput) => Promise<{ protocolo: string; codigoAcesso: string }>;
}

const MODALIDADE_INFO: Record<ModalidadeOuvidoria, { titulo: string; desc: string; iconBg: string; cor: string; placeholder: string }> = {
  solicitacao: {
    titulo: 'Solicitação',
    desc: 'Peça a execução de um serviço público municipal, como reparo de iluminação, tapa-buraco ou limpeza.',
    iconBg: 'bg-teal-100 text-teal-800',
    cor: '#0d9488',
    placeholder: 'Descreva detalhadamente o serviço necessário, incluindo pontos de referência e o que deve ser realizado...'
  },
  elogio: {
    titulo: 'Elogio',
    desc: 'Demonstre sua satisfação ou apreço pelo atendimento prestado por um servidor, equipe ou unidade municipal.',
    iconBg: 'bg-emerald-100 text-emerald-800',
    cor: '#059669',
    placeholder: 'Conte-nos sobre a experiência positiva, citando se possível o setor, data e nomes dos servidores envolvidos...'
  },
  sugestao: {
    titulo: 'Sugestão',
    desc: 'Proponha melhorias, inovações ou novas ideias para aperfeiçoar os serviços prestados pela Prefeitura.',
    iconBg: 'bg-blue-100 text-blue-800',
    cor: '#0284c7',
    placeholder: 'Explique sua proposta de melhoria e como ela pode beneficiar a comunidade de São Miguel do Tocantins...'
  },
  reclamacao: {
    titulo: 'Reclamação',
    desc: 'Manifeste sua insatisfação quanto à prestação de um serviço, descumprimento de prazos ou atendimento inadequado.',
    iconBg: 'bg-amber-100 text-amber-800',
    cor: '#d97706',
    placeholder: 'Relate o ocorrido com clareza: qual serviço falhou, quando ocorreu e quais prejuízos foram causados...'
  },
  denuncia: {
    titulo: 'Denúncia',
    desc: 'Comunique atos ilícitos, irregularidades administrativas, corrupção ou descumprimento grave da legislação.',
    iconBg: 'bg-rose-100 text-rose-800',
    cor: '#e11d48',
    placeholder: 'Descreva os fatos com precisão: quem praticou, o que aconteceu, onde e quando. Indique elementos de prova...'
  }
};

const SECRETARIAS = [
  'Secretaria Municipal de Administração e Finanças',
  'Secretaria Municipal de Saúde',
  'Secretaria Municipal de Educação e Cultura',
  'Secretaria Municipal de Infraestrutura e Obras',
  'Secretaria Municipal de Meio Ambiente e Saneamento',
  'Secretaria Municipal de Assistência Social',
  'Gabinete do Prefeito',
  'Controladoria Geral do Município',
  'Outro Órgão / Não sei informar'
];

export const ManifestacaoFormModal: React.FC<ManifestacaoFormModalProps> = ({
  isOpen,
  onClose,
  modalidadeInicial = 'solicitacao',
  onSuccessSubmitted,
  onSubmit
}) => {
  const { success, error: toastError } = useToast();
  const [etapa, setEtapa] = useState<1 | 2 | 3 | 4>(1); // 1: Manifestação, 2: Identificação, 3: Revisão, 4: Sucesso
  const [modalidade, setModalidade] = useState<ModalidadeOuvidoria>(modalidadeInicial);

  // Form Fields
  const [assunto, setAssunto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [orgaoDestino, setOrgaoDestino] = useState(SECRETARIAS[0]);
  const [localOcorrencia, setLocalOcorrencia] = useState('');
  const [dataOcorrencia, setDataOcorrencia] = useState('');
  const [anexos, setAnexos] = useState<{ nome: string; tamanho: string }[]>([]);

  // Identificação
  const [isAnonimo, setIsAnonimo] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [bairro, setBairro] = useState('');

  // Submission result
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [protocoloGerado, setProtocoloGerado] = useState('');
  const [codigoGerado, setCodigoGerado] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assunto.trim() || !descricao.trim()) {
      toastError('Preencha o assunto e a descrição da sua manifestação.');
      return;
    }
    if (descricao.trim().length < 20) {
      toastError('A descrição deve conter no mínimo 20 caracteres para possibilitar a apuração.');
      return;
    }
    setEtapa(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnonimo) {
      if (!nome.trim()) {
        toastError('Informe seu nome ou opte pela manifestação anônima.');
        return;
      }
      if (!email.trim() && !telefone.trim()) {
        toastError('Informe ao menos um canal de contato (e-mail ou telefone).');
        return;
      }
    }
    setEtapa(3);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload: ManifestacaoInput = {
        modalidade,
        assunto,
        descricao,
        orgaoDestino,
        localOcorrencia,
        dataOcorrencia,
        anexos,
        isAnonimo,
        solicitante: isAnonimo ? {} : {
          nome,
          email,
          telefone,
          cpf,
          bairro
        }
      };

      const res = await onSubmit(payload);
      setProtocoloGerado(res.protocolo);
      setCodigoGerado(res.codigoAcesso);
      setEtapa(4);
      success(`Manifestação protocolada com sucesso: ${res.protocolo}`);
      if (onSuccessSubmitted) {
        onSuccessSubmitted(res.protocolo, res.codigoAcesso);
      }
    } catch (err: any) {
      toastError(err?.message || 'Falha ao registrar manifestação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCodes = () => {
    const text = `Protocolo: ${protocoloGerado}\nCódigo de Acesso: ${codigoGerado}\nPortal da Transparência de São Miguel do Tocantins`;
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

  const modalConfig = MODALIDADE_INFO[modalidade];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="manifestacao-modal-title"
      >
        
        {/* Top Header */}
        <div className="bg-[#0c2340] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
              Ouvidoria Geral
            </span>
            <h2 id="manifestacao-modal-title" className="text-base sm:text-lg font-bold text-white">
              Nova Manifestação
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

        {/* Progress Stepper (Etapas 1, 2, 3) */}
        {etapa < 4 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between max-w-md mx-auto text-xs font-semibold">
              
              {/* Step 1 */}
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  etapa === 1 ? 'bg-teal-700 text-white' : 'bg-teal-100 text-teal-800'
                }`}>
                  1
                </span>
                <span className={etapa === 1 ? 'text-teal-900 font-bold' : 'text-slate-500'}>
                  Manifestação
                </span>
              </div>

              <div className={`h-0.5 flex-1 mx-3 ${etapa >= 2 ? 'bg-teal-600' : 'bg-slate-200'}`} />

              {/* Step 2 */}
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

              {/* Step 3 */}
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  etapa === 3 ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </span>
                <span className={etapa === 3 ? 'text-teal-900 font-bold' : 'text-slate-500'}>
                  Revisão
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">

          {/* ================= STEP 1: MANIFESTAÇÃO ================= */}
          {etapa === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-5">
              
              {/* Modalidade Selector Tabs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Selecione o Tipo de Manifestação
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(Object.keys(MODALIDADE_INFO) as ModalidadeOuvidoria[]).map((key) => {
                    const info = MODALIDADE_INFO[key];
                    const isSelected = modalidade === key;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setModalidade(key)}
                        className={`px-3 py-2 text-xs font-bold rounded-lg border text-center transition cursor-pointer ${
                          isSelected 
                            ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-2xs ring-1 ring-teal-600'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {info.titulo}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-800">{modalConfig.titulo}: </span>
                  {modalConfig.desc}
                </p>
              </div>

              {/* Assunto */}
              <div>
                <label htmlFor="assunto" className="block text-xs font-bold text-slate-800 mb-1">
                  Assunto da Manifestação <span className="text-rose-500">*</span>
                </label>
                <input
                  id="assunto"
                  type="text"
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  placeholder="Ex: Manutenção na rede de iluminação da Rua das Flores"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900"
                  required
                />
              </div>

              {/* Órgão Destinatário */}
              <div>
                <label htmlFor="orgao" className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>Secretaria ou Órgão Relacionado</span>
                </label>
                <select
                  id="orgao"
                  value={orgaoDestino}
                  onChange={(e) => setOrgaoDestino(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white text-slate-900"
                >
                  {SECRETARIAS.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>

              {/* Descrição Detalhada */}
              <div>
                <label htmlFor="descricao" className="block text-xs font-bold text-slate-800 mb-1">
                  Descrição dos Fatos ou Solicitação <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="descricao"
                  rows={4}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder={modalConfig.placeholder}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 leading-relaxed"
                  required
                />
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>Mínimo de 20 caracteres</span>
                  <span>{descricao.length} caracteres</span>
                </div>
              </div>

              {/* Local e Data (Campos adicionais) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label htmlFor="local" className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>Local / Endereço da Ocorrência</span>
                  </label>
                  <input
                    id="local"
                    type="text"
                    value={localOcorrencia}
                    onChange={(e) => setLocalOcorrencia(e.target.value)}
                    placeholder="Bairro, rua, número ou ponto de referência"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                  />
                </div>
                <div>
                  <label htmlFor="data" className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Data aproximada do fato</span>
                  </label>
                  <input
                    id="data"
                    type="date"
                    value={dataOcorrencia}
                    onChange={(e) => setDataOcorrencia(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                  />
                </div>
              </div>

              {/* Anexos */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Anexar Documentos ou Fotos (Opcional - máx. 10MB)</span>
                </label>
                
                <div className="border border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50/60 hover:bg-slate-100/60 transition relative">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileSimulate}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <div className="flex flex-col items-center gap-1 text-slate-500">
                    <Upload className="w-5 h-5 text-teal-600" />
                    <span className="text-xs font-medium text-slate-700">Clique para selecionar arquivos do seu computador ou celular</span>
                    <span className="text-[10px] text-slate-400">PDF, PNG, JPG, DOCX (até 10MB)</span>
                  </div>
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

              {/* Footer buttons Step 1 */}
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
            <form onSubmit={handleNextStep2} className="space-y-5">
              
              {/* Anonymous Toggle Notice */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                      <UserX className="w-4 h-4 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        Opção de Manifestação Anônima
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        Conforme a Lei nº 13.460/2017, você pode registrar sem se identificar. Se preferir se identificar, seus dados pessoais serão protegidos com sigilo e confidencialidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonimo-checkbox"
                    checked={isAnonimo}
                    onChange={(e) => setIsAnonimo(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer"
                  />
                  <label htmlFor="anonimo-checkbox" className="text-xs font-bold text-slate-800 cursor-pointer select-none">
                    Desejo enviar esta manifestação de forma anônima
                  </label>
                </div>
              </div>

              {!isAnonimo ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label htmlFor="nome" className="block text-xs font-bold text-slate-800 mb-1">
                      Nome Completo <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                      required={!isAnonimo}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-800 mb-1">
                        E-mail de Contato <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefone" className="block text-xs font-bold text-slate-800 mb-1">
                        Telefone / WhatsApp
                      </label>
                      <input
                        id="telefone"
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="(63) 99999-9999"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="cpf" className="block text-xs font-medium text-slate-700 mb-1">
                        CPF (Opcional)
                      </label>
                      <input
                        id="cpf"
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="bairro" className="block text-xs font-medium text-slate-700 mb-1">
                        Bairro / Região
                      </label>
                      <input
                        id="bairro"
                        type="text"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        placeholder="Ex: Centro, Bela Vista, Zona Rural"
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>Seus dados são protegidos pela Lei Geral de Proteção de Dados (LGPD nº 13.709/2018).</span>
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">
                  <p className="font-semibold mb-1">Atenção sobre manifestação anônima:</p>
                  <p>
                    Como você não informou dados de contato, o acompanhamento só poderá ser feito mediante o <strong>Número de Protocolo</strong> e o <strong>Código de Acesso</strong> que serão gerados na próxima etapa. Guarde-os com segurança!
                  </p>
                </div>
              )}

              {/* Footer buttons Step 2 */}
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
                  <span>Revisar Manifestação</span>
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
                  Resumo das Informações
                </h4>

                <div className="divide-y divide-slate-200">
                  <div className="py-1.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-600">Modalidade:</span>
                    <span className="font-bold uppercase text-teal-800">{modalConfig.titulo}</span>
                  </div>
                  <div className="py-1.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-600">Assunto:</span>
                    <span className="font-medium text-slate-900 text-right">{assunto}</span>
                  </div>
                  <div className="py-1.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-600">Órgão Destino:</span>
                    <span className="text-slate-800 text-right">{orgaoDestino}</span>
                  </div>
                  <div className="py-1.5 flex flex-col gap-1">
                    <span className="font-semibold text-slate-600">Descrição:</span>
                    <p className="text-slate-800 bg-white p-2.5 rounded border border-slate-200 text-xs leading-relaxed">
                      {descricao}
                    </p>
                  </div>
                  {localOcorrencia && (
                    <div className="py-1.5 flex justify-between gap-4">
                      <span className="font-semibold text-slate-600">Local:</span>
                      <span className="text-slate-800">{localOcorrencia}</span>
                    </div>
                  )}
                  <div className="py-1.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-600">Identificação:</span>
                    <span className="font-medium text-slate-900">
                      {isAnonimo ? 'Anônimo (identidade protegida)' : `${nome} (${email || telefone})`}
                    </span>
                  </div>
                  {anexos.length > 0 && (
                    <div className="py-1.5 flex justify-between gap-4">
                      <span className="font-semibold text-slate-600">Anexos:</span>
                      <span className="text-slate-800">{anexos.length} arquivo(s)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <p>
                  Ao confirmar o envio, sua manifestação será oficialmente autuada na Ouvidoria Geral de São Miguel do Tocantins com prazo legal de resposta de até 30 dias.
                </p>
              </div>

              {/* Footer buttons Step 3 */}
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
                      <span>Processando envio...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmar e Enviar Manifestação</span>
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
                  Manifestação Registrada com Sucesso!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Sua manifestação foi autuada e encaminhada para a Ouvidoria Geral de São Miguel do Tocantins.
                </p>
              </div>

              {/* Credentials Box */}
              <div className="bg-slate-50 border-2 border-dashed border-teal-300 rounded-xl p-4 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Número do Protocolo:</span>
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
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Prazo Legal:</span>
                  <span className="text-xs font-semibold text-slate-700">30 dias corridos</span>
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
                <strong>Importante:</strong> Anote ou copie o número de protocolo e o código de acesso acima. Você precisará de ambos para consultar o andamento e as respostas da Ouvidoria a qualquer momento pelo portal.
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
