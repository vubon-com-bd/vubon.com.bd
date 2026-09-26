import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { ListAbandonedQuery } from '../../../application/queries/abandoned/list-abandoned.query';
import { GetAbandonedStatsQuery } from '../../../application/queries/abandoned/get-abandoned-stats.query';

@Controller('v1/admin/abandoned-carts')
@UseGuards(JwtAuthGuard)
export class AbandonedCartController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const p = page ? Number(page) : 1;
    const l = limit ? Number(limit) : 20;
    return this.queryBus.execute(new ListAbandonedQuery(p, l));
  }

  @Get('stats')
  async stats(): Promise<unknown> {
    return this.queryBus.execute(new GetAbandonedStatsQuery());
  }
}
