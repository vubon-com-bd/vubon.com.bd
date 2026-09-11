/**
 * Auth Password Constants
 * @module shared-constants/auth/auth-password.constants
 *
 * Password policy is derived from SECURITY.PASSWORD (single source of truth).
 */

import { SECURITY } from '../common/security.constants';

export const AUTH_PASSWORD = {
  ...SECURITY.PASSWORD,
} as const;

export type AuthPasswordPolicy = typeof AUTH_PASSWORD;
export type AuthPassword = AuthPasswordPolicy;
