/**
 * Queue constants + registration config
 */
import {
  ORDER_QUEUE_NAME,
  ORDER_JOB_NAME,
  ORDER_QUEUE_LIMITS,
} from '../../../../src/module/infrastructure/queues/queue.constants.js';
import { OrderQueueRegistration } from '../../../../src/module/infrastructure/queues/order.queue.js';
import { CheckoutQueueRegistration } from '../../../../src/module/infrastructure/queues/checkout.queue.js';
import { DeliveryQueueRegistration } from '../../../../src/module/infrastructure/queues/delivery.queue.js';
import { NotificationQueueRegistration } from '../../../../src/module/infrastructure/queues/notification.queue.js';
import { AnalyticsQueueRegistration } from '../../../../src/module/infrastructure/queues/analytics.queue.js';

describe('Queue constants', () => {
  it('ORDER_QUEUE_NAME has all names', () => {
    expect(ORDER_QUEUE_NAME.ORDER_PROCESSING).toBe('order_processing');
    expect(ORDER_QUEUE_NAME.CLEANUP).toBe('cleanup');
    expect(ORDER_QUEUE_NAME.DELIVERY).toBe('delivery');
    expect(ORDER_QUEUE_NAME.TRACKING).toBe('tracking');
    expect(ORDER_QUEUE_NAME.NOTIFICATION).toBe('notification');
    expect(ORDER_QUEUE_NAME.ANALYTICS).toBe('analytics');
  });

  it('ORDER_JOB_NAME has all job names', () => {
    expect(ORDER_JOB_NAME.PROCESS_ORDER).toBe('process-order');
    expect(ORDER_JOB_NAME.TIMEOUT_ORDER).toBe('timeout-order');
    expect(ORDER_JOB_NAME.CLEANUP_CHECKOUT).toBe('cleanup-checkout');
    expect(ORDER_JOB_NAME.TRACK_DELIVERY).toBe('track-delivery');
    expect(ORDER_JOB_NAME.PROCESS_RETURN).toBe('process-return');
    expect(ORDER_JOB_NAME.PROCESS_ANALYTICS).toBe('process-analytics');
  });

  it('ORDER_QUEUE_LIMITS constants', () => {
    expect(ORDER_QUEUE_LIMITS.MAX_ATTEMPTS).toBe(3);
    expect(ORDER_QUEUE_LIMITS.BACKOFF_MS).toBe(5000);
    expect(ORDER_QUEUE_LIMITS.CONCURRENCY).toBe(5);
  });
});

describe('Queue registrations (BullModule.registerQueue returns DynamicModule)', () => {
  it('order queue returns DynamicModule', () => {
    expect(OrderQueueRegistration).toBeDefined();
    expect(typeof OrderQueueRegistration).toBe('object');
  });

  it('checkout queue returns DynamicModule', () => {
    expect(CheckoutQueueRegistration).toBeDefined();
    expect(typeof CheckoutQueueRegistration).toBe('object');
  });

  it('delivery queue returns DynamicModule', () => {
    expect(DeliveryQueueRegistration).toBeDefined();
    expect(typeof DeliveryQueueRegistration).toBe('object');
  });

  it('notification queue returns DynamicModule', () => {
    expect(NotificationQueueRegistration).toBeDefined();
    expect(typeof NotificationQueueRegistration).toBe('object');
  });

  it('analytics queue returns DynamicModule', () => {
    expect(AnalyticsQueueRegistration).toBeDefined();
    expect(typeof AnalyticsQueueRegistration).toBe('object');
  });
});
