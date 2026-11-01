/**
 * Base Prisma Repository Re-export
 * @module identity-service/infrastructure/persistence/prisma
 *
 * The canonical implementation lives in the shared-kernel.
 * This module re-exports it so auth-service repositories have
 * a single, stable import path.
 */
export {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma';
