/**
 * Support Permission Constants
 * Permission definitions for support system
 */

export const SUPPORT_PERMISSION = {
  // Permission Modules
  MODULES: {
    TICKET: 'ticket',
    CONVERSATION: 'conversation',
    MESSAGE: 'message',
    ATTACHMENT: 'attachment',
    FAQ: 'faq',
    KNOWLEDGE_BASE: 'knowledge_base',
    FEEDBACK: 'feedback',
    COMPLAINT: 'complaint',
    SURVEY: 'survey',
    LIVE_CHAT: 'live_chat',
    CHATBOT: 'chatbot',
    TEAM: 'team',
    REPORT: 'report',
    SCHEDULE: 'schedule',
    RULE: 'rule',
    AUTOMATION: 'automation',
    SLA: 'sla',
    AGENT: 'agent',
    TEMPLATE: 'template',
    SCRIPT: 'script',
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    SETTINGS: 'settings',
    ANALYTICS: 'analytics',
    PERMISSION: 'permission',
  } as const,

  // Permission Actions
  ACTIONS: {
    VIEW: 'view',
    CREATE: 'create',
    EDIT: 'edit',
    UPDATE: 'update',
    DELETE: 'delete',
    ASSIGN: 'assign',
    REASSIGN: 'reassign',
    ESCALATE: 'escalate',
    RESOLVE: 'resolve',
    CLOSE: 'close',
    REOPEN: 'reopen',
    MERGE: 'merge',
    SPLIT: 'split',
    TRANSFER: 'transfer',
    REPLY: 'reply',
    ADD_COMMENT: 'add_comment',
    ADD_INTERNAL_NOTE: 'add_internal_note',
    ADD_TAG: 'add_tag',
    REMOVE_TAG: 'remove_tag',
    CHANGE_STATUS: 'change_status',
    CHANGE_PRIORITY: 'change_priority',
    CHANGE_CATEGORY: 'change_category',
    MANAGE: 'manage',
    ADMIN: 'admin',
    EXPORT: 'export',
    IMPORT: 'import',
    PUBLISH: 'publish',
    ARCHIVE: 'archive',
    REVIEW: 'review',
    APPROVE: 'approve',
    REJECT: 'reject',
  } as const,

  // Permission Roles
  ROLES: {
    AGENT: 'agent',
    SENIOR_AGENT: 'senior_agent',
    TEAM_LEAD: 'team_lead',
    SUPERVISOR: 'supervisor',
    MANAGER: 'manager',
    DIRECTOR: 'director',
    ADMIN: 'admin',
  } as const,

  // Permission Levels
  LEVELS: {
    NONE: 0,
    READ: 1,
    WRITE: 2,
    MODIFY: 3,
    DELETE: 4,
    ADMIN: 5,
  } as const,

  // Permission Scopes
  SCOPES: {
    GLOBAL: 'global',
    DEPARTMENT: 'department',
    TEAM: 'team',
    OWN: 'own',
  } as const,

  // Default Permissions
  DEFAULTS: {
    AGENT: {
      ticket: [
        'view',
        'create',
        'edit',
        'reply',
        'add_comment',
        'add_internal_note',
        'add_tag',
        'remove_tag',
      ],
      conversation: ['view', 'create', 'reply'],
      message: ['view', 'create', 'reply'],
      attachment: ['view', 'create', 'delete'],
      faq: ['view'],
      knowledge_base: ['view'],
      feedback: ['view', 'create'],
      complaint: ['view', 'create'],
      survey: ['view', 'create'],
      live_chat: ['view', 'create', 'reply'],
    },
    SENIOR_AGENT: {
      ticket: [
        'view',
        'create',
        'edit',
        'update',
        'reply',
        'add_comment',
        'add_internal_note',
        'add_tag',
        'remove_tag',
        'assign',
        'reassign',
        'change_status',
        'change_priority',
        'change_category',
      ],
      conversation: ['view', 'create', 'reply'],
      message: ['view', 'create', 'reply'],
      attachment: ['view', 'create', 'delete'],
      faq: ['view', 'create', 'edit'],
      knowledge_base: ['view', 'create', 'edit'],
      feedback: ['view', 'create', 'edit'],
      complaint: ['view', 'create', 'edit'],
      survey: ['view', 'create', 'edit'],
      live_chat: ['view', 'create', 'reply', 'transfer'],
    },
    TEAM_LEAD: {
      ticket: [
        'view',
        'create',
        'edit',
        'update',
        'delete',
        'reply',
        'add_comment',
        'add_internal_note',
        'add_tag',
        'remove_tag',
        'assign',
        'reassign',
        'escalate',
        'resolve',
        'close',
        'reopen',
        'merge',
        'split',
        'transfer',
        'change_status',
        'change_priority',
        'change_category',
        'review',
        'approve',
        'reject',
      ],
      conversation: ['view', 'create', 'reply', 'transfer'],
      message: ['view', 'create', 'reply', 'delete'],
      attachment: ['view', 'create', 'delete'],
      faq: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      knowledge_base: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      feedback: ['view', 'create', 'edit', 'delete', 'review'],
      complaint: ['view', 'create', 'edit', 'delete', 'review'],
      survey: ['view', 'create', 'edit', 'delete', 'publish'],
      live_chat: ['view', 'create', 'reply', 'transfer', 'escalate'],
      team: ['view', 'manage'],
      report: ['view', 'export'],
      agent: ['view'],
    },
    SUPERVISOR: {
      ticket: [
        'view',
        'create',
        'edit',
        'update',
        'delete',
        'reply',
        'add_comment',
        'add_internal_note',
        'add_tag',
        'remove_tag',
        'assign',
        'reassign',
        'escalate',
        'resolve',
        'close',
        'reopen',
        'merge',
        'split',
        'transfer',
        'change_status',
        'change_priority',
        'change_category',
        'review',
        'approve',
        'reject',
      ],
      conversation: ['view', 'create', 'reply', 'transfer'],
      message: ['view', 'create', 'reply', 'delete'],
      attachment: ['view', 'create', 'delete'],
      faq: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      knowledge_base: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      feedback: ['view', 'create', 'edit', 'delete', 'review'],
      complaint: ['view', 'create', 'edit', 'delete', 'review'],
      survey: ['view', 'create', 'edit', 'delete', 'publish'],
      live_chat: ['view', 'create', 'reply', 'transfer', 'escalate'],
      team: ['view', 'manage', 'admin'],
      report: ['view', 'export', 'create'],
      schedule: ['view', 'manage'],
      rule: ['view', 'create', 'edit', 'delete'],
      automation: ['view', 'create', 'edit', 'delete'],
      sla: ['view', 'manage'],
      agent: ['view', 'manage'],
      template: ['view', 'create', 'edit', 'delete'],
      script: ['view', 'create', 'edit', 'delete'],
      email: ['view', 'create', 'edit', 'delete'],
      sms: ['view', 'create', 'edit', 'delete'],
      push: ['view', 'create', 'edit', 'delete'],
    },
    MANAGER: {
      ticket: [
        'view',
        'create',
        'edit',
        'update',
        'delete',
        'reply',
        'add_comment',
        'add_internal_note',
        'add_tag',
        'remove_tag',
        'assign',
        'reassign',
        'escalate',
        'resolve',
        'close',
        'reopen',
        'merge',
        'split',
        'transfer',
        'change_status',
        'change_priority',
        'change_category',
        'review',
        'approve',
        'reject',
      ],
      conversation: ['view', 'create', 'reply', 'transfer'],
      message: ['view', 'create', 'reply', 'delete'],
      attachment: ['view', 'create', 'delete'],
      faq: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      knowledge_base: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      feedback: ['view', 'create', 'edit', 'delete', 'review'],
      complaint: ['view', 'create', 'edit', 'delete', 'review'],
      survey: ['view', 'create', 'edit', 'delete', 'publish'],
      live_chat: ['view', 'create', 'reply', 'transfer', 'escalate'],
      team: ['view', 'manage', 'admin'],
      report: ['view', 'export', 'create', 'delete'],
      schedule: ['view', 'manage', 'admin'],
      rule: ['view', 'create', 'edit', 'delete'],
      automation: ['view', 'create', 'edit', 'delete'],
      sla: ['view', 'manage', 'admin'],
      agent: ['view', 'manage', 'admin'],
      template: ['view', 'create', 'edit', 'delete'],
      script: ['view', 'create', 'edit', 'delete'],
      email: ['view', 'create', 'edit', 'delete'],
      sms: ['view', 'create', 'edit', 'delete'],
      push: ['view', 'create', 'edit', 'delete'],
      settings: ['view', 'manage'],
      analytics: ['view', 'export'],
      permission: ['view'],
    },
    DIRECTOR: {
      ticket: [
        'view',
        'create',
        'edit',
        'update',
        'delete',
        'reply',
        'add_comment',
        'add_internal_note',
        'add_tag',
        'remove_tag',
        'assign',
        'reassign',
        'escalate',
        'resolve',
        'close',
        'reopen',
        'merge',
        'split',
        'transfer',
        'change_status',
        'change_priority',
        'change_category',
        'review',
        'approve',
        'reject',
      ],
      conversation: ['view', 'create', 'reply', 'transfer'],
      message: ['view', 'create', 'reply', 'delete'],
      attachment: ['view', 'create', 'delete'],
      faq: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      knowledge_base: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      feedback: ['view', 'create', 'edit', 'delete', 'review'],
      complaint: ['view', 'create', 'edit', 'delete', 'review'],
      survey: ['view', 'create', 'edit', 'delete', 'publish'],
      live_chat: ['view', 'create', 'reply', 'transfer', 'escalate'],
      team: ['view', 'manage', 'admin'],
      report: ['view', 'export', 'create', 'delete'],
      schedule: ['view', 'manage', 'admin'],
      rule: ['view', 'create', 'edit', 'delete'],
      automation: ['view', 'create', 'edit', 'delete'],
      sla: ['view', 'manage', 'admin'],
      agent: ['view', 'manage', 'admin'],
      template: ['view', 'create', 'edit', 'delete'],
      script: ['view', 'create', 'edit', 'delete'],
      email: ['view', 'create', 'edit', 'delete'],
      sms: ['view', 'create', 'edit', 'delete'],
      push: ['view', 'create', 'edit', 'delete'],
      settings: ['view', 'manage', 'admin'],
      analytics: ['view', 'export', 'manage'],
      permission: ['view', 'manage'],
    },
    ADMIN: {
      ticket: [
        'view',
        'create',
        'edit',
        'update',
        'delete',
        'reply',
        'add_comment',
        'add_internal_note',
        'add_tag',
        'remove_tag',
        'assign',
        'reassign',
        'escalate',
        'resolve',
        'close',
        'reopen',
        'merge',
        'split',
        'transfer',
        'change_status',
        'change_priority',
        'change_category',
        'review',
        'approve',
        'reject',
      ],
      conversation: ['view', 'create', 'reply', 'transfer'],
      message: ['view', 'create', 'reply', 'delete'],
      attachment: ['view', 'create', 'delete'],
      faq: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      knowledge_base: ['view', 'create', 'edit', 'delete', 'publish', 'archive'],
      feedback: ['view', 'create', 'edit', 'delete', 'review'],
      complaint: ['view', 'create', 'edit', 'delete', 'review'],
      survey: ['view', 'create', 'edit', 'delete', 'publish'],
      live_chat: ['view', 'create', 'reply', 'transfer', 'escalate'],
      team: ['view', 'manage', 'admin'],
      report: ['view', 'export', 'create', 'delete'],
      schedule: ['view', 'manage', 'admin'],
      rule: ['view', 'create', 'edit', 'delete'],
      automation: ['view', 'create', 'edit', 'delete'],
      sla: ['view', 'manage', 'admin'],
      agent: ['view', 'manage', 'admin'],
      template: ['view', 'create', 'edit', 'delete'],
      script: ['view', 'create', 'edit', 'delete'],
      email: ['view', 'create', 'edit', 'delete'],
      sms: ['view', 'create', 'edit', 'delete'],
      push: ['view', 'create', 'edit', 'delete'],
      settings: ['view', 'manage', 'admin'],
      analytics: ['view', 'export', 'manage'],
      permission: ['view', 'manage', 'admin'],
    },
  } as const,
} as const;

