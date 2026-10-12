/**
 * User GraphQL Resolver
 * @module identity-service/interfaces/controllers/graphql
 */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { CreateUserCommand } from '../../../application/commands/user/create-user.command.js';
import { GetUserQuery } from '../../../application/queries/user/get-user.query.js';
import { ListUsersQuery } from '../../../application/queries/user/list-users.query.js';

import { UserGqlType } from './types/user.type.js';
import { CreateUserGqlInput } from './inputs/create-user.input.js';

@Resolver(() => UserGqlType)
@UseGuards(JwtAuthGuard)
export class UserGqlResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => UserGqlType, { nullable: true })
  async user(@Args('id') id: string): Promise<UserGqlType | null> {
    const result = await this.queryBus.execute(new GetUserQuery(id));
    return result as unknown as UserGqlType;
  }

  @Query(() => [UserGqlType])
  async users(
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
  ): Promise<readonly UserGqlType[]> {
    const result = (await this.queryBus.execute(
      new ListUsersQuery(page ?? 1, limit ?? 20),
    )) as unknown as { items: readonly UserGqlType[] };
    return result.items;
  }

  @Mutation(() => UserGqlType)
  async createUser(
    @Args('input') input: CreateUserGqlInput,
  ): Promise<UserGqlType> {
    const result = await this.commandBus.execute(
      new CreateUserCommand({
        email: input.email,
        password: input.password,
        phone: input.phone,
        username: input.username,
        firstName: input.firstName,
        lastName: input.lastName,
        type: input.type,
        role: input.role,
        acceptTerms: true,
      } as never),
    );
    return result as unknown as UserGqlType;
  }
}
