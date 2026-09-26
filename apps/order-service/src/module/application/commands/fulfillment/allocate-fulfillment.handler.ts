import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AllocateFulfillmentCommand } from './allocate-fulfillment.command';
import type { FulfillmentServiceInterface } from '../../services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@CommandHandler(AllocateFulfillmentCommand)
export class AllocateFulfillmentHandler
  extends BaseCommandHandler<AllocateFulfillmentCommand, FulfillmentResponseDTO>
  implements ICommandHandler<AllocateFulfillmentCommand>
{
  readonly commandType = 'fulfillment.allocate';

  constructor(
    private readonly fulfillmentService: FulfillmentServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AllocateFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.fulfillmentService.start(command.orderId, command.vendorId);
  }
}
