/**
 * Auth Request DTOs — Barrel
 * @module auth-service/application/dtos/requests/auth
 */
// Core
export * from './login.dto';
export * from './register.dto';
export * from './refresh-token.dto';
export * from './logout.dto';
export * from './forgot-password.dto';
export * from './reset-password.dto';

// Email / phone verification
export * from './verify-email.dto';
export * from './resend-verification.dto';

// MFA
export * from './enable-mfa.dto';
export * from './disable-mfa.dto';
export * from './verify-mfa.dto';

// Recovery
export * from './generate-recovery-codes.dto';
export * from './recover-account.dto';

// Social
export * from './social-login.dto';
export * from './social-callback.dto';
export * from './link-social.dto';
export * from './unlink-social.dto';

// SSO
export * from './sso-login.dto';
export * from './sso-callback.dto';

// Biometric
export * from './enable-biometric.dto';
export * from './disable-biometric.dto';
export * from './verify-biometric.dto';

// Account lock
export * from './lock-account.dto';
export * from './unlock-account.dto';
