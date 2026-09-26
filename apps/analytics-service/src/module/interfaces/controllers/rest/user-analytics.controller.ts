import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetUserAnalyticsQuery } from '../../../application/queries/analytics/get-user-analytics.query';
import { AnalyticsAccessGuard } from '../../guards/analytics-access.guard';

@Controller('analytics/users')
@UseGuards(JwtAuthGuard, AnalyticsAccessGuard)
export class UserAnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':userId')
  async get(
    @Param('userId') userId: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetUserAnalyticsQuery(userId, fromDate, toDate),
    );
  }
}
