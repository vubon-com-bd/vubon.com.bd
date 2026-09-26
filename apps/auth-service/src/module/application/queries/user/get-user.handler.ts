import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserQuery } from './get-user.query';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { UserNotFoundAppError } from '../../errors/user.errors';
import { USER_REPO } from '../../tokens';

@QueryHandler(GetUserQuery)
export class GetUserHandler
  extends BaseQueryHandler<GetUserQuery, UserResponseDTO>
  implements IQueryHandler<GetUserQuery> {
  readonly queryType = 'GetUserQuery';
  constructor(
    @Inject(USER_REPO) private readonly repo: UserRepository,
  ) { super(); }

  async execute(query: GetUserQuery): Promise<UserResponseDTO> {
    const user = await this.repo.findById(query.userId);
    if (!user) throw new UserNotFoundAppError(query.userId);
    return {
      id: user.id,
      email: user.email.value,
      phone: user.phone?.value,
      name: user.name.value,
      status: user.status.value as
        | 'active' | 'inactive' | 'suspended' | 'pending' | 'deleted',
      type: user.type.value,
      roles: user.roles.map((r) => r.value),
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      mfaEnabled: false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
