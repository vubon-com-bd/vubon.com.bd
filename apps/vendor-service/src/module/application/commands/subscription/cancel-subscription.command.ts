import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelSubscriptionRequestDTO } from '../../dtos/requests/subscription/index.js';

export class CancelSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.cancel';
  constructor(
    public readonly dto: CancelSubscriptionRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
