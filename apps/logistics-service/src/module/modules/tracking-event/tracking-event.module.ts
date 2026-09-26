import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrackingEventController } from '../../interfaces/controllers/rest/tracking-event.controller';
import { TrackingEventService } from '../../application/services/impl/tracking-event.service';
import { ListTrackingEventsHandler } from '../../application/queries/tracking/list-tracking-events.handler';
import { TrackingEventPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/tracking-event.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [TrackingEventController],
  providers: [
    TrackingEventPrismaRepository,
    TrackingEventService,
    ListTrackingEventsHandler,
  ],
  exports: [TrackingEventService, TrackingEventPrismaRepository],
})
export class TrackingEventModule {}
