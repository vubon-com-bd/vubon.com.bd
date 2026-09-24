import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { GetSupportSummaryQuery } from '../../../application/queries/analytics/get-support-summary.query';
import { GetAgentPerformanceQuery } from '../../../application/queries/analytics/get-agent-performance.query';
import { GetTicketStatsQuery } from '../../../application/queries/analytics/get-ticket-stats.query';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('summary')
  @Permissions(PERMISSION.REPORT_VIEW)
  async summary(@Query('from') from?: string, @Query('to') to?: string): Promise<unknown> {
    void from;
    void to;
    return this.queryBus.execute(new GetSupportSummaryQuery());
  }

  @Get('agents/:agentId')
  @Permissions(PERMISSION.REPORT_VIEW)
  async agentPerformance(@Param('agentId') agentId: string): Promise<unknown> {
    return this.queryBus.execute(new GetAgentPerformanceQuery(agentId));
  }

  @Get('tickets')
  @Permissions(PERMISSION.REPORT_VIEW)
  async ticketStats(): Promise<unknown> {
    return this.queryBus.execute(new GetTicketStatsQuery());
  }
}
