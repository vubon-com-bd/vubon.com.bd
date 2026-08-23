/**
 * Marketing Permission Constants
 * Permission definitions for marketing modules and features
 */

export const MARKETINGPERMISSION = {
  // Permission Modules
  MODULES: {
    CAMPAIGNS: 'campaigns',
    PROMOTIONS: 'promotions',
    AFFILIATES: 'affiliates',
    REFERRALS: 'referrals',
    LOYALTY: 'loyalty',
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL: 'social',
    LEAD_GENERATION: 'lead_generation',
    ANALYTICS: 'analytics',
    REPORTS: 'reports',
    AUTOMATION: 'automation',
    CONTENT: 'content',
    SEO: 'seo',
    INFLUENCERS: 'influencers',
    PARTNERS: 'partners',
    SURVEYS: 'surveys',
    FEEDBACK: 'feedback',
    REVIEWS: 'reviews',
    SETTINGS: 'settings',
    TEMPLATES: 'templates',
    INTEGRATIONS: 'integrations',
    PERMISSIONS: 'permissions',
    ROLES: 'roles',
    USERS: 'users',
    AUDIT: 'audit',
  } as const,

  // Permission Actions
  ACTIONS: {
    VIEW: 'view',
    CREATE: 'create',
    EDIT: 'edit',
    UPDATE: 'update',
    DELETE: 'delete',
    APPROVE: 'approve',
    REJECT: 'reject',
    PUBLISH: 'publish',
    UNPUBLISH: 'unpublish',
    ARCHIVE: 'archive',
    RESTORE: 'restore',
    EXPORT: 'export',
    IMPORT: 'import',
    SHARE: 'share',
    ASSIGN: 'assign',
    REVOKE: 'revoke',
    MANAGE: 'manage',
    CONFIGURE: 'configure',
    EXECUTE: 'execute',
    SCHEDULE: 'schedule',
    CANCEL: 'cancel',
    PAUSE: 'pause',
    RESUME: 'resume',
    DUPLICATE: 'duplicate',
    MOVE: 'move',
    COPY: 'copy',
    SYNC: 'sync',
    BACKUP: 'backup',
    RESTORE_BACKUP: 'restore_backup',
    SEND: 'send',
  } as const,

  // Permission Levels
  LEVELS: {
    NONE: 'none',
    READ: 'read',
    WRITE: 'write',
    ADMIN: 'admin',
    OWNER: 'owner',
    MANAGER: 'manager',
    USER: 'user',
    GUEST: 'guest',
    CUSTOM: 'custom',
  } as const,

  // Permission Scopes
  SCOPES: {
    GLOBAL: 'global',
    ORGANIZATION: 'organization',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
    ALL: 'all',
    OWN: 'own',
  } as const,

  // Permission Groups
  GROUPS: {
    // Marketing Operations
    MARKETING_MANAGER: 'marketing_manager',
    MARKETING_SPECIALIST: 'marketing_specialist',
    MARKETING_ANALYST: 'marketing_analyst',
    MARKETING_COORDINATOR: 'marketing_coordinator',

    // Campaign Management
    CAMPAIGN_MANAGER: 'campaign_manager',
    CAMPAIGN_SPECIALIST: 'campaign_specialist',

    // Content Management
    CONTENT_MANAGER: 'content_manager',
    CONTENT_CREATOR: 'content_creator',
    CONTENT_EDITOR: 'content_editor',

    // Social Media
    SOCIAL_MEDIA_MANAGER: 'social_media_manager',
    SOCIAL_MEDIA_SPECIALIST: 'social_media_specialist',

    // Email Marketing
    EMAIL_MARKETING_MANAGER: 'email_marketing_manager',
    EMAIL_MARKETING_SPECIALIST: 'email_marketing_specialist',

    // Analytics
    ANALYTICS_MANAGER: 'analytics_manager',
    ANALYTICS_SPECIALIST: 'analytics_specialist',

    // Automation
    AUTOMATION_MANAGER: 'automation_manager',
    AUTOMATION_SPECIALIST: 'automation_specialist',

    // Executive
    MARKETING_DIRECTOR: 'marketing_director',
    VP_MARKETING: 'vp_marketing',
    CMO: 'cmo',
  } as const,

  // Default Permissions
  DEFAULTS: {
    DEFAULT_MODULE: 'campaigns',
    DEFAULT_ACTION: 'view',
    DEFAULT_LEVEL: 'read',
    DEFAULT_SCOPE: 'organization',
    DEFAULT_GROUP: 'marketing_specialist',
    MAX_PERMISSIONS_PER_USER: 100,
    MAX_ROLES_PER_USER: 10,
    MAX_USERS_PER_ROLE: 100,
    DEFAULT_CACHE_TTL: 300, // seconds
  } as const,

  // Permission Limits
  LIMITS: {
    MIN_PERMISSION_NAME_LENGTH: 3,
    MAX_PERMISSION_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_PERMISSIONS_PER_ROLE: 100,
    MAX_ROLES_PER_MODULE: 50,
    MAX_USERS_PER_PERMISSION: 1000,
    MAX_PERMISSION_HISTORY: 100,
    DEFAULT_PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 500,
  } as const,
} as const;

