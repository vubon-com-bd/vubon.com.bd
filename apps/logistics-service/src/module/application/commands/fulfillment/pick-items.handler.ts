import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PickItemsCommand } from './pick-items.command';
import type { FulfillmentServiceInterface } from '../../services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@CommandHandler(PickItemsCommand)
export class PickItemsHandler
  extends BaseCommandHandler<PickItemsCommand, FulfillmentResponseDTO>
  implements ICommandHandler<PickItemsCommand>
{
  readonly commandType = 'logistics.fulfillment.pick-items';

  constructor(private readonly fulfillmentService: FulfillmentServiceInterface) {
    super();
  }

  async execute(command: PickItemsCommand): Promise<FulfillmentResponseDTO> {
    return this.fulfillmentService.pick({
      fulfillmentId: command.fulfillmentId,
      items: [...command.items],
    });
  }
}
