/**
 * Event Controller
 * @module analytics-service/interfaces/controllers/rest
 *
 * HTTP endpoints for analytics event tracking.
 * Thin — delegates to application CommandBus/QueryBus.
 */
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
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import { TrackEventCommand } from '../../../application/commands/event/track-event.command.js';
import { BatchTrackEventCommand } from '../../../application/commands/event/batch-track-event.command.js';
import { ProcessEventCommand } from '../../../application/commands/event/process-event.command.js';
import { GetEventQuery } from '../../../application/queries/event/get-event.query.js';
import { ListEventsQuery } from '../../../application/queries/event/list-events.query.js';
import { TrackEventRequestDto, BatchTrackEventRequestDto } from '../../dtos/requests/event.request.dto.js';
import { EventResponseDto } from '../../dtos/responses/event.response.dto.js';
import { EventControllerMapper } from '../../mappers/event.controller.mapper.js';
import { QueryLoggingInterceptor } from '../../interceptors/query-logging.interceptor.js';
import { QueryTimeoutInterceptor } from '../../interceptors/query-timeout.interceptor.js';
import {
  ApiTrackEvent,
  ApiBatchTrackEvent,
  ApiGetEvent,
  ApiListEvents,
  ApiProcessEvent,
  ApiEventTag,
} from '../../swagger/event.swagger.js';

interface RequestUser {
  readonly userId: string;
}

@ApiTags('Analytics — Events')
@Controller('analytics/events')
@UseInterceptors(QueryLoggingInterceptor, QueryTimeoutInterceptor)
export class EventController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post('track')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @ApiTrackEvent()
  async track(
    @Body() body: TrackEventRequestDto,
    @CurrentUser() user: RequestUser | undefined
  ): Promise<EventResponseDto> {
    const result = await this.commandBus.execute(
      new TrackEventCommand(body, user?.userId)
    );
    return EventControllerMapper.toHttp(result);
  }

  @Post('batch-track')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @ApiBatchTrackEvent()
  async batchTrack(
    @Body() body: BatchTrackEventRequestDto,
    @CurrentUser() user: RequestUser | undefined
  ): Promise<EventResponseDto[]> {
    const results = await this.commandBus.execute(
      new BatchTrackEventCommand(body, user?.userId)
    );
    return EventControllerMapper.toHttpList(results);
  }

  @Post(':id/process')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiProcessEvent()
  async process(@Param('id') id: string): Promise<EventResponseDto> {
    const result = await this.commandBus.execute(new ProcessEventCommand(id));
    return EventControllerMapper.toHttp(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiGetEvent()
  async getOne(@Param('id') id: string): Promise<EventResponseDto> {
    const result = await this.queryBus.execute(new GetEventQuery(id));
    return EventControllerMapper.toHttp(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiListEvents()
  async list(
    @Query('sessionId') sessionId?: string,
    @Query('userId') userId?: string,
    @Query('limit') limit?: string
  ): Promise<EventResponseDto[]> {
    const result = await this.queryBus.execute(
      new ListEventsQuery(
        sessionId,
        userId,
        limit ? Number(limit) : 100
      )
    );
    return EventControllerMapper.toHttpList(result);
  }
}
