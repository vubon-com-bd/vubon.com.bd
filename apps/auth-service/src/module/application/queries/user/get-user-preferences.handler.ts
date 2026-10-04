import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserPreferencesQuery } from './get-user-preferences.query.js';
import type { UserPreferencesRepository } from '../../../domain/repositories/user-preferences.repository.interface.js';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto.js';
import { USER_PREFERENCES_REPO } from '../../tokens.js';

@QueryHandler(GetUserPreferencesQuery)
export class GetUserPreferencesHandler
  extends BaseQueryHandler<GetUserPreferencesQuery, UserPreferencesResponseDTO | null>
  implements IQueryHandler<GetUserPreferencesQuery> {
  readonly queryType = 'GetUserPreferencesQuery';
  constructor(
    @Inject(USER_PREFERENCES_REPO) private readonly repo: UserPreferencesRepository,
  ) { super(); }

  async execute(
    query: GetUserPreferencesQuery,
  ): Promise<UserPreferencesResponseDTO | null> {
    const p = await this.repo.findByUserId(query.userId);
    if (!p) return null;
    return {
      userId: p.userId,
      theme: p.theme,
      currency: p.currency,
      dateFormat: 'DD/MM/YYYY',
      reduceMotion: false,
      updatedAt: p.updatedAt,
    };
  }
}
