/**
 * CartTaxModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CartTotalsController } from '../../interfaces/controllers/rest/cart-totals.controller.js';

import { CART_TAX_QUERY_HANDLERS } from './queries/index.js';

import { CartTaxService } from '../../application/services/impl/cart-tax.service.js';
import { CART_TAX_SERVICE } from '../../application/services/interfaces/cart-tax.service.interface.js';

import { CartOwnerGuard } from '../../interfaces/guards/cart-owner.guard.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [CartTotalsController],
  providers: [
    CartTaxService,
    { provide: CART_TAX_SERVICE, useExisting: CartTaxService },
    ...(CART_TAX_QUERY_HANDLERS as readonly unknown[] as never[]),
    CartOwnerGuard,
  ],
  exports: [CartTaxService, CART_TAX_SERVICE],
})
export class CartTaxModule {}
