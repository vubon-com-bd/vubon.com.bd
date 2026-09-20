import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthSettingsQuery } from './get-auth-settings.query';
import type { AuthSettingsServiceInterface } from '../../services/interfaces/auth-settings.service.interface';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto';

@QueryHandler(GetAuthSettingsQuery)
export class GetAuthSettingsHandler
  extends BaseQueryHandler<GetAuthSettingsQuery, AuthSettingsResponseDTO>
  implements IQueryHandler<GetAuthSettingsQuery>
{
  readonly queryType = 'auth.get-settings';

  constructor(@Inject('AuthSettingsService') private readonly settingsService: AuthSettingsServiceInterface) {
    super();
  }

  async execute(query: GetAuthSettingsQuery): Promise<AuthSettingsResponseDTO> {
    return this.settingsService.get(query.userId);
  }
}
