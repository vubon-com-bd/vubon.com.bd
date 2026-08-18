/**
 * সাপোর্ট টিমের মধ্যে বিভিন্ন রোল সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিম রোল
 */
export const TEAM_ROLE = {
  TEAM_LEAD: 'team_lead',
  SENIOR_AGENT: 'senior_agent',
  JUNIOR_AGENT: 'junior_agent',
  TRAINEE: 'trainee',
  SPECIALIST: 'specialist',
  COORDINATOR: 'coordinator',
  ANALYST: 'analyst',
  SUPERVISOR: 'supervisor',
  MANAGER: 'manager',
  DIRECTOR: 'director',
  ADMIN: 'admin',
  TRAINER: 'trainer',
  QUALITY_ANALYST: 'quality_analyst',
  ESCALATION_SPECIALIST: 'escalation_specialist',
  SHIFT_LEAD: 'shift_lead',
  OPERATIONS_LEAD: 'operations_lead',
  TECHNICAL_LEAD: 'technical_lead',
  PRODUCT_SPECIALIST: 'product_specialist',
  ONBOARDING_SPECIALIST: 'onboarding_specialist',
  RETENTION_SPECIALIST: 'retention_specialist',
} as const;

/**
 * টিম রোলের ডিসপ্লে নাম
 */
export const TEAM_ROLE_DISPLAY_NAMES = {
  [TEAM_ROLE.TEAM_LEAD]: 'টিম লিড',
  [TEAM_ROLE.SENIOR_AGENT]: 'সিনিয়র এজেন্ট',
  [TEAM_ROLE.JUNIOR_AGENT]: 'জুনিয়র এজেন্ট',
  [TEAM_ROLE.TRAINEE]: 'ট্রেইনি',
  [TEAM_ROLE.SPECIALIST]: 'বিশেষজ্ঞ',
  [TEAM_ROLE.COORDINATOR]: 'কোঅর্ডিনেটর',
  [TEAM_ROLE.ANALYST]: 'অ্যানালিস্ট',
  [TEAM_ROLE.SUPERVISOR]: 'সুপারভাইজার',
  [TEAM_ROLE.MANAGER]: 'ম্যানেজার',
  [TEAM_ROLE.DIRECTOR]: 'ডিরেক্টর',
  [TEAM_ROLE.ADMIN]: 'অ্যাডমিন',
  [TEAM_ROLE.TRAINER]: 'ট্রেইনার',
  [TEAM_ROLE.QUALITY_ANALYST]: 'কোয়ালিটি অ্যানালিস্ট',
  [TEAM_ROLE.ESCALATION_SPECIALIST]: 'এস্কেলেশন স্পেশালিস্ট',
  [TEAM_ROLE.SHIFT_LEAD]: 'শিফট লিড',
  [TEAM_ROLE.OPERATIONS_LEAD]: 'অপারেশনস লিড',
  [TEAM_ROLE.TECHNICAL_LEAD]: 'টেকনিক্যাল লিড',
  [TEAM_ROLE.PRODUCT_SPECIALIST]: 'প্রোডাক্ট স্পেশালিস্ট',
  [TEAM_ROLE.ONBOARDING_SPECIALIST]: 'অনবোর্ডিং স্পেশালিস্ট',
  [TEAM_ROLE.RETENTION_SPECIALIST]: 'রিটেনশন স্পেশালিস্ট',
} as const;

/**
 * টিম রোলের আইকন (অনুষঙ্গিক নাম)
 */
export const TEAM_ROLE_ICONS = {
  [TEAM_ROLE.TEAM_LEAD]: 'users',
  [TEAM_ROLE.SENIOR_AGENT]: 'user-check',
  [TEAM_ROLE.JUNIOR_AGENT]: 'user',
  [TEAM_ROLE.TRAINEE]: 'user-plus',
  [TEAM_ROLE.SPECIALIST]: 'star',
  [TEAM_ROLE.COORDINATOR]: 'git-merge',
  [TEAM_ROLE.ANALYST]: 'bar-chart',
  [TEAM_ROLE.SUPERVISOR]: 'user-cog',
  [TEAM_ROLE.MANAGER]: 'briefcase',
  [TEAM_ROLE.DIRECTOR]: 'briefcase',
  [TEAM_ROLE.ADMIN]: 'shield',
  [TEAM_ROLE.TRAINER]: 'book',
  [TEAM_ROLE.QUALITY_ANALYST]: 'clipboard',
  [TEAM_ROLE.ESCALATION_SPECIALIST]: 'arrow-up-circle',
  [TEAM_ROLE.SHIFT_LEAD]: 'clock',
  [TEAM_ROLE.OPERATIONS_LEAD]: 'settings',
  [TEAM_ROLE.TECHNICAL_LEAD]: 'cpu',
  [TEAM_ROLE.PRODUCT_SPECIALIST]: 'package',
  [TEAM_ROLE.ONBOARDING_SPECIALIST]: 'user-plus',
  [TEAM_ROLE.RETENTION_SPECIALIST]: 'heart',
} as const;

