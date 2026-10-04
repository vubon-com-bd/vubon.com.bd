/**
 * Service Interfaces — Barrel
 * @module auth-service/application/services/interfaces
 */
// Core auth
export * from './auth.service.interface.js';
export * from './auth-session.service.interface.js';
export * from './auth-token.service.interface.js';
export * from './auth-mfa.service.interface.js';

// Recovery / lock / attempts
export * from './auth-recovery-code.service.interface.js';
export * from './auth-account-lock.service.interface.js';
export * from './auth-login-attempt.service.interface.js';

// Social / OAuth / SSO
export * from './auth-social.service.interface.js';
export * from './auth-oauth.service.interface.js';
export * from './auth-sso.service.interface.js';

// 2FA / Biometric
export * from './auth-2fa.service.interface.js';
export * from './auth-biometric.service.interface.js';

// Permission / Role / Settings
export * from './auth-permission.service.interface.js';
export * from './auth-role.service.interface.js';
export * from './auth-settings.service.interface.js';

// User services
export * from './user.service.interface.js';
export * from './user-profile.service.interface.js';
export * from './user-settings.service.interface.js';
export * from './user-preferences.service.interface.js';
export * from './user-address.service.interface.js';
export * from './user-contact.service.interface.js';
export * from './user-verification.service.interface.js';
export * from './user-kyc.service.interface.js';
export * from './user-activity.service.interface.js';
export * from './user-permission.service.interface.js';
export * from './user-role.service.interface.js';

// Cross-cutting (impl in Infrastructure)
export * from './password-hasher.service.interface.js';
export * from './token-signer.service.interface.js';
export * from './recovery-code-generator.service.interface.js';
export * from './totp.service.interface.js';
export * from './id-generator.service.interface.js';
export * from './unit-of-work.service.interface.js';
