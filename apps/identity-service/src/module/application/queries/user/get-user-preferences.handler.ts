import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserPreferencesQuery } from './get-user-preferences.query.js';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto.js';
import type { UserPreferencesServiceInterface } from '../../services/interfaces/user-preferences.service.interface.js';
import { USER_PREFERENCES_SERVICE } from '../../services/interfaces/user-preferences.service.interface.js';

@QueryHandler(GetUserPreferencesQuery)
export class GetUserPreferencesHandler
  extends BaseQueryHandler<GetUserPreferencesQuery, UserPreferencesResponseDTO | null>
  implements IQueryHandler<GetUserPreferencesQuery>
{
  readonly queryType = 'user.get-preferences';
  constructor(@Inject(USER_PREFERENCES_SERVICE) private readonly service: UserPreferencesServiceInterface) { super(); }
  async execute(q: GetUserPreferencesQuery): Promise<UserPreferencesResponseDTO | null> { return this.service.findForUser(q.userId); }
}
