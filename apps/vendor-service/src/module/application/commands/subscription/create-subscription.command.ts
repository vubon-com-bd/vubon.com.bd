/**
 * CreateSubscriptionCommand
 * @module vendor-service/application/commands/subscription
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateSubscriptionRequestDto } from '../../dtos/requests/create-subscription.dto.js';

export class CreateSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.create';
  constructor(
    public readonly dto: CreateSubscriptionRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