// Permission Modules
export type MarketingPermissionModule =
  (typeof MARKETINGPERMISSION.MODULES)[keyof typeof MARKETINGPERMISSION.MODULES];

// Permission Actions
export type MarketingPermissionAction =
  (typeof MARKETINGPERMISSION.ACTIONS)[keyof typeof MARKETINGPERMISSION.ACTIONS];

// Permission Levels
export type MarketingPermissionLevel =
  (typeof MARKETINGPERMISSION.LEVELS)[keyof typeof MARKETINGPERMISSION.LEVELS];

// Permission Scopes
export type MarketingPermissionScope =
  (typeof MARKETINGPERMISSION.SCOPES)[keyof typeof MARKETINGPERMISSION.SCOPES];

// Permission Groups
export type MarketingPermissionGroup =
  (typeof MARKETINGPERMISSION.GROUPS)[keyof typeof MARKETINGPERMISSION.GROUPS];

// Permission Defaults
export type MarketingPermissionDefault =
  (typeof MARKETINGPERMISSION.DEFAULTS)[keyof typeof MARKETINGPERMISSION.DEFAULTS];

// Permission Limits
export type MarketingPermissionLimit =
  (typeof MARKETINGPERMISSION.LIMITS)[keyof typeof MARKETINGPERMISSION.LIMITS];

// Utility Functions
export function marketingpermissionGetModuleLabel(module: MarketingPermissionModule): string {
  const labels: Record<MarketingPermissionModule, string> = {
    [MARKETINGPERMISSION.MODULES.CAMPAIGNS]: 'Campaigns',
    [MARKETINGPERMISSION.MODULES.PROMOTIONS]: 'Promotions',
    [MARKETINGPERMISSION.MODULES.AFFILIATES]: 'Affiliates',
    [MARKETINGPERMISSION.MODULES.REFERRALS]: 'Referrals',
    [MARKETINGPERMISSION.MODULES.LOYALTY]: 'Loyalty',
    [MARKETINGPERMISSION.MODULES.EMAIL]: 'Email Marketing',
    [MARKETINGPERMISSION.MODULES.SMS]: 'SMS Marketing',
    [MARKETINGPERMISSION.MODULES.SOCIAL]: 'Social Media',
    [MARKETINGPERMISSION.MODULES.LEAD_GENERATION]: 'Lead Generation',
    [MARKETINGPERMISSION.MODULES.ANALYTICS]: 'Analytics',
    [MARKETINGPERMISSION.MODULES.REPORTS]: 'Reports',
    [MARKETINGPERMISSION.MODULES.AUTOMATION]: 'Automation',
    [MARKETINGPERMISSION.MODULES.CONTENT]: 'Content',
    [MARKETINGPERMISSION.MODULES.SEO]: 'SEO',
    [MARKETINGPERMISSION.MODULES.INFLUENCERS]: 'Influencers',
    [MARKETINGPERMISSION.MODULES.PARTNERS]: 'Partners',
    [MARKETINGPERMISSION.MODULES.SURVEYS]: 'Surveys',
    [MARKETINGPERMISSION.MODULES.FEEDBACK]: 'Feedback',
    [MARKETINGPERMISSION.MODULES.REVIEWS]: 'Reviews',
    [MARKETINGPERMISSION.MODULES.SETTINGS]: 'Settings',
    [MARKETINGPERMISSION.MODULES.TEMPLATES]: 'Templates',
    [MARKETINGPERMISSION.MODULES.INTEGRATIONS]: 'Integrations',
    [MARKETINGPERMISSION.MODULES.PERMISSIONS]: 'Permissions',
    [MARKETINGPERMISSION.MODULES.ROLES]: 'Roles',
    [MARKETINGPERMISSION.MODULES.USERS]: 'Users',
    [MARKETINGPERMISSION.MODULES.AUDIT]: 'Audit',
  };
  return labels[module] || 'Unknown Module';
}

