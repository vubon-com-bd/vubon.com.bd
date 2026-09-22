import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserQuery } from './get-user.query';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { UserNotFoundAppError } from '../../errors/user.errors';

@QueryHandler(GetUserQuery)
export class GetUserHandler
  extends BaseQueryHandler<GetUserQuery, UserResponseDTO>
  implements IQueryHandler<GetUserQuery>
{
  readonly queryType = 'user.get';

  constructor(private readonly userService: UserServiceInterface) {
    super();
  }

  async execute(query: GetUserQuery): Promise<UserResponseDTO> {
    const user = await this.userService.findById(query.userId);
    if (!user) throw new UserNotFoundAppError(query.userId);
    return user;
  }
}
