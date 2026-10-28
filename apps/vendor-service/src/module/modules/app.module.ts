/**
 * VendorAppModule — vendor-service root module
 * @module vendor-service/modules
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { getOptionalEnv } from '@vubon/shared-config/common';

// ─── Security ────────────────────────────────
import { JwtAuthMiddleware } from '../infrastructure/security/jwt-auth.middleware.js';
import { JwtStrategy } from '../infrastructure/security/jwt.strategy.js';

// ─── Common (global) ─────────────────────────
import { VendorCommonModule } from './common/index.js';

// ─── Health ──────────────────────────────────
import { HealthModule } from './health/index.js';

// ─── Cross-service event subscribers ─────────
import { VendorEventSubscriberService } from '../application/services/impl/vendor-event-subscriber.service.js';
import { UserCreatedHandler } from '../application/handlers/user-created.handler.js';
import { ProductInventoryAdjustedHandler } from '../application/handlers/product-inventory-adjusted.handler.js';
import { ProductVariantAddedHandler } from '../application/handlers/product-variant-added.handler.js';
import { OrderCreatedHandler } from '../application/handlers/order-created.handler.js';
import { OrderCancelledHandler } from '../application/handlers/order-cancelled.handler.js';
import { OrderReturnedHandler } from '../application/handlers/order-returned.handler.js';


// ─── Feature modules ─────────────────────────
import { VendorModule } from './vendor/index.js';
import { VendorProfileModule } from './vendor-profile/index.js';
import { VendorBusinessModule } from './vendor-business/index.js';
import { VendorContactModule } from './vendor-contact/index.js';
import { VendorAddressModule } from './vendor-address/index.js';
import { VendorBankAccountModule } from './vendor-bank-account/index.js';
import { VendorDocumentModule } from './vendor-document/index.js';
import { VendorVerificationModule } from './vendor-verification/index.js';
import { VendorApprovalModule } from './vendor-approval/index.js';
import { VendorSuspensionModule } from './vendor-suspension/index.js';
import { VendorCommissionModule } from './vendor-commission/index.js';
import { VendorPayoutModule } from './vendor-payout/index.js';
import { VendorSettlementModule } from './vendor-settlement/index.js';
import { VendorPerformanceModule } from './vendor-performance/index.js';
import { VendorRatingModule } from './vendor-rating/index.js';
import { VendorReviewModule } from './vendor-review/index.js';
import { VendorShippingModule } from './vendor-shipping/index.js';
import { VendorReturnPolicyModule } from './vendor-return-policy/index.js';
import { VendorWarrantyModule } from './vendor-warranty/index.js';
import { VendorTeamModule } from './vendor-team/index.js';
import { VendorFeatureModule } from './vendor-feature/index.js';
import { VendorSubscriptionModule } from './vendor-subscription/index.js';
import { PublicVendorModule } from './public-vendor/index.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // ─── Root config ────────────────────────
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),

    // ─── JWT ────────────────────────────────
    JwtModule.register({
      global: true,
      secret: getOptionalEnv(
        'JWT_SECRET',
        'vubon-vendor-service-dev-jwt-secret-key-32chars-minimum-ok',
      ),
      signOptions: { expiresIn: getOptionalEnv('JWT_EXPIRES_IN', '7d') as never },
    }),

    // ─── Common (global) ────────────────────
    VendorCommonModule.forRoot(),

    // ─── Health ─────────────────────────────
    HealthModule,

    // ─── Features ───────────────────────────
    VendorModule,
    VendorProfileModule,
    VendorBusinessModule,
    VendorContactModule,
    VendorAddressModule,
    VendorBankAccountModule,
    VendorDocumentModule,
    VendorVerificationModule,
    VendorApprovalModule,
    VendorSuspensionModule,
    VendorCommissionModule,
    VendorPayoutModule,
    VendorSettlementModule,
    VendorPerformanceModule,
    VendorRatingModule,
    VendorReviewModule,
    VendorShippingModule,
    VendorReturnPolicyModule,
    VendorWarrantyModule,
    VendorTeamModule,
    VendorFeatureModule,
    VendorSubscriptionModule,
    PublicVendorModule,
  ],
  providers: [
    JwtStrategy,
    // ─── Cross-service event subscribers ────
    UserCreatedHandler,
    OrderCreatedHandler,
    ProductVariantAddedHandler,
    ProductInventoryAdjustedHandler,
    OrderCancelledHandler,
    OrderReturnedHandler,
    VendorEventSubscriberService,
  ],
})
export class VendorAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(JwtAuthMiddleware).forRoutes('*');
  }
}

export { VendorAppModule as AppModule };
