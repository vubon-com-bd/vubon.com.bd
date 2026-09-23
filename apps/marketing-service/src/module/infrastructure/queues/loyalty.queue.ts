import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface LoyaltyJobPayload {
  readonly loyaltyId: string;
  readonly action: 'earn' | 'expire' | 'upgrade';
  readonly points?: number;
}

@Injectable()
export class LoyaltyQueue {
  readonly queueName = 'marketing-loyalty';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: LoyaltyJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, payload.action, payload);
  }
}
