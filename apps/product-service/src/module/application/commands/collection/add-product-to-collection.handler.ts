/**
 * AddProductToCollectionHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddProductToCollectionCommand } from './add-product-to-collection.command.js';
import { COLLECTION_SERVICE, type ICollectionService } from '../../services/interfaces/collection.service.interface.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@CommandHandler(AddProductToCollectionCommand)
export class AddProductToCollectionHandler implements ICommandHandler<AddProductToCollectionCommand, CollectionResponseDTO> {
  constructor(@Inject(COLLECTION_SERVICE) private readonly service: ICollectionService) {}
  async execute(c: AddProductToCollectionCommand): Promise<CollectionResponseDTO> {
    return this.service.addProduct(c.collectionId, c.productId, c.actorId);
  }
}
