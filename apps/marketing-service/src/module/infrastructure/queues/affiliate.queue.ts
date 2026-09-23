import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface AffiliateJobPayload {
  readonly affiliateId: string;
  readonly action: 'track' | 'payout';
}

@Injectable()
export class AffiliateQueue {
  readonly queueName = 'marketing-affiliate';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: AffiliateJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, payload.action, payload);
  }
}
