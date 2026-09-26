import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApproveCancelCommand } from './approve-cancel.command';
import type { CancelServiceInterface } from '../../services/interfaces/cancel.service.interface';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto';

@CommandHandler(ApproveCancelCommand)
export class ApproveCancelHandler
  extends BaseCommandHandler<ApproveCancelCommand, CancelResponseDTO>
  implements ICommandHandler<ApproveCancelCommand>
{
  readonly commandType = 'order.cancel.approve';

  constructor(
    private readonly cancelService: CancelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ApproveCancelCommand): Promise<CancelResponseDTO> {
    return this.cancelService.approve(command.cancelId, command.approvedBy);
  }
}
