/**
 * UserPreferencesEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { UserPreferencesEntity } from './user-preferences.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildPrefs = (overrides: Partial<Parameters<typeof UserPreferencesEntity.create>[0]> = {}) =>
  UserPreferencesEntity.create({
    id: 'user-1' as never,
    userId: 'user-1' as never,
    theme: 'system',
    currency: 'BDT',
    dateFormat: 'DD/MM/YYYY',
    reduceMotion: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('UserPreferencesEntity', () => {
  describe('create()', () => {
    it('should create with valid values', () => {
      const p = buildPrefs();
      expect(p.theme).toBe('system');
      expect(p.currency).toBe('BDT');
    });
  });

  describe('setTheme()', () => {
    it('should accept light/dark/system', () => {
      const p = buildPrefs();
      p.setTheme('dark');
      expect(p.theme).toBe('dark');
      p.setTheme('light');
      expect(p.theme).toBe('light');
      p.setTheme('system');
      expect(p.theme).toBe('system');
    });

    it('should reject invalid theme', () => {
      const p = buildPrefs();
      expect(() => p.setTheme('neon' as never)).toThrow('Invalid theme');
    });
  });

  describe('setCurrency()', () => {
    it('should update currency', () => {
      const p = buildPrefs();
      p.setCurrency('USD');
      expect(p.currency).toBe('USD');
    });

    it('should uppercase', () => {
      const p = buildPrefs();
      p.setCurrency('usd');
      expect(p.currency).toBe('USD');
    });

    it('should reject non-3-letter currency', () => {
      const p = buildPrefs();
      expect(() => p.setCurrency('US')).toThrow('Currency must be ISO 4217 (3 letters)');
      expect(() => p.setCurrency('USDD')).toThrow('Currency must be ISO 4217 (3 letters)');
    });
  });

  describe('setReduceMotion()', () => {
    it('should update reduceMotion', () => {
      const p = buildPrefs();
      p.setReduceMotion(true);
      expect(p.reduceMotion).toBe(true);
      p.setReduceMotion(false);
      expect(p.reduceMotion).toBe(false);
    });
  });
});
