/**
 * Authentication Role Constants
 * Role definitions for access control and authorization
 */

/**
 * User Roles
 * All available roles in the platform
 */
export const USER_ROLES = {
  /** Super Administrator - Full system access */
  SUPER_ADMIN: 'super_admin',
  /** Administrator - Platform management access */
  ADMIN: 'admin',
  /** Vendor Manager - Manage vendors and their operations */
  VENDOR_MANAGER: 'vendor_manager',
  /** Vendor - Sell products on the platform */
  VENDOR: 'vendor',
  /** Customer Support - Handle customer inquiries */
  SUPPORT: 'support',
  /** Content Manager - Manage content and pages */
  CONTENT_MANAGER: 'content_manager',
  /** Marketing Manager - Manage campaigns and promotions */
  MARKETING_MANAGER: 'marketing_manager',
  /** Logistics Manager - Manage shipping and deliveries */
  LOGISTICS_MANAGER: 'logistics_manager',
  /** Finance Manager - Manage payments and finances */
  FINANCE_MANAGER: 'finance_manager',
  /** Analytics Manager - Manage analytics and reports */
  ANALYTICS_MANAGER: 'analytics_manager',
  /** Developer - API and system integration access */
  DEVELOPER: 'developer',
  /** Customer - Regular platform user */
  CUSTOMER: 'customer',
  /** Guest - Unauthenticated user */
  GUEST: 'guest',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * Role Display Names
 * Human-readable names for each role
 */
export const USER_ROLE_NAMES: Record<UserRole, string> = {
  [USER_ROLES.SUPER_ADMIN]: 'Super Administrator',
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.VENDOR_MANAGER]: 'Vendor Manager',
  [USER_ROLES.VENDOR]: 'Vendor',
  [USER_ROLES.SUPPORT]: 'Customer Support',
  [USER_ROLES.CONTENT_MANAGER]: 'Content Manager',
  [USER_ROLES.MARKETING_MANAGER]: 'Marketing Manager',
  [USER_ROLES.LOGISTICS_MANAGER]: 'Logistics Manager',
  [USER_ROLES.FINANCE_MANAGER]: 'Finance Manager',
  [USER_ROLES.ANALYTICS_MANAGER]: 'Analytics Manager',
  [USER_ROLES.DEVELOPER]: 'Developer',
  [USER_ROLES.CUSTOMER]: 'Customer',
  [USER_ROLES.GUEST]: 'Guest',
} as const;

/**
 * Role Descriptions
 * Detailed descriptions for each role
 */
export const USER_ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  [USER_ROLES.SUPER_ADMIN]: 'Has full access to all system features and configurations',
  [USER_ROLES.ADMIN]: 'Has access to platform management and administrative features',
  [USER_ROLES.VENDOR_MANAGER]: 'Manages vendors, their products, and commission settings',
  [USER_ROLES.VENDOR]: 'Sells products on the platform and manages their store',
  [USER_ROLES.SUPPORT]: 'Handles customer inquiries, support tickets, and complaints',
  [USER_ROLES.CONTENT_MANAGER]: 'Manages website content, pages, and media',
  [USER_ROLES.MARKETING_MANAGER]: 'Manages campaigns, promotions, and marketing activities',
  [USER_ROLES.LOGISTICS_MANAGER]: 'Manages shipping, delivery, and logistics operations',
  [USER_ROLES.FINANCE_MANAGER]: 'Manages payments, refunds, and financial reports',
  [USER_ROLES.ANALYTICS_MANAGER]: 'Manages analytics, reports, and data insights',
  [USER_ROLES.DEVELOPER]: 'Has API access for system integration and development',
  [USER_ROLES.CUSTOMER]: 'Regular platform user with shopping capabilities',
  [USER_ROLES.GUEST]: 'Unauthenticated user with limited access',
} as const;

/**
 * Role Hierarchy
 * Defines the hierarchical order of roles (higher number = higher privilege)
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [USER_ROLES.SUPER_ADMIN]: 100,
  [USER_ROLES.ADMIN]: 90,
  [USER_ROLES.VENDOR_MANAGER]: 80,
  [USER_ROLES.FINANCE_MANAGER]: 75,
  [USER_ROLES.LOGISTICS_MANAGER]: 70,
  [USER_ROLES.MARKETING_MANAGER]: 65,
  [USER_ROLES.CONTENT_MANAGER]: 60,
  [USER_ROLES.ANALYTICS_MANAGER]: 55,
  [USER_ROLES.VENDOR]: 50,
  [USER_ROLES.SUPPORT]: 45,
  [USER_ROLES.DEVELOPER]: 40,
  [USER_ROLES.CUSTOMER]: 10,
  [USER_ROLES.GUEST]: 0,
} as const;

/**
 * Admin Roles
 * Roles that have administrative privileges
 */
