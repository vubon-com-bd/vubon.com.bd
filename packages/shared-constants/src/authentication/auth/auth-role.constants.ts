// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Authentication role enum
 */
export const AUTH_ROLE = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  SELLER: 'seller',
  CUSTOMER: 'customer',
  GUEST: 'guest',
  MODERATOR: 'moderator',
} as const;

/**
 * Super administrator role
 */
export const SUPER_ADMIN = AUTH_ROLE.SUPER_ADMIN;

/**
 * Administrator role
 */
export const ADMIN = AUTH_ROLE.ADMIN;

/**
 * Seller role
 */
export const SELLER = AUTH_ROLE.SELLER;

/**
 * Customer role
 */
export const CUSTOMER = AUTH_ROLE.CUSTOMER;

/**
 * Guest role
 */
export const GUEST = AUTH_ROLE.GUEST;

/**
 * Moderator role
 */
export const MODERATOR = AUTH_ROLE.MODERATOR;

/**
 * Type for authentication role
 */
export type AuthRole = (typeof AUTH_ROLE)[keyof typeof AUTH_ROLE];
