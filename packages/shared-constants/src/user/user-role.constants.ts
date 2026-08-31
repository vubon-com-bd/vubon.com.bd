/**
 * User Role Constants
 * All possible user roles in the system
 * Imports common role values where applicable
 */

/**
 * Core user roles
 * Defines the fundamental roles a user can have in the system
 */
export const USER_ROLE = {
  /** Super administrator with full system access */
  SUPER_ADMIN: 'super_admin',
  /** Administrator with elevated privileges */
  ADMIN: 'admin',
  /** Manager with department-level access */
  MANAGER: 'manager',
  /** Regular user with standard access */
  USER: 'user',
  /** Guest user with limited access */
  GUEST: 'guest',
  /** Moderator with content moderation privileges */
  MODERATOR: 'moderator',
  /** Support staff with customer support access */
  SUPPORT: 'support',
  /** Auditor with read-only access for compliance */
  AUDITOR: 'auditor',
  /** Developer with technical access */
  DEVELOPER: 'developer',
  /** Content creator with content management access */
  CONTENT_CREATOR: 'content_creator',
  /** Editor with content editing and publishing access */
  EDITOR: 'editor',
  /** Reviewer with content review and approval access */
  REVIEWER: 'reviewer',
  /** Analyst with data and analytics access */
  ANALYST: 'analyst',
} as const;

/**
 * User role categories
 * Grouping of roles by functional area
 */
export const USER_ROLE_CATEGORY = {
  /** System-level roles */
  SYSTEM: 'system',
  /** Administrative roles */
  ADMIN: 'admin',
  /** Management roles */
  MANAGEMENT: 'management',
  /** Content roles */
  CONTENT: 'content',
  /** Support roles */
  SUPPORT: 'support',
  /** Technical roles */
  TECHNICAL: 'technical',
  /** Operational roles */
  OPERATIONAL: 'operational',
} as const;

/**
 * User role levels
 * Hierarchy level of each role
 */
export const USER_ROLE_LEVEL = {
  /** Highest privilege level (Super Admin) */
  LEVEL_1: 1,
  /** Second highest privilege level (Admin) */
  LEVEL_2: 2,
  /** Third level (Manager) */
  LEVEL_3: 3,
  /** Fourth level (Moderator, Support, etc.) */
  LEVEL_4: 4,
  /** Fifth level (Developer, Analyst, etc.) */
  LEVEL_5: 5,
  /** Sixth level (Content Creator, Editor, etc.) */
  LEVEL_6: 6,
  /** Seventh level (User) */
  LEVEL_7: 7,
  /** Lowest level (Guest) */
  LEVEL_8: 8,
} as const;

/**
 * User role hierarchy mapping
 * Maps each role to its level
 */
export const USER_ROLE_HIERARCHY: Record<string, number> = {
  [USER_ROLE.SUPER_ADMIN]: USER_ROLE_LEVEL.LEVEL_1,
  [USER_ROLE.ADMIN]: USER_ROLE_LEVEL.LEVEL_2,
  [USER_ROLE.MANAGER]: USER_ROLE_LEVEL.LEVEL_3,
  [USER_ROLE.MODERATOR]: USER_ROLE_LEVEL.LEVEL_4,
  [USER_ROLE.SUPPORT]: USER_ROLE_LEVEL.LEVEL_4,
  [USER_ROLE.AUDITOR]: USER_ROLE_LEVEL.LEVEL_4,
  [USER_ROLE.DEVELOPER]: USER_ROLE_LEVEL.LEVEL_5,
  [USER_ROLE.ANALYST]: USER_ROLE_LEVEL.LEVEL_5,
  [USER_ROLE.CONTENT_CREATOR]: USER_ROLE_LEVEL.LEVEL_6,
  [USER_ROLE.EDITOR]: USER_ROLE_LEVEL.LEVEL_6,
  [USER_ROLE.REVIEWER]: USER_ROLE_LEVEL.LEVEL_6,
  [USER_ROLE.USER]: USER_ROLE_LEVEL.LEVEL_7,
  [USER_ROLE.GUEST]: USER_ROLE_LEVEL.LEVEL_8,
};

/**
 * User role category mapping
 * Maps each role to its category
 */
