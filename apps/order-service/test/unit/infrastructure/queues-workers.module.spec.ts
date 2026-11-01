/**
 * QueuesWorkersModule Tests
 * @module order-service/test/unit/infrastructure
 */
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';

import { QueuesWorkersModule } from '@infrastructure/queues-workers.module.js';

describe('QueuesWorkersModule', () => {
  it('should be defined', () => {
    expect(QueuesWorkersModule).toBeDefined();
  });

  it('should have forRoot static method', () => {
    expect(typeof QueuesWorkersModule.forRoot).toBe('function');
  });

  it('forRoot() should return DynamicModule with providers', () => {
    const dynamicModule = QueuesWorkersModule.forRoot();
    expect(dynamicModule).toBeDefined();
    expect(dynamicModule.module).toBe(QueuesWorkersModule);
    expect(dynamicModule.providers).toBeDefined();
    expect(Array.isArray(dynamicModule.providers)).toBe(true);
    expect((dynamicModule.providers as unknown[]).length).toBeGreaterThan(0);
  });

  it('forRoot() should return DynamicModule with exports', () => {
    const dynamicModule = QueuesWorkersModule.forRoot();
    expect(dynamicModule.exports).toBeDefined();
    expect(Array.isArray(dynamicModule.exports)).toBe(true);
  });
});
