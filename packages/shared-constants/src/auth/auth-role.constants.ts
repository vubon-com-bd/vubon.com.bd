/**
 * Authentication Role Constants
 * Role definitions for access control
 */

export const AUTH_ROLE = {
  // System roles
  SYSTEM_ADMIN: 'system_admin',
  SYSTEM_DEVELOPER: 'system_developer',

  // Admin roles
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  SUB_ADMIN: 'sub_admin',
  CONTENT_MANAGER: 'content_manager',
  CATEGORY_MANAGER: 'category_manager',

  // User roles
  USER: 'user',
  VERIFIED_USER: 'verified_user',
  PREMIUM_USER: 'premium_user',
  VIP_USER: 'vip_user',

  // Vendor roles
  VENDOR: 'vendor',
  PREMIUM_VENDOR: 'premium_vendor',
  VERIFIED_VENDOR: 'verified_vendor',

  // Support roles
  SUPPORT_AGENT: 'support_agent',
  SUPPORT_SUPERVISOR: 'support_supervisor',
  SUPPORT_MANAGER: 'support_manager',

  // Marketing roles
  MARKETING_AGENT: 'marketing_agent',
  MARKETING_MANAGER: 'marketing_manager',

  // Analytics roles
  ANALYTICS_VIEWER: 'analytics_viewer',
  ANALYTICS_MANAGER: 'analytics_manager',

  // Guest roles
  GUEST: 'guest',
  UNVERIFIED_USER: 'unverified_user',
} as const;

export type AuthRole = (typeof AUTH_ROLE)[keyof typeof AUTH_ROLE];

export const ADMIN_ROLES: AuthRole[] = [
  AUTH_ROLE.SYSTEM_ADMIN,
  AUTH_ROLE.SYSTEM_DEVELOPER,
  AUTH_ROLE.SUPER_ADMIN,
  AUTH_ROLE.ADMIN,
  AUTH_ROLE.SUB_ADMIN,
  AUTH_ROLE.CONTENT_MANAGER,
  AUTH_ROLE.CATEGORY_MANAGER,
];

export const USER_ROLES: AuthRole[] = [
  AUTH_ROLE.USER,
  AUTH_ROLE.VERIFIED_USER,
  AUTH_ROLE.PREMIUM_USER,
  AUTH_ROLE.VIP_USER,
];

export const VENDOR_ROLES: AuthRole[] = [
  AUTH_ROLE.VENDOR,
  AUTH_ROLE.PREMIUM_VENDOR,
  AUTH_ROLE.VERIFIED_VENDOR,
];

export const SUPPORT_ROLES: AuthRole[] = [
  AUTH_ROLE.SUPPORT_AGENT,
  AUTH_ROLE.SUPPORT_SUPERVISOR,
  AUTH_ROLE.SUPPORT_MANAGER,
];

export const MARKETING_ROLES: AuthRole[] = [AUTH_ROLE.MARKETING_AGENT, AUTH_ROLE.MARKETING_MANAGER];

export const ANALYTICS_ROLES: AuthRole[] = [
  AUTH_ROLE.ANALYTICS_VIEWER,
  AUTH_ROLE.ANALYTICS_MANAGER,
];

export const GUEST_ROLES: AuthRole[] = [AUTH_ROLE.GUEST, AUTH_ROLE.UNVERIFIED_USER];

export const SYSTEM_ROLES: AuthRole[] = [AUTH_ROLE.SYSTEM_ADMIN, AUTH_ROLE.SYSTEM_DEVELOPER];

export const PRIVILEGED_ROLES: AuthRole[] = [
  ...ADMIN_ROLES,
  ...SUPPORT_ROLES,
  ...MARKETING_ROLES,
  ...ANALYTICS_ROLES,
];

export const PUBLIC_ROLES: AuthRole[] = [...USER_ROLES, ...GUEST_ROLES];

export function isAdminRole(role: AuthRole): boolean {
  return ADMIN_ROLES.includes(role);
}

export function isUserRole(role: AuthRole): boolean {
  return USER_ROLES.includes(role);
}

export function isVendorRole(role: AuthRole): boolean {
  return VENDOR_ROLES.includes(role);
}

export function isSupportRole(role: AuthRole): boolean {
  return SUPPORT_ROLES.includes(role);
}

export function isMarketingRole(role: AuthRole): boolean {
  return MARKETING_ROLES.includes(role);
}

export function isAnalyticsRole(role: AuthRole): boolean {
  return ANALYTICS_ROLES.includes(role);
}

