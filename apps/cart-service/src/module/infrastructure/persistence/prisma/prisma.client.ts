/**
 * Prisma Client Type Re-export (Cart Service)
 * @module cart-service/infrastructure/persistence/prisma
 *
 * Type-only re-export of @prisma/client — runtime instantiation is
 * delegated to CartPrismaService (Termux-safe graceful degrade).
 */
import type { PrismaClient } from '@prisma/client';

export type CartPrismaClient = PrismaClient;

export interface CartPrismaClientOptions {
  readonly url?: string;
  readonly log?: readonly ('query' | 'info' | 'warn' | 'error')[];
  readonly errorFormat?: 'pretty' | 'colorless' | 'minimal';
}

// ─── Cart-specific delegates (typed access) ─
export interface CartPrismaDelegates {
  readonly cart: unknown;
  readonly cartItem: unknown;
  readonly cartCoupon: unknown;
  readonly cartVoucher: unknown;
  readonly guestCart: unknown;
  readonly savedItem: unknown;
  readonly abandonedCart: unknown;
  readonly cartMerger: unknown;
}
