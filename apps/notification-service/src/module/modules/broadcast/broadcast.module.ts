import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { BroadcastController } from '../../interfaces/controllers/rest/broadcast.controller';

// Services
import { BroadcastService } from '../../application/services/impl/broadcast.service';
import { BroadcastResultService } from '../../application/services/impl/broadcast-result.service';

// Repositories
import { BroadcastPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/broadcast.prisma.repository';
import { BroadcastResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/broadcast-result.prisma.repository';

// Workers + Queues
import { BroadcastProcessorWorker } from '../../infrastructure/workers/broadcast-processor.worker';
import { BroadcastQueue } from '../../infrastructure/queues/broadcast.queue';

// Sagas
import { BroadcastProcessingSaga } from '../../application/sagas';

// Command handlers
import {
  CreateBroadcastHandler,
  StartBroadcastHandler,
  CancelBroadcastHandler,
} from '../../application/commands/broadcast';

// Query handlers
import {
  GetBroadcastHandler,
  ListBroadcastsHandler,
  GetBroadcastStatsHandler,
} from '../../application/queries/broadcast';

@Module({
  imports: [CqrsModule],
  controllers: [BroadcastController],
  providers: [
    // Repositories
    BroadcastPrismaRepository,
    BroadcastResultPrismaRepository,

    // Services
    BroadcastService,
    BroadcastResultService,

    // Queue + Worker
    BroadcastQueue,
    BroadcastProcessorWorker,

    // Sagas
    BroadcastProcessingSaga,

    // Command handlers
    CreateBroadcastHandler,
    StartBroadcastHandler,
    CancelBroadcastHandler,

    // Query handlers
    GetBroadcastHandler,
    ListBroadcastsHandler,
    GetBroadcastStatsHandler,
  ],
  exports: [
    BroadcastService,
    BroadcastResultService,
    BroadcastPrismaRepository,
    BroadcastQueue,
  ],
})
export class BroadcastModule {}
