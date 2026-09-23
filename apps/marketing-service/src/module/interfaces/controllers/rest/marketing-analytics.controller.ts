import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetMarketingOverviewQuery } from '../../../application/queries/analytics/get-marketing-overview.query';
import { MarketingOverviewResponseDto } from '../../dtos/responses/analytics.response.dto';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class MarketingAnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('overview')
  async overview(
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<MarketingOverviewResponseDto> {
    const result = await this.queryBus.execute(
      new GetMarketingOverviewQuery(fromDate, toDate),
    );
    return result as MarketingOverviewResponseDto;
  }
}
