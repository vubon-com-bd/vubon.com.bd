import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUsersQuery } from './list-users.query.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';

export interface ListUsersResponse {
  readonly items: readonly UserResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

@QueryHandler(ListUsersQuery)
export class ListUsersHandler
  extends BaseQueryHandler<ListUsersQuery, ListUsersResponse>
  implements IQueryHandler<ListUsersQuery>
{
  readonly queryType = 'user.list';
  constructor(@Inject(USER_REPOSITORY) private readonly repo: UserRepository) { super(); }

  async execute(query: ListUsersQuery): Promise<ListUsersResponse> {
    const result = await this.repo.findPaginated({ page: query.page, limit: query.limit });
    return {
      items: result.items.map((u) => ({
        id: u.id, email: u.email.value,
        firstName: u.firstName?.value, lastName: u.lastName?.value,
        username: u.username, status: u.status.value, type: u.type.value,
        roles: u.roles.map((r) => r.value),
        emailVerified: u.emailVerified, phoneVerified: u.phoneVerified,
        isMfaEnabled: u.isMfaEnabled, createdAt: u.createdAt,
      } as never)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }
}
