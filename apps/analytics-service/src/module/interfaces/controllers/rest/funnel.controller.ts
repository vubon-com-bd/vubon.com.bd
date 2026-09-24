import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateFunnelCommand } from '../../../application/commands/funnel/create-funnel.command';
import { AnalyzeFunnelCommand } from '../../../application/commands/funnel/analyze-funnel.command';
import { GetFunnelQuery } from '../../../application/queries/funnel/get-funnel.query';
import { ListFunnelsQuery } from '../../../application/queries/funnel/list-funnels.query';
import {
  CreateFunnelRequestDTO,
  AnalyzeFunnelRequestDTO,
} from '../../dtos/requests';
import { AnalyticsAccessGuard } from '../../guards/analytics-access.guard';

@Controller('analytics/funnels')
@UseGuards(JwtAuthGuard, AnalyticsAccessGuard)
export class FunnelController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateFunnelRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateFunnelCommand(body.name, body.steps, user.userId),
    );
  }

  @Get()
  async list(@Query('limit') limit?: string): Promise<unknown> {
    return this.queryBus.execute(
      new ListFunnelsQuery(limit ? Number(limit) : 50),
    );
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetFunnelQuery(id));
  }

  @Post(':id/analyze')
  @HttpCode(HttpStatus.OK)
  async analyze(
    @Param('id') id: string,
    @Body() body: AnalyzeFunnelRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AnalyzeFunnelCommand(id, body.fromDate, body.toDate),
    );
  }
}
