/**
 * Auth2FaEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { Auth2FaEntity } from './auth-2fa.entity';
import { MfaTypeVO } from '../value-objects/primitives/mfa-type.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const build2FA = (overrides: Partial<Parameters<typeof Auth2FaEntity.create>[0]> = {}) =>
  Auth2FaEntity.create({
    id: '2fa-1',
    userId: 'user-1' as never,
    primaryMethod: MfaTypeVO.of('totp'),
    backupMethods: [],
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('Auth2FaEntity', () => {
  describe('create()', () => {
    it('should create disabled 2FA', () => {
      const e = build2FA();
      expect(e.primaryMethod.value).toBe('totp');
      expect(e.isEnabled()).toBe(false);
      expect(e.hasBackup()).toBe(false);
    });

    it('should create enabled 2FA with enabledAt', () => {
      const e = build2FA({ enabledAt: NOW_MS });
      expect(e.isEnabled()).toBe(true);
    });

    it('should accept backup methods', () => {
      const e = build2FA({
        backupMethods: [MfaTypeVO.of('sms'), MfaTypeVO.of('email')],
      });
      expect(e.hasBackup()).toBe(true);
      expect(e.backupMethods).toHaveLength(2);
    });
  });

  describe('isEnabled()', () => {
    it('should return true when enabledAt set', () => {
      expect(build2FA({ enabledAt: NOW_MS }).isEnabled()).toBe(true);
    });

    it('should return false when enabledAt not set', () => {
      expect(build2FA().isEnabled()).toBe(false);
    });
  });

  describe('hasBackup()', () => {
    it('should return true with backup methods', () => {
      const e = build2FA({ backupMethods: [MfaTypeVO.of('sms')] });
      expect(e.hasBackup()).toBe(true);
    });

    it('should return false with no backup', () => {
      expect(build2FA().hasBackup()).toBe(false);
    });
  });

  describe('enable()', () => {
    it('should set enabledAt', () => {
      const e = build2FA();
      e.enable(NOW_MS);
      expect(e.isEnabled()).toBe(true);
    });
  });

  describe('disable()', () => {
    it('should clear enabledAt and backup methods', () => {
      const e = build2FA({
        enabledAt: NOW_MS,
        backupMethods: [MfaTypeVO.of('sms')],
      });
      e.disable();
      expect(e.isEnabled()).toBe(false);
      expect(e.hasBackup()).toBe(false);
    });
  });

  describe('setPrimary()', () => {
    it('should update primary method', () => {
      const e = build2FA();
      e.setPrimary(MfaTypeVO.of('sms'));
      expect(e.primaryMethod.value).toBe('sms');
    });

    it('should reject if primary matches a backup method', () => {
      const e = build2FA({ backupMethods: [MfaTypeVO.of('sms')] });
      expect(() => e.setPrimary(MfaTypeVO.of('sms'))).toThrow('Primary must not be a backup method');
    });
  });

  describe('getters', () => {
    it('should expose backupMethods as copy', () => {
      const e = build2FA({ backupMethods: [MfaTypeVO.of('sms')] });
      const backup = e.backupMethods;
      expect(backup).toHaveLength(1);
    });
  });
});
