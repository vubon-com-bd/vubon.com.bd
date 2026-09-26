/**
 * Service Interfaces — Barrel
 * @module auth-service/application/services/interfaces
 */
// Core auth
export * from './auth.service.interface';
export * from './auth-session.service.interface';
export * from './auth-token.service.interface';
export * from './auth-mfa.service.interface';

// Recovery / lock / attempts
export * from './auth-recovery-code.service.interface';
export * from './auth-account-lock.service.interface';
export * from './auth-login-attempt.service.interface';

// Social / OAuth / SSO
export * from './auth-social.service.interface';
export * from './auth-oauth.service.interface';
export * from './auth-sso.service.interface';

// 2FA / Biometric
export * from './auth-2fa.service.interface';
export * from './auth-biometric.service.interface';

// Permission / Role / Settings
export * from './auth-permission.service.interface';
export * from './auth-role.service.interface';
export * from './auth-settings.service.interface';

// User services
export * from './user.service.interface';
export * from './user-profile.service.interface';
export * from './user-settings.service.interface';
export * from './user-preferences.service.interface';
export * from './user-address.service.interface';
export * from './user-contact.service.interface';
export * from './user-verification.service.interface';
export * from './user-kyc.service.interface';
export * from './user-activity.service.interface';
export * from './user-permission.service.interface';
export * from './user-role.service.interface';

// Cross-cutting (impl in Infrastructure)
export * from './password-hasher.service.interface';
export * from './token-signer.service.interface';
export * from './recovery-code-generator.service.interface';
export * from './totp.service.interface';
export * from './id-generator.service.interface';
export * from './unit-of-work.service.interface';
