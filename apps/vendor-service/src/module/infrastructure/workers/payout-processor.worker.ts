/**
 * PayoutProcessorWorker — processes pending payouts asynchronously
 * @module vendor-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';

import { BaseWorker } from './base.worker.js';
import { VENDOR_QUEUE_NAME, VENDOR_JOB_NAME } from '../queues/queue.constants.js';
import type { ProcessPayoutPayload } from '../queues/payout.queue.js';

import {
  VENDOR_PAYOUT_REPOSITORY,
  type VendorPayoutRepository,
} from '../../domain/repositories/vendor-payout.repository.interface.js';
import { PayoutIdVO } from '../../domain/value-objects/primitives/payout-id.vo.js';

@Injectable()
export class PayoutProcessorWorker extends BaseWorker<ProcessPayoutPayload> {
  protected readonly queueName = VENDOR_QUEUE_NAME.PAYOUT_PROCESSING;
  protected readonly jobNames = [
    VENDOR_JOB_NAME.PROCESS_PAYOUT,
    VENDOR_JOB_NAME.RETRY_PAYOUT,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(VENDOR_PAYOUT_REPOSITORY)
    private readonly payoutRepo: VendorPayoutRepository,
  ) {
    super(queueService, PayoutProcessorWorker.name);
  }

  protected async handle(payload: ProcessPayoutPayload): Promise<unknown> {
    this.logger.log(`Processing payout ${payload.payoutId} for vendor ${payload.vendorId}`);

    const vo = PayoutIdVO.create(payload.payoutId);
    const entity = await this.payoutRepo.findByIdVO(vo);
    if (!entity) {
      this.logger.warn(`Payout ${payload.payoutId} not found — skipping`);
      return { skipped: true };
    }

    if (entity.isPaid() || entity.isCancelled() || entity.isRejected()) {
      return { skipped: true, reason: 'terminal-state' };
    }

    // Simulated processing — real impl would call gateway + persist state
    const transactionId = `auto_${Date.now()}`;
    entity.startProcessing();
    entity.approve('system-auto');
    entity.markPaid(transactionId, 'system-auto');
    await this.payoutRepo.save(entity);

    this.logger.log(
      `Payout ${payload.payoutId} auto-processed → txn=${transactionId}`,
    );
    return { processed: true, transactionId };
  }

  protected concurrency(): number {
    return 2;
  }
}
