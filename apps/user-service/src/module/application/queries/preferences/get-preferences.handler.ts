import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPreferencesQuery } from './get-preferences.query';
import type { UserPreferencesServiceInterface } from '../../services/interfaces/user-preferences.service.interface';
import type { PreferencesResponseDTO } from '../../dtos/responses/preferences-response.dto';

@QueryHandler(GetPreferencesQuery)
export class GetPreferencesHandler
  extends BaseQueryHandler<GetPreferencesQuery, PreferencesResponseDTO | null>
  implements IQueryHandler<GetPreferencesQuery>
{
  readonly queryType = 'user.preferences.get';

  constructor(private readonly preferencesService: UserPreferencesServiceInterface) {
    super();
  }

  async execute(query: GetPreferencesQuery): Promise<PreferencesResponseDTO | null> {
    return this.preferencesService.findByUserId(query.userId);
  }
}
