import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PickupReturnCommand } from './pickup-return.command';
import type { ReturnShipmentServiceInterface } from '../../services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment-response.dto';

@CommandHandler(PickupReturnCommand)
export class PickupReturnHandler
  extends BaseCommandHandler<PickupReturnCommand, ReturnShipmentResponseDTO>
  implements ICommandHandler<PickupReturnCommand>
{
  readonly commandType = 'logistics.return-shipment.pickup';

  constructor(private readonly returnService: ReturnShipmentServiceInterface) {
    super();
  }

  async execute(command: PickupReturnCommand): Promise<ReturnShipmentResponseDTO> {
    return this.returnService.pickup({
      returnShipmentId: command.returnShipmentId,
      courierId: command.courierId,
    });
  }
}
