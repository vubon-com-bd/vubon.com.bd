/**
 * NotificationCommonModule — Unit tests
 * @module notification-service/test/unit/modules/common
 *
 * Verifies:
 *  - @Global() decorator
 *  - imports array includes KernelCommonModule + all infra modules
 *  - exports match imports (re-export strategy)
 */
import 'reflect-metadata';
import { jest } from '@jest/globals';
import { Global } from '@nestjs/common';
import { NotificationCommonModule } from '@modules/common/common.module.js';
import { KernelCommonModule } from '@vubon/shared-kernel/modules/common';
import { PrismaRepositoriesModule } from '@infrastructure/persistence/prisma/prisma-repositories.module.js';
import { RedisRepositoriesModule } from '@infrastructure/persistence/cache/redis-repositories.module.js';
import { QueuesWorkersModule } from '@infrastructure/modules/queues-workers.module.js';
import { InfrastructureModule } from '@infrastructure/modules/infrastructure.module.js';

// ─── Helper: read NestJS module metadata ────
function getModuleMeta(target: unknown) {
  const meta = Reflect.getMetadata('__module:imports__', target) as unknown[] | undefined;
  const imports = Reflect.getMetadata('imports', target) as unknown[] | undefined;
  const exports = Reflect.getMetadata('exports', target) as unknown[] | undefined;
  return { imports, exports, meta };
}

describe('NotificationCommonModule', () => {
  it('should be defined', () => {
    expect(NotificationCommonModule).toBeDefined();
  });

  it('should be @Global()', () => {
    const isGlobal = Reflect.getMetadata('__module:global__', NotificationCommonModule);
    expect(isGlobal).toBe(true);
  });

  it('should import KernelCommonModule', () => {
    const imports = Reflect.getMetadata('imports', NotificationCommonModule) as unknown[] | undefined;
    expect(imports).toBeDefined();
    expect(imports).toContain(KernelCommonModule);
  });

  it('should import all notification infrastructure modules', () => {
    const imports = (Reflect.getMetadata('imports', NotificationCommonModule) as unknown[]) ?? [];
    expect(imports).toContain(PrismaRepositoriesModule);
    expect(imports).toContain(RedisRepositoriesModule);
    expect(imports).toContain(QueuesWorkersModule);
    expect(imports).toContain(InfrastructureModule);
  });

  it('should export all imported modules', () => {
    const imports = (Reflect.getMetadata('imports', NotificationCommonModule) as unknown[]) ?? [];
    const exports = (Reflect.getMetadata('exports', NotificationCommonModule) as unknown[]) ?? [];

    for (const imp of imports) {
      expect(exports).toContain(imp);
    }
  });

  it('should have matching imports and exports count', () => {
    const imports = (Reflect.getMetadata('imports', NotificationCommonModule) as unknown[]) ?? [];
    const exports = (Reflect.getMetadata('exports', NotificationCommonModule) as unknown[]) ?? [];
    expect(exports.length).toBe(imports.length);
  });

  it('should use @Global decorator', () => {
    // Alternative check — verify Global decorator was applied
    const isGlobal = Reflect.getMetadata('__module:global__', NotificationCommonModule);
    expect(isGlobal).toBe(true);
    void Global; // suppress unused
  });
});
