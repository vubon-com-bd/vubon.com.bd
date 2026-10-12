/**
 * Event Module
 */
import { Module } from '@nestjs/common';
import { EventController } from '../../interfaces/controllers/rest/event.controller.js';
import { EVENT_COMMAND_HANDLERS } from './commands/index.js';
import { EVENT_QUERY_HANDLERS } from './queries/index.js';
import { EVENT_SAGAS } from './sagas/index.js';
import { EventPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/event.prisma.repository.js';
import { EventPayloadPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/event-payload.prisma.repository.js';
import { EventService } from '../../application/services/impl/event.service.js';
import { EventPayloadService } from '../../application/services/impl/event-payload.service.js';
import { EventValidator } from '../../interfaces/validators/event.validator.js';
import { EventHealthIndicator } from './health/index.js';

@Module({
  controllers: [EventController],
  providers: [
    // Repositories
    EventPrismaRepository,
    EventPayloadPrismaRepository,
    // Services
    EventService,
    EventPayloadService,
    // Validators
    EventValidator,
    // Health
    EventHealthIndicator,
    // Command handlers (decorated with @CommandHandler)
    ...EVENT_COMMAND_HANDLERS as readonly unknown[] as never[],
    // Query handlers (decorated with @QueryHandler)
    ...EVENT_QUERY_HANDLERS as readonly unknown[] as never[],
    // Sagas
    ...EVENT_SAGAS as readonly unknown[] as never[],
  ],
  exports: [
    EventService,
    EventPayloadService,
    EventPrismaRepository,
    EventHealthIndicator,
  ],
})
export class EventModule {}
