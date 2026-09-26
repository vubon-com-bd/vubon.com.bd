import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface GenerateReportJobPayload {
  readonly reportId: string;
  readonly fromMs: number;
  readonly toMs: number;
}

export interface SendReportJobPayload {
  readonly reportId: string;
  readonly recipients: readonly string[];
}

@Injectable()
export class ReportQueue {
  readonly queueName = 'analytics:report';

  constructor(private readonly queueService: QueueService) {}

  async enqueueGenerate(payload: GenerateReportJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'generate-report', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }

  async enqueueSend(payload: SendReportJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-report', payload, {
      priority: QUEUE_PRIORITY.LOW,
    });
  }
}
