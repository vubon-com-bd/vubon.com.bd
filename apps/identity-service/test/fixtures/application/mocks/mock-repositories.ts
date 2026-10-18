/**
 * In-memory Repository Mocks for Application Layer tests
 * @module identity-service/test/fixtures/application/mocks
 */
import { jest } from '@jest/globals';
import type { AuthRepository } from '@domain/repositories/auth.repository.interface.js';
import type { SessionRepository } from '@domain/repositories/session.repository.interface.js';
import type { TokenRepository } from '@domain/repositories/token.repository.interface.js';
import type { UserRepository } from '@domain/repositories/user.repository.interface.js';
import type { MfaRepository } from '@domain/repositories/mfa.repository.interface.js';
import type { DeviceRepository } from '@domain/repositories/device.repository.interface.js';
import type { AccountLockRepository } from '@domain/repositories/account-lock.repository.interface.js';
import type { LoginAttemptRepository } from '@domain/repositories/login-attempt.repository.interface.js';
import type { AuthRecoveryCodeRepository } from '@domain/repositories/auth-recovery-code.repository.interface.js';
import type { UserProfileRepository } from '@domain/repositories/user-profile.repository.interface.js';
import type { UserSettingsRepository } from '@domain/repositories/user-settings.repository.interface.js';
import type { UserPreferencesRepository } from '@domain/repositories/user-preferences.repository.interface.js';
import type { UserAddressRepository } from '@domain/repositories/user-address.repository.interface.js';
import type { UserContactRepository } from '@domain/repositories/user-contact.repository.interface.js';
import type { UserKycRepository } from '@domain/repositories/user-kyc.repository.interface.js';
import type { UserVerificationRepository } from '@domain/repositories/user-verification.repository.interface.js';
import type { UserActivityRepository } from '@domain/repositories/user-activity.repository.interface.js';
import type { AuthRoleServiceInterface } from '@application/services/interfaces/auth-role.service.interface.js';

// ─── Auth Repository Mock ───────────────────
export const makeAuthRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  findByIdentifier: jest.fn(),
  findByUserIdAndProvider: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  findLockedExpired: jest.fn(),
  findInactive: jest.fn(),
  findUnverified: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as AuthRepository & { [K in keyof AuthRepository]: jest.Mock };

// ─── Session Repository Mock ────────────────
export const makeSessionRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  findActiveByUserId: jest.fn(),
  countActiveByUserId: jest.fn(),
  findByAuthId: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  findExpired: jest.fn(),
  findIdle: jest.fn(),
  findOldestByUserId: jest.fn(),
  revokeAllByUserId: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as SessionRepository & { [K in keyof SessionRepository]: jest.Mock };

// ─── Token Repository Mock ──────────────────
export const makeTokenRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findByJti: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  findBySessionId: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  findExpired: jest.fn(),
  findUnusedExpired: jest.fn(),
  revokeAllByUserId: jest.fn(),
  revokeAllBySessionId: jest.fn(),
  purge: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as TokenRepository & { [K in keyof TokenRepository]: jest.Mock };

// ─── User Repository Mock ───────────────────
export const makeUserRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findByEmail: jest.fn(),
  findByEmailRaw: jest.fn(),
  findByPhone: jest.fn(),
  findByUsername: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  findActive: jest.fn(),
  findByRole: jest.fn(),
  findInactive: jest.fn(),
  findUnverified: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as UserRepository & { [K in keyof UserRepository]: jest.Mock };

// ─── MFA Repository Mock ────────────────────
export const makeMfaRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findByAuthId: jest.fn(),
  findPrimaryByAuthId: jest.fn(),
  findEnabledByAuthId: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  findUnverified: jest.fn(),
  findFailing: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as MfaRepository & { [K in keyof MfaRepository]: jest.Mock };

// ─── Device Repository Mock ─────────────────
export const makeDeviceRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findByUserId: jest.fn(),
  findByFingerprint: jest.fn(),
  countByUserId: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  findStale: jest.fn(),
  findOldestByUserId: jest.fn(),
  findExpiredTrust: jest.fn(),
  removeExpiredTrust: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as DeviceRepository & { [K in keyof DeviceRepository]: jest.Mock };

