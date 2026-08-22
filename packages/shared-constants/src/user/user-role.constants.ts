/**
 * User Role Constants
 * Defines all possible user roles and their permissions
 */

export const USER_ROLE = {
  // Customer roles
  CUSTOMER: 'customer',
  PREMIUM_CUSTOMER: 'premium-customer',
  VIP_CUSTOMER: 'vip-customer',

  // Staff roles
  SALES_AGENT: 'sales-agent',
  SUPPORT_AGENT: 'support-agent',
  CONTENT_MANAGER: 'content-manager',

  // Management roles
  TEAM_LEADER: 'team-leader',
  DEPARTMENT_HEAD: 'department-head',
  GENERAL_MANAGER: 'general-manager',

  // Admin roles
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
  SYSTEM_ADMIN: 'system-admin',

  // Vendor roles
  VENDOR: 'vendor',
  VENDOR_ADMIN: 'vendor-admin',
  VENDOR_EMPLOYEE: 'vendor-employee',

  // Special roles
  AFFILIATE: 'affiliate',
  WHOLESALER: 'wholesaler',
  DISTRIBUTOR: 'distributor',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLE.CUSTOMER]: 'Customer',
  [USER_ROLE.PREMIUM_CUSTOMER]: 'Premium Customer',
  [USER_ROLE.VIP_CUSTOMER]: 'VIP Customer',
  [USER_ROLE.SALES_AGENT]: 'Sales Agent',
  [USER_ROLE.SUPPORT_AGENT]: 'Support Agent',
  [USER_ROLE.CONTENT_MANAGER]: 'Content Manager',
  [USER_ROLE.TEAM_LEADER]: 'Team Leader',
  [USER_ROLE.DEPARTMENT_HEAD]: 'Department Head',
  [USER_ROLE.GENERAL_MANAGER]: 'General Manager',
  [USER_ROLE.ADMIN]: 'Administrator',
  [USER_ROLE.SUPER_ADMIN]: 'Super Administrator',
  [USER_ROLE.SYSTEM_ADMIN]: 'System Administrator',
  [USER_ROLE.VENDOR]: 'Vendor',
  [USER_ROLE.VENDOR_ADMIN]: 'Vendor Admin',
  [USER_ROLE.VENDOR_EMPLOYEE]: 'Vendor Employee',
  [USER_ROLE.AFFILIATE]: 'Affiliate',
  [USER_ROLE.WHOLESALER]: 'Wholesaler',
  [USER_ROLE.DISTRIBUTOR]: 'Distributor',
};

export const USER_ROLE_PRIORITY: Record<UserRole, number> = {
  [USER_ROLE.CUSTOMER]: 1,
  [USER_ROLE.PREMIUM_CUSTOMER]: 2,
  [USER_ROLE.VIP_CUSTOMER]: 3,
  [USER_ROLE.AFFILIATE]: 2,
  [USER_ROLE.WHOLESALER]: 3,
  [USER_ROLE.DISTRIBUTOR]: 3,
  [USER_ROLE.VENDOR_EMPLOYEE]: 4,
  [USER_ROLE.VENDOR]: 5,
  [USER_ROLE.VENDOR_ADMIN]: 6,
  [USER_ROLE.SALES_AGENT]: 4,
  [USER_ROLE.SUPPORT_AGENT]: 4,
  [USER_ROLE.CONTENT_MANAGER]: 5,
  [USER_ROLE.TEAM_LEADER]: 6,
  [USER_ROLE.DEPARTMENT_HEAD]: 7,
  [USER_ROLE.GENERAL_MANAGER]: 8,
  [USER_ROLE.ADMIN]: 7,
  [USER_ROLE.SYSTEM_ADMIN]: 8,
  [USER_ROLE.SUPER_ADMIN]: 9,
};

export const CUSTOMER_ROLES: UserRole[] = [
  USER_ROLE.CUSTOMER,
  USER_ROLE.PREMIUM_CUSTOMER,
  USER_ROLE.VIP_CUSTOMER,
];

export const STAFF_ROLES: UserRole[] = [
  USER_ROLE.SALES_AGENT,
  USER_ROLE.SUPPORT_AGENT,
  USER_ROLE.CONTENT_MANAGER,
  USER_ROLE.TEAM_LEADER,
  USER_ROLE.DEPARTMENT_HEAD,
];

export const ADMIN_ROLES: UserRole[] = [
  USER_ROLE.ADMIN,
  USER_ROLE.SUPER_ADMIN,
  USER_ROLE.SYSTEM_ADMIN,
  USER_ROLE.GENERAL_MANAGER,
];

export const VENDOR_ROLES: UserRole[] = [
  USER_ROLE.VENDOR,
  USER_ROLE.VENDOR_ADMIN,
  USER_ROLE.VENDOR_EMPLOYEE,
];

export const MANAGEMENT_ROLES: UserRole[] = [
  USER_ROLE.TEAM_LEADER,
  USER_ROLE.DEPARTMENT_HEAD,
  USER_ROLE.GENERAL_MANAGER,
];

export function isCustomer(role: UserRole): boolean {
  return CUSTOMER_ROLES.includes(role);
}

export function isStaff(role: UserRole): boolean {
  return STAFF_ROLES.includes(role);
}

export function isAdminRole(role: UserRole): boolean {
  return ADMIN_ROLES.includes(role);
}

export function isVendor(role: UserRole): boolean {
  return VENDOR_ROLES.includes(role);
}

export function isManagement(role: UserRole): boolean {
  return MANAGEMENT_ROLES.includes(role);
}

export function getRolePriority(role: UserRole): number {
  return USER_ROLE_PRIORITY[role] || 0;
}

export function hasHigherPriority(role1: UserRole, role2: UserRole): boolean {
  return getRolePriority(role1) > getRolePriority(role2);
}

export function getUserRoleLabel(role: UserRole): string {
  return USER_ROLE_LABELS[role] || 'Unknown';
}
