import { UnsubscribeService } from '@domain/services/unsubscribe.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('UnsubscribeService', () => {
  const payload = {
    userId: IDS.userId,
    channel: 'email',
    category: 'marketing',
    expiresAt: Date.now() + 86_400_000,
  };

  describe('encodeToken()', () => {
    it('produces base64url string', () => {
      const token = UnsubscribeService.encodeToken(payload);
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });
  });

  describe('decodeToken()', () => {
    it('round-trips', () => {
      const token = UnsubscribeService.encodeToken(payload);
      const decoded = UnsubscribeService.decodeToken(token);
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.channel).toBe('email');
    });

    it('throws on expired token', () => {
      const token = UnsubscribeService.encodeToken({
        ...payload,
        expiresAt: Date.now() - 1000,
      });
      expect(() => UnsubscribeService.decodeToken(token)).toThrow(BusinessRuleError);
    });

    it('throws on invalid base64', () => {
      expect(() => UnsubscribeService.decodeToken('!!!!!')).toThrow(BusinessRuleError);
    });

    it('throws on missing fields', () => {
      const emptyToken = Buffer.from('{}').toString('base64url');
      expect(() => UnsubscribeService.decodeToken(emptyToken)).toThrow(BusinessRuleError);
    });
  });

  describe('createUrl()', () => {
    it('creates URL with token param', () => {
      const url = UnsubscribeService.createUrl({
        baseUrl: 'https://example.com/unsubscribe',
        payload,
      });
      expect(url).toContain('token=');
      expect(url).toContain('example.com');
    });

    it('respects custom TTL', () => {
      const url = UnsubscribeService.createUrl({
        baseUrl: 'https://example.com/unsubscribe',
        payload: { ...payload, expiresAt: 0 },
        ttlMs: 3_600_000,
      });
      expect(url).toContain('token=');
    });
  });

  describe('isFullyUnsubscribed()', () => {
    it('true when all channels disabled', () => {
      expect(
        UnsubscribeService.isFullyUnsubscribed(['email', 'sms', 'push', 'in_app', 'webhook', 'whatsapp']),
      ).toBe(true);
    });

    it('false when some enabled', () => {
      expect(UnsubscribeService.isFullyUnsubscribed(['email', 'sms'])).toBe(false);
    });
  });

  describe('isCategoryUnsubscribed()', () => {
    it('true when in list', () => {
      expect(UnsubscribeService.isCategoryUnsubscribed(['marketing'], 'marketing')).toBe(true);
    });

    it('false when not', () => {
      expect(UnsubscribeService.isCategoryUnsubscribed(['marketing'], 'order')).toBe(false);
    });
  });
});
