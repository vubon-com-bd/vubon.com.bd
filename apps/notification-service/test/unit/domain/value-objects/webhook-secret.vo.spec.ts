import { describe, it, expect } from '@jest/globals';
import { WebhookSecretVO } from '../../../../src/module/domain/value-objects/primitives/webhook-secret.vo.js';

describe('WebhookSecretVO', () => {
  it('create valid', () => {
    expect(WebhookSecretVO.create('0123456789abcdef0123456789abcdef').value).toBeDefined();
  });
  it('rejects short', () => expect(() => WebhookSecretVO.create('short')).toThrow());
  it('rejects long', () => expect(() => WebhookSecretVO.create('x'.repeat(257))).toThrow());
  it('reconstitute', () => expect(WebhookSecretVO.reconstitute('any').value).toBe('any'));
  it('masked', () => {
    const vo = WebhookSecretVO.create('0123456789abcdef');
    expect(vo.masked()).toBe('***');
  });
});
