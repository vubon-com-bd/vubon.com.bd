/**
 * InfrastructureModule Tests
 * @module order-service/test/unit/infrastructure
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { InfrastructureModule } from '@infrastructure/infrastructure.module.js';

describe('InfrastructureModule', () => {
  it('should be defined', () => {
    expect(InfrastructureModule).toBeDefined();
  });

  it('should have forRoot static method', () => {
    expect(typeof InfrastructureModule.forRoot).toBe('function');
  });

  it('forRoot() should return DynamicModule with imports', () => {
    const dynamicModule = InfrastructureModule.forRoot();
    expect(dynamicModule).toBeDefined();
    expect(dynamicModule.module).toBe(InfrastructureModule);
    expect(Array.isArray(dynamicModule.imports)).toBe(true);
    expect((dynamicModule.imports as unknown[]).length).toBeGreaterThan(0);
  });

  it('forRoot() should return DynamicModule with providers', () => {
    const dynamicModule = InfrastructureModule.forRoot();
    expect(dynamicModule.providers).toBeDefined();
    expect(Array.isArray(dynamicModule.providers)).toBe(true);
  });

  it('forRoot() should return DynamicModule with exports', () => {
    const dynamicModule = InfrastructureModule.forRoot();
    expect(Array.isArray(dynamicModule.exports)).toBe(true);
    expect((dynamicModule.exports as unknown[]).length).toBeGreaterThan(0);
  });
});
