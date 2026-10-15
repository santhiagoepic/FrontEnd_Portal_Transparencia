import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  UserPlus, 
  Check, 
  Trash2, 
  Power, 
  Lock, 
  Edit3, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminUser, ModuleId, PermissionAction, UserRole } from '../../types/auth.types';
import { useToast } from '../Toast';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODULES_LIST: { id: ModuleId; label: string }[] = [
  { id: 'atos-normativos', label: 'Atos Normativos (Portarias, Leis, Decretos)' },
  { id: 'licitacoes', label: 'Licitações' },
  { id: 'contratos', label: 'Contratos' },
  { id: 'despesas', label: 'Despesas' },
  { id: 'receitas', label: 'Receitas' },
  { id: 'recursos-humanos', label: 'Recursos Humanos / Servidores' },
  { id: 'obras', label: 'Obras Públicas' },
  { id: 'saude', label: 'Saúde' },
  { id: 'educacao', label: 'Educação' },
  { id: 'ouvidoria', label: 'Ouvidoria' },
  { id: 'sic', label: 'e-SIC (Acesso à Informação)' },
];

const PERMISSIONS_LIST: { action: PermissionAction; label: string }[] = [
  { action: 'view_admin', label: 'Ver Admin' },
  { action: 'create', label: 'Criar' },
  { action: 'edit', label: 'Editar' },
  { action: 'publish', label: 'Publicar' },
  { action: 'add_files', label: 'Add Arq.' },
  { action: 'replace_files', label: 'Subst. Arq.' },
  { action: 'delete_files', label: 'Excluir Arq.' },
  { action: 'delete_records', label: 'Excluir Reg.' },
];

