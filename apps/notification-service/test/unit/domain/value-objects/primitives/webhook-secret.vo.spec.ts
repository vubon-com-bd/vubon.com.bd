import { WebhookSecretVO } from '@domain/primitives/webhook-secret.vo.js';
import { InvalidWebhookSecretError } from '@domain/errors/webhook.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('WebhookSecretVO', () => {
  it('accepts valid secret', () => {
    expect(WebhookSecretVO.create(IDS.webhookSecret).value).toBe(IDS.webhookSecret);
  });

  it('rejects too short (<16)', () => {
    expect(() => WebhookSecretVO.create('short')).toThrow(InvalidWebhookSecretError);
  });

  it('rejects too long (>256)', () => {
    expect(() => WebhookSecretVO.create('a'.repeat(257))).toThrow(InvalidWebhookSecretError);
  });

  it('rejects non-string', () => {
    expect(() => WebhookSecretVO.create(123 as any)).toThrow(InvalidWebhookSecretError);
  });

  describe('masked', () => {
    it('shows first 4 + last 4', () => {
      const masked = WebhookSecretVO.create(IDS.webhookSecret).masked;
      expect(masked.slice(0, 4)).toBe(IDS.webhookSecret.slice(0, 4));
      expect(masked.slice(-4)).toBe(IDS.webhookSecret.slice(-4));
      expect(masked).toContain('*');
    });

    it('short secret masks fully', () => {
      const short = 'a'.repeat(16);
      const masked = WebhookSecretVO.create(short).masked;
      expect(masked).toBe('a'.repeat(4) + '*'.repeat(8) + 'a'.repeat(4));
    });
  });

  it('reconstitute skips validation', () => {
    expect(WebhookSecretVO.reconstitute('x').value).toBe('x');
  });
});