// Permission Modules
export type SupportPermissionModule =
  (typeof SUPPORT_PERMISSION.MODULES)[keyof typeof SUPPORT_PERMISSION.MODULES];

// Permission Actions
export type SupportPermissionAction =
  (typeof SUPPORT_PERMISSION.ACTIONS)[keyof typeof SUPPORT_PERMISSION.ACTIONS];

// Permission Roles
export type SupportPermissionRole =
  (typeof SUPPORT_PERMISSION.ROLES)[keyof typeof SUPPORT_PERMISSION.ROLES];

// Permission Levels
export type SupportPermissionLevel =
  (typeof SUPPORT_PERMISSION.LEVELS)[keyof typeof SUPPORT_PERMISSION.LEVELS];

// Permission Scopes
export type SupportPermissionScope =
  (typeof SUPPORT_PERMISSION.SCOPES)[keyof typeof SUPPORT_PERMISSION.SCOPES];

// Utility Functions
export function supportPermissionGetRoleLabel(role: SupportPermissionRole): string {
  const labels: Record<SupportPermissionRole, string> = {
    [SUPPORT_PERMISSION.ROLES.AGENT]: 'Agent',
    [SUPPORT_PERMISSION.ROLES.SENIOR_AGENT]: 'Senior Agent',
    [SUPPORT_PERMISSION.ROLES.TEAM_LEAD]: 'Team Lead',
    [SUPPORT_PERMISSION.ROLES.SUPERVISOR]: 'Supervisor',
    [SUPPORT_PERMISSION.ROLES.MANAGER]: 'Manager',
    [SUPPORT_PERMISSION.ROLES.DIRECTOR]: 'Director',
    [SUPPORT_PERMISSION.ROLES.ADMIN]: 'Admin',
  };
  return labels[role] || 'Unknown';
}

