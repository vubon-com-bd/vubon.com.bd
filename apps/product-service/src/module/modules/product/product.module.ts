/**
 * ProductModule — product feature wiring
 * @module product-service/modules/product
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controllers ────────────────────────────
import { ProductController } from '../../interfaces/controllers/rest/product.controller.js';
import { PublicProductController } from '../../interfaces/controllers/rest/public-product.controller.js';

// ─── Handler arrays ─────────────────────────
import { PRODUCT_COMMAND_HANDLERS } from './commands/index.js';
import { PRODUCT_QUERY_HANDLERS } from './queries/index.js';
import { PRODUCT_SAGAS } from './sagas/index.js';

// ─── Service (with DI token) ────────────────
import { ProductService } from '../../application/services/impl/product.service.js';
import { PRODUCT_SERVICE } from '../../application/services/interfaces/product.service.interface.js';

// ─── Guards ─────────────────────────────────
import { OwnProductGuard } from '../../interfaces/guards/own-product.guard.js';

import { VendorApprovedHandler } from '../../application/events/external/vendor-approved.handler.js';
import { VendorSuspendedHandler } from '../../application/events/external/vendor-suspended.handler.js';
import { ProductOrderCreatedHandler } from '../../application/events/external/order-created.handler.js';
import { ProductOrderCancelledHandler } from '../../application/events/external/order-cancelled.handler.js';
import { ProductOrderReturnedHandler } from '../../application/events/external/order-returned.handler.js';

import { VendorDeletedHandler } from '../../application/events/external/vendor-deleted.handler.js';
import { VendorActivatedHandler } from '../../application/events/external/vendor-activated.handler.js';
import { VendorDeactivatedHandler } from '../../application/events/external/vendor-deactivated.handler.js';
import { VendorVerifiedHandler } from '../../application/events/external/vendor-verified.handler.js';


@Module({
  imports: [CqrsModule],
  controllers: [ProductController, PublicProductController],
  providers: [
    VendorApprovedHandler,
    VendorSuspendedHandler,
    ProductOrderCreatedHandler,
    ProductOrderCancelledHandler,
    ProductOrderReturnedHandler,
    VendorDeletedHandler,
    VendorActivatedHandler,
    VendorDeactivatedHandler,
    VendorVerifiedHandler,
    // Service + DI token
    ProductService,
    { provide: PRODUCT_SERVICE, useExisting: ProductService },

    // Command handlers
    ...(PRODUCT_COMMAND_HANDLERS as readonly unknown[] as never[]),

    // Query handlers
    ...(PRODUCT_QUERY_HANDLERS as readonly unknown[] as never[]),

    // Sagas
    ...(PRODUCT_SAGAS as readonly unknown[] as never[]),

    // Guards
    OwnProductGuard,
  ],
  exports: [ProductService, PRODUCT_SERVICE],
})
export class ProductModule {}
