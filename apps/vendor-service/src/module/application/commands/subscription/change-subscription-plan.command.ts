import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ChangeSubscriptionPlanRequestDto } from '../../dtos/requests/change-subscription-plan.dto.js';

export class ChangeSubscriptionPlanCommand extends BaseCommand {
  readonly type = 'vendor.subscription.change_plan';
  constructor(
    public readonly dto: ChangeSubscriptionPlanRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
