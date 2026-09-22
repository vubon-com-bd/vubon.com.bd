import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteCollectionCommand } from './delete-collection.command';
import type { ProductCollectionServiceInterface } from '../../services/interfaces/product-collection.service.interface';

@CommandHandler(DeleteCollectionCommand)
export class DeleteCollectionHandler
  extends BaseCommandHandler<DeleteCollectionCommand, void>
  implements ICommandHandler<DeleteCollectionCommand>
{
  readonly commandType = 'product.collection.delete';

  constructor(
    private readonly collectionService: ProductCollectionServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteCollectionCommand): Promise<void> {
    await this.collectionService.delete(command.collectionId);
  }
}
