import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelShipmentCommand } from './cancel-shipment.command';
import type { ShipmentServiceInterface } from '../../services/interfaces/shipment.service.interface';

@CommandHandler(CancelShipmentCommand)
export class CancelShipmentHandler
  extends BaseCommandHandler<CancelShipmentCommand, void>
  implements ICommandHandler<CancelShipmentCommand>
{
  readonly commandType = 'logistics.shipment.cancel';

  constructor(private readonly shipmentService: ShipmentServiceInterface) {
    super();
  }

  async execute(command: CancelShipmentCommand): Promise<void> {
    await this.shipmentService.cancel({
      shipmentId: command.shipmentId,
      reason: command.reason,
    });
  }
}
