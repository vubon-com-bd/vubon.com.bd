/**
 * PublicOrderModule Tests
 * @module order-service/test/unit/modules/public-order
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { PublicOrderModule } from '@modules/public-order/public-order.module.js';

describe('PublicOrderModule', () => {
  it('should be defined', () => {
    expect(PublicOrderModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', PublicOrderModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', PublicOrderModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
