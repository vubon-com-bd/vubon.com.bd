/**
 * KYC Queue
 * @module identity-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { AUTH_QUEUE_NAME } from './queue.constants.js';

export interface KycExpiryEnqueuePayload {
  readonly withinDays: number;
}

@Injectable()
export class KycQueue {
  private readonly logger = new Logger(KycQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueExpiryCheck(payload: KycExpiryEnqueuePayload): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.AUTH,
        'kyc-expiry',
        payload as unknown as Record<string, unknown>,
        { priority: QUEUE_PRIORITY.BACKGROUND, jobId: `kyc-expiry:${Date.now()}` },
      );
    } catch (err) {
      this.logger.warn(`kyc expiry enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`);
      return '';
    }
  }
}
