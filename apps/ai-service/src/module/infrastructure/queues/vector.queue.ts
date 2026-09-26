import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const VECTOR_QUEUE_NAME = 'ai-vector';

export interface VectorIndexJobPayload {
  readonly vectorId: string;
  readonly indexId: string;
  readonly provider: string;
}

export interface VectorRebuildJobPayload {
  readonly indexId: string;
  readonly force: boolean;
}

@Injectable()
export class VectorQueue {
  readonly name = VECTOR_QUEUE_NAME;

  constructor(private readonly queueService: QueueService) {}

  async enqueueIndex(payload: VectorIndexJobPayload): Promise<string> {
    return this.queueService.enqueue(this.name, 'index', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }

  async enqueueRebuild(payload: VectorRebuildJobPayload): Promise<string> {
    return this.queueService.enqueue(this.name, 'rebuild', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
