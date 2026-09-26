import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DigestController } from '../../interfaces/controllers/rest/digest.controller';

// Services
import { DigestService } from '../../application/services/impl/digest.service';
import { DigestItemService } from '../../application/services/impl/digest-item.service';

// Repositories
import { DigestPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/digest.prisma.repository';
import { DigestItemPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/digest-item.prisma.repository';

// Workers + Queues
import { DigestProcessorWorker } from '../../infrastructure/workers/digest-processor.worker';
import { DigestQueue } from '../../infrastructure/queues/digest.queue';

// Sagas
import { DigestGenerationSaga } from '../../application/sagas';

// Command handlers
import {
  CreateDigestHandler,
  SendDigestHandler,
} from '../../application/commands/digest';

// Query handlers
import {
  GetDigestHandler,
  ListDigestsHandler,
} from '../../application/queries/digest';

@Module({
  imports: [CqrsModule],
  controllers: [DigestController],
  providers: [
    // Repositories
    DigestPrismaRepository,
    DigestItemPrismaRepository,

    // Services
    DigestService,
    DigestItemService,

    // Queue + Worker
    DigestQueue,
    DigestProcessorWorker,

    // Sagas
    DigestGenerationSaga,

    // Command handlers
    CreateDigestHandler,
    SendDigestHandler,

    // Query handlers
    GetDigestHandler,
    ListDigestsHandler,
  ],
  exports: [
    DigestService,
    DigestItemService,
    DigestPrismaRepository,
    DigestQueue,
  ],
})
export class DigestModule {}
