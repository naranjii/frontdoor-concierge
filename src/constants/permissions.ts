// Permission constants for RBAC system
export const PERMISSIONS = {
  // Patients
  PATIENT_VIEW_LIST: 'patient:view_list',
  PATIENT_VIEW_DETAILS: 'patient:view_details',
  PATIENT_CREATE: 'patient:create',
  PATIENT_EDIT: 'patient:edit',
  PATIENT_DELETE: 'patient:delete',
  PATIENT_VIEW_SENSITIVE: 'patient:view_sensitive',
  
  // Appointments
  APPOINTMENT_VIEW_LIST: 'appointment:view_list',
  APPOINTMENT_VIEW_OTHERS: 'appointment:view_others',
  APPOINTMENT_CREATE: 'appointment:create',
  APPOINTMENT_EDIT: 'appointment:edit',
  APPOINTMENT_DELETE: 'appointment:delete',
  
  // Logbook
  LOGBOOK_VIEW: 'logbook:view',
  LOGBOOK_CREATE: 'logbook:create',
  LOGBOOK_EDIT_OWN: 'logbook:edit_own',
  LOGBOOK_EDIT_ALL: 'logbook:edit_all',
  LOGBOOK_DELETE: 'logbook:delete',
  
  // Guests
  GUEST_VIEW_LIST: 'guest:view_list',
  GUEST_CREATE: 'guest:create',
  GUEST_EDIT: 'guest:edit',
  GUEST_DELETE: 'guest:delete',
  
  // Staff
  STAFF_VIEW_LIST: 'staff:view_list',
  STAFF_CREATE: 'staff:create',
  STAFF_EDIT_DETAILS: 'staff:edit_details',
  STAFF_EDIT_ROLES: 'staff:edit_roles',
  STAFF_DEACTIVATE: 'staff:deactivate',
  
  // Admin
  ADMIN_ACCESS_PANEL: 'admin:access_panel',
  RBAC_VIEW_ROLES: 'rbac:view_roles',
  RBAC_CREATE_ROLE: 'rbac:create_role',
  RBAC_EDIT_ROLE: 'rbac:edit_role',
  RBAC_DELETE_ROLE: 'rbac:delete_role',
  INSTITUTION_EDIT_SETTINGS: 'institution:edit_settings',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Permission groups for UI organization
export const PERMISSION_GROUPS = {
  patients: {
    label: 'Pacientes',
    permissions: [
      { value: PERMISSIONS.PATIENT_VIEW_LIST, label: 'Ver a lista de pacientes' },
      { value: PERMISSIONS.PATIENT_VIEW_DETAILS, label: 'Ver detalhes de um paciente' },
      { value: PERMISSIONS.PATIENT_CREATE, label: 'Criar novo paciente' },
      { value: PERMISSIONS.PATIENT_EDIT, label: 'Editar um paciente existente' },
      { value: PERMISSIONS.PATIENT_DELETE, label: 'Excluir um paciente' },
      { value: PERMISSIONS.PATIENT_VIEW_SENSITIVE, label: 'Ver dados sensíveis (ex: CPF)' },
    ],
  },
  appointments: {
    label: 'Agenda',
    permissions: [
      { value: PERMISSIONS.APPOINTMENT_VIEW_LIST, label: 'Ver a agenda' },
      { value: PERMISSIONS.APPOINTMENT_VIEW_OTHERS, label: 'Ver agenda de outros profissionais' },
      { value: PERMISSIONS.APPOINTMENT_CREATE, label: 'Criar novo agendamento' },
      { value: PERMISSIONS.APPOINTMENT_EDIT, label: 'Editar/Remarcar agendamento' },
      { value: PERMISSIONS.APPOINTMENT_DELETE, label: 'Cancelar/Excluir agendamento' },
    ],
  },
  logbook: {
    label: 'Logbook',
    permissions: [
      { value: PERMISSIONS.LOGBOOK_VIEW, label: 'Ver o livro de ocorrências' },
      { value: PERMISSIONS.LOGBOOK_CREATE, label: 'Criar uma nova entrada' },
      { value: PERMISSIONS.LOGBOOK_EDIT_OWN, label: 'Editar as próprias entradas' },
      { value: PERMISSIONS.LOGBOOK_EDIT_ALL, label: 'Editar entradas de qualquer pessoa' },
      { value: PERMISSIONS.LOGBOOK_DELETE, label: 'Excluir entradas' },
    ],
  },
  guests: {
    label: 'Visitantes',
    permissions: [
      { value: PERMISSIONS.GUEST_VIEW_LIST, label: 'Ver a lista de visitantes' },
      { value: PERMISSIONS.GUEST_CREATE, label: 'Registrar novo visitante' },
      { value: PERMISSIONS.GUEST_EDIT, label: 'Editar visitante' },
      { value: PERMISSIONS.GUEST_DELETE, label: 'Remover registro de visitante' },
    ],
  },
  staff: {
    label: 'Staff',
    permissions: [
      { value: PERMISSIONS.STAFF_VIEW_LIST, label: 'Ver a lista de staff' },
      { value: PERMISSIONS.STAFF_CREATE, label: 'Convidar/Criar novo staff' },
      { value: PERMISSIONS.STAFF_EDIT_DETAILS, label: 'Editar perfil de um staff' },
      { value: PERMISSIONS.STAFF_EDIT_ROLES, label: 'Atribuir/Remover papéis de um staff' },
      { value: PERMISSIONS.STAFF_DEACTIVATE, label: 'Desativar/Ativar conta de um staff' },
    ],
  },
  admin: {
    label: 'Admin',
    permissions: [
      { value: PERMISSIONS.ADMIN_ACCESS_PANEL, label: 'Acesso geral ao painel de admin' },
      { value: PERMISSIONS.RBAC_VIEW_ROLES, label: 'Ver a lista de papéis (roles)' },
      { value: PERMISSIONS.RBAC_CREATE_ROLE, label: 'Criar um novo papel' },
      { value: PERMISSIONS.RBAC_EDIT_ROLE, label: 'Editar nome e permissões de um papel' },
      { value: PERMISSIONS.RBAC_DELETE_ROLE, label: 'Excluir um papel' },
      { value: PERMISSIONS.INSTITUTION_EDIT_SETTINGS, label: 'Editar configurações da instituição' },
    ],
  },
} as const;
