/**
 * Funnel Queue
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

const QUEUE = 'analytics-funnel';

export interface FunnelBuildJobPayload {
  readonly funnelId: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

@Injectable()
export class FunnelQueue {
  constructor(private readonly queue: QueueService) {}

  async enqueueBuild(payload: FunnelBuildJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE, 'build-funnel', payload, {
      priority: QUEUE_PRIORITY.LOW,
      jobId: `funnel:${payload.funnelId}`,
    });
  }

  get queueName(): string {
    return QUEUE;
  }
}
