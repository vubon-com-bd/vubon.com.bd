import {
  Controller, Get, Post, Body, Param, Query,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import { ForecastSwagger } from '../../swagger/forecast.swagger';
import { GenerateForecastRequestDTO } from '../../dtos/requests/forecast.request.dto';
import { GenerateForecastCommand } from '../../../application/commands/forecast/generate-forecast.command';
import { GetForecastQuery } from '../../../application/queries/forecast/get-forecast.query';
import { ListForecastsQuery } from '../../../application/queries/forecast/list-forecasts.query';

type ForecastModel = 'moving_average' | 'linear_regression' | 'arima' | 'prophet';

@ApiTags('AI Forecast')
@Controller('v1/ai/forecasts')
@UseGuards(RateLimitGuard, FeatureFlagGuard)
@FeatureFlag('aiForecast')
export class ForecastController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @ForecastSwagger.Generate()
  @ApiResponse({ status: 200, description: 'Forecast generated' })
  async generate(@Body() dto: GenerateForecastRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new GenerateForecastCommand(
        {
          target: dto.target,
          historicalData: dto.historicalData.map((p) => ({
            timestamp: p.timestamp,
            value: p.value,
          })),
          horizonDays: dto.horizonDays,
          model: (dto.model ?? 'linear_regression') as ForecastModel,
          windowSize: dto.windowSize,
        },
        'system',
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List forecasts for target' })
  async list(
    @Query('target') target: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListForecastsQuery(target, limit ? Number(limit) : 10),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get forecast by ID' })
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetForecastQuery(id));
  }
}
