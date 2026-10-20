/**
 * Database Mode Configuration
 * @module order-service/infrastructure/config
 *
 * Two modes:
 *   - 'memory' → InMemory repositories (fast, no DB, for dev/test)
 *   - 'prisma' → Prisma repositories (production, DB backed)
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export type DbMode = 'memory' | 'prisma';

function parseDbMode(raw: string): DbMode {
  const normalized = raw.trim().toLowerCase();
  if (normalized === 'memory' || normalized === 'inmemory') return 'memory';
  if (normalized === 'prisma' || normalized === 'db' || normalized === 'postgres') {
    return 'prisma';
  }
  // default — safe for prod; use memory in dev
  return process.env['NODE_ENV'] === 'production' ? 'prisma' : 'memory';
}

export const DB_MODE: DbMode = parseDbMode(
  getOptionalEnv('DB_MODE', 'memory'),
);

export const IS_MEMORY_MODE = DB_MODE === 'memory';
export const IS_PRISMA_MODE = DB_MODE === 'prisma';
