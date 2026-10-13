/**
 * Jest Global Setup
 * @module identity-service/test
 *
 * No external DB bootstrap needed — Prisma in-memory mode + Redis shared.
 */
export default async function globalSetup(): Promise<void> {
  process.env['NODE_ENV'] = process.env['NODE_ENV'] ?? 'test';
  process.env['LOG_LEVEL'] = process.env['LOG_LEVEL'] ?? 'error';
  process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] =
    process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] ?? 'true';
}
