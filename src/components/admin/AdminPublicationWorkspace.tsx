import React, { useState, useRef } from 'react';
import { ArrowLeft, Check, RefreshCw, Download, ShieldCheck } from 'lucide-react';
import { PermanentDocumentManager, ManagedFile } from '../documents/PermanentDocumentManager';
import { DocumentoOficialDTO } from '../../types/api.types';
import {
  licitacoesConfigService,
  extractSimpleNumber,
  formatCombinedLicitacaoNumber,
} from '../../services/licitacoesConfig.service';
import { LicitacaoDetalhada } from '../../types/licitacoes.types';
import { LicitacaoWorkspaceForm } from './LicitacaoWorkspaceForm';
import { AppInput, AppDatePicker, AppCheckbox, AppSelect, AppTextarea } from '../ui';

interface AdminPublicationWorkspaceProps {
  files: ManagedFile[];
  onFilesChange: (files: ManagedFile[]) => void;
  primaryColor: string;
  moduleLabel: string;
  isNewRecord: boolean;
  selectedDoc: DocumentoOficialDTO;
  docHeading: string;
  editNumero: string;
  setEditNumero: (val: string) => void;
  editAssinatura: string;
  setEditAssinatura: (val: string) => void;
  editCovid: boolean;
  setEditCovid: (val: boolean) => void;
  editSecao: string;
  setEditSecao: (val: string) => void;
  editEmenta: string;
  setEditEmenta: (val: string) => void;
  editTipoRelacao: string;
  setEditTipoRelacao: (val: string) => void;
  editAtosLeis: string;
  setEditAtosLeis: (val: string) => void;
  editSignatario: string;
  setEditSignatario: (val: string) => void;
  editCargo: string;
  setEditCargo: (val: string) => void;
  onBack: () => void;
  onSave: () => void;
  isSaving: boolean;
  groupId?: string;
  onNavigateToContrato?: (contratoId: string) => void;
  readOnly?: boolean;
  isPdfBlurred?: boolean;
  onUnlockBlur?: () => void;
}

