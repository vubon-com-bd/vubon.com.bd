import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestRefundRequestDTO } from '../../dtos/requests/refund/refund.dto.js';

export class RequestRefundCommand extends BaseCommand {
  readonly type = 'refund.request';
  constructor(
    public readonly dto: RequestRefundRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
