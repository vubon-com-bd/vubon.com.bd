import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CompleteReturnCommand } from './complete-return.command';
import type { ReturnServiceInterface } from '../../services/interfaces/return.service.interface';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto';

@CommandHandler(CompleteReturnCommand)
export class CompleteReturnHandler
  extends BaseCommandHandler<CompleteReturnCommand, ReturnResponseDTO>
  implements ICommandHandler<CompleteReturnCommand>
{
  readonly commandType = 'order.return.complete';

  constructor(
    private readonly returnService: ReturnServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CompleteReturnCommand): Promise<ReturnResponseDTO> {
    return this.returnService.complete(command.returnId);
  }
}
