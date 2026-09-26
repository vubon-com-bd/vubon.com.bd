import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EventController } from '../../interfaces/controllers/rest/event.controller';
import { TrackEventHandler } from '../../application/commands/event/track-event.handler';
import { BatchTrackEventHandler } from '../../application/commands/event/batch-track-event.handler';
import { ProcessEventHandler } from '../../application/commands/event/process-event.handler';
import { GetEventHandler } from '../../application/queries/event/get-event.handler';
import { ListEventsHandler } from '../../application/queries/event/list-events.handler';
import { SearchEventsHandler } from '../../application/queries/event/search-events.handler';
import { EventService } from '../../application/services/impl/event.service';
import { EventPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/event.prisma.repository';
import { EventProcessorService } from '../../infrastructure/services/internal/event-processor.service';

const HANDLERS = [
  TrackEventHandler,
  BatchTrackEventHandler,
  ProcessEventHandler,
  GetEventHandler,
  ListEventsHandler,
  SearchEventsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [EventController],
  providers: [
    EventPrismaRepository,
    EventProcessorService,
    EventService,
    ...HANDLERS,
  ],
  exports: [
    EventService,
    EventPrismaRepository,
    EventProcessorService,
  ],
})
export class EventModule {}
