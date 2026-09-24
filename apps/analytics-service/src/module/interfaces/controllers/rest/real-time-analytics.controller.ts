import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetRealTimeAnalyticsQuery } from '../../../application/queries/analytics/get-real-time-analytics.query';
import { RealTimeGuard } from '../../guards/real-time.guard';

@Controller('analytics/real-time')
@UseGuards(JwtAuthGuard, RealTimeGuard)
export class RealTimeAnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(@Query('windowMinutes') windowMinutes?: string): Promise<unknown> {
    return this.queryBus.execute(
      new GetRealTimeAnalyticsQuery(
        windowMinutes ? Number(windowMinutes) : 5,
      ),
    );
  }
}
