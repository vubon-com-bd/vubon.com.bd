/**
 * PartialRefundCommand
 * @module payment-service/application/commands/refund
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PartialRefundRequestDTO } from '@application/dtos/requests/refund/index.js';

export class PartialRefundCommand extends BaseCommand {
  readonly type = 'payment.refund.partial';
  constructor(
    public readonly dto: PartialRefundRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
