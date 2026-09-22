import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CompleteCancelCommand } from './complete-cancel.command';
import type { CancelServiceInterface } from '../../services/interfaces/cancel.service.interface';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto';

@CommandHandler(CompleteCancelCommand)
export class CompleteCancelHandler
  extends BaseCommandHandler<CompleteCancelCommand, CancelResponseDTO>
  implements ICommandHandler<CompleteCancelCommand>
{
  readonly commandType = 'order.cancel.complete';

  constructor(
    private readonly cancelService: CancelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CompleteCancelCommand): Promise<CancelResponseDTO> {
    return this.cancelService.complete(command.cancelId);
  }
}
