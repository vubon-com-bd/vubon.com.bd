/**
 * CreateCollectionHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateCollectionCommand } from './create-collection.command.js';
import { COLLECTION_SERVICE, type ICollectionService } from '../../services/interfaces/collection.service.interface.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@CommandHandler(CreateCollectionCommand)
export class CreateCollectionHandler implements ICommandHandler<CreateCollectionCommand, CollectionResponseDTO> {
  constructor(@Inject(COLLECTION_SERVICE) private readonly service: ICollectionService) {}
  async execute(c: CreateCollectionCommand): Promise<CollectionResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