export function marketingpermissionGetActionLabel(action: MarketingPermissionAction): string {
  const labels: Record<MarketingPermissionAction, string> = {
    [MARKETINGPERMISSION.ACTIONS.VIEW]: 'View',
    [MARKETINGPERMISSION.ACTIONS.CREATE]: 'Create',
    [MARKETINGPERMISSION.ACTIONS.EDIT]: 'Edit',
    [MARKETINGPERMISSION.ACTIONS.UPDATE]: 'Update',
    [MARKETINGPERMISSION.ACTIONS.DELETE]: 'Delete',
    [MARKETINGPERMISSION.ACTIONS.APPROVE]: 'Approve',
    [MARKETINGPERMISSION.ACTIONS.REJECT]: 'Reject',
    [MARKETINGPERMISSION.ACTIONS.PUBLISH]: 'Publish',
    [MARKETINGPERMISSION.ACTIONS.UNPUBLISH]: 'Unpublish',
    [MARKETINGPERMISSION.ACTIONS.ARCHIVE]: 'Archive',
    [MARKETINGPERMISSION.ACTIONS.RESTORE]: 'Restore',
    [MARKETINGPERMISSION.ACTIONS.EXPORT]: 'Export',
    [MARKETINGPERMISSION.ACTIONS.IMPORT]: 'Import',
    [MARKETINGPERMISSION.ACTIONS.SHARE]: 'Share',
    [MARKETINGPERMISSION.ACTIONS.ASSIGN]: 'Assign',
    [MARKETINGPERMISSION.ACTIONS.REVOKE]: 'Revoke',
    [MARKETINGPERMISSION.ACTIONS.MANAGE]: 'Manage',
    [MARKETINGPERMISSION.ACTIONS.CONFIGURE]: 'Configure',
    [MARKETINGPERMISSION.ACTIONS.EXECUTE]: 'Execute',
    [MARKETINGPERMISSION.ACTIONS.SCHEDULE]: 'Schedule',
    [MARKETINGPERMISSION.ACTIONS.CANCEL]: 'Cancel',
    [MARKETINGPERMISSION.ACTIONS.PAUSE]: 'Pause',
    [MARKETINGPERMISSION.ACTIONS.RESUME]: 'Resume',
    [MARKETINGPERMISSION.ACTIONS.DUPLICATE]: 'Duplicate',
    [MARKETINGPERMISSION.ACTIONS.MOVE]: 'Move',
    [MARKETINGPERMISSION.ACTIONS.COPY]: 'Copy',
    [MARKETINGPERMISSION.ACTIONS.SYNC]: 'Sync',
    [MARKETINGPERMISSION.ACTIONS.BACKUP]: 'Backup',
    [MARKETINGPERMISSION.ACTIONS.RESTORE_BACKUP]: 'Restore Backup',
    [MARKETINGPERMISSION.ACTIONS.SEND]: 'Send',
  };
  return labels[action] || 'Unknown Action';
}

