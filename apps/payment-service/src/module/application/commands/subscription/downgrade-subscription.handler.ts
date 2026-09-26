import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DowngradeSubscriptionCommand } from './downgrade-subscription.command';
import type { SubscriptionRepository } from '../../../domain/repositories/subscription.repository.interface';
import { SubscriptionIdVO } from '../../../domain/value-objects/primitives/subscription-id.vo';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto';
import { SubscriptionOperationFailedError } from '../../errors/subscription.errors';

@CommandHandler(DowngradeSubscriptionCommand)
export class DowngradeSubscriptionHandler
  extends BaseCommandHandler<DowngradeSubscriptionCommand, SubscriptionResponseDTO>
  implements ICommandHandler<DowngradeSubscriptionCommand>
{
  readonly commandType = 'subscription.downgrade';

  constructor(
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DowngradeSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    const entity = await this.subscriptionRepo.findById(
      SubscriptionIdVO.create(command.subscriptionId),
    );
    if (!entity) {
      throw new SubscriptionOperationFailedError('subscription not found');
    }
    void this.eventBus;
    throw new SubscriptionOperationFailedError('not yet wired');
  }
}
