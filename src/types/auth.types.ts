export type UserRole = 'MASTER' | 'ADMIN' | 'PERSONALIZADO';

export type ModuleId =
  | 'atos-normativos'
  | 'licitacoes'
  | 'contratos'
  | 'despesas'
  | 'receitas'
  | 'recursos-humanos'
  | 'ouvidoria'
  | 'sic'
  | 'obras'
  | 'saude'
  | 'educacao'
  | 'meio-ambiente'
  | 'lgpd'
  | 'diarias'
  | 'planejamento'
  | 'renuncia-receita'
  | 'emendas'
  | 'conselhos'
  | 'convenios'
  | 'outras-informacoes';

export type PermissionAction =
  | 'view_admin'      // Acessar recursos administrativos do módulo
  | 'create'          // Cadastrar novos registros
  | 'edit'            // Modificar registros existentes
  | 'publish'         // Tornar conteúdo disponível ao público
  | 'add_files'       // Enviar documentos e anexos
  | 'replace_files'   // Atualizar documentos existentes
  | 'delete_files'    // Remover documentos
  | 'delete_records'  // Excluir publicações ou cadastros
  | 'manage';         // Ações administrativas específicas

export type ModulePermissions = Record<PermissionAction, boolean>;

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  cargo: string;
  role: UserRole;
  status: 'ativo' | 'inativo';
  avatar?: string;
  permissions?: Partial<Record<ModuleId, Partial<Record<PermissionAction, boolean>>>>;
  createdAt: string;
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  module: ModuleId | string;
  moduleTitle: string;
  action: string;
  recordId: string;
  recordTitle: string;
  details?: string;
}
