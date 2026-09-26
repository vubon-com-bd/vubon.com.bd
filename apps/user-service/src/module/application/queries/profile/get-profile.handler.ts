import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetProfileQuery } from './get-profile.query';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler
  extends BaseQueryHandler<GetProfileQuery, ProfileResponseDTO | null>
  implements IQueryHandler<GetProfileQuery>
{
  readonly queryType = 'user.profile.get';

  constructor(private readonly profileService: UserProfileServiceInterface) {
    super();
  }

  async execute(query: GetProfileQuery): Promise<ProfileResponseDTO | null> {
    return this.profileService.findByUserId(query.userId);
  }
}
