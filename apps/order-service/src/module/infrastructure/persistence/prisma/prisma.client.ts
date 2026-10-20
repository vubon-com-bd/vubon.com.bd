/**
 * Order Prisma Client Type Re-export
 * @module order-service/infrastructure/persistence/prisma
 */
import type { PrismaClient } from '@prisma/client';

export type OrderPrismaClient = PrismaClient;

export interface OrderPrismaClientOptions {
  readonly url?: string;
  readonly log?: readonly ('query' | 'info' | 'warn' | 'error')[];
  readonly errorFormat?: 'pretty' | 'colorless' | 'minimal';
}
