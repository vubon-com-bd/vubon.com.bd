/**
 * Jest Global Setup
 * @module product-service/test
 *
 * No external DB bootstrap needed — Prisma in degraded mode + Redis shared.
 */
export default async function globalSetup(): Promise<void> {
  process.env['NODE_ENV'] = process.env['NODE_ENV'] ?? 'test';
  process.env['LOG_LEVEL'] = process.env['LOG_LEVEL'] ?? 'error';
  process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] =
    process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] ?? 'true';
}
