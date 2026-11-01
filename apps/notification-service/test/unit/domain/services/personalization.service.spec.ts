import { PersonalizationService } from '@domain/services/personalization.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('PersonalizationService', () => {
  describe('personalize()', () => {
    it('adds user.id and user.name tokens', () => {
      const result = PersonalizationService.personalize({
        data: {},
        context: {
          userId: IDS.userId,
          userName: 'Rahim',
          locale: 'bn',
          timezone: 'Asia/Dhaka',
        },
      });
      expect(result.data['user.id']).toBe(IDS.userId);
      expect(result.data['user.name']).toBe('Rahim');
      expect(result.appliedKeys).toContain('user.id');
    });

    it('maps locale en → en-US', () => {
      const result = PersonalizationService.personalize({
        data: {},
        context: { userId: IDS.userId, locale: 'en', timezone: 'UTC' },
      });
      expect(result.data['user.locale']).toBe('en-US');
    });

    it('maps locale bn → bn-BD', () => {
      const result = PersonalizationService.personalize({
        data: {},
        context: { userId: IDS.userId, locale: 'bn', timezone: 'Asia/Dhaka' },
      });
      expect(result.data['user.locale']).toBe('bn-BD');
    });

    it('preserves custom locale as-is', () => {
      const result = PersonalizationService.personalize({
        data: {},
        context: { userId: IDS.userId, locale: 'fr-FR', timezone: 'Europe/Paris' },
      });
      expect(result.data['user.locale']).toBe('fr-FR');
    });

    it('defaults timezone when empty', () => {
      const result = PersonalizationService.personalize({
        data: {},
        context: { userId: IDS.userId, locale: 'en', timezone: '' },
      });
      expect(result.data['user.timezone']).toBe('Asia/Dhaka');
    });

    it('provides firstName/lastName', () => {
      const result = PersonalizationService.personalize({
        data: {},
        context: {
          userId: IDS.userId,
          firstName: 'Rahim',
          lastName: 'Khan',
          locale: 'en',
          timezone: 'UTC',
        },
      });
      expect(result.data['user.firstName']).toBe('Rahim');
      expect(result.data['user.lastName']).toBe('Khan');
    });

    it('merges metadata', () => {
      const result = PersonalizationService.personalize({
        data: {},
        context: {
          userId: IDS.userId,
          locale: 'en',
          timezone: 'UTC',
          metadata: { customKey: 'value' },
        },
      });
      expect(result.data.customKey).toBe('value');
    });

    it('does not override existing data', () => {
      const result = PersonalizationService.personalize({
        data: { 'user.name': 'Custom' },
        context: { userId: IDS.userId, userName: 'Original', locale: 'en', timezone: 'UTC' },
      });
      expect(result.data['user.name']).toBe('Custom');
    });

    it('provides now.iso and now.date', () => {
      const result = PersonalizationService.personalize({
        data: {},
        context: { userId: IDS.userId, locale: 'en', timezone: 'UTC' },
      });
      expect(typeof result.data['now.iso']).toBe('string');
      expect(typeof result.data['now.date']).toBe('string');
    });

    it('throws on empty userId', () => {
      expect(() =>
        PersonalizationService.personalize({
          data: {},
          context: { userId: '', locale: 'en', timezone: 'UTC' },
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('greeting()', () => {
    it('returns Good morning before noon', () => {
      const date = new Date('2025-01-15T08:00:00Z');
      expect(PersonalizationService.greeting('UTC', date)).toBe('Good morning');
    });

    it('returns Good afternoon between noon and 6pm', () => {
      const date = new Date('2025-01-15T14:00:00Z');
      expect(PersonalizationService.greeting('UTC', date)).toBe('Good afternoon');
    });

    it('returns Good evening after 6pm', () => {
      const date = new Date('2025-01-15T20:00:00Z');
      expect(PersonalizationService.greeting('UTC', date)).toBe('Good evening');
    });

    it('handles invalid timezone with fallback', () => {
      const date = new Date('2025-01-15T14:00:00Z');
      const greeting = PersonalizationService.greeting('Invalid/Zone', date);
      expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(greeting);
    });
  });
});
