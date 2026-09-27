/**
 * Domain Repository Interfaces — Barrel
 * @module auth-service/domain/repositories
 *
 * NOTE: These are CONTRACTS only. Implementations live in the
 * infrastructure layer (Prisma / Redis / etc.).
 */
// User repositories
export * from './user.repository.interface.js';
export * from './user-profile.repository.interface.js';
export * from './user-settings.repository.interface.js';
export * from './user-preferences.repository.interface.js';
export * from './user-address.repository.interface.js';
export * from './user-contact.repository.interface.js';
export * from './user-verification.repository.interface.js';
export * from './user-kyc.repository.interface.js';
export * from './user-activity.repository.interface.js';

// Auth repositories
export * from './auth-session.repository.interface.js';
export * from './auth-token.repository.interface.js';
export * from './auth-mfa.repository.interface.js';
export * from './auth-recovery-code.repository.interface.js';
export * from './auth-account-lock.repository.interface.js';
export * from './auth-login-attempt.repository.interface.js';
export * from './auth-device.repository.interface.js';
export * from './auth-social.repository.interface.js';
export * from './auth-oauth.repository.interface.js';
export * from './auth-sso.repository.interface.js';
export * from './auth-2fa.repository.interface.js';
export * from './auth-biometric.repository.interface.js';
export * from './auth-permission.repository.interface.js';
export * from './auth-role.repository.interface.js';
