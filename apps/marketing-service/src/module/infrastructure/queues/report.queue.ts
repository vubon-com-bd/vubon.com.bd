import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface ReportJobPayload {
  readonly reportId: string;
  readonly action: 'generate' | 'schedule';
}

@Injectable()
export class ReportQueue {
  readonly queueName = 'marketing-report';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: ReportJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, payload.action, payload);
  }
}
