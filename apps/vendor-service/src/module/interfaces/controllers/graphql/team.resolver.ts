/**
 * TeamResolver — GraphQL read endpoints for team
 * @module vendor-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { GetTeamMemberQuery } from '../../../application/queries/team/get-team-member.query.js';
import { ListTeamMembersQuery } from '../../../application/queries/team/list-team-members.query.js';

@Resolver('TeamMember')
@UseGuards(JwtAuthGuard)
export class TeamResolver {
  private readonly logger = new Logger(TeamResolver.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Query('teamMember')
  async getMember(@Args('memberId') memberId: string): Promise<unknown> {
    this.logger.debug(`GraphQL: team member id=${memberId}`);
    return this.queryBus.execute(new GetTeamMemberQuery(memberId));
  }

  @Query('teamMembers')
  async listByVendor(
    @Args('vendorId') vendorId: string,
    @Args('page') page?: number,
    @Args('limit') limit?: number,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: team members for vendor=${vendorId}`);
    return this.queryBus.execute(
      new ListTeamMembersQuery(vendorId, {
        page: page ?? 1,
        limit: limit ?? 20,
      }),
    );
  }
}