/**
 * টিম রোলের রঙের কোড (হেক্স)
 */
export const TEAM_ROLE_COLORS = {
  [TEAM_ROLE.TEAM_LEAD]: '#f39c12',
  [TEAM_ROLE.SENIOR_AGENT]: '#27ae60',
  [TEAM_ROLE.JUNIOR_AGENT]: '#3498db',
  [TEAM_ROLE.TRAINEE]: '#95a5a6',
  [TEAM_ROLE.SPECIALIST]: '#9b59b6',
  [TEAM_ROLE.COORDINATOR]: '#1abc9c',
  [TEAM_ROLE.ANALYST]: '#e67e22',
  [TEAM_ROLE.SUPERVISOR]: '#e74c3c',
  [TEAM_ROLE.MANAGER]: '#2c3e50',
  [TEAM_ROLE.DIRECTOR]: '#34495e',
  [TEAM_ROLE.ADMIN]: '#c0392b',
  [TEAM_ROLE.TRAINER]: '#2980b9',
  [TEAM_ROLE.QUALITY_ANALYST]: '#8e44ad',
  [TEAM_ROLE.ESCALATION_SPECIALIST]: '#c0392b',
  [TEAM_ROLE.SHIFT_LEAD]: '#f39c12',
  [TEAM_ROLE.OPERATIONS_LEAD]: '#1abc9c',
  [TEAM_ROLE.TECHNICAL_LEAD]: '#e74c3c',
  [TEAM_ROLE.PRODUCT_SPECIALIST]: '#e67e22',
  [TEAM_ROLE.ONBOARDING_SPECIALIST]: '#2ecc71',
  [TEAM_ROLE.RETENTION_SPECIALIST]: '#e74c3c',
} as const;

/**
 * টিম রোলের লেভেল
 */
export const TEAM_ROLE_LEVEL = {
  [TEAM_ROLE.TRAINEE]: 0,
  [TEAM_ROLE.JUNIOR_AGENT]: 1,
  [TEAM_ROLE.SENIOR_AGENT]: 2,
  [TEAM_ROLE.SPECIALIST]: 3,
  [TEAM_ROLE.COORDINATOR]: 3,
  [TEAM_ROLE.ANALYST]: 3,
  [TEAM_ROLE.SHIFT_LEAD]: 4,
  [TEAM_ROLE.TEAM_LEAD]: 4,
  [TEAM_ROLE.OPERATIONS_LEAD]: 5,
  [TEAM_ROLE.TECHNICAL_LEAD]: 5,
  [TEAM_ROLE.SUPERVISOR]: 5,
  [TEAM_ROLE.MANAGER]: 6,
  [TEAM_ROLE.DIRECTOR]: 7,
  [TEAM_ROLE.ADMIN]: 8,
  [TEAM_ROLE.TRAINER]: 4,
  [TEAM_ROLE.QUALITY_ANALYST]: 4,
  [TEAM_ROLE.ESCALATION_SPECIALIST]: 5,
  [TEAM_ROLE.PRODUCT_SPECIALIST]: 3,
  [TEAM_ROLE.ONBOARDING_SPECIALIST]: 3,
  [TEAM_ROLE.RETENTION_SPECIALIST]: 3,
} as const;

/**
 * টিম রোলের ক্যাটাগরি
 */
