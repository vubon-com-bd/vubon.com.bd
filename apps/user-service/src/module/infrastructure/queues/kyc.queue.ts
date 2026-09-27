/**
 * KYC Queue
 */
import { Injectable } from '@nestjs/common';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface KycExpiryJobPayload {
  readonly kycId: string;
  readonly userId: string;
}

@Injectable()
export class KycQueue {
  static readonly name = 'kyc';

  constructor(private readonly queues: QueueService) {}

  async enqueueExpiryCheck(payload: KycExpiryJobPayload): Promise<void> {
    await this.queues.enqueue(
      KycQueue.name,
      'kyc.expiry.check',
      { kycId: payload.kycId, userId: payload.userId },
      {
        priority: QUEUE_PRIORITY.NORMAL,
      }
    );
  }
}
