import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateCollectionCommand } from './update-collection.command';
import type { ProductCollectionServiceInterface } from '../../services/interfaces/product-collection.service.interface';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto';

@CommandHandler(UpdateCollectionCommand)
export class UpdateCollectionHandler
  extends BaseCommandHandler<UpdateCollectionCommand, CollectionResponseDTO>
  implements ICommandHandler<UpdateCollectionCommand>
{
  readonly commandType = 'product.collection.update';

  constructor(
    private readonly collectionService: ProductCollectionServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateCollectionCommand): Promise<CollectionResponseDTO> {
    return this.collectionService.update(command.collectionId, command.name);
  }
}
