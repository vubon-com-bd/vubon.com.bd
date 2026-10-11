import { describe, it, expect } from '@jest/globals';
import { WebhookEventVO } from '../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';

describe('WebhookEventVO', () => {
  it('create + reconstitute', () => {
    expect(WebhookEventVO.create('order.created').value).toBe('order.created');
    expect(() => WebhookEventVO.create('bad')).toThrow();
    expect(WebhookEventVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(WebhookEventVO.orderCreated().value).toBe('order.created');
    expect(WebhookEventVO.orderUpdated().value).toBe('order.updated');
    expect(WebhookEventVO.orderCancelled().value).toBe('order.cancelled');
    expect(WebhookEventVO.orderDelivered().value).toBe('order.delivered');
    expect(WebhookEventVO.paymentSucceeded().value).toBe('payment.succeeded');
    expect(WebhookEventVO.paymentFailed().value).toBe('payment.failed');
    expect(WebhookEventVO.paymentRefunded().value).toBe('payment.refunded');
    expect(WebhookEventVO.userCreated().value).toBe('user.created');
    expect(WebhookEventVO.vendorApproved().value).toBe('vendor.approved');
    expect(WebhookEventVO.shipmentCreated().value).toBe('shipment.created');
  });
  it('eventDomain + eventAction', () => {
    const vo = WebhookEventVO.orderCreated();
    expect(vo.eventDomain).toBe('order');
    expect(vo.eventAction).toBe('created');
  });
});
