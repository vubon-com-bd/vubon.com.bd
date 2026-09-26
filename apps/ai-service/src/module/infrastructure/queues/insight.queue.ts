import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const INSIGHT_QUEUE_NAME = 'ai-insight';

export interface InsightJobPayload {
  readonly target: string;
  readonly type: string;
}

@Injectable()
export class InsightQueue {
  readonly name = INSIGHT_QUEUE_NAME;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: InsightJobPayload): Promise<string> {
    return this.queueService.enqueue(this.name, 'generate', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
