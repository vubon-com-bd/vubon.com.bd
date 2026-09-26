/**
 * Prisma Client Type Re-export
 * @module shared-kernel/infrastructure/persistence/prisma
 *
 * Values আসে @prisma/client থেকে (type only)।
 * Runtime instantiation হয় prisma.service.ts-এ।
 */
import type { PrismaClient } from '@prisma/client';

export type PrismaClientType = PrismaClient;

export interface PrismaClientOptions {
  readonly url?: string;
  readonly log?: readonly ('query' | 'info' | 'warn' | 'error')[];
  readonly errorFormat?: 'pretty' | 'colorless' | 'minimal';
}
