/**
 * Composites VOs — Barrel
 * @module identity-service/domain/value-objects/composites
 */

// Auth
export * from './auth.vo.js';
export * from './credential.vo.js';
export * from './session.vo.js';
export * from './token-pair.vo.js';
export * from './mfa-config.vo.js';
export * from './backup-code-set.vo.js';
export * from './login-attempt.vo.js';
export * from './account-lock.vo.js';
export * from './device.vo.js';
export * from './verification.vo.js';
export * from './social-account.vo.js';
export * from './oauth-client.vo.js';
export * from './sso-config.vo.js';
export * from './role.vo.js';
export * from './permission.vo.js';

// User
export * from './user.vo.js';
export * from './user-profile.vo.js';
export * from './user-settings.vo.js';
export * from './user-preferences.vo.js';
export * from './user-address.vo.js';
export * from './user-contact.vo.js';
export * from './user-verification.vo.js';
export * from './user-kyc.vo.js';
export * from './user-activity.vo.js';

// Auth child
export * from './biometric.vo.js';
export * from './recovery-code.vo.js';

// NEW
export * from './user-persona.vo.js';
