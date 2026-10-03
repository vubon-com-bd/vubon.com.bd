import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListSavedQuery } from './list-saved.query.js';
import { SAVED_FOR_LATER_SERVICE, type ISavedForLaterService } from '../../services/interfaces/saved-for-later.service.interface.js';
import type { SavedListResponseDTO } from '../../dtos/responses/saved-for-later-response.dto.js';

@QueryHandler(ListSavedQuery)
export class ListSavedHandler implements IQueryHandler<ListSavedQuery, SavedListResponseDTO> {
  constructor(@Inject(SAVED_FOR_LATER_SERVICE) private readonly service: ISavedForLaterService) {}
  async execute(q: ListSavedQuery): Promise<SavedListResponseDTO> {
    return this.service.listByUser(q.userId, q.page, q.limit);
  }
}
