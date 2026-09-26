import {
  Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import { InsightSwagger } from '../../swagger/insight.swagger';
import { GenerateInsightCommand } from '../../../application/commands/insight/generate-insight.command';
import { DetectAnomalyCommand } from '../../../application/commands/insight/detect-anomaly.command';
import { GetInsightQuery } from '../../../application/queries/insight/get-insight.query';
import { ListInsightsQuery } from '../../../application/queries/insight/list-insights.query';

interface GenerateInsightRequestDTO {
  readonly target: string;
  readonly type: string;
  readonly priority?: string;
  readonly findings: readonly { label: string; value: number; unit?: string | null }[];
  readonly confidence: number;
}

interface DetectAnomalyRequestDTO {
  readonly target: string;
  readonly dataPoints: readonly { timestamp: string; value: number }[];
  readonly method?: string;
  readonly threshold?: number;
}

@ApiTags('AI Insights')
@Controller('v1/ai/insights')
@UseGuards(RateLimitGuard, FeatureFlagGuard)
@FeatureFlag('aiInsight')
export class InsightController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @InsightSwagger.Generate()
  async generate(@Body() dto: GenerateInsightRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new GenerateInsightCommand(
        {
          target: dto.target,
          type: dto.type,
          priority: dto.priority ?? 'medium',
          findings: dto.findings.map((f) => ({
            label: f.label,
            value: f.value,
            unit: f.unit ?? null,
          })),
          confidence: dto.confidence,
        },
        'system',
      ),
    );
  }

  @Post('detect-anomalies')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Detect anomalies in time series' })
  async detectAnomalies(@Body() dto: DetectAnomalyRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new DetectAnomalyCommand(
        {
          target: dto.target,
          dataPoints: [...dto.dataPoints],
          method: (dto.method ?? 'zscore') as 'zscore' | 'iqr',
          threshold: dto.threshold ?? 2,
        },
        'system',
      ),
    );
  }

  @Get()
  @InsightSwagger.List()
  async list(
    @Query('type') type?: string,
    @Query('priority') priority?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListInsightsQuery(type, priority));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get insight by ID' })
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetInsightQuery(id));
  }
}
