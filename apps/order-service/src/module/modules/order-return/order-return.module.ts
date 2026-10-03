/**
 * OrderReturnModule
 * @module order-service/modules/order-return
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ReturnController } from '../../interfaces/controllers/rest/return.controller.js';
import { OrderReturnService } from '../../application/services/impl/order-return.service.js';
import { ORDER_RETURN_SERVICE } from '../../application/services/interfaces/order-return.service.interface.js';
import { RETURN_COMMAND_HANDLERS } from '../../application/commands/return/index.js';
import { RETURN_QUERY_HANDLERS } from '../../application/queries/return/index.js';
import { OrderReturnSaga } from '../../application/sagas/order-return.saga.js';

@Module({
  imports: [CqrsModule],
  controllers: [ReturnController],
  providers: [
    OrderReturnService,
    { provide: ORDER_RETURN_SERVICE, useExisting: OrderReturnService },
    ...RETURN_COMMAND_HANDLERS,
    ...RETURN_QUERY_HANDLERS,
    OrderReturnSaga,
  ],
  exports: [OrderReturnService, ORDER_RETURN_SERVICE],
})
export class OrderReturnModule {}
