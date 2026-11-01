import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { InvalidWebhookStatusError } from '@domain/errors/webhook.errors.js';

describe('WebhookStatusVO', () => {
  it.each(['active', 'inactive', 'paused', 'failed', 'disabled'])('accepts "%s"', (s) => {
    expect(WebhookStatusVO.create(s).value).toBe(s);
  });

  it('rejects invalid', () => {
    expect(() => WebhookStatusVO.create('zombie')).toThrow(InvalidWebhookStatusError);
  });

  it('factory + predicates', () => {
    expect(WebhookStatusVO.active().isActive()).toBe(true);
    expect(WebhookStatusVO.inactive().isInactive()).toBe(true);
    expect(WebhookStatusVO.paused().isPaused()).toBe(true);
    expect(WebhookStatusVO.failed().isFailed()).toBe(true);
    expect(WebhookStatusVO.disabled().isDisabled()).toBe(true);
  });

  it('canDeliver only when active', () => {
    expect(WebhookStatusVO.active().canDeliver()).toBe(true);
    expect(WebhookStatusVO.paused().canDeliver()).toBe(false);
  });

  it('isTerminal only when disabled', () => {
    expect(WebhookStatusVO.disabled().isTerminal()).toBe(true);
    expect(WebhookStatusVO.active().isTerminal()).toBe(false);
  });

  describe('canTransitionTo', () => {
    it('active → inactive/paused/failed/disabled', () => {
      const s = WebhookStatusVO.active();
      expect(s.canTransitionTo('inactive')).toBe(true);
      expect(s.canTransitionTo('paused')).toBe(true);
      expect(s.canTransitionTo('failed')).toBe(true);
      expect(s.canTransitionTo('disabled')).toBe(true);
    });
    it('disabled terminal', () => {
      expect(WebhookStatusVO.disabled().canTransitionTo('active')).toBe(false);
    });
  });
});