export function marketingpermissionGetLevelLabel(level: MarketingPermissionLevel): string {
  const labels: Record<MarketingPermissionLevel, string> = {
    [MARKETINGPERMISSION.LEVELS.NONE]: 'None',
    [MARKETINGPERMISSION.LEVELS.READ]: 'Read',
    [MARKETINGPERMISSION.LEVELS.WRITE]: 'Write',
    [MARKETINGPERMISSION.LEVELS.ADMIN]: 'Admin',
    [MARKETINGPERMISSION.LEVELS.OWNER]: 'Owner',
    [MARKETINGPERMISSION.LEVELS.MANAGER]: 'Manager',
    [MARKETINGPERMISSION.LEVELS.USER]: 'User',
    [MARKETINGPERMISSION.LEVELS.GUEST]: 'Guest',
    [MARKETINGPERMISSION.LEVELS.CUSTOM]: 'Custom',
  };
  return labels[level] || 'Unknown Level';
}

export function marketingpermissionGetScopeLabel(scope: MarketingPermissionScope): string {
  const labels: Record<MarketingPermissionScope, string> = {
    [MARKETINGPERMISSION.SCOPES.GLOBAL]: 'Global',
    [MARKETINGPERMISSION.SCOPES.ORGANIZATION]: 'Organization',
    [MARKETINGPERMISSION.SCOPES.DEPARTMENT]: 'Department',
    [MARKETINGPERMISSION.SCOPES.TEAM]: 'Team',
    [MARKETINGPERMISSION.SCOPES.INDIVIDUAL]: 'Individual',
    [MARKETINGPERMISSION.SCOPES.ALL]: 'All',
    [MARKETINGPERMISSION.SCOPES.OWN]: 'Own',
  };
  return labels[scope] || 'Unknown Scope';
}

export function marketingpermissionGetGroupLabel(group: MarketingPermissionGroup): string {
  const labels: Record<MarketingPermissionGroup, string> = {
    // Marketing Operations
    [MARKETINGPERMISSION.GROUPS.MARKETING_MANAGER]: 'Marketing Manager',
    [MARKETINGPERMISSION.GROUPS.MARKETING_SPECIALIST]: 'Marketing Specialist',
    [MARKETINGPERMISSION.GROUPS.MARKETING_ANALYST]: 'Marketing Analyst',
    [MARKETINGPERMISSION.GROUPS.MARKETING_COORDINATOR]: 'Marketing Coordinator',

    // Campaign Management
    [MARKETINGPERMISSION.GROUPS.CAMPAIGN_MANAGER]: 'Campaign Manager',
    [MARKETINGPERMISSION.GROUPS.CAMPAIGN_SPECIALIST]: 'Campaign Specialist',

    // Content Management
    [MARKETINGPERMISSION.GROUPS.CONTENT_MANAGER]: 'Content Manager',
    [MARKETINGPERMISSION.GROUPS.CONTENT_CREATOR]: 'Content Creator',
    [MARKETINGPERMISSION.GROUPS.CONTENT_EDITOR]: 'Content Editor',

    // Social Media
    [MARKETINGPERMISSION.GROUPS.SOCIAL_MEDIA_MANAGER]: 'Social Media Manager',
    [MARKETINGPERMISSION.GROUPS.SOCIAL_MEDIA_SPECIALIST]: 'Social Media Specialist',

    // Email Marketing
    [MARKETINGPERMISSION.GROUPS.EMAIL_MARKETING_MANAGER]: 'Email Marketing Manager',
    [MARKETINGPERMISSION.GROUPS.EMAIL_MARKETING_SPECIALIST]: 'Email Marketing Specialist',

    // Analytics
    [MARKETINGPERMISSION.GROUPS.ANALYTICS_MANAGER]: 'Analytics Manager',
    [MARKETINGPERMISSION.GROUPS.ANALYTICS_SPECIALIST]: 'Analytics Specialist',

    // Automation
    [MARKETINGPERMISSION.GROUPS.AUTOMATION_MANAGER]: 'Automation Manager',
    [MARKETINGPERMISSION.GROUPS.AUTOMATION_SPECIALIST]: 'Automation Specialist',

    // Executive
    [MARKETINGPERMISSION.GROUPS.MARKETING_DIRECTOR]: 'Marketing Director',
    [MARKETINGPERMISSION.GROUPS.VP_MARKETING]: 'VP of Marketing',
    [MARKETINGPERMISSION.GROUPS.CMO]: 'Chief Marketing Officer',
  };
  return labels[group] || 'Unknown Group';
}

