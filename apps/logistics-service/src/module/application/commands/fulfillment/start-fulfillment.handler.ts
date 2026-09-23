import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { StartFulfillmentCommand } from './start-fulfillment.command';
import type { FulfillmentServiceInterface } from '../../services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@CommandHandler(StartFulfillmentCommand)
export class StartFulfillmentHandler
  extends BaseCommandHandler<StartFulfillmentCommand, FulfillmentResponseDTO>
  implements ICommandHandler<StartFulfillmentCommand>
{
  readonly commandType = 'logistics.fulfillment.start';

  constructor(private readonly fulfillmentService: FulfillmentServiceInterface) {
    super();
  }

  async execute(command: StartFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.fulfillmentService.start({
      orderId: command.orderId,
      warehouseId: command.warehouseId,
      type: command.fulfillmentType,
      strategy: command.strategy,
    } as never);
  }
}
