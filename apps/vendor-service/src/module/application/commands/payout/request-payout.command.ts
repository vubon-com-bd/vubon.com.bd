import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestPayoutCommandDTO } from '../../dtos/requests/payout/index.js';

export class RequestPayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.request';
  constructor(
    public readonly dto: RequestPayoutCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
