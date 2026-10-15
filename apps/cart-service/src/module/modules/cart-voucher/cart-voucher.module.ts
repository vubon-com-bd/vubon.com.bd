/**
 * CartVoucherModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CartVoucherController } from '../../interfaces/controllers/rest/cart-voucher.controller.js';

import { CART_VOUCHER_COMMAND_HANDLERS } from './commands/index.js';
import { CART_VOUCHER_QUERY_HANDLERS } from './queries/index.js';

import { CartVoucherService } from '../../application/services/impl/cart-voucher.service.js';
import { CART_VOUCHER_SERVICE } from '../../application/services/interfaces/cart-voucher.service.interface.js';

import { CartOwnerGuard } from '../../interfaces/guards/cart-owner.guard.js';
import { CartLockInterceptor } from '../../interfaces/interceptors/cart-lock.interceptor.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [CartVoucherController],
  providers: [
    CartVoucherService,
    { provide: CART_VOUCHER_SERVICE, useExisting: CartVoucherService },
    ...(CART_VOUCHER_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CART_VOUCHER_QUERY_HANDLERS as readonly unknown[] as never[]),
    CartOwnerGuard,
    CartLockInterceptor,
  ],
  exports: [CartVoucherService, CART_VOUCHER_SERVICE],
})
export class CartVoucherModule {}
