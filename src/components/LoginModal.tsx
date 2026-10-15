import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  KeyRound, 
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';
import { UserRole } from '../types/auth.types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose,
  onSuccessLogin
}) => {
  const { login, users } = useAuth();
  const { success, error: toastError } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<UserRole>('MASTER');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleQuickSelect = (role: UserRole) => {
    setSelectedProfile(role);
    const found = users.find(u => u.role === role);
    if (found) {
      setEmail(found.email);
      setPassword('••••••••');
      setErrorMessage('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(email || 'carlos.master@saomiguel.to.gov.br', selectedProfile);
      setIsSubmitting(false);

      if (res.success) {
        success('Autenticação administrativa realizada com sucesso! Redirecionando para o Dashboard...');
        onClose();
        if (onSuccessLogin) {
          onSuccessLogin();
        }
      } else {
        setErrorMessage(res.error || 'Credenciais inválidas');
        toastError(res.error || 'Erro na autenticação administrativa');
      }
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b5444] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">Autenticação Administrativa</h3>
              <p className="text-xs text-emerald-100">Portal da Transparência de São Miguel do Tocantins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Public Access Notice */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-6 py-3 flex items-start gap-2.5 text-xs text-emerald-900">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Acesso Público:</strong> O Portal da Transparência é livre para cidadãos e não exige cadastro ou login. Esta tela destina-se exclusivamente a <strong>contas de servidores municipais autorizados</strong>.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Quick Select Profile Pills for Immediate Testing */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Selecione o perfil administrativo para acesso rápido:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickSelect('MASTER')}
                className={`py-2 px-2.5 rounded-xl border text-left transition flex flex-col cursor-pointer ${
                  selectedProfile === 'MASTER'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-700 text-white">MASTER</span>
                </div>
                <span className="text-xs font-semibold text-slate-800 mt-1 truncate">Dr. Carlos</span>
                <span className="text-[10px] text-slate-500 truncate">Acesso Geral</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSelect('ADMIN')}
                className={`py-2 px-2.5 rounded-xl border text-left transition flex flex-col cursor-pointer ${
                  selectedProfile === 'ADMIN'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-700 text-white">ADMIN</span>
                </div>
                <span className="text-xs font-semibold text-slate-800 mt-1 truncate">Mariana</span>
                <span className="text-[10px] text-slate-500 truncate">Administração</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSelect('PERSONALIZADO')}
                className={`py-2 px-2.5 rounded-xl border text-left transition flex flex-col cursor-pointer ${
                  selectedProfile === 'PERSONALIZADO'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-700 text-white">PERSONAL.</span>
                </div>
                <span className="text-xs font-semibold text-slate-800 mt-1 truncate">Lucas / Ana</span>
                <span className="text-[10px] text-slate-500 truncate">Permissão Estrita</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-mail Institucional (@saomiguel.to.gov.br)
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@saomiguel.to.gov.br"
                  required
                  className="w-full pl-3 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Senha de Acesso Seguro
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha administrativa"
                  required
                  className="w-full pl-3 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0b5444] hover:bg-[#084336] disabled:opacity-60 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Entrar no Painel Administrativo</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="border-t border-slate-100 pt-3 text-center">
            <p className="text-[11px] text-slate-400">
              Sistema com auditoria e controle de acesso baseado em funções (RBAC).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
