/**
 * Prisma Repositories — Barrel
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
// User domain
export * from './user.prisma.repository.js';
export * from './user-profile.prisma.repository.js';
export * from './user-settings.prisma.repository.js';
export * from './user-preferences.prisma.repository.js';
export * from './user-address.prisma.repository.js';
export * from './user-contact.prisma.repository.js';
export * from './user-verification.prisma.repository.js';
export * from './user-kyc.prisma.repository.js';
export * from './user-activity.prisma.repository.js';

// Auth domain
export * from './auth-session.prisma.repository.js';
export * from './auth-token.prisma.repository.js';
export * from './auth-mfa.prisma.repository.js';
export * from './auth-recovery-code.prisma.repository.js';
export * from './auth-account-lock.prisma.repository.js';
export * from './auth-login-attempt.prisma.repository.js';
export * from './auth-device.prisma.repository.js';
export * from './auth-social.prisma.repository.js';
export * from './auth-oauth.prisma.repository.js';
export * from './auth-sso.prisma.repository.js';
export * from './auth-2fa.prisma.repository.js';
export * from './auth-biometric.prisma.repository.js';
export * from './auth-permission.prisma.repository.js';
export * from './auth-role.prisma.repository.js';
