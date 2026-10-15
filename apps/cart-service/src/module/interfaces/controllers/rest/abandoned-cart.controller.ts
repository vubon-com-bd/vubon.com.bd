/**
 * AbandonedCartController — REST endpoints
 * @module cart-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { ListAbandonedQuery } from '../../../application/queries/abandoned/list-abandoned.query.js';
import { GetAbandonedStatsQuery } from '../../../application/queries/abandoned/get-abandoned-stats.query.js';

@Controller('abandoned-carts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('bearer')
export class AbandonedCartController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
    void this.commandBus;
  }

  @Get()
  async list(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListAbandonedQuery({
        page: page ?? 1,
        limit: limit ?? 20,
        filter: { status },
      }),
    );
  }

  @Get('stats')
  async stats(): Promise<unknown> {
    return this.queryBus.execute(new GetAbandonedStatsQuery());
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<unknown> {
    return { id };
  }

  @Post(':id/remind')
  @HttpCode(HttpStatus.OK)
  async remind(@Param('id') id: string): Promise<unknown> {
    return { id, queued: true };
  }
}
