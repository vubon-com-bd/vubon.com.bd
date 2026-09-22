import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelOrderCommand } from './cancel-order.command';
import type { CancelServiceInterface } from '../../services/interfaces/cancel.service.interface';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto';

@CommandHandler(CancelOrderCommand)
export class CancelOrderHandler
  extends BaseCommandHandler<CancelOrderCommand, CancelResponseDTO>
  implements ICommandHandler<CancelOrderCommand>
{
  readonly commandType = 'order.cancel';

  constructor(
    private readonly cancelService: CancelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CancelOrderCommand): Promise<CancelResponseDTO> {
    return this.cancelService.request(command.orderId, command.reason);
  }
}
