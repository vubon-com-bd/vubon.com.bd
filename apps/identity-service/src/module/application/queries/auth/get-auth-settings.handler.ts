import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthSettingsQuery } from './get-auth-settings.query.js';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto.js';
import type { AuthSettingsServiceInterface } from '../../services/interfaces/auth-settings.service.interface.js';
import { AUTH_SETTINGS_SERVICE } from '../../services/interfaces/auth-settings.service.interface.js';

@QueryHandler(GetAuthSettingsQuery)
export class GetAuthSettingsHandler
  extends BaseQueryHandler<GetAuthSettingsQuery, AuthSettingsResponseDTO>
  implements IQueryHandler<GetAuthSettingsQuery>
{
  readonly queryType = 'auth.get-settings';
  constructor(@Inject(AUTH_SETTINGS_SERVICE) private readonly service: AuthSettingsServiceInterface) { super(); }

  async execute(_query: GetAuthSettingsQuery): Promise<AuthSettingsResponseDTO> {
    return this.service.get();
  }
}