export const TEAM_ROLE_CATEGORIES = {
  [TEAM_ROLE.TEAM_LEAD]: 'leadership',
  [TEAM_ROLE.SENIOR_AGENT]: 'agent',
  [TEAM_ROLE.JUNIOR_AGENT]: 'agent',
  [TEAM_ROLE.TRAINEE]: 'agent',
  [TEAM_ROLE.SPECIALIST]: 'specialized',
  [TEAM_ROLE.COORDINATOR]: 'support',
  [TEAM_ROLE.ANALYST]: 'support',
  [TEAM_ROLE.SUPERVISOR]: 'leadership',
  [TEAM_ROLE.MANAGER]: 'leadership',
  [TEAM_ROLE.DIRECTOR]: 'leadership',
  [TEAM_ROLE.ADMIN]: 'admin',
  [TEAM_ROLE.TRAINER]: 'specialized',
  [TEAM_ROLE.QUALITY_ANALYST]: 'specialized',
  [TEAM_ROLE.ESCALATION_SPECIALIST]: 'specialized',
  [TEAM_ROLE.SHIFT_LEAD]: 'leadership',
  [TEAM_ROLE.OPERATIONS_LEAD]: 'leadership',
  [TEAM_ROLE.TECHNICAL_LEAD]: 'leadership',
  [TEAM_ROLE.PRODUCT_SPECIALIST]: 'specialized',
  [TEAM_ROLE.ONBOARDING_SPECIALIST]: 'specialized',
  [TEAM_ROLE.RETENTION_SPECIALIST]: 'specialized',
} as const;

/**
 * টিম রোল গ্রুপ
 */
export const TEAM_ROLE_GROUPS = {
  AGENT: ['junior_agent', 'senior_agent', 'trainee'],
  LEADERSHIP: [
    'team_lead',
    'shift_lead',
    'supervisor',
    'manager',
    'director',
    'operations_lead',
    'technical_lead',
  ],
  SPECIALIZED: [
    'specialist',
    'trainer',
    'quality_analyst',
    'escalation_specialist',
    'product_specialist',
    'onboarding_specialist',
    'retention_specialist',
  ],
  SUPPORT: ['coordinator', 'analyst'],
  ADMIN: ['admin'],
} as const;

/**
 * টিম রোলের ডিফল্ট পারমিশন
 */
export const TEAM_ROLE_PERMISSIONS = {
  [TEAM_ROLE.TRAINEE]: ['view_tickets', 'reply_tickets', 'view_knowledge_base'] as const,
  [TEAM_ROLE.JUNIOR_AGENT]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_tickets',
  ] as const,
  [TEAM_ROLE.SENIOR_AGENT]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_tickets',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
  ] as const,
  [TEAM_ROLE.SPECIALIST]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_tickets',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'assign_tickets',
  ] as const,
  [TEAM_ROLE.COORDINATOR]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'assign_tickets',
    'view_analytics',
    'view_reports',
    'coordinate_team',
  ] as const,
  [TEAM_ROLE.ANALYST]: [
    'view_tickets',
    'view_analytics',
    'view_reports',
    'generate_reports',
    'analyze_data',
  ] as const,
  [TEAM_ROLE.SHIFT_LEAD]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_tickets',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'assign_tickets',
    'manage_shift',
    'view_reports',
  ] as const,
  [TEAM_ROLE.TEAM_LEAD]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_tickets',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'assign_tickets',
    'manage_team',
    'view_reports',
    'generate_reports',
  ] as const,
  [TEAM_ROLE.OPERATIONS_LEAD]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'assign_tickets',
    'manage_team',
    'view_reports',
    'generate_reports',
    'manage_operations',
  ] as const,
  [TEAM_ROLE.TECHNICAL_LEAD]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'assign_tickets',
    'manage_team',
    'view_reports',
    'generate_reports',
    'technical_oversight',
  ] as const,
  [TEAM_ROLE.SUPERVISOR]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'assign_tickets',
    'manage_team',
    'view_reports',
    'generate_reports',
    'supervise_agents',
    'approve_leave',
  ] as const,
  [TEAM_ROLE.MANAGER]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'assign_tickets',
    'manage_team',
    'view_reports',
    'generate_reports',
    'supervise_agents',
    'approve_leave',
    'manage_budget',
    'manage_performance',
  ] as const,
  [TEAM_ROLE.DIRECTOR]: [
    'view_tickets',
    'view_knowledge_base',
    'view_analytics',
    'view_reports',
    'generate_reports',
    'manage_budget',
    'manage_performance',
    'manage_operations',
    'strategic_planning',
  ] as const,
  [TEAM_ROLE.ADMIN]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'assign_tickets',
    'manage_team',
    'view_reports',
    'generate_reports',
    'supervise_agents',
    'approve_leave',
    'manage_budget',
    'manage_performance',
    'manage_users',
    'manage_roles',
    'manage_system',
  ] as const,
  [TEAM_ROLE.TRAINER]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'manage_training',
    'view_training_analytics',
    'create_training_materials',
  ] as const,
  [TEAM_ROLE.QUALITY_ANALYST]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'view_analytics',
    'view_reports',
    'quality_assurance',
    'view_qa_scores',
    'manage_qa',
  ] as const,
  [TEAM_ROLE.ESCALATION_SPECIALIST]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'assign_tickets',
    'manage_sla',
    'expert_access',
  ] as const,
  [TEAM_ROLE.PRODUCT_SPECIALIST]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'view_analytics',
    'product_knowledge',
  ] as const,
  [TEAM_ROLE.ONBOARDING_SPECIALIST]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'onboarding_tasks',
    'view_analytics',
  ] as const,
  [TEAM_ROLE.RETENTION_SPECIALIST]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'search_knowledge_base',
    'create_knowledge_base',
    'retention_tasks',
    'view_analytics',
  ] as const,
} as const;

