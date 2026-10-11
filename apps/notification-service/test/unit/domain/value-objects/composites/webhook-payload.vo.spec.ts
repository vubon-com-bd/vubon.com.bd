import { describe, it, expect } from '@jest/globals';
import { WebhookPayloadVO } from '../../../../../src/module/domain/value-objects/composites/webhook-payload.vo.js';

describe('WebhookPayloadVO', () => {
  it('create valid', () => {
    const vo = WebhookPayloadVO.create({
      body: { event: 'order.created', id: '1' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(vo.hasSignature()).toBe(false);
  });
  it('create with signature', () => {
    const vo = WebhookPayloadVO.create({
      body: {},
      headers: {},
      signature: 'sig_abc',
    });
    expect(vo.hasSignature()).toBe(true);
  });
  it('rejects too many headers', () => {
    const headers: Record<string, string> = {};
    for (let i = 0; i < 25; i++) headers[`h${i}`] = 'v';
    expect(() => WebhookPayloadVO.create({ body: {}, headers })).toThrow();
  });
  it('reconstitute', () => {
    const vo = WebhookPayloadVO.reconstitute({ body: { x: 1 }, headers: {} });
    expect(vo.body['x']).toBe(1);
  });
});
