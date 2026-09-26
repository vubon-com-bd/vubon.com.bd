import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CompleteDispatchCommand } from './complete-dispatch.command';
import type { DispatchServiceInterface } from '../../services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch-response.dto';

@CommandHandler(CompleteDispatchCommand)
export class CompleteDispatchHandler
  extends BaseCommandHandler<CompleteDispatchCommand, DispatchResponseDTO>
  implements ICommandHandler<CompleteDispatchCommand>
{
  readonly commandType = 'logistics.dispatch.complete';

  constructor(private readonly dispatchService: DispatchServiceInterface) {
    super();
  }

  async execute(command: CompleteDispatchCommand): Promise<DispatchResponseDTO> {
    return this.dispatchService.complete({
      dispatchId: command.dispatchId,
      arrivedAt: command.arrivedAt,
    });
  }
}
