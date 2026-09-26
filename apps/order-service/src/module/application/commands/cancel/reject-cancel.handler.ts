import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RejectCancelCommand } from './reject-cancel.command';
import type { CancelServiceInterface } from '../../services/interfaces/cancel.service.interface';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto';

@CommandHandler(RejectCancelCommand)
export class RejectCancelHandler
  extends BaseCommandHandler<RejectCancelCommand, CancelResponseDTO>
  implements ICommandHandler<RejectCancelCommand>
{
  readonly commandType = 'order.cancel.reject';

  constructor(
    private readonly cancelService: CancelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RejectCancelCommand): Promise<CancelResponseDTO> {
    return this.cancelService.reject(command.cancelId, command.reason);
  }
}
