import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetTrafficAnalyticsQuery } from '../../../application/queries/analytics/get-traffic-analytics.query';
import { AnalyticsAccessGuard } from '../../guards/analytics-access.guard';

interface ClassifyBody {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

@Controller('analytics/traffic')
@UseGuards(JwtAuthGuard, AnalyticsAccessGuard)
export class TrafficController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async top(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetTrafficAnalyticsQuery(fromDate, toDate),
    );
  }

  @Post('classify')
  @HttpCode(HttpStatus.OK)
  async classify(@Body() body: ClassifyBody): Promise<unknown> {
    return {
      source: body.utmSource ?? null,
      medium: body.utmMedium ?? null,
      campaign: body.utmCampaign ?? null,
      referrer: body.referrer ?? 'direct',
    };
  }
}
