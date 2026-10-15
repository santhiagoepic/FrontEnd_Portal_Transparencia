import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AuditLog, ModuleId, PermissionAction, UserRole } from '../types/auth.types';
import { INITIAL_ADMIN_USERS, INITIAL_AUDIT_LOGS } from '../data/mock/users.mock';

interface AuthContextType {
  currentUser: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, roleHint?: UserRole) => { success: boolean; error?: string };
  logout: () => void;
  hasPermission: (moduleId: string, action: PermissionAction) => boolean;
  canAccessModuleAdmin: (moduleId: string) => boolean;
  isMaster: boolean;
  isAdminOrMaster: boolean;
  users: AdminUser[];
  auditLogs: AuditLog[];
  addAuditLog: (entry: {
    module: string;
    moduleTitle: string;
    action: string;
    recordId: string;
    recordTitle: string;
    details?: string;
  }) => void;
  createUser: (userData: Omit<AdminUser, 'id' | 'createdAt'>) => { success: boolean; message: string };
  updateUser: (userId: string, updates: Partial<AdminUser>) => { success: boolean; message: string };
  toggleUserStatus: (userId: string) => { success: boolean; message: string };
  deleteUser: (userId: string) => { success: boolean; message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('saomiguel_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem('saomiguel_admin_users');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
    } catch {
      return INITIAL_ADMIN_USERS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('saomiguel_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('saomiguel_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('saomiguel_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('saomiguel_admin_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('saomiguel_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const login = (email: string, roleHint?: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Find matching user or fallback by roleHint
    let target = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!target && roleHint) {
      target = users.find(u => u.role === roleHint);
    }

    if (!target) {
      return { success: false, error: 'Credenciais inválidas. Verifique o e-mail ou utilize um dos perfis administrativos demonstrativos.' };
    }

    if (target.status === 'inativo') {
      return { success: false, error: 'Esta conta administrativa está inativa. Contate o Administrador MASTER.' };
    }

    const updatedUser = {
      ...target,
      lastLogin: new Date().toISOString(),
    };

    setCurrentUser(updatedUser);
    
    // Update lastLogin in list
    setUsers(prev => prev.map(u => u.id === target!.id ? updatedUser : u));

    // Register login in audit logs
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: target.id,
      userName: target.name,
      userRole: target.role,
      module: 'autenticacao',
      moduleTitle: 'Sistema de Acesso',
      action: 'Acesso Administrativo',
      recordId: target.id,
      recordTitle: `Sessão iniciada como ${target.role}`,
      details: `Login efetuado por ${target.name} (${target.cargo})`,
    };
    setAuditLogs(prev => [newLog, ...prev]);

    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      const logoutLog: AuditLog = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.role,
        module: 'autenticacao',
        moduleTitle: 'Sistema de Acesso',
        action: 'Encerramento de Sessão',
        recordId: currentUser.id,
        recordTitle: `Sessão finalizada`,
        details: `Logout voluntário por ${currentUser.name}`,
      };
      setAuditLogs(prev => [logoutLog, ...prev]);
    }
    setCurrentUser(null);
  };

  const hasPermission = (moduleId: string, action: PermissionAction): boolean => {
    if (!currentUser) return false;
    
    // MASTER tem todas as permissões em todos os módulos
    if (currentUser.role === 'MASTER') return true;

    // ADMIN padrão gerencia todos os módulos públicos, exceto gestão de usuários
    if (currentUser.role === 'ADMIN') {
      if (moduleId === 'usuarios' || moduleId === 'seguranca') {
        return false;
      }
      return true;
    }

    // PERSONALIZADO: checagem estrita por módulo e ação
    const modulePerms = currentUser.permissions?.[moduleId as ModuleId];
    if (!modulePerms) return false;

    return Boolean(modulePerms[action]);
  };

  const canAccessModuleAdmin = (moduleId: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'MASTER' || currentUser.role === 'ADMIN') return true;
    return Boolean(currentUser.permissions?.[moduleId as ModuleId]?.view_admin);
  };

  const addAuditLog = (entry: {
    module: string;
    moduleTitle: string;
    action: string;
    recordId: string;
    recordTitle: string;
    details?: string;
  }) => {
    if (!currentUser) return;
    const newLog: AuditLog = {
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      module: entry.module,
      moduleTitle: entry.moduleTitle,
      action: entry.action,
      recordId: entry.recordId,
      recordTitle: entry.recordTitle,
      details: entry.details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const createUser = (userData: Omit<AdminUser, 'id' | 'createdAt'>) => {
    if (!currentUser || currentUser.role !== 'MASTER') {
      return { success: false, message: 'Operação permitida apenas para o Administrador MASTER.' };
    }
    const newUser: AdminUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [...prev, newUser]);
    addAuditLog({
      module: 'seguranca',
      moduleTitle: 'Gestão de Usuários',
      action: 'Criação de Usuário',
      recordId: newUser.id,
      recordTitle: newUser.name,
      details: `Perfil ${newUser.role} criado para ${newUser.email}`,
    });
    return { success: true, message: 'Usuário administrativo cadastrado com sucesso!' };
  };

  const updateUser = (userId: string, updates: Partial<AdminUser>) => {
    if (!currentUser || currentUser.role !== 'MASTER') {
      return { success: false, message: 'Operação permitida apenas para o Administrador MASTER.' };
    }
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, ...updates } : u)));
    addAuditLog({
      module: 'seguranca',
      moduleTitle: 'Gestão de Usuários',
      action: 'Atualização de Usuário',
      recordId: userId,
      recordTitle: updates.name || userId,
      details: `Dados ou permissões modificadas`,
    });
    return { success: true, message: 'Usuário atualizado com sucesso!' };
  };

  const toggleUserStatus = (userId: string) => {
    if (!currentUser || currentUser.role !== 'MASTER') {
      return { success: false, message: 'Operação permitida apenas para o Administrador MASTER.' };
    }
    const target = users.find(u => u.id === userId);
    if (!target) return { success: false, message: 'Usuário não encontrado.' };

    // Não permite desativar a si mesmo se for o único MASTER
    if (target.role === 'MASTER' && target.id === currentUser.id) {
      const masterCount = users.filter(u => u.role === 'MASTER' && u.status === 'ativo').length;
      if (masterCount <= 1) {
        return { success: false, message: 'Não é permitido desativar a única conta MASTER ativa do sistema.' };
      }
    }

    const nextStatus = target.status === 'ativo' ? 'inativo' : 'ativo';
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus } : u));
    addAuditLog({
      module: 'seguranca',
      moduleTitle: 'Gestão de Usuários',
      action: nextStatus === 'ativo' ? 'Ativação de Conta' : 'Desativação de Conta',
      recordId: userId,
      recordTitle: target.name,
      details: `Situação alterada para ${nextStatus}`,
    });
    return { success: true, message: `Conta ${nextStatus === 'ativo' ? 'ativada' : 'desativada'} com sucesso!` };
  };

  const deleteUser = (userId: string) => {
    if (!currentUser || currentUser.role !== 'MASTER') {
      return { success: false, message: 'Operação permitida apenas para o Administrador MASTER.' };
    }
    const target = users.find(u => u.id === userId);
    if (!target) return { success: false, message: 'Usuário não encontrado.' };

    if (target.role === 'MASTER') {
      const masterCount = users.filter(u => u.role === 'MASTER').length;
      if (masterCount <= 1) {
        return { success: false, message: 'Ação bloqueada: Não é permitido excluir a última conta MASTER do sistema.' };
      }
    }

    setUsers(prev => prev.filter(u => u.id !== userId));
    addAuditLog({
      module: 'seguranca',
      moduleTitle: 'Gestão de Usuários',
      action: 'Exclusão de Conta',
      recordId: userId,
      recordTitle: target.name,
      details: `Conta administrativa removida do sistema`,
    });
    return { success: true, message: 'Usuário administrativo excluído com sucesso!' };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        login,
        logout,
        hasPermission,
        canAccessModuleAdmin,
        isMaster: currentUser?.role === 'MASTER',
        isAdminOrMaster: currentUser?.role === 'MASTER' || currentUser?.role === 'ADMIN',
        users,
        auditLogs,
        addAuditLog,
        createUser,
        updateUser,
        toggleUserStatus,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
