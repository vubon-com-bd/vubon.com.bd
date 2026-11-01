import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPreferencesQuery } from './get-preferences.query.js';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto.js';
import type { UserPreferencesServiceInterface } from '../../services/interfaces/user-preferences.service.interface.js';
import { USER_PREFERENCES_SERVICE } from '../../services/interfaces/user-preferences.service.interface.js';

@QueryHandler(GetPreferencesQuery)
export class GetPreferencesHandler
  extends BaseQueryHandler<GetPreferencesQuery, UserPreferencesResponseDTO | null>
  implements IQueryHandler<GetPreferencesQuery>
{
  readonly queryType = 'user.get-preferences';
  constructor(@Inject(USER_PREFERENCES_SERVICE) private readonly service: UserPreferencesServiceInterface) { super(); }
  async execute(q: GetPreferencesQuery): Promise<UserPreferencesResponseDTO | null> {
    return this.service.findForUser(q.userId);
  }
}
