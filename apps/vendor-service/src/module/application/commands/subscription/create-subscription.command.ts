import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateSubscriptionRequestDTO } from '../../dtos/requests/subscription/index.js';

export class CreateSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.create';
  constructor(
    public readonly dto: CreateSubscriptionRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
