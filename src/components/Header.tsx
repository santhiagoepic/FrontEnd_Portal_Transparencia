import React from 'react';
import { User, Contrast, Accessibility as AccessibilityIcon, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
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
}) => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'acesso-informacao', label: 'Acesso à Informação' },
    { id: 'legislacao', label: 'Legislação' },
    { id: 'perguntas-frequentes', label: 'Perguntas Frequentes' },
    { id: 'fale-conosco', label: 'Fale Conosco' },
  ];

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

          {/* Right: Accessibility Controls + Login */}
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

            {/* Admin User Status or Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Dashboard button */}
                <button
                  onClick={onNavigateToDashboard}
                  className="bg-[#0b5444] hover:bg-[#084336] text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                  title="Acessar Dashboard Administrativo"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>

                {/* Profile Pill */}
                <div className="hidden md:flex items-center gap-1.5 bg-slate-100 border border-slate-200/90 px-2.5 py-1 rounded-xl text-xs">
                  <span
                    className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded ${
                      currentUser.role === 'MASTER'
                        ? 'bg-emerald-700 text-white'
                        : currentUser.role === 'ADMIN'
                        ? 'bg-blue-700 text-white'
                        : 'bg-purple-700 text-white'
                    }`}
                  >
                    {currentUser.role}
                  </span>
                  <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="p-1.5 sm:p-2 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition cursor-pointer"
                  title="Sair da Sessão Administrativa"
                >
                  <LogOut className="w-4 h-4" />
                </button>
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
