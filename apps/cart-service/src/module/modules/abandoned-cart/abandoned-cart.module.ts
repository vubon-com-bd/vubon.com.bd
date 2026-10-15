/**
 * AbandonedCartModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { AbandonedCartController } from '../../interfaces/controllers/rest/abandoned-cart.controller.js';

import { ABANDONED_CART_COMMAND_HANDLERS } from './commands/index.js';
import { ABANDONED_CART_QUERY_HANDLERS } from './queries/index.js';
import { ABANDONED_CART_SAGAS } from './sagas/index.js';

import { AbandonedCartService } from '../../application/services/impl/abandoned-cart.service.js';
import { ABANDONED_CART_SERVICE } from '../../application/services/interfaces/abandoned-cart.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [AbandonedCartController],
  providers: [
    AbandonedCartService,
    { provide: ABANDONED_CART_SERVICE, useExisting: AbandonedCartService },
    ...(ABANDONED_CART_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(ABANDONED_CART_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(ABANDONED_CART_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [AbandonedCartService, ABANDONED_CART_SERVICE],
})
export class AbandonedCartModule {}
