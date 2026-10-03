/**
 * OrderModule — order aggregate feature wiring
 * @module order-service/modules/order
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OrderController } from '../../interfaces/controllers/rest/order.controller.js';
import { OrderService } from '../../application/services/impl/order.service.js';
import { ORDER_SERVICE } from '../../application/services/interfaces/order.service.interface.js';

import { ORDER_COMMAND_HANDLERS } from '../../application/commands/order/index.js';
import { ORDER_QUERY_HANDLERS } from '../../application/queries/order/index.js';
import { OrderPaymentSaga } from '../../application/sagas/order-payment.saga.js';
import { OrderFulfillmentSaga } from '../../application/sagas/order-fulfillment.saga.js';
import { OrderShippingSaga } from '../../application/sagas/order-shipping.saga.js';
import { OrderDeliverySaga } from '../../application/sagas/order-delivery.saga.js';
import { OrderCancelSaga } from '../../application/sagas/order-cancel.saga.js';

import { OwnOrderGuard } from '../../interfaces/guards/own-order.guard.js';
import { OrderStatusGuard } from '../../interfaces/guards/order-status.guard.js';
import { OrderCacheInterceptor } from '../../interfaces/interceptors/order-cache.interceptor.js';

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    { provide: ORDER_SERVICE, useExisting: OrderService },

    ...ORDER_COMMAND_HANDLERS,
    ...ORDER_QUERY_HANDLERS,

    OrderPaymentSaga,
    OrderFulfillmentSaga,
    OrderShippingSaga,
    OrderDeliverySaga,
    OrderCancelSaga,

    OwnOrderGuard,
    OrderStatusGuard,
    OrderCacheInterceptor,
  ],
  exports: [OrderService, ORDER_SERVICE],
})
export class OrderModule {}
