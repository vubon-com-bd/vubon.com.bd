import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FulfillmentController } from '../../interfaces/controllers/rest/fulfillment.controller';
import { FulfillmentService } from '../../application/services/impl/fulfillment.service';
import { FulfillmentMapper } from '../../application/mappers/fulfillment.mapper';

import { StartFulfillmentHandler } from '../../application/commands/fulfillment/start-fulfillment.handler';
import { PickItemsHandler } from '../../application/commands/fulfillment/pick-items.handler';
import { PackItemsHandler } from '../../application/commands/fulfillment/pack-items.handler';
import { CompleteFulfillmentHandler } from '../../application/commands/fulfillment/complete-fulfillment.handler';

import { GetFulfillmentHandler } from '../../application/queries/fulfillment/get-fulfillment.handler';
import { ListFulfillmentsHandler } from '../../application/queries/fulfillment/list-fulfillments.handler';
import { ListPendingFulfillmentsHandler } from '../../application/queries/fulfillment/list-pending-fulfillments.handler';

import { FulfillmentPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/fulfillment.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [FulfillmentController],
  providers: [
    FulfillmentPrismaRepository,
    FulfillmentService,
    FulfillmentMapper,
    StartFulfillmentHandler,
    PickItemsHandler,
    PackItemsHandler,
    CompleteFulfillmentHandler,
    GetFulfillmentHandler,
    ListFulfillmentsHandler,
    ListPendingFulfillmentsHandler,
  ],
  exports: [FulfillmentService, FulfillmentPrismaRepository],
})
export class FulfillmentModule {}
