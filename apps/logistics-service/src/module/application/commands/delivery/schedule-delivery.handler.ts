import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ScheduleDeliveryCommand } from './schedule-delivery.command';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@CommandHandler(ScheduleDeliveryCommand)
export class ScheduleDeliveryHandler
  extends BaseCommandHandler<ScheduleDeliveryCommand, DeliveryResponseDTO>
  implements ICommandHandler<ScheduleDeliveryCommand>
{
  readonly commandType = 'logistics.delivery.schedule';

  constructor(private readonly deliveryService: DeliveryServiceInterface) {
    super();
  }

  async execute(command: ScheduleDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.deliveryService.schedule({
      shipmentId: command.shipmentId,
      scheduledAt: command.scheduledAt,
    } as never);
  }
}
