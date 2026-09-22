import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPublicProfileQuery } from './get-public-profile.query';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto';

@QueryHandler(GetPublicProfileQuery)
export class GetPublicProfileHandler
  extends BaseQueryHandler<GetPublicProfileQuery, ProfileResponseDTO | null>
  implements IQueryHandler<GetPublicProfileQuery>
{
  readonly queryType = 'user.profile.get-public';

  constructor(private readonly profileService: UserProfileServiceInterface) {
    super();
  }

  async execute(query: GetPublicProfileQuery): Promise<ProfileResponseDTO | null> {
    return this.profileService.findByUserId(query.userId);
  }
}
