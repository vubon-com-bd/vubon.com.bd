import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CompleteReturnCommand } from './complete-return.command';
import type { ReturnShipmentServiceInterface } from '../../services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment-response.dto';

@CommandHandler(CompleteReturnCommand)
export class CompleteReturnHandler
  extends BaseCommandHandler<CompleteReturnCommand, ReturnShipmentResponseDTO>
  implements ICommandHandler<CompleteReturnCommand>
{
  readonly commandType = 'logistics.return-shipment.complete';

  constructor(private readonly returnService: ReturnShipmentServiceInterface) {
    super();
  }

  async execute(command: CompleteReturnCommand): Promise<ReturnShipmentResponseDTO> {
    return this.returnService.complete({
      returnShipmentId: command.returnShipmentId,
      receivedAt: command.receivedAt,
    });
  }
}
