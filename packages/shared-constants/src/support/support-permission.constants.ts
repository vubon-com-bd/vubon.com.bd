/**
 * সাপোর্ট সিস্টেমের পারমিশন সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সাপোর্ট পারমিশন
 */
export const SUPPORT_PERMISSION = {
  // টিকেট পারমিশন
  VIEW_TICKETS: 'view_tickets',
  CREATE_TICKET: 'create_ticket',
  UPDATE_TICKET: 'update_ticket',
  DELETE_TICKET: 'delete_ticket',
  ASSIGN_TICKET: 'assign_ticket',
  ESCALATE_TICKET: 'escalate_ticket',
  RESOLVE_TICKET: 'resolve_ticket',
  CLOSE_TICKET: 'close_ticket',
  REOPEN_TICKET: 'reopen_ticket',
  MERGE_TICKET: 'merge_ticket',
  SPLIT_TICKET: 'split_ticket',
  COMMENT_TICKET: 'comment_ticket',
  ATTACH_TICKET: 'attach_ticket',
  VIEW_TICKET_HISTORY: 'view_ticket_history',
  VIEW_TICKET_ANALYTICS: 'view_ticket_analytics',
  MANAGE_TICKET_PRIORITY: 'manage_ticket_priority',
  MANAGE_TICKET_STATUS: 'manage_ticket_status',
  MANAGE_TICKET_CATEGORY: 'manage_ticket_category',
  MANAGE_TICKET_TAGS: 'manage_ticket_tags',

  // এজেন্ট পারমিশন
  VIEW_AGENTS: 'view_agents',
  MANAGE_AGENTS: 'manage_agents',
  VIEW_AGENT_PERFORMANCE: 'view_agent_performance',
  MANAGE_AGENT_SCHEDULE: 'manage_agent_schedule',
  ASSIGN_AGENT: 'assign_agent',
  UNASSIGN_AGENT: 'unassign_agent',

  // টিম পারমিশন
  VIEW_TEAMS: 'view_teams',
  MANAGE_TEAMS: 'manage_teams',
  VIEW_TEAM_PERFORMANCE: 'view_team_performance',

  // SLA পারমিশন
  VIEW_SLA: 'view_sla',
  MANAGE_SLA: 'manage_sla',
  MANAGE_SLA_POLICIES: 'manage_sla_policies',

  // রুল পারমিশন
  VIEW_RULES: 'view_rules',
  MANAGE_RULES: 'manage_rules',
  EXECUTE_RULES: 'execute_rules',

  // অটোমেশন পারমিশন
  VIEW_AUTOMATIONS: 'view_automations',
  MANAGE_AUTOMATIONS: 'manage_automations',
  EXECUTE_AUTOMATIONS: 'execute_automations',

  // টেমপ্লেট পারমিশন
  VIEW_TEMPLATES: 'view_templates',
  MANAGE_TEMPLATES: 'manage_templates',
  USE_TEMPLATES: 'use_templates',
  PUBLISH_TEMPLATES: 'publish_templates',

  // নলেজ বেস পারমিশন
  VIEW_KNOWLEDGE_BASE: 'view_knowledge_base',
  MANAGE_KNOWLEDGE_BASE: 'manage_knowledge_base',
  CREATE_ARTICLE: 'create_article',
  UPDATE_ARTICLE: 'update_article',
  DELETE_ARTICLE: 'delete_article',
  PUBLISH_ARTICLE: 'publish_article',
  VIEW_ARTICLE: 'view_article',

  // FAQ পারমিশন
  VIEW_FAQ: 'view_faq',
  MANAGE_FAQ: 'manage_faq',
  CREATE_FAQ: 'create_faq',
  UPDATE_FAQ: 'update_faq',
  DELETE_FAQ: 'delete_faq',

  // ফিডব্যাক পারমিশন
  VIEW_FEEDBACK: 'view_feedback',
  MANAGE_FEEDBACK: 'manage_feedback',
  CREATE_FEEDBACK: 'create_feedback',
  RESPOND_FEEDBACK: 'respond_feedback',

  // কমপ্লেইন্ট পারমিশন
  VIEW_COMPLAINTS: 'view_complaints',
  MANAGE_COMPLAINTS: 'manage_complaints',
  CREATE_COMPLAINT: 'create_complaint',
  RESPOND_COMPLAINT: 'respond_complaint',
  RESOLVE_COMPLAINT: 'resolve_complaint',

  // সার্ভে পারমিশন
  VIEW_SURVEYS: 'view_surveys',
  MANAGE_SURVEYS: 'manage_surveys',
  CREATE_SURVEY: 'create_survey',
  UPDATE_SURVEY: 'update_survey',
  DELETE_SURVEY: 'delete_survey',
  PUBLISH_SURVEY: 'publish_survey',
  RESPOND_SURVEY: 'respond_survey',
  VIEW_SURVEY_ANALYTICS: 'view_survey_analytics',

  // লাইভ চ্যাট পারমিশন
  VIEW_LIVE_CHAT: 'view_live_chat',
  MANAGE_LIVE_CHAT: 'manage_live_chat',
  START_CHAT: 'start_chat',
  JOIN_CHAT: 'join_chat',
  TRANSFER_CHAT: 'transfer_chat',
  CLOSE_CHAT: 'close_chat',
  VIEW_CHAT_HISTORY: 'view_chat_history',

  // চ্যাটবট পারমিশন
  VIEW_CHATBOT: 'view_chatbot',
  MANAGE_CHATBOT: 'manage_chatbot',
  TRAIN_CHATBOT: 'train_chatbot',
  VIEW_CHATBOT_ANALYTICS: 'view_chatbot_analytics',

  // রিপোর্ট পারমিশন
  VIEW_REPORTS: 'view_reports',
  CREATE_REPORTS: 'create_reports',
  EXPORT_REPORTS: 'export_reports',
  SCHEDULE_REPORTS: 'schedule_reports',

  // অ্যানালিটিক্স পারমিশন
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_DASHBOARD: 'manage_dashboard',

  // স্ক্রিপ্ট পারমিশন
  VIEW_SCRIPTS: 'view_scripts',
  MANAGE_SCRIPTS: 'manage_scripts',
  EXECUTE_SCRIPTS: 'execute_scripts',

  // ইমেইল পারমিশন
  VIEW_EMAILS: 'view_emails',
  SEND_EMAILS: 'send_emails',
  MANAGE_EMAIL_TEMPLATES: 'manage_email_templates',

  // এসএমএস পারমিশন
  VIEW_SMS: 'view_sms',
  SEND_SMS: 'send_sms',
  MANAGE_SMS_TEMPLATES: 'manage_sms_templates',

  // পুশ পারমিশন
  VIEW_PUSH: 'view_push',
  SEND_PUSH: 'send_push',
  MANAGE_PUSH_TEMPLATES: 'manage_push_templates',

  // শিডিউল পারমিশন
  VIEW_SCHEDULES: 'view_schedules',
  MANAGE_SCHEDULES: 'manage_schedules',

  // সেটিংস পারমিশন
  VIEW_SETTINGS: 'view_settings',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_SYSTEM_SETTINGS: 'manage_system_settings',
  MANAGE_INTEGRATIONS: 'manage_integrations',
  MANAGE_WEBHOOKS: 'manage_webhooks',

  // অ্যাডমিন পারমিশন
  VIEW_ADMIN: 'view_admin',
  MANAGE_ADMIN: 'manage_admin',
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  MANAGE_PERMISSIONS: 'manage_permissions',
} as const;

