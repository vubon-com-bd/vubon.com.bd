/**
 * Auth Namespace Constants
 * @module shared-constants/auth/auth.constants
 *
 * Note: This is a namespace aggregator that references sibling auth
 * constant modules. It does NOT spread — only direct references.
 */

import { AUTH_STATUS } from './auth-status.constants';
import { AUTH_ROLES } from './auth-role.constants';
import { AUTH_PERMISSIONS } from './auth-permission.constants';
import { AUTH_SESSION } from './auth-session.constants';
import { AUTH_DEVICE } from './auth-device.constants';

export const AUTH = {
  STATUS: AUTH_STATUS,
  ROLES: AUTH_ROLES,
  PERMISSIONS: AUTH_PERMISSIONS,
  SESSION: AUTH_SESSION,
  DEVICE: AUTH_DEVICE,
} as const;
