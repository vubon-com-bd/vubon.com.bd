/**
 * অ্যাডমিন টিম সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// টিম আইডি প্রিফিক্স
export const TEAM_ID_PREFIX = 'TEAM';

// টিমের সর্বোচ্চ সদস্য সংখ্যা
export const MAX_TEAM_MEMBERS = 20;

// টিমের ডিফল্ট সেটিংস
export const DEFAULT_TEAM_SETTINGS = {
  maxMembers: 20,
  allowExternal: false,
  requireApproval: true,
  autoArchive: 30, // দিন
  defaultRole: 'member',
  communicationChannel: 'slack',
  meetingSchedule: 'weekly',
} as const;

// টিমের কালার কোড
export const TEAM_COLORS = {
  CORE: '#DC2626',
  PROJECT: '#3B82F6',
  SUPPORT: '#22C55E',
  TEMPORARY: '#F59E0B',
} as const;

// টিমের আইকন
export const TEAM_ICONS = {
  CORE: '🎯',
  PROJECT: '📋',
  SUPPORT: '🤝',
  TEMPORARY: '⏳',
} as const;

// টিমের টাইপ
export const TEAM_TYPES = {
  CORE: 'core',
  PROJECT: 'project',
  SUPPORT: 'support',
  TEMPORARY: 'temporary',
} as const;

// টিমের স্ট্যাটাস
export const TEAM_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
} as const;

// টিম লিডার রোল
export const TEAM_LEADER_ROLE = 'team_leader';

// ডিফল্ট টিম পারমিশন
export const DEFAULT_TEAM_PERMISSIONS = {
  CORE: {
    canManageMembers: true,
    canCreateProjects: true,
    canModifySettings: true,
    canDeleteTeam: false,
  },
  PROJECT: {
    canManageMembers: true,
    canCreateProjects: false,
    canModifySettings: false,
    canDeleteTeam: false,
  },
  SUPPORT: {
    canManageMembers: true,
    canCreateProjects: false,
    canModifySettings: false,
    canDeleteTeam: false,
  },
  TEMPORARY: {
    canManageMembers: false,
    canCreateProjects: false,
    canModifySettings: false,
    canDeleteTeam: false,
  },
} as const;

// টিমের ডেসক্রিপশন
export const TEAM_DESCRIPTIONS = {
  CORE: 'Core team responsible for main operations',
  PROJECT: 'Project-based team for specific initiatives',
  SUPPORT: 'Support team for customer and technical assistance',
  TEMPORARY: 'Temporary team for short-term projects',
} as const;

// টিমের লেবেল (বাংলা)
export const TEAM_LABELS_BN = {
  CORE: 'মূল টিম',
  PROJECT: 'প্রজেক্ট টিম',
  SUPPORT: 'সাপোর্ট টিম',
  TEMPORARY: 'অস্থায়ী টিম',
} as const;

// টিমের লেবেল (ইংরেজি)
export const TEAM_LABELS_EN = {
  CORE: 'Core Team',
  PROJECT: 'Project Team',
  SUPPORT: 'Support Team',
  TEMPORARY: 'Temporary Team',
} as const;

// টিমের CSS ক্লাস
export const TEAM_CSS_CLASSES = {
  CORE: 'team-core',
  PROJECT: 'team-project',
  SUPPORT: 'team-support',
  TEMPORARY: 'team-temporary',
} as const;

// টিম গ্রুপ
export const TEAM_GROUPS = {
  PERMANENT_TEAMS: ['core', 'support'],
  TEMPORARY_TEAMS: ['project', 'temporary'],
} as const;

// টিম মেম্বার রোল
export const TEAM_MEMBER_ROLES = {
  LEADER: 'leader',
  MEMBER: 'member',
  OBSERVER: 'observer',
} as const;

// টিমের জন্য ইমোজি
export const TEAM_EMOJIS = {
  CORE: '💪',
  PROJECT: '🚀',
  SUPPORT: '🛡️',
  TEMPORARY: '🔄',
} as const;

// টিমের অ্যাকশন
export const TEAM_ACTIONS = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  ADD_MEMBER: 'add_member',
  REMOVE_MEMBER: 'remove_member',
  UPDATE_MEMBER_ROLE: 'update_member_role',
  ARCHIVE: 'archive',
  RESTORE: 'restore',
} as const;

// টিমের ম্যাক্স সদস্য সংখ্যা (টাইপ অনুযায়ী)
export const TEAM_MAX_MEMBERS_BY_TYPE = {
  CORE: 20,
  PROJECT: 15,
  SUPPORT: 25,
  TEMPORARY: 10,
} as const;

// টিমের ডিফল্ট স্ট্যাটাস
export const DEFAULT_TEAM_STATUS = 'active';

// টিমের ডিফল্ট টাইপ
export const DEFAULT_TEAM_TYPE = 'project';
