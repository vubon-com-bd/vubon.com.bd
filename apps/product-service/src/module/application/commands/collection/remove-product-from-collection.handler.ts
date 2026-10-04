/**
 * RemoveProductFromCollectionHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveProductFromCollectionCommand } from './remove-product-from-collection.command.js';
import { COLLECTION_SERVICE, type ICollectionService } from '../../services/interfaces/collection.service.interface.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@CommandHandler(RemoveProductFromCollectionCommand)
export class RemoveProductFromCollectionHandler implements ICommandHandler<RemoveProductFromCollectionCommand, CollectionResponseDTO> {
  constructor(@Inject(COLLECTION_SERVICE) private readonly service: ICollectionService) {}
  async execute(c: RemoveProductFromCollectionCommand): Promise<CollectionResponseDTO> {
    return this.service.removeProduct(c.collectionId, c.productId, c.actorId);
  }
}
