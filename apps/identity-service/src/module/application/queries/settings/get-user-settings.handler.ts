import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserSettingsNewQuery } from './get-user-settings.query.js';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto.js';
import type { UserSettingsServiceInterface } from '../../services/interfaces/user-settings.service.interface.js';
import { USER_SETTINGS_SERVICE } from '../../services/interfaces/user-settings.service.interface.js';

@QueryHandler(GetUserSettingsNewQuery)
export class GetUserSettingsNewHandler
  extends BaseQueryHandler<GetUserSettingsNewQuery, UserSettingsResponseDTO | null>
  implements IQueryHandler<GetUserSettingsNewQuery>
{
  readonly queryType = 'user.get-settings-v2';
  constructor(@Inject(USER_SETTINGS_SERVICE) private readonly service: UserSettingsServiceInterface) { super(); }
  async execute(q: GetUserSettingsNewQuery): Promise<UserSettingsResponseDTO | null> {
    return this.service.findForUser(q.userId);
  }
}
