import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PackItemsCommand } from './pack-items.command';
import type { FulfillmentServiceInterface } from '../../services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@CommandHandler(PackItemsCommand)
export class PackItemsHandler
  extends BaseCommandHandler<PackItemsCommand, FulfillmentResponseDTO>
  implements ICommandHandler<PackItemsCommand>
{
  readonly commandType = 'logistics.fulfillment.pack-items';

  constructor(private readonly fulfillmentService: FulfillmentServiceInterface) {
    super();
  }

  async execute(command: PackItemsCommand): Promise<FulfillmentResponseDTO> {
    return this.fulfillmentService.pack({
      fulfillmentId: command.fulfillmentId,
      packagingId: command.packagingId,
      notes: command.notes,
    });
  }
}
