/**
 * ScheduleController — REST endpoints for scheduled notifications
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

import { CreateScheduleCommand } from '../../../application/commands/schedule/create-schedule.command.js';
import { UpdateScheduleCommand } from '../../../application/commands/schedule/update-schedule.command.js';
import { ActivateScheduleCommand } from '../../../application/commands/schedule/activate-schedule.command.js';
import { PauseScheduleCommand } from '../../../application/commands/schedule/pause-schedule.command.js';
import { ResumeScheduleCommand } from '../../../application/commands/schedule/resume-schedule.command.js';
import { CancelScheduleCommand } from '../../../application/commands/schedule/cancel-schedule.command.js';
import { TriggerScheduleCommand } from '../../../application/commands/schedule/trigger-schedule.command.js';

import { GetScheduleQuery } from '../../../application/queries/schedule/get-schedule.query.js';
import { ListSchedulesQuery } from '../../../application/queries/schedule/list-schedules.query.js';
import { GetDueSchedulesQuery } from '../../../application/queries/schedule/get-due-schedules.query.js';

import {
  CreateScheduleHttpDTO,
  UpdateScheduleHttpDTO,
  PauseScheduleHttpDTO,
  CancelScheduleHttpDTO,
  TriggerScheduleHttpDTO,
  ListSchedulesHttpQueryDTO,
  GetDueSchedulesHttpQueryDTO,
} from '../../dtos/requests/schedule/schedule.http-dto.js';
import { ScheduleControllerMapper } from '../../mappers/schedule.controller.mapper.js';

@ApiTags('schedules')
@ApiBearerAuth('bearer')
@Controller('schedules')
@UseGuards(JwtAuthGuard)
export class ScheduleController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a schedule' })
  async create(
    @Body() dto: CreateScheduleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateScheduleCommand(ScheduleControllerMapper.toCreateAppDto(dto), user.userId),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List schedules (paginated)' })
  async list(@Query() q: ListSchedulesHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new ListSchedulesQuery(ScheduleControllerMapper.toListAppDto(q)),
    );
  }

  @Get('due')
  @ApiOperation({ summary: 'List due schedules (internal)' })
  async getDue(@Query() q: GetDueSchedulesHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(new GetDueSchedulesQuery(q.at));
  }

  @Get(':scheduleId')
  @ApiOperation({ summary: 'Get schedule by id' })
  async getById(@Param('scheduleId') scheduleId: string): Promise<unknown> {
    return this.queryBus.execute(new GetScheduleQuery(scheduleId));
  }

  @Patch(':scheduleId')
  @ApiOperation({ summary: 'Update a schedule' })
  async update(
    @Param('scheduleId') scheduleId: string,
    @Body() dto: UpdateScheduleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateScheduleCommand(ScheduleControllerMapper.toUpdateAppDto(scheduleId, dto), user.userId),
    );
  }

  @Post(':scheduleId/activate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activate a schedule' })
  async activate(
    @Param('scheduleId') scheduleId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new ActivateScheduleCommand(scheduleId, user.userId));
  }

  @Post(':scheduleId/pause')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Pause a schedule' })
  async pause(
    @Param('scheduleId') scheduleId: string,
    @Body() dto: PauseScheduleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new PauseScheduleCommand(ScheduleControllerMapper.toPauseAppDto(scheduleId, dto), user.userId),
    );
  }

  @Post(':scheduleId/resume')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resume a paused schedule' })
  async resume(
    @Param('scheduleId') scheduleId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new ResumeScheduleCommand({ scheduleId }, user.userId));
  }

  @Post(':scheduleId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a schedule' })
  async cancel(
    @Param('scheduleId') scheduleId: string,
    @Body() dto: CancelScheduleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CancelScheduleCommand(ScheduleControllerMapper.toCancelAppDto(scheduleId, dto), user.userId),
    );
  }

  @Post(':scheduleId/trigger')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Manually trigger a schedule' })
  async trigger(
    @Param('scheduleId') scheduleId: string,
    @Body() dto: TriggerScheduleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new TriggerScheduleCommand(ScheduleControllerMapper.toTriggerAppDto(scheduleId, dto), user.userId),
    );
  }
}
