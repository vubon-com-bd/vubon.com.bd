/**
 * ScheduleController
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { CreateScheduleCommand } from '@application/commands/schedule/create-schedule.command.js';
import { UpdateScheduleCommand } from '@application/commands/schedule/update-schedule.command.js';
import { CancelScheduleCommand } from '@application/commands/schedule/cancel-schedule.command.js';
import { GetScheduleQuery } from '@application/queries/schedule/get-schedule.query.js';
import { ListSchedulesQuery } from '@application/queries/schedule/list-schedules.query.js';

import type {
  ScheduleHttpResponseDTO,
  ScheduleListHttpResponseDTO,
} from '@interfaces/dtos/responses/schedule.response.dto.js';

import {
  ScheduleControllerMapper,
  type CreateScheduleHttpDTO,
  type UpdateScheduleHttpDTO,
  type ListSchedulesHttpQueryDTO,
} from '@interfaces/mappers/schedule.controller.mapper.js';
import {
  ApiScheduleTag,
  ApiCreateSchedule,
  ApiUpdateSchedule,
  ApiCancelSchedule,
  ApiGetSchedule,
  ApiListSchedules,
} from '@interfaces/swagger/schedule.swagger.js';

@ApiScheduleTag()
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
  @ApiCreateSchedule()
  async create(
    @Body() dto: CreateScheduleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ScheduleHttpResponseDTO> {
    const appDto = ScheduleControllerMapper.toCreateRequestDTO(dto);
    const result = await this.commandBus.execute(
      new CreateScheduleCommand(appDto as never, user.userId),
    );
    return ScheduleControllerMapper.toHttpResponse(result);
  }

  @Put(':id')
  @ApiUpdateSchedule()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateScheduleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ScheduleHttpResponseDTO> {
    const appDto = ScheduleControllerMapper.toUpdateRequestDTO(id, dto);
    const result = await this.commandBus.execute(
      new UpdateScheduleCommand(appDto as never, user.userId),
    );
    return ScheduleControllerMapper.toHttpResponse(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCancelSchedule()
  async cancel(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ScheduleHttpResponseDTO> {
    const appDto = ScheduleControllerMapper.toCancelRequestDTO(id);
    const result = await this.commandBus.execute(
      new CancelScheduleCommand(appDto as never, user.userId),
    );
    return ScheduleControllerMapper.toHttpResponse(result);
  }

  @Get()
  @ApiListSchedules()
  async list(
    @Query() q: ListSchedulesHttpQueryDTO,
  ): Promise<ScheduleListHttpResponseDTO> {
    const options = ScheduleControllerMapper.toListOptions(q);
    const result = await this.queryBus.execute(
      new ListSchedulesQuery(options),
    );
    return ScheduleControllerMapper.toListHttp(result);
  }

  @Get(':id')
  @ApiGetSchedule()
  async getById(@Param('id') id: string): Promise<ScheduleHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetScheduleQuery(id),
    );
    return ScheduleControllerMapper.toHttpResponse(result);
  }
}