export function supportPermissionGetActionLabel(action: SupportPermissionAction): string {
  const labels: Record<SupportPermissionAction, string> = {
    [SUPPORT_PERMISSION.ACTIONS.VIEW]: 'View',
    [SUPPORT_PERMISSION.ACTIONS.CREATE]: 'Create',
    [SUPPORT_PERMISSION.ACTIONS.EDIT]: 'Edit',
    [SUPPORT_PERMISSION.ACTIONS.UPDATE]: 'Update',
    [SUPPORT_PERMISSION.ACTIONS.DELETE]: 'Delete',
    [SUPPORT_PERMISSION.ACTIONS.ASSIGN]: 'Assign',
    [SUPPORT_PERMISSION.ACTIONS.REASSIGN]: 'Reassign',
    [SUPPORT_PERMISSION.ACTIONS.ESCALATE]: 'Escalate',
    [SUPPORT_PERMISSION.ACTIONS.RESOLVE]: 'Resolve',
    [SUPPORT_PERMISSION.ACTIONS.CLOSE]: 'Close',
    [SUPPORT_PERMISSION.ACTIONS.REOPEN]: 'Reopen',
    [SUPPORT_PERMISSION.ACTIONS.MERGE]: 'Merge',
    [SUPPORT_PERMISSION.ACTIONS.SPLIT]: 'Split',
    [SUPPORT_PERMISSION.ACTIONS.TRANSFER]: 'Transfer',
    [SUPPORT_PERMISSION.ACTIONS.REPLY]: 'Reply',
    [SUPPORT_PERMISSION.ACTIONS.ADD_COMMENT]: 'Add Comment',
    [SUPPORT_PERMISSION.ACTIONS.ADD_INTERNAL_NOTE]: 'Add Internal Note',
    [SUPPORT_PERMISSION.ACTIONS.ADD_TAG]: 'Add Tag',
    [SUPPORT_PERMISSION.ACTIONS.REMOVE_TAG]: 'Remove Tag',
    [SUPPORT_PERMISSION.ACTIONS.CHANGE_STATUS]: 'Change Status',
    [SUPPORT_PERMISSION.ACTIONS.CHANGE_PRIORITY]: 'Change Priority',
    [SUPPORT_PERMISSION.ACTIONS.CHANGE_CATEGORY]: 'Change Category',
    [SUPPORT_PERMISSION.ACTIONS.MANAGE]: 'Manage',
    [SUPPORT_PERMISSION.ACTIONS.ADMIN]: 'Admin',
    [SUPPORT_PERMISSION.ACTIONS.EXPORT]: 'Export',
    [SUPPORT_PERMISSION.ACTIONS.IMPORT]: 'Import',
    [SUPPORT_PERMISSION.ACTIONS.PUBLISH]: 'Publish',
    [SUPPORT_PERMISSION.ACTIONS.ARCHIVE]: 'Archive',
    [SUPPORT_PERMISSION.ACTIONS.REVIEW]: 'Review',
    [SUPPORT_PERMISSION.ACTIONS.APPROVE]: 'Approve',
    [SUPPORT_PERMISSION.ACTIONS.REJECT]: 'Reject',
  };
  return labels[action] || 'Unknown';
}

