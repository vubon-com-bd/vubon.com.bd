import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserProfileQuery } from './get-user-profile.query.js';
import type { UserProfileRepository } from '../../../domain/repositories/user-profile.repository.interface.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';
import { USER_PROFILE_REPO } from '../../tokens.js';

@QueryHandler(GetUserProfileQuery)
export class GetUserProfileHandler
  extends BaseQueryHandler<GetUserProfileQuery, UserProfileResponseDTO | null>
  implements IQueryHandler<GetUserProfileQuery> {
  readonly queryType = 'GetUserProfileQuery';
  constructor(
    @Inject(USER_PROFILE_REPO) private readonly repo: UserProfileRepository,
  ) { super(); }

  async execute(
    query: GetUserProfileQuery,
  ): Promise<UserProfileResponseDTO | null> {
    const profile = await this.repo.findByUserId(query.userId);
    if (!profile) return null;
    return {
      userId: profile.userId,
      displayName: profile.displayName.value,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      locale: profile.locale,
      updatedAt: profile.updatedAt,
    };
  }
}
