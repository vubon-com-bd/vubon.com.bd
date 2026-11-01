/**
 * Entities — Barrel
 * @module identity-service/domain/entities
 */

// Auth
export * from './auth.entity.js';
export * from './session.entity.js';
export * from './credential.entity.js';
export * from './token.entity.js';
export * from './mfa.entity.js';
export * from './backup-code.entity.js';
export * from './login-attempt.entity.js';
export * from './account-lock.entity.js';
export * from './device.entity.js';
export * from './verification.entity.js';
export * from './social-account.entity.js';
export * from './oauth-client.entity.js';
export * from './sso-config.entity.js';
export * from './role.entity.js';
export * from './permission.entity.js';

// Auth child (new)
export * from './auth-2fa.entity.js';
export * from './auth-biometric.entity.js';
export * from './auth-recovery-code.entity.js';

// User (new)
export * from './user.entity.js';
export * from './user-profile.entity.js';
export * from './user-settings.entity.js';
export * from './user-preferences.entity.js';
export * from './user-address.entity.js';
export * from './user-contact.entity.js';
export * from './user-verification.entity.js';
export * from './user-kyc.entity.js';
export * from './user-activity.entity.js';
