import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { TRAINING_QUEUE_NAME } from '../queues/training.queue';
import { TrainingService } from '../../application/services/impl/training.service';

interface EvaluatePayload {
  readonly modelId: string;
  readonly testDatasetId: string;
}

@Injectable()
export class ModelEvaluationWorker implements OnModuleInit {
  private readonly logger = new Logger(ModelEvaluationWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly trainingService: TrainingService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<EvaluatePayload>(
      TRAINING_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Evaluating model: ${payload.modelId}`);
        const result = await this.trainingService.evaluate({
          modelId: payload.modelId,
          testDatasetId: payload.testDatasetId,
          metrics: ['accuracy'],
        });
        this.logger.log(`Evaluation done: ${JSON.stringify(result.metrics)}`);
      },
      1,
    );
  }
}
