/**
 * CartMergerModule
 * @module cart-service/modules/cart-merger
 *
 * Note: cart-merger has no dedicated controller (merges via guest-cart).
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CartMergerService } from '../../application/services/impl/cart-merger.service.js';
import { CART_MERGER_SERVICE } from '../../application/services/interfaces/cart-merger.service.interface.js';

import { CART_MERGER_COMMAND_HANDLERS } from './commands/index.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  providers: [
    CartMergerService,
    { provide: CART_MERGER_SERVICE, useExisting: CartMergerService },
    ...(CART_MERGER_COMMAND_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [CartMergerService, CART_MERGER_SERVICE],
})
export class CartMergerModule {}
