/**
 * CommissionResolver — GraphQL read endpoints for commissions
 * @module vendor-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { GetCommissionQuery } from '../../../application/queries/commission/get-commission.query.js';
import { ListCommissionsQuery } from '../../../application/queries/commission/list-commissions.query.js';
import { GetCommissionSummaryQuery } from '../../../application/queries/commission/get-commission-summary.query.js';

@Resolver('Commission')
@UseGuards(JwtAuthGuard)
export class CommissionResolver {
  private readonly logger = new Logger(CommissionResolver.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Query('commission')
  async getCommission(@Args('id') id: string): Promise<unknown> {
    this.logger.debug(`GraphQL: commission id=${id}`);
    return this.queryBus.execute(new GetCommissionQuery(id));
  }

  @Query('commissionsByVendor')
  async listByVendor(@Args('vendorId') vendorId: string): Promise<unknown> {
    this.logger.debug(`GraphQL: commissions for vendor=${vendorId}`);
    return this.queryBus.execute(new ListCommissionsQuery(vendorId));
  }

  @Query('commissionSummary')
  async summary(@Args('vendorId') vendorId: string): Promise<unknown> {
    this.logger.debug(`GraphQL: commission summary vendor=${vendorId}`);
    return this.queryBus.execute(new GetCommissionSummaryQuery(vendorId));
  }
}
