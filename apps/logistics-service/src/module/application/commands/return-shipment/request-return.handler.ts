import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RequestReturnCommand } from './request-return.command';
import type { ReturnShipmentServiceInterface } from '../../services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment-response.dto';

@CommandHandler(RequestReturnCommand)
export class RequestReturnHandler
  extends BaseCommandHandler<RequestReturnCommand, ReturnShipmentResponseDTO>
  implements ICommandHandler<RequestReturnCommand>
{
  readonly commandType = 'logistics.return-shipment.request';

  constructor(private readonly returnService: ReturnShipmentServiceInterface) {
    super();
  }

  async execute(command: RequestReturnCommand): Promise<ReturnShipmentResponseDTO> {
    return this.returnService.request({
      shipmentId: command.shipmentId,
      reason: command.reason,
      reasonType: command.reasonType,
    } as never);
  }
}
