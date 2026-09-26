import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EventPayloadService } from '../../application/services/impl/event-payload.service';
import { EventPayloadPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/event-payload.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    EventPayloadPrismaRepository,
    EventPayloadService,
  ],
  exports: [
    EventPayloadService,
    EventPayloadPrismaRepository,
  ],
})
export class EventPayloadModule {}
