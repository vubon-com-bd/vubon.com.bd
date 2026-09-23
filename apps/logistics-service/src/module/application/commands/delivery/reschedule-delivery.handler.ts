import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RescheduleDeliveryCommand } from './reschedule-delivery.command';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@CommandHandler(RescheduleDeliveryCommand)
export class RescheduleDeliveryHandler
  extends BaseCommandHandler<RescheduleDeliveryCommand, DeliveryResponseDTO>
  implements ICommandHandler<RescheduleDeliveryCommand>
{
  readonly commandType = 'logistics.delivery.reschedule';

  constructor(private readonly deliveryService: DeliveryServiceInterface) {
    super();
  }

  async execute(command: RescheduleDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.deliveryService.reschedule({
      deliveryId: command.deliveryId,
      scheduledAt: command.scheduledAt,
    });
  }
}
