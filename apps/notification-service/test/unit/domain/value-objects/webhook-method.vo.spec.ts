import { describe, it, expect } from '@jest/globals';
import { WebhookMethodVO } from '../../../../src/module/domain/value-objects/primitives/webhook-method.vo.js';

describe('WebhookMethodVO', () => {
  it('create + reconstitute', () => {
    expect(WebhookMethodVO.create('POST').value).toBe('POST');
    expect(WebhookMethodVO.create('post').value).toBe('POST');
    expect(() => WebhookMethodVO.create('bad')).toThrow();
    expect(WebhookMethodVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(WebhookMethodVO.get().value).toBe('GET');
    expect(WebhookMethodVO.post().value).toBe('POST');
    expect(WebhookMethodVO.put().value).toBe('PUT');
    expect(WebhookMethodVO.patch().value).toBe('PATCH');
    expect(WebhookMethodVO.delete().value).toBe('DELETE');
  });
  it('predicates + hasBody', () => {
    expect(WebhookMethodVO.get().isGet()).toBe(true);
    expect(WebhookMethodVO.post().isPost()).toBe(true);
    expect(WebhookMethodVO.put().isPut()).toBe(true);
    expect(WebhookMethodVO.patch().isPatch()).toBe(true);
    expect(WebhookMethodVO.delete().isDelete()).toBe(true);
    expect(WebhookMethodVO.post().hasBody()).toBe(true);
    expect(WebhookMethodVO.get().hasBody()).toBe(false);
  });
});
