/**
 * SearchUsersHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchUsersQuery } from './search-users.query.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserMapper } from '../../mappers/user.mapper.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';

export interface SearchUsersResult {
  readonly items: readonly UserResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly term: string;
}

@QueryHandler(SearchUsersQuery)
export class SearchUsersHandler
  implements IQueryHandler<SearchUsersQuery, SearchUsersResult>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(query: SearchUsersQuery): Promise<SearchUsersResult> {
    const trimmed = query.term.trim();
    if (trimmed.length < 2) {
      return {
        items: [],
        total: 0,
        page: query.page,
        limit: query.limit,
        totalPages: 0,
        term: trimmed,
      };
    }

    const result = await this.userRepo.findPaginated({
      page: query.page,
      limit: query.limit,
      search: trimmed,
    });

    return {
      items: UserMapper.toResponseList(result.items),
      total: result.total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(result.total / query.limit) || 0,
      term: trimmed,
    };
  }
}
