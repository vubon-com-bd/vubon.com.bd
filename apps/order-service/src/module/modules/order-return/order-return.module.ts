/**
 * OrderReturnModule — feature wiring
 * @module order-service/modules/order-return
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ReturnController } from '../../interfaces/controllers/rest/return.controller.js';
import { ORDER_RETURN_COMMAND_HANDLERS } from './commands/index.js';
import { ORDER_RETURN_QUERY_HANDLERS } from './queries/index.js';
import { ORDER_RETURN_SAGAS } from './sagas/index.js';
import { OrderReturnService } from '../../application/services/impl/order-return.service.js';
import { ORDER_RETURN_SERVICE } from '../../application/services/interfaces/order-return.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [ReturnController],
  providers: [
    OrderReturnService,
    { provide: ORDER_RETURN_SERVICE, useExisting: OrderReturnService },
    ...(ORDER_RETURN_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(ORDER_RETURN_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(ORDER_RETURN_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [OrderReturnService, ORDER_RETURN_SERVICE],
})
export class OrderReturnModule {}
