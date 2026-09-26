import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RejectReturnCommand } from './reject-return.command';
import type { ReturnServiceInterface } from '../../services/interfaces/return.service.interface';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto';

@CommandHandler(RejectReturnCommand)
export class RejectReturnHandler
  extends BaseCommandHandler<RejectReturnCommand, ReturnResponseDTO>
  implements ICommandHandler<RejectReturnCommand>
{
  readonly commandType = 'order.return.reject';

  constructor(
    private readonly returnService: ReturnServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RejectReturnCommand): Promise<ReturnResponseDTO> {
    return this.returnService.reject(command.returnId, command.reason);
  }
}