/**
 * সাপোর্ট পারমিশন ক্যাটাগরি
 */
export const SUPPORT_PERMISSION_CATEGORIES = {
  TICKET: [
    'view_tickets',
    'create_ticket',
    'update_ticket',
    'delete_ticket',
    'assign_ticket',
    'escalate_ticket',
    'resolve_ticket',
    'close_ticket',
    'reopen_ticket',
    'merge_ticket',
    'split_ticket',
    'comment_ticket',
    'attach_ticket',
    'view_ticket_history',
    'view_ticket_analytics',
    'manage_ticket_priority',
    'manage_ticket_status',
    'manage_ticket_category',
    'manage_ticket_tags',
  ] as const,
  AGENT: [
    'view_agents',
    'manage_agents',
    'view_agent_performance',
    'manage_agent_schedule',
    'assign_agent',
    'unassign_agent',
  ] as const,
  TEAM: ['view_teams', 'manage_teams', 'view_team_performance'] as const,
  SLA: ['view_sla', 'manage_sla', 'manage_sla_policies'] as const,
  RULE: ['view_rules', 'manage_rules', 'execute_rules'] as const,
  AUTOMATION: ['view_automations', 'manage_automations', 'execute_automations'] as const,
  TEMPLATE: ['view_templates', 'manage_templates', 'use_templates', 'publish_templates'] as const,
  KNOWLEDGE_BASE: [
    'view_knowledge_base',
    'manage_knowledge_base',
    'create_article',
    'update_article',
    'delete_article',
    'publish_article',
    'view_article',
  ] as const,
  FAQ: ['view_faq', 'manage_faq', 'create_faq', 'update_faq', 'delete_faq'] as const,
  FEEDBACK: ['view_feedback', 'manage_feedback', 'create_feedback', 'respond_feedback'] as const,
  COMPLAINT: [
    'view_complaints',
    'manage_complaints',
    'create_complaint',
    'respond_complaint',
    'resolve_complaint',
  ] as const,
  SURVEY: [
    'view_surveys',
    'manage_surveys',
    'create_survey',
    'update_survey',
    'delete_survey',
    'publish_survey',
    'respond_survey',
    'view_survey_analytics',
  ] as const,
  LIVE_CHAT: [
    'view_live_chat',
    'manage_live_chat',
    'start_chat',
    'join_chat',
    'transfer_chat',
    'close_chat',
    'view_chat_history',
  ] as const,
  CHATBOT: ['view_chatbot', 'manage_chatbot', 'train_chatbot', 'view_chatbot_analytics'] as const,
  REPORT: ['view_reports', 'create_reports', 'export_reports', 'schedule_reports'] as const,
  ANALYTICS: ['view_analytics', 'view_dashboard', 'manage_dashboard'] as const,
  SCRIPT: ['view_scripts', 'manage_scripts', 'execute_scripts'] as const,
  EMAIL: ['view_emails', 'send_emails', 'manage_email_templates'] as const,
  SMS: ['view_sms', 'send_sms', 'manage_sms_templates'] as const,
  PUSH: ['view_push', 'send_push', 'manage_push_templates'] as const,
  SCHEDULE: ['view_schedules', 'manage_schedules'] as const,
  SETTINGS: [
    'view_settings',
    'manage_settings',
    'manage_system_settings',
    'manage_integrations',
    'manage_webhooks',
  ] as const,
  ADMIN: [
    'view_admin',
    'manage_admin',
    'manage_users',
    'manage_roles',
    'manage_permissions',
  ] as const,
} as const;

