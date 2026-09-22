import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddProductToCollectionCommand } from './add-product-to-collection.command';
import type { ProductCollectionServiceInterface } from '../../services/interfaces/product-collection.service.interface';

@CommandHandler(AddProductToCollectionCommand)
export class AddProductToCollectionHandler
  extends BaseCommandHandler<AddProductToCollectionCommand, void>
  implements ICommandHandler<AddProductToCollectionCommand>
{
  readonly commandType = 'product.collection.add-product';

  constructor(
    private readonly collectionService: ProductCollectionServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddProductToCollectionCommand): Promise<void> {
    await this.collectionService.addProduct(
      command.collectionId,
      command.productId,
    );
  }
}
