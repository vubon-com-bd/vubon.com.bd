import { describe, it, expect } from '@jest/globals';
import { NotificationDeliveryVO } from '../../../../../src/module/domain/value-objects/composites/notification-delivery.vo.js';
import { DeliveryStatusVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryFailureReasonVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-failure-reason.vo.js';

describe('NotificationDeliveryVO', () => {
  it('create queued', () => {
    const vo = NotificationDeliveryVO.create({
      status: DeliveryStatusVO.queued(),
      attemptCount: 0,
    });
    expect(vo.attemptCount).toBe(0);
  });
  it('rejects negative attemptCount', () => {
    expect(() =>
      NotificationDeliveryVO.create({
        status: DeliveryStatusVO.queued(),
        attemptCount: -1,
      }),
    ).toThrow();
  });
  it('delivered requires deliveredAt', () => {
    expect(() =>
      NotificationDeliveryVO.create({
        status: DeliveryStatusVO.delivered(),
        attemptCount: 1,
      }),
    ).toThrow();
  });
  it('delivered with timestamp ok', () => {
    const vo = NotificationDeliveryVO.create({
      status: DeliveryStatusVO.delivered(),
      attemptCount: 1,
      deliveredAt: new Date().toISOString(),
    });
    expect(vo.deliveredAt).toBeDefined();
  });
  it('failed requires failureReason', () => {
    expect(() =>
      NotificationDeliveryVO.create({
        status: DeliveryStatusVO.failed(),
        attemptCount: 1,
      }),
    ).toThrow();
  });
  it('failed with reason ok', () => {
    const vo = NotificationDeliveryVO.create({
      status: DeliveryStatusVO.failed(),
      attemptCount: 1,
      failureReason: DeliveryFailureReasonVO.gatewayError(),
    });
    expect(vo.failureReason?.value).toBe('gateway_error');
  });
  it('hasBeenAttempted', () => {
    const vo = NotificationDeliveryVO.reconstitute({
      status: DeliveryStatusVO.sending(),
      attemptCount: 3,
    });
    expect(vo.hasBeenAttempted()).toBe(true);
  });
  it('canRetry for retryable failure', () => {
    const vo = NotificationDeliveryVO.reconstitute({
      status: DeliveryStatusVO.failed(),
      attemptCount: 1,
      failureReason: DeliveryFailureReasonVO.timeout(),
    });
    expect(vo.canRetry()).toBe(true);
  });
});
