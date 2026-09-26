import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { UserNotFoundAppError } from '../../errors/user.errors';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  extends BaseQueryHandler<GetUserByEmailQuery, UserResponseDTO>
  implements IQueryHandler<GetUserByEmailQuery>
{
  readonly queryType = 'user.get-by-email';

  constructor(private readonly userService: UserServiceInterface) {
    super();
  }

  async execute(query: GetUserByEmailQuery): Promise<UserResponseDTO> {
    const user = await this.userService.findByEmail(query.email);
    if (!user) throw new UserNotFoundAppError(query.email);
    return user;
  }
}
