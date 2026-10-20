/**
 * OrderCancelModule — feature wiring
 * @module order-service/modules/order-cancel
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CancelController } from '../../interfaces/controllers/rest/cancel.controller.js';
import { ORDER_CANCEL_COMMAND_HANDLERS } from './commands/index.js';
import { ORDER_CANCEL_QUERY_HANDLERS } from './queries/index.js';
import { ORDER_CANCEL_SAGAS } from './sagas/index.js';
import { OrderCancelService } from '../../application/services/impl/order-cancel.service.js';
import { ORDER_CANCEL_SERVICE } from '../../application/services/interfaces/order-cancel.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [CancelController],
  providers: [
    OrderCancelService,
    { provide: ORDER_CANCEL_SERVICE, useExisting: OrderCancelService },
    ...(ORDER_CANCEL_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(ORDER_CANCEL_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(ORDER_CANCEL_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [OrderCancelService, ORDER_CANCEL_SERVICE],
})
export class OrderCancelModule {}