export const ADMIN_ROLES: UserRole[] = [
  USER_ROLES.SUPER_ADMIN,
  USER_ROLES.ADMIN,
  USER_ROLES.VENDOR_MANAGER,
  USER_ROLES.FINANCE_MANAGER,
  USER_ROLES.LOGISTICS_MANAGER,
  USER_ROLES.MARKETING_MANAGER,
  USER_ROLES.CONTENT_MANAGER,
  USER_ROLES.ANALYTICS_MANAGER,
] as const;

/**
 * Staff Roles
 * Roles that are platform staff members
 */
export const STAFF_ROLES: UserRole[] = [
  USER_ROLES.SUPER_ADMIN,
  USER_ROLES.ADMIN,
  USER_ROLES.VENDOR_MANAGER,
  USER_ROLES.SUPPORT,
  USER_ROLES.CONTENT_MANAGER,
  USER_ROLES.MARKETING_MANAGER,
  USER_ROLES.LOGISTICS_MANAGER,
  USER_ROLES.FINANCE_MANAGER,
  USER_ROLES.ANALYTICS_MANAGER,
  USER_ROLES.DEVELOPER,
] as const;

/**
 * Management Roles
 * Roles that have management responsibilities
 */
export const MANAGEMENT_ROLES: UserRole[] = [
  USER_ROLES.SUPER_ADMIN,
  USER_ROLES.ADMIN,
  USER_ROLES.VENDOR_MANAGER,
  USER_ROLES.FINANCE_MANAGER,
  USER_ROLES.LOGISTICS_MANAGER,
  USER_ROLES.MARKETING_MANAGER,
  USER_ROLES.CONTENT_MANAGER,
  USER_ROLES.ANALYTICS_MANAGER,
] as const;

/**
 * Business Roles
 * Roles related to business operations
 */
export const BUSINESS_ROLES: UserRole[] = [USER_ROLES.VENDOR, USER_ROLES.CUSTOMER] as const;

/**
 * Default Role
 * Default role assigned to new users
 */
export const DEFAULT_ROLE: UserRole = USER_ROLES.CUSTOMER;

/**
 * Guest Role
 * Role assigned to unauthenticated users
 */
export const GUEST_ROLE: UserRole = USER_ROLES.GUEST;

/**
 * Role-based Default Permissions
 * Default permissions for each role
 */
export const ROLE_DEFAULT_PERMISSIONS: Partial<Record<UserRole, string[]>> = {
  [USER_ROLES.SUPER_ADMIN]: ['*'],
  [USER_ROLES.ADMIN]: ['view:*', 'create:*', 'update:*', 'delete:*', 'manage:*'],
  [USER_ROLES.VENDOR_MANAGER]: [
    'view:vendors',
    'create:vendors',
    'update:vendors',
    'delete:vendors',
    'verify:vendors',
    'manage:commissions',
    'view:all-products',
    'view:all-orders',
  ],
  [USER_ROLES.VENDOR]: [
    'view:profile',
    'update:profile',
    'view:products',
    'create:products',
    'update:products',
    'delete:products',
    'manage:inventory',
    'view:orders',
    'update:orders',
    'view:payments',
    'view:reviews',
    'manage:shipping',
  ],
  [USER_ROLES.SUPPORT]: [
    'view:tickets',
    'create:tickets',
    'update:tickets',
    'close:tickets',
    'view:all-tickets',
    'manage:tickets',
    'view:users',
    'view:orders',
  ],
  [USER_ROLES.CONTENT_MANAGER]: [
    'manage:content',
    'manage:pages',
    'manage:media',
    'manage:seo',
    'manage:themes',
    'view:analytics',
  ],
  [USER_ROLES.MARKETING_MANAGER]: [
    'manage:campaigns',
    'manage:promotions',
    'manage:coupons',
    'view:analytics',
    'generate:reports',
    'send:notifications',
  ],
  [USER_ROLES.LOGISTICS_MANAGER]: [
    'manage:shipping',
    'manage:inventory',
    'track:shipments',
    'view:orders',
    'update:orders',
  ],
  [USER_ROLES.FINANCE_MANAGER]: [
    'view:payments',
    'view:all-payments',
    'process:refunds',
    'manage:taxes',
    'manage:gateways',
    'generate:reports',
    'export:all-data',
  ],
  [USER_ROLES.ANALYTICS_MANAGER]: [
    'view:all-analytics',
    'generate:reports',
    'export:all-data',
    'view:logs',
    'view:audit',
  ],
  [USER_ROLES.DEVELOPER]: [
    'view:profile',
    'update:profile',
    'view:orders',
    'view:payments',
    'view:products',
    'view:users',
    'manage:api-keys',
    'manage:webhooks',
    'manage:integrations',
  ],
  [USER_ROLES.CUSTOMER]: [
    'view:profile',
    'update:profile',
    'view:orders',
    'create:orders',
    'view:payments',
    'create:payments',
    'view:cart',
    'update:cart',
    'clear:cart',
    'view:wishlist',
    'update:wishlist',
    'view:reviews',
    'create:reviews',
    'update:reviews',
    'delete:reviews',
    'view:addresses',
    'create:addresses',
    'update:addresses',
    'delete:addresses',
    'view:devices',
    'remove:devices',
    'view:notifications',
    'read:notifications',
    'delete:notifications',
    'use:promo-codes',
    'view:loyalty',
    'redeem:loyalty',
    'view:tickets',
    'create:tickets',
    'update:tickets',
    'close:tickets',
  ],
  [USER_ROLES.GUEST]: ['view:products', 'view:categories', 'view:brands', 'view:reviews'],
} as const;

