import { describe, it, expect } from '@jest/globals';
import { WebhookEntity } from '../../../../src/module/domain/entities/webhook.entity.js';
import { WebhookMethodVO } from '../../../../src/module/domain/value-objects/primitives/webhook-method.vo.js';
import { WebhookUrlVO } from '../../../../src/module/domain/value-objects/primitives/webhook-url.vo.js';
import { WebhookEventVO } from '../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { WebhookSecretVO } from '../../../../src/module/domain/value-objects/primitives/webhook-secret.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../helpers/test-factories.js';

function build(): WebhookEntity {
  return WebhookEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      url: WebhookUrlVO.create('https://example.com/hook'),
      method: WebhookMethodVO.post(),
      events: [WebhookEventVO.orderCreated(), WebhookEventVO.paymentSucceeded()],
      secret: WebhookSecretVO.create('0123456789abcdef0123456789abcdef'),
      createdBy: FIXED_USER_ID,
      description: 'test hook',
    },
  });
}

describe('WebhookEntity', () => {
  it('create → active by default', () => {
    const e = build();
    expect(e.isActive()).toBe(true);
    expect(e.canDeliver()).toBe(true);
    expect(e.failureCount).toBe(0);
  });

  it('create requires at least one event', () => {
    expect(() =>
      WebhookEntity.create({
        id: makeUuid(),
        now: new Date().toISOString(),
        props: {
          url: WebhookUrlVO.create('https://example.com/hook'),
          method: WebhookMethodVO.post(),
          events: [],
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });

  it('hasSecret true when secret set', () => {
    const e = build();
    expect(e.hasSecret()).toBe(true);
  });

  it('subscribesTo checks event list', () => {
    const e = build();
    expect(e.subscribesTo('order.created')).toBe(true);
    expect(e.subscribesTo('unknown.event')).toBe(false);
  });

  it('update changes fields', () => {
    const e = build();
    e.update(
      { description: 'new', events: [WebhookEventVO.userCreated()] },
      FIXED_USER_ID,
    );
    expect(e.description).toBe('new');
    expect(e.events.length).toBe(1);
  });

  it('activate from inactive', () => {
    const e = build();
    e.deactivate(FIXED_USER_ID);
    e.activate();
    expect(e.isActive()).toBe(true);
  });

  it('deactivate from active', () => {
    const e = build();
    e.deactivate(FIXED_USER_ID, 'maintenance');
    expect(e.status.value).toBe('inactive');
  });

  it('deactivate from non-active throws', () => {
    const e = build();
    e.deactivate(FIXED_USER_ID);
    expect(() => e.deactivate(FIXED_USER_ID)).toThrow();
  });

  it('disable sets disabled status', () => {
    const e = build();
    e.disable('too many failures');
    expect(e.status.value).toBe('disabled');
  });

  it('recordDeliverySuccess resets failureCount + sets lastSuccessAt', () => {
    const e = build();
    e.recordDeliverySuccess('order.created', 200, 150);
    expect(e.failureCount).toBe(0);
    expect(e.lastSuccessAt).toBeDefined();
  });

  it('recordDeliveryFailure increments failureCount', () => {
    const e = build();
    e.recordDeliveryFailure('order.created', 1, 'timeout', 500);
    expect(e.failureCount).toBe(1);
    expect(e.lastFailureAt).toBeDefined();
  });

  it('scheduleRetry emits event', () => {
    const e = build();
    e.scheduleRetry(
      'order.created',
      2,
      60_000,
      new Date(Date.now() + 60_000).toISOString(),
    );
    const events = e.pullDomainEvents();
    const hasRetry = events.some((ev) => ev.type === 'notification_webhook.delivery_retried');
    expect(hasRetry).toBe(true);
  });
});