export const USER_ROLE_CATEGORY_MAP: Record<string, string> = {
  [USER_ROLE.SUPER_ADMIN]: USER_ROLE_CATEGORY.SYSTEM,
  [USER_ROLE.ADMIN]: USER_ROLE_CATEGORY.ADMIN,
  [USER_ROLE.MANAGER]: USER_ROLE_CATEGORY.MANAGEMENT,
  [USER_ROLE.MODERATOR]: USER_ROLE_CATEGORY.CONTENT,
  [USER_ROLE.SUPPORT]: USER_ROLE_CATEGORY.SUPPORT,
  [USER_ROLE.AUDITOR]: USER_ROLE_CATEGORY.OPERATIONAL,
  [USER_ROLE.DEVELOPER]: USER_ROLE_CATEGORY.TECHNICAL,
  [USER_ROLE.ANALYST]: USER_ROLE_CATEGORY.OPERATIONAL,
  [USER_ROLE.CONTENT_CREATOR]: USER_ROLE_CATEGORY.CONTENT,
  [USER_ROLE.EDITOR]: USER_ROLE_CATEGORY.CONTENT,
  [USER_ROLE.REVIEWER]: USER_ROLE_CATEGORY.CONTENT,
  [USER_ROLE.USER]: USER_ROLE_CATEGORY.OPERATIONAL,
  [USER_ROLE.GUEST]: USER_ROLE_CATEGORY.OPERATIONAL,
};

/**
 * User role labels
 * Human-readable labels for UI
 */
export const USER_ROLE_LABELS: Record<string, string> = {
  [USER_ROLE.SUPER_ADMIN]: 'Super Administrator',
  [USER_ROLE.ADMIN]: 'Administrator',
  [USER_ROLE.MANAGER]: 'Manager',
  [USER_ROLE.USER]: 'User',
  [USER_ROLE.GUEST]: 'Guest',
  [USER_ROLE.MODERATOR]: 'Moderator',
  [USER_ROLE.SUPPORT]: 'Support Staff',
  [USER_ROLE.AUDITOR]: 'Auditor',
  [USER_ROLE.DEVELOPER]: 'Developer',
  [USER_ROLE.CONTENT_CREATOR]: 'Content Creator',
  [USER_ROLE.EDITOR]: 'Editor',
  [USER_ROLE.REVIEWER]: 'Reviewer',
  [USER_ROLE.ANALYST]: 'Analyst',
};

/**
 * User role descriptions
 * Detailed descriptions of each role
 */
export const USER_ROLE_DESCRIPTIONS: Record<string, string> = {
  [USER_ROLE.SUPER_ADMIN]: 'Has full access to all system features and settings',
  [USER_ROLE.ADMIN]: 'Has elevated privileges for system administration',
  [USER_ROLE.MANAGER]: 'Has department-level management capabilities',
  [USER_ROLE.MODERATOR]: 'Can moderate content and user interactions',
  [USER_ROLE.SUPPORT]: 'Can handle customer support tickets and queries',
  [USER_ROLE.AUDITOR]: 'Has read-only access for compliance and audit purposes',
  [USER_ROLE.DEVELOPER]: 'Has technical access for development and integration',
  [USER_ROLE.ANALYST]: 'Can access data and analytics for reporting',
  [USER_ROLE.CONTENT_CREATOR]: 'Can create content but not publish without review',
  [USER_ROLE.EDITOR]: 'Can create, edit, and publish content',
  [USER_ROLE.REVIEWER]: 'Can review and approve content before publication',
  [USER_ROLE.USER]: 'Has standard user access to the platform',
  [USER_ROLE.GUEST]: 'Has limited access as an unauthenticated user',
};

/**
 * Check if user role is valid
 */
export function isValidUserRole(role: string): boolean {
  return Object.values(USER_ROLE).includes(role as (typeof USER_ROLE)[keyof typeof USER_ROLE]);
}

/**
 * Check if user role category is valid
 */
export function isValidUserRoleCategory(category: string): boolean {
  return Object.values(USER_ROLE_CATEGORY).includes(
    category as (typeof USER_ROLE_CATEGORY)[keyof typeof USER_ROLE_CATEGORY]
  );
}

/**
 * Get user role label
 */
export function getUserRoleLabel(role: string): string {
  return USER_ROLE_LABELS[role] || role;
}

/**
 * Get user role description
 */
export function getUserRoleDescription(role: string): string {
  return USER_ROLE_DESCRIPTIONS[role] || 'No description available';
}

/**
 * Get user role hierarchy level
 */
export function getUserRoleLevel(role: string): number {
  return USER_ROLE_HIERARCHY[role] || USER_ROLE_LEVEL.LEVEL_8;
}

/**
 * Get user role category
 */
export function getUserRoleCategory(role: string): string {
  return USER_ROLE_CATEGORY_MAP[role] || USER_ROLE_CATEGORY.OPERATIONAL;
}

/**
 * Check if role is admin role
 */
export function isUserRoleAdmin(role: string): boolean {
  const adminRoles: string[] = [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.MANAGER];
  return adminRoles.includes(role);
}

/**
 * Check if role is content role
 */
export function isUserRoleContent(role: string): boolean {
  const contentRoles: string[] = [
    USER_ROLE.CONTENT_CREATOR,
    USER_ROLE.EDITOR,
    USER_ROLE.REVIEWER,
    USER_ROLE.MODERATOR,
  ];
  return contentRoles.includes(role);
}

