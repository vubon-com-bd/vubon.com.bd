/**
 * DocumentQueue — enqueue helpers for document expiry checks
 * @module vendor-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { VENDOR_QUEUE_NAME, VENDOR_JOB_NAME } from './queue.constants.js';

export interface CheckDocumentExpiryPayload {
  readonly vendorId?: string;
  readonly batchSize?: number;
}

@Injectable()
export class DocumentQueue {
  private readonly logger = new Logger(DocumentQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueExpiryCheck(payload: CheckDocumentExpiryPayload): Promise<string> {
    const id = await this.queueService.enqueue(
      VENDOR_QUEUE_NAME.DOCUMENT_EXPIRY,
      VENDOR_JOB_NAME.CHECK_DOCUMENT_EXPIRY,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `doc-expiry:${Date.now()}`,
      },
    );
    this.logger.debug(`Enqueued document expiry check`);
    return id;
  }
}
