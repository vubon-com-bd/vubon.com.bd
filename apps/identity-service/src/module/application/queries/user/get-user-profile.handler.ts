import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserProfileQuery } from './get-user-profile.query.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface.js';
import { USER_PROFILE_SERVICE } from '../../services/interfaces/user-profile.service.interface.js';

@QueryHandler(GetUserProfileQuery)
export class GetUserProfileHandler
  extends BaseQueryHandler<GetUserProfileQuery, UserProfileResponseDTO | null>
  implements IQueryHandler<GetUserProfileQuery>
{
  readonly queryType = 'user.get-profile';
  constructor(@Inject(USER_PROFILE_SERVICE) private readonly service: UserProfileServiceInterface) { super(); }

  async execute(query: GetUserProfileQuery): Promise<UserProfileResponseDTO | null> {
    return this.service.findForUser(query.userId);
  }
}
