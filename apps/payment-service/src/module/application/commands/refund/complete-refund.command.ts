import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteRefundRequestDTO } from '../../dtos/requests/refund/refund.dto.js';

export class CompleteRefundCommand extends BaseCommand {
  readonly type = 'refund.complete';
  constructor(
    public readonly dto: CompleteRefundRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
