import React from 'react';
import { X, Eye, Type, Volume2, Contrast } from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  fontSize: number;
  onChangeFontSize: (delta: number) => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  isHighContrast,
  onToggleHighContrast,
  fontSize,
  onChangeFontSize,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0b5444] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-300" />
            <h3 className="font-extrabold text-base">Recursos de Acessibilidade</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed">
            Este portal foi desenvolvido seguindo as diretrizes do e-MAG (Modelo de Acessibilidade em Governo Eletrônico) e da norma internacional WCAG 2.1 (nível AA).
          </p>

          <div className="space-y-4">
            {/* Font scaling */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Type className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-sm font-bold text-slate-800">Ajuste do Tamanho da Fonte</div>
                  <div className="text-xs text-slate-500">Tamanho atual: {fontSize === 0 ? 'Padrão (100%)' : fontSize > 0 ? `+${fontSize * 10}%` : `${fontSize * 10}%`}</div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => onChangeFontSize(1)}
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 shadow-2xs"
                >
                  A+
                </button>
                <button
                  onClick={() => onChangeFontSize(0)}
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 shadow-2xs"
                >
                  A
                </button>
                <button
                  onClick={() => onChangeFontSize(-1)}
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 shadow-2xs"
                >
                  A-
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Contrast className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-sm font-bold text-slate-800">Alto Contraste</div>
                  <div className="text-xs text-slate-500">Fundo escuro com fontes de alta legibilidade</div>
                </div>
              </div>
              <button
                onClick={onToggleHighContrast}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  isHighContrast
                    ? 'bg-yellow-400 text-black'
                    : 'bg-[#0b5444] text-white hover:bg-[#084336]'
                }`}
              >
                {isHighContrast ? 'Ativado' : 'Ativar'}
              </button>
            </div>

            {/* VLibras simulator */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-sm font-bold text-slate-800">Leitura de Tela e VLibras</div>
                  <div className="text-xs text-slate-500">Compatível com NVDA, JAWS e VLibras Brasil</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Ativo
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0b5444] text-white rounded-lg text-xs font-semibold hover:bg-[#084336] transition"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
