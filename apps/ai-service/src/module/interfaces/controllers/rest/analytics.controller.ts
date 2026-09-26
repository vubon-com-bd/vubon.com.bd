import {
  Controller, Get, Param, Query, UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminOnlyGuard } from '../../guards/admin-only.guard';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { GetModelPerformanceAnalyticsQuery } from '../../../application/queries/analytics/get-model-performance-analytics.query';
import { GetAiUsageQuery } from '../../../application/queries/analytics/get-ai-usage.query';

@ApiTags('AI Analytics')
@Controller('v1/ai/analytics')
@UseGuards(RateLimitGuard)
export class AnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('models/:modelId/performance')
  @UseGuards(AdminOnlyGuard)
  @ApiOperation({ summary: 'Get model performance analytics' })
  @ApiResponse({ status: 200, description: 'Performance metrics' })
  async getModelPerformance(
    @Param('modelId') modelId: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetModelPerformanceAnalyticsQuery(modelId, fromDate, toDate),
    );
  }

  @Get('usage')
  @UseGuards(AdminOnlyGuard)
  @ApiOperation({ summary: 'Get AI usage summary' })
  async getUsage(
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
    @Query('groupBy') groupBy?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetAiUsageQuery(fromDate, toDate, groupBy ?? 'day'),
    );
  }
}
