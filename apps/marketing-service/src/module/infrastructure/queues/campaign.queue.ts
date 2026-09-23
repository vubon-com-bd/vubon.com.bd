import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export interface CampaignJobPayload {
  readonly campaignId: string;
  readonly action: 'process' | 'optimize' | 'complete';
}

@Injectable()
export class CampaignQueue {
  readonly queueName = 'marketing-campaign';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: CampaignJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, payload.action, payload);
  }

  // Fallback ref to QUEUE_NAME for consistency
  get staticName(): string {
    void QUEUE_NAME;
    return 'marketing-campaign';
  }
}
