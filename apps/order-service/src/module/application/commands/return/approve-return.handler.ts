import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApproveReturnCommand } from './approve-return.command';
import type { ReturnServiceInterface } from '../../services/interfaces/return.service.interface';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto';

@CommandHandler(ApproveReturnCommand)
export class ApproveReturnHandler
  extends BaseCommandHandler<ApproveReturnCommand, ReturnResponseDTO>
  implements ICommandHandler<ApproveReturnCommand>
{
  readonly commandType = 'order.return.approve';

  constructor(
    private readonly returnService: ReturnServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ApproveReturnCommand): Promise<ReturnResponseDTO> {
    return this.returnService.approve(command.returnId, command.approvedBy);
  }
}
