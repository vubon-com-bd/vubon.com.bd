import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPreferencePublicQuery } from './get-preference-public.query.js';
import { PREFERENCE_SERVICE, type IPreferenceService } from '../../services/interfaces/preference.service.interface.js';
import type { PreferencePublicResponseDTO } from '../../dtos/responses/preference-response.dto.js';

@QueryHandler(GetPreferencePublicQuery)
export class GetPreferencePublicHandler
  implements IQueryHandler<GetPreferencePublicQuery, PreferencePublicResponseDTO>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(q: GetPreferencePublicQuery): Promise<PreferencePublicResponseDTO> {
    return this.service.getPublic({ userId: q.userId });
  }
}
