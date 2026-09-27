/**
 * Domain Entities — Barrel
 * @module auth-service/domain/entities
 */
// User entities
export * from './user.entity.js';
export * from './user-profile.entity.js';
export * from './user-settings.entity.js';
export * from './user-preferences.entity.js';
export * from './user-address.entity.js';
export * from './user-contact.entity.js';
export * from './user-verification.entity.js';
export * from './user-kyc.entity.js';
export * from './user-activity.entity.js';

// Auth entities
export * from './auth-session.entity.js';
export * from './auth-token.entity.js';
export * from './auth-mfa.entity.js';
export * from './auth-recovery-code.entity.js';
export * from './auth-account-lock.entity.js';
export * from './auth-login-attempt.entity.js';
export * from './auth-device.entity.js';
export * from './auth-social.entity.js';
export * from './auth-oauth.entity.js';
export * from './auth-sso.entity.js';
export * from './auth-2fa.entity.js';
export * from './auth-biometric.entity.js';
export * from './auth-permission.entity.js';
export * from './auth-role.entity.js';
