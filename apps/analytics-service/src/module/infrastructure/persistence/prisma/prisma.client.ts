/**
 * Prisma Client Type Re-export (Analytics Service)
 * @module analytics-service/infrastructure/persistence/prisma
 *
 * Values আসে @prisma/client থেকে (type only)।
 * Runtime instantiation হয় prisma.service.ts-এ।
 */
import type { PrismaClient } from '@prisma/client';

export type AnalyticsPrismaClient = PrismaClient;

export interface AnalyticsPrismaClientOptions {
  readonly url?: string;
  readonly log?: readonly ('query' | 'info' | 'warn' | 'error')[];
  readonly errorFormat?: 'pretty' | 'colorless' | 'minimal';
}
