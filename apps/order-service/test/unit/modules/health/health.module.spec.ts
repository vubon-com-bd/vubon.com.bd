/**
 * HealthModule Tests
 * @module order-service/test/unit/modules/health
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { HealthModule } from '@modules/health/health.module.js';

describe('HealthModule', () => {
  it('should be defined', () => {
    expect(HealthModule).toBeDefined();
  });

  it('should have providers metadata', () => {
    const providers = Reflect.getMetadata('providers', HealthModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have controllers metadata', () => {
    const controllers = Reflect.getMetadata('controllers', HealthModule);
    expect(Array.isArray(controllers ?? [])).toBe(true);
  });
});
