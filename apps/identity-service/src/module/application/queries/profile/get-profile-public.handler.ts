import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetProfilePublicQuery } from './get-profile-public.query.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface.js';
import { USER_PROFILE_SERVICE } from '../../services/interfaces/user-profile.service.interface.js';

@QueryHandler(GetProfilePublicQuery)
export class GetProfilePublicHandler
  extends BaseQueryHandler<GetProfilePublicQuery, UserProfileResponseDTO | null>
  implements IQueryHandler<GetProfilePublicQuery>
{
  readonly queryType = 'user.get-profile-public';
  constructor(@Inject(USER_PROFILE_SERVICE) private readonly service: UserProfileServiceInterface) { super(); }
  async execute(q: GetProfilePublicQuery): Promise<UserProfileResponseDTO | null> {
    return this.service.findForUser(q.userId);
  }
}
