import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FulfillmentController } from '../../interfaces/controllers/rest/fulfillment.controller';
import { FulfillmentService } from '../../application/services/impl/fulfillment.service';
import { StartFulfillmentHandler } from '../../application/commands/fulfillment/start-fulfillment.handler';
import { PackOrderHandler } from '../../application/commands/fulfillment/pack-order.handler';
import { ShipOrderHandler } from '../../application/commands/fulfillment/ship-order.handler';
import { CompleteFulfillmentHandler } from '../../application/commands/fulfillment/complete-fulfillment.handler';
import { AllocateFulfillmentHandler } from '../../application/commands/fulfillment/allocate-fulfillment.handler';
import { GetFulfillmentHandler } from '../../application/queries/fulfillment/get-fulfillment.handler';
import { GetFulfillmentByOrderHandler } from '../../application/queries/fulfillment/get-fulfillment-by-order.handler';
import { OrderFulfillmentPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/order-fulfillment.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [FulfillmentController],
  providers: [
    OrderFulfillmentPrismaRepository,
    FulfillmentService,
    StartFulfillmentHandler,
    PackOrderHandler,
    ShipOrderHandler,
    CompleteFulfillmentHandler,
    AllocateFulfillmentHandler,
    GetFulfillmentHandler,
    GetFulfillmentByOrderHandler,
  ],
  exports: [FulfillmentService, OrderFulfillmentPrismaRepository],
})
export class OrderFulfillmentModule {}
