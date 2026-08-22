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

// রিনেম করা কনস্ট্যান্ট (AUTH_ প্রিফিক্স যোগ করা হয়েছে)
export const AUTH_ADMIN_ROLES: AuthRole[] = [
  AUTH_ROLE.SYSTEM_ADMIN,
  AUTH_ROLE.SYSTEM_DEVELOPER,
  AUTH_ROLE.SUPER_ADMIN,
  AUTH_ROLE.ADMIN,
  AUTH_ROLE.SUB_ADMIN,
  AUTH_ROLE.CONTENT_MANAGER,
  AUTH_ROLE.CATEGORY_MANAGER,
];

export const AUTH_USER_ROLES: AuthRole[] = [
  AUTH_ROLE.USER,
  AUTH_ROLE.VERIFIED_USER,
  AUTH_ROLE.PREMIUM_USER,
  AUTH_ROLE.VIP_USER,
];

export const AUTH_VENDOR_ROLES: AuthRole[] = [
  AUTH_ROLE.VENDOR,
  AUTH_ROLE.PREMIUM_VENDOR,
  AUTH_ROLE.VERIFIED_VENDOR,
];

export const AUTH_SUPPORT_ROLES: AuthRole[] = [
  AUTH_ROLE.SUPPORT_AGENT,
  AUTH_ROLE.SUPPORT_SUPERVISOR,
  AUTH_ROLE.SUPPORT_MANAGER,
];

export const AUTH_MARKETING_ROLES: AuthRole[] = [AUTH_ROLE.MARKETING_AGENT, AUTH_ROLE.MARKETING_MANAGER];

export const AUTH_ANALYTICS_ROLES: AuthRole[] = [
  AUTH_ROLE.ANALYTICS_VIEWER,
  AUTH_ROLE.ANALYTICS_MANAGER,
];

export const AUTH_GUEST_ROLES: AuthRole[] = [AUTH_ROLE.GUEST, AUTH_ROLE.UNVERIFIED_USER];

export const AUTH_SYSTEM_ROLES: AuthRole[] = [AUTH_ROLE.SYSTEM_ADMIN, AUTH_ROLE.SYSTEM_DEVELOPER];

export const AUTH_PRIVILEGED_ROLES: AuthRole[] = [
  ...AUTH_ADMIN_ROLES,
  ...AUTH_SUPPORT_ROLES,
  ...AUTH_MARKETING_ROLES,
  ...AUTH_ANALYTICS_ROLES,
];

export const AUTH_PUBLIC_ROLES: AuthRole[] = [...AUTH_USER_ROLES, ...AUTH_GUEST_ROLES];

// ফাংশনগুলোর নামে Auth প্রিফিক্স যোগ করা হয়েছে
export function isAuthAdminRole(role: AuthRole): boolean {
  return AUTH_ADMIN_ROLES.includes(role);
}

export function isAuthUserRole(role: AuthRole): boolean {
  return AUTH_USER_ROLES.includes(role);
}

export function isAuthVendorRole(role: AuthRole): boolean {
  return AUTH_VENDOR_ROLES.includes(role);
}

export function isAuthSupportRole(role: AuthRole): boolean {
  return AUTH_SUPPORT_ROLES.includes(role);
}

export function isAuthMarketingRole(role: AuthRole): boolean {
  return AUTH_MARKETING_ROLES.includes(role);
}

export function isAuthAnalyticsRole(role: AuthRole): boolean {
  return AUTH_ANALYTICS_ROLES.includes(role);
}

export function isAuthGuestRole(role: AuthRole): boolean {
  return AUTH_GUEST_ROLES.includes(role);
}

export function isAuthSystemRole(role: AuthRole): boolean {
  return AUTH_SYSTEM_ROLES.includes(role);
}

export function isAuthPrivilegedRole(role: AuthRole): boolean {
  return AUTH_PRIVILEGED_ROLES.includes(role);
}

export function isAuthPublicRole(role: AuthRole): boolean {
  return AUTH_PUBLIC_ROLES.includes(role);
}

export function getAuthRoleLabel(role: AuthRole): string {
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

export function getAuthRoleLevel(role: AuthRole): number {
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

export function hasAuthSufficientRole(userRole: AuthRole, requiredRole: AuthRole): boolean {
  return getAuthRoleLevel(userRole) >= getAuthRoleLevel(requiredRole);
}
