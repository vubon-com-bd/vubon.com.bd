/**
 * GetUserByEmailHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserByEmailQuery } from './get-user-by-email.query.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserMapper } from '../../mappers/user.mapper.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import { UserNotFoundApplicationError } from '../../errors/user.errors.js';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery, UserResponseDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<UserResponseDTO> {
    const user = await this.userRepo.findByEmail(UserEmailVO.create(query.email));
    if (!user) throw new UserNotFoundApplicationError(query.email);
    return UserMapper.toResponse(user);
  }
}
