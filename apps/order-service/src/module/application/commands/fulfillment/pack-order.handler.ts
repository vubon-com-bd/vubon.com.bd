import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PackOrderCommand } from './pack-order.command';
import type { FulfillmentServiceInterface } from '../../services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@CommandHandler(PackOrderCommand)
export class PackOrderHandler
  extends BaseCommandHandler<PackOrderCommand, FulfillmentResponseDTO>
  implements ICommandHandler<PackOrderCommand>
{
  readonly commandType = 'fulfillment.pack';

  constructor(
    private readonly fulfillmentService: FulfillmentServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: PackOrderCommand): Promise<FulfillmentResponseDTO> {
    return this.fulfillmentService.pack(command.fulfillmentId, command.packedBy);
  }
}
