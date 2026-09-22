import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrackingController } from '../../interfaces/controllers/rest/tracking.controller';
import { TrackingService } from '../../application/services/impl/tracking.service';
import { AddTrackingHandler } from '../../application/commands/tracking/add-tracking.handler';
import { UpdateTrackingHandler } from '../../application/commands/tracking/update-tracking.handler';
import { RemoveTrackingHandler } from '../../application/commands/tracking/remove-tracking.handler';
import { GetTrackingHandler } from '../../application/queries/tracking/get-tracking.handler';
import { ListTrackingByOrderHandler } from '../../application/queries/tracking/list-tracking-by-order.handler';
import { OrderTrackingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/order-tracking.prisma.repository';
import { OrderTrackingCacheRepository } from '../../infrastructure/persistence/cache/repositories/order-tracking.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [TrackingController],
  providers: [
    OrderTrackingPrismaRepository,
    OrderTrackingCacheRepository,
    TrackingService,
    AddTrackingHandler,
    UpdateTrackingHandler,
    RemoveTrackingHandler,
    GetTrackingHandler,
    ListTrackingByOrderHandler,
  ],
  exports: [TrackingService, OrderTrackingPrismaRepository, OrderTrackingCacheRepository],
})
export class OrderTrackingModule {}
