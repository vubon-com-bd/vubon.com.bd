import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface LeadJobPayload {
  readonly leadId: string;
  readonly action: 'score' | 'nurture' | 'recover-cart';
}

@Injectable()
export class LeadQueue {
  readonly queueName = 'marketing-lead';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: LeadJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, payload.action, payload);
  }
}