export type TeamRole = (typeof TEAM_ROLE)[keyof typeof TEAM_ROLE];
export type TeamRoleDisplayNames = typeof TEAM_ROLE_DISPLAY_NAMES;
export type TeamRoleIcons = typeof TEAM_ROLE_ICONS;
export type TeamRoleColors = typeof TEAM_ROLE_COLORS;
export type TeamRoleLevel = typeof TEAM_ROLE_LEVEL;
export type TeamRoleCategories = typeof TEAM_ROLE_CATEGORIES;
export type TeamRoleGroups = typeof TEAM_ROLE_GROUPS;
export type TeamRolePermissions = typeof TEAM_ROLE_PERMISSIONS;

export type TeamRoleGroup = keyof typeof TEAM_ROLE_GROUPS;

export interface TeamRoleConfig {
  role: TeamRole;
  displayName: string;
  icon: string;
  color: string;
  level: number;
  category: string;
  group: TeamRoleGroup;
  permissions: readonly string[];
  description?: string;
}

/**
 * টিম রোল কনফিগারেশন অবজেক্ট
 */
export const TEAM_ROLE_CONFIGS: Record<TeamRole, TeamRoleConfig> = {
  [TEAM_ROLE.TEAM_LEAD]: {
    role: TEAM_ROLE.TEAM_LEAD,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.TEAM_LEAD],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.TEAM_LEAD],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.TEAM_LEAD],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.TEAM_LEAD],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.TEAM_LEAD],
    group: 'LEADERSHIP',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.TEAM_LEAD],
    description: 'টিমের নেতৃত্ব প্রদান করে',
  },
  [TEAM_ROLE.SENIOR_AGENT]: {
    role: TEAM_ROLE.SENIOR_AGENT,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.SENIOR_AGENT],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.SENIOR_AGENT],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.SENIOR_AGENT],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.SENIOR_AGENT],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.SENIOR_AGENT],
    group: 'AGENT',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.SENIOR_AGENT],
    description: 'সিনিয়র সাপোর্ট এজেন্ট',
  },
  [TEAM_ROLE.JUNIOR_AGENT]: {
    role: TEAM_ROLE.JUNIOR_AGENT,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.JUNIOR_AGENT],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.JUNIOR_AGENT],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.JUNIOR_AGENT],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.JUNIOR_AGENT],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.JUNIOR_AGENT],
    group: 'AGENT',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.JUNIOR_AGENT],
    description: 'জুনিয়র সাপোর্ট এজেন্ট',
  },
  [TEAM_ROLE.TRAINEE]: {
    role: TEAM_ROLE.TRAINEE,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.TRAINEE],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.TRAINEE],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.TRAINEE],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.TRAINEE],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.TRAINEE],
    group: 'AGENT',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.TRAINEE],
    description: 'প্রশিক্ষণপ্রাপ্ত এজেন্ট',
  },
  [TEAM_ROLE.SPECIALIST]: {
    role: TEAM_ROLE.SPECIALIST,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.SPECIALIST],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.SPECIALIST],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.SPECIALIST],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.SPECIALIST],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.SPECIALIST],
    group: 'SPECIALIZED',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.SPECIALIST],
    description: 'বিশেষায়িত সাপোর্ট এজেন্ট',
  },
  [TEAM_ROLE.COORDINATOR]: {
    role: TEAM_ROLE.COORDINATOR,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.COORDINATOR],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.COORDINATOR],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.COORDINATOR],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.COORDINATOR],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.COORDINATOR],
    group: 'SUPPORT',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.COORDINATOR],
    description: 'টিম সমন্বয়কারী',
  },
  [TEAM_ROLE.ANALYST]: {
    role: TEAM_ROLE.ANALYST,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.ANALYST],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.ANALYST],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.ANALYST],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.ANALYST],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.ANALYST],
    group: 'SUPPORT',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.ANALYST],
    description: 'ডেটা ও পারফরম্যান্স বিশ্লেষক',
  },
  [TEAM_ROLE.SUPERVISOR]: {
    role: TEAM_ROLE.SUPERVISOR,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.SUPERVISOR],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.SUPERVISOR],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.SUPERVISOR],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.SUPERVISOR],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.SUPERVISOR],
    group: 'LEADERSHIP',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.SUPERVISOR],
    description: 'এজেন্টদের তত্ত্বাবধান করে',
  },
  [TEAM_ROLE.MANAGER]: {
    role: TEAM_ROLE.MANAGER,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.MANAGER],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.MANAGER],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.MANAGER],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.MANAGER],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.MANAGER],
    group: 'LEADERSHIP',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.MANAGER],
    description: 'টিম পরিচালনা করে',
  },
  [TEAM_ROLE.DIRECTOR]: {
    role: TEAM_ROLE.DIRECTOR,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.DIRECTOR],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.DIRECTOR],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.DIRECTOR],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.DIRECTOR],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.DIRECTOR],
    group: 'LEADERSHIP',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.DIRECTOR],
    description: 'সাপোর্ট বিভাগের পরিচালক',
  },
  [TEAM_ROLE.ADMIN]: {
    role: TEAM_ROLE.ADMIN,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.ADMIN],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.ADMIN],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.ADMIN],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.ADMIN],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.ADMIN],
    group: 'ADMIN',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.ADMIN],
    description: 'সিস্টেম অ্যাডমিনিস্ট্রেটর',
  },
  [TEAM_ROLE.TRAINER]: {
    role: TEAM_ROLE.TRAINER,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.TRAINER],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.TRAINER],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.TRAINER],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.TRAINER],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.TRAINER],
    group: 'SPECIALIZED',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.TRAINER],
    description: 'প্রশিক্ষক',
  },
  [TEAM_ROLE.QUALITY_ANALYST]: {
    role: TEAM_ROLE.QUALITY_ANALYST,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.QUALITY_ANALYST],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.QUALITY_ANALYST],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.QUALITY_ANALYST],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.QUALITY_ANALYST],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.QUALITY_ANALYST],
    group: 'SPECIALIZED',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.QUALITY_ANALYST],
    description: 'গুণমান বিশ্লেষক',
  },
  [TEAM_ROLE.ESCALATION_SPECIALIST]: {
    role: TEAM_ROLE.ESCALATION_SPECIALIST,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.ESCALATION_SPECIALIST],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.ESCALATION_SPECIALIST],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.ESCALATION_SPECIALIST],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.ESCALATION_SPECIALIST],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.ESCALATION_SPECIALIST],
    group: 'SPECIALIZED',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.ESCALATION_SPECIALIST],
    description: 'এস্কেলেশন বিশেষজ্ঞ',
  },
  [TEAM_ROLE.SHIFT_LEAD]: {
    role: TEAM_ROLE.SHIFT_LEAD,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.SHIFT_LEAD],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.SHIFT_LEAD],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.SHIFT_LEAD],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.SHIFT_LEAD],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.SHIFT_LEAD],
    group: 'LEADERSHIP',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.SHIFT_LEAD],
    description: 'শিফটের নেতৃত্ব প্রদান করে',
  },
  [TEAM_ROLE.OPERATIONS_LEAD]: {
    role: TEAM_ROLE.OPERATIONS_LEAD,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.OPERATIONS_LEAD],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.OPERATIONS_LEAD],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.OPERATIONS_LEAD],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.OPERATIONS_LEAD],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.OPERATIONS_LEAD],
    group: 'LEADERSHIP',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.OPERATIONS_LEAD],
    description: 'অপারেশনসের নেতৃত্ব প্রদান করে',
  },
  [TEAM_ROLE.TECHNICAL_LEAD]: {
    role: TEAM_ROLE.TECHNICAL_LEAD,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.TECHNICAL_LEAD],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.TECHNICAL_LEAD],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.TECHNICAL_LEAD],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.TECHNICAL_LEAD],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.TECHNICAL_LEAD],
    group: 'LEADERSHIP',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.TECHNICAL_LEAD],
    description: 'প্রযুক্তিগত নেতৃত্ব প্রদান করে',
  },
  [TEAM_ROLE.PRODUCT_SPECIALIST]: {
    role: TEAM_ROLE.PRODUCT_SPECIALIST,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.PRODUCT_SPECIALIST],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.PRODUCT_SPECIALIST],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.PRODUCT_SPECIALIST],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.PRODUCT_SPECIALIST],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.PRODUCT_SPECIALIST],
    group: 'SPECIALIZED',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.PRODUCT_SPECIALIST],
    description: 'পণ্য বিশেষজ্ঞ',
  },
  [TEAM_ROLE.ONBOARDING_SPECIALIST]: {
    role: TEAM_ROLE.ONBOARDING_SPECIALIST,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.ONBOARDING_SPECIALIST],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.ONBOARDING_SPECIALIST],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.ONBOARDING_SPECIALIST],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.ONBOARDING_SPECIALIST],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.ONBOARDING_SPECIALIST],
    group: 'SPECIALIZED',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.ONBOARDING_SPECIALIST],
    description: 'অনবোর্ডিং বিশেষজ্ঞ',
  },
  [TEAM_ROLE.RETENTION_SPECIALIST]: {
    role: TEAM_ROLE.RETENTION_SPECIALIST,
    displayName: TEAM_ROLE_DISPLAY_NAMES[TEAM_ROLE.RETENTION_SPECIALIST],
    icon: TEAM_ROLE_ICONS[TEAM_ROLE.RETENTION_SPECIALIST],
    color: TEAM_ROLE_COLORS[TEAM_ROLE.RETENTION_SPECIALIST],
    level: TEAM_ROLE_LEVEL[TEAM_ROLE.RETENTION_SPECIALIST],
    category: TEAM_ROLE_CATEGORIES[TEAM_ROLE.RETENTION_SPECIALIST],
    group: 'SPECIALIZED',
    permissions: TEAM_ROLE_PERMISSIONS[TEAM_ROLE.RETENTION_SPECIALIST],
    description: 'রিটেনশন বিশেষজ্ঞ',
  },
};

