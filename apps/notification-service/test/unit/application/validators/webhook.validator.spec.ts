import { describe, it, expect } from '@jest/globals';
import { WebhookValidator } from '../../../../src/module/application/validators/webhook.validator.js';

const validWebhook = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Test',
  url: 'https://example.com/hook',
  method: 'POST',
  events: ['order.created'],
  status: 'active',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('WebhookValidator', () => {
  it('validateWebhook ok', () => {
    expect(() => WebhookValidator.validateWebhook(validWebhook)).not.toThrow();
  });

  it('validateWebhook fails', () => {
    expect(() => WebhookValidator.validateWebhook({})).toThrow();
  });

  it('validateUrl ok', () => {
    expect(WebhookValidator.validateUrl('https://example.com')).toBe('https://example.com');
  });

  it('validateUrl non-https fails', () => {
    expect(() => WebhookValidator.validateUrl('http://example.com')).toThrow();
  });

  it('validateUrl non-string fails', () => {
    expect(() => WebhookValidator.validateUrl(123)).toThrow();
  });

  it('validateUrl invalid fails', () => {
    expect(() => WebhookValidator.validateUrl('not-a-url')).toThrow();
  });
});
