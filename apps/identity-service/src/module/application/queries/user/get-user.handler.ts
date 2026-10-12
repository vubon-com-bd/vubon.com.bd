import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserQuery } from './get-user.query.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface.js';
import { USER_SERVICE } from '../../services/interfaces/user.service.interface.js';
import { UserNotFoundError } from '../../../domain/errors/user.errors.js';

@QueryHandler(GetUserQuery)
export class GetUserHandler
  extends BaseQueryHandler<GetUserQuery, UserResponseDTO>
  implements IQueryHandler<GetUserQuery>
{
  readonly queryType = 'user.get';
  constructor(@Inject(USER_SERVICE) private readonly service: UserServiceInterface) { super(); }

  async execute(query: GetUserQuery): Promise<UserResponseDTO> {
    const user = await this.service.findById(query.userId);
    if (!user) throw new UserNotFoundError(query.userId);
    return user;
  }
}