export function isGuestRole(role: AuthRole): boolean {
  return GUEST_ROLES.includes(role);
}

export function isSystemRole(role: AuthRole): boolean {
  return SYSTEM_ROLES.includes(role);
}

export function isPrivilegedRole(role: AuthRole): boolean {
  return PRIVILEGED_ROLES.includes(role);
}

export function isPublicRole(role: AuthRole): boolean {
  return PUBLIC_ROLES.includes(role);
}

export function getRoleLabel(role: AuthRole): string {
  const labels: Record<AuthRole, string> = {
    [AUTH_ROLE.SYSTEM_ADMIN]: 'System Administrator',
    [AUTH_ROLE.SYSTEM_DEVELOPER]: 'System Developer',
    [AUTH_ROLE.SUPER_ADMIN]: 'Super Administrator',
    [AUTH_ROLE.ADMIN]: 'Administrator',
    [AUTH_ROLE.SUB_ADMIN]: 'Sub-Administrator',
    [AUTH_ROLE.CONTENT_MANAGER]: 'Content Manager',
    [AUTH_ROLE.CATEGORY_MANAGER]: 'Category Manager',
    [AUTH_ROLE.USER]: 'User',
    [AUTH_ROLE.VERIFIED_USER]: 'Verified User',
    [AUTH_ROLE.PREMIUM_USER]: 'Premium User',
    [AUTH_ROLE.VIP_USER]: 'VIP User',
    [AUTH_ROLE.VENDOR]: 'Vendor',
    [AUTH_ROLE.PREMIUM_VENDOR]: 'Premium Vendor',
    [AUTH_ROLE.VERIFIED_VENDOR]: 'Verified Vendor',
    [AUTH_ROLE.SUPPORT_AGENT]: 'Support Agent',
    [AUTH_ROLE.SUPPORT_SUPERVISOR]: 'Support Supervisor',
    [AUTH_ROLE.SUPPORT_MANAGER]: 'Support Manager',
    [AUTH_ROLE.MARKETING_AGENT]: 'Marketing Agent',
    [AUTH_ROLE.MARKETING_MANAGER]: 'Marketing Manager',
    [AUTH_ROLE.ANALYTICS_VIEWER]: 'Analytics Viewer',
    [AUTH_ROLE.ANALYTICS_MANAGER]: 'Analytics Manager',
    [AUTH_ROLE.GUEST]: 'Guest',
    [AUTH_ROLE.UNVERIFIED_USER]: 'Unverified User',
  };

  return labels[role] || 'Unknown Role';
}

export function getRoleLevel(role: AuthRole): number {
  const levels: Record<AuthRole, number> = {
    [AUTH_ROLE.SYSTEM_ADMIN]: 100,
    [AUTH_ROLE.SYSTEM_DEVELOPER]: 95,
    [AUTH_ROLE.SUPER_ADMIN]: 90,
    [AUTH_ROLE.ADMIN]: 80,
    [AUTH_ROLE.SUB_ADMIN]: 70,
    [AUTH_ROLE.SUPPORT_MANAGER]: 60,
    [AUTH_ROLE.SUPPORT_SUPERVISOR]: 55,
    [AUTH_ROLE.SUPPORT_AGENT]: 50,
    [AUTH_ROLE.CONTENT_MANAGER]: 45,
    [AUTH_ROLE.CATEGORY_MANAGER]: 40,
    [AUTH_ROLE.MARKETING_MANAGER]: 35,
    [AUTH_ROLE.MARKETING_AGENT]: 30,
    [AUTH_ROLE.ANALYTICS_MANAGER]: 30,
    [AUTH_ROLE.ANALYTICS_VIEWER]: 25,
    [AUTH_ROLE.VIP_USER]: 20,
    [AUTH_ROLE.PREMIUM_USER]: 15,
    [AUTH_ROLE.VERIFIED_USER]: 10,
    [AUTH_ROLE.VERIFIED_VENDOR]: 10,
    [AUTH_ROLE.PREMIUM_VENDOR]: 8,
    [AUTH_ROLE.VENDOR]: 5,
    [AUTH_ROLE.USER]: 3,
    [AUTH_ROLE.UNVERIFIED_USER]: 2,
    [AUTH_ROLE.GUEST]: 1,
  };

  return levels[role] || 0;
}

export function hasSufficientRole(userRole: AuthRole, requiredRole: AuthRole): boolean {
  return getRoleLevel(userRole) >= getRoleLevel(requiredRole);
}
