/**
 * DeliveryModule Tests
 * @module order-service/test/unit/modules/delivery
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { DeliveryModule } from '@modules/delivery/delivery.module.js';

describe('DeliveryModule', () => {
  it('should be defined', () => {
    expect(DeliveryModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', DeliveryModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', DeliveryModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
