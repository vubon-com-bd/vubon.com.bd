/**
 * UserSettingsEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { UserSettingsEntity } from './user-settings.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildSettings = (overrides: Partial<Parameters<typeof UserSettingsEntity.create>[0]> = {}) =>
  UserSettingsEntity.create({
    id: 'user-1' as never,
    userId: 'user-1' as never,
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    language: 'bn',
    timezone: 'Asia/Dhaka',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('UserSettingsEntity', () => {
  describe('create() / defaults()', () => {
    it('should create with explicit values', () => {
      const s = buildSettings();
      expect(s.twoFactorEnabled).toBe(false);
      expect(s.userId).toBe('user-1');
    });

    it('defaults() should produce sensible defaults', () => {
      const s = UserSettingsEntity.defaults('user-1' as never, 'user-1' as never, NOW);
      expect(s.twoFactorEnabled).toBe(false);
      expect(s.emailNotifications).toBe(true);
      expect(s.smsNotifications).toBe(false);
      expect(s.pushNotifications).toBe(true);
      expect(s.marketingEmails).toBe(false);
      expect(s.language).toBe('bn');
      expect(s.timezone).toBe('Asia/Dhaka');
    });
  });

  describe('enableTwoFactor() / disableTwoFactor()', () => {
    it('should enable 2FA', () => {
      const s = buildSettings();
      s.enableTwoFactor();
      expect(s.twoFactorEnabled).toBe(true);
    });

    it('enableTwoFactor should be idempotent', () => {
      const s = buildSettings({ twoFactorEnabled: true });
      s.enableTwoFactor();
      expect(s.twoFactorEnabled).toBe(true);
    });

    it('should disable 2FA', () => {
      const s = buildSettings({ twoFactorEnabled: true });
      s.disableTwoFactor();
      expect(s.twoFactorEnabled).toBe(false);
    });
  });

  describe('updateNotifications()', () => {
    it('should update email notifications', () => {
      const s = buildSettings();
      s.updateNotifications({ email: false });
      expect(s.emailNotifications).toBe(false);
    });

    it('should update sms notifications', () => {
      const s = buildSettings();
      s.updateNotifications({ sms: true });
      expect(s.smsNotifications).toBe(true);
    });

    it('should update push notifications', () => {
      const s = buildSettings();
      s.updateNotifications({ push: false });
      expect(s.pushNotifications).toBe(false);
    });

    it('should update marketing emails', () => {
      const s = buildSettings();
      s.updateNotifications({ marketing: true });
      expect(s.marketingEmails).toBe(true);
    });

    it('should update multiple at once', () => {
      const s = buildSettings();
      s.updateNotifications({ email: false, sms: true, push: false, marketing: true });
      expect(s.emailNotifications).toBe(false);
      expect(s.smsNotifications).toBe(true);
      expect(s.pushNotifications).toBe(false);
      expect(s.marketingEmails).toBe(true);
    });

    it('should leave unspecified values unchanged', () => {
      const s = buildSettings();
      s.updateNotifications({ email: false });
      expect(s.smsNotifications).toBe(false);
      expect(s.pushNotifications).toBe(true);
    });
  });
});
