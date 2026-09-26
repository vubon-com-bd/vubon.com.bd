/**
 * Domain Repository Interfaces — Barrel
 * @module auth-service/domain/repositories
 *
 * NOTE: These are CONTRACTS only. Implementations live in the
 * infrastructure layer (Prisma / Redis / etc.).
 */
// User repositories
export * from './user.repository.interface';
export * from './user-profile.repository.interface';
export * from './user-settings.repository.interface';
export * from './user-preferences.repository.interface';
export * from './user-address.repository.interface';
export * from './user-contact.repository.interface';
export * from './user-verification.repository.interface';
export * from './user-kyc.repository.interface';
export * from './user-activity.repository.interface';

// Auth repositories
export * from './auth-session.repository.interface';
export * from './auth-token.repository.interface';
export * from './auth-mfa.repository.interface';
export * from './auth-recovery-code.repository.interface';
export * from './auth-account-lock.repository.interface';
export * from './auth-login-attempt.repository.interface';
export * from './auth-device.repository.interface';
export * from './auth-social.repository.interface';
export * from './auth-oauth.repository.interface';
export * from './auth-sso.repository.interface';
export * from './auth-2fa.repository.interface';
export * from './auth-biometric.repository.interface';
export * from './auth-permission.repository.interface';
export * from './auth-role.repository.interface';
