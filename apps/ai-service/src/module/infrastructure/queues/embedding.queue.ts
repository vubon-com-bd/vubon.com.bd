import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const EMBEDDING_QUEUE_NAME = 'ai-embedding';

export interface EmbeddingJobPayload {
  readonly sourceId: string;
  readonly sourceType: string;
  readonly content: string;
  readonly provider: string;
  readonly model?: string;
}

@Injectable()
export class EmbeddingQueue {
  readonly name = EMBEDDING_QUEUE_NAME;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: EmbeddingJobPayload): Promise<string> {
    return this.queueService.enqueue(this.name, 'embed', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }

  async enqueueBatch(payloads: readonly EmbeddingJobPayload[]): Promise<readonly string[]> {
    return Promise.all(payloads.map((p) => this.enqueue(p)));
  }
}
