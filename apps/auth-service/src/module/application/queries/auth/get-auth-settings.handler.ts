import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthSettingsQuery } from './get-auth-settings.query';
import type { AuthSettingsServiceInterface } from '../../services/interfaces/auth-settings.service.interface';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto';
import { AUTH_SETTINGS_SERVICE } from '../../tokens';

@QueryHandler(GetAuthSettingsQuery)
export class GetAuthSettingsHandler
  extends BaseQueryHandler<GetAuthSettingsQuery, AuthSettingsResponseDTO>
  implements IQueryHandler<GetAuthSettingsQuery> {
  readonly queryType = 'GetAuthSettingsQuery';
  constructor(
    @Inject(AUTH_SETTINGS_SERVICE)
    private readonly settingsService: AuthSettingsServiceInterface,
  ) { super(); }

  async execute(query: GetAuthSettingsQuery): Promise<AuthSettingsResponseDTO> {
    return this.settingsService.getSettings(query.userId);
  }
}
