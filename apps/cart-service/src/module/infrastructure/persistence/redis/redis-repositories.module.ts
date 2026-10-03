/**
 * RedisRepositoriesModule
 * @module cart-service/infrastructure/persistence/redis
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { CartRedisRepository } from './repositories/cart.redis.repository.js';
import { CartItemRedisRepository } from './repositories/cart-item.redis.repository.js';
import { GuestCartRedisRepository } from './repositories/guest-cart.redis.repository.js';
import { CartCouponRedisRepository } from './repositories/cart-coupon.redis.repository.js';
import { CartVoucherRedisRepository } from './repositories/cart-voucher.redis.repository.js';
import { CartTaxRedisRepository } from './repositories/cart-tax.redis.repository.js';
import { CartShippingRedisRepository } from './repositories/cart-shipping.redis.repository.js';

import { CART_REPOSITORY } from '../../../domain/repositories/cart.repository.interface.js';
import { CART_ITEM_REPOSITORY } from '../../../domain/repositories/cart-item.repository.interface.js';
import { GUEST_CART_REPOSITORY } from '../../../domain/repositories/guest-cart.repository.interface.js';
import { CART_COUPON_REPOSITORY } from '../../../domain/repositories/cart-coupon.repository.interface.js';
import { CART_VOUCHER_REPOSITORY } from '../../../domain/repositories/cart-voucher.repository.interface.js';
import { CART_TAX_REPOSITORY } from '../../../domain/repositories/cart-tax.repository.interface.js';
import { CART_SHIPPING_REPOSITORY } from '../../../domain/repositories/cart-shipping.repository.interface.js';

const PROVIDERS = [
  CartRedisRepository,
  CartItemRedisRepository,
  GuestCartRedisRepository,
  CartCouponRedisRepository,
  CartVoucherRedisRepository,
  CartTaxRedisRepository,
  CartShippingRedisRepository,
  { provide: CART_REPOSITORY, useExisting: CartRedisRepository },
  { provide: CART_ITEM_REPOSITORY, useExisting: CartItemRedisRepository },
  { provide: GUEST_CART_REPOSITORY, useExisting: GuestCartRedisRepository },
  { provide: CART_COUPON_REPOSITORY, useExisting: CartCouponRedisRepository },
  { provide: CART_VOUCHER_REPOSITORY, useExisting: CartVoucherRedisRepository },
  { provide: CART_TAX_REPOSITORY, useExisting: CartTaxRedisRepository },
  { provide: CART_SHIPPING_REPOSITORY, useExisting: CartShippingRedisRepository },
];

@Module({
  imports: [RedisModule],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS, RedisModule],
})
export class RedisRepositoriesModule {}
