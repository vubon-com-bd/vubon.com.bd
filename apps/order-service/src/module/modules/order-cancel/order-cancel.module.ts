/**
 * OrderCancelModule
 * @module order-service/modules/order-cancel
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CancelController } from '../../interfaces/controllers/rest/cancel.controller.js';
import { OrderCancelService } from '../../application/services/impl/order-cancel.service.js';
import { ORDER_CANCEL_SERVICE } from '../../application/services/interfaces/order-cancel.service.interface.js';
import { CANCEL_COMMAND_HANDLERS } from '../../application/commands/cancel/index.js';
import { CANCEL_QUERY_HANDLERS } from '../../application/queries/cancel/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [CancelController],
  providers: [
    OrderCancelService,
    { provide: ORDER_CANCEL_SERVICE, useExisting: OrderCancelService },
    ...CANCEL_COMMAND_HANDLERS,
    ...CANCEL_QUERY_HANDLERS,
  ],
  exports: [OrderCancelService, ORDER_CANCEL_SERVICE],
})
export class OrderCancelModule {}
