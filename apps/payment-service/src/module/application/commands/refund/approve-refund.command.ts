import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveRefundRequestDTO } from '../../dtos/requests/refund/refund.dto.js';

export class ApproveRefundCommand extends BaseCommand {
  readonly type = 'refund.approve';
  constructor(
    public readonly dto: ApproveRefundRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
