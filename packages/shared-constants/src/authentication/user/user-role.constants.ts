// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User role enum
 */
export const USER_ROLE = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  SELLER: 'seller',
  CUSTOMER: 'customer',
  MODERATOR: 'moderator',
  SUPPORT: 'support',
  DEVELOPER: 'developer',
  GUEST: 'guest',
} as const;

/**
 * Super admin role (can do everything)
 */
export const USER_ROLE_SUPER_ADMIN = USER_ROLE.SUPER_ADMIN;

/**
 * Admin role (can do almost everything)
 */
export const USER_ROLE_ADMIN = USER_ROLE.ADMIN;

/**
 * Manager role (specific areas)
 */
export const USER_ROLE_MANAGER = USER_ROLE.MANAGER;

/**
 * Seller role (can sell products)
 */
export const USER_ROLE_SELLER = USER_ROLE.SELLER;

/**
 * Customer role (can buy products)
 */
export const USER_ROLE_CUSTOMER = USER_ROLE.CUSTOMER;

/**
 * Moderator role (moderates content)
 */
export const USER_ROLE_MODERATOR = USER_ROLE.MODERATOR;

/**
 * Support role (customer support)
 */
export const USER_ROLE_SUPPORT = USER_ROLE.SUPPORT;

/**
 * Developer role (API access)
 */
export const USER_ROLE_DEVELOPER = USER_ROLE.DEVELOPER;

/**
 * Guest role (limited access)
 */
export const USER_ROLE_GUEST = USER_ROLE.GUEST;

/**
 * Type for user role
 */
export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
