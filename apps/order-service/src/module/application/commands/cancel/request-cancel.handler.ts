import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RequestCancelCommand } from './request-cancel.command';
import type { CancelServiceInterface } from '../../services/interfaces/cancel.service.interface';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto';

@CommandHandler(RequestCancelCommand)
export class RequestCancelHandler
  extends BaseCommandHandler<RequestCancelCommand, CancelResponseDTO>
  implements ICommandHandler<RequestCancelCommand>
{
  readonly commandType = 'order.cancel.request';

  constructor(
    private readonly cancelService: CancelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RequestCancelCommand): Promise<CancelResponseDTO> {
    return this.cancelService.request(command.orderId, command.reason);
  }
}
