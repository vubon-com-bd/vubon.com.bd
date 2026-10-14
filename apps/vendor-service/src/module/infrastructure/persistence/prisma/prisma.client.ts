/**
 * Prisma Client Type Re-export (Vendor)
 * @module vendor-service/infrastructure/persistence/prisma
 *
 * Re-exports the shared-kernel Prisma client types so that
 * vendor-service repositories can import them from one place.
 */
export type { PrismaClient } from '@prisma/client';

export interface VendorPrismaClientOptions {
  readonly url?: string;
  readonly log?: readonly ('query' | 'info' | 'warn' | 'error')[];
  readonly errorFormat?: 'pretty' | 'colorless' | 'minimal';
}
