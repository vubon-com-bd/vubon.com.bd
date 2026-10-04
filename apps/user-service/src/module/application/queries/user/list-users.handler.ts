/**
 * ListUsersHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListUsersQuery } from './list-users.query.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { UserMapper } from '../../mappers/user.mapper.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';

export interface ListUsersResult {
  readonly items: readonly UserResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

@QueryHandler(ListUsersQuery)
export class ListUsersHandler
  implements IQueryHandler<ListUsersQuery, ListUsersResult>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(query: ListUsersQuery): Promise<ListUsersResult> {
    const result = await this.userRepo.findPaginated({
      page: query.page,
      limit: query.limit,
      status: query.statusFilter
        ? UserStatusVO.create(query.statusFilter)
        : undefined,
      type: query.userTypeFilter
        ? UserTypeVO.create(query.userTypeFilter)
        : undefined,
      search: query.search,
    });

    return {
      items: UserMapper.toResponseList(result.items),
      total: result.total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(result.total / query.limit) || 0,
    };
  }
}
