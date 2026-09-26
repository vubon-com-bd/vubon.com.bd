import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CompleteDeliveryCommand } from './complete-delivery.command';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@CommandHandler(CompleteDeliveryCommand)
export class CompleteDeliveryHandler
  extends BaseCommandHandler<CompleteDeliveryCommand, DeliveryResponseDTO>
  implements ICommandHandler<CompleteDeliveryCommand>
{
  readonly commandType = 'logistics.delivery.complete';

  constructor(private readonly deliveryService: DeliveryServiceInterface) {
    super();
  }

  async execute(command: CompleteDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.deliveryService.complete({
      deliveryId: command.deliveryId,
      signature: command.signature,
      photoUrl: command.photoUrl,
      otp: command.otp,
    });
  }
}
