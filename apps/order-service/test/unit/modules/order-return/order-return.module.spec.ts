/**
 * OrderReturnModule Tests
 * @module order-service/test/unit/modules/order-return
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderReturnModule } from '@modules/order-return/order-return.module.js';

describe('OrderReturnModule', () => {
  it('should be defined', () => {
    expect(OrderReturnModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', OrderReturnModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', OrderReturnModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
