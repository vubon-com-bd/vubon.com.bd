/**
 * ApproveRefundCommand
 * @module payment-service/application/commands/refund
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveRefundRequestDTO } from '@application/dtos/requests/refund/index.js';

export class ApproveRefundCommand extends BaseCommand {
  readonly type = 'payment.refund.approve';
  constructor(
    public readonly dto: ApproveRefundRequestDTO,
    public readonly approvedBy: string,
  ) {
    super();
  }
}
