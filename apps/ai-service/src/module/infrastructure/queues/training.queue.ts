import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const TRAINING_QUEUE_NAME = 'ai-training';

export interface TrainingJobPayload {
  readonly trainingId: string;
  readonly modelId: string;
  readonly datasetId: string;
  readonly epochs: number;
  readonly batchSize: number;
  readonly learningRate: number;
}

@Injectable()
export class TrainingQueue {
  readonly name = TRAINING_QUEUE_NAME;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: TrainingJobPayload): Promise<string> {
    return this.queueService.enqueue(this.name, 'train', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }

  async enqueueDelayed(payload: TrainingJobPayload, delayMs: number): Promise<string> {
    return this.queueService.enqueue(this.name, 'train', payload, { delayMs });
  }
}
