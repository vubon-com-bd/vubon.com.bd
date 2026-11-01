/**
 * RejectRefundCommand
 * @module payment-service/application/commands/refund
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectRefundRequestDTO } from '@application/dtos/requests/refund/index.js';

export class RejectRefundCommand extends BaseCommand {
  readonly type = 'payment.refund.reject';
  constructor(
    public readonly dto: RejectRefundRequestDTO,
    public readonly rejectedBy: string,
  ) {
    super();
  }
}
