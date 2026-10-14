/**
 * SettlementProcessorWorker — processes pending settlements
 * @module vendor-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';

import { BaseWorker } from './base.worker.js';
import { VENDOR_QUEUE_NAME, VENDOR_JOB_NAME } from '../queues/queue.constants.js';
import type { ProcessSettlementPayload } from '../queues/settlement.queue.js';

import {
  VENDOR_SETTLEMENT_REPOSITORY,
  type VendorSettlementRepository,
} from '../../domain/repositories/vendor-settlement.repository.interface.js';
import { SettlementIdVO } from '../../domain/value-objects/primitives/settlement-id.vo.js';

@Injectable()
export class SettlementProcessorWorker extends BaseWorker<ProcessSettlementPayload> {
  protected readonly queueName = VENDOR_QUEUE_NAME.SETTLEMENT_PROCESSING;
  protected readonly jobNames = [VENDOR_JOB_NAME.PROCESS_SETTLEMENT] as const;

  constructor(
    queueService: QueueService,
    @Inject(VENDOR_SETTLEMENT_REPOSITORY)
    private readonly settlementRepo: VendorSettlementRepository,
  ) {
    super(queueService, SettlementProcessorWorker.name);
  }

  protected async handle(payload: ProcessSettlementPayload): Promise<unknown> {
    this.logger.log(`Processing settlement ${payload.settlementId}`);

    const vo = SettlementIdVO.create(payload.settlementId);
    const entity = await this.settlementRepo.findByIdVO(vo);
    if (!entity) return { skipped: true };

    if (entity.isCompleted() || entity.isCancelled()) {
      return { skipped: true, reason: 'terminal-state' };
    }

    if (entity.isPending()) entity.startProcessing();
    entity.complete();
    await this.settlementRepo.save(entity);

    this.logger.log(`Settlement ${payload.settlementId} marked completed`);
    return { processed: true };
  }

  protected concurrency(): number {
    return 3;
  }
}
