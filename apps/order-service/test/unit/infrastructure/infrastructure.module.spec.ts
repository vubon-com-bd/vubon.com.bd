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

  it('should have module metadata with imports', () => {
    const imports = Reflect.getMetadata('imports', InfrastructureModule);
    expect(imports).toBeDefined();
    expect(Array.isArray(imports)).toBe(true);
    expect((imports as unknown[]).length).toBeGreaterThan(0);
  });

  it('should have module metadata with providers', () => {
    const providers = Reflect.getMetadata('providers', InfrastructureModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should have module metadata with exports', () => {
    const exports = Reflect.getMetadata('exports', InfrastructureModule);
    expect(exports).toBeDefined();
    expect(Array.isArray(exports)).toBe(true);
    expect((exports as unknown[]).length).toBeGreaterThan(0);
  });
});
