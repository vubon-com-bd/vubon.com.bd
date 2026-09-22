import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelSubscriptionCommand } from './cancel-subscription.command';
import type { VendorSubscriptionRepository } from '../../../domain/repositories/vendor-subscription.repository.interface';
import { SubscriptionIdVO } from '../../../domain/value-objects/primitives/subscription-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(CancelSubscriptionCommand)
export class CancelSubscriptionHandler
  extends BaseCommandHandler<CancelSubscriptionCommand, void>
  implements ICommandHandler<CancelSubscriptionCommand>
{
  readonly commandType = 'vendor.subscription.cancel';

  constructor(
    private readonly subscriptionRepo: VendorSubscriptionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CancelSubscriptionCommand): Promise<void> {
    const subscription = await this.subscriptionRepo.findById(
      SubscriptionIdVO.create(command.subscriptionId),
    );
    if (!subscription) {
      throw new VendorNotFoundAppError(command.subscriptionId);
    }

    const cancelled = subscription.cancel();
    await this.subscriptionRepo.save(cancelled);
    void this.eventBus;
  }
}
