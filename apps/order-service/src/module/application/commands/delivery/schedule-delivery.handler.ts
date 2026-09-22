import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ScheduleDeliveryCommand } from './schedule-delivery.command';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@CommandHandler(ScheduleDeliveryCommand)
export class ScheduleDeliveryHandler
  extends BaseCommandHandler<ScheduleDeliveryCommand, DeliveryResponseDTO>
  implements ICommandHandler<ScheduleDeliveryCommand>
{
  readonly commandType = 'delivery.schedule';

  constructor(
    private readonly deliveryService: DeliveryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ScheduleDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.deliveryService.schedule({
      orderId: command.orderId,
      deliveryType: command.deliveryType,
      methodId: command.methodId,
      scheduledAt: command.scheduledAt,
    });
  }
}
