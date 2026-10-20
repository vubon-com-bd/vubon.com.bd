/**
 * QueuesWorkersModule Tests
 * @module order-service/test/unit/infrastructure
 */
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { QueuesWorkersModule } from '@infrastructure/queues-workers.module.js';
import { OrderQueue } from '@infrastructure/queues/order.queue.js';
import { CheckoutQueue } from '@infrastructure/queues/checkout.queue.js';
import { DeliveryQueue } from '@infrastructure/queues/delivery.queue.js';
import { NotificationQueue } from '@infrastructure/queues/notification.queue.js';
import { AnalyticsQueue } from '@infrastructure/queues/analytics.queue.js';

describe('QueuesWorkersModule', () => {
  it('should be defined', () => {
    expect(QueuesWorkersModule).toBeDefined();
  });

  it('should reference all queue classes', () => {
    const queues = [
      OrderQueue,
      CheckoutQueue,
      DeliveryQueue,
      NotificationQueue,
      AnalyticsQueue,
    ];
    queues.forEach((q) => {
      expect(q).toBeDefined();
      expect(typeof q).toBe('function');
    });
  });

  it('should have module metadata with providers', () => {
    const providers = Reflect.getMetadata('providers', QueuesWorkersModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
    expect((providers as unknown[]).length).toBeGreaterThan(0);
  });
});
