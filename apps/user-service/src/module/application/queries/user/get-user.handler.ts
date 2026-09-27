/**
 * GetUserHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from './get-user.query.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserMapper } from '../../mappers/user.mapper.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import { UserNotFoundApplicationError } from '../../errors/user.errors.js';

@QueryHandler(GetUserQuery)
export class GetUserHandler
  implements IQueryHandler<GetUserQuery, UserResponseDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(query: GetUserQuery): Promise<UserResponseDTO> {
    const user = await this.userRepo.findById(UserIdVO.create(query.userId).value);
    if (!user) throw new UserNotFoundApplicationError(query.userId);
    return UserMapper.toResponse(user);
  }
}
