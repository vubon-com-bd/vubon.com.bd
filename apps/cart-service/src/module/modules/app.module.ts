/**
 * CartAppModule — cart-service root module
 * @module cart-service/modules
 */
import { JwtStrategy } from '../infrastructure/security/jwt.strategy.js';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Common (global) ────────────────────────
import { CartCommonModule } from './common/index.js';

// ─── Health ─────────────────────────────────
import { HealthModule } from './health/index.js';

// ─── Feature modules ────────────────────────
import { CartModule } from './cart/index.js';
import { CartItemModule } from './cart-item/index.js';
import { CartCouponModule } from './cart-coupon/index.js';
import { CartVoucherModule } from './cart-voucher/index.js';
import { CartTaxModule } from './cart-tax/index.js';
import { CartShippingModule } from './cart-shipping/index.js';
import { SavedForLaterModule } from './saved-for-later/index.js';
import { AbandonedCartModule } from './abandoned-cart/index.js';
import { GuestCartModule } from './guest-cart/index.js';
import { CartMergerModule } from './cart-merger/index.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // ─── Root config ────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '../../.env'],

    }),
    CqrsModule.forRoot(),

    // ─── Common (global) ────────────────────
    CartCommonModule.forRoot(),

    // ─── Health ─────────────────────────────
    HealthModule,

    // ─── Feature modules ────────────────────
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
  ],
  providers: [JwtStrategy],
})
export class CartAppModule {}

// ─── Conventional alias for main.ts ─────────
export { CartAppModule as AppModule };
