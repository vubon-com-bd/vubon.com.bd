import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { FailDeliveryCommand } from './fail-delivery.command';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@CommandHandler(FailDeliveryCommand)
export class FailDeliveryHandler
  extends BaseCommandHandler<FailDeliveryCommand, DeliveryResponseDTO>
  implements ICommandHandler<FailDeliveryCommand>
{
  readonly commandType = 'logistics.delivery.fail';

  constructor(private readonly deliveryService: DeliveryServiceInterface) {
    super();
  }

  async execute(command: FailDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.deliveryService.fail({
      deliveryId: command.deliveryId,
      reason: command.reason,
    });
  }
}
