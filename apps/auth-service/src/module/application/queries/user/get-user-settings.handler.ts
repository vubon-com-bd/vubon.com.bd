import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserSettingsQuery } from './get-user-settings.query';
import type { UserSettingsRepository } from '../../../domain/repositories/user-settings.repository.interface';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(GetUserSettingsQuery)
export class GetUserSettingsHandler
  extends BaseQueryHandler<GetUserSettingsQuery, UserSettingsResponseDTO | null>
  implements IQueryHandler<GetUserSettingsQuery>
{
  readonly queryType = 'user.get-settings';

  constructor(@Inject('UserSettingsRepository') private readonly settingsRepo: UserSettingsRepository) {
    super();
  }

  async execute(query: GetUserSettingsQuery): Promise<UserSettingsResponseDTO | null> {
    const entity = await this.settingsRepo.findByUserId(UserIdVO.create(query.userId));
    if (!entity) return null;
    return {
      success: true,
      settings: {
        userId: entity.userId.value,
        locale: entity.language,
        language: entity.language,
        timezone: entity.timezone,
        currency: entity.currency,
        theme: entity.theme,
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h',
        itemsPerPage: 20,
        notifications: entity.emailNotifications,
        twoFactor: false,
        updatedAt: entity.updatedAt,
      },
    };
  }
}
