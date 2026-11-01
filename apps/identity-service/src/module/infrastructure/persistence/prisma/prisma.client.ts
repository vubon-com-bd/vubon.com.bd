/**
 * Prisma Client Type Re-export (Auth)
 * @module identity-service/infrastructure/persistence/prisma
 *
 * Re-exports the shared-kernel Prisma client types so that
 * auth-service repositories can import them from one place.
 */
export type { PrismaClient } from '@prisma/client';

export interface AuthPrismaClientOptions {
  readonly url?: string;
  readonly log?: readonly ('query' | 'info' | 'warn' | 'error')[];
  readonly errorFormat?: 'pretty' | 'colorless' | 'minimal';
}
