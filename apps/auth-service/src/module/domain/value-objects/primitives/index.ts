/**
 * Primitive Value Objects — Barrel
 * @module auth-service/domain/value-objects/primitives
 */
// User
export * from './user-id.vo.js';
export * from './user-email.vo.js';
export * from './user-password.vo.js';
export * from './user-name.vo.js';
export * from './user-phone.vo.js';
export * from './user-status.vo.js';
export * from './user-type.vo.js';
export * from './user-role.vo.js';

// Session
export * from './session-token.vo.js';
export * from './session-expiry.vo.js';

// Token
export * from './token-value.vo.js';
export * from './token-type.vo.js';
export * from './token-expiry.vo.js';

// MFA
export * from './mfa-secret.vo.js';
export * from './mfa-type.vo.js';
export * from './mfa-status.vo.js';

// Recovery
export * from './recovery-code.vo.js';
export * from './recovery-code-status.vo.js';

// Account Lock
export * from './account-lock-reason.vo.js';
export * from './account-lock-duration.vo.js';

// Login Attempt
export * from './login-attempt-ip.vo.js';
export * from './login-attempt-status.vo.js';

// Device
export * from './device-fingerprint.vo.js';
export * from './device-type.vo.js';
export * from './device-status.vo.js';

// Social
export * from './social-provider.vo.js';
export * from './social-token.vo.js';
export * from './social-status.vo.js';

// OAuth
export * from './oauth-provider.vo.js';
export * from './oauth-token.vo.js';
export * from './oauth-status.vo.js';

// SSO
export * from './sso-provider.vo.js';
export * from './sso-token.vo.js';
export * from './sso-status.vo.js';

// Verification
export * from './verification-code.vo.js';
export * from './verification-type.vo.js';
export * from './verification-status.vo.js';

// Permission
export * from './permission-name.vo.js';
export * from './permission-action.vo.js';
export * from './permission-resource.vo.js';

// Role
export * from './role-name.vo.js';
export * from './role-description.vo.js';

// Biometric
export * from './biometric-id.vo.js';