export function marketingpermissionHasAccess(
  module: MarketingPermissionModule,
  action: MarketingPermissionAction,
  permissions: string[]
): boolean {
  const required = `${module}:${action}`;
  return permissions.includes(required);
}

export function marketingpermissionIsAdminLevel(level: MarketingPermissionLevel): boolean {
  const adminLevels: MarketingPermissionLevel[] = [
    MARKETINGPERMISSION.LEVELS.ADMIN,
    MARKETINGPERMISSION.LEVELS.OWNER,
    MARKETINGPERMISSION.LEVELS.MANAGER,
  ];
  return adminLevels.includes(level);
}

export function marketingpermissionIsWriteLevel(level: MarketingPermissionLevel): boolean {
  return level === MARKETINGPERMISSION.LEVELS.WRITE || marketingpermissionIsAdminLevel(level);
}

export function marketingpermissionIsReadLevel(level: MarketingPermissionLevel): boolean {
  return level === MARKETINGPERMISSION.LEVELS.READ || marketingpermissionIsWriteLevel(level);
}

export function marketingpermissionGetDefaultLevel(): MarketingPermissionLevel {
  return MARKETINGPERMISSION.DEFAULTS.DEFAULT_LEVEL;
}

export function marketingpermissionGetDefaultScope(): MarketingPermissionScope {
  return MARKETINGPERMISSION.DEFAULTS.DEFAULT_SCOPE;
}

export function marketingpermissionGetDefaultGroup(): MarketingPermissionGroup {
  return MARKETINGPERMISSION.DEFAULTS.DEFAULT_GROUP;
}

