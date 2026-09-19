import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserProfileQuery } from './get-user-profile.query';
import type { UserProfileRepository } from '../../../domain/repositories/user-profile.repository.interface';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(GetUserProfileQuery)
export class GetUserProfileHandler
  extends BaseQueryHandler<GetUserProfileQuery, UserProfileResponseDTO | null>
  implements IQueryHandler<GetUserProfileQuery>
{
  readonly queryType = 'user.get-profile';

  constructor(private readonly profileRepo: UserProfileRepository) {
    super();
  }

  async execute(query: GetUserProfileQuery): Promise<UserProfileResponseDTO | null> {
    const entity = await this.profileRepo.findByUserId(UserIdVO.create(query.userId));
    if (!entity) return null;
    return {
      success: true,
      profile: {
        userId: entity.userId.value,
        visibility: 'public',
        firstName: entity.firstName.value,
        lastName: entity.lastName.value,
        displayName: `${entity.firstName.value} ${entity.lastName.value}`.trim(),
        avatarUrl: entity.avatarUrl ?? undefined,
        bio: entity.bio ?? undefined,
        updatedAt: entity.updatedAt,
      },
    };
  }
}