/**
 * Check if role is support role
 */
export function isUserRoleSupport(role: string): boolean {
  const supportRoles: string[] = [USER_ROLE.SUPPORT, USER_ROLE.AUDITOR];
  return supportRoles.includes(role);
}

/**
 * Check if role is technical role
 */
export function isUserRoleTechnical(role: string): boolean {
  const technicalRoles: string[] = [USER_ROLE.DEVELOPER, USER_ROLE.ANALYST];
  return technicalRoles.includes(role);
}

/**
 * Check if role has elevated privileges
 */
export function hasUserRoleElevatedPrivileges(role: string): boolean {
  const elevatedRoles: string[] = [
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.MODERATOR,
    USER_ROLE.DEVELOPER,
  ];
  return elevatedRoles.includes(role);
}

/**
 * Check if role outranks another role
 */
export function doesUserRoleOutrank(role1: string, role2: string): boolean {
  const level1 = getUserRoleLevel(role1);
  const level2 = getUserRoleLevel(role2);
  return level1 < level2; // Lower number = higher privilege
}

/**
 * Check if roles are equal in hierarchy
 */
export function areUserRolesEqual(role1: string, role2: string): boolean {
  return getUserRoleLevel(role1) === getUserRoleLevel(role2);
}

/**
 * Get all user roles
 */
export function getAllUserRoles(): string[] {
  return Object.values(USER_ROLE);
}

/**
 * Get admin user roles
 */
export function getAdminUserRoles(): string[] {
  return Object.values(USER_ROLE).filter((role) => isUserRoleAdmin(role));
}

/**
 * Get content user roles
 */
export function getContentUserRoles(): string[] {
  return Object.values(USER_ROLE).filter((role) => isUserRoleContent(role));
}

/**
 * Get support user roles
 */
export function getSupportUserRoles(): string[] {
  return Object.values(USER_ROLE).filter((role) => isUserRoleSupport(role));
}

/**
 * Get technical user roles
 */
export function getTechnicalUserRoles(): string[] {
  return Object.values(USER_ROLE).filter((role) => isUserRoleTechnical(role));
}

/**
 * Get roles by category
 */
export function getUserRolesByCategory(category: string): string[] {
  return Object.keys(USER_ROLE_CATEGORY_MAP).filter(
    (key) => USER_ROLE_CATEGORY_MAP[key] === category
  );
}

/**
 * Get highest privilege role from list
 */
export function getHighestUserRole(roles: string[]): string | null {
  if (roles.length === 0) return null;

  return roles.reduce((highest, current) => {
    return getUserRoleLevel(current) < getUserRoleLevel(highest) ? current : highest;
  });
}

/**
 * Get lowest privilege role from list
 */
export function getLowestUserRole(roles: string[]): string | null {
  if (roles.length === 0) return null;

  return roles.reduce((lowest, current) => {
    return getUserRoleLevel(current) > getUserRoleLevel(lowest) ? current : lowest;
  });
}

/**
 * Check if role can access resource
 * @param role User role
 * @param requiredRole Minimum required role
 */
export function canUserRoleAccess(role: string, requiredRole: string): boolean {
  return getUserRoleLevel(role) <= getUserRoleLevel(requiredRole);
}

/**
 * Check if role is system role (non-user)
 */
export function isUserRoleSystem(role: string): boolean {
  const systemRoles: string[] = [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.MANAGER];
  return systemRoles.includes(role);
}

/**
 * Check if role is regular user role
 */
export function isUserRoleRegular(role: string): boolean {
  const regularRoles: string[] = [USER_ROLE.USER, USER_ROLE.GUEST];
  return regularRoles.includes(role);
}

/**
 * Role priority mapping for sorting
 */
export const USER_ROLE_PRIORITY: Record<string, number> = {
  [USER_ROLE.SUPER_ADMIN]: 1,
  [USER_ROLE.ADMIN]: 2,
  [USER_ROLE.MANAGER]: 3,
  [USER_ROLE.MODERATOR]: 4,
  [USER_ROLE.SUPPORT]: 5,
  [USER_ROLE.AUDITOR]: 6,
  [USER_ROLE.DEVELOPER]: 7,
  [USER_ROLE.ANALYST]: 8,
  [USER_ROLE.CONTENT_CREATOR]: 9,
  [USER_ROLE.EDITOR]: 10,
  [USER_ROLE.REVIEWER]: 11,
  [USER_ROLE.USER]: 12,
  [USER_ROLE.GUEST]: 13,
};

/**
 * Get role priority
 */
export function getUserRolePriority(role: string): number {
  return USER_ROLE_PRIORITY[role] || 999;
}

/**
 * Sort roles by priority
 */
