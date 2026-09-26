import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EmbeddingController } from '../../interfaces/controllers/rest/embedding.controller';

import { EmbeddingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/embedding.prisma.repository';
import { EmbeddingBatchPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/embedding-batch.prisma.repository';
import { EmbeddingCacheRepository } from '../../infrastructure/persistence/cache/repositories/embedding.cache.repository';

import { EmbeddingService } from '../../application/services/impl/embedding.service';
import { EmbeddingBatchService } from '../../application/services/impl/embedding-batch.service';

import { EmbeddingQueue } from '../../infrastructure/queues/embedding.queue';
import { EmbeddingGeneratorWorker } from '../../infrastructure/workers/embedding-generator.worker';

import { EmbeddingCommandHandlers } from './commands';
import { EmbeddingSagas } from './sagas';

@Module({
  imports: [CqrsModule],
  controllers: [EmbeddingController],
  providers: [
    EmbeddingPrismaRepository,
    EmbeddingBatchPrismaRepository,
    EmbeddingCacheRepository,
    EmbeddingService,
    EmbeddingBatchService,
    EmbeddingQueue,
    EmbeddingGeneratorWorker,
    ...EmbeddingCommandHandlers,
    ...EmbeddingSagas,
  ],
  exports: [EmbeddingService, EmbeddingBatchService],
})
export class EmbeddingModule {}
