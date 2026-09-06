/**
 * Auth Constants Index
 * @module shared-constants/auth
 */

// Export main auth constants first
export * from './auth.constants';

// Export auth status with specific names to avoid conflicts
export {
  AUTH_STATUS,
  type AuthStatus,
  AUTH_STATUS_LABELS,
  AUTH_STATUS_COLORS,
} from './auth-status.constants';

// Export other auth constants
export * from './auth-type.constants';
export * from './auth-provider.constants';
export * from './auth-method.constants';
export * from './auth-permission.constants';
export * from './auth-role.constants';
export * from './auth-session.constants';
export * from './auth-token.constants';
export * from './auth-verification.constants';
export * from './auth-password.constants';
export * from './auth-mfa.constants';
export * from './auth-login-attempt.constants';
export * from './auth-device.constants';
export * from './auth-social.constants';
export * from './auth-oauth.constants';
export * from './auth-sso.constants';