/**
 * সাপোর্ট পারমিশন লেভেল
 */
export const SUPPORT_PERMISSION_LEVELS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  MANAGE: 'manage',
  ADMIN: 'admin',
} as const;

/**
 * সাপোর্ট পারমিশন রিসোর্স টাইপ
 */
export const SUPPORT_PERMISSION_RESOURCE_TYPES = {
  TICKET: 'ticket',
  AGENT: 'agent',
  TEAM: 'team',
  SLA: 'sla',
  RULE: 'rule',
  AUTOMATION: 'automation',
  TEMPLATE: 'template',
  KNOWLEDGE_BASE: 'knowledge_base',
  FAQ: 'faq',
  FEEDBACK: 'feedback',
  COMPLAINT: 'complaint',
  SURVEY: 'survey',
  LIVE_CHAT: 'live_chat',
  CHATBOT: 'chatbot',
  REPORT: 'report',
  ANALYTICS: 'analytics',
  SCRIPT: 'script',
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  SCHEDULE: 'schedule',
  SETTINGS: 'settings',
  ADMIN: 'admin',
} as const;

export type SupportPermission = (typeof SUPPORT_PERMISSION)[keyof typeof SUPPORT_PERMISSION];
export type SupportPermissionCategory = keyof typeof SUPPORT_PERMISSION_CATEGORIES;
export type SupportPermissionLevel =
  (typeof SUPPORT_PERMISSION_LEVELS)[keyof typeof SUPPORT_PERMISSION_LEVELS];
