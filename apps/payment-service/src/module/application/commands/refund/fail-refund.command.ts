import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailRefundRequestDTO } from '../../dtos/requests/refund/refund.dto.js';

export class FailRefundCommand extends BaseCommand {
  readonly type = 'refund.fail';
  constructor(
    public readonly dto: FailRefundRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
