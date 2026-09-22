import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RequestReturnCommand } from './request-return.command';
import type { ReturnServiceInterface } from '../../services/interfaces/return.service.interface';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto';

@CommandHandler(RequestReturnCommand)
export class RequestReturnHandler
  extends BaseCommandHandler<RequestReturnCommand, ReturnResponseDTO>
  implements ICommandHandler<RequestReturnCommand>
{
  readonly commandType = 'order.return.request';

  constructor(
    private readonly returnService: ReturnServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RequestReturnCommand): Promise<ReturnResponseDTO> {
    return this.returnService.request(command.orderId, command.reason);
  }
}