export type SupportPermissionResourceType =
  (typeof SUPPORT_PERMISSION_RESOURCE_TYPES)[keyof typeof SUPPORT_PERMISSION_RESOURCE_TYPES];

export interface SupportPermissionCategoryConfig {
  category: SupportPermissionCategory;
  displayName: string;
  description: string;
  permissions: readonly SupportPermission[];
  icon?: string;
}

/**
 * সাপোর্ট পারমিশন ক্যাটাগরি কনফিগারেশন
 */
export const SUPPORT_PERMISSION_CATEGORY_CONFIGS: Record<
  SupportPermissionCategory,
  SupportPermissionCategoryConfig
> = {
  TICKET: {
    category: 'TICKET',
    displayName: 'টিকেট',
    description: 'টিকেট ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.TICKET,
    icon: 'ticket',
  },
  AGENT: {
    category: 'AGENT',
    displayName: 'এজেন্ট',
    description: 'এজেন্ট ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.AGENT,
    icon: 'user',
  },
  TEAM: {
    category: 'TEAM',
    displayName: 'টিম',
    description: 'টিম ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.TEAM,
    icon: 'users',
  },
  SLA: {
    category: 'SLA',
    displayName: 'এসএলএ',
    description: 'এসএলএ ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.SLA,
    icon: 'clock',
  },
  RULE: {
    category: 'RULE',
    displayName: 'রুল',
    description: 'রুল ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.RULE,
    icon: 'zap',
  },
  AUTOMATION: {
    category: 'AUTOMATION',
    displayName: 'অটোমেশন',
    description: 'অটোমেশন ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.AUTOMATION,
    icon: 'bot',
  },
  TEMPLATE: {
    category: 'TEMPLATE',
    displayName: 'টেমপ্লেট',
    description: 'টেমপ্লেট ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.TEMPLATE,
    icon: 'file-text',
  },
  KNOWLEDGE_BASE: {
    category: 'KNOWLEDGE_BASE',
    displayName: 'নলেজ বেস',
    description: 'নলেজ বেস ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.KNOWLEDGE_BASE,
    icon: 'book',
  },
  FAQ: {
    category: 'FAQ',
    displayName: 'এফএকিউ',
    description: 'এফএকিউ ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.FAQ,
    icon: 'help-circle',
  },
  FEEDBACK: {
    category: 'FEEDBACK',
    displayName: 'ফিডব্যাক',
    description: 'ফিডব্যাক ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.FEEDBACK,
    icon: 'message-square',
  },
  COMPLAINT: {
    category: 'COMPLAINT',
    displayName: 'অভিযোগ',
    description: 'অভিযোগ ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.COMPLAINT,
    icon: 'alert-triangle',
  },
  SURVEY: {
    category: 'SURVEY',
    displayName: 'জরিপ',
    description: 'জরিপ ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.SURVEY,
    icon: 'clipboard',
  },
  LIVE_CHAT: {
    category: 'LIVE_CHAT',
    displayName: 'লাইভ চ্যাট',
    description: 'লাইভ চ্যাট ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.LIVE_CHAT,
    icon: 'message-circle',
  },
  CHATBOT: {
    category: 'CHATBOT',
    displayName: 'চ্যাটবট',
    description: 'চ্যাটবট ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.CHATBOT,
    icon: 'bot',
  },
  REPORT: {
    category: 'REPORT',
    displayName: 'রিপোর্ট',
    description: 'রিপোর্ট ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.REPORT,
    icon: 'file-text',
  },
  ANALYTICS: {
    category: 'ANALYTICS',
    displayName: 'অ্যানালিটিক্স',
    description: 'অ্যানালিটিক্স ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.ANALYTICS,
    icon: 'bar-chart',
  },
  SCRIPT: {
    category: 'SCRIPT',
    displayName: 'স্ক্রিপ্ট',
    description: 'স্ক্রিপ্ট ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.SCRIPT,
    icon: 'code',
  },
  EMAIL: {
    category: 'EMAIL',
    displayName: 'ইমেইল',
    description: 'ইমেইল ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.EMAIL,
    icon: 'mail',
  },
  SMS: {
    category: 'SMS',
    displayName: 'এসএমএস',
    description: 'এসএমএস ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.SMS,
    icon: 'message-circle',
  },
  PUSH: {
    category: 'PUSH',
    displayName: 'পুশ',
    description: 'পুশ নোটিফিকেশন ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.PUSH,
    icon: 'bell',
  },
  SCHEDULE: {
    category: 'SCHEDULE',
    displayName: 'শিডিউল',
    description: 'শিডিউল ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.SCHEDULE,
    icon: 'calendar',
  },
  SETTINGS: {
    category: 'SETTINGS',
    displayName: 'সেটিংস',
    description: 'সিস্টেম সেটিংস ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.SETTINGS,
    icon: 'settings',
  },
  ADMIN: {
    category: 'ADMIN',
    displayName: 'অ্যাডমিন',
    description: 'অ্যাডমিন ব্যবস্থাপনা সম্পর্কিত পারমিশন',
    permissions: SUPPORT_PERMISSION_CATEGORIES.ADMIN,
    icon: 'shield',
  },
};

