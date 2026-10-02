import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Roles } from '@vubon/shared-kernel/interfaces/decorators';

import { ListAbandonedQuery } from '../../../application/queries/abandoned/list-abandoned.query.js';
import { GetAbandonedStatsQuery } from '../../../application/queries/abandoned/get-abandoned-stats.query.js';

@ApiTags('abandoned-carts')
@ApiBearerAuth('bearer')
@Controller('admin/abandoned-carts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AbandonedCartController extends BaseController {
  constructor(private readonly queryBus: QueryBus) { super(); }

  @Get()
  @ApiOperation({ summary: 'List abandoned carts (admin)' })
  async list(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.queryBus.execute(new ListAbandonedQuery(Number(page), Number(limit)));
  }

  @Get('stats')
  @ApiOperation({ summary: 'Abandoned cart statistics (admin)' })
  async stats(@Query('from') from?: string, @Query('to') to?: string) {
    return this.queryBus.execute(new GetAbandonedStatsQuery(from, to));
  }
}
