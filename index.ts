/**
 * Auth Constants — Barrel Export
 * @module shared-constants/auth
 *
 * Export order: base → dependency-free → cross-referencing.
 * Aggregator only — no logic, no spreads.
 */

// Base / dependency-free
export * from './auth-status.constants';
export * from './auth-type.constants';
export * from './auth-token.constants';
export * from './auth-verification.constants';
export * from './auth-sso.constants';
export * from './auth-social.constants';
export * from './auth-session.constants';
export * from './auth-provider.constants';
export * from './auth-oauth.constants';
export * from './auth-mfa.constants';
export * from './auth-login-attempt.constants';
export * from './auth-biometric.constants';

// Cross-referencing (import common or siblings)
export * from './auth-device.constants';
export * from './auth-role.constants';
export * from './auth-permission.constants';
export * from './auth-password.constants';
export * from './auth-method.constants';

// Namespace aggregator (references siblings)
export * from './auth.constants';
