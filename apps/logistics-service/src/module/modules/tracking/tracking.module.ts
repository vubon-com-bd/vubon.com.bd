import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrackingController } from '../../interfaces/controllers/rest/tracking.controller';
import { TrackingService } from '../../application/services/impl/tracking.service';
import { TrackingMapper } from '../../application/mappers/tracking.mapper';

import { GetTrackingHandler } from '../../application/queries/tracking/get-tracking.handler';
import { GetTrackingByShipmentHandler } from '../../application/queries/tracking/get-tracking-by-shipment.handler';
import { ListTrackingEventsHandler } from '../../application/queries/tracking/list-tracking-events.handler';

import { TrackingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/tracking.prisma.repository';
import { TrackingCacheRepository } from '../../infrastructure/persistence/cache/repositories/tracking.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [TrackingController],
  providers: [
    TrackingPrismaRepository,
    TrackingCacheRepository,
    TrackingService,
    TrackingMapper,
    GetTrackingHandler,
    GetTrackingByShipmentHandler,
    ListTrackingEventsHandler,
  ],
  exports: [TrackingService, TrackingPrismaRepository, TrackingCacheRepository],
})
export class TrackingModule {}
