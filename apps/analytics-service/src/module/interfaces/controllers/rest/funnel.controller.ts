/**
 * Funnel Controller
 */
import {
  Body, Controller, Get, Param, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CreateFunnelCommand } from '../../../application/commands/funnel/create-funnel.command.js';
import { AnalyzeFunnelCommand } from '../../../application/commands/funnel/analyze-funnel.command.js';
import { GetFunnelQuery } from '../../../application/queries/funnel/get-funnel.query.js';
import { ListFunnelsQuery } from '../../../application/queries/funnel/list-funnels.query.js';
import {
  CreateFunnelRequestDto,
  AnalyzeFunnelRequestDto,
} from '../../dtos/requests/cohort-funnel.request.dto.js';
import {
  FunnelResponseDto,
  FunnelAnalysisResponseDto,
} from '../../dtos/responses/analytics.response.dto.js';

@ApiTags('Analytics — Funnels')
@Controller('analytics/funnels')
@UseGuards(JwtAuthGuard)
export class FunnelController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async create(@Body() body: CreateFunnelRequestDto): Promise<FunnelResponseDto> {
    return this.commandBus.execute(new CreateFunnelCommand(body));
  }

  @Post(':id/analyze')
  async analyze(
    @Param('id') id: string,
    @Body() body: AnalyzeFunnelRequestDto
  ): Promise<FunnelAnalysisResponseDto> {
    return this.commandBus.execute(new AnalyzeFunnelCommand(id, body));
  }

  @Get()
  async list(): Promise<FunnelResponseDto[]> {
    return this.queryBus.execute(new ListFunnelsQuery());
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<FunnelResponseDto> {
    return this.queryBus.execute(new GetFunnelQuery(id));
  }
}
