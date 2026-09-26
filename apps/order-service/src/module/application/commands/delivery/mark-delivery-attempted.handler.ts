import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { MarkDeliveryAttemptedCommand } from './mark-delivery-attempted.command';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';

@CommandHandler(MarkDeliveryAttemptedCommand)
export class MarkDeliveryAttemptedHandler
  extends BaseCommandHandler<MarkDeliveryAttemptedCommand, void>
  implements ICommandHandler<MarkDeliveryAttemptedCommand>
{
  readonly commandType = 'delivery.attempted';

  constructor(
    private readonly deliveryService: DeliveryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: MarkDeliveryAttemptedCommand): Promise<void> {
    void command;
    void this.deliveryService;
    throw new Error('mark-delivery-attempted not yet wired');
  }
}
