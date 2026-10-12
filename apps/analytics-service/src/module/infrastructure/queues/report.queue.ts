/**
 * Report Queue
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY, QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

const QUEUE = 'analytics-report';

export interface ReportJobPayload {
  readonly reportId: string;
  readonly action: 'generate' | 'send' | 'schedule';
}

@Injectable()
export class ReportQueue {
  constructor(private readonly queue: QueueService) {}

  async enqueue(payload: ReportJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE, `report-${payload.action}`, payload, {
      priority: payload.action === 'send' ? QUEUE_PRIORITY.HIGH : QUEUE_PRIORITY.NORMAL,
      jobId: `${payload.action}:${payload.reportId}:${Date.now()}`,
    });
  }

  get queueName(): string {
    return QUEUE;
  }

  static getName(): string {
    return QUEUE_NAME.REPORT_GENERATION;
  }
}
