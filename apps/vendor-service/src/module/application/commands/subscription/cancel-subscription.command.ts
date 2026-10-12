import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelSubscriptionRequestDto } from '../../dtos/requests/cancel-subscription.dto.js';

export class CancelSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.cancel';
  constructor(
    public readonly dto: CancelSubscriptionRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
