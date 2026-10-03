/**
 * AppModule — Root module of cart-service
 * @module cart-service/modules
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

// Common
import { CommonModule } from './common/index.js';

// Infrastructure
import { RedisRepositoriesModule } from '../infrastructure/persistence/redis/redis-repositories.module.js';
import { PrismaRepositoriesModule } from '../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { QueuesWorkersModule } from '../infrastructure/queues-workers.module.js';

// Feature modules
import { CartModule } from './cart/cart.module.js';
import { CartItemModule } from './cart-item/cart-item.module.js';
import { CartCouponModule } from './cart-coupon/cart-coupon.module.js';
import { CartVoucherModule } from './cart-voucher/cart-voucher.module.js';
import { CartTaxModule } from './cart-tax/cart-tax.module.js';
import { CartShippingModule } from './cart-shipping/cart-shipping.module.js';
import { SavedForLaterModule } from './saved-for-later/saved-for-later.module.js';
import { AbandonedCartModule } from './abandoned-cart/abandoned-cart.module.js';
import { GuestCartModule } from './guest-cart/guest-cart.module.js';
import { CartMergerModule } from './cart-merger/cart-merger.module.js';

// Health
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),

    // Common (global)
    CommonModule,

    // Infrastructure
    RedisRepositoriesModule,
    PrismaRepositoriesModule,
    QueuesWorkersModule,

    // Feature modules
    CartModule,
    CartItemModule,
    CartCouponModule,
    CartVoucherModule,
    CartTaxModule,
    CartShippingModule,
    SavedForLaterModule,
    AbandonedCartModule,
    GuestCartModule,
    CartMergerModule,

    // Health
    HealthModule,
  ],
})
export class AppModule {}
