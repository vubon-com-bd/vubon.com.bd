import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateShipmentCommand } from './create-shipment.command';
import type { ShipmentServiceInterface } from '../../services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment-response.dto';

@CommandHandler(CreateShipmentCommand)
export class CreateShipmentHandler
  extends BaseCommandHandler<CreateShipmentCommand, ShipmentResponseDTO>
  implements ICommandHandler<CreateShipmentCommand>
{
  readonly commandType = 'logistics.shipment.create';

  constructor(private readonly shipmentService: ShipmentServiceInterface) {
    super();
  }

  async execute(command: CreateShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.shipmentService.create({
      orderId: command.orderId,
      userId: command.userId,
      type: command.shipmentType,
      priority: command.shipmentPriority,
    } as never);
  }
}
