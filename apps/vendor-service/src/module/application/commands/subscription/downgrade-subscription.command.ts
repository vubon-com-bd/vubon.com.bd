import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DowngradeSubscriptionRequestDTO } from '../../dtos/requests/subscription/index.js';

export class DowngradeSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.downgrade';
  constructor(
    public readonly dto: DowngradeSubscriptionRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
