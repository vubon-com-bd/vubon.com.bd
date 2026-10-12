/**
 * Dashboard GraphQL Resolver
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import { GetDashboardQuery } from '../../../application/queries/dashboard/get-dashboard.query.js';
import { ListDashboardsQuery } from '../../../application/queries/dashboard/list-dashboards.query.js';
import type { DashboardResponseData } from '../../../application/dtos/responses/dashboard-response.dto.js';

interface GraphQLUser {
  readonly userId: string;
}

@Resolver('Dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardResolver {
  private readonly logger = new Logger(DashboardResolver.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Query('dashboard')
  async getDashboard(
    @Args('id') id: string,
    @CurrentUser() user: GraphQLUser
  ): Promise<DashboardResponseData> {
    this.logger.debug(`GraphQL: get dashboard ${id}`);
    return this.queryBus.execute(new GetDashboardQuery(id, user.userId));
  }

  @Query('dashboards')
  async listDashboards(
    @CurrentUser() user: GraphQLUser,
    @Args('onlyOwned') onlyOwned?: boolean
  ): Promise<readonly DashboardResponseData[]> {
    this.logger.debug(`GraphQL: list dashboards for ${user.userId}`);
    return this.queryBus.execute(
      new ListDashboardsQuery(user.userId, onlyOwned ?? false)
    );
  }
}
