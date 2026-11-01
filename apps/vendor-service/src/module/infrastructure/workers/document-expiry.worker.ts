/**
 * DocumentExpiryWorker — checks and marks expired vendor documents
 * @module vendor-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';

import { BaseWorker } from './base.worker.js';
import { VENDOR_QUEUE_NAME, VENDOR_JOB_NAME } from '../queues/queue.constants.js';
import type { CheckDocumentExpiryPayload } from '../queues/document.queue.js';

import {
  VENDOR_DOCUMENT_REPOSITORY,
  type VendorDocumentRepository,
} from '../../domain/repositories/vendor-document.repository.interface.js';

@Injectable()
export class DocumentExpiryWorker extends BaseWorker<CheckDocumentExpiryPayload> {
  protected readonly queueName = VENDOR_QUEUE_NAME.DOCUMENT_EXPIRY;
  protected readonly jobNames = [VENDOR_JOB_NAME.CHECK_DOCUMENT_EXPIRY] as const;

  constructor(
    queueService: QueueService,
    @Inject(VENDOR_DOCUMENT_REPOSITORY)
    private readonly documentRepo: VendorDocumentRepository,
  ) {
    super(queueService, DocumentExpiryWorker.name);
  }

  protected async handle(payload: CheckDocumentExpiryPayload): Promise<unknown> {
    this.logger.log(
      `Running document expiry check (vendor=${payload.vendorId ?? 'all'})`,
    );

    const expiringSoon = await this.documentRepo.findExpiringSoon(30);
    const expired = await this.documentRepo.findExpired();

    let updated = 0;
    for (const doc of [...expiringSoon, ...expired]) {
      if (doc.isExpiredByDate() && !doc.isExpired()) {
        doc.markExpired();
        await this.documentRepo.save(doc);
        updated += 1;
      }
    }

    this.logger.log(
      `Document expiry check done — expiringSoon=${expiringSoon.length} expired=${expired.length} marked=${updated}`,
    );
    return { expiringSoon: expiringSoon.length, expired: expired.length, marked: updated };
  }

  protected concurrency(): number {
    return 1;
  }
}
