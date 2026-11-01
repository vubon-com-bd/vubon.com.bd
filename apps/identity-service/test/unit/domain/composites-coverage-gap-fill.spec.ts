/**
 * Coverage gap-fill — All composite VOs comprehensive
 * @module identity-service/test/unit/domain
 */
import { describe, it, expect } from '@jest/globals';

import { DeviceVO } from '@domain/value-objects/composites/device.vo.js';
import { RoleVO } from '@domain/value-objects/composites/role.vo.js';
import { VerificationVO } from '@domain/value-objects/composites/verification.vo.js';
import { AccountLockVO } from '@domain/value-objects/composites/account-lock.vo.js';
import { SessionVO } from '@domain/value-objects/composites/session.vo.js';

import { DeviceIdVO } from '@domain/value-objects/primitives/device-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { DeviceTypeVO } from '@domain/value-objects/primitives/device-type.vo.js';
import { DeviceFingerprintVO } from '@domain/value-objects/primitives/device-fingerprint.vo.js';
import { RoleIdVO } from '@domain/value-objects/primitives/role-id.vo.js';
import { RoleNameVO } from '@domain/value-objects/primitives/role-name.vo.js';
import { PermissionNameVO } from '@domain/value-objects/primitives/permission-name.vo.js';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { VerificationStatusVO } from '@domain/value-objects/primitives/verification-status.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import { LockReasonVO } from '@domain/value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '@domain/value-objects/primitives/lock-duration.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { SessionStatusVO } from '@domain/value-objects/primitives/session-status.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';

import { TEST_IDS, TEST_EMAIL, TEST_FINGERPRINT, TEST_IP, TEST_OTP_CODE } from '@fixtures/index.js';

const NOW = new Date().toISOString();

