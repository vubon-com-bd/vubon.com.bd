import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OrderController } from '../../interfaces/controllers/rest/order.controller';
import { OrderService } from '../../application/services/impl/order.service';
import { CreateOrderHandler } from '../../application/commands/order/create-order.handler';
import { UpdateOrderHandler } from '../../application/commands/order/update-order.handler';
import { DeleteOrderHandler } from '../../application/commands/order/delete-order.handler';
import { ConfirmOrderHandler } from '../../application/commands/order/confirm-order.handler';
import { HoldOrderHandler } from '../../application/commands/order/hold-order.handler';
import { ReleaseOrderHandler } from '../../application/commands/order/release-order.handler';
import { CancelOrderHandler } from '../../application/commands/order/cancel-order.handler';
import { GetOrderHandler } from '../../application/queries/order/get-order.handler';
import { GetOrderByNumberHandler } from '../../application/queries/order/get-order-by-number.handler';
import { ListOrdersHandler } from '../../application/queries/order/list-orders.handler';
import { ListOrdersByCustomerHandler } from '../../application/queries/order/list-orders-by-customer.handler';
import { ListOrdersByVendorHandler } from '../../application/queries/order/list-orders-by-vendor.handler';
import { GetOrderStatsHandler } from '../../application/queries/order/get-order-stats.handler';
import { OrderCheckoutSaga } from '../../application/sagas/order-checkout.saga';
import { OrderPaymentSaga } from '../../application/sagas/order-payment.saga';
import { OrderFulfillmentSaga } from '../../application/sagas/order-fulfillment.saga';
import { OrderShippingSaga } from '../../application/sagas/order-shipping.saga';
import { OrderDeliverySaga } from '../../application/sagas/order-delivery.saga';
import { OrderCancelSaga } from '../../application/sagas/order-cancel.saga';
import { OrderReturnSaga } from '../../application/sagas/order-return.saga';
import { OrderPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/order.prisma.repository';
import { OrderCacheRepository } from '../../infrastructure/persistence/cache/repositories/order.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
  providers: [
    OrderPrismaRepository,
    OrderCacheRepository,
    OrderService,
    CreateOrderHandler,
    UpdateOrderHandler,
    DeleteOrderHandler,
    ConfirmOrderHandler,
    HoldOrderHandler,
    ReleaseOrderHandler,
    CancelOrderHandler,
    GetOrderHandler,
    GetOrderByNumberHandler,
    ListOrdersHandler,
    ListOrdersByCustomerHandler,
    ListOrdersByVendorHandler,
    GetOrderStatsHandler,
    OrderCheckoutSaga,
    OrderPaymentSaga,
    OrderFulfillmentSaga,
    OrderShippingSaga,
    OrderDeliverySaga,
    OrderCancelSaga,
    OrderReturnSaga,
  ],
  exports: [OrderService, OrderPrismaRepository, OrderCacheRepository],
})
export class OrderModule {}
