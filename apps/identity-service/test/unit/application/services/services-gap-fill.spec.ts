/**
 * Coverage gap-fill — Service implementations
 * @module identity-service/test/unit/application/services
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { AuthService } from '@application/services/impl/auth.service.js';
import { AuthTokenService } from '@application/services/impl/auth-token.service.js';
import { AuthAccountLockService } from '@application/services/impl/auth-account-lock.service.js';
import { AuthDeviceService } from '@application/services/impl/auth-device.service.js';
import { AuthOAuthService } from '@application/services/impl/auth-oauth.service.js';
import { AuthSsoService } from '@application/services/impl/auth-sso.service.js';
import { Auth2FaService } from '@application/services/impl/auth-2fa.service.js';
import { AuthBiometricService } from '@application/services/impl/auth-biometric.service.js';
import { AuthRoleService } from '@application/services/impl/auth-role.service.js';
import { UserService } from '@application/services/impl/user.service.js';
import { UserProfileService } from '@application/services/impl/user-profile.service.js';
import { UserSettingsService } from '@application/services/impl/user-settings.service.js';
import { UserPreferencesService } from '@application/services/impl/user-preferences.service.js';
import { UserAddressService } from '@application/services/impl/user-address.service.js';
import { UserContactService } from '@application/services/impl/user-contact.service.js';
import { UserVerificationService } from '@application/services/impl/user-verification.service.js';
import { UserKycService } from '@application/services/impl/user-kyc.service.js';
import { UserActivityService } from '@application/services/impl/user-activity.service.js';

import {
  makeAuthRepositoryMock, makeAuthSessionServiceMock, makeAuthTokenServiceMock,
  makeAuthMfaServiceMock, makeEventBridgeMock,
  makeTokenRepositoryMock, makeAccountLockRepositoryMock, makeDeviceRepositoryMock,
  makeOAuthClientRepositoryMock, makeSsoConfigRepositoryMock,
  makeAuth2FaRepositoryMock, makeAuthBiometricRepositoryMock, makeRoleRepositoryMock,
  makeUserRepositoryMock, makeUserProfileRepositoryMock, makeUserSettingsRepositoryMock,
  makeUserPreferencesRepositoryMock, makeUserAddressRepositoryMock,
  makeUserContactRepositoryMock, makeUserVerificationRepositoryMock, makeUserKycRepositoryMock,
  makeUserActivityRepositoryMock,
  activeUser, makeDeviceEntity, makeAccountLockEntity,
  TEST_IDS, TEST_EMAIL, TEST_IP, TEST_USER_AGENT, TEST_FINGERPRINT,
} from '@fixtures/index.js';

describe('Services Gap-Fill', () => {
  describe('AuthService', () => {
    it('name', () => {
      const s = new AuthService(
        makeAuthRepositoryMock() as never, makeAuthSessionServiceMock() as never,
        makeAuthTokenServiceMock() as never, makeAuthMfaServiceMock() as never,
        makeEventBridgeMock() as never,
      );
      expect(s.name).toBe('AuthService');
    });
  });

  describe('AuthTokenService', () => {
    let s: AuthTokenService;
    let repo: ReturnType<typeof makeTokenRepositoryMock>;
    let eb: ReturnType<typeof makeEventBridgeMock>;
    beforeEach(() => {
      repo = makeTokenRepositoryMock();
      eb = makeEventBridgeMock();
      repo.save.mockImplementation(async (e: unknown) => e as never);
      eb.publishFromEntity.mockResolvedValue(undefined);
      s = new AuthTokenService(repo as never, eb as never);
    });
    it('issue() with scope', async () => {
      const r = await s.issue({ userId: TEST_IDS.USER_ID, sessionId: TEST_IDS.SESSION_ID, scope: ['read'] });
      expect(r.tokenType).toBe('Bearer');
    });
    it('revoke() when token exists', async () => {
      repo.findById.mockResolvedValue({ revoke: jest.fn(), isRevoked: () => false } as never);
      await s.revoke(TEST_IDS.TOKEN_ID, 'test');
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('AuthAccountLockService.unlock()', () => {
    let s: AuthAccountLockService;
    let repo: ReturnType<typeof makeAccountLockRepositoryMock>;
    let eb: ReturnType<typeof makeEventBridgeMock>;
    beforeEach(() => {
      repo = makeAccountLockRepositoryMock();
      eb = makeEventBridgeMock();
      repo.save.mockImplementation(async (e: unknown) => e as never);
      eb.publishFromEntity.mockResolvedValue(undefined);
      s = new AuthAccountLockService(repo as never, eb as never);
    });
    it('returns when lock not found', async () => {
      repo.findActiveByAuthId.mockResolvedValue(null);
      await expect(s.unlock(TEST_IDS.AUTH_ID)).resolves.toBeUndefined();
    });
    it('unlocks when found', async () => {
      const lock = makeAccountLockEntity();
      repo.findActiveByAuthId.mockResolvedValue(lock as never);
      await s.unlock(TEST_IDS.AUTH_ID, 'admin');
      expect(repo.save).toHaveBeenCalled();
    });
  });

  // ✅ AuthDeviceService — (repo, eventBridge)
  describe('AuthDeviceService', () => {
    let s: AuthDeviceService;
    let repo: ReturnType<typeof makeDeviceRepositoryMock>;
    let eb: ReturnType<typeof makeEventBridgeMock>;
    beforeEach(() => {
      repo = makeDeviceRepositoryMock();
      eb = makeEventBridgeMock();
      repo.save.mockImplementation(async (e: unknown) => e as never);
      eb.publishFromEntity.mockResolvedValue(undefined);
      s = new AuthDeviceService(repo as never, eb as never);
    });
    it('untrust() with existing device', async () => {
      const device = makeDeviceEntity();
      repo.findById.mockResolvedValue(device as never);
      await s.untrust(TEST_IDS.DEVICE_ID);
      expect(repo.save).toHaveBeenCalled();
    });
    it('untrust() with missing device (no-op)', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(s.untrust(TEST_IDS.DEVICE_ID)).resolves.toBeUndefined();
    });
    it('trust() returns DTO', async () => {
      const r = await s.trust(TEST_IDS.DEVICE_ID, 30);
      expect(r.trusted).toBe(true);
    });
    it('remove() delegates', async () => {
      repo.delete.mockResolvedValue(undefined);
      await s.remove(TEST_IDS.DEVICE_ID);
      expect(repo.delete).toHaveBeenCalledWith(TEST_IDS.DEVICE_ID);
    });
    it('register() with all fields', async () => {
      const r = await s.register({
        userId: TEST_IDS.USER_ID, type: 'mobile', fingerprint: TEST_FINGERPRINT,
        name: 'iPhone', os: 'iOS 17', browser: 'Safari', appVersion: '1.0',
        ipAddress: TEST_IP, userAgent: TEST_USER_AGENT,
      });
      expect(r.type).toBe('mobile');
    });
  });

  describe('AuthOAuthService', () => {
    let s: AuthOAuthService;
    beforeEach(() => { s = new AuthOAuthService(makeOAuthClientRepositoryMock() as never); });
    it('authorize() returns code', async () => {
      const r = await s.authorize({
        responseType: 'code', clientId: 'c1', redirectUri: 'https://x.com/cb',
        scope: ['read'], state: 'state-12345678',
      } as never);
      expect(typeof r.code).toBe('string');
    });
    it('revokeToken() no-op', async () => {
      await expect(s.revokeToken('token-x')).resolves.toBeUndefined();
    });
  });

  describe('AuthSsoService', () => {
    let s: AuthSsoService;
    beforeEach(() => { s = new AuthSsoService(makeSsoConfigRepositoryMock() as never); });
    it('validateAssertion() returns object', async () => {
      const r = await s.validateAssertion('config-1', '<assertion/>');
      expect(typeof r).toBe('object');
    });
    it('logout() no-op', async () => {
      await expect(s.logout('session-1')).resolves.toBeUndefined();
    });
  });

  describe('Auth2FaService', () => {
    let s: Auth2FaService;
    let repo: ReturnType<typeof makeAuth2FaRepositoryMock>;
    beforeEach(() => {
      repo = makeAuth2FaRepositoryMock();
      s = new Auth2FaService(repo as never);
    });
    it('verify() returns boolean', async () => {
      expect(typeof (await s.verify(TEST_IDS.AUTH_ID, '123456'))).toBe('boolean');
    });
    it('enable() no-op', async () => {
      await expect(s.enable(TEST_IDS.AUTH_ID)).resolves.toBeUndefined();
    });
    it('disable() no-op', async () => {
      await expect(s.disable(TEST_IDS.AUTH_ID)).resolves.toBeUndefined();
    });
    it('getConfig() when exists', async () => {
      repo.findByAuthIdRaw.mockResolvedValue({ id: 'x' } as never);
      expect(await s.getConfig(TEST_IDS.AUTH_ID)).not.toBeNull();
    });
  });

  describe('AuthBiometricService', () => {
    it('verify() returns boolean', async () => {
      const s = new AuthBiometricService(makeAuthBiometricRepositoryMock() as never);
      expect(typeof (await s.verify(TEST_IDS.AUTH_ID, { deviceId: TEST_IDS.DEVICE_ID, challengeResponse: 'x'.repeat(32) } as never))).toBe('boolean');
    });
  });

  describe('AuthRoleService', () => {
    let s: AuthRoleService;
    beforeEach(() => { s = new AuthRoleService(makeRoleRepositoryMock() as never); });
    it('assign() no-op', async () => {
      await expect(s.assign(TEST_IDS.USER_ID, 'admin', 'super')).resolves.toBeUndefined();
    });
    it('revoke() no-op', async () => {
      await expect(s.revoke(TEST_IDS.USER_ID, 'admin', 'super')).resolves.toBeUndefined();
    });
    it('hasRole() false', async () => {
      expect(await s.hasRole(TEST_IDS.USER_ID, 'admin')).toBe(false);
    });
  });

  describe('UserService', () => {
    let s: UserService;
    let repo: ReturnType<typeof makeUserRepositoryMock>;
    beforeEach(() => {
      repo = makeUserRepositoryMock();
      s = new UserService(repo as never);
    });
    it('findByEmail() null when missing', async () => {
      repo.findByEmailRaw.mockResolvedValue(null);
      expect(await s.findByEmail(TEST_EMAIL)).toBeNull();
    });
    it('toPublic() reflects roles', () => {
      expect(Array.isArray(s.toPublic(activeUser()).roles)).toBe(true);
    });
  });

  describe('UserProfileService.upsert()', () => {
    let s: UserProfileService;
    let repo: ReturnType<typeof makeUserProfileRepositoryMock>;
    beforeEach(() => {
      repo = makeUserProfileRepositoryMock();
      s = new UserProfileService(repo as never);
    });
    it('merged with existing', async () => {
      repo.findByUserIdRaw.mockResolvedValue({
        userId: { value: TEST_IDS.USER_ID }, firstName: undefined, lastName: undefined,
        displayName: 'A', bio: 'old', avatarUrl: undefined, coverUrl: undefined,
        dateOfBirth: undefined, gender: undefined, website: undefined,
        language: undefined, locale: undefined, timezone: undefined, updatedAt: '',
      } as never);
      const r = await s.upsert(TEST_IDS.USER_ID, { bio: 'new' } as never);
      expect(r.userId).toBe(TEST_IDS.USER_ID);
    });
  });

  describe('UserSettingsService', () => {
    let s: UserSettingsService;
    let repo: ReturnType<typeof makeUserSettingsRepositoryMock>;
    beforeEach(() => {
      repo = makeUserSettingsRepositoryMock();
      s = new UserSettingsService(repo as never);
    });
    it('findForUser() mapped', async () => {
      repo.findByUserIdRaw.mockResolvedValue({
        userId: { value: TEST_IDS.USER_ID }, language: 'en', timezone: 'UTC',
        currency: 'BDT', dateFormat: 'x', timeFormat: '12h', theme: 'light',
        notificationsEnabled: true, marketingEmails: false, securityAlerts: true,
        loginAlerts: true, twoFactorRequired: false, sessionTimeout: 100, updatedAt: '',
      } as never);
      const r = await s.findForUser(TEST_IDS.USER_ID);
      expect(r?.language).toBe('en');
    });
  });

  describe('UserPreferencesService', () => {
    let s: UserPreferencesService;
    let repo: ReturnType<typeof makeUserPreferencesRepositoryMock>;
    beforeEach(() => {
      repo = makeUserPreferencesRepositoryMock();
      s = new UserPreferencesService(repo as never);
    });
    it('findForUser() mapped', async () => {
      repo.findByUserIdRaw.mockResolvedValue({
        userId: { value: TEST_IDS.USER_ID }, emailNotifications: true, smsNotifications: false,
        pushNotifications: true, whatsappNotifications: false, orderUpdates: true,
        promotions: false, newsletter: false, productRecommendations: true,
        priceDropAlerts: false, backInStockAlerts: false, updatedAt: '',
      } as never);
      expect((await s.findForUser(TEST_IDS.USER_ID))?.emailNotifications).toBe(true);
    });
    it('unsubscribeAll() no-op', async () => {
      await expect(s.unsubscribeAll(TEST_IDS.USER_ID)).resolves.toBeUndefined();
    });
  });

  describe('UserAddressService', () => {
    let s: UserAddressService;
    beforeEach(() => { s = new UserAddressService(makeUserAddressRepositoryMock() as never); });
    it('add() returns DTO', async () => {
      const r = await s.add(TEST_IDS.USER_ID, {} as never);
      expect(r.userId).toBe(TEST_IDS.USER_ID);
      expect(r.country).toBe('BD');
    });
    it('update() returns DTO', async () => {
      expect((await s.update(TEST_IDS.ADDRESS_ID, { city: 'D' } as never)).id).toBe(TEST_IDS.ADDRESS_ID);
    });
    it('setDefault() no-op', async () => {
      await expect(s.setDefault(TEST_IDS.ADDRESS_ID, 'billing')).resolves.toBeUndefined();
    });
  });

  describe('UserContactService', () => {
    let s: UserContactService;
    beforeEach(() => { s = new UserContactService(makeUserContactRepositoryMock() as never); });
    it('add() returns DTO', async () => {
      expect((await s.add(TEST_IDS.USER_ID, {} as never)).userId).toBe(TEST_IDS.USER_ID);
    });
    it('update() returns DTO', async () => {
      expect((await s.update(TEST_IDS.CONTACT_ID, {} as never)).id).toBe(TEST_IDS.CONTACT_ID);
    });
    it('setPrimary() no-op', async () => {
      await expect(s.setPrimary(TEST_IDS.CONTACT_ID)).resolves.toBeUndefined();
    });
  });

  // ✅ UserVerificationService — (repo, eventBridge)
  describe('UserVerificationService', () => {
    let s: UserVerificationService;
    let repo: ReturnType<typeof makeUserVerificationRepositoryMock>;
    let eb: ReturnType<typeof makeEventBridgeMock>;
    beforeEach(() => {
      repo = makeUserVerificationRepositoryMock();
      eb = makeEventBridgeMock();
      repo.save.mockImplementation(async (e: unknown) => e as never);
      eb.publishFromEntity.mockResolvedValue(undefined);
      s = new UserVerificationService(repo as never, eb as never);
    });
    const stubVerification = {
      userId: { value: TEST_IDS.USER_ID }, emailVerified: false, phoneVerified: false,
      identityVerified: false, addressVerified: false,
      kycStatus: { value: 'pending' }, updatedAt: '',
      verifyEmail: jest.fn(), verifyPhone: jest.fn(), verifyIdentity: jest.fn(), verifyAddress: jest.fn(),
    };
    it('verifyPhone() saves', async () => {
      repo.findByUserIdRaw.mockResolvedValue(stubVerification as never);
      await s.verifyPhone(TEST_IDS.USER_ID);
      expect(repo.save).toHaveBeenCalled();
    });
    it('verifyIdentity() saves', async () => {
      repo.findByUserIdRaw.mockResolvedValue(stubVerification as never);
      await s.verifyIdentity(TEST_IDS.USER_ID);
      expect(repo.save).toHaveBeenCalled();
    });
    it('verifyAddress() saves', async () => {
      repo.findByUserIdRaw.mockResolvedValue(stubVerification as never);
      await s.verifyAddress(TEST_IDS.USER_ID);
      expect(repo.save).toHaveBeenCalled();
    });
    it('findForUser() present', async () => {
      repo.findByUserIdRaw.mockResolvedValue({
        userId: { value: TEST_IDS.USER_ID }, emailVerified: true, emailVerifiedAt: 'x',
        phoneVerified: false, phoneVerifiedAt: undefined, identityVerified: false,
        identityVerifiedAt: undefined, addressVerified: false, addressVerifiedAt: undefined,
        kycStatus: { value: 'pending' }, updatedAt: '',
      } as never);
      expect((await s.findForUser(TEST_IDS.USER_ID))?.emailVerified).toBe(true);
    });
  });

  // ✅ UserKycService — (repo, eventBridge)
  describe('UserKycService', () => {
    let s: UserKycService;
    let repo: ReturnType<typeof makeUserKycRepositoryMock>;
    let eb: ReturnType<typeof makeEventBridgeMock>;
    beforeEach(() => {
      repo = makeUserKycRepositoryMock();
      eb = makeEventBridgeMock();
      repo.save.mockImplementation(async (e: unknown) => e as never);
      eb.publishFromEntity.mockResolvedValue(undefined);
      s = new UserKycService(repo as never, eb as never);
    });
    it('verify() with found kyc', async () => {
      repo.findById.mockResolvedValue({
        id: 'k1', userId: { value: TEST_IDS.USER_ID }, status: { value: 'pending' },
        documents: [], verify: jest.fn(), reject: jest.fn(), updatedAt: '',
      } as never);
      const r = await s.verify('k1', 'admin');
      expect(r.status).toBe('verified');
    });
    it('reject() with found kyc', async () => {
      repo.findById.mockResolvedValue({
        id: 'k1', userId: { value: TEST_IDS.USER_ID }, status: { value: 'pending' },
        documents: [], verify: jest.fn(), reject: jest.fn(), updatedAt: '',
      } as never);
      const r = await s.reject('k1', 'reason', 'admin');
      expect(r.status).toBe('rejected');
    });
    it('findForUser() present', async () => {
      repo.findByUserIdRaw.mockResolvedValue({
        id: 'k1', userId: { value: TEST_IDS.USER_ID }, status: { value: 'pending' },
        documents: [], submittedAt: undefined, verifiedAt: undefined, rejectedAt: undefined,
        rejectionReason: undefined, expiresAt: undefined, updatedAt: '',
      } as never);
      expect((await s.findForUser(TEST_IDS.USER_ID))?.status).toBe('pending');
    });
  });

  describe('UserActivityService', () => {
    it('log() with metadata', async () => {
      const s = new UserActivityService(makeUserActivityRepositoryMock() as never);
      const r = await s.log({
        userId: TEST_IDS.USER_ID, type: 'login', description: 'x',
        ipAddress: TEST_IP, userAgent: TEST_USER_AGENT, deviceId: TEST_IDS.DEVICE_ID,
        metadata: { foo: 'bar' },
      });
      expect(r.metadata).toEqual({ foo: 'bar' });
    });
  });
});
