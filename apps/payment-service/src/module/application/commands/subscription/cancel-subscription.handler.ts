import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelSubscriptionCommand } from './cancel-subscription.command';
import type { SubscriptionRepository } from '../../../domain/repositories/subscription.repository.interface';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto';
import { SubscriptionOperationFailedError } from '../../errors/subscription.errors';

@CommandHandler(CancelSubscriptionCommand)
export class CancelSubscriptionHandler
  extends BaseCommandHandler<CancelSubscriptionCommand, SubscriptionResponseDTO>
  implements ICommandHandler<CancelSubscriptionCommand>
{
  readonly commandType = 'subscription.cancel';

  constructor(
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CancelSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    void this.subscriptionRepo;
    void command;
    throw new SubscriptionOperationFailedError('not yet wired');
  }
}