export function sortUserRolesByPriority(roles: string[]): string[] {
  return [...roles].sort((a, b) => {
    return (USER_ROLE_PRIORITY[a] || 999) - (USER_ROLE_PRIORITY[b] || 999);
  });
}

/**
 * Role transition validation
 */
export interface UserRoleTransition {
  from: string;
  to: string;
  allowed: boolean;
}

/**
 * Common user role transitions
 */
export const COMMON_USER_ROLE_TRANSITIONS: UserRoleTransition[] = [
  // Guest to User
  { from: USER_ROLE.GUEST, to: USER_ROLE.USER, allowed: true },

  // User to higher roles
  { from: USER_ROLE.USER, to: USER_ROLE.CONTENT_CREATOR, allowed: true },
  { from: USER_ROLE.USER, to: USER_ROLE.SUPPORT, allowed: true },
  { from: USER_ROLE.USER, to: USER_ROLE.ANALYST, allowed: true },

  // Content roles
  { from: USER_ROLE.CONTENT_CREATOR, to: USER_ROLE.EDITOR, allowed: true },
  { from: USER_ROLE.CONTENT_CREATOR, to: USER_ROLE.REVIEWER, allowed: true },
  { from: USER_ROLE.EDITOR, to: USER_ROLE.REVIEWER, allowed: true },
  { from: USER_ROLE.REVIEWER, to: USER_ROLE.MODERATOR, allowed: true },

  // Support roles
  { from: USER_ROLE.SUPPORT, to: USER_ROLE.MODERATOR, allowed: true },
  { from: USER_ROLE.SUPPORT, to: USER_ROLE.MANAGER, allowed: true },

  // Technical roles
  { from: USER_ROLE.ANALYST, to: USER_ROLE.DEVELOPER, allowed: true },
  { from: USER_ROLE.DEVELOPER, to: USER_ROLE.MANAGER, allowed: true },

  // Management roles
  { from: USER_ROLE.MODERATOR, to: USER_ROLE.MANAGER, allowed: true },
  { from: USER_ROLE.MANAGER, to: USER_ROLE.ADMIN, allowed: true },

  // Admin roles
  { from: USER_ROLE.ADMIN, to: USER_ROLE.SUPER_ADMIN, allowed: true },

  // Demotions (explicitly allowed)
  { from: USER_ROLE.SUPER_ADMIN, to: USER_ROLE.ADMIN, allowed: true },
  { from: USER_ROLE.ADMIN, to: USER_ROLE.MANAGER, allowed: true },
  { from: USER_ROLE.MANAGER, to: USER_ROLE.USER, allowed: true },
  { from: USER_ROLE.EDITOR, to: USER_ROLE.CONTENT_CREATOR, allowed: true },
  { from: USER_ROLE.MODERATOR, to: USER_ROLE.SUPPORT, allowed: true },
  { from: USER_ROLE.DEVELOPER, to: USER_ROLE.ANALYST, allowed: true },
];

/**
 * Get allowed next user roles
 */
export function getAllowedNextUserRoles(
  currentRole: string,
  allowedTransitions: UserRoleTransition[] = COMMON_USER_ROLE_TRANSITIONS
): string[] {
  return allowedTransitions.filter((t) => t.from === currentRole && t.allowed).map((t) => t.to);
}

/**
 * Check if user role transition is allowed
 */
export function canUserRoleTransitionTo(
  currentRole: string,
  nextRole: string,
  allowedTransitions: UserRoleTransition[] = COMMON_USER_ROLE_TRANSITIONS
): boolean {
  return allowedTransitions.some((t) => t.from === currentRole && t.to === nextRole && t.allowed);
}

/**
 * Validate user role transition
 */
export function validateUserRoleTransition(
  currentRole: string,
  nextRole: string,
  allowedTransitions: UserRoleTransition[] = COMMON_USER_ROLE_TRANSITIONS
): { valid: boolean; message: string } {
  const isValid = canUserRoleTransitionTo(currentRole, nextRole, allowedTransitions);

  if (isValid) {
    return {
      valid: true,
      message: `Transition from ${currentRole} to ${nextRole} is allowed`,
    };
  }

  return {
    valid: false,
    message: `Transition from ${currentRole} to ${nextRole} is not allowed`,
  };
}

/**
 * Check if role is assignable
 */
export function isUserRoleAssignable(role: string): boolean {
  const unassignableRoles: string[] = [USER_ROLE.SUPER_ADMIN, USER_ROLE.GUEST];
  return !unassignableRoles.includes(role);
}

/**
 * Get assignable roles
 */
export function getAssignableUserRoles(): string[] {
  return Object.values(USER_ROLE).filter((role) => isUserRoleAssignable(role));
}

/**
 * Check if role is default role for new users
 */
export function isUserRoleDefault(role: string): boolean {
  return role === USER_ROLE.USER;
}
