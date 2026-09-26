import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserSettingsQuery } from './get-user-settings.query';
import type { UserSettingsRepository } from '../../../domain/repositories/user-settings.repository.interface';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto';
import { USER_SETTINGS_REPO } from '../../tokens';

@QueryHandler(GetUserSettingsQuery)
export class GetUserSettingsHandler
  extends BaseQueryHandler<GetUserSettingsQuery, UserSettingsResponseDTO | null>
  implements IQueryHandler<GetUserSettingsQuery> {
  readonly queryType = 'GetUserSettingsQuery';
  constructor(
    @Inject(USER_SETTINGS_REPO) private readonly repo: UserSettingsRepository,
  ) { super(); }

  async execute(
    query: GetUserSettingsQuery,
  ): Promise<UserSettingsResponseDTO | null> {
    const s = await this.repo.findByUserId(query.userId);
    if (!s) return null;
    return {
      userId: s.userId,
      twoFactorEnabled: s.twoFactorEnabled,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: false,
      language: 'bn',
      timezone: 'Asia/Dhaka',
      updatedAt: s.updatedAt,
    };
  }
}
