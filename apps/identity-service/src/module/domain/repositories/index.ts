/**
 * Repositories — Barrel
 * @module identity-service/domain/repositories
 */
export * from './auth.repository.interface.js';
export * from './session.repository.interface.js';
export * from './credential.repository.interface.js';
export * from './token.repository.interface.js';
export * from './mfa.repository.interface.js';
export * from './backup-code.repository.interface.js';
export * from './login-attempt.repository.interface.js';
export * from './account-lock.repository.interface.js';
export * from './device.repository.interface.js';
export * from './verification.repository.interface.js';
export * from './social-account.repository.interface.js';
export * from './oauth-client.repository.interface.js';
export * from './sso-config.repository.interface.js';
export * from './role.repository.interface.js';
export * from './permission.repository.interface.js';

// New: User & Auth-child
export * from './user.repository.interface.js';
export * from './user-profile.repository.interface.js';
export * from './user-settings.repository.interface.js';
export * from './user-preferences.repository.interface.js';
export * from './user-address.repository.interface.js';
export * from './user-contact.repository.interface.js';
export * from './user-verification.repository.interface.js';
export * from './user-kyc.repository.interface.js';
export * from './user-activity.repository.interface.js';
export * from './auth-2fa.repository.interface.js';
export * from './auth-biometric.repository.interface.js';
export * from './auth-recovery-code.repository.interface.js';
