import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PickUpShipmentCommand } from './pick-up-shipment.command';
import type { ShipmentServiceInterface } from '../../services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment-response.dto';

@CommandHandler(PickUpShipmentCommand)
export class PickUpShipmentHandler
  extends BaseCommandHandler<PickUpShipmentCommand, ShipmentResponseDTO>
  implements ICommandHandler<PickUpShipmentCommand>
{
  readonly commandType = 'logistics.shipment.pick-up';

  constructor(private readonly shipmentService: ShipmentServiceInterface) {
    super();
  }

  async execute(command: PickUpShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.shipmentService.pickUp({
      shipmentId: command.shipmentId,
      courierId: command.courierId,
    });
  }
}
