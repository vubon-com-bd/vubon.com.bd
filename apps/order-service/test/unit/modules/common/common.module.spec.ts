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

  it('should have forRoot static method', () => {
    expect(typeof OrderCommonModule.forRoot).toBe('function');
  });

  it('forRoot() should return DynamicModule with imports', () => {
    const dynamicModule = OrderCommonModule.forRoot();
    expect(dynamicModule).toBeDefined();
    expect(dynamicModule.module).toBe(OrderCommonModule);
    expect(Array.isArray(dynamicModule.imports)).toBe(true);
    expect((dynamicModule.imports as unknown[]).length).toBeGreaterThan(0);
  });

  it('forRoot() should return DynamicModule with exports', () => {
    const dynamicModule = OrderCommonModule.forRoot();
    expect(Array.isArray(dynamicModule.exports)).toBe(true);
  });
});
