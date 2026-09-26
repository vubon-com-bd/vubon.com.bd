import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeliverShipmentCommand } from './deliver-shipment.command';
import type { ShipmentServiceInterface } from '../../services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment-response.dto';

@CommandHandler(DeliverShipmentCommand)
export class DeliverShipmentHandler
  extends BaseCommandHandler<DeliverShipmentCommand, ShipmentResponseDTO>
  implements ICommandHandler<DeliverShipmentCommand>
{
  readonly commandType = 'logistics.shipment.deliver';

  constructor(private readonly shipmentService: ShipmentServiceInterface) {
    super();
  }

  async execute(command: DeliverShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.shipmentService.deliver({
      shipmentId: command.shipmentId,
      deliveredAt: command.deliveredAt,
    } as never);
  }
}
