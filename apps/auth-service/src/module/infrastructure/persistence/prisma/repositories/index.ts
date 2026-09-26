/**
 * Prisma Repositories — Barrel
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
// User domain
export * from './user.prisma.repository';
export * from './user-profile.prisma.repository';
export * from './user-settings.prisma.repository';
export * from './user-preferences.prisma.repository';
export * from './user-address.prisma.repository';
export * from './user-contact.prisma.repository';
export * from './user-verification.prisma.repository';
export * from './user-kyc.prisma.repository';
export * from './user-activity.prisma.repository';

// Auth domain
export * from './auth-session.prisma.repository';
export * from './auth-token.prisma.repository';
export * from './auth-mfa.prisma.repository';
export * from './auth-recovery-code.prisma.repository';
export * from './auth-account-lock.prisma.repository';
export * from './auth-login-attempt.prisma.repository';
export * from './auth-device.prisma.repository';
export * from './auth-social.prisma.repository';
export * from './auth-oauth.prisma.repository';
export * from './auth-sso.prisma.repository';
export * from './auth-2fa.prisma.repository';
export * from './auth-biometric.prisma.repository';
export * from './auth-permission.prisma.repository';
export * from './auth-role.prisma.repository';
