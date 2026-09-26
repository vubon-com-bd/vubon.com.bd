import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { TRAINING_QUEUE_NAME, type TrainingJobPayload } from '../queues/training.queue';
import { TrainingService } from '../../application/services/impl/training.service';

@Injectable()
export class ModelTrainingWorker implements OnModuleInit {
  private readonly logger = new Logger(ModelTrainingWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly trainingService: TrainingService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<TrainingJobPayload>(
      TRAINING_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Training started: ${payload.trainingId}`);
        try {
          await this.trainingService.start({
            modelId: payload.modelId,
            datasetId: payload.datasetId,
            epochs: payload.epochs,
            batchSize: payload.batchSize,
            learningRate: payload.learningRate,
            validationSplit: 0.2,
          });
          this.logger.log(`Training completed: ${payload.trainingId}`);
        } catch (error) {
          this.logger.error(`Training failed: ${payload.trainingId}`, error);
          throw error;
        }
      },
      2,
    );
  }
}