/**
 * ডিফল্ট রোল পারমিশন ম্যাপিং
 */
export const DEFAULT_ROLE_PERMISSIONS = {
  ADMIN: Object.values(SUPPORT_PERMISSION),
  MANAGER: [
    SUPPORT_PERMISSION.VIEW_TICKETS,
    SUPPORT_PERMISSION.CREATE_TICKET,
    SUPPORT_PERMISSION.UPDATE_TICKET,
    SUPPORT_PERMISSION.ASSIGN_TICKET,
    SUPPORT_PERMISSION.ESCALATE_TICKET,
    SUPPORT_PERMISSION.RESOLVE_TICKET,
    SUPPORT_PERMISSION.CLOSE_TICKET,
    SUPPORT_PERMISSION.REOPEN_TICKET,
    SUPPORT_PERMISSION.COMMENT_TICKET,
    SUPPORT_PERMISSION.VIEW_AGENTS,
    SUPPORT_PERMISSION.VIEW_AGENT_PERFORMANCE,
    SUPPORT_PERMISSION.VIEW_TEAMS,
    SUPPORT_PERMISSION.VIEW_TEAM_PERFORMANCE,
    SUPPORT_PERMISSION.VIEW_SLA,
    SUPPORT_PERMISSION.MANAGE_SLA,
    SUPPORT_PERMISSION.VIEW_RULES,
    SUPPORT_PERMISSION.MANAGE_RULES,
    SUPPORT_PERMISSION.VIEW_AUTOMATIONS,
    SUPPORT_PERMISSION.MANAGE_AUTOMATIONS,
    SUPPORT_PERMISSION.VIEW_TEMPLATES,
    SUPPORT_PERMISSION.USE_TEMPLATES,
    SUPPORT_PERMISSION.VIEW_KNOWLEDGE_BASE,
    SUPPORT_PERMISSION.VIEW_FAQ,
    SUPPORT_PERMISSION.VIEW_FEEDBACK,
    SUPPORT_PERMISSION.VIEW_COMPLAINTS,
    SUPPORT_PERMISSION.VIEW_SURVEYS,
    SUPPORT_PERMISSION.VIEW_LIVE_CHAT,
    SUPPORT_PERMISSION.VIEW_CHATBOT,
    SUPPORT_PERMISSION.VIEW_REPORTS,
    SUPPORT_PERMISSION.VIEW_ANALYTICS,
    SUPPORT_PERMISSION.VIEW_DASHBOARD,
    SUPPORT_PERMISSION.VIEW_SCHEDULES,
    SUPPORT_PERMISSION.VIEW_SETTINGS,
  ] as SupportPermission[],
  AGENT: [
    SUPPORT_PERMISSION.VIEW_TICKETS,
    SUPPORT_PERMISSION.CREATE_TICKET,
    SUPPORT_PERMISSION.UPDATE_TICKET,
    SUPPORT_PERMISSION.ASSIGN_TICKET,
    SUPPORT_PERMISSION.RESOLVE_TICKET,
    SUPPORT_PERMISSION.CLOSE_TICKET,
    SUPPORT_PERMISSION.REOPEN_TICKET,
    SUPPORT_PERMISSION.COMMENT_TICKET,
    SUPPORT_PERMISSION.ATTACH_TICKET,
    SUPPORT_PERMISSION.VIEW_TICKET_HISTORY,
    SUPPORT_PERMISSION.VIEW_AGENTS,
    SUPPORT_PERMISSION.VIEW_TEAMS,
    SUPPORT_PERMISSION.VIEW_SLA,
    SUPPORT_PERMISSION.VIEW_RULES,
    SUPPORT_PERMISSION.VIEW_TEMPLATES,
    SUPPORT_PERMISSION.USE_TEMPLATES,
    SUPPORT_PERMISSION.VIEW_KNOWLEDGE_BASE,
    SUPPORT_PERMISSION.VIEW_ARTICLE,
    SUPPORT_PERMISSION.VIEW_FAQ,
    SUPPORT_PERMISSION.VIEW_FEEDBACK,
    SUPPORT_PERMISSION.CREATE_FEEDBACK,
    SUPPORT_PERMISSION.VIEW_COMPLAINTS,
    SUPPORT_PERMISSION.CREATE_COMPLAINT,
    SUPPORT_PERMISSION.VIEW_SURVEYS,
    SUPPORT_PERMISSION.RESPOND_SURVEY,
    SUPPORT_PERMISSION.VIEW_LIVE_CHAT,
    SUPPORT_PERMISSION.START_CHAT,
    SUPPORT_PERMISSION.JOIN_CHAT,
    SUPPORT_PERMISSION.CLOSE_CHAT,
    SUPPORT_PERMISSION.VIEW_CHAT_HISTORY,
    SUPPORT_PERMISSION.VIEW_CHATBOT,
    SUPPORT_PERMISSION.VIEW_REPORTS,
    SUPPORT_PERMISSION.VIEW_ANALYTICS,
    SUPPORT_PERMISSION.VIEW_DASHBOARD,
    SUPPORT_PERMISSION.VIEW_SCHEDULES,
    SUPPORT_PERMISSION.VIEW_EMAILS,
    SUPPORT_PERMISSION.SEND_EMAILS,
    SUPPORT_PERMISSION.VIEW_SMS,
    SUPPORT_PERMISSION.SEND_SMS,
    SUPPORT_PERMISSION.VIEW_PUSH,
    SUPPORT_PERMISSION.SEND_PUSH,
  ] as SupportPermission[],
  VIEWER: [
    SUPPORT_PERMISSION.VIEW_TICKETS,
    SUPPORT_PERMISSION.VIEW_TICKET_HISTORY,
    SUPPORT_PERMISSION.VIEW_AGENTS,
    SUPPORT_PERMISSION.VIEW_TEAMS,
    SUPPORT_PERMISSION.VIEW_SLA,
    SUPPORT_PERMISSION.VIEW_TEMPLATES,
    SUPPORT_PERMISSION.VIEW_KNOWLEDGE_BASE,
    SUPPORT_PERMISSION.VIEW_ARTICLE,
    SUPPORT_PERMISSION.VIEW_FAQ,
    SUPPORT_PERMISSION.VIEW_FEEDBACK,
    SUPPORT_PERMISSION.VIEW_COMPLAINTS,
    SUPPORT_PERMISSION.VIEW_SURVEYS,
    SUPPORT_PERMISSION.VIEW_LIVE_CHAT,
    SUPPORT_PERMISSION.VIEW_CHAT_HISTORY,
    SUPPORT_PERMISSION.VIEW_CHATBOT,
    SUPPORT_PERMISSION.VIEW_REPORTS,
    SUPPORT_PERMISSION.VIEW_ANALYTICS,
    SUPPORT_PERMISSION.VIEW_DASHBOARD,
    SUPPORT_PERMISSION.VIEW_SCHEDULES,
    SUPPORT_PERMISSION.VIEW_EMAILS,
    SUPPORT_PERMISSION.VIEW_SMS,
    SUPPORT_PERMISSION.VIEW_PUSH,
  ] as SupportPermission[],
} as const;

export type DefaultRole = keyof typeof DEFAULT_ROLE_PERMISSIONS;

/**
 * পারমিশন স্ট্যাটাস
 */
export const SUPPORT_PERMISSION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEPRECATED: 'deprecated',
} as const;

export type SupportPermissionStatus =
  (typeof SUPPORT_PERMISSION_STATUS)[keyof typeof SUPPORT_PERMISSION_STATUS];
