import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPreferenceDefaultsQuery } from './get-preference-defaults.query.js';
import {
  PREFERENCE_SERVICE,
  type IPreferenceService,
} from '@application/services/interfaces/preference.service.interface.js';
import type { PreferenceDefaultsResponseDTO } from '@application/dtos/responses/preference-response.dto.js';

@QueryHandler(GetPreferenceDefaultsQuery)
export class GetPreferenceDefaultsHandler
  implements IQueryHandler<GetPreferenceDefaultsQuery, PreferenceDefaultsResponseDTO>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(_q: GetPreferenceDefaultsQuery): Promise<PreferenceDefaultsResponseDTO> {
    return this.service.getDefaults();
  }
}
