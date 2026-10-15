/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { PrimaryCards } from './components/PrimaryCards.tsx';
import { ConsultasGrid } from './components/ConsultasGrid.tsx';
import { QuickAccessDrawer } from './components/QuickAccessDrawer.tsx';
import { GroupDetailView } from './components/GroupDetailView.tsx';
import { OuvidoriaModule } from './components/ouvidoria/OuvidoriaModule.tsx';
import { EsicModule } from './components/esic/EsicModule.tsx';
import { ToastProvider } from './components/Toast.tsx';
import { DetailModal } from './components/DetailModal.tsx';
import { LoginModal } from './components/LoginModal.tsx';
import { AccessibilityModal } from './components/AccessibilityModal.tsx';
import { Footer } from './components/Footer.tsx';
import { AuthProvider } from './context/AuthContext';
import { DashboardView } from './components/admin/DashboardView';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'group' | 'dashboard'>('home');
  const [selectedGroupId, setSelectedGroupId] = useState('institucional');
  const [selectedGroupSubItem, setSelectedGroupSubItem] = useState<string | undefined>(undefined);

  const [activeTab, setActiveTab] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState('receitas');
  const [modalSubCategory, setModalSubCategory] = useState<string | undefined>(undefined);
  const [quickDrawerOpen, setQuickDrawerOpen] = useState(false);
  
  const [loginOpen, setLoginOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(0); // -1, 0, 1, 2

  // Apply font size scale
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 1) {
      root.style.fontSize = '17px';
    } else if (fontSize === 2) {
      root.style.fontSize = '18.5px';
    } else if (fontSize === -1) {
      root.style.fontSize = '14.5px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [fontSize]);

  // Apply high contrast class
  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  const handleOpenModal = (category: string, subCategory?: string) => {
    setModalCategory(category);
    setModalSubCategory(subCategory);
    setModalOpen(true);
  };

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'inicio') {
      setCurrentView('home');
      setModalOpen(false);
    } else if (tab === 'acesso-informacao') {
      handleSelectGroup('sic', 'SIC - Serviço de Informação ao Cidadão');
    } else if (tab === 'legislacao') {
      handleSelectGroup('atos-normativos', 'Leis Municipais');
    } else if (tab === 'perguntas-frequentes') {
      handleSelectGroup('institucional', 'Perguntas Frequentes');
    } else if (tab === 'fale-conosco') {
      handleSelectGroup('ouvidoria', 'Solicitação');
    }
  };

  const handleSelectGroup = (groupId: string, subItem?: string) => {
    let cleanId = groupId;
    if (groupId === 'sic-ouvidoria') cleanId = 'ouvidoria';
    setSelectedGroupId(cleanId);
    setSelectedGroupSubItem(subItem);
    setCurrentView('group');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query?: string) => {
    const q = (query ?? searchQuery).trim().toLowerCase();
    if (!q) return;

    if (q.includes('despesa') || q.includes('gasto') || q.includes('empenho')) {
      handleSelectGroup('despesas');
    } else if (q.includes('receita') || q.includes('arrecada')) {
      handleSelectGroup('receitas');
    } else if (q.includes('licita') || q.includes('edital') || q.includes('pregao')) {
      handleSelectGroup('licitacoes');
    } else if (q.includes('contrato')) {
      handleSelectGroup('contratos');
    } else if (q.includes('folha') || q.includes('servidor') || q.includes('salario') || q.includes('cargo')) {
      handleSelectGroup('recursos-humanos');
    } else if (q.includes('obra')) {
      handleSelectGroup('obras');
    } else if (q.includes('lei') || q.includes('decreto') || q.includes('portaria')) {
      handleSelectGroup('atos-normativos');
    } else if (q.includes('esic') || q.includes('sic') || q.includes('acesso à informação') || q.includes('lai')) {
      handleSelectGroup('sic');
    } else if (q.includes('ouvidor') || q.includes('denuncia') || q.includes('reclam') || q.includes('elogio') || q.includes('sugest')) {
      handleSelectGroup('ouvidoria');
    } else {
      handleSelectGroup('institucional');
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    handleSearchSubmit(tag);
  };

  const handleQuickAccess = (key: string) => {
    handleSelectGroup(key);
  };

  const handleChangeFontSize = (delta: number) => {
    if (delta === 0) setFontSize(0);
    else setFontSize((prev) => Math.min(2, Math.max(-1, prev + delta)));
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
        
        {/* 1. Official Header matching exact screenshot */}
        <Header
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onOpenLogin={() => setLoginOpen(true)}
          onOpenAccessibility={() => setAccessibilityOpen(true)}
          onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
          isHighContrast={isHighContrast}
          fontSize={fontSize}
          onChangeFontSize={handleChangeFontSize}
          onNavigateToDashboard={() => setCurrentView('dashboard')}
        />

        {/* Main Container */}
        <main className="flex-1 w-full mx-auto">
          {currentView === 'dashboard' ? (
            /* Dedicated Administrative Dashboard (Requirement 4) */
            <DashboardView
              onNavigateToGroup={(groupId, subItem) => {
                handleSelectGroup(groupId, subItem);
              }}
              onOpenPublicPortal={() => setCurrentView('home')}
            />
          ) : currentView === 'home' ? (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-12">
              {/* 2. Hero Section: Welcome & Search Box */}
              <HeroSection
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchSubmit={handleSearchSubmit}
                onTagClick={handleTagClick}
              />

              {/* 3. Top 4 Highlight Cards: Receitas, Despesas, Licitações, SIC/Ouvidoria */}
              <PrimaryCards onCardClick={(cardType) => handleSelectGroup(cardType)} />

              {/* 4. Section: Principais Áreas de Consulta (All 21 Groups in 4 Columns with Colors & Icons) */}
              <section className="mt-8 mb-16">
                {/* Section Title & Subtitle */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#0c2340] tracking-tight">
                      Principais Áreas de Consulta
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Acesse informações detalhadas sobre a gestão pública municipal.
                    </p>
                  </div>
                  
                  {/* Quick Access trigger button right above grid as well with lightning icon */}
                  <button
                    onClick={() => setQuickDrawerOpen(true)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-xl transition cursor-pointer self-start sm:self-auto shadow-2xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 shadow-2xs">
                      <Zap className="w-3 h-3 fill-slate-950 text-slate-950" />
                    </div>
                    <span>Abrir Acesso Rápido & Dúvidas →</span>
                  </button>
                </div>

                {/* Full 4-Column Layout with all 21 groups */}
                <ConsultasGrid onSelectItem={handleSelectGroup} />
              </section>
            </div>
          ) : selectedGroupId === 'ouvidoria' ? (
            /* Dedicated Ouvidoria Module */
            <OuvidoriaModule
              initialSubItem={selectedGroupSubItem}
              onBackToHome={() => setCurrentView('home')}
              onSelectGroup={handleSelectGroup}
            />
          ) : selectedGroupId === 'sic' || selectedGroupId === 'esic' ? (
            /* Dedicated e-SIC Module */
            <EsicModule
              initialSubItem={selectedGroupSubItem}
              onBackToHome={() => setCurrentView('home')}
              onSelectGroup={handleSelectGroup}
            />
          ) : (
            /* Dedicated Group Screen with Breadcrumbs and Browser-Style Tabs */
            <GroupDetailView
              groupId={selectedGroupId}
              initialSubItem={selectedGroupSubItem}
              onBackToHome={() => setCurrentView('home')}
              onSelectAnotherGroup={(groupId, subItem) => handleSelectGroup(groupId, subItem)}
            />
          )}
        </main>

        {/* 5. Footer with official government transparency seals and city contacts */}
        <Footer onOpenModal={handleOpenModal} />

        {/* Floating Quick Access Drawer & Side Tab */}
        <QuickAccessDrawer
          isOpen={quickDrawerOpen}
          onClose={() => setQuickDrawerOpen(false)}
          onOpen={() => setQuickDrawerOpen(true)}
          onSelectItem={handleQuickAccess}
          onOpenHelp={() => handleOpenModal('perguntas-frequentes')}
        />

        {/* Interactive Detail Modal */}
        <DetailModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          category={modalCategory}
          subCategory={modalSubCategory}
        />

        {/* Administrative Login Modal (Requirement 3: Redirects to Dashboard upon successful login) */}
        <LoginModal
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          onSuccessLogin={() => setCurrentView('dashboard')}
        />

        {/* Accessibility Modal */}
        <AccessibilityModal
          isOpen={accessibilityOpen}
          onClose={() => setAccessibilityOpen(false)}
          isHighContrast={isHighContrast}
          onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
          fontSize={fontSize}
          onChangeFontSize={handleChangeFontSize}
        />

      </div>
    </ToastProvider>
  );
}
