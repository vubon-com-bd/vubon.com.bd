/**
 * OrderCommonModule Tests
 * @module order-service/test/unit/modules/common
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderCommonModule } from '@modules/common/common.module.js';

describe('OrderCommonModule', () => {
  it('should be defined', () => {
    expect(OrderCommonModule).toBeDefined();
  });

  it('should have imports metadata', () => {
    const imports = Reflect.getMetadata('imports', OrderCommonModule);
    expect(imports).toBeDefined();
    expect(Array.isArray(imports)).toBe(true);
    expect((imports as unknown[]).length).toBeGreaterThan(0);
  });

  it('should have exports metadata', () => {
    const exports = Reflect.getMetadata('exports', OrderCommonModule);
    expect(exports).toBeDefined();
    expect(Array.isArray(exports)).toBe(true);
  });
});
