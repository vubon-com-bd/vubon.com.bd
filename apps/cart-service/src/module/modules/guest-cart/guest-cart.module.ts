/**
 * GuestCartModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { GuestCartController } from '../../interfaces/controllers/rest/guest-cart.controller.js';

import { GUEST_CART_COMMAND_HANDLERS } from './commands/index.js';
import { GUEST_CART_QUERY_HANDLERS } from './queries/index.js';

import { GuestCartService } from '../../application/services/impl/guest-cart.service.js';
import { GUEST_CART_SERVICE } from '../../application/services/interfaces/guest-cart.service.interface.js';

import { GuestCartGuard } from '../../interfaces/guards/guest-cart.guard.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [GuestCartController],
  providers: [
    GuestCartService,
    { provide: GUEST_CART_SERVICE, useExisting: GuestCartService },
    ...(GUEST_CART_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(GUEST_CART_QUERY_HANDLERS as readonly unknown[] as never[]),
    GuestCartGuard,
  ],
  exports: [GuestCartService, GUEST_CART_SERVICE],
})
export class GuestCartModule {}
