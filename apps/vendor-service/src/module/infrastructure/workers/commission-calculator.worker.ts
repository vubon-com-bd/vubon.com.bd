/**
 * CommissionCalculatorWorker — async commission calculation
 * @module vendor-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';

import { BaseWorker } from './base.worker.js';
import { VENDOR_QUEUE_NAME, VENDOR_JOB_NAME } from '../queues/queue.constants.js';
import type { CalculateCommissionPayload } from '../queues/commission.queue.js';

import {
  VENDOR_COMMISSION_REPOSITORY,
  type VendorCommissionRepository,
} from '../../domain/repositories/vendor-commission.repository.interface.js';
import { VendorIdVO } from '../../domain/value-objects/primitives/vendor-id.vo.js';

@Injectable()
export class CommissionCalculatorWorker extends BaseWorker<CalculateCommissionPayload> {
  protected readonly queueName = VENDOR_QUEUE_NAME.COMMISSION_CALC;
  protected readonly jobNames = [VENDOR_JOB_NAME.CALCULATE_COMMISSION] as const;

  constructor(
    queueService: QueueService,
    @Inject(VENDOR_COMMISSION_REPOSITORY)
    private readonly commissionRepo: VendorCommissionRepository,
  ) {
    super(queueService, CommissionCalculatorWorker.name);
  }

  protected async handle(payload: CalculateCommissionPayload): Promise<unknown> {
    this.logger.debug(
      `Calculating commission for vendor ${payload.vendorId} order ${payload.orderId}`,
    );

    const commission = await this.commissionRepo.findActiveByVendor(
      VendorIdVO.create(payload.vendorId),
    );
    if (!commission) {
      this.logger.warn(`No active commission for vendor ${payload.vendorId}`);
      return { skipped: true };
    }

    const amount = commission.calculate(payload.orderAmount, payload.categoryId);
    this.logger.log(
      `Commission for order ${payload.orderId}: ${amount} (rate=${commission.rate.percent}%)`,
    );

    return { orderId: payload.orderId, commissionAmount: amount };
  }

  protected concurrency(): number {
    return 5;
  }
}
