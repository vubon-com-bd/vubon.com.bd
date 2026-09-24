import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { GetTicketStatsQuery } from '../../../application/queries/analytics/get-ticket-stats.query';

@ApiTags('Ticket Stats')
@Controller('ticket-stats')
@UseGuards(JwtAuthGuard)
export class TicketStatsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @Permissions(PERMISSION.REPORT_VIEW)
  async stats(): Promise<unknown> {
    return this.queryBus.execute(new GetTicketStatsQuery());
  }
}
