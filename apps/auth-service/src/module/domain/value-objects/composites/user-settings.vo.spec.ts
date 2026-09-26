/**
 * UserSettingsVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { UserSettingsVO } from './user-settings.vo';
import { UserIdVO } from '../primitives/user-id.vo';

describe('UserSettingsVO', () => {
  const userId = UserIdVO.of('user-1');

  describe('defaults()', () => {
    it('should create default settings', () => {
      const vo = UserSettingsVO.defaults(userId);
      expect(vo.userId.value).toBe('user-1');
      expect(vo.twoFactorEnabled).toBe(false);
      expect(vo.wantsEmail()).toBe(true);
      expect(vo.wantsSms()).toBe(false);
      expect(vo.wantsPush()).toBe(true);
      expect(vo.wantsMarketing()).toBe(false);
    });
  });

  describe('of()', () => {
    const valid = {
      userId,
      twoFactorEnabled: true,
      emailNotifications: false,
      smsNotifications: true,
      pushNotifications: false,
      marketingEmails: true,
      language: 'en',
      timezone: 'UTC',
    };

    it('should create with custom values', () => {
      const vo = UserSettingsVO.of(valid);
      expect(vo.twoFactorEnabled).toBe(true);
      expect(vo.wantsEmail()).toBe(false);
      expect(vo.wantsSms()).toBe(true);
    });

    it('should reject empty language', () => {
      expect(() => UserSettingsVO.of({ ...valid, language: '' })).toThrow('Language is required');
    });

    it('should reject language <2 chars', () => {
      expect(() => UserSettingsVO.of({ ...valid, language: 'x' })).toThrow('Language is required');
    });

    it('should reject empty timezone', () => {
      expect(() => UserSettingsVO.of({ ...valid, timezone: '' })).toThrow('Timezone is required');
    });
  });

  describe('withTwoFactor()', () => {
    it('should return new VO with 2FA enabled', () => {
      const vo = UserSettingsVO.defaults(userId);
      const with2FA = vo.withTwoFactor(true);
      expect(with2FA.twoFactorEnabled).toBe(true);
      expect(vo.twoFactorEnabled).toBe(false); // original unchanged (immutable)
    });

    it('should return new VO with 2FA disabled', () => {
      const vo = UserSettingsVO.of({
        userId, twoFactorEnabled: true, emailNotifications: true,
        smsNotifications: false, pushNotifications: true, marketingEmails: false,
        language: 'en', timezone: 'UTC',
      });
      expect(vo.withTwoFactor(false).twoFactorEnabled).toBe(false);
    });
  });
});