// ─── Account Lock Repository Mock ───────────
export const makeAccountLockRepositoryMock = () => ({
  findById: jest.fn(),
  findActiveByAuthId: jest.fn(),
  findActiveByUserId: jest.fn(),
  findByAuthId: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  findExpired: jest.fn(),
  autoUnlockExpired: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as AccountLockRepository & { [K in keyof AccountLockRepository]: jest.Mock };

// ─── Login Attempt Repository Mock ──────────
export const makeLoginAttemptRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdentifier: jest.fn(),
  findByIp: jest.fn(),
  findRecent: jest.fn(),
  countRecent: jest.fn(),
  countRecentByIp: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  purge: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as LoginAttemptRepository & { [K in keyof LoginAttemptRepository]: jest.Mock };

// ─── Recovery Code Repository Mock ──────────
export const makeRecoveryCodeRepositoryMock = () => ({
  findById: jest.fn(),
  findByAuthId: jest.fn(),
  findActiveByAuthId: jest.fn(),
  countActiveByAuthId: jest.fn(),
  findByCode: jest.fn(),
  findAll: jest.fn(),
  revokeAllByAuthId: jest.fn(),
  deleteAllByAuthId: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as AuthRecoveryCodeRepository & { [K in keyof AuthRecoveryCodeRepository]: jest.Mock };

// ─── User Profile Repository Mock ───────────
export const makeUserProfileRepositoryMock = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findByUserIdRaw: jest.fn(),
  findIncomplete: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as UserProfileRepository & { [K in keyof UserProfileRepository]: jest.Mock };

// ─── User Settings Repository Mock ──────────
export const makeUserSettingsRepositoryMock = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findByUserIdRaw: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as UserSettingsRepository & { [K in keyof UserSettingsRepository]: jest.Mock };

// ─── User Preferences Repository Mock ───────
export const makeUserPreferencesRepositoryMock = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findByUserIdRaw: jest.fn(),
  findWithMarketing: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as UserPreferencesRepository & { [K in keyof UserPreferencesRepository]: jest.Mock };

// ─── User Address Repository Mock ───────────
export const makeUserAddressRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findByUserId: jest.fn(),
  findByUserIdRaw: jest.fn(),
  findDefaultByUserId: jest.fn(),
  findDefaultShippingByUserId: jest.fn(),
  findDefaultBillingByUserId: jest.fn(),
  countByUserId: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  unsetAllDefault: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as UserAddressRepository & { [K in keyof UserAddressRepository]: jest.Mock };

// ─── User Contact Repository Mock ───────────
export const makeUserContactRepositoryMock = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findByUserIdRaw: jest.fn(),
  findPrimaryByUserId: jest.fn(),
  findByValue: jest.fn(),
  findAll: jest.fn(),
  unsetAllPrimary: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as UserContactRepository & { [K in keyof UserContactRepository]: jest.Mock };

// ─── User KYC Repository Mock ───────────────
export const makeUserKycRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findByUserId: jest.fn(),
  findByUserIdRaw: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  findPending: jest.fn(),
  findExpiring: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as UserKycRepository & { [K in keyof UserKycRepository]: jest.Mock };

// ─── User Verification Repository Mock ──────
export const makeUserVerificationRepositoryMock = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findByUserIdRaw: jest.fn(),
  findAll: jest.fn(),
  getStats: jest.fn(),
  findUnverifiedUsers: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as UserVerificationRepository & { [K in keyof UserVerificationRepository]: jest.Mock };

// ─── User Activity Repository Mock ──────────
export const makeUserActivityRepositoryMock = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findByType: jest.fn(),
  findSecurityEvents: jest.fn(),
  findRecent: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  purge: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as UserActivityRepository & { [K in keyof UserActivityRepository]: jest.Mock };

// ─── Role Repository Mock ───────────────────
export const makeRoleRepositoryMock = () => ({
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findByName: jest.fn(),
  findSystemRoles: jest.fn(),
  findWithPermission: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as AuthRoleServiceInterface & { [K in keyof AuthRoleServiceInterface]: jest.Mock };

// Re-export common types
export type MockedRepo<T> = T & { [K in keyof T]: jest.Mock };

// ─── OAuth Client Repository Mock ───────────
export const makeOAuthClientRepositoryMock = () => ({
  findById: jest.fn(),
  findByClientId: jest.fn(),
  findActiveClients: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as never;

// ─── SSO Config Repository Mock ─────────────
export const makeSsoConfigRepositoryMock = () => ({
  findById: jest.fn(),
  findByName: jest.fn(),
  findByProvider: jest.fn(),
  findActive: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as never;

// ─── Auth 2FA Repository Mock ───────────────
export const makeAuth2FaRepositoryMock = () => ({
  findById: jest.fn(),
  findByAuthId: jest.fn(),
  findByAuthIdRaw: jest.fn(),
  findEnabledByAuthId: jest.fn(),
  findLocked: jest.fn(),
  findUnverified: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as never;

// ─── Permission Repository Mock ─────────────
export const makePermissionRepositoryMock = () => ({
  findById: jest.fn(),
  findByName: jest.fn(),
  findByCategory: jest.fn(),
  findSensitive: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as never;

// ─── Social Account Repository Mock ─────────
export const makeSocialAccountRepositoryMock = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findByProviderAndProviderUserId: jest.fn(),
  findByUserIdAndProvider: jest.fn(),
  findAll: jest.fn(),
  findPaginated: jest.fn(),
  getStats: jest.fn(),
  findInactive: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as never;

// ─── Auth Biometric Repository Mock ─────────
export const makeAuthBiometricRepositoryMock = () => ({
  findById: jest.fn(),
  findByAuthId: jest.fn(),
  findByAuthIdRaw: jest.fn(),
  findByAuthIdAndDevice: jest.fn(),
  findStale: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as never;

// ─── Auth Recovery Code Repository Mock ─────
export const makeAuthRecoveryCodeRepositoryMock = () => ({
  findById: jest.fn(),
  findByAuthId: jest.fn(),
  findActiveByAuthId: jest.fn(),
  countActiveByAuthId: jest.fn(),
  findByCode: jest.fn(),
  findAll: jest.fn(),
  revokeAllByAuthId: jest.fn(),
  deleteAllByAuthId: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  softDelete: jest.fn(),
}) as unknown as never;

// ─── Auth SSO Repository (alias) ────────────
// (makeSsoConfigRepositoryMock already defined above)

// ─── Device additional alias ────────────────
// (makeDeviceRepositoryMock already defined above)
