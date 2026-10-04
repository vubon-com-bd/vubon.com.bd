import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelRefundRequestDTO } from '../../dtos/requests/refund/refund.dto.js';

export class CancelRefundCommand extends BaseCommand {
  readonly type = 'refund.cancel';
  constructor(
    public readonly dto: CancelRefundRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
