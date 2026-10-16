import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Contrast, 
  Accessibility as AccessibilityIcon, 
  Menu, 
  X, 
  LayoutDashboard, 
  LogOut, 
  ChevronDown, 
  Users, 
  Settings, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { Brasao } from './Brasao.tsx';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenLogin: () => void;
  onOpenAccessibility: () => void;
  onToggleHighContrast: () => void;
  isHighContrast: boolean;
  fontSize: number;
  onChangeFontSize: (delta: number) => void;
  onNavigateToDashboard?: () => void;
  onOpenUserManagement?: () => void;
  onNavigateToConfiguracoes?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenLogin,
  onOpenAccessibility,
  onToggleHighContrast,
  isHighContrast,
  onChangeFontSize,
  onNavigateToDashboard,
  onOpenUserManagement,
  onNavigateToConfiguracoes,
}) => {
  const { currentUser, logout, isMaster, isAdminOrMaster } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user profile dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userMenuOpen]);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'acesso-informacao', label: 'Acesso à Informação' },
    { id: 'legislacao', label: 'Legislação' },
    { id: 'perguntas-frequentes', label: 'Perguntas Frequentes' },
    { id: 'fale-conosco', label: 'Fale Conosco' },
  ];

  const handleLogout = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    logout();
  };

  const getRoleDisplayName = () => {
    if (!currentUser) return '';
    if (currentUser.role === 'MASTER') return 'Administrador Master';
    if (currentUser.role === 'ADMIN') return 'Administrador do Sistema';
    return 'Operador Autorizado';
  };

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs w-full">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 lg:gap-4">
          
          {/* Left: Coat of Arms + City Title (Compact & Responsive) */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0"
            onClick={() => onSelectTab('inicio')}
          >
            <Brasao className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 drop-shadow-2xs" />
            <div className="flex flex-col shrink-0">
              <span className="text-[9.5px] sm:text-[10px] font-bold tracking-wider text-slate-800 leading-tight uppercase">
                Prefeitura de
              </span>
              <span className="text-[13px] sm:text-[14.5px] font-extrabold tracking-tight text-[#0c2340] leading-snug whitespace-nowrap">
                SÃO MIGUEL DO TOCANTINS - TO
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] font-semibold tracking-widest text-slate-400 uppercase leading-none mt-0.5 whitespace-nowrap">
                Trabalho por uma cidade melhor
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Visible on desktop >= 1150px) */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-6 text-[12.5px] 2xl:text-[13.5px] shrink-0">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`relative py-1.5 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#0c2340] font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#059669] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Accessibility Controls + User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs shrink-0">
            {/* Font size adjustments */}
            <div className="hidden sm:flex items-center gap-1 font-semibold text-slate-700 whitespace-nowrap bg-slate-50 border border-slate-200/60 px-1.5 py-1 rounded-lg">
              <button
                onClick={() => onChangeFontSize(1)}
                className="hover:text-emerald-700 px-1 rounded transition cursor-pointer"
                title="Aumentar fonte"
              >
                A+
              </button>
              <button
                onClick={() => onChangeFontSize(0)}
                className="hover:text-emerald-700 px-1 rounded transition cursor-pointer"
                title="Tamanho normal"
              >
                A
              </button>
              <button
                onClick={() => onChangeFontSize(-1)}
                className="hover:text-emerald-700 px-1 rounded transition cursor-pointer"
                title="Diminuir fonte"
              >
                A-
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={onToggleHighContrast}
              className={`hidden md:flex items-center gap-1.5 font-medium px-2 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer border ${
                isHighContrast
                  ? 'bg-yellow-400 text-black border-yellow-500 font-bold'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Alternar Alto Contraste"
            >
              <Contrast className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden lg:inline text-[11.5px]">Alto Contraste</span>
            </button>

            {/* Accessibility Button */}
            <button
              onClick={onOpenAccessibility}
              className="hidden lg:flex items-center gap-1.5 font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200/80 hover:bg-slate-50 px-2 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer text-[11.5px]"
              title="Recursos de Acessibilidade"
            >
              <AccessibilityIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Acessibilidade</span>
            </button>

            {/* Admin User Profile Pill with Interactive Dropdown (Settings + Logout) or Public Login */}
            {currentUser ? (
              <div className="relative flex items-center gap-2" ref={userMenuRef}>
                {/* Optional quick dashboard shortcut on larger screens */}
                {onNavigateToDashboard && (
                  <button
                    onClick={onNavigateToDashboard}
                    className="hidden sm:flex bg-[#0b5444] hover:bg-[#084336] text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold items-center gap-1.5 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                    title="Acessar Dashboard Administrativo"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Dashboard</span>
                  </button>
                )}

                {/* Profile Pill Trigger Button matching user's exact specification */}
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                    userMenuOpen
                      ? 'bg-slate-200/90 border-slate-300 text-slate-900 shadow-xs ring-2 ring-emerald-500/20'
                      : 'bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 border-slate-200/90 text-slate-800'
                  }`}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  title="Menu do Usuário e Configurações"
                >
                  <User className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="font-bold text-slate-800 text-[11.5px] truncate max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 shrink-0 ${
                      userMenuOpen ? 'rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>

                {/* User Dropdown Menu showing Settings and Logout Button */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-76 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                    
                    {/* 1. User Identity & Status Header: apenas o nome e o email (sem cargo e sem tipo de admin) */}
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-sm shrink-0 border border-emerald-200 shadow-2xs">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-sm truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[11.5px] text-slate-500 truncate">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>

                    {/* 2. Menu de Ações: Gestão de Usuários, Configurações Gerais e Sair */}
                    <div className="px-2 py-2 space-y-1">
                      {/* Gestão de Usuários */}
                      {onOpenUserManagement && isAdminOrMaster && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false);
                            onOpenUserManagement();
                          }}
                          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-slate-700 hover:text-indigo-950 hover:bg-indigo-50/70 transition font-medium text-left cursor-pointer group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-100/70 text-indigo-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-200/80 transition">
                            <Users className="w-4 h-4 text-indigo-700" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-800 text-[12px]">Gestão de Usuários</div>
                            <div className="text-[10.5px] text-slate-500 truncate">Permissões e servidores municipais</div>
                          </div>
                        </button>
                      )}

                      {/* Configurações Gerais (abre tela com menu no topo e recursos de auditoria e publicações) */}
                      {onNavigateToConfiguracoes && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false);
                            onNavigateToConfiguracoes();
                          }}
                          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-slate-700 hover:text-emerald-950 hover:bg-emerald-50/70 transition font-medium text-left cursor-pointer group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-200/80 transition">
                            <Settings className="w-4 h-4 text-emerald-700" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-800 text-[12px]">Configurações Gerais</div>
                            <div className="text-[10.5px] text-slate-500 truncate">Parâmetros, auditoria e histórico</div>
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="my-1 border-t border-slate-100" />

                    {/* 3. Botão Sair da Sessão (Exibido exclusivamente após clicar na pílula do perfil) */}
                    <div className="px-2 pt-0.5 pb-0.5">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50/90 transition font-bold text-left cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-red-100/70 text-red-700 flex items-center justify-center shrink-0 group-hover:bg-red-200/80 transition">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[12px] block">Sair</span>
                        </div>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              /* Administrative Login Button */
              <button
                onClick={onOpenLogin}
                className="bg-[#0b5444] hover:bg-[#084336] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
                title="Acesso Administrativo (Servidores)"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Entrar</span>
              </button>
            )}

            {/* Mobile / Tablet Menu Button (visible on screens < 1280px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile / Tablet Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-100 flex flex-col space-y-2 bg-white">
            {/* If user is logged in, show user info in mobile drawer as well */}
            {currentUser && (
              <div className="mx-2 mb-2 p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 text-xs truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[10.5px] text-slate-500 truncate">
                      {currentUser.email}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 pt-1 border-t border-slate-200/60 text-xs">
                  {onOpenUserManagement && isAdminOrMaster && (
                    <button
                      onClick={() => {
                        onOpenUserManagement();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-indigo-800 hover:bg-indigo-100 font-semibold text-left"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Gestão de Usuários</span>
                    </button>
                  )}
                  {onNavigateToConfiguracoes && (
                    <button
                      onClick={() => {
                        onNavigateToConfiguracoes();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-emerald-800 hover:bg-emerald-100 font-semibold text-left"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Configurações Gerais</span>
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-red-600 hover:bg-red-50 font-bold text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition ${
                  activeTab === link.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between px-3 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 mr-1">Fonte:</span>
                <button onClick={() => onChangeFontSize(1)} className="font-bold p-1 hover:text-emerald-700">A+</button>
                <button onClick={() => onChangeFontSize(0)} className="font-bold p-1 hover:text-emerald-700">A</button>
                <button onClick={() => onChangeFontSize(-1)} className="font-bold p-1 hover:text-emerald-700">A-</button>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={onToggleHighContrast} className="flex items-center gap-1 text-slate-700 hover:text-slate-900">
                  <Contrast className="w-4 h-4" /> Alto Contraste
                </button>
                <button onClick={onOpenAccessibility} className="flex items-center gap-1 text-slate-700 hover:text-slate-900">
                  <AccessibilityIcon className="w-4 h-4" /> Acessibilidade
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
