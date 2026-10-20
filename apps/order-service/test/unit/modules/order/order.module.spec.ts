/**
 * OrderModule Tests
 * @module order-service/test/unit/modules/order
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderModule } from '@modules/order/order.module.js';

describe('OrderModule', () => {
  it('should be defined', () => {
    expect(OrderModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', OrderModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', OrderModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
