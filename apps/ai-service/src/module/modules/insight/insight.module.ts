import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { InsightController } from '../../interfaces/controllers/rest/insight.controller';

import { InsightPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/insight.prisma.repository';
import { InsightResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/insight-result.prisma.repository';

import { InsightService } from '../../application/services/impl/insight.service';
import { InsightResultService } from '../../application/services/impl/insight-result.service';

import { InsightQueue } from '../../infrastructure/queues/insight.queue';
import { InsightGeneratorWorker } from '../../infrastructure/workers/insight-generator.worker';
import { DriftDetectorWorker } from '../../infrastructure/workers/drift-detector.worker';

import { InsightCommandHandlers } from './commands';
import { InsightQueryHandlers } from './queries';
import { InsightSagas } from './sagas';

@Module({
  imports: [CqrsModule],
  controllers: [InsightController],
  providers: [
    InsightPrismaRepository,
    InsightResultPrismaRepository,
    InsightService,
    InsightResultService,
    InsightQueue,
    InsightGeneratorWorker,
    DriftDetectorWorker,
    ...InsightCommandHandlers,
    ...InsightQueryHandlers,
    ...InsightSagas,
  ],
  exports: [InsightService, InsightResultService],
})
export class InsightModule {}
