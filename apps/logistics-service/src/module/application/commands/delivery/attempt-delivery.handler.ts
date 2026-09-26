import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AttemptDeliveryCommand } from './attempt-delivery.command';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@CommandHandler(AttemptDeliveryCommand)
export class AttemptDeliveryHandler
  extends BaseCommandHandler<AttemptDeliveryCommand, DeliveryResponseDTO>
  implements ICommandHandler<AttemptDeliveryCommand>
{
  readonly commandType = 'logistics.delivery.attempt';

  constructor(private readonly deliveryService: DeliveryServiceInterface) {
    super();
  }

  async execute(command: AttemptDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.deliveryService.attempt({
      deliveryId: command.deliveryId,
      status: command.status,
      note: command.note,
    });
  }
}