export const AdminPublicationWorkspace: React.FC<AdminPublicationWorkspaceProps> = ({
  files,
  onFilesChange,
  primaryColor,
  moduleLabel,
  isNewRecord,
  selectedDoc,
  docHeading,
  editNumero,
  setEditNumero,
  editAssinatura,
  setEditAssinatura,
  editCovid,
  setEditCovid,
  editSecao,
  setEditSecao,
  editEmenta,
  setEditEmenta,
  editTipoRelacao,
  setEditTipoRelacao,
  editAtosLeis,
  setEditAtosLeis,
  editSignatario,
  setEditSignatario,
  editCargo,
  setEditCargo,
  onBack,
  onSave,
  isSaving,
  groupId = 'atos-normativos',
  onNavigateToContrato,
  readOnly = false,
  isPdfBlurred = false,
  onUnlockBlur,
}) => {
  // Resizable split ratio state (initial: 38% for left panel, 62% for right panel)
  const [splitRatio, setSplitRatio] = useState<number>(38);
  const [isDraggingResizer, setIsDraggingResizer] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isLicitacoes = groupId === 'licitacoes';
  const documentTypes = isLicitacoes
    ? licitacoesConfigService.getDocumentTypes().filter((d) => d.active)
    : undefined;

  // Real-time synchronization of licitação data for top header & simulated sheet
  const [licitacaoData, setLicitacaoData] = useState<LicitacaoDetalhada | null>(() => {
    if (!isLicitacoes) return null;
    return licitacoesConfigService.getLicitacaoDetalhada(selectedDoc.id) || null;
  });

  const modalidades = isLicitacoes ? licitacoesConfigService.getModalidades() : [];
  const currentModalidadeNome = isLicitacoes
    ? modalidades.find((m) => m.id === (licitacaoData?.modalidadeId || 'pregao-eletronico'))?.nome ||
      (selectedDoc as any).modalidade ||
      'Pregão Eletrônico'
    : '';
  const currentSimpleNumber = isLicitacoes
    ? extractSimpleNumber(licitacaoData?.numero || selectedDoc.numero || '')
    : '';
  const currentAno = isLicitacoes
    ? (licitacaoData?.ano || selectedDoc.ano || '2026')
    : '';

  // Nomenclatura oficial: Nome da modalidade + número + "/" + ano
  const licitacaoHeading = isLicitacoes
    ? (currentSimpleNumber
        ? `${currentModalidadeNome} nº ${currentSimpleNumber}/${currentAno}`
        : `${currentModalidadeNome} (Exercício ${currentAno})`)
    : '';

  // Pointer event handlers for draggable resizer divider
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDraggingResizer(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingResizer || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPercent = ((e.clientX - rect.left) / rect.width) * 100;
    // Bounded between 25% and 60%
    const clamped = Math.min(60, Math.max(25, newPercent));
    setSplitRatio(clamped);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingResizer) {
      setIsDraggingResizer(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture already released
      }
    }
  };

  // Keyboard accessibility: Left/Right arrow keys adjust by 2%
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplitRatio((prev) => Math.max(25, prev - 2));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplitRatio((prev) => Math.min(60, prev + 2));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden flex flex-col lg:flex-row min-h-[640px] transition-colors ${
        isDraggingResizer ? 'select-none ring-1 ring-emerald-500/30' : ''
      }`}
    >
      {/* =========================================================================
          PAINEL ESQUERDO (cont_left)
          - Documentos e anexos
          - Toda a superfície aceita drag and drop (para administradores)
          - Com seleção de classificação para licitações
          - Consulta e visualização pública com suporte a desfoque auditado
         ========================================================================= */}
      <div
        className="w-full lg:shrink-0 flex flex-col min-w-0"
        style={{ width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${splitRatio}%` : '100%' }}
      >
        <PermanentDocumentManager
          files={files}
          onFilesChange={onFilesChange}
          primaryColor={primaryColor}
          moduleLabel={moduleLabel}
          allowMultiple={true}
          documentTypes={documentTypes}
          readOnly={readOnly}
          isPdfBlurred={isPdfBlurred}
          onUnlockBlur={onUnlockBlur}
          documentTitle={isLicitacoes ? currentModalidadeNome : (selectedDoc.categoria || moduleLabel)}
          documentNumber={
            isLicitacoes
              ? (currentSimpleNumber ? `nº ${currentSimpleNumber}/${currentAno}` : `Exercício ${currentAno}`)
              : (selectedDoc.numero || editNumero)
          }
          documentContent={selectedDoc.textoIntegral || editEmenta}
        />
      </div>

      {/* =========================================================================
          DIVISÓRIA AJUSTÁVEL (elements_resize)
          - Linha vertical arrastável entre os painéis
          - Pointer Events com suporte a mouse, toque e teclado
         ========================================================================= */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={Math.round(splitRatio)}
        aria-valuemin={25}
        aria-valuemax={60}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={`hidden lg:flex w-2.5 hover:w-2.5 transition-colors cursor-col-resize items-center justify-center select-none group shrink-0 relative z-10 border-x border-slate-200/90 ${
          isDraggingResizer ? 'bg-sky-500/20' : 'bg-slate-100 hover:bg-slate-200'
        }`}
        title="Arraste para redimensionar os painéis (use setas ← → do teclado)"
      >
        {/* Grip Handle Indicator */}
        <div
          className={`w-1 h-8 rounded-full transition-colors ${
            isDraggingResizer ? 'bg-sky-600' : 'bg-slate-300 group-hover:bg-slate-500'
          }`}
        />
      </div>

      {/* =========================================================================
          PAINEL DIREITO (cont_right)
          - Campos da publicação (formulário de licitação ou ato padrão)
          - Ações de salvar (admin) ou voltar/baixar (público) no rodapé
         ========================================================================= */}
      <div
        className="w-full flex-1 flex flex-col justify-between p-5 sm:p-6 lg:p-7 bg-white min-w-0 overflow-y-auto"
        style={{ width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${100 - splitRatio}%` : '100%' }}
      >
        <div className="space-y-4">
          {/* Header Title in Group Color */}
          <div className="pb-2 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2
                className="text-xl sm:text-2xl font-black tracking-tight"
                style={{ color: primaryColor }}
              >
                {isLicitacoes ? licitacaoHeading : (isNewRecord ? `Nova ${moduleLabel}` : docHeading)}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {readOnly
                  ? 'Consulta Pública Oficial • Município de São Miguel do Tocantins - TO'
                  : isNewRecord
                  ? 'Preencha os campos abaixo e anexe os arquivos PDF na área ao lado'
                  : 'Edição direta no Portal da Transparência de São Miguel do Tocantins'}
              </p>
            </div>

            {readOnly && (
              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Consulta Pública</span>
              </span>
            )}
          </div>

          {/* Conditional Form: Licitações vs General Module */}
          {isLicitacoes ? (
            <LicitacaoWorkspaceForm
              licitacaoId={selectedDoc.id}
              files={files}
              onFilesChange={onFilesChange}
              isNewRecord={isNewRecord}
              onDetailedChange={(data) => setLicitacaoData(data)}
              onNavigateToContrato={onNavigateToContrato}
              readOnly={readOnly}
            />
          ) : (
            /* Standardized General Publication Form */
            <div className="space-y-4 pt-1">
              {/* Row 1: DATA DA ASSINATURA + NÚMERO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppDatePicker
                  label="Data da Assinatura"
                  value={editAssinatura}
                  onChange={setEditAssinatura}
                  disabled={readOnly}
                  required
                />

                <AppInput
                  label="Número do Ato"
                  value={editNumero}
                  onChange={(e) => setEditNumero(e.target.value)}
                  placeholder="Ex: 086 ou 142"
                  disabled={readOnly}
                  required
                />
              </div>

              {/* Referente à COVID-19 Checkbox */}
              <div className="pt-1 pb-1">
                <AppCheckbox
                  checked={editCovid}
                  onChange={setEditCovid}
                  label="Referente à COVID-19"
                  disabled={readOnly}
                />
              </div>

              {/* SEÇÃO */}
              <AppSelect
                label="Seção / Órgão Emissor"
                value={editSecao}
                onChange={setEditSecao}
                disabled={readOnly}
                options={[
                  { value: 'Gabinete do Prefeito', label: 'Gabinete do Prefeito' },
                  { value: 'Secretaria Municipal de Administração e Finanças', label: 'Secretaria Municipal de Administração e Finanças' },
                  { value: 'Secretaria Municipal de Saúde', label: 'Secretaria Municipal de Saúde' },
                  { value: 'Secretaria Municipal de Educação e Cultura', label: 'Secretaria Municipal de Educação e Cultura' },
                  { value: 'Secretaria Municipal de Obras e Serviços Públicos', label: 'Secretaria Municipal de Obras e Serviços Públicos' },
                  { value: 'Controladoria Geral do Município', label: 'Controladoria Geral do Município' },
                  { value: 'Comissão Permanente de Licitação', label: 'Comissão Permanente de Licitação' },
                ]}
              />

              {/* EMENTA */}
              <AppTextarea
                label="Ementa (Descrição do Conteúdo)"
                value={editEmenta}
                onChange={(e) => setEditEmenta(e.target.value)}
                placeholder="Descreva o teor do ato normativo ou publicação..."
                rows={3}
                uppercase
                readOnly={readOnly}
                required
              />

              {/* TIPO DE RELAÇÃO & ATOS E LEIS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppSelect
                  label="Tipo de Relação"
                  value={editTipoRelacao}
                  onChange={setEditTipoRelacao}
                  disabled={readOnly}
                  options={[
                    { value: 'Nenhuma', label: 'Nenhuma' },
                    { value: 'Revoga ato anterior', label: 'Revoga ato anterior' },
                    { value: 'Altera ato anterior', label: 'Altera ato anterior' },
                    { value: 'Regulamenta ato anterior', label: 'Regulamenta ato anterior' },
                    { value: 'Prorroga vigência', label: 'Prorroga vigência' },
                  ]}
                />

                <AppSelect
                  label="Atos e Leis Vinculados"
                  value={editAtosLeis}
                  onChange={setEditAtosLeis}
                  disabled={readOnly}
                  options={[
                    { value: 'Nenhum', label: 'Nenhum' },
                    { value: 'Portaria 085/2026', label: 'Portaria 085/2026' },
                    { value: 'Decreto 042/2026', label: 'Decreto 042/2026' },
                    { value: 'Lei Municipal 1.450/2025', label: 'Lei Municipal 1.450/2025' },
                  ]}
                />
              </div>

              {/* SIGNATÁRIO & CARGO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AppInput
                  label="Signatário"
                  value={editSignatario}
                  onChange={(e) => setEditSignatario(e.target.value)}
                  placeholder="Nome do signatário"
                  disabled={readOnly}
                />

                <AppInput
                  label="Cargo do Signatário"
                  value={editCargo}
                  onChange={(e) => setEditCargo(e.target.value)}
                  placeholder="Cargo do signatário"
                  disabled={readOnly}
                />
              </div>
            </div>
          )}
        </div>

        {/* Rodapé: SAIR / VOLTAR e SALVAR (Admin) */}
        <div className="pt-5 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{readOnly ? 'VOLTAR' : 'SAIR'}</span>
          </button>

          {readOnly ? (
            files.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  const target = files[0];
                  const blob = target.fileObject || new Blob([
                    `%PDF-1.4\n% Documento Oficial - Prefeitura Municipal de São Miguel do Tocantins\n% Arquivo: ${target.name}`
                  ], { type: 'application/pdf' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = target.name;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0b5444] hover:bg-[#084336] text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Documento Oficial</span>
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="w-full sm:w-auto px-7 py-2.5 bg-[#0b5444] hover:bg-[#084336] disabled:opacity-60 text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span>{isSaving ? 'Gravando dados...' : isNewRecord ? 'SALVAR PUBLICAÇÃO' : 'SALVAR ALTERAÇÕES'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
