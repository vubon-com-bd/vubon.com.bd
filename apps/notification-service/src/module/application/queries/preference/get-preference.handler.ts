import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPreferenceQuery } from './get-preference.query.js';
import {
  PREFERENCE_SERVICE,
  type IPreferenceService,
} from '@application/services/interfaces/preference.service.interface.js';
import type { PreferenceResponseDTO } from '@application/dtos/responses/preference-response.dto.js';

@QueryHandler(GetPreferenceQuery)
export class GetPreferenceHandler
  implements IQueryHandler<GetPreferenceQuery, PreferenceResponseDTO>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(q: GetPreferenceQuery): Promise<PreferenceResponseDTO> {
    return this.service.getByUser(q.userId);
  }
}
