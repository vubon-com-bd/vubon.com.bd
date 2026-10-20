/**
 * OrderItemModule Tests
 * @module order-service/test/unit/modules/order-item
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderItemModule } from '@modules/order-item/order-item.module.js';

describe('OrderItemModule', () => {
  it('should be defined', () => {
    expect(OrderItemModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', OrderItemModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', OrderItemModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
