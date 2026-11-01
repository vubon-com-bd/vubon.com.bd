/**
 * Auth GraphQL Resolver
 * @module identity-service/interfaces/controllers/graphql
 */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  Public,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { LoginCommand } from '../../../application/commands/auth/login.command.js';
import { RegisterCommand } from '../../../application/commands/auth/register.command.js';
import { GetAuthSessionQuery } from '../../../application/queries/auth/get-auth-session.query.js';

import { AuthGqlType } from './types/auth.type.js';
import { LoginGqlInput } from './inputs/login.input.js';

@Resolver(() => AuthGqlType)
export class AuthGqlResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Public()
  @Mutation(() => AuthGqlType)
  async login(@Args('input') input: LoginGqlInput): Promise<AuthGqlType> {
    const result = await this.commandBus.execute(
      new LoginCommand({
        identifier: input.identifier,
        password: input.password,
        rememberMe: input.rememberMe ?? false,
        deviceId: input.deviceId,
        mfaCode: input.mfaCode,
      } as never),
    );

    const r = result as unknown as { user: AuthGqlType };
    return r.user;
  }

  @Public()
  @Mutation(() => AuthGqlType)
  async register(@Args('input') input: LoginGqlInput): Promise<AuthGqlType> {
    const result = await this.commandBus.execute(
      new RegisterCommand({
        email: input.identifier,
        password: input.password,
        confirmPassword: input.password,
        acceptTerms: true,
      } as never),
    );

    const r = result as unknown as { user: AuthGqlType };
    return r.user;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => AuthGqlType, { nullable: true })
  async session(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<AuthGqlType | null> {
    if (!user.sessionId) return null;
    const result = await this.queryBus.execute(
      new GetAuthSessionQuery(user.sessionId),
    );
    return result as unknown as AuthGqlType;
  }
}
