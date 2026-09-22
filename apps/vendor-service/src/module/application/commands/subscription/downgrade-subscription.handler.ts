import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DowngradeSubscriptionCommand } from './downgrade-subscription.command';
import type { VendorSubscriptionRepository } from '../../../domain/repositories/vendor-subscription.repository.interface';
import { SubscriptionIdVO } from '../../../domain/value-objects/primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '../../../domain/value-objects/primitives/subscription-plan.vo';
import { PayoutAmountVO } from '../../../domain/value-objects/primitives/payout-amount.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { SubscriptionResponseDto } from '../../dtos/responses/subscription-response.dto';

@CommandHandler(DowngradeSubscriptionCommand)
export class DowngradeSubscriptionHandler
  extends BaseCommandHandler<DowngradeSubscriptionCommand, SubscriptionResponseDto>
  implements ICommandHandler<DowngradeSubscriptionCommand>
{
  readonly commandType = 'vendor.subscription.downgrade';

  constructor(
    private readonly subscriptionRepo: VendorSubscriptionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DowngradeSubscriptionCommand): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionRepo.findById(
      SubscriptionIdVO.create(command.subscriptionId),
    );
    if (!subscription) {
      throw new VendorNotFoundAppError(command.subscriptionId);
    }

    const updated = subscription.changePlan(
      SubscriptionPlanVO.create(command.plan),
      PayoutAmountVO.create(0, 'BDT'),
    );
    await this.subscriptionRepo.save(updated);

    const events = updated.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: updated.id.value,
      vendorId: updated.vendorId.value,
      plan: updated.plan.value,
      price: updated.price.amount,
      currency: updated.price.currency,
      startedAt: updated.startedAt.toISOString(),
      expiresAt: updated.expiresAt.toISOString(),
      autoRenew: updated.autoRenew,
      cancelledAt: updated.cancelledAt?.toISOString() ?? null,
      isActive: updated.isActive,
    };
  }
}
