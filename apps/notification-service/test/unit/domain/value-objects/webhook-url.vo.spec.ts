import { describe, it, expect } from '@jest/globals';
import { WebhookUrlVO } from '../../../../src/module/domain/value-objects/primitives/webhook-url.vo.js';

describe('WebhookUrlVO', () => {
  it('create valid HTTPS', () => {
    const vo = WebhookUrlVO.create('https://example.com/hook');
    expect(vo.host).toBe('example.com');
    expect(vo.scheme).toBe('https:');
  });
  it('rejects http', () => expect(() => WebhookUrlVO.create('http://example.com')).toThrow());
  it('rejects empty', () => expect(() => WebhookUrlVO.create('')).toThrow());
  it('rejects invalid', () => expect(() => WebhookUrlVO.create('not-a-url')).toThrow());
  it('reconstitute', () => expect(WebhookUrlVO.reconstitute('any').value).toBe('any'));
});
