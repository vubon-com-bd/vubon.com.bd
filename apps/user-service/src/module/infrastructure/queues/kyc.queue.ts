import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface KycExpiryJobPayload {
  readonly olderThanMs: number;
}

@Injectable()
export class KycQueue {
  readonly queueName = QUEUE_NAME.CLEANUP;

  constructor(private readonly queueService: QueueService) {}

  async enqueueExpiryCheck(payload: KycExpiryJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'kyc-expiry',
      payload,
      { priority: QUEUE_PRIORITY.LOW },
    );
  }
}
