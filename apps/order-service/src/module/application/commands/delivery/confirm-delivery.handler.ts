import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ConfirmDeliveryCommand } from './confirm-delivery.command';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@CommandHandler(ConfirmDeliveryCommand)
export class ConfirmDeliveryHandler
  extends BaseCommandHandler<ConfirmDeliveryCommand, DeliveryResponseDTO>
  implements ICommandHandler<ConfirmDeliveryCommand>
{
  readonly commandType = 'delivery.confirm';

  constructor(
    private readonly deliveryService: DeliveryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ConfirmDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.deliveryService.confirm(command.deliveryId);
  }
}
