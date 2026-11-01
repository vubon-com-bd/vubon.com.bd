import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteCollectionCommand } from './delete-collection.command.js';
import {
  COLLECTION_SERVICE,
  type IProductCollectionService,
} from '../../services/interfaces/product-collection.service.interface.js';

@CommandHandler(DeleteCollectionCommand)
export class DeleteCollectionHandler
  implements ICommandHandler<
    DeleteCollectionCommand,
    { readonly success: true; readonly collectionId: string }
  >
{
  constructor(
    @Inject(COLLECTION_SERVICE)
    private readonly service: IProductCollectionService,
  ) {}

  async execute(c: DeleteCollectionCommand) {
    return this.service.delete(c.dto);
  }
}
