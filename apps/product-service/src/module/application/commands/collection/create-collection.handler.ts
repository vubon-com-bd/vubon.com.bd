import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateCollectionCommand } from './create-collection.command';
import type { ProductCollectionServiceInterface } from '../../services/interfaces/product-collection.service.interface';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto';

@CommandHandler(CreateCollectionCommand)
export class CreateCollectionHandler
  extends BaseCommandHandler<CreateCollectionCommand, CollectionResponseDTO>
  implements ICommandHandler<CreateCollectionCommand>
{
  readonly commandType = 'product.collection.create';

  constructor(
    private readonly collectionService: ProductCollectionServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateCollectionCommand): Promise<CollectionResponseDTO> {
    return this.collectionService.create({
      name: command.name,
      type: command.collectionType as never,
    });
  }
}