describe('Composite VO Coverage Gap-Fill', () => {
  // ─── DeviceVO getters (59-67, 70-71) ───
  describe('DeviceVO — all getters', () => {
    const makeDeviceVO = (overrides: Partial<Record<string, unknown>> = {}) =>
      DeviceVO.create({
        id: DeviceIdVO.create(TEST_IDS.DEVICE_ID),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        type: DeviceTypeVO.desktop(),
        fingerprint: DeviceFingerprintVO.create(TEST_FINGERPRINT),
        name: 'Test Device',
        os: 'Android',
        browser: 'Chrome',
        appVersion: '1.0.0',
        ipAddress: IpAddressVO.create(TEST_IP),
        userAgent: undefined,
        trusted: false,
        lastActiveAt: NOW,
        createdAt: NOW,
        ...overrides,
      });

    it('all getters accessible', () => {
      const v = makeDeviceVO();
      expect(v.id.value).toBe(TEST_IDS.DEVICE_ID);
      expect(v.userId.value).toBe(TEST_IDS.USER_ID);
      expect(v.type.value).toBe('desktop');
      expect(v.fingerprint.value).toBe(TEST_FINGERPRINT);
      expect(v.name).toBe('Test Device');
      expect(v.os).toBe('Android');
      expect(v.browser).toBe('Chrome');
      expect(v.appVersion).toBe('1.0.0');
      expect(v.ipAddress?.value).toBe(TEST_IP);
      expect(v.userAgent).toBeUndefined();
      expect(v.trusted).toBe(false);
      expect(v.trustedUntil).toBeUndefined();
      expect(v.lastActiveAt).toBe(NOW);
      expect(v.createdAt).toBe(NOW);
    });

    it('optional getters undefined', () => {
      const v = makeDeviceVO({ name: undefined, os: undefined, browser: undefined, appVersion: undefined, ipAddress: undefined });
      expect(v.name).toBeUndefined();
      expect(v.os).toBeUndefined();
      expect(v.browser).toBeUndefined();
      expect(v.appVersion).toBeUndefined();
      expect(v.ipAddress).toBeUndefined();
    });

    it('trusted with future until', () => {
      const v = makeDeviceVO({
        trusted: true,
        trustedUntil: new Date(Date.now() + 86400000).toISOString(),
      });
      expect(v.trustedUntil).toBeDefined();
      expect(v.isTrustActive()).toBe(true);
    });

    it('isTrustActive with expired until', () => {
      const v = makeDeviceVO({
        trusted: true,
        trustedUntil: new Date(Date.now() - 86400000).toISOString(),
      });
      expect(v.isTrustActive()).toBe(false);
    });
  });

  // ─── RoleVO getters + methods (46, 48, 50-53) ───
  describe('RoleVO — all getters + hasPermission', () => {
    const makeRoleVO = (perms = ['auth:login', 'user:view']) =>
      RoleVO.create({
        id: RoleIdVO.create(TEST_IDS.ROLE_ID),
        name: RoleNameVO.create('admin'),
        description: 'System admin role',
        level: 90,
        isSystemRole: true,
        permissions: perms.map((p) => PermissionNameVO.create(p)),
        createdAt: NOW,
        updatedAt: NOW,
      });

    it('all getters', () => {
      const v = makeRoleVO();
      expect(v.id.value).toBe(TEST_IDS.ROLE_ID);
      expect(v.name.value).toBe('admin');
      expect(v.description).toBe('System admin role');
      expect(v.level).toBe(90);
      expect(v.isSystemRole).toBe(true);
      expect(v.permissions.length).toBe(2);
      expect(v.createdAt).toBe(NOW);
      expect(v.updatedAt).toBe(NOW);
    });

    it('description undefined branch', () => {
      const v = RoleVO.create({
        id: RoleIdVO.create(TEST_IDS.ROLE_ID),
        name: RoleNameVO.create('customer'),
        level: 20,
        isSystemRole: false,
        permissions: [],
        createdAt: NOW,
        updatedAt: NOW,
      });
      expect(v.description).toBeUndefined();
      expect(v.level).toBe(20);
      expect(v.isSystemRole).toBe(false);
    });

    it('hasPermission returns true on exact match', () => {
      const v = makeRoleVO();
      expect(v.hasPermission('auth:login')).toBe(true);
    });

    it('hasPermission returns false on non-match', () => {
      const v = makeRoleVO();
      expect(v.hasPermission('admin:all')).toBe(false);
    });

    it('hasPermission returns true on wildcard', () => {
      const v = makeRoleVO(['*']);
      expect(v.hasPermission('anything:anywhere')).toBe(true);
    });

    it('isHigherThan compares levels', () => {
      const admin = makeRoleVO();
      const low = RoleVO.create({
        id: RoleIdVO.create(TEST_IDS.ROLE_ID_2),
        name: RoleNameVO.create('customer'),
        level: 20,
        isSystemRole: false,
        permissions: [],
        createdAt: NOW,
        updatedAt: NOW,
      });
      expect(admin.isHigherThan(low)).toBe(true);
      expect(low.isHigherThan(admin)).toBe(false);
    });
  });

  // ─── VerificationVO getters + predicates (73-87) ───
  describe('VerificationVO — getters + predicates', () => {
    const makeVerif = (overrides: Partial<Record<string, unknown>> = {}) =>
      VerificationVO.create({
        id: VerificationIdVO.create(TEST_IDS.VERIFICATION_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        target: IdentifierVO.email(TEST_EMAIL),
        channel: VerificationChannelVO.email(),
        purpose: VerificationPurposeVO.emailVerify(),
        status: VerificationStatusVO.pending(),
        code: OtpCodeVO.create(TEST_OTP_CODE),
        attempts: 0,
        maxAttempts: 5,
        resendCount: 0,
        maxResend: 3,
        createdAt: NOW,
        expiresAt: new Date(Date.now() + 300000).toISOString(),
        ...overrides,
      });

    it('all getters', () => {
      const v = makeVerif();
      expect(v.id.value).toBe(TEST_IDS.VERIFICATION_ID);
      expect(v.authId.value).toBe(TEST_IDS.AUTH_ID);
      expect(v.userId.value).toBe(TEST_IDS.USER_ID);
      expect(v.target.normalized).toBe(TEST_EMAIL);
      expect(v.channel.value).toBe('email');
      expect(v.purpose.value).toBe('email_verify');
      expect(v.status.value).toBe('pending');
      expect(v.code?.value).toBe(TEST_OTP_CODE);
      expect(v.attempts).toBe(0);
      expect(v.maxAttempts).toBe(5);
      expect(v.resendCount).toBe(0);
      expect(v.maxResend).toBe(3);
      expect(v.createdAt).toBe(NOW);
      expect(v.verifiedAt).toBeUndefined();
    });

    it('code undefined branch', () => {
      const v = makeVerif({ code: undefined });
      expect(v.code).toBeUndefined();
    });

    it('verifiedAt branch', () => {
      const v = makeVerif({ verifiedAt: NOW, status: VerificationStatusVO.verified() });
      expect(v.verifiedAt).toBe(NOW);
    });

    it('isExpired() false for future', () => {
      expect(makeVerif().isExpired()).toBe(false);
    });

    it('isExpired() true for past', () => {
      const v = makeVerif({ expiresAt: new Date(Date.now() - 1000).toISOString() });
      expect(v.isExpired()).toBe(true);
    });

    it('canAttempt() true when pending + has attempts', () => {
      expect(makeVerif().canAttempt()).toBe(true);
    });

    it('canAttempt() false when maxed', () => {
      const v = makeVerif({ attempts: 5 });
      expect(v.canAttempt()).toBe(false);
    });

    it('canResend() true when under max', () => {
      expect(makeVerif().canResend()).toBe(true);
    });

    it('canResend() false when maxed', () => {
      const v = makeVerif({ resendCount: 3 });
      expect(v.canResend()).toBe(false);
    });
  });

  // ─── AccountLockVO getters + predicates (49, 59-67) ───
  describe('AccountLockVO — getters + predicates', () => {
    const makeLock = (overrides: Partial<Record<string, unknown>> = {}) =>
      AccountLockVO.create({
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        reason: LockReasonVO.create('too_many_attempts'),
        duration: LockDurationVO.fromSeconds(3600),
        lockedAt: NOW,
        lockedUntil: new Date(Date.now() + 3600000).toISOString(),
        attemptCount: 5,
        ipAddress: IpAddressVO.create(TEST_IP),
        ...overrides,
      });

    it('all getters', () => {
      const v = makeLock();
      expect(v.authId.value).toBe(TEST_IDS.AUTH_ID);
      expect(v.reason.value).toBe('too_many_attempts');
      expect(v.duration.seconds).toBe(3600);
      expect(v.lockedAt).toBe(NOW);
      expect(v.lockedUntil).toBeDefined();
      expect(v.attemptCount).toBe(5);
      expect(v.ipAddress?.value).toBe(TEST_IP);
      expect(v.unlockedAt).toBeUndefined();
      expect(v.unlockedBy).toBeUndefined();
    });

    it('optional getters undefined', () => {
      const v = makeLock({ ipAddress: undefined });
      expect(v.ipAddress).toBeUndefined();
    });

    it('isActive() true for future lockedUntil', () => {
      expect(makeLock().isActive()).toBe(true);
    });

    it('isActive() false when unlockedAt set', () => {
      const v = makeLock({ unlockedAt: NOW });
      expect(v.isActive()).toBe(false);
    });

    it('isExpired() false for future', () => {
      expect(makeLock().isExpired()).toBe(false);
    });

    it('isExpired() true for past lockedUntil', () => {
      const v = makeLock({
        lockedAt: new Date(Date.now() - 7200000).toISOString(),
        lockedUntil: new Date(Date.now() - 3600000).toISOString(),
      });
      expect(v.isExpired()).toBe(true);
    });
  });

  // ─── SessionVO remaining branches (61-73) ───
  describe('SessionVO — remaining branches', () => {
    const build = (overrides: Partial<Record<string, unknown>> = {}) =>
      SessionVO.create({
        id: SessionIdVO.create(TEST_IDS.SESSION_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        status: SessionStatusVO.active(),
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: Math.floor(Date.now() / 1000) + 86400,
          idleTimeoutSeconds: 1800,
        }),
        ipAddress: IpAddressVO.create(TEST_IP),
        userAgent: undefined,
        deviceId: undefined,
        rememberMe: false,
        createdAt: NOW,
        lastAccessedAt: NOW,
        ...overrides,
      });

    it('all getters', () => {
      const v = build();
      expect(v.id.value).toBe(TEST_IDS.SESSION_ID);
      expect(v.authId.value).toBe(TEST_IDS.AUTH_ID);
      expect(v.userId.value).toBe(TEST_IDS.USER_ID);
      expect(v.status.value).toBe('active');
      expect(v.ipAddress?.value).toBe(TEST_IP);
      expect(v.userAgent).toBeUndefined();
      expect(v.deviceId).toBeUndefined();
      expect(v.rememberMe).toBe(false);
      expect(v.createdAt).toBe(NOW);
      expect(v.lastAccessedAt).toBe(NOW);
      expect(v.refreshedAt).toBeUndefined();
      expect(v.revokedAt).toBeUndefined();
      expect(v.revokedReason).toBeUndefined();
    });

    it('refreshed + revoked getters', () => {
      const v = build({
        refreshedAt: NOW,
        revokedAt: NOW,
        revokedReason: 'test',
      });
      expect(v.refreshedAt).toBe(NOW);
      expect(v.revokedAt).toBe(NOW);
      expect(v.revokedReason).toBe('test');
    });

    it('isExpired false for future', () => {
      expect(build().isExpired()).toBe(false);
    });

    it('isIdleExpired false for fresh', () => {
      expect(build().isIdleExpired()).toBe(false);
    });

    it('isIdleExpired true for old lastAccessedAt', () => {
      const v = build({
        lastAccessedAt: new Date(Date.now() - 7200000).toISOString(),
      });
      expect(v.isIdleExpired()).toBe(true);
    });

    it('isExpired true for past absolute', () => {
      const v = build({
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: Math.floor(Date.now() / 1000) - 100,
          idleTimeoutSeconds: 1800,
        }),
      });
      expect(v.isExpired()).toBe(true);
    });
  });
});
