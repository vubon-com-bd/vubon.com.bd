import { describe, it, expect } from '@jest/globals';
import { WebhookStatusVO } from '../../../../src/module/domain/value-objects/primitives/webhook-status.vo.js';

describe('WebhookStatusVO', () => {
  it('create + reconstitute', () => {
    expect(WebhookStatusVO.create('active').value).toBe('active');
    expect(() => WebhookStatusVO.create('bad')).toThrow();
    expect(WebhookStatusVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(WebhookStatusVO.active().value).toBe('active');
    expect(WebhookStatusVO.inactive().value).toBe('inactive');
    expect(WebhookStatusVO.paused().value).toBe('paused');
    expect(WebhookStatusVO.failed().value).toBe('failed');
    expect(WebhookStatusVO.disabled().value).toBe('disabled');
  });
  it('predicates', () => {
    expect(WebhookStatusVO.active().isActive()).toBe(true);
    expect(WebhookStatusVO.inactive().isInactive()).toBe(true);
    expect(WebhookStatusVO.paused().isPaused()).toBe(true);
    expect(WebhookStatusVO.failed().isFailed()).toBe(true);
    expect(WebhookStatusVO.disabled().isDisabled()).toBe(true);
    expect(WebhookStatusVO.active().canDeliver()).toBe(true);
    expect(WebhookStatusVO.disabled().isFinal()).toBe(true);
  });
});
