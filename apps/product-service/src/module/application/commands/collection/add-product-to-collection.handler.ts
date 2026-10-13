import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddProductToCollectionCommand } from './add-product-to-collection.command.js';
import {
  COLLECTION_SERVICE,
  type IProductCollectionService,
} from '../../services/interfaces/product-collection.service.interface.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@CommandHandler(AddProductToCollectionCommand)
export class AddProductToCollectionHandler
  implements ICommandHandler<AddProductToCollectionCommand, CollectionResponseDTO>
{
  constructor(
    @Inject(COLLECTION_SERVICE)
    private readonly service: IProductCollectionService,
  ) {}

  async execute(c: AddProductToCollectionCommand): Promise<CollectionResponseDTO> {
    return c.mode === 'remove'
      ? this.service.removeProduct(c.dto)
      : this.service.addProduct(c.dto);
  }
}
