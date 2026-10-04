/**
 * UpdateCollectionHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCollectionCommand } from './update-collection.command.js';
import { COLLECTION_SERVICE, type ICollectionService } from '../../services/interfaces/collection.service.interface.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@CommandHandler(UpdateCollectionCommand)
export class UpdateCollectionHandler implements ICommandHandler<UpdateCollectionCommand, CollectionResponseDTO> {
  constructor(@Inject(COLLECTION_SERVICE) private readonly service: ICollectionService) {}
  async execute(c: UpdateCollectionCommand): Promise<CollectionResponseDTO> {
    return this.service.update(c.dto);
  }
}
