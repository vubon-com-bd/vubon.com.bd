/**
 * Admin Main Constants
 * @module shared-constants/admin/admin.constants
 */

import { STATUS } from '../common/status.constants';
import { ROLES } from '../common/roles.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { SESSION } from '../common/session.constants';
import { DEVICE } from '../common/device.constants';

export const ADMIN = {
  // Admin status from common
  STATUS: STATUS,

  // Admin roles from common
  ROLES: ROLES,

  // Admin permissions from common
  PERMISSIONS: PERMISSIONS,

  // Admin session from common
  SESSION: SESSION,

  // Admin device from common
  DEVICE: DEVICE,

  // Admin specific
  DEFAULT_ADMIN_TYPE: 'super_admin',
  DEFAULT_ADMIN_STATUS: 'active',
  MAX_ADMIN_SESSIONS: 3,
  ADMIN_SESSION_TIMEOUT: 28800, // 8 hours
  ADMIN_IDLE_TIMEOUT: 1800, // 30 minutes
  ADMIN_LOGIN_ATTEMPTS: 3,
  ADMIN_LOCKOUT_DURATION: 900, // 15 minutes
  ADMIN_PASSWORD_EXPIRY_DAYS: 90,
  ADMIN_MFA_REQUIRED: true,
  ADMIN_IP_WHITELIST_ENABLED: false,
} as const;

// Use different type names to avoid conflicts
export type AdminStatus = (typeof STATUS)[keyof typeof STATUS];
export type AdminRole = (typeof ROLES)[keyof typeof ROLES];
export type AdminPermission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
export type AdminSession = (typeof SESSION)[keyof typeof SESSION];
export type AdminDevice = (typeof DEVICE)[keyof typeof DEVICE];
