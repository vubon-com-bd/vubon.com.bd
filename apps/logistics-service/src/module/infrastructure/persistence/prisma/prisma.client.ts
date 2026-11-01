/**
 * Prisma Client Type Re-export (Logistics)
 * @module logistics-service/infrastructure/persistence/prisma
 */
import type { PrismaClient } from '@prisma/client';

export type LogisticsPrismaClient = PrismaClient;

export interface LogisticsPrismaClientOptions {
  readonly url?: string;
  readonly log?: readonly ('query' | 'info' | 'warn' | 'error')[];
  readonly errorFormat?: 'pretty' | 'colorless' | 'minimal';
}
