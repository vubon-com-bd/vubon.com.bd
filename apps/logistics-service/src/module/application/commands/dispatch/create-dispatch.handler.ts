import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateDispatchCommand } from './create-dispatch.command';
import type { DispatchServiceInterface } from '../../services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch-response.dto';

@CommandHandler(CreateDispatchCommand)
export class CreateDispatchHandler
  extends BaseCommandHandler<CreateDispatchCommand, DispatchResponseDTO>
  implements ICommandHandler<CreateDispatchCommand>
{
  readonly commandType = 'logistics.dispatch.create';

  constructor(private readonly dispatchService: DispatchServiceInterface) {
    super();
  }

  async execute(command: CreateDispatchCommand): Promise<DispatchResponseDTO> {
    return this.dispatchService.create({
      shipmentId: command.shipmentId,
      type: command.dispatchType,
    } as never);
  }
}