export const UserManagementModal: React.FC<UserManagementModalProps> = ({ isOpen, onClose }) => {
  const { users, currentUser, createUser, updateUser, toggleUserStatus, deleteUser } = useAuth();
  const { success, error: toastError, info } = useToast();

  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'edit'>('list');
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCargo, setNewCargo] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('PERSONALIZADO');
  const [newPermissions, setNewPermissions] = useState<Partial<Record<ModuleId, Partial<Record<PermissionAction, boolean>>>>>({
    'atos-normativos': { view_admin: true, edit: true, create: true },
  });

  if (!isOpen) return null;

  const handleTogglePermission = (modId: ModuleId, act: PermissionAction) => {
    setNewPermissions(prev => {
      const currentMod = prev[modId] || {};
      const nextVal = !currentMod[act];
      return {
        ...prev,
        [modId]: {
          ...currentMod,
          [act]: nextVal,
        },
      };
    });
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newCargo) {
      toastError('Preencha todos os campos obrigatórios.');
      return;
    }

    const res = createUser({
      name: newName,
      email: newEmail,
      cargo: newCargo,
      role: newRole,
      status: 'ativo',
      permissions: newRole === 'PERSONALIZADO' ? newPermissions : undefined,
    });

    if (res.success) {
      success(res.message);
      setNewName('');
      setNewEmail('');
      setNewCargo('');
      setActiveTab('list');
    } else {
      toastError(res.message);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const res = updateUser(editingUser.id, {
      name: editingUser.name,
      cargo: editingUser.cargo,
      role: editingUser.role,
      permissions: editingUser.permissions,
    });

    if (res.success) {
      success('Permissões do usuário atualizadas com sucesso!');
      setActiveTab('list');
      setEditingUser(null);
    } else {
      toastError(res.message);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0b5444] px-6 py-4.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">Administração de Usuários e Permissões (RBAC)</h3>
              <p className="text-xs text-emerald-100">Painel exclusivo do Administrador MASTER</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header Navigation */}
        <div className="border-b border-slate-200 px-6 py-2.5 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('list'); setEditingUser(null); }}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Usuários Cadastrados ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'new'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Novo Usuário
            </button>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Usuário atual: <strong>{currentUser?.name}</strong> (MASTER)
          </span>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Nome / E-mail</th>
                      <th className="py-3 px-3">Cargo</th>
                      <th className="py-3 px-3">Perfil</th>
                      <th className="py-3 px-3">Situação</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-800">{u.name}</div>
                          <div className="text-[11px] text-slate-500">{u.email}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{u.cargo}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              u.role === 'MASTER'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : u.role === 'ADMIN'
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : 'bg-purple-100 text-purple-800 border border-purple-300'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                              u.status === 'ativo' ? 'text-emerald-700' : 'text-slate-400'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'ativo' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                            {u.status === 'ativo' ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {u.role === 'PERSONALIZADO' && (
                              <button
                                onClick={() => {
                                  setEditingUser(u);
                                  setNewPermissions(u.permissions || {});
                                  setActiveTab('edit');
                                }}
                                className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition"
                                title="Editar Permissões"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => {
                                const res = toggleUserStatus(u.id);
                                if (res.success) success(res.message);
                                else toastError(res.message);
                              }}
                              className={`p-1.5 rounded-lg transition ${
                                u.status === 'ativo'
                                  ? 'text-amber-600 hover:bg-amber-50'
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                              title={u.status === 'ativo' ? 'Desativar Conta' : 'Ativar Conta'}
                            >
                              <Power className="w-4 h-4" />
                            </button>

                            {u.id !== currentUser?.id && (
                              <button
                                onClick={() => {
                                  if (confirm(`Tem certeza que deseja excluir o usuário ${u.name}?`)) {
                                    const res = deleteUser(u.id);
                                    if (res.success) success(res.message);
                                    else toastError(res.message);
                                  }
                                }}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Excluir Usuário"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(activeTab === 'new' || activeTab === 'edit') && (
            <form onSubmit={activeTab === 'new' ? handleCreateSubmit : handleEditSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    value={activeTab === 'new' ? newName : (editingUser?.name || '')}
                    onChange={(e) => {
                      if (activeTab === 'new') setNewName(e.target.value);
                      else setEditingUser(prev => prev ? { ...prev, name: e.target.value } : null);
                    }}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    placeholder="Ex: Roberto Silva"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Institucional *</label>
                  <input
                    type="email"
                    value={activeTab === 'new' ? newEmail : (editingUser?.email || '')}
                    disabled={activeTab === 'edit'}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none disabled:bg-slate-100"
                    placeholder="exemplo@saomiguel.to.gov.br"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cargo / Função *</label>
                  <input
                    type="text"
                    value={activeTab === 'new' ? newCargo : (editingUser?.cargo || '')}
                    onChange={(e) => {
                      if (activeTab === 'new') setNewCargo(e.target.value);
                      else setEditingUser(prev => prev ? { ...prev, cargo: e.target.value } : null);
                    }}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    placeholder="Ex: Auditor Municipal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Perfil de Acesso *</label>
                  <select
                    value={activeTab === 'new' ? newRole : (editingUser?.role || 'PERSONALIZADO')}
                    onChange={(e) => {
                      const r = e.target.value as UserRole;
                      if (activeTab === 'new') setNewRole(r);
                      else setEditingUser(prev => prev ? { ...prev, role: r } : null);
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="PERSONALIZADO">PERSONALIZADO (Permissões granulares por módulo)</option>
                    <option value="ADMIN">ADMIN (Administrador padrão em todos os módulos)</option>
                    <option value="MASTER">MASTER (Controle completo do sistema)</option>
                  </select>
                </div>
              </div>

              {/* RBAC Matrix for PERSONALIZADO */}
              {(activeTab === 'new' ? newRole : editingUser?.role) === 'PERSONALIZADO' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Matriz de Permissões por Módulo e Operação
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Marque as operações permitidas para este usuário em cada módulo do portal:
                      </p>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3 text-left">Módulo</th>
                          {PERMISSIONS_LIST.map(p => (
                            <th key={p.action} className="py-2.5 px-2 text-center text-[10px]">
                              {p.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {MODULES_LIST.map(mod => {
                          const currentModPerms = (activeTab === 'new' ? newPermissions : (editingUser?.permissions || {}))[mod.id] || {};
                          return (
                            <tr key={mod.id} className="hover:bg-slate-50">
                              <td className="py-2 px-3 font-medium text-slate-800 text-[11.5px]">
                                {mod.label}
                              </td>
                              {PERMISSIONS_LIST.map(p => {
                                const isChecked = Boolean(currentModPerms[p.action]);
                                return (
                                  <td key={p.action} className="py-2 px-2 text-center">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {
                                        if (activeTab === 'new') {
                                          handleTogglePermission(mod.id, p.action);
                                        } else if (editingUser) {
                                          const prevPerms = editingUser.permissions || {};
                                          const modP = prevPerms[mod.id] || {};
                                          const updated = {
                                            ...prevPerms,
                                            [mod.id]: {
                                              ...modP,
                                              [p.action]: !modP[p.action],
                                            },
                                          };
                                          setEditingUser({ ...editingUser, permissions: updated });
                                        }
                                      }}
                                      className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setActiveTab('list'); setEditingUser(null); }}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0b5444] hover:bg-[#084336] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{activeTab === 'new' ? 'Salvar Novo Usuário' : 'Atualizar Permissões'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