export function marketingpermissionGetModuleActions(
  module: MarketingPermissionModule
): MarketingPermissionAction[] {
  // Define which actions are available for each module
  const moduleActions: Partial<Record<MarketingPermissionModule, MarketingPermissionAction[]>> = {
    [MARKETINGPERMISSION.MODULES.CAMPAIGNS]: [
      MARKETINGPERMISSION.ACTIONS.VIEW,
      MARKETINGPERMISSION.ACTIONS.CREATE,
      MARKETINGPERMISSION.ACTIONS.EDIT,
      MARKETINGPERMISSION.ACTIONS.DELETE,
      MARKETINGPERMISSION.ACTIONS.APPROVE,
      MARKETINGPERMISSION.ACTIONS.REJECT,
      MARKETINGPERMISSION.ACTIONS.PUBLISH,
      MARKETINGPERMISSION.ACTIONS.ARCHIVE,
      MARKETINGPERMISSION.ACTIONS.DUPLICATE,
      MARKETINGPERMISSION.ACTIONS.EXPORT,
    ],
    [MARKETINGPERMISSION.MODULES.PROMOTIONS]: [
      MARKETINGPERMISSION.ACTIONS.VIEW,
      MARKETINGPERMISSION.ACTIONS.CREATE,
      MARKETINGPERMISSION.ACTIONS.EDIT,
      MARKETINGPERMISSION.ACTIONS.DELETE,
      MARKETINGPERMISSION.ACTIONS.APPROVE,
      MARKETINGPERMISSION.ACTIONS.REJECT,
      MARKETINGPERMISSION.ACTIONS.PUBLISH,
      MARKETINGPERMISSION.ACTIONS.ARCHIVE,
    ],
    [MARKETINGPERMISSION.MODULES.EMAIL]: [
      MARKETINGPERMISSION.ACTIONS.VIEW,
      MARKETINGPERMISSION.ACTIONS.CREATE,
      MARKETINGPERMISSION.ACTIONS.EDIT,
      MARKETINGPERMISSION.ACTIONS.DELETE,
      MARKETINGPERMISSION.ACTIONS.SEND,
      MARKETINGPERMISSION.ACTIONS.SCHEDULE,
      MARKETINGPERMISSION.ACTIONS.CANCEL,
      MARKETINGPERMISSION.ACTIONS.PAUSE,
      MARKETINGPERMISSION.ACTIONS.RESUME,
      MARKETINGPERMISSION.ACTIONS.EXPORT,
    ],
    [MARKETINGPERMISSION.MODULES.SMS]: [
      MARKETINGPERMISSION.ACTIONS.VIEW,
      MARKETINGPERMISSION.ACTIONS.CREATE,
      MARKETINGPERMISSION.ACTIONS.EDIT,
      MARKETINGPERMISSION.ACTIONS.DELETE,
      MARKETINGPERMISSION.ACTIONS.SEND,
      MARKETINGPERMISSION.ACTIONS.SCHEDULE,
      MARKETINGPERMISSION.ACTIONS.CANCEL,
      MARKETINGPERMISSION.ACTIONS.PAUSE,
      MARKETINGPERMISSION.ACTIONS.RESUME,
      MARKETINGPERMISSION.ACTIONS.EXPORT,
    ],
    [MARKETINGPERMISSION.MODULES.SOCIAL]: [
      MARKETINGPERMISSION.ACTIONS.VIEW,
      MARKETINGPERMISSION.ACTIONS.CREATE,
      MARKETINGPERMISSION.ACTIONS.EDIT,
      MARKETINGPERMISSION.ACTIONS.DELETE,
      MARKETINGPERMISSION.ACTIONS.PUBLISH,
      MARKETINGPERMISSION.ACTIONS.SCHEDULE,
      MARKETINGPERMISSION.ACTIONS.CANCEL,
      MARKETINGPERMISSION.ACTIONS.PAUSE,
      MARKETINGPERMISSION.ACTIONS.RESUME,
      MARKETINGPERMISSION.ACTIONS.SHARE,
    ],
    [MARKETINGPERMISSION.MODULES.ANALYTICS]: [
      MARKETINGPERMISSION.ACTIONS.VIEW,
      MARKETINGPERMISSION.ACTIONS.EXPORT,
      MARKETINGPERMISSION.ACTIONS.SHARE,
      MARKETINGPERMISSION.ACTIONS.CONFIGURE,
    ],
    [MARKETINGPERMISSION.MODULES.REPORTS]: [
      MARKETINGPERMISSION.ACTIONS.VIEW,
      MARKETINGPERMISSION.ACTIONS.CREATE,
      MARKETINGPERMISSION.ACTIONS.EDIT,
      MARKETINGPERMISSION.ACTIONS.DELETE,
      MARKETINGPERMISSION.ACTIONS.EXPORT,
      MARKETINGPERMISSION.ACTIONS.SHARE,
      MARKETINGPERMISSION.ACTIONS.SCHEDULE,
    ],
    [MARKETINGPERMISSION.MODULES.SETTINGS]: [
      MARKETINGPERMISSION.ACTIONS.VIEW,
      MARKETINGPERMISSION.ACTIONS.EDIT,
      MARKETINGPERMISSION.ACTIONS.CONFIGURE,
      MARKETINGPERMISSION.ACTIONS.BACKUP,
      MARKETINGPERMISSION.ACTIONS.RESTORE_BACKUP,
    ],
  };

  return moduleActions[module] || [MARKETINGPERMISSION.ACTIONS.VIEW];
}
