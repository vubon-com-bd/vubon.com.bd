/**
 * Base Prisma Repository — re-export from shared-kernel
 * @module payment-service/infrastructure/persistence/prisma
 *
 * Payment-specific base is kept as a thin re-export so that:
 *  - All repos import from '@infrastructure/prisma/base.prisma.repository'
 *  - Migration to a different base (if needed) only touches this file
 */
export { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

/**
 * Structural Prisma delegate — same shape as kernel's PrismaDelegate.
 * Re-declared locally to avoid subpath-import issues.
 */
export interface PrismaDelegate<TModel> {
  findUnique(args: unknown): Promise<TModel | null>;
  findMany(args?: unknown): Promise<TModel[]>;
  create(args: unknown): Promise<TModel>;
  update(args: unknown): Promise<TModel>;
  delete(args: unknown): Promise<TModel>;
  count(args?: unknown): Promise<number>;
}
