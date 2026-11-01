/**
 * PayoutResolver — GraphQL read endpoints for payouts
 * @module vendor-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { GetPayoutQuery } from '../../../application/queries/payout/get-payout.query.js';
import { ListPayoutsQuery } from '../../../application/queries/payout/list-payouts.query.js';
import { GetPayoutSummaryQuery } from '../../../application/queries/payout/get-payout-summary.query.js';

@Resolver('Payout')
@UseGuards(JwtAuthGuard)
export class PayoutResolver {
  private readonly logger = new Logger(PayoutResolver.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Query('payout')
  async getPayout(@Args('id') id: string): Promise<unknown> {
    this.logger.debug(`GraphQL: payout id=${id}`);
    return this.queryBus.execute(new GetPayoutQuery(id));
  }

  @Query('payoutsByVendor')
  async listByVendor(
    @Args('vendorId') vendorId: string,
    @Args('page') page?: number,
    @Args('limit') limit?: number,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: payouts for vendor=${vendorId}`);
    return this.queryBus.execute(
      new ListPayoutsQuery({
        page: page ?? 1,
        limit: limit ?? 20,
        filter: { vendorId },
      }),
    );
  }

  @Query('payoutSummary')
  async summary(@Args('vendorId') vendorId: string): Promise<unknown> {
    this.logger.debug(`GraphQL: payout summary vendor=${vendorId}`);
    return this.queryBus.execute(new GetPayoutSummaryQuery(vendorId));
  }
}
