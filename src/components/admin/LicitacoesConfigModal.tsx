import React, { useState } from 'react';
import {
  X,
  FileText,
  Building2,
  Scale,
  BookOpen,
  Tag,
  Users,
  Bell,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Sparkles,
} from 'lucide-react';
import {
  DocumentTypeConfig,
  OrgaoConfig,
  ModalidadeConfig,
  LeiBaseConfig,
  SituacaoLicitacaoConfig,
  FornecedorConfig,
  AlertRuleConfig,
} from '../../types/licitacoes.types';
import { licitacoesConfigService } from '../../services/licitacoesConfig.service';
import { useToast } from '../Toast';
import { useAuth } from '../../context/AuthContext';
import { AppInput, AppTextarea, AppCheckbox, AppSelect } from '../ui';

interface LicitacoesConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: () => void;
}

type ConfigTab =
  | 'docTypes'
  | 'orgaos'
  | 'modalidades'
  | 'leisBase'
  | 'situacoes'
  | 'fornecedores'
  | 'alertRules';

export const LicitacoesConfigModal: React.FC<LicitacoesConfigModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated,
}) => {
  const { success, error: toastError } = useToast();
  const { addAuditLog } = useAuth();

  const [activeTab, setActiveTab] = useState<ConfigTab>('docTypes');

  // Local state for all collections
  const [docTypes, setDocTypes] = useState<DocumentTypeConfig[]>(() =>
    licitacoesConfigService.getDocumentTypes()
  );
  const [orgaos, setOrgaos] = useState<OrgaoConfig[]>(() =>
    licitacoesConfigService.getOrgaos()
  );
  const [modalidades, setModalidades] = useState<ModalidadeConfig[]>(() =>
    licitacoesConfigService.getModalidades()
  );
  const [leisBase, setLeisBase] = useState<LeiBaseConfig[]>(() =>
    licitacoesConfigService.getLeisBase()
  );
  const [situacoes, setSituacoes] = useState<SituacaoLicitacaoConfig[]>(() =>
    licitacoesConfigService.getSituacoes()
  );
  const [fornecedores, setFornecedores] = useState<FornecedorConfig[]>(() =>
    licitacoesConfigService.getFornecedores()
  );
  const [alertRules, setAlertRules] = useState<AlertRuleConfig[]>(() =>
    licitacoesConfigService.getAlertRules()
  );

  // Form states for adding items
  const [newDocTypeName, setNewDocTypeName] = useState('');
  const [newDocTypeFase, setNewDocTypeFase] = useState<DocumentTypeConfig['fase']>('divulgacao');
  const [newDocTypeRequired, setNewDocTypeRequired] = useState(false);

  const [newOrgaoNome, setNewOrgaoNome] = useState('');
  const [newOrgaoSigla, setNewOrgaoSigla] = useState('');

  const [newModNome, setNewModNome] = useState('');
  const [newModTipo, setNewModTipo] = useState<ModalidadeConfig['tipo']>('licitacao');

  const [newLeiCodigo, setNewLeiCodigo] = useState('');
  const [newLeiTitulo, setNewLeiTitulo] = useState('');

  const [newSituacaoNome, setNewSituacaoNome] = useState('');
  const [newSituacaoDesc, setNewSituacaoDesc] = useState('');

  const [newFornRazao, setNewFornRazao] = useState('');
  const [newFornCnpj, setNewFornCnpj] = useState('');
  const [newFornCidade, setNewFornCidade] = useState('São Miguel do Tocantins');

  if (!isOpen) return null;

  // Add Handlers
  const handleAddDocType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTypeName.trim()) return;
    const item: DocumentTypeConfig = {
      id: `dt-${Date.now()}`,
      name: newDocTypeName.trim(),
      fase: newDocTypeFase,
      requiredForChecklist: newDocTypeRequired,
      order: docTypes.length + 1,
      active: true,
    };
    const updated = [...docTypes, item];
    setDocTypes(updated);
    licitacoesConfigService.saveDocumentTypes(updated);
    setNewDocTypeName('');
    setNewDocTypeRequired(false);
    success('Tipo de documento adicionado com sucesso!');
    addAuditLog({
      module: 'licitacoes',
      moduleTitle: 'Licitações',
      action: 'Adicionar Tipo de Documento',
      recordId: item.id,
      recordTitle: item.name,
    });
    onConfigUpdated();
  };

  const handleToggleDocType = (id: string) => {
    const updated = docTypes.map((t) => (t.id === id ? { ...t, active: !t.active } : t));
    setDocTypes(updated);
    licitacoesConfigService.saveDocumentTypes(updated);
    onConfigUpdated();
  };

  const handleAddOrgao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgaoNome.trim()) return;
    const item: OrgaoConfig = {
      id: `org-${Date.now()}`,
      nome: newOrgaoNome.trim(),
      sigla: newOrgaoSigla.trim() || newOrgaoNome.trim().substring(0, 4).toUpperCase(),
      active: true,
    };
    const updated = [...orgaos, item];
    setOrgaos(updated);
    licitacoesConfigService.saveOrgaos(updated);
    setNewOrgaoNome('');
    setNewOrgaoSigla('');
    success('Órgão adicionado com sucesso!');
    onConfigUpdated();
  };

  const handleToggleOrgao = (id: string) => {
    const updated = orgaos.map((o) => (o.id === id ? { ...o, active: !o.active } : o));
    setOrgaos(updated);
    licitacoesConfigService.saveOrgaos(updated);
    onConfigUpdated();
  };

  const handleAddModalidade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModNome.trim()) return;
    const item: ModalidadeConfig = {
      id: `mod-${Date.now()}`,
      nome: newModNome.trim(),
      tipo: newModTipo,
      active: true,
    };
    const updated = [...modalidades, item];
    setModalidades(updated);
    licitacoesConfigService.saveModalidades(updated);
    setNewModNome('');
    success('Modalidade adicionada com sucesso!');
    onConfigUpdated();
  };

  const handleToggleModalidade = (id: string) => {
    const updated = modalidades.map((m) => (m.id === id ? { ...m, active: !m.active } : m));
    setModalidades(updated);
    licitacoesConfigService.saveModalidades(updated);
    onConfigUpdated();
  };

  const handleAddLei = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeiCodigo.trim()) return;
    const item: LeiBaseConfig = {
      id: `lei-${Date.now()}`,
      codigo: newLeiCodigo.trim(),
      titulo: newLeiTitulo.trim() || newLeiCodigo.trim(),
      vigencia: 'vigente',
      active: true,
    };
    const updated = [...leisBase, item];
    setLeisBase(updated);
    licitacoesConfigService.saveLeisBase(updated);
    setNewLeiCodigo('');
    setNewLeiTitulo('');
    success('Lei Base adicionada com sucesso!');
    onConfigUpdated();
  };

  const handleToggleLei = (id: string) => {
    const updated = leisBase.map((l) => (l.id === id ? { ...l, active: !l.active } : l));
    setLeisBase(updated);
    licitacoesConfigService.saveLeisBase(updated);
    onConfigUpdated();
  };

  const handleAddFornecedor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFornRazao.trim()) return;
    const item: FornecedorConfig = {
      id: `forn-${Date.now()}`,
      razaoSocial: newFornRazao.trim(),
      cnpj: newFornCnpj.trim() || '00.000.000/0001-00',
      cidade: newFornCidade.trim(),
      uf: 'TO',
      active: true,
    };
    const updated = [...fornecedores, item];
    setFornecedores(updated);
    licitacoesConfigService.saveFornecedores(updated);
    setNewFornRazao('');
    setNewFornCnpj('');
    success('Fornecedor cadastrado com sucesso!');
    onConfigUpdated();
  };

  const handleToggleFornecedor = (id: string) => {
    const updated = fornecedores.map((f) => (f.id === id ? { ...f, active: !f.active } : f));
    setFornecedores(updated);
    licitacoesConfigService.saveFornecedores(updated);
    onConfigUpdated();
  };

  const handleToggleAlertRule = (id: string) => {
    const updated = alertRules.map((r) => (r.id === id ? { ...r, active: !r.active } : r));
    setAlertRules(updated);
    licitacoesConfigService.saveAlertRules(updated);
    onConfigUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-2xs p-3 sm:p-5 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[90vh] max-h-[820px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Configurações Administrativas de Licitações
              </h3>
              <p className="text-[11px] text-slate-300">
                Gerenciamento central de seletores, órgãos, modalidades, leis base, fornecedores e regras de alertas
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 bg-slate-50/70 overflow-x-auto shrink-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('docTypes')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'docTypes'
                ? 'border-sky-600 text-sky-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tipos de Documentos ({docTypes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orgaos')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'orgaos'
                ? 'border-sky-600 text-sky-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Órgãos ({orgaos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('modalidades')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'modalidades'
                ? 'border-sky-600 text-sky-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Modalidades ({modalidades.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leisBase')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'leisBase'
                ? 'border-sky-600 text-sky-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Leis Base ({leisBase.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fornecedores')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'fornecedores'
                ? 'border-sky-600 text-sky-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Fornecedores ({fornecedores.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('alertRules')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'alertRules'
                ? 'border-sky-600 text-sky-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Regras de Alertas ({alertRules.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
          {/* TAB 1: TIPOS DE DOCUMENTOS */}
          {activeTab === 'docTypes' && (
            <div className="space-y-6">
              {/* Add form */}
              <form onSubmit={handleAddDocType} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Cadastrar Novo Tipo de Documento
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <AppInput
                      label="Nome da Classificação"
                      value={newDocTypeName}
                      onChange={(e) => setNewDocTypeName(e.target.value)}
                      placeholder="Ex: Ata de Registro de Preços"
                      required
                    />
                  </div>
                  <div>
                    <AppSelect
                      label="Fase Processual"
                      value={newDocTypeFase}
                      onChange={(v) => setNewDocTypeFase(v as DocumentTypeConfig['fase'])}
                      options={[
                        { value: 'preparatoria', label: 'Fase Preparatória' },
                        { value: 'divulgacao', label: 'Fase de Divulgação' },
                        { value: 'julgamento', label: 'Fase de Julgamento' },
                        { value: 'homologacao', label: 'Fase de Homologação' },
                        { value: 'contratual', label: 'Fase Contratual' },
                      ]}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <AppCheckbox
                    checked={newDocTypeRequired}
                    onChange={setNewDocTypeRequired}
                    label="Exigir no Checklist de Documentos Obrigatórios"
                    description="O sistema emitirá alerta e marcará pendência caso o documento não seja anexado"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </form>

              {/* Items Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700">
                  Tipos de Documentos Cadastrados ({docTypes.length})
                </div>
                <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                  {docTypes.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between hover:bg-slate-50/50 transition">
                      <div className="min-w-0 flex-1 pr-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${item.active ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                            {item.name}
                          </span>
                          {item.requiredForChecklist && (
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                              Obrigatório no Checklist
                            </span>
                          )}
                          <span className="text-[9.5px] text-slate-400 capitalize">
                            • {item.fase}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleDocType(item.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                          item.active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {item.active ? <Check className="w-3.5 h-3.5" /> : null}
                        <span>{item.active ? 'Ativo' : 'Inativo'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ÓRGÃOS */}
          {activeTab === 'orgaos' && (
            <div className="space-y-6">
              <form onSubmit={handleAddOrgao} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Cadastrar Novo Órgão Municipal
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-3">
                    <AppInput
                      label="Nome Completo do Órgão"
                      value={newOrgaoNome}
                      onChange={(e) => setNewOrgaoNome(e.target.value)}
                      placeholder="Ex: Secretaria Municipal de Meio Ambiente e Turismo"
                      required
                    />
                  </div>
                  <div>
                    <AppInput
                      label="Sigla"
                      value={newOrgaoSigla}
                      onChange={(e) => setNewOrgaoSigla(e.target.value)}
                      placeholder="Ex: SEMAT"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Órgão</span>
                  </button>
                </div>
              </form>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                  {orgaos.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between hover:bg-slate-50/50 transition">
                      <div>
                        <span className={`text-xs font-bold ${item.active ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                          {item.nome}
                        </span>
                        <span className="text-xs text-slate-500 ml-2 font-mono">({item.sigla})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleOrgao(item.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          item.active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {item.active ? 'Ativo' : 'Inativo'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MODALIDADES */}
          {activeTab === 'modalidades' && (
            <div className="space-y-6">
              <form onSubmit={handleAddModalidade} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Cadastrar Modalidade ou Procedimento
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <AppInput
                      label="Nome da Modalidade"
                      value={newModNome}
                      onChange={(e) => setNewModNome(e.target.value)}
                      placeholder="Ex: Leilão Eletrônico"
                      required
                    />
                  </div>
                  <div>
                    <AppSelect
                      label="Tipo de Procedimento"
                      value={newModTipo}
                      onChange={(v) => setNewModTipo(v as ModalidadeConfig['tipo'])}
                      options={[
                        { value: 'licitacao', label: 'Modalidade Licitatória' },
                        { value: 'contratacao_direta', label: 'Contratação Direta' },
                        { value: 'procedimento_auxiliar', label: 'Procedimento Auxiliar' },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Modalidade</span>
                  </button>
                </div>
              </form>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                  {modalidades.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between hover:bg-slate-50/50 transition">
                      <div>
                        <span className={`text-xs font-bold ${item.active ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                          {item.nome}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono ml-2">[{item.tipo}]</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleModalidade(item.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          item.active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {item.active ? 'Ativo' : 'Inativo'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEIS BASE */}
          {activeTab === 'leisBase' && (
            <div className="space-y-6">
              <form onSubmit={handleAddLei} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Cadastrar Referência Normativa / Lei Base
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <AppInput
                      label="Código da Lei"
                      value={newLeiCodigo}
                      onChange={(e) => setNewLeiCodigo(e.target.value)}
                      placeholder="Ex: Lei 14.133/2021"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <AppInput
                      label="Título / Ementa Normativa"
                      value={newLeiTitulo}
                      onChange={(e) => setNewLeiTitulo(e.target.value)}
                      placeholder="Ex: Lei nº 14.133/2021 - Lei de Licitações e Contratos"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Lei</span>
                  </button>
                </div>
              </form>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                  {leisBase.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between hover:bg-slate-50/50 transition">
                      <div>
                        <span className={`text-xs font-bold ${item.active ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                          {item.codigo}
                        </span>
                        <span className="text-xs text-slate-500 ml-2">{item.titulo}</span>
                        <span className="text-[10px] text-slate-400 capitalize ml-2">({item.vigencia})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleLei(item.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          item.active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {item.active ? 'Ativo' : 'Inativo'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FORNECEDORES */}
          {activeTab === 'fornecedores' && (
            <div className="space-y-6">
              <form onSubmit={handleAddFornecedor} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Cadastrar Empresa Fornecedora
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <AppInput
                      label="Razão Social"
                      value={newFornRazao}
                      onChange={(e) => setNewFornRazao(e.target.value)}
                      placeholder="Nome empresarial completo"
                      required
                    />
                  </div>
                  <div>
                    <AppInput
                      label="CNPJ"
                      value={newFornCnpj}
                      onChange={(e) => setNewFornCnpj(e.target.value)}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Fornecedor</span>
                  </button>
                </div>
              </form>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                  {fornecedores.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between hover:bg-slate-50/50 transition">
                      <div>
                        <div className={`text-xs font-bold ${item.active ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                          {item.razaoSocial}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          CNPJ: {item.cnpj} • {item.cidade}/{item.uf}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleFornecedor(item.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          item.active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {item.active ? 'Ativo' : 'Inativo'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: REGRAS DE ALERTAS */}
          {activeTab === 'alertRules' && (
            <div className="space-y-4">
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 leading-relaxed">
                As regras de alerta monitoram automaticamente os processos licitatórios de São Miguel do Tocantins. Quando uma condição é atendida (ex: homologação sem contrato ou ausência de edital), a pendência é gerada e apresentada na Central de Notificações.
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs divide-y divide-slate-100">
                {alertRules.map((rule) => {
                  const severityBadge =
                    rule.severity === 'critica'
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : rule.severity === 'atencao'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-sky-50 text-sky-800 border-sky-200';

                  return (
                    <div key={rule.id} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50/50 transition">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900">{rule.title}</span>
                          <span className={`text-[9.5px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${severityBadge}`}>
                            {rule.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{rule.message}</p>
                        <div className="text-[11px] text-slate-400 mt-1 font-mono">
                          Ação Recomendada: <span className="font-semibold text-slate-600">{rule.actionLabel}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleAlertRule(rule.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition cursor-pointer shrink-0 ${
                          rule.active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {rule.active ? 'Regra Ativa' : 'Desativada'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11.5px] text-slate-500">
            Alterações são persistidas e refletem imediatamente nos seletores e formulários
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
