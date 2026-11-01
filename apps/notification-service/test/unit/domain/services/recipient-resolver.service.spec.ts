import { RecipientResolverService } from '@domain/services/recipient-resolver.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('RecipientResolverService', () => {
  describe('resolve()', () => {
    it('resolves email recipient', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'email', email: 'u@example.com' },
      ]);
      expect(result.resolved.length).toBe(1);
      expect(result.resolved[0]!.channel.value).toBe('email');
    });

    it('resolves sms recipient', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'sms', phone: '+8801712345678' },
      ]);
      expect(result.resolved.length).toBe(1);
    });

    it('resolves push recipient', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'push', deviceToken: IDS.deviceToken },
      ]);
      expect(result.resolved.length).toBe(1);
    });

    it('resolves webhook recipient', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'webhook', webhookUrl: 'https://example.com/h' },
      ]);
      expect(result.resolved.length).toBe(1);
    });

    it('resolves in_app recipient (no destination)', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'in_app' },
      ]);
      expect(result.resolved.length).toBe(1);
    });

    it('deduplicates same userId+channel+destination', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'email', email: 'u@example.com' },
        { userId: IDS.userId, channel: 'email', email: 'u@example.com' },
      ]);
      expect(result.resolved.length).toBe(1);
      expect(result.skipped.length).toBe(1);
    });

    it('skips invalid email', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'email', email: 'not-email' },
        { userId: IDS.userId2, channel: 'email', email: 'u2@example.com' },
      ]);
      expect(result.resolved.length).toBe(1);
      expect(result.skipped.length).toBe(1);
    });

    it('throws when empty input', () => {
      expect(() => RecipientResolverService.resolve([])).toThrow(BusinessRuleError);
    });

    it('throws when all invalid', () => {
      expect(() =>
        RecipientResolverService.resolve([
          { userId: IDS.userId, channel: 'email', email: 'bad' },
        ]),
      ).toThrow(ValidationError);
    });

    it('rejects email channel without email', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'email' },
        { userId: IDS.userId2, channel: 'email', email: 'u2@example.com' },
      ]);
      expect(result.skipped.length).toBe(1);
    });

    it('rejects sms channel without phone', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'sms' },
        { userId: IDS.userId2, channel: 'sms', phone: '+8801712345678' },
      ]);
      expect(result.skipped.length).toBe(1);
    });

    it('rejects push without token', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'push' },
        { userId: IDS.userId2, channel: 'push', deviceToken: IDS.deviceToken },
      ]);
      expect(result.skipped.length).toBe(1);
    });

    it('rejects webhook without url', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'webhook' },
        { userId: IDS.userId2, channel: 'webhook', webhookUrl: 'https://example.com/h' },
      ]);
      expect(result.skipped.length).toBe(1);
    });

    it('rejects whatsapp without phone', () => {
      const result = RecipientResolverService.resolve([
        { userId: IDS.userId, channel: 'whatsapp' },
        { userId: IDS.userId2, channel: 'whatsapp', phone: '+8801712345678' },
      ]);
      expect(result.skipped.length).toBe(1);
    });
  });
});
