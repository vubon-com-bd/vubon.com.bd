/**
 * Auth Permission Constants
 * @module shared-constants/auth/auth-permission
 *
 * Note: Does NOT spread COMMON_PERMISSIONS — that would copy ~100 permissions
 * into this enum. Only auth-specific permissions are defined here.
 * Full permission list lives in common/permissions.constants.
 */

import { PERMISSIONS as COMMON_PERMISSIONS } from '../common/permissions.constants';

export const AUTH_PERMISSIONS = {
  // Auth-specific permissions
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_REFRESH: 'auth:refresh',
  AUTH_VERIFY: 'auth:verify',

  // Wildcard referenced from common
  ALL: COMMON_PERMISSIONS.ALL,
} as const;

export type AuthPermissionValue =
  (typeof AUTH_PERMISSIONS)[keyof typeof AUTH_PERMISSIONS];