/**
 * Role Priority
 * Higher priority roles can manage lower priority roles
 */
export const ROLE_PRIORITY: Record<UserRole, number> = {
  [USER_ROLES.SUPER_ADMIN]: 100,
  [USER_ROLES.ADMIN]: 90,
  [USER_ROLES.VENDOR_MANAGER]: 80,
  [USER_ROLES.FINANCE_MANAGER]: 75,
  [USER_ROLES.LOGISTICS_MANAGER]: 70,
  [USER_ROLES.MARKETING_MANAGER]: 65,
  [USER_ROLES.CONTENT_MANAGER]: 60,
  [USER_ROLES.ANALYTICS_MANAGER]: 55,
  [USER_ROLES.VENDOR]: 50,
  [USER_ROLES.SUPPORT]: 45,
  [USER_ROLES.DEVELOPER]: 40,
  [USER_ROLES.CUSTOMER]: 10,
  [USER_ROLES.GUEST]: 0,
} as const;

/**
 * Helper function to check if role exists
 */
export function isValidUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLES).includes(role as UserRole);
}

/**
 * Helper function to get role name
 */
export function getUserRoleName(role: UserRole): string {
  return USER_ROLE_NAMES[role] || 'Unknown Role';
}

/**
 * Helper function to get role description
 */
export function getUserRoleDescription(role: UserRole): string {
  return USER_ROLE_DESCRIPTIONS[role] || 'No description available';
}

/**
 * Helper function to check if role is admin
 */
export function isAdminRole(role: UserRole): boolean {
  return ADMIN_ROLES.includes(role);
}

/**
 * Helper function to check if role is staff
 */
export function isStaffRole(role: UserRole): boolean {
  return STAFF_ROLES.includes(role);
}

/**
 * Helper function to check if role is management
 */
export function isManagementRole(role: UserRole): boolean {
  return MANAGEMENT_ROLES.includes(role);
}

/**
 * Helper function to check if role is business
 */
export function isBusinessRole(role: UserRole): boolean {
  return BUSINESS_ROLES.includes(role);
}

/**
 * Helper function to get role hierarchy
 */
export function getRoleHierarchy(role: UserRole): number {
  return ROLE_HIERARCHY[role] || 0;
}

/**
 * Helper function to get role priority
 */
export function getRolePriority(role: UserRole): number {
  return ROLE_PRIORITY[role] || 0;
}

/**
 * Helper function to check if one role outranks another
 */
export function doesRoleOutrank(role1: UserRole, role2: UserRole): boolean {
  return getRoleHierarchy(role1) > getRoleHierarchy(role2);
}

/**
 * Helper function to get default permissions for role
 */
export function getDefaultPermissionsForRole(role: UserRole): string[] {
  return ROLE_DEFAULT_PERMISSIONS[role] || [];
}

/**
 * Helper function to get all assignable roles
 * Returns roles that can be assigned to users (excluding guest)
 */
export function getAssignableRoles(): UserRole[] {
  return Object.values(USER_ROLES).filter((role) => role !== USER_ROLES.GUEST);
}

/**
 * Helper function to get roles by hierarchy level
 */
export function getRolesByHierarchyLevel(level: number): UserRole[] {
  return Object.keys(ROLE_HIERARCHY)
    .filter((role) => ROLE_HIERARCHY[role as UserRole] === level)
    .map((role) => role as UserRole);
}

/**
 * Helper function to get roles with higher or equal priority
 */
export function getRolesWithHigherOrEqualPriority(role: UserRole): UserRole[] {
  const priority = getRolePriority(role);
  return Object.keys(ROLE_PRIORITY)
    .filter((r) => ROLE_PRIORITY[r as UserRole] >= priority)
    .map((r) => r as UserRole);
}
