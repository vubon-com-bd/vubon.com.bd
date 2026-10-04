/**
 * Auth Request DTOs — Barrel
 * @module auth-service/application/dtos/requests/auth
 */
// Core
export * from './login.dto.js';
export * from './register.dto.js';
export * from './refresh-token.dto.js';
export * from './logout.dto.js';
export * from './forgot-password.dto.js';
export * from './reset-password.dto.js';

// Email / phone verification
export * from './verify-email.dto.js';
export * from './resend-verification.dto.js';

// MFA
export * from './enable-mfa.dto.js';
export * from './disable-mfa.dto.js';
export * from './verify-mfa.dto.js';

// Recovery
export * from './generate-recovery-codes.dto.js';
export * from './recover-account.dto.js';

// Social
export * from './social-login.dto.js';
export * from './social-callback.dto.js';
export * from './link-social.dto.js';
export * from './unlink-social.dto.js';

// SSO
export * from './sso-login.dto.js';
export * from './sso-callback.dto.js';

// Biometric
export * from './enable-biometric.dto.js';
export * from './disable-biometric.dto.js';
export * from './verify-biometric.dto.js';

// Account lock
export * from './lock-account.dto.js';
export * from './unlock-account.dto.js';
