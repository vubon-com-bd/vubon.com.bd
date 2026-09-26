import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateScheduleCommand } from '../../../application/commands/schedule/create-schedule.command';
import { CancelScheduleCommand } from '../../../application/commands/schedule/cancel-schedule.command';
import { ListSchedulesQuery } from '../../../application/queries/schedule/list-schedules.query';

interface CreateScheduleBody {
  scheduleType: string;
  frequency: string;
  startAt: string;
  payload: Record<string, unknown>;
  interval?: number;
  endAt?: string;
}

@Controller('notifications/schedules')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateScheduleBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateScheduleCommand(
        user.userId,
        body.scheduleType,
        body.frequency,
        body.startAt,
        body.payload,
        body.interval,
        body.endAt,
      ),
    );
  }

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListSchedulesQuery(user.userId));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ): Promise<void> {
    await this.commandBus.execute(new CancelScheduleCommand(id, body.reason));
  }
}
