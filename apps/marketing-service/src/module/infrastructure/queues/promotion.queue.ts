import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface PromotionJobPayload {
  readonly promotionId: string;
  readonly action: 'expire' | 'process';
}

@Injectable()
export class PromotionQueue {
  readonly queueName = 'marketing-promotion';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: PromotionJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, payload.action, payload);
  }
}
