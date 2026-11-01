import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpgradeSubscriptionRequestDTO } from '../../dtos/requests/subscription/index.js';

export class UpgradeSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.upgrade';
  constructor(
    public readonly dto: UpgradeSubscriptionRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
