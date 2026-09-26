import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ShipOrderCommand } from './ship-order.command';
import type { FulfillmentServiceInterface } from '../../services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@CommandHandler(ShipOrderCommand)
export class ShipOrderHandler
  extends BaseCommandHandler<ShipOrderCommand, FulfillmentResponseDTO>
  implements ICommandHandler<ShipOrderCommand>
{
  readonly commandType = 'fulfillment.ship';

  constructor(
    private readonly fulfillmentService: FulfillmentServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ShipOrderCommand): Promise<FulfillmentResponseDTO> {
    return this.fulfillmentService.ship(command.fulfillmentId, command.trackingNumber);
  }
}