/**
 * টিম রোল গ্রুপ কনফিগারেশন
 */
export const TEAM_ROLE_GROUP_CONFIGS: Record<
  TeamRoleGroup,
  {
    group: TeamRoleGroup;
    displayName: string;
    icon: string;
    color: string;
    roles: readonly TeamRole[];
    description?: string;
  }
> = {
  AGENT: {
    group: 'AGENT',
    displayName: 'এজেন্ট',
    icon: 'user',
    color: '#3498db',
    roles: ['junior_agent', 'senior_agent', 'trainee'] as const,
    description: 'সাপোর্ট এজেন্ট রোলসমূহ',
  },
  LEADERSHIP: {
    group: 'LEADERSHIP',
    displayName: 'নেতৃত্ব',
    icon: 'users',
    color: '#f39c12',
    roles: [
      'team_lead',
      'shift_lead',
      'supervisor',
      'manager',
      'director',
      'operations_lead',
      'technical_lead',
    ] as const,
    description: 'নেতৃত্বের রোলসমূহ',
  },
  SPECIALIZED: {
    group: 'SPECIALIZED',
    displayName: 'বিশেষায়িত',
    icon: 'star',
    color: '#9b59b6',
    roles: [
      'specialist',
      'trainer',
      'quality_analyst',
      'escalation_specialist',
      'product_specialist',
      'onboarding_specialist',
      'retention_specialist',
    ] as const,
    description: 'বিশেষায়িত রোলসমূহ',
  },
  SUPPORT: {
    group: 'SUPPORT',
    displayName: 'সাপোর্ট',
    icon: 'help-circle',
    color: '#1abc9c',
    roles: ['coordinator', 'analyst'] as const,
    description: 'সাপোর্ট রোলসমূহ',
  },
  ADMIN: {
    group: 'ADMIN',
    displayName: 'অ্যাডমিন',
    icon: 'shield',
    color: '#e74c3c',
    roles: ['admin'] as const,
    description: 'অ্যাডমিনিস্ট্রেটর রোল',
  },
};

/**
 * টিম রোল স্ট্যাটাস
 */
export const TEAM_ROLE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEPRECATED: 'deprecated',
  BETA: 'beta',
} as const;

export type TeamRoleStatus = (typeof TEAM_ROLE_STATUS)[keyof typeof TEAM_ROLE_STATUS];
