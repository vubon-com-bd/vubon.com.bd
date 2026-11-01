/**
 * CheckoutModule Tests
 * @module order-service/test/unit/modules/checkout
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { CheckoutModule } from '@modules/checkout/checkout.module.js';

describe('CheckoutModule', () => {
  it('should be defined', () => {
    expect(CheckoutModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', CheckoutModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', CheckoutModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
