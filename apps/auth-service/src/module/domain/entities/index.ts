/**
 * Domain Entities — Barrel
 * @module auth-service/domain/entities
 */
// User entities
export * from './user.entity';
export * from './user-profile.entity';
export * from './user-settings.entity';
export * from './user-preferences.entity';
export * from './user-address.entity';
export * from './user-contact.entity';
export * from './user-verification.entity';
export * from './user-kyc.entity';
export * from './user-activity.entity';

// Auth entities
export * from './auth-session.entity';
export * from './auth-token.entity';
export * from './auth-mfa.entity';
export * from './auth-recovery-code.entity';
export * from './auth-account-lock.entity';
export * from './auth-login-attempt.entity';
export * from './auth-device.entity';
export * from './auth-social.entity';
export * from './auth-oauth.entity';
export * from './auth-sso.entity';
export * from './auth-2fa.entity';
export * from './auth-biometric.entity';
export * from './auth-permission.entity';
export * from './auth-role.entity';
