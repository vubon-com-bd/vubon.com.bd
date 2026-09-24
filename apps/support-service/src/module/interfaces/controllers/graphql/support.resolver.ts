import { Resolver, Query } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetSupportSummaryQuery } from '../../../application/queries/analytics/get-support-summary.query';

@Resolver()
@UseGuards(JwtAuthGuard)
export class SupportResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => String)
  async supportSummary(): Promise<string> {
    const result = await this.queryBus.execute(new GetSupportSummaryQuery());
    return JSON.stringify(result);
  }
}
