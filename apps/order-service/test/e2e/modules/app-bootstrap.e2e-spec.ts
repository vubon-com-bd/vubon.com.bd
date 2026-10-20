/**
 * Full App Bootstrap E2E
 * @module order-service/test/e2e/modules
 *
 * Verifies the module graph metadata only (full app.init() would
 * require all DI dependencies — covered by dedicated controller E2E).
 */
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderAppModule, AppModule } from '@modules/app.module.js';

describe('Full App Bootstrap E2E', () => {
  describe('Module metadata', () => {
    it('should be defined', () => {
      expect(OrderAppModule).toBeDefined();
    });

    it('should export AppModule alias', () => {
      expect(AppModule).toBe(OrderAppModule);
    });

    it('should have imports in metadata', () => {
      const imports = Reflect.getMetadata('imports', OrderAppModule);
      expect(imports).toBeDefined();
      expect(Array.isArray(imports)).toBe(true);
    });

    it('should import at least 10 feature modules', () => {
      const imports = Reflect.getMetadata('imports', OrderAppModule) as unknown[];
      expect(imports.length).toBeGreaterThanOrEqual(10);
    });

    it('should be a valid NestJS module class', () => {
      expect(typeof OrderAppModule).toBe('function');
      expect(OrderAppModule.name).toBe('OrderAppModule');
    });
  });
});
