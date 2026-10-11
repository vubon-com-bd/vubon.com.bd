import { describe, it, expect } from '@jest/globals';
import { DeliveryStatusVO } from '../../../../src/module/domain/value-objects/primitives/delivery-status.vo.js';
import { NOTIFICATION_DELIVERY_STATUS } from '@vubon/shared-constants/platform/notification';

describe('DeliveryStatusVO', () => {
  it('create + reconstitute', () => {
    expect(DeliveryStatusVO.create('queued').value).toBe('queued');
    expect(() => DeliveryStatusVO.create('bad')).toThrow();
    expect(DeliveryStatusVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(DeliveryStatusVO.queued().value).toBe('queued');
    expect(DeliveryStatusVO.sending().value).toBe('sending');
    expect(DeliveryStatusVO.sent().value).toBe('sent');
    expect(DeliveryStatusVO.delivered().value).toBe('delivered');
    expect(DeliveryStatusVO.read().value).toBe('read');
    expect(DeliveryStatusVO.failed().value).toBe('failed');
    expect(DeliveryStatusVO.bounced().value).toBe('bounced');
    expect(DeliveryStatusVO.rejected().value).toBe('rejected');
    expect(DeliveryStatusVO.blocked().value).toBe('blocked');
    expect(DeliveryStatusVO.unsubscribed().value).toBe('unsubscribed');
  });
  it('predicates', () => {
    expect(DeliveryStatusVO.sent().isSent()).toBe(true);
    expect(DeliveryStatusVO.delivered().isDelivered()).toBe(true);
    expect(DeliveryStatusVO.read().isRead()).toBe(true);
    expect(DeliveryStatusVO.failed().isFailed()).toBe(true);
    expect(DeliveryStatusVO.bounced().isBounced()).toBe(true);
    expect(DeliveryStatusVO.blocked().isBlocked()).toBe(true);
  });
  it('isSuccess', () => {
    expect(DeliveryStatusVO.delivered().isSuccess()).toBe(true);
    expect(DeliveryStatusVO.read().isSuccess()).toBe(true);
    expect(DeliveryStatusVO.failed().isSuccess()).toBe(false);
  });
  it('isFinal', () => {
    expect(DeliveryStatusVO.delivered().isFinal()).toBe(true);
    expect(DeliveryStatusVO.failed().isFinal()).toBe(true);
    expect(DeliveryStatusVO.queued().isFinal()).toBe(false);
  });
  it('isRecoverable', () => {
    expect(DeliveryStatusVO.failed().isRecoverable()).toBe(true);
    expect(DeliveryStatusVO.delivered().isRecoverable()).toBe(false);
  });
  it('canTransitionTo', () => {
    expect(DeliveryStatusVO.queued().canTransitionTo(NOTIFICATION_DELIVERY_STATUS.SENDING)).toBe(true);
    expect(DeliveryStatusVO.sending().canTransitionTo(NOTIFICATION_DELIVERY_STATUS.SENT)).toBe(true);
    expect(DeliveryStatusVO.sent().canTransitionTo(NOTIFICATION_DELIVERY_STATUS.DELIVERED)).toBe(true);
    expect(DeliveryStatusVO.delivered().canTransitionTo(NOTIFICATION_DELIVERY_STATUS.READ)).toBe(true);
    expect(DeliveryStatusVO.failed().canTransitionTo(NOTIFICATION_DELIVERY_STATUS.QUEUED)).toBe(true);
    expect(DeliveryStatusVO.read().canTransitionTo(NOTIFICATION_DELIVERY_STATUS.SENT)).toBe(false);
  });
});
