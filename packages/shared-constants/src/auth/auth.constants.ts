/**
 * Auth Main Constants
 * @module shared-constants/auth/auth.constants
 */

import { STATUS } from '../common/status.constants';
import { ROLES } from '../common/roles.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { SESSION } from '../common/session.constants';
import { DEVICE } from '../common/device.constants';

// Re-export common constants
export const AUTH = {
  // Auth status from common
  STATUS: STATUS,

  // Auth roles from common
  ROLES: ROLES,

  // Auth permissions from common
  PERMISSIONS: PERMISSIONS,

  // Auth session from common
  SESSION: SESSION,

  // Auth device from common
  DEVICE: DEVICE,

  // Auth specific
  DEFAULT_AUTH_PROVIDER: 'local',
  DEFAULT_AUTH_METHOD: 'password',
  MAX_AUTH_ATTEMPTS: 5,
  AUTH_TOKEN_PREFIX: 'Bearer',
  AUTH_HEADER_NAME: 'Authorization',
  AUTH_REFRESH_HEADER_NAME: 'X-Refresh-Token',
  AUTH_SESSION_HEADER_NAME: 'X-Session-ID',
} as const;

// Export types from common
export type AuthCommonStatus = (typeof STATUS)[keyof typeof STATUS];
export type AuthCommonRole = (typeof ROLES)[keyof typeof ROLES];
export type AuthCommonPermission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
export type AuthCommonSession = (typeof SESSION)[keyof typeof SESSION];
export type AuthCommonDevice = (typeof DEVICE)[keyof typeof DEVICE];
