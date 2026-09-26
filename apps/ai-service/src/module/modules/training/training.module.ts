import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrainingController } from '../../interfaces/controllers/rest/training.controller';

import { TrainingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/training.prisma.repository';
import { TrainingConfigPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/training-config.prisma.repository';

import { TrainingService } from '../../application/services/impl/training.service';
import { TrainingConfigService } from '../../application/services/impl/training-config.service';
import { TrainingJobService } from '../../application/services/impl/training-job.service';

import { TrainingQueue } from '../../infrastructure/queues/training.queue';
import { ModelTrainingWorker } from '../../infrastructure/workers/model-training.worker';
import { ModelEvaluationWorker } from '../../infrastructure/workers/model-evaluation.worker';

import { TrainingCommandHandlers } from './commands';
import { TrainingQueryHandlers } from './queries';
import { TrainingSagas } from './sagas';

@Module({
  imports: [CqrsModule],
  controllers: [TrainingController],
  providers: [
    TrainingPrismaRepository,
    TrainingConfigPrismaRepository,
    TrainingService,
    TrainingConfigService,
    TrainingJobService,
    TrainingQueue,
    ModelTrainingWorker,
    ModelEvaluationWorker,
    ...TrainingCommandHandlers,
    ...TrainingQueryHandlers,
    ...TrainingSagas,
  ],
  exports: [TrainingService, TrainingConfigService, TrainingJobService],
})
export class TrainingModule {}
