/**
 * Profile GraphQL Resolver
 * @module identity-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { GetUserProfileQuery } from '../../../application/queries/user/get-user-profile.query.js';

@Resolver('Profile')
@UseGuards(JwtAuthGuard)
export class ProfileGqlResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query('profile')
  async profile(
    @CurrentUser() user: CurrentUserShape,
    @Args('userId', { nullable: true }) userId?: string,
  ): Promise<unknown> {
    const targetId = userId ?? user.userId;
    return this.queryBus.execute(new GetUserProfileQuery(targetId));
  }
}
