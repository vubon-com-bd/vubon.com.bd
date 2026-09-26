import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateShipmentCommand } from './update-shipment.command';
import type { ShipmentServiceInterface } from '../../services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment-response.dto';

@CommandHandler(UpdateShipmentCommand)
export class UpdateShipmentHandler
  extends BaseCommandHandler<UpdateShipmentCommand, ShipmentResponseDTO>
  implements ICommandHandler<UpdateShipmentCommand>
{
  readonly commandType = 'logistics.shipment.update';

  constructor(private readonly shipmentService: ShipmentServiceInterface) {
    super();
  }

  async execute(command: UpdateShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.shipmentService.update(command.shipmentId, {
      status: command.shipmentStatus,
      priority: command.shipmentPriority,
      notes: command.notes,
    } as never);
  }
}
