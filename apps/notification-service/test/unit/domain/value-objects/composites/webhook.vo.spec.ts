import { describe, it, expect } from '@jest/globals';
import { WebhookVO } from '../../../../../src/module/domain/value-objects/composites/webhook.vo.js';
import { WebhookIdVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-id.vo.js';
import { WebhookMethodVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-method.vo.js';
import { WebhookStatusVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-status.vo.js';
import { WebhookEventVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { WebhookUrlVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-secret.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function buildProps(overrides: Record<string, unknown> = {}) {
  return {
    id: WebhookIdVO.create(makeUuid()),
    url: WebhookUrlVO.create('https://example.com/hook'),
    method: WebhookMethodVO.post(),
    status: WebhookStatusVO.active(),
    events: [WebhookEventVO.orderCreated()],
    failureCount: 0,
    createdBy: FIXED_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('WebhookVO', () => {
  it('create valid', () => {
    const vo = WebhookVO.create(buildProps());
    expect(vo.isActive()).toBe(true);
    expect(vo.hasSecret()).toBe(false);
  });
  it('rejects empty events', () => {
    expect(() => WebhookVO.create(buildProps({ events: [] }))).toThrow();
  });
  it('rejects negative failureCount', () => {
    expect(() => WebhookVO.create(buildProps({ failureCount: -1 }))).toThrow();
  });
  it('subscribesTo matches event value', () => {
    const vo = WebhookVO.reconstitute(buildProps());
    expect(vo.subscribesTo('order.created')).toBe(true);
    expect(vo.subscribesTo('unknown')).toBe(false);
  });
  it('hasSecret when secret set', () => {
    const vo = WebhookVO.reconstitute(buildProps({
      secret: WebhookSecretVO.create('0123456789abcdef0123456789abcdef'),
    }));
    expect(vo.hasSecret()).toBe(true);
  });
  it('isActive false when disabled', () => {
    const vo = WebhookVO.reconstitute(buildProps({ status: WebhookStatusVO.disabled() }));
    expect(vo.isActive()).toBe(false);
  });
});
