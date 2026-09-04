/**
 * Admin Status Constants
 * অ্যাডমিন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../common';

export const ADMIN_STATUS = {
  ...STATUS,

  // Additional admin status
  LOCKED: 'locked',
  RESTRICTED: 'restricted',
  UNVERIFIED: 'unverified',
  VERIFIED: 'verified',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DELETED: 'deleted',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  OFFLINE: 'offline',
  ONLINE: 'online',
  AWAY: 'away',

  // Account status
  ACCOUNT_CREATED: 'account_created',
  ACCOUNT_ACTIVATED: 'account_activated',
  ACCOUNT_DEACTIVATED: 'account_deactivated',
  ACCOUNT_LOCKED: 'account_locked',
  ACCOUNT_UNLOCKED: 'account_unlocked',
  ACCOUNT_SUSPENDED: 'account_suspended',
  ACCOUNT_BANNED: 'account_banned',
  ACCOUNT_DELETED: 'account_deleted',
} as const;

export type AdminStatusType = (typeof ADMIN_STATUS)[keyof typeof ADMIN_STATUS];
