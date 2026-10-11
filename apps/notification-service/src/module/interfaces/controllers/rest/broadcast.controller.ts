/**
 * BroadcastController — REST endpoints for broadcast notifications
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateBroadcastCommand } from '../../../application/commands/broadcast/create-broadcast.command.js';
import { UpdateBroadcastCommand } from '../../../application/commands/broadcast/update-broadcast.command.js';
import { ScheduleBroadcastCommand } from '../../../application/commands/broadcast/schedule-broadcast.command.js';
import { StartBroadcastCommand } from '../../../application/commands/broadcast/start-broadcast.command.js';
import { CancelBroadcastCommand } from '../../../application/commands/broadcast/cancel-broadcast.command.js';
import { TestBroadcastCommand } from '../../../application/commands/broadcast/test-broadcast.command.js';

import { GetBroadcastQuery } from '../../../application/queries/broadcast/get-broadcast.query.js';
import { GetBroadcastStatsQuery } from '../../../application/queries/broadcast/get-broadcast-stats.query.js';
import { GetBroadcastProgressQuery } from '../../../application/queries/broadcast/get-broadcast-progress.query.js';
import { ListBroadcastsQuery } from '../../../application/queries/broadcast/list-broadcasts.query.js';

import {
  CreateBroadcastHttpDTO,
  UpdateBroadcastHttpDTO,
  ScheduleBroadcastHttpDTO,
  StartBroadcastHttpDTO,
  CancelBroadcastHttpDTO,
  TestBroadcastHttpDTO,
  ListBroadcastsHttpQueryDTO,
} from '../../dtos/requests/broadcast/broadcast.http-dto.js';
import { BroadcastControllerMapper } from '../../mappers/broadcast.controller.mapper.js';

@ApiTags('broadcasts')
@ApiBearerAuth('bearer')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
export class BroadcastController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a broadcast' })
  async create(
    @Body() dto: CreateBroadcastHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateBroadcastCommand(BroadcastControllerMapper.toCreateAppDto(dto), user.userId),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List broadcasts (paginated)' })
  async list(@Query() q: ListBroadcastsHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new ListBroadcastsQuery(BroadcastControllerMapper.toListAppDto(q)),
    );
  }

  @Get(':broadcastId')
  @ApiOperation({ summary: 'Get broadcast by id' })
  async getById(@Param('broadcastId') broadcastId: string): Promise<unknown> {
    return this.queryBus.execute(new GetBroadcastQuery(broadcastId));
  }

  @Get(':broadcastId/stats')
  @ApiOperation({ summary: 'Get broadcast stats' })
  async getStats(@Param('broadcastId') broadcastId: string): Promise<unknown> {
    return this.queryBus.execute(new GetBroadcastStatsQuery(broadcastId));
  }

  @Get(':broadcastId/progress')
  @ApiOperation({ summary: 'Get broadcast progress' })
  async getProgress(@Param('broadcastId') broadcastId: string): Promise<unknown> {
    return this.queryBus.execute(new GetBroadcastProgressQuery(broadcastId));
  }

  @Patch(':broadcastId')
  @ApiOperation({ summary: 'Update a draft/scheduled broadcast' })
  async update(
    @Param('broadcastId') broadcastId: string,
    @Body() dto: UpdateBroadcastHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateBroadcastCommand(BroadcastControllerMapper.toUpdateAppDto(broadcastId, dto), user.userId),
    );
  }

  @Post(':broadcastId/schedule')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Schedule a broadcast' })
  async schedule(
    @Param('broadcastId') broadcastId: string,
    @Body() dto: ScheduleBroadcastHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ScheduleBroadcastCommand(BroadcastControllerMapper.toScheduleAppDto(broadcastId, dto), user.userId),
    );
  }

  @Post(':broadcastId/start')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Start a broadcast' })
  async start(
    @Param('broadcastId') broadcastId: string,
    @Body() dto: StartBroadcastHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new StartBroadcastCommand(BroadcastControllerMapper.toStartAppDto(broadcastId, dto), user.userId),
    );
  }

  @Post(':broadcastId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a broadcast' })
  async cancel(
    @Param('broadcastId') broadcastId: string,
    @Body() dto: CancelBroadcastHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CancelBroadcastCommand(BroadcastControllerMapper.toCancelAppDto(broadcastId, dto), user.userId),
    );
  }

  @Post(':broadcastId/test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a test broadcast to specified recipients' })
  async test(
    @Param('broadcastId') broadcastId: string,
    @Body() dto: TestBroadcastHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new TestBroadcastCommand(BroadcastControllerMapper.toTestAppDto(broadcastId, dto), user.userId),
    );
  }
}
