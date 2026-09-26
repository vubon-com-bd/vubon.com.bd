import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSubscriptionCommand } from './create-subscription.command';
import type { SubscriptionRepository } from '../../../domain/repositories/subscription.repository.interface';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto';
import { SubscriptionOperationFailedError } from '../../errors/subscription.errors';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionHandler
  extends BaseCommandHandler<CreateSubscriptionCommand, SubscriptionResponseDTO>
  implements ICommandHandler<CreateSubscriptionCommand>
{
  readonly commandType = 'subscription.create';

  constructor(
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    void this.subscriptionRepo;
    void command;
    throw new SubscriptionOperationFailedError('not yet wired');
  }
}
