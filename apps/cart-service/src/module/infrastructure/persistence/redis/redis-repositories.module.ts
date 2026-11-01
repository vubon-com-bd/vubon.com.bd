/**
 * Cart Redis Repositories Module
 * @module cart-service/infrastructure/persistence/redis
 */
import { Module } from '@nestjs/common';
import { CartRedisModule } from './redis.module.js';

// ─── Domain DI tokens ───────────────────────
import { CART_REPOSITORY } from '../../../domain/repositories/cart.repository.interface.js';
import { CART_ITEM_REPOSITORY } from '../../../domain/repositories/cart-item.repository.interface.js';
import { CART_COUPON_REPOSITORY } from '../../../domain/repositories/cart-coupon.repository.interface.js';
import { CART_VOUCHER_REPOSITORY } from '../../../domain/repositories/cart-voucher.repository.interface.js';
import { CART_TAX_REPOSITORY } from '../../../domain/repositories/cart-tax.repository.interface.js';
import { CART_SHIPPING_REPOSITORY } from '../../../domain/repositories/cart-shipping.repository.interface.js';
import { GUEST_CART_REPOSITORY } from '../../../domain/repositories/guest-cart.repository.interface.js';

// ─── Implementations ────────────────────────
import { CartRedisRepository } from './repositories/cart.redis.repository.js';
import { CartItemRedisRepository } from './repositories/cart-item.redis.repository.js';
import { CartCouponRedisRepository } from './repositories/cart-coupon.redis.repository.js';
import { CartVoucherRedisRepository } from './repositories/cart-voucher.redis.repository.js';
import { CartTaxRedisRepository } from './repositories/cart-tax.redis.repository.js';
import { CartShippingRedisRepository } from './repositories/cart-shipping.redis.repository.js';
import { GuestCartRedisRepository } from './repositories/guest-cart.redis.repository.js';

const REPOSITORIES = [
  CartRedisRepository,
  CartItemRedisRepository,
  CartCouponRedisRepository,
  CartVoucherRedisRepository,
  CartTaxRedisRepository,
  CartShippingRedisRepository,
  GuestCartRedisRepository,
];

@Module({
  imports: [CartRedisModule],
  providers: [
    ...REPOSITORIES,
    { provide: CART_REPOSITORY, useExisting: CartRedisRepository },
    { provide: CART_ITEM_REPOSITORY, useExisting: CartItemRedisRepository },
    { provide: CART_COUPON_REPOSITORY, useExisting: CartCouponRedisRepository },
    { provide: CART_VOUCHER_REPOSITORY, useExisting: CartVoucherRedisRepository },
    { provide: CART_TAX_REPOSITORY, useExisting: CartTaxRedisRepository },
    { provide: CART_SHIPPING_REPOSITORY, useExisting: CartShippingRedisRepository },
    { provide: GUEST_CART_REPOSITORY, useExisting: GuestCartRedisRepository },
  ],
  exports: [
    ...REPOSITORIES,
    CART_REPOSITORY,
    CART_ITEM_REPOSITORY,
    CART_COUPON_REPOSITORY,
    CART_VOUCHER_REPOSITORY,
    CART_TAX_REPOSITORY,
    CART_SHIPPING_REPOSITORY,
    GUEST_CART_REPOSITORY,
  ],
})
export class CartRedisRepositoriesModule {}
