import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUsersQuery } from './list-users.query';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { USER_REPO } from '../../tokens';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler
  extends BaseQueryHandler<ListUsersQuery, readonly UserResponseDTO[]>
  implements IQueryHandler<ListUsersQuery> {
  readonly queryType = 'ListUsersQuery';
  constructor(
    @Inject(USER_REPO) private readonly repo: UserRepository,
  ) { super(); }

  async execute(_query: ListUsersQuery): Promise<readonly UserResponseDTO[]> {
    const users = await this.repo.findAll();
    return users.map((user) => ({
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
    }));
  }
}
