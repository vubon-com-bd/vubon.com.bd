/**
 * RequestRefundCommand
 * @module payment-service/application/commands/refund
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestRefundRequestDTO } from '@application/dtos/requests/refund/index.js';

export class RequestRefundCommand extends BaseCommand {
  readonly type = 'payment.refund.request';
  constructor(
    public readonly dto: RequestRefundRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
