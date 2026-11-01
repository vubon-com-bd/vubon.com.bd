/**
 * Prisma Client Type Re-export
 * @module payment-service/infrastructure/persistence/prisma
 *
 * Type-only exports — no runtime instantiation here.
 * Runtime instantiation happens in prisma.service.ts.
 */
import type { PrismaClient } from '@prisma/client';

export type PaymentPrismaClient = PrismaClient;

export interface PaymentPrismaClientOptions {
  readonly url?: string;
  readonly log?: readonly ('query' | 'info' | 'warn' | 'error')[];
  readonly errorFormat?: 'pretty' | 'colorless' | 'minimal';
}
