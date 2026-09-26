import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { GetProfileQuery } from '../../../application/queries/profile/get-profile.query';
import { GetPublicProfileQuery } from '../../../application/queries/profile/get-public-profile.query';

/**
 * GraphQL Profile Resolver (placeholder)
 *
 * @nestjs/graphql not installed — structural stub only.
 */
export class ProfileResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  async profile(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetProfileQuery(user.userId));
  }

  async publicProfile(id: string): Promise<unknown> {
    return this.queryBus.execute(new GetPublicProfileQuery(id));
  }
}
