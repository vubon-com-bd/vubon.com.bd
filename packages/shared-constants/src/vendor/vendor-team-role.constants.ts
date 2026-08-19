/**
 * টিমের সদস্যদের রোল বা ভূমিকা সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিম রোল অবজেক্ট
 */
export const TeamRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  SUPERVISOR: 'SUPERVISOR',
  MEMBER: 'MEMBER',
  VIEWER: 'VIEWER',
  ACCOUNTANT: 'ACCOUNTANT',
  SUPPORT: 'SUPPORT',
} as const;

/**
 * টিম রোল - ইউনিয়ন টাইপ
 */
export type TeamRoleValue = (typeof TeamRole)[keyof typeof TeamRole];

/**
 * টিম রোল লেভেল (১ = সর্বোচ্চ)
 */
export const TeamRoleLevels: Record<TeamRoleValue, number> = {
  [TeamRole.OWNER]: 1,
  [TeamRole.ADMIN]: 2,
  [TeamRole.MANAGER]: 3,
  [TeamRole.SUPERVISOR]: 4,
  [TeamRole.ACCOUNTANT]: 5,
  [TeamRole.SUPPORT]: 6,
  [TeamRole.MEMBER]: 7,
  [TeamRole.VIEWER]: 8,
};

/**
 * ডিফল্ট রোল নতুন সদস্যদের জন্য
 */
export const DefaultRoleForNewMembers: TeamRoleValue = TeamRole.MEMBER;

/**
 * রোল পরিবর্তনের জন্য অনুমোদন প্রয়োজন
 */
export const RoleChangeApprovalRequired = true;

/**
 * টিম রোল পারমিশনসমূহ
 */
export const TeamRolePermissions: Record<TeamRoleValue, string[]> = {
  [TeamRole.OWNER]: [
    'team:manage',
    'team:delete',
    'team:invite',
    'team:remove',
    'team:edit',
    'team:view',
    'member:manage',
    'member:assign_role',
  ],
  [TeamRole.ADMIN]: [
    'team:manage',
    'team:invite',
    'team:remove',
    'team:edit',
    'team:view',
    'member:manage',
    'member:assign_role',
  ],
  [TeamRole.MANAGER]: ['team:edit', 'team:view', 'member:manage', 'team:invite', 'team:remove'],
  [TeamRole.SUPERVISOR]: ['team:view', 'member:manage', 'team:edit'],
  [TeamRole.ACCOUNTANT]: ['team:view', 'financial:view', 'financial:export'],
  [TeamRole.SUPPORT]: ['team:view', 'ticket:manage', 'customer:view'],
  [TeamRole.MEMBER]: ['team:view', 'task:manage', 'project:view'],
  [TeamRole.VIEWER]: ['team:view'],
};

/**
 * টিম রোল লেবেলসমূহ
 */
export const TeamRoleLabels: Record<TeamRoleValue, { en: string; bn: string }> = {
  [TeamRole.OWNER]: {
    en: 'Owner',
    bn: 'মালিক',
  },
  [TeamRole.ADMIN]: {
    en: 'Admin',
    bn: 'প্রশাসক',
  },
  [TeamRole.MANAGER]: {
    en: 'Manager',
    bn: 'ম্যানেজার',
  },
  [TeamRole.SUPERVISOR]: {
    en: 'Supervisor',
    bn: 'সুপারভাইজার',
  },
  [TeamRole.ACCOUNTANT]: {
    en: 'Accountant',
    bn: 'হিসাবরক্ষক',
  },
  [TeamRole.SUPPORT]: {
    en: 'Support',
    bn: 'সাপোর্ট',
  },
  [TeamRole.MEMBER]: {
    en: 'Member',
    bn: 'সদস্য',
  },
  [TeamRole.VIEWER]: {
    en: 'Viewer',
    bn: 'দর্শক',
  },
};

/**
 * টিম রোল রঙ কোডসমূহ
 */
export const TeamRoleColors: Record<TeamRoleValue, string> = {
  [TeamRole.OWNER]: 'bg-purple-100 text-purple-800 border-purple-300',
  [TeamRole.ADMIN]: 'bg-blue-100 text-blue-800 border-blue-300',
  [TeamRole.MANAGER]: 'bg-green-100 text-green-800 border-green-300',
  [TeamRole.SUPERVISOR]: 'bg-teal-100 text-teal-800 border-teal-300',
  [TeamRole.ACCOUNTANT]: 'bg-orange-100 text-orange-800 border-orange-300',
  [TeamRole.SUPPORT]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [TeamRole.MEMBER]: 'bg-gray-100 text-gray-800 border-gray-300',
  [TeamRole.VIEWER]: 'bg-indigo-100 text-indigo-800 border-indigo-300',
};

/**
 * টিম রোল হায়ারার্কি
 */
export const TeamRoleHierarchy: Record<number, TeamRoleValue> = {
  1: TeamRole.OWNER,
  2: TeamRole.ADMIN,
  3: TeamRole.MANAGER,
  4: TeamRole.SUPERVISOR,
  5: TeamRole.ACCOUNTANT,
  6: TeamRole.SUPPORT,
  7: TeamRole.MEMBER,
  8: TeamRole.VIEWER,
};

/**
 * রোল পরিবর্তন লিমিট (প্রতি মাসে)
 */
export const RoleChangeLimitPerMonth = 3;

/**
 * রোল অডিট লগ রিটেনশন (দিন)
 */
export const RoleAuditLogRetentionDays = 365;
