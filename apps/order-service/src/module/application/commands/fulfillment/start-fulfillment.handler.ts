import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { StartFulfillmentCommand } from './start-fulfillment.command';
import type { FulfillmentServiceInterface } from '../../services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@CommandHandler(StartFulfillmentCommand)
export class StartFulfillmentHandler
  extends BaseCommandHandler<StartFulfillmentCommand, FulfillmentResponseDTO>
  implements ICommandHandler<StartFulfillmentCommand>
{
  readonly commandType = 'fulfillment.start';

  constructor(
    private readonly fulfillmentService: FulfillmentServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: StartFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.fulfillmentService.start(command.orderId, command.vendorId);
  }
}