export function supportPermissionGetLevelLabel(level: SupportPermissionLevel): string {
  const labels: Record<SupportPermissionLevel, string> = {
    [SUPPORT_PERMISSION.LEVELS.NONE]: 'None',
    [SUPPORT_PERMISSION.LEVELS.READ]: 'Read',
    [SUPPORT_PERMISSION.LEVELS.WRITE]: 'Write',
    [SUPPORT_PERMISSION.LEVELS.MODIFY]: 'Modify',
    [SUPPORT_PERMISSION.LEVELS.DELETE]: 'Delete',
    [SUPPORT_PERMISSION.LEVELS.ADMIN]: 'Admin',
  };
  return labels[level] || 'Unknown';
}

export function supportPermissionGetScopeLabel(scope: SupportPermissionScope): string {
  const labels: Record<SupportPermissionScope, string> = {
    [SUPPORT_PERMISSION.SCOPES.GLOBAL]: 'Global',
    [SUPPORT_PERMISSION.SCOPES.DEPARTMENT]: 'Department',
    [SUPPORT_PERMISSION.SCOPES.TEAM]: 'Team',
    [SUPPORT_PERMISSION.SCOPES.OWN]: 'Own',
  };
  return labels[scope] || 'Unknown';
}

export function supportPermissionHasPermission(
  role: SupportPermissionRole,
  module: SupportPermissionModule,
  action: string
): boolean {
  const roleKey = role as keyof typeof SUPPORT_PERMISSION.DEFAULTS;
  const permissions = SUPPORT_PERMISSION.DEFAULTS[roleKey];
  if (!permissions) return false;

  const moduleKey = module as keyof typeof permissions;
  const modulePermissions = permissions[moduleKey];
  if (!modulePermissions) return false;

  return (modulePermissions as readonly string[]).includes(action);
}

export function supportPermissionGetRolePermissions(
  role: SupportPermissionRole,
  module: SupportPermissionModule
): string[] {
  const roleKey = role as keyof typeof SUPPORT_PERMISSION.DEFAULTS;
  const permissions = SUPPORT_PERMISSION.DEFAULTS[roleKey];
  if (!permissions) return [];

  const moduleKey = module as keyof typeof permissions;
  const modulePermissions = permissions[moduleKey];
  if (!modulePermissions) return [];

  return [...modulePermissions];
}

export function supportPermissionGetAllRolePermissions(
  role: SupportPermissionRole
): Record<string, string[]> {
  const roleKey = role as keyof typeof SUPPORT_PERMISSION.DEFAULTS;
  const permissions = SUPPORT_PERMISSION.DEFAULTS[roleKey];
  if (!permissions) return {};

  const result: Record<string, string[]> = {};
  for (const key in permissions) {
    const moduleKey = key as keyof typeof permissions;
    result[key] = [...permissions[moduleKey]];
  }
  return result;
}
