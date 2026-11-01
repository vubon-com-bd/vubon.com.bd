/**
 * PersistenceModule — dynamically selects Prisma or InMemory
 * @module identity-service/infrastructure/persistence
 *
 * Selects based on DB_MODE env:
 *  - DB_MODE=memory  → MemoryRepositoriesModule (Termux ARM64 fallback)
 *  - DB_MODE=prisma (default) → PrismaRepositoriesModule
 */
import { DynamicModule, Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from './prisma/prisma-repositories.module.js';
import { MemoryRepositoriesModule } from './memory/memory-repositories.module.js';

@Module({})
export class PersistenceModule {
  static forRoot(): DynamicModule {
    const mode = (process.env['DB_MODE'] ?? 'prisma').toLowerCase();
    const repoModule =
      mode === 'memory' ? MemoryRepositoriesModule : PrismaRepositoriesModule;

    return {
      module: PersistenceModule,
      imports: [repoModule],
      exports: [repoModule],
    };
  }
}
