/**
 * Vendor Team Constants
 * ভেন্ডর টিম সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const VENDOR_TEAM = {
  // Team status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    PENDING: STATUS.PENDING,
    SUSPENDED: STATUS.SUSPENDED,
    DELETED: STATUS.DELETED,
  },

  // Team roles
  ROLES: {
    OWNER: 'owner',
    ADMIN: 'admin',
    MANAGER: 'manager',
    EDITOR: 'editor',
    VIEWER: 'viewer',
    ACCOUNTANT: 'accountant',
    SUPPORT: 'support',
  },

  // Team permissions
  PERMISSIONS: {
    FULL_ACCESS: 'full_access',
    PRODUCT_MANAGEMENT: 'product_management',
    ORDER_MANAGEMENT: 'order_management',
    PAYMENT_MANAGEMENT: 'payment_management',
    ANALYTICS_VIEW: 'analytics_view',
    SETTINGS_MANAGEMENT: 'settings_management',
    TEAM_MANAGEMENT: 'team_management',
    READ_ONLY: 'read_only',
  },

  // Default values
  DEFAULTS: {
    MAX_MEMBERS: 10,
    MIN_MEMBERS: 1,
  },
} as const;

export type VendorTeamStatus = (typeof VENDOR_TEAM.STATUS)[keyof typeof VENDOR_TEAM.STATUS];
export type VendorTeamRole = (typeof VENDOR_TEAM.ROLES)[keyof typeof VENDOR_TEAM.ROLES];
export type VendorTeamPermission =
  (typeof VENDOR_TEAM.PERMISSIONS)[keyof typeof VENDOR_TEAM.PERMISSIONS];
