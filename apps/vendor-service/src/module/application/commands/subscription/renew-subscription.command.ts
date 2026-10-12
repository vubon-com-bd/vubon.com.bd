import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RenewSubscriptionRequestDto } from '../../dtos/requests/renew-subscription.dto.js';

export class RenewSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.renew';
  constructor(
    public readonly dto: RenewSubscriptionRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
