import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSettingsQuery } from './get-settings.query';
import type { UserSettingsServiceInterface } from '../../services/interfaces/user-settings.service.interface';
import type { SettingsResponseDTO } from '../../dtos/responses/settings-response.dto';

@QueryHandler(GetSettingsQuery)
export class GetSettingsHandler
  extends BaseQueryHandler<GetSettingsQuery, SettingsResponseDTO | null>
  implements IQueryHandler<GetSettingsQuery>
{
  readonly queryType = 'user.settings.get';

  constructor(private readonly settingsService: UserSettingsServiceInterface) {
    super();
  }

  async execute(query: GetSettingsQuery): Promise<SettingsResponseDTO | null> {
    return this.settingsService.findByUserId(query.userId);
  }
}
