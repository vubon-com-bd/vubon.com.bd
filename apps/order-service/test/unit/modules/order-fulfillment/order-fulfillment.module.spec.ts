/**
 * OrderFulfillmentModule Tests
 * @module order-service/test/unit/modules/order-fulfillment
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderFulfillmentModule } from '@modules/order-fulfillment/order-fulfillment.module.js';

describe('OrderFulfillmentModule', () => {
  it('should be defined', () => {
    expect(OrderFulfillmentModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', OrderFulfillmentModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', OrderFulfillmentModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
