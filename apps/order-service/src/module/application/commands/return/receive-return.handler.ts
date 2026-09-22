import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReceiveReturnCommand } from './receive-return.command';
import type { ReturnServiceInterface } from '../../services/interfaces/return.service.interface';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto';

@CommandHandler(ReceiveReturnCommand)
export class ReceiveReturnHandler
  extends BaseCommandHandler<ReceiveReturnCommand, ReturnResponseDTO>
  implements ICommandHandler<ReceiveReturnCommand>
{
  readonly commandType = 'order.return.receive';

  constructor(
    private readonly returnService: ReturnServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ReceiveReturnCommand): Promise<ReturnResponseDTO> {
    return this.returnService.receive(command.returnId, command.receivedBy);
  }
}
