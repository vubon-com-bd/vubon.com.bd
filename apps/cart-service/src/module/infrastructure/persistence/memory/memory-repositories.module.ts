/**
 * Memory Repositories Module
 * @module cart-service/infrastructure/persistence/memory
 *
 * Provides in-memory implementations for all 10 Cart Service repositories.
 * Activated when DB_MODE=memory in .env
 */
import { Global, Module } from '@nestjs/common';

// ─── Domain DI Tokens ───────────────────────
import { CART_REPOSITORY } from '../../../domain/repositories/cart.repository.interface.js';
import { CART_ITEM_REPOSITORY } from '../../../domain/repositories/cart-item.repository.interface.js';
import { CART_COUPON_REPOSITORY } from '../../../domain/repositories/cart-coupon.repository.interface.js';
import { CART_VOUCHER_REPOSITORY } from '../../../domain/repositories/cart-voucher.repository.interface.js';
import { CART_TAX_REPOSITORY } from '../../../domain/repositories/cart-tax.repository.interface.js';
import { CART_SHIPPING_REPOSITORY } from '../../../domain/repositories/cart-shipping.repository.interface.js';
import { SAVED_FOR_LATER_REPOSITORY } from '../../../domain/repositories/saved-for-later.repository.interface.js';
import { ABANDONED_CART_REPOSITORY } from '../../../domain/repositories/abandoned-cart.repository.interface.js';
import { GUEST_CART_REPOSITORY } from '../../../domain/repositories/guest-cart.repository.interface.js';
import { CART_MERGER_REPOSITORY } from '../../../domain/repositories/cart-merger.repository.interface.js';

// ─── InMemory Implementations ───────────────
import { InMemoryCartRepository } from './repositories/cart.memory.repository.js';
import { InMemoryCartItemRepository } from './repositories/cart-item.memory.repository.js';
import { InMemoryCartCouponRepository } from './repositories/cart-coupon.memory.repository.js';
import { InMemoryCartVoucherRepository } from './repositories/cart-voucher.memory.repository.js';
import { InMemoryCartTaxRepository } from './repositories/cart-tax.memory.repository.js';
import { InMemoryCartShippingRepository } from './repositories/cart-shipping.memory.repository.js';
import { InMemorySavedForLaterRepository } from './repositories/saved-for-later.memory.repository.js';
import { InMemoryAbandonedCartRepository } from './repositories/abandoned-cart.memory.repository.js';
import { InMemoryGuestCartRepository } from './repositories/guest-cart.memory.repository.js';
import { InMemoryCartMergerRepository } from './repositories/cart-merger.memory.repository.js';

const REPOSITORIES = [
  InMemoryCartRepository,
  InMemoryCartItemRepository,
  InMemoryCartCouponRepository,
  InMemoryCartVoucherRepository,
  InMemoryCartTaxRepository,
  InMemoryCartShippingRepository,
  InMemorySavedForLaterRepository,
  InMemoryAbandonedCartRepository,
  InMemoryGuestCartRepository,
  InMemoryCartMergerRepository,
];

@Global()
@Module({
  providers: [
    ...REPOSITORIES,
    // ─── DI Token Bindings ───
    { provide: CART_REPOSITORY, useExisting: InMemoryCartRepository },
    { provide: CART_ITEM_REPOSITORY, useExisting: InMemoryCartItemRepository },
    { provide: CART_COUPON_REPOSITORY, useExisting: InMemoryCartCouponRepository },
    { provide: CART_VOUCHER_REPOSITORY, useExisting: InMemoryCartVoucherRepository },
    { provide: CART_TAX_REPOSITORY, useExisting: InMemoryCartTaxRepository },
    { provide: CART_SHIPPING_REPOSITORY, useExisting: InMemoryCartShippingRepository },
    { provide: SAVED_FOR_LATER_REPOSITORY, useExisting: InMemorySavedForLaterRepository },
    { provide: ABANDONED_CART_REPOSITORY, useExisting: InMemoryAbandonedCartRepository },
    { provide: GUEST_CART_REPOSITORY, useExisting: InMemoryGuestCartRepository },
    { provide: CART_MERGER_REPOSITORY, useExisting: InMemoryCartMergerRepository },
  ],
  exports: [
    ...REPOSITORIES,
    CART_REPOSITORY,
    CART_ITEM_REPOSITORY,
    CART_COUPON_REPOSITORY,
    CART_VOUCHER_REPOSITORY,
    CART_TAX_REPOSITORY,
    CART_SHIPPING_REPOSITORY,
    SAVED_FOR_LATER_REPOSITORY,
    ABANDONED_CART_REPOSITORY,
    GUEST_CART_REPOSITORY,
    CART_MERGER_REPOSITORY,
  ],
})
export class MemoryRepositoriesModule {}
