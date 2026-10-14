import React, { useState } from 'react';
import { X, Lock, ShieldCheck, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'cidadao' | 'servidor'>('cidadao');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [matricula, setMatricula] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogged(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0b5444] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
            <div>
              <h3 className="font-extrabold text-base">Identificação e Acesso</h3>
              <p className="text-xs text-emerald-100">Prefeitura de São Miguel do Tocantins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isLogged ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Autenticação Realizada com Sucesso!</h4>
              <p className="text-xs text-slate-600">
                Você está conectado com nível de segurança certificado. Seus protocolos e pedidos de acesso estarão vinculados ao seu perfil.
              </p>
              <button
                onClick={() => {
                  setIsLogged(false);
                  onClose();
                }}
                className="mt-3 bg-[#0b5444] hover:bg-[#084336] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
              >
                Prosseguir para o Portal
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTab('cidadao')}
                  className={`flex-1 py-2 rounded-lg transition ${
                    tab === 'cidadao'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Entrar com Gov.br / Cidadão
                </button>
                <button
                  type="button"
                  onClick={() => setTab('servidor')}
                  className={`flex-1 py-2 rounded-lg transition ${
                    tab === 'servidor'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Servidor Municipal
                </button>
              </div>

              {tab === 'cidadao' ? (
                <div className="space-y-4 pt-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
                    Utilize sua conta nacional <strong>Gov.br</strong> para solicitar informações, abrir chamados e assinar petições digitais.
                  </div>

                  <button
                    onClick={() => setIsLogged(true)}
                    className="w-full bg-[#1351b4] hover:bg-[#0c3c88] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-xs"
                  >
                    <span className="font-extrabold text-base tracking-wider">gov.br</span>
                    <span>Entrar com gov.br</span>
                  </button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-400 font-semibold">Ou pelo CPF cadastrado</span>
                    </div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CPF</label>
                      <input
                        type="text"
                        required
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Senha</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#0b5444] hover:bg-[#084336] text-white py-2.5 rounded-xl font-bold text-sm transition"
                    >
                      Acessar Portal
                    </button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-3 pt-2">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700">
                    Acesso restrito para servidores públicos municipais da Prefeitura de São Miguel do Tocantins.
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Matrícula Funcional</label>
                    <input
                      type="text"
                      required
                      value={matricula}
                      onChange={(e) => setMatricula(e.target.value)}
                      placeholder="Ex: 001042"
                      className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Senha de Rede</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-sm border border-slate-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0b5444] hover:bg-[#084336] text-white py-2.5 rounded-xl font-bold text-sm transition mt-2"
                  >
                    Entrar no Sistema
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
