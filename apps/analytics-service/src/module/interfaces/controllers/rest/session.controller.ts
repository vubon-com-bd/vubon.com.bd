/**
 * Session Controller
 */
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { GetSessionQuery } from '../../../application/queries/session/get-session.query.js';
import { ListSessionsQuery } from '../../../application/queries/session/list-sessions.query.js';
import { SessionResponseDto } from '../../dtos/responses/analytics.response.dto.js';

@ApiTags('Analytics — Sessions')
@Controller('analytics/sessions')
@UseGuards(JwtAuthGuard)
export class SessionController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(@Query('userId') userId: string): Promise<SessionResponseDto[]> {
    return this.queryBus.execute(new ListSessionsQuery(userId));
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<SessionResponseDto> {
    return this.queryBus.execute(new GetSessionQuery(id));
  }
}
