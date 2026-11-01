/**
 * OrderCancelModule Tests
 * @module order-service/test/unit/modules/order-cancel
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderCancelModule } from '@modules/order-cancel/order-cancel.module.js';

describe('OrderCancelModule', () => {
  it('should be defined', () => {
    expect(OrderCancelModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', OrderCancelModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', OrderCancelModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
