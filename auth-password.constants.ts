/**
 * Auth Password Constants
 * @module shared-constants/auth/auth-password.constants
 *
 * Password policy is derived from SECURITY.PASSWORD (single source of truth).
 * We reference the object directly instead of spreading, so any change in
 * SECURITY.PASSWORD automatically propagates — no copy-drift possible.
 */

import { SECURITY } from '../common/security.constants';

// Direct reference — true single source of truth
export const AUTH_PASSWORD = SECURITY.PASSWORD;

export type AuthPasswordPolicy = typeof AUTH_PASSWORD;
