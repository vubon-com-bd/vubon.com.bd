import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { GetModelPerformanceQuery } from '../../../application/queries/model/get-model-performance.query';

@ApiTags('AI Model Metrics')
@Controller('v1/ai/models/metrics')
@UseGuards(RateLimitGuard)
export class ModelMetricsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':modelId')
  @ApiOperation({ summary: 'Get model performance metrics' })
  async get(@Param('modelId') modelId: string): Promise<unknown> {
    return this.queryBus.execute(new GetModelPerformanceQuery(modelId));
  }

  @Get()
  @ApiOperation({ summary: 'List models performance' })
  async list(@Query('limit') limit?: string): Promise<unknown> {
    const parsed = limit ? Number(limit) : 20;
    void parsed;
    return [];
  }
}
