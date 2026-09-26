import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetUserQuery } from '../../../application/queries/user/get-user.query';
import { ListUsersQuery } from '../../../application/queries/user/list-users.query';

/**
 * GraphQL User Resolver (placeholder)
 *
 * @nestjs/graphql not installed — this is a structural stub.
 * When the package is added, decorate with:
 *   @Resolver(() => UserResponseDto)
 *   @Query(() => UserResponseDto)
 *   @Mutation(() => UserResponseDto)
 *   @Args()
 */
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  async user(id: string): Promise<unknown> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @UseGuards(JwtAuthGuard)
  async users(page = 1, limit = 20): Promise<unknown> {
    return this.queryBus.execute(new ListUsersQuery(page, limit));
  }

  async createUser(input: unknown): Promise<unknown> {
    void this.commandBus;
    void input;
    throw new Error('GraphQL createUser not yet wired');
  }
}
