/**
 * Cart Prisma Repositories Module
 * @module cart-service/infrastructure/persistence/prisma
 *
 * Wires ৪টি Prisma repository (Cart, SavedForLater, AbandonedCart, CartMerger)
 * to their domain DI tokens.
 */
import { Module } from '@nestjs/common';
import { CartPrismaModule } from './prisma.module.js';

// ─── Domain DI tokens ───────────────────────
import { CART_REPOSITORY } from '../../../domain/repositories/cart.repository.interface.js';
import { SAVED_FOR_LATER_REPOSITORY } from '../../../domain/repositories/saved-for-later.repository.interface.js';
import { ABANDONED_CART_REPOSITORY } from '../../../domain/repositories/abandoned-cart.repository.interface.js';
import { CART_MERGER_REPOSITORY } from '../../../domain/repositories/cart-merger.repository.interface.js';

// ─── Implementations ────────────────────────
import { CartPrismaRepository } from './repositories/cart.prisma.repository.js';
import { SavedForLaterPrismaRepository } from './repositories/saved-for-later.prisma.repository.js';
import { AbandonedCartPrismaRepository } from './repositories/abandoned-cart.prisma.repository.js';
import { CartMergerPrismaRepository } from './repositories/cart-merger.prisma.repository.js';

const REPOSITORIES = [
  CartPrismaRepository,
  SavedForLaterPrismaRepository,
  AbandonedCartPrismaRepository,
  CartMergerPrismaRepository,
];

@Module({
  imports: [CartPrismaModule],
  providers: [
    ...REPOSITORIES,
    // ─── DI token bindings ───
    // ⚠️ Termux: CART_REPOSITORY provided by Redis module instead
    // { provide: CART_REPOSITORY, useExisting: CartPrismaRepository },
    { provide: SAVED_FOR_LATER_REPOSITORY, useExisting: SavedForLaterPrismaRepository },
    { provide: ABANDONED_CART_REPOSITORY, useExisting: AbandonedCartPrismaRepository },
    { provide: CART_MERGER_REPOSITORY, useExisting: CartMergerPrismaRepository },
  ],
  exports: [
    ...REPOSITORIES,
    // CART_REPOSITORY,  // Provided by Redis
    SAVED_FOR_LATER_REPOSITORY,
    ABANDONED_CART_REPOSITORY,
    CART_MERGER_REPOSITORY,
  ],
})
export class CartPrismaRepositoriesModule {}
