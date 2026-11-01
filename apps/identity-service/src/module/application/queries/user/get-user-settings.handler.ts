import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserSettingsQuery } from './get-user-settings.query.js';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto.js';
import type { UserSettingsServiceInterface } from '../../services/interfaces/user-settings.service.interface.js';
import { USER_SETTINGS_SERVICE } from '../../services/interfaces/user-settings.service.interface.js';

@QueryHandler(GetUserSettingsQuery)
export class GetUserSettingsHandler
  extends BaseQueryHandler<GetUserSettingsQuery, UserSettingsResponseDTO | null>
  implements IQueryHandler<GetUserSettingsQuery>
{
  readonly queryType = 'user.get-settings';
  constructor(@Inject(USER_SETTINGS_SERVICE) private readonly service: UserSettingsServiceInterface) { super(); }
  async execute(q: GetUserSettingsQuery): Promise<UserSettingsResponseDTO | null> { return this.service.findForUser(q.userId); }
}
