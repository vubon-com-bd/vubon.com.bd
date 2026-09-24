import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  Body,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { GetSessionQuery } from '../../../application/queries/session/get-session.query';
import { ListSessionsQuery } from '../../../application/queries/session/list-sessions.query';
import { AnalyticsAccessGuard } from '../../guards/analytics-access.guard';

interface AnalyzeSessionBody {
  fromDate: string;
  toDate: string;
  userId?: string;
}

@Controller('analytics/sessions')
@UseGuards(JwtAuthGuard, AnalyticsAccessGuard)
export class SessionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListSessionsQuery(fromDate, toDate, limit ? Number(limit) : 100),
    );
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetSessionQuery(id));
  }

  @Post('analyze')
  @HttpCode(HttpStatus.OK)
  async analyze(@Body() body: AnalyzeSessionBody): Promise<unknown> {
    void this.commandBus;
    return this.queryBus.execute(
      new ListSessionsQuery(body.fromDate, body.toDate, 1000),
    );
  }
}
