import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { GetRankingQuery } from '../../../application/queries/ranking/get-ranking.query';

@ApiTags('AI Ranking')
@Controller('v1/ai/rankings')
@UseGuards(RateLimitGuard)
export class RankingController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get ranking by ID' })
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetRankingQuery(id));
  }
}
