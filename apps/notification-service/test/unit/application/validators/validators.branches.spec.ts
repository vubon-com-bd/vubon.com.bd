import { describe, it, expect } from '@jest/globals';
import { BroadcastValidator } from '../../../../src/module/application/validators/broadcast.validator.js';
import { TemplateValidator } from '../../../../src/module/application/validators/template.validator.js';
import { WebhookValidator } from '../../../../src/module/application/validators/webhook.validator.js';

describe('BroadcastValidator branches', () => {
  it('validateBroadcast invalid → throws ApplicationValidationError', () => {
    expect(() => BroadcastValidator.validateBroadcast({})).toThrow();
  });

  it('validateChannels empty → throws', () => {
    expect(() => BroadcastValidator.validateChannels([])).toThrow();
  });

  it('validateChannels > 10 → throws', () => {
    expect(() =>
      BroadcastValidator.validateChannels(Array.from({ length: 11 }, (_, i) => `c${i}`)),
    ).toThrow();
  });

  it('validateChannels valid', () => {
    expect(BroadcastValidator.validateChannels(['email'])).toEqual(['email']);
  });

  it('validateChannels non-array', () => {
    expect(() => BroadcastValidator.validateChannels('not-array')).toThrow();
  });
});

describe('TemplateValidator branches', () => {
  it('validateTemplate invalid → throws', () => {
    expect(() => TemplateValidator.validateTemplate({})).toThrow();
  });

  it('validateTemplate valid', () => {
    expect(() => TemplateValidator.validateTemplate({
      id: 't-1', name: 'N', slug: 's', type: 'email', status: 'active',
      category: 'order', locale: 'en', subject: 'S', body: 'B',
      variables: [], version: 1, createdBy: 'u',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })).not.toThrow();
  });

  it('validateType valid', () => {
    expect(TemplateValidator.validateType('email')).toBe('email');
  });

  it('validateType invalid', () => {
    expect(() => TemplateValidator.validateType('bad')).toThrow();
  });
});

describe('WebhookValidator branches', () => {
  it('validateWebhook invalid → throws', () => {
    expect(() => WebhookValidator.validateWebhook({})).toThrow();
  });

  it('validateUrl non-string', () => {
    expect(() => WebhookValidator.validateUrl(123)).toThrow();
  });

  it('validateUrl non-https throws ApplicationValidationError inside try', () => {
    expect(() => WebhookValidator.validateUrl('http://example.com')).toThrow();
  });

  it('validateUrl invalid URL', () => {
    expect(() => WebhookValidator.validateUrl('not-a-url')).toThrow();
  });

  it('validateUrl valid https', () => {
    expect(WebhookValidator.validateUrl('https://x.com')).toBe('https://x.com');
  });
});
