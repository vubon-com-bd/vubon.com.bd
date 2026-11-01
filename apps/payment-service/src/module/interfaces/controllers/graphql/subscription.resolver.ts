/**
 * SubscriptionResolver — GraphQL queries/mutations for subscription
 * @module payment-service/interfaces/controllers/graphql
 */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { GetSubscriptionQuery } from '@application/queries/subscription/get-subscription.query';
import { ListSubscriptionsQuery } from '@application/queries/subscription/list-subscriptions.query';
import { CancelSubscriptionCommand } from '@application/commands/subscription/cancel-subscription.command';

@Resolver('Subscription')
@UseGuards(JwtAuthGuard)
export class SubscriptionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query('subscription')
  async getSubscription(
    @Args('id') id: string,
    @CurrentUser() _user: CurrentUserShape,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetSubscriptionQuery(id));
  }

  @Query('subscriptions')
  async listSubscriptions(
    @CurrentUser() user: CurrentUserShape,
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListSubscriptionsQuery(
        page ?? 1,
        limit ?? 20,
        { userId: user.userId },
      ),
    );
  }

  @Mutation('cancelSubscription')
  async cancelSubscription(
    @Args('id') id: string,
    @Args('reason') reason: string,
    @Args('cancelAtPeriodEnd') cancelAtPeriodEnd: boolean,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CancelSubscriptionCommand(
        { subscriptionId: id, reason, cancelAtPeriodEnd },
        user.userId,
      ),
    );
  }
}
