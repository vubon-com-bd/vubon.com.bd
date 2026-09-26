/**
 * UserPreferencesVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { UserPreferencesVO } from './user-preferences.vo';
import { UserIdVO } from '../primitives/user-id.vo';

describe('UserPreferencesVO', () => {
  const userId = UserIdVO.of('user-1');

  describe('defaults()', () => {
    it('should create default preferences', () => {
      const vo = UserPreferencesVO.defaults(userId);
      expect(vo.theme).toBe('system');
      expect(vo.isDark()).toBe(false);
    });
  });

  describe('of()', () => {
    const valid = {
      userId,
      theme: 'dark' as const,
      currency: 'USD',
      dateFormat: 'YYYY-MM-DD',
      reduceMotion: true,
    };

    it('should accept valid preferences', () => {
      const vo = UserPreferencesVO.of(valid);
      expect(vo.theme).toBe('dark');
      expect(vo.isDark()).toBe(true);
    });

    it('should reject invalid theme', () => {
      expect(() => UserPreferencesVO.of({ ...valid, theme: 'neon' as never })).toThrow('Invalid theme');
    });

    it('should reject non-3-letter currency', () => {
      expect(() => UserPreferencesVO.of({ ...valid, currency: 'US' })).toThrow('ISO 4217');
      expect(() => UserPreferencesVO.of({ ...valid, currency: 'USDD' })).toThrow('ISO 4217');
    });
  });
});
