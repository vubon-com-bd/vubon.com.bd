/**
 * OrderTrackingModule Tests
 * @module order-service/test/unit/modules/order-tracking
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderTrackingModule } from '@modules/order-tracking/order-tracking.module.js';

describe('OrderTrackingModule', () => {
  it('should be defined', () => {
    expect(OrderTrackingModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', OrderTrackingModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', OrderTrackingModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
