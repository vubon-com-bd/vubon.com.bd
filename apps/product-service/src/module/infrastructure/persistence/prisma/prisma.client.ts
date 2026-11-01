/**
 * Prisma Client Type Re-export (Product)
 * @module product-service/infrastructure/persistence/prisma
 *
 * Re-exports the shared-kernel Prisma client types so that
 * product-service repositories can import them from one place.
 */
export type { PrismaClient } from '@prisma/client';

export interface ProductPrismaClientOptions {
  readonly url?: string;
  readonly log?: readonly ('query' | 'info' | 'warn' | 'error')[];
  readonly errorFormat?: 'pretty' | 'colorless' | 'minimal';
}
