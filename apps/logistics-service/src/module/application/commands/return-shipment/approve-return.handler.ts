import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApproveReturnCommand } from './approve-return.command';
import type { ReturnShipmentServiceInterface } from '../../services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment-response.dto';

@CommandHandler(ApproveReturnCommand)
export class ApproveReturnHandler
  extends BaseCommandHandler<ApproveReturnCommand, ReturnShipmentResponseDTO>
  implements ICommandHandler<ApproveReturnCommand>
{
  readonly commandType = 'logistics.return-shipment.approve';

  constructor(private readonly returnService: ReturnShipmentServiceInterface) {
    super();
  }

  async execute(command: ApproveReturnCommand): Promise<ReturnShipmentResponseDTO> {
    return this.returnService.approve({
      returnShipmentId: command.returnShipmentId,
      notes: command.notes,
    });
  }
}
