/**
 * OrderAppModule Tests
 * @module order-service/test/unit/modules
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderAppModule, AppModule } from '@modules/app.module.js';

describe('OrderAppModule', () => {
  it('should be defined', () => {
    expect(OrderAppModule).toBeDefined();
  });

  it('should export AppModule alias', () => {
    expect(AppModule).toBe(OrderAppModule);
  });

  it('should have imports metadata', () => {
    const imports = Reflect.getMetadata('imports', OrderAppModule);
    expect(imports).toBeDefined();
    expect(Array.isArray(imports)).toBe(true);
    expect((imports as unknown[]).length).toBeGreaterThan(0);
  });
});
