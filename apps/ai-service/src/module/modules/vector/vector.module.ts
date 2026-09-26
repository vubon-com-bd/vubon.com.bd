import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { VectorController } from '../../interfaces/controllers/rest/vector.controller';

import { VectorPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vector.prisma.repository';
import { VectorIndexPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vector-index.prisma.repository';

import { VectorService } from '../../application/services/impl/vector.service';
import { VectorIndexService } from '../../application/services/impl/vector-index.service';

import { VectorQueue } from '../../infrastructure/queues/vector.queue';
import { VectorIndexingWorker } from '../../infrastructure/workers/vector-indexing.worker';
import { VectorIndexRebuildWorker } from '../../infrastructure/workers/vector-index-rebuild.worker';

import { VectorCommandHandlers } from './commands';
import { VectorQueryHandlers } from './queries';
import { VectorSagas } from './sagas';

@Module({
  imports: [CqrsModule],
  controllers: [VectorController],
  providers: [
    VectorPrismaRepository,
    VectorIndexPrismaRepository,
    VectorService,
    VectorIndexService,
    VectorQueue,
    VectorIndexingWorker,
    VectorIndexRebuildWorker,
    ...VectorCommandHandlers,
    ...VectorQueryHandlers,
    ...VectorSagas,
  ],
  exports: [VectorService, VectorIndexService],
})
export class VectorModule {}
