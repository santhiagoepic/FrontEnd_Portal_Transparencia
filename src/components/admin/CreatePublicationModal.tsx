import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  FileText, 
  AlertCircle,
  Calendar,
  Building,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../Toast';
import { DocumentoOficialDTO } from '../../types/api.types';

interface CreatePublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
  defaultTab?: string;
  onSuccessCreated?: (newDoc: DocumentoOficialDTO) => void;
}

export const CreatePublicationModal: React.FC<CreatePublicationModalProps> = ({
  isOpen,
  onClose,
  defaultModule = 'atos-normativos',
  defaultTab = 'PORTARIAS',
  onSuccessCreated,
}) => {
  const { currentUser, addAuditLog, hasPermission } = useAuth();
  const { success, error: toastError } = useToast();

  const [tipo, setTipo] = useState<string>(defaultTab || 'PORTARIAS');
  const [numero, setNumero] = useState('');
  const [ano, setAno] = useState('2026');
  const [dataAssinatura, setDataAssinatura] = useState(new Date().toISOString().split('T')[0]);
  const [secao, setSecao] = useState('GABINETE DO PREFEITO');
  const [ementa, setEmenta] = useState('');
  const [signatario, setSignatario] = useState('Prefeito Municipal de São Miguel do Tocantins');
  const [cargo, setCargo] = useState('Prefeito Municipal');
  const [isCovid, setIsCovid] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numero || !ementa) {
      toastError('Número e Ementa são campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const formattedNum = `${tipo.replace(/S$/, '')} nº ${numero}/${ano}`;
      const newDoc: DocumentoOficialDTO = {
        id: `doc-${Date.now()}`,
        groupId: defaultModule,
        tab: tipo,
        numero: formattedNum,
        numeroSimples: numero,
        ano: ano,
        secao: secao,
        assinatura: dataAssinatura,
        ementa: ementa,
        anexoNome: fileName ? fileName : 'documento_oficial_assinado.pdf',
        anexoTamanho: '1.8 MB',
        signatario: signatario,
        cargoSignatario: cargo,
        categoria: tipo,
      };

      addAuditLog({
        module: defaultModule,
        moduleTitle: 'Atos Normativos e Publicações',
        action: 'Nova publicação',
        recordId: newDoc.id,
        recordTitle: formattedNum,
        details: `Cadastro e publicação oficial por ${currentUser?.name} (${currentUser?.role})`,
      });

      setIsSubmitting(false);
      success('Publicação criada e disponibilizada com sucesso!');
      if (onSuccessCreated) {
        onSuccessCreated(newDoc);
      }
      onClose();
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b5444] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <FileText className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">Nova Publicação Oficial</h3>
              <p className="text-xs text-emerald-100">Cadastro de documento público integrado</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Ato *</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="PORTARIAS">Portaria</option>
                <option value="DECRETOS">Decreto</option>
                <option value="LEIS">Lei Municipal</option>
                <option value="RESOLUÇÕES">Resolução</option>
                <option value="EDITAIS">Edital / Licitação</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Número do Ato *</label>
              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Ex: 086 ou 142"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ano *</label>
              <input
                type="number"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Data de Assinatura *</label>
              <input
                type="date"
                value={dataAssinatura}
                onChange={(e) => setDataAssinatura(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Seção / Órgão Emissor *</label>
              <input
                type="text"
                value={secao}
                onChange={(e) => setSecao(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Ementa (Descrição do Conteúdo) *</label>
            <textarea
              rows={3}
              value={ementa}
              onChange={(e) => setEmenta(e.target.value)}
              placeholder="Descreva o teor do ato normativo ou publicação..."
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Signatário</label>
              <input
                type="text"
                value={signatario}
                onChange={(e) => setSignatario(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cargo do Signatário</label>
              <input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Upload File Simulation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Arquivo Oficial (PDF)</label>
            <div className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-xl p-4 text-center bg-slate-50/60 transition cursor-pointer">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-slate-700">
                {fileName ? fileName : 'Clique para selecionar o PDF oficial assinado'}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Formatos suportados: PDF (máx. 25MB)</p>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="doc-upload-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFileName(file.name);
                }}
              />
              <label
                htmlFor="doc-upload-input"
                className="inline-block mt-2 px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 cursor-pointer shadow-2xs"
              >
                Procurar Arquivo
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="covid-check"
              checked={isCovid}
              onChange={(e) => setIsCovid(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="covid-check" className="text-xs text-slate-700 cursor-pointer select-none">
              Ato referente a ações de enfrentamento à <strong>COVID-19</strong>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#0b5444] hover:bg-[#084336] disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publicando...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Publicar no Portal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
